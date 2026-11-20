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

// Las 4 URLs legadas con tráfico GSC deben servirse como archivo /xxx.html,
// nunca como directorio /xxx.html/ (evitar salto adicional antes del meta-refresh).
const legacyDirectFiles = new Map([
  ['cisternas.html', '/cubas-cisternas/'],
  ['depositos-agua-murcia.html', '/depositos/murcia/'],
  ['depositos-poliester-valencia.html', '/depositos/valencia/'],
  ['fosas-septicas-sevilla.html', '/fosas-septicas/sevilla/'],
]);
for (const [legacy, destination] of legacyDirectFiles) {
  const file = path.join(output, legacy);
  if (!existsSync(file) || !statSync(file).isFile()) {
    errors.push(`Legacy SEO: la ruta /${legacy} no está publicada como fichero HTML directo`);
    continue;
  }
  const html = content(file);
  if (!html.includes(`url=${destination}`) || !html.includes(`https://depofibra.com${destination}`) || !/http-equiv=["']refresh["']/i.test(html)) {
    errors.push(`Legacy SEO: falta redirect inmediato/canonical válido en /${legacy}`);
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

// GEO/SEO: identidad comercial verificable y compartida entre portada y Sobre.
function jsonLdNodes(file) {
  const html = content(file);
  const scripts = [...html.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.flatMap(match => {
    let block;
    try { block = JSON.parse(match[1]); }
    catch { errors.push('GEO: JSON-LD no válido en ' + path.relative(output, file)); return []; }
    return Array.isArray(block['@graph']) ? block['@graph'] : [block];
  });
}
const homeFile = targetFile('/');
const aboutFile = targetFile('/sobre-depofibra/');
if (!homeFile || !aboutFile) errors.push('GEO: falta portada o Sobre Depofibra compilada');
else {
  const org = jsonLdNodes(homeFile).find(node => node['@id'] === 'https://depofibra.com/#organization');
  const website = jsonLdNodes(homeFile).find(node => node['@id'] === 'https://depofibra.com/#website');
  const about = jsonLdNodes(aboutFile).find(node => node['@type'] === 'AboutPage');
  const logo = 'https://depofibra.com/images/depofibra_brand_assets/depofibra-logo-stacked-blue.png';
  if (!org || org['@type'] !== 'Organization') errors.push('GEO: falta identidad Organization en Home');
  if (org?.logo !== logo || !targetFile(new URL(logo).pathname)) errors.push('GEO: logo oficial del Organization no accesible en dist/');
  if (!org?.description?.includes('Comercialización')) errors.push('GEO: entidad Depofibra debe describirse como comercializadora');
  if (org?.address?.addressLocality !== 'Casariche' || org?.address?.addressCountry !== 'ES') {
    errors.push('GEO: localidad real de la atención comercial no coherente');
  }
  if (!website || website.publisher?.['@id'] !== org?.['@id']) errors.push('GEO: WebSite sin publisher enlazado');
  if (!about || about['@id'] !== 'https://depofibra.com/sobre-depofibra/#webpage' ||
      about.mainEntity?.['@id'] !== org?.['@id'] || about.isPartOf?.['@id'] !== website?.['@id']) {
    errors.push('GEO: AboutPage no enlazada a Organization/WebSite');
  }
  const aboutHtml = content(aboutFile);
  for (const href of ['/depositos/', '/depositos/vertical-base-plana/', '/depositos/para-riego/', '/piscinas/', '/fosas-septicas/', '/cubas-cisternas/']) {
    if (!aboutHtml.includes('href="' + href + '"')) errors.push('SEO: falta enlace de entidad a categoría desde Sobre: ' + href);
  }
}

// Evita crear falsas valoraciones o marcar reseñas de la propia empresa
// como Review/AggregateRating en la Home: Google excluye este tipo de marcado
// cuando la empresa controla las reseñas sobre sí misma.
const homeHtml = content(targetFile('/'));
if (!homeHtml.includes('id="valoraciones"') || !homeHtml.includes('OPINIONES DE CLIENTES')) {
  errors.push('SEO: falta sección de valoraciones reales cerca del final de la Home');
}
if (!homeHtml.includes('mailto:depofibra21@gmail.com?subject=Mi%20experiencia%20con%20Depofibra')) {
  errors.push('SEO: falta invitación rastreable a compartir una experiencia real');
}
for (const fragment of homeHtml.matchAll(/<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
  const structured = fragment[1];
  if (/"@type"\s*:\s*"(?:Review|AggregateRating)"/.test(structured)) {
    errors.push('SEO: no marcar como Review/AggregateRating las opiniones autogestionadas de la empresa');
  }
}
if (/Comprador verificado|reseñas verificadas|opiniones verificadas/i.test(homeHtml)) {
  errors.push('SEO: no atribuir verificación de compra sin base documentada');
}

// Las tarjetas ficticias pueden mostrarse SOLO como ejemplos rotulados,
// sin atribuir autoría real, reseñas Google ni rich results de Review.
const reviewsComponentSource = readFileSync(path.resolve('src/components/CustomerReviews.astro'), 'utf8');
const reviewsDataSource = readFileSync(path.resolve('src/data/customerReviews.ts'), 'utf8');
const examplesDataSource = readFileSync(path.resolve('src/data/customerReviewExamples.ts'), 'utf8');
const catalogEmpty = /publishedCustomerReviews:\s*ReadonlyArray<CustomerReview>\s*=\s*\[\s*\]/.test(reviewsDataSource);
if (!reviewsComponentSource.includes('data-customer-reviews-rail') ||
    !reviewsComponentSource.includes('data-reviews-prev') ||
    !reviewsComponentSource.includes('data-reviews-next') ||
    !reviewsComponentSource.includes('rail.scrollBy(')) {
  errors.push('SEO: el scroll horizontal manual y sus flechas no están preparados');
}
if (/customer-reviews-scroll|--review-duration|setInterval\(|requestAnimationFrame\(/.test(reviewsComponentSource)) {
  errors.push('Experiencia de usuario: no reactivar el carrusel automático continuo');
}
if (!reviewsComponentSource.includes('touch-action: pan-x') ||
    !reviewsComponentSource.includes('prefers-reduced-motion: reduce') ||
    !reviewsComponentSource.includes("aria-roledescription=\"carrusel horizontal\"")) {
  errors.push('Accesibilidad: scroll táctil, teclado o movimiento reducido no comprobables');
}
if (!reviewsComponentSource.includes('mailto:depofibra21@gmail.com?subject=Mi%20experiencia%20con%20Depofibra')) {
  errors.push('SEO: mantener enlace de recepción de opiniones auténticas');
}
if (/EJEMPLO FICTICIO|RESEÑA DEMO|RESENA DEMO/i.test(reviewsDataSource)) {
  errors.push('SEO: no introducir ejemplos de demo en las reseñas reales documentadas');
}
const exampleCount = [...examplesDataSource.matchAll(/"id": "ejemplo-\d{2}"/g)].length;
if (exampleCount !== 15) errors.push('Diseño: se necesitan exactamente 15 tarjetas ficticias marcadas como demostración');
if (catalogEmpty) {
  const cards = [...homeHtml.matchAll(/class="customer-reviews__card"/g)].length;
  if (cards !== 15 ||
      !homeHtml.includes('DEMOSTRACIÓN · 15 EJEMPLOS FICTICIOS.') ||
      !homeHtml.includes('No son reseñas reales de clientes ni reseñas obtenidas de Google.') ||
      [...homeHtml.matchAll(/Ejemplo ficticio/g)].length < 15) {
    errors.push('SEO: ejemplos en Home sin etiquetas explícitas o número incorrecto de tarjetas');
  }
} else {
  if (homeHtml.includes('DEMOSTRACIÓN · 15 EJEMPLOS FICTICIOS.')) {
    errors.push('SEO: al publicar reseñas verdaderas no mezclar el carrusel con reseñas ficticias');
  }
}

const counts = `${htmlFiles.length} HTML, ${checkedLinks} enlaces internos, ${checkedFragments} anclas, ${checkedMediaAssets} referencias de imágenes locales, ${checkedSitemapUrls} URLs del sitemap`;
if (errors.length) {
  console.error(`ERROR en la auditoría de enlaces (${counts}):\n` + errors.map(e => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('OK: enlaces internos y sitemap verificados (' + counts + ').');
