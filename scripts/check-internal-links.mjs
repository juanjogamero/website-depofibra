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

// Las URLs legadas seleccionadas por tráfico GSC deben servirse como archivo /xxx.html,
// nunca como directorio /xxx.html/ (evitar salto adicional antes del meta-refresh).
const legacyDirectFiles = new Map([
  // GSC 21/08–21/11: rutas antiguas todavía presentes en resultados.
  // Conservamos el destino publicado y quitamos el salto /archivo.html/.
  ['productos.html', '/'],
  ['depositos-horizontales.html', '/depositos/'],
  ['fosas.html', '/fosas-septicas/'],
  ['blog/blog.html', '/blog/'],
  ['blog/poliester-vs-hormigon.html', '/blog/que-es-prfv-depositos-fibra-vidrio/'],
  ['blog/poliester-vs-plastico-pehd.html', '/blog/poliester-vs-plastico-pehd/'],
  // Resultados públicos de Google conservan fragmentos de la web antigua
  // sobre fabricación/logística: simplificar el acceso a destinos veraces.
  ['depositos-piscinas-alicante.html', '/'],
  ['depositos-poliester-jaen.html', '/depositos/'],
  ['piscinas.html', '/piscinas/'],
  ['sobre-nosotros.html', '/sobre-depofibra/'],
  ['cisternas.html', '/cubas-cisternas/'],
  ['depositos-agua-murcia.html', '/depositos/murcia/'],
  ['depositos-poliester-valencia.html', '/depositos/valencia/'],
  ['fosas-septicas-sevilla.html', '/fosas-septicas/sevilla/'],
  // URLs legadas con señales de búsqueda en GSC; publicar sin salto extra /xxx.html/.
  ['blog/normativa-fosas-septicas-2026.html', '/blog/normativa-fosas-septicas-2026-permisos-documentacion/'],
  ['blog/mantenimiento-piscina-poliester.html', '/blog/mantenimiento-piscina-poliester/'],
  ['blog/guia-tecnica-prfv.html', '/blog/que-es-prfv-depositos-fibra-vidrio/'],
  ['piscinas-poliester-badajoz.html', '/piscinas/'],
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

// Reputación verificable: no convertir textos inventados en testimonios de clientes.
// El carrusel permanece disponible para contenido acreditado, sin avance automático.
const reviewsComponentSource = readFileSync(path.resolve('src/components/CustomerReviews.astro'), 'utf8');
const reviewsDataSource = readFileSync(path.resolve('src/data/customerReviews.ts'), 'utf8');
const catalogEmpty = /publishedCustomerReviews:\s*ReadonlyArray<CustomerReview>\s*=\s*\[\s*\]/.test(reviewsDataSource);
if (existsSync(path.resolve('src/data/customerReviewExamples.ts'))) {
  errors.push('SEO: la fuente de comentarios simulados no debe estar en el repositorio de producción');
}
if (!reviewsComponentSource.includes('data-customer-reviews-rail') ||
    !reviewsComponentSource.includes('data-reviews-prev') ||
    !reviewsComponentSource.includes('data-reviews-next') ||
    !reviewsComponentSource.includes('rail.scrollBy(')) {
  errors.push('SEO: las opiniones reales deben conservar el carrusel con scroll manual y flechas');
}
if (/customer-reviews-scroll|--review-duration|setInterval\(|requestAnimationFrame\(/.test(reviewsComponentSource)) {
  errors.push('SEO: no reactivar desplazamiento automático continuo');
}
if (!reviewsComponentSource.includes('touch-action: pan-x') ||
    !reviewsComponentSource.includes('prefers-reduced-motion: reduce')) {
  errors.push('Accesibilidad: desplazamiento táctil y movimiento reducido deben seguir disponibles');
}
if (!reviewsComponentSource.includes('mailto:depofibra21@gmail.com?subject=Mi%20experiencia%20con%20Depofibra')) {
  errors.push('SEO: conservar el enlace para recibir opiniones auténticas');
}
if (/sampleReviews|customerReviewExamples/.test(reviewsComponentSource)) {
  errors.push('SEO: el componente público no puede utilizar el catálogo de testimonios simulados');
}
if (/DEMOSTRACIÓN · 15 EJEMPLOS FICTICIOS|Ejemplo ficticio|Cinco estrellas ficticias|tarjetas de muestra|Nombre de muestra/i.test(homeHtml)) {
  errors.push('SEO: eliminar contenido de demostración de la portada publicada');
}
if (catalogEmpty) {
  const cards = [...homeHtml.matchAll(/class="customer-reviews__card"/g)].length;
  if (cards !== 0 || homeHtml.includes('★★★★★') ||
      !homeHtml.includes('Estamos reuniendo opiniones de clientes')) {
    errors.push('SEO: no publicar estrellas ni testimonios si todavía no hay opiniones documentadas');
  }
}

// Regresión SEO comercial: la gama general no puede volver a parecer limitada a tres tamaños.
const depositCatalogFile = targetFile('/depositos/');
const verticalFamilyFile = targetFile('/depositos/vertical-base-plana/');
if (!depositCatalogFile || !verticalFamilyFile) {
  errors.push('SEO comercial: no existe catálogo o familia vertical compilada');
} else {
  const catalogHtml = content(depositCatalogFile);
  const familyHtml = content(verticalFamilyFile);
  if (!catalogHtml.includes('Depósitos de poliéster de 100 a 60.000 L')) {
    errors.push('SEO comercial: título del catálogo sin amplitud 100-60.000 L');
  }
  if (!catalogHtml.includes('Venta de depósitos de poliéster') || !catalogHtml.includes('href="/depositos/para-riego/"')) {
    errors.push('SEO comercial: catálogo sin intención de compra o enlazado a riego');
  }
  if (!familyHtml.includes('GAMA DE ESTA FAMILIA') || !familyHtml.includes('Capacidades recogidas en la tabla orientativa') || !familyHtml.includes('60.000 L')) {
    errors.push('SEO comercial: verticales sin la amplitud de referencias que consta en la tabla');
  }
  if (familyHtml.includes('Tres ejemplos de capacidad')) {
    errors.push('SEO comercial: no presentar solamente tres tarjetas como catálogo completo');
  }
}
if (!homeHtml.includes('De 100 a 60.000 L.') || !homeHtml.includes('href="/depositos/para-riego/"')) {
  errors.push('SEO comercial: Home sin gama amplia o enlace a depósitos para riego');
}

// Enlazado editorial hacia aplicaciones comerciales aún pendientes de rastreo GSC.
// La prueba comprueba HTML real servido, no solo rutas en el sitemap.
for (const [source, targets] of [
  ['/blog/que-es-prfv-depositos-fibra-vidrio/', ['/depositos/para-granjas/', '/depositos/agua-de-lluvia/']],
  ['/blog/deposito-vertical-horizontal-diferencias/', ['/depositos/para-riego/', '/depositos/para-granjas/']],
  ['/blog/calcular-capacidad-deposito-agua-riego/', ['/depositos/para-riego/', '/depositos/agua-de-pozo/']],
  ['/depositos/segovia/', ['/depositos/para-granjas/']],
  ['/depositos/huesca/', ['/depositos/para-granjas/']],
  ['/depositos/cuenca/', ['/depositos/para-riego/']],
]) {
  const file = targetFile(source);
  if (!file) { errors.push('Enlazado de aplicaciones: falta origen ' + source); continue; }
  const html = content(file);
  for (const target of targets) {
    if (!html.includes('href="' + target + '"')) errors.push('Enlazado de aplicaciones: ' + source + ' no enlaza a ' + target);
  }
}


// SEO long tail: páginas existentes deben responder a la compra de cisterna suelta
// y aljibe enterrable, sin fabricar una landing duplicada ni prometer homologaciones.
for (const [route, required] of [
  ['/cubas-cisternas/', ['Cubas y cisternas de poliéster para remolques', 'href="/cubas-cisternas/cuba-remolque/"']],
  ['/cubas-cisternas/cuba-remolque/', ['Cisternas de poliéster para remolques agrícolas', 'únicamente la cisterna', 'href="/blog/cuba-cisterna-poliester-remolque-agricola/"']],
  ['/depositos/horizontal-enterrable/', ['Aljibes prefabricados de poliéster para enterrar', 'href="/depositos/agua-de-lluvia/"', 'href="/depositos/agua-de-pozo/"']],
  ['/blog/cuba-cisterna-poliester-remolque-agricola/', ['href="/cubas-cisternas/cuba-remolque/"']],
]) {
  const file = targetFile(route);
  if (!file) { errors.push('SEO long tail: falta ruta ' + route); continue; }
  const html = content(file);
  for (const snippet of required) {
    if (!html.includes(snippet)) errors.push('SEO long tail: falta referencia en ' + route + ': ' + snippet);
  }
}


// SEO fosas: las consultas de documentación deben llevar a fichas reales sin
// afirmar homologación genérica ni que la compra autorice un vertido.
for (const [url, required] of [
  ['/fosas-septicas/', ['Fosas sépticas de poliéster: tipos y documentos', '¿Todas las fosas sépticas de Depofibra están homologadas?', 'href="/blog/fosas-septicas-homologadas-marcado-ce-documentacion/"']],
  ['/fosas-septicas/fosa-estanca/', ['Documentación y requisitos antes de comprar', 'href="/blog/fosas-septicas-homologadas-marcado-ce-documentacion/"']],
  ['/fosas-septicas/fosa-biologica/', ['Fosa séptica con filtro biológico de poliéster', 'Habitantes equivalentes', 'href="/blog/fosas-septicas-homologadas-marcado-ce-documentacion/"']],
  ['/fosas-septicas/oxidacion-total/', ['Documentación y requisitos antes de comprar', 'Necesidades de aireación']],
  ['/blog/fosa-estanca-filtro-biologico-oxidacion-total/', ['href="/fosas-septicas/fosa-estanca/"', 'href="/fosas-septicas/fosa-biologica/"', 'href="/fosas-septicas/oxidacion-total/"']],
]) {
  const path = targetFile(url);
  if (!path) { errors.push('SEO fosas: falta ' + url); continue; }
  const page = content(path);
  for (const requiredSnippet of required) {
    if (!page.includes(requiredSnippet)) errors.push('SEO fosas: ' + url + ' no contiene ' + requiredSnippet);
  }
}


// Las páginas nuevas deben ser rastreables y enlazadas entre sí por un índice NUEVO.
// No se modifican las fichas ni landings ya existentes.
for (const url of ['/depositos/avila/','/depositos/salamanca/']) {
  const pageFile = targetFile(url);
  if (!pageFile) { errors.push('SEO zonas nuevas: falta ' + url); continue; }
  const page = content(pageFile);
  if (!page.includes('100 a 60.000 litros') || !page.includes('Depofibra')) {
    errors.push('SEO zonas nuevas: no comunicar la gama y comercialización en ' + url);
  }
}
const newRegionsIndex = targetFile('/depositos/zonas/');
if (!newRegionsIndex) {
  errors.push('SEO zonas nuevas: falta el índice de provincias');
} else {
  const regionsHtml = content(newRegionsIndex);
  for (const url of ['/depositos/avila/','/depositos/salamanca/','/depositos/segovia/','/depositos/huesca/']) {
    if (!regionsHtml.includes('href="' + url + '"')) errors.push('SEO zonas nuevas: índice sin enlace a ' + url);
  }
  if (!regionsHtml.includes('No son sucursales') || !regionsHtml.includes('descarga')) {
    errors.push('SEO zonas nuevas: índice debe dejar claros los límites logísticos');
  }
}


// Descubrimiento: los hubs de aplicaciones y provincias deben estar enlazados
// desde la portada y el catálogo a través del pie común; sitemap NO basta solo.
for (const route of ['/', '/depositos/', '/fosas-septicas/', '/blog/']) {
  const file = targetFile(route);
  if (!file) { errors.push('Indexación: ruta de prueba no generada ' + route); continue; }
  const html = content(file);
  for (const url of ['/depositos/para-riego/', '/depositos/para-granjas/', '/depositos/zonas/']) {
    if (!html.includes('href="' + url + '"')) {
      errors.push('Indexación: ' + route + ' debe enlazar a ' + url + ' de manera rastreable');
    }
  }
}
const robotsPath = path.join(output, 'robots.txt');
if (!existsSync(robotsPath)) {
  errors.push('Indexación: falta robots.txt con sitemap de producción');
} else {
  const robotsText = content(robotsPath);
  if (!robotsText.includes('Sitemap: https://depofibra.com/sitemap.xml')
      || !/User-agent:\s*\*/i.test(robotsText)
      || !/Allow:\s*\//i.test(robotsText)) {
    errors.push('Indexación: robots.txt debe permitir rastreo y anunciar sitemap de producción');
  }
}

// SEO diferencial: la guía de gran capacidad debe ser una página real, rastreable,
// conectada con catálogo y logística, sin declarar dimensiones ni precios inventados.
const largeTankGuideRoute = '/blog/depositos-gran-capacidad-20000-60000-litros/';
const largeTankGuideFile = targetFile(largeTankGuideRoute);
if (!largeTankGuideFile) {
  errors.push('SEO: falta guía de compra de depósitos de gran capacidad');
} else {
  const guide = content(largeTankGuideFile);
  for (const ref of [
    '20.000', '60.000', 'Un depósito de 30.000 litros o tres de 10.000',
    'El acceso de entrega puede decidir la capacidad',
    'La entrega estándar no incluye la descarga',
    'href="/depositos/vertical-base-plana/"',
    'href="/depositos/horizontal-con-cunas/"',
    'href="/depositos/horizontal-enterrable/"',
    'href="/blog/transporte-descarga-depositos-poliester/"'
  ]) {
    if (!guide.includes(ref)) errors.push('SEO gran capacidad: falta contenido/enlace ' + ref);
  }
  if (!guide.includes('https://depofibra.com' + largeTankGuideRoute)) {
    errors.push('SEO gran capacidad: canonical ausente o incorrecta');
  }
  if (!guide.includes('La imagen muestra un formato de producto como referencia;')) {
    errors.push('SEO gran capacidad: atribución de fotografía de catálogo no visible');
  }
  if (/Fotografía de referencia del catálogo \/ Pexels/.test(guide)) {
    errors.push('SEO gran capacidad: crédito equivocado de Pexels para foto propia del catálogo');
  }
  if (!guide.includes('https://depofibra.com/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verdes-conjunto-diferentes-tamanos.webp')) {
    errors.push('GEO gran capacidad: Image en JSON-LD sin URL completa de producción');
  }
}
const blogList = targetFile('/blog/');
if (!blogList || !content(blogList).includes('href="' + largeTankGuideRoute + '"')) {
  errors.push('SEO gran capacidad: índice editorial sin enlace rastreable a la nueva guía');
}
if (existsSync(sitemapPath) && !content(sitemapPath).includes('https://depofibra.com' + largeTankGuideRoute)) {
  errors.push('SEO gran capacidad: guía no incluida en sitemap de producción');
}

// SEO/GEO: página de necesidad de riego POR TURNOS (no duplicar categoría general).
// Validamos contenido visible, balance de agua, contexto de permiso y enlaces útiles.
const waterTurnRoute = '/blog/deposito-agua-riego-por-turnos-comunidad-regantes/';
const waterTurnFile = targetFile(waterTurnRoute);
if (!waterTurnFile) errors.push('SEO riego por turnos: falta guía compilada');
else {
  const turnHtml = content(waterTurnFile);
  for (const text of [
    'Depósito de agua para riego por turnos',
    'litros recibibles por turno',
    '10.500 litros',
    'volumen útil',
    'la modalidad estándar no incluye descarga',
    'href="/depositos/para-riego/"',
    'href="/blog/calcular-capacidad-deposito-agua-riego/"',
    'href="/blog/transporte-descarga-depositos-poliester/"',
    'Ministerio de Agricultura',
    'texto refundido de la Ley de Aguas',
    'La imagen muestra un formato de producto como referencia'
  ]) {
    if (!turnHtml.toLowerCase().includes(text.toLowerCase())) errors.push('SEO riego por turnos: falta ' + text);
  }
  if (!turnHtml.includes('<link rel="canonical" href="https://depofibra.com' + waterTurnRoute + '"')) {
    // Canonical puede tener otro orden de atributos; comprobar también por URL absoluta.
    if (!turnHtml.includes('https://depofibra.com' + waterTurnRoute)) errors.push('SEO riego por turnos: URL canónica ausente');
  }
  if (!turnHtml.includes('https://depofibra.com/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-instalado.webp')) {
    errors.push('GEO riego por turnos: imagen JSON-LD debe tener URL absoluta');
  }
  if (turnHtml.includes('Fotografía de referencia del catálogo / Pexels')) {
    errors.push('SEO riego por turnos: foto de catálogo atribuida erróneamente a Pexels');
  }
}
const blogForTurns = targetFile('/blog/');
if (!blogForTurns || !content(blogForTurns).includes('href="' + waterTurnRoute + '"')) {
  errors.push('SEO riego por turnos: blog no enlaza guía');
}
if (existsSync(sitemapPath) && !content(sitemapPath).includes('https://depofibra.com' + waterTurnRoute)) {
  errors.push('SEO riego por turnos: guía no incluida en sitemap');
}

// Confianza GEO/SEO: impedir que textos antiguos sin respaldo vuelvan a
// describir a Depofibra como fabricante con flota propia.
// Solo afecta a las dos páginas corporativas, nunca a fichas de proveedores.
const brandPages = [
  { route: '/', expected: /Comercialización de depósitos de poliéster reforzado/ },
  { route: '/sobre-depofibra/', expected: /comercializadora de productos de fabricantes externos/i },
];
const unsupportedBrandClaims = /fabricaci[oó]n propia|log[ií]stica propia|somos fabricantes|no somos intermediarios|sin intermediarios/i;
for (const { route, expected } of brandPages) {
  const file = targetFile(route);
  if (!file) {
    errors.push('GEO marca: falta página corporativa ' + route);
    continue;
  }
  const html = content(file);
  if (!expected.test(html)) errors.push('GEO marca: falta identidad comercial verificable ' + route);
  if (unsupportedBrandClaims.test(html)) errors.push('GEO marca: afirmación no acreditada de fabricación/logística propia ' + route);
}

// Regresión SEO: la URL histórica PRFV/PEHD aún aparece indexada en GSC
// pero era 404. Exigir nueva comparativa útil y transición directa al canonical.
const materialGuide = '/blog/poliester-vs-plastico-pehd/';
const materialGuideFile = targetFile(materialGuide);
if (!materialGuideFile) errors.push('SEO materiales: falta nueva comparativa PRFV/PEHD');
else {
  const html = content(materialGuideFile);
  for (const text of [
    'Poliéster PRFV o plástico PEHD',
    '¿el poliéster es un plástico?',
    '¿Cuál soporta mejor el sol',
    'La instalación exterior',
    'no está confirmado en todos los depósitos PRFV',
    'no queda automáticamente habilitado para agua de consumo humano',
    'diseñado expresamente para enterramiento',
    'comercialización de productos PRFV de fabricantes externos',
    'href="/depositos/vertical-base-plana/"',
    'href="/depositos/horizontal-enterrable/"',
    'href="/blog/depositos-poliester-agua-potable-documentacion/"',
    'href="/contacto/"',
    'La imagen muestra un formato de producto como referencia'
  ]) {
    if (!html.toLowerCase().includes(text.toLowerCase())) errors.push('SEO materiales: falta ' + text);
  }
  if (!html.includes('https://depofibra.com' + materialGuide)) errors.push('SEO materiales: canonical ausente');
  if (!html.includes('https://depofibra.com/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-frontal.webp')) {
    errors.push('GEO materiales: imagen schema no absoluta');
  }
  if (html.includes('Fotografía de referencia del catálogo / Pexels')) errors.push('SEO materiales: crédito fotográfico falso');
}
const materialsBlog = targetFile('/blog/');
if (!materialsBlog || !content(materialsBlog).includes('href="' + materialGuide + '"')) errors.push('SEO materiales: guía no enlazada desde Blog');
if (existsSync(sitemapPath) && !content(sitemapPath).includes('https://depofibra.com' + materialGuide)) errors.push('SEO materiales: no está en sitemap');
const legacyMaterial = targetFile('/blog/poliester-vs-plastico-pehd.html');
if (!legacyMaterial || !content(legacyMaterial).includes('url=' + materialGuide)) errors.push('SEO materiales: antiguo 404 no recuperado');

// Calidad GEO/E-E-A-T: la guía normativa debe citar la fuente oficial
// actualmente navegable y NO presentar el BOJA original como texto consolidado.
const fosasNormativaFile = targetFile('/blog/normativa-fosas-septicas-2026-permisos-documentacion/');
if (!fosasNormativaFile) errors.push('GEO normativa: falta guía de fosas');
else {
  const normaHtml = content(fosasNormativaFile);
  if (!normaHtml.includes('https://www.juntadeandalucia.es/boja/2015/89/3')) {
    errors.push('GEO normativa: falta Decreto 109/2015 en BOJA oficial');
  }
  if (normaHtml.includes('ws040.juntadeandalucia.es/sedeboja/lconsolidada/eli/es-an/d/2015/03/17/109/')) {
    errors.push('GEO normativa: persiste enlace antiguo BOJA de acceso no directo');
  }
  if (!normaHtml.includes('publicación original en el BOJA') || !normaHtml.includes('no constituye por sí sola un texto consolidado vigente')) {
    errors.push('GEO normativa: no se diferencia BOJA original y modificaciones vigentes');
  }
  if (!normaHtml.includes('BOE-A-2025-5737') || !normaHtml.includes('Sentencia del Tribunal Constitucional 40/2025')) {
    errors.push('GEO normativa: falta contexto de nulidad STC 40/2025');
  }
}

const counts = `${htmlFiles.length} HTML, ${checkedLinks} enlaces internos, ${checkedFragments} anclas, ${checkedMediaAssets} referencias de imágenes locales, ${checkedSitemapUrls} URLs del sitemap`;
if (errors.length) {
  console.error(`ERROR en la auditoría de enlaces (${counts}):\n` + errors.map(e => ' - ' + e).join('\n'));
  process.exit(1);
}
console.log('OK: enlaces internos y sitemap verificados (' + counts + ').');
