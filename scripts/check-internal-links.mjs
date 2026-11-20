/**
 * Comprueba las rutas y anclas internas del sitio Astro ya compilado.
 * No hace peticiones externas, no trata datos personales y no altera HTML.
 *
 * Uso: npm run build && node scripts/check-internal-links.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist');
if (!existsSync(output)) {
  console.error('ERROR: no existe dist/. Ejecuta npm run build antes.');
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap(name => {
    const file = path.join(dir, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}

const files = walk(output);
const htmlFiles = files.filter(file => file.endsWith('.html'));
const contentCache = new Map();
const errors = [];
let checkedLinks = 0;
let checkedFragments = 0;
let checkedSitemapUrls = 0;
let checkedMediaAssets = 0;

function content(file) {
  if (!contentCache.has(file)) contentCache.set(file, readFileSync(file, 'utf8'));
  return contentCache.get(file);
}

function decodeAttribute(value) {
  return value.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/gi, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function targetFile(pathname) {
  let decoded;
  try { decoded = decodeURIComponent(pathname); }
  catch { return null; }
  const clean = decoded.replace(/^\/+/, '');
  const direct = path.join(output, clean);
  const candidates = pathname.endsWith('/')
    ? [path.join(direct, 'index.html')]
    : [direct, path.join(direct, 'index.html')];
  return candidates.find(file => existsSync(file) && statSync(file).isFile()) ?? null;
}

const origins = new Set(['https://depofibra.com', 'https://demo.depofibra.com']);
function localUrl(href, route) {
  let target;
  try { target = new URL(href, 'https://depofibra.com' + route); }
  catch { return null; }
  if (!origins.has(target.origin)) return null;
  return target;
}

function checkLink(href, source) {
  const route = '/' + path.relative(output, source).replaceAll(path.sep, '/')
    .replace(/(?:^|\/)index\.html$/, '').replace(/\/$/, '/');
  const target = localUrl(decodeAttribute(href), route);
  if (!target) return;
  checkedLinks += 1;
  const file = targetFile(target.pathname);
  const from = path.relative(output, source);
  if (!file) {
    errors.push(`${from}: enlace interno sin destino: ${href}`);
    return;
  }
  if (!target.hash || !file.endsWith('.html')) return;
  let fragment;
  try { fragment = decodeURIComponent(target.hash.slice(1)); }
  catch { errors.push(`${from}: ancla no válida: ${href}`); return; }
  if (!fragment) return;
  checkedFragments += 1;
  const ids = new Set([...content(file).matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => decodeAttribute(m[1])));
  const anchorNames = new Set([...content(file).matchAll(/<a\b[^>]*\bname\s*=\s*["']([^"']+)["']/g)].map(m => decodeAttribute(m[1])));
  if (!ids.has(fragment) && !anchorNames.has(fragment)) {
    errors.push(`${from}: ancla #${fragment} no existe en ${path.relative(output, file)}`);
  }
}

function checkMediaAsset(value, source) {
  const href = decodeAttribute(value);
  const route = '/' + path.relative(output, source).replaceAll(path.sep, '/')
    .replace(/(?:^|\/)index\.html$/, '').replace(/\/$/, '/');
  const url = localUrl(href, route);
  if (!url) return; // Imágenes externas o data: no se comprueban desde dist.
  checkedMediaAssets += 1;
  if (!targetFile(url.pathname)) {
    errors.push(`${path.relative(output, source)}: imagen local sin archivo: ${href}`);
  }
}

for (const file of htmlFiles) {
  const html = content(file);
  for (const match of html.matchAll(/<a\b[^>]*?\bhref\s*=\s*(["'])(.*?)\1/gi)) {
    checkLink(match[2], file);
  }
  // La prueba anterior verificaba enlaces <a>, pero una imagen rota pasaba CI.
  // Revisar <img src>, <img srcset> y <source srcset> sin depender de red.
  for (const tag of html.matchAll(/<(?:img|source)\b[^>]*>/gi)) {
    for (const attr of tag[0].matchAll(/(?:^|\s)(src|srcset)\s*=\s*(["'])(.*?)\2/gi)) {
      if (attr[1].toLowerCase() === 'src') checkMediaAsset(attr[3], file);
      else if (!/^\s*data:/i.test(attr[3])) {
        for (const candidate of attr[3].split(',')) {
          const src = candidate.trim().split(/\s+/)[0];
          if (src) checkMediaAsset(src, file);
        }
      }
    }
  }
}

const sitemapPath = path.join(output, 'sitemap.xml');
if (!existsSync(sitemapPath)) errors.push('Falta dist/sitemap.xml');
else {
  const sitemapUrls = new Set([...content(sitemapPath).matchAll(/<loc>(.*?)<\/loc>/g)].map(match => decodeAttribute(match[1])));
  for (const mustInclude of ['/depositos/para-riego/', '/depositos/palencia/', '/depositos/soria/']) {
    if (!sitemapUrls.has('https://depofibra.com' + mustInclude) && !sitemapUrls.has('https://demo.depofibra.com' + mustInclude)) {
      errors.push(`Sitemap: falta página comercial rastreable ${mustInclude}`);
    }
  }
  for (const match of content(sitemapPath).matchAll(/<loc>(.*?)<\/loc>/g)) {
    const item = localUrl(decodeAttribute(match[1]), '/sitemap.xml');
    if (!item) continue;
    checkedSitemapUrls += 1;
    if (!targetFile(item.pathname)) errors.push(`Sitemap: ruta sin archivo: ${match[1]}`);
    if (item.pathname === '/404.html') errors.push('Sitemap: 404.html no debe indexarse');
  }
}

const counts = `${htmlFiles.length} HTML, ${checkedLinks} enlaces internos, ${checkedFragments} anclas, ${checkedMediaAssets} referencias de imágenes locales, ${checkedSitemapUrls} URLs del sitemap`;
if (errors.length) {
  console.error(`ERROR en la auditoría de enlaces (${counts}):\n` + errors.map(e => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('OK: enlaces internos y sitemap verificados (' + counts + ').');
