/**
 * Auditoría HTTP REAL de las dos landings comerciales creadas en PR#107.
 * Read-only: no envía formularios, no modifica Google/GSC ni la web.
 * Se ejecuta desde GitHub Actions, porque su runner tiene salida HTTPS.
 * Verifica HTTP, contenido HTML, indexabilidad, CTA, interlinking y sitemap.
 */
import assert from 'node:assert/strict';

const origin = 'https://depofibra.com';
const definitions = [
  {
    route: '/depositos/precios/',
    heading: 'Precios de depósitos de poliéster: solicita tu presupuesto',
    expectedProduct: '/depositos/vertical-base-plana/5000-litros/',
  },
  {
    route: '/depositos/gran-capacidad/',
    heading: 'Depósitos de poliéster de gran capacidad: 20.000 a 60.000 litros',
    expectedProduct: '/depositos/vertical-base-plana/20000-litros/',
  },
];

async function getLive(path, accept = 'text/html') {
  const url = origin + path;
  const response = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    signal: AbortSignal.timeout(18000),
    headers: { Accept: accept, 'Cache-Control': 'no-cache' },
  });
  const body = await response.text();
  const meta = {
    url,
    status: response.status,
    location: response.headers.get('location'),
    contentType: response.headers.get('content-type'),
    server: response.headers.get('server'),
    bodyLength: body.length,
  };
  console.log('LIVE GET:', JSON.stringify(meta));
  assert.equal(response.status, 200, 'La URL debe servir HTML/XML directamente con HTTP 200: ' + url);
  return { body, meta };
}

function extractHeadTag(html, name, value) {
  const tags = [...html.matchAll(/<(meta|link)\b[^>]*>/gi)].map(m => m[0]);
  return tags.find(tag => new RegExp('\\b' + name + '=["\\x27]' + value + '["\\x27]', 'i').test(tag)) || '';
}

const results = [];
for (const expected of definitions) {
  const { body, meta } = await getLive(expected.route);
  assert.match(meta.contentType || '', /text\/html/i, 'Debe ser HTML: ' + expected.route);

  const title = body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
  const mainHeading = body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '';
  const visibleHeading = mainHeading.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  assert.ok(title.includes('Depofibra') && title.length > 30, 'Title SEO ausente: ' + expected.route);
  assert.equal(visibleHeading, expected.heading, 'H1 comercial distinto o ausente: ' + expected.route);

  const canonical = extractHeadTag(body, 'rel', 'canonical');
  assert.ok(canonical.includes('href="' + origin + expected.route + '"'),
    'Canonical incorrecta: ' + expected.route + ' => ' + canonical);

  const robots = extractHeadTag(body, 'name', 'robots');
  assert.ok(robots && !/noindex|nofollow/i.test(robots),
    'La página no debe llevar noindex/nofollow: ' + expected.route);
  const description = extractHeadTag(body, 'name', 'description');
  assert.ok(description.length > 100, 'Descripción SEO ausente: ' + expected.route);

  assert.ok((body.match(/open-quote-trigger/g) || []).length >= 3,
    'No hay suficientes botones de solicitud: ' + expected.route);
  assert.ok(body.includes('id="quoteForm"') && body.includes('id="quoteModal"'),
    'La página no incluye formulario modal vigente: ' + expected.route);
  assert.ok(body.includes('href="' + expected.expectedProduct + '"'),
    'Falta enlace comercial a la ficha vigente: ' + expected.route);
  assert.ok(body.includes('fabricantes externos') && body.includes('no incluye descarga'),
    'Falta aclaración veraz de comercialización o descarga: ' + expected.route);
  results.push({ route: expected.route, status: 'HTTP 200 + indexable + CTA + ficha', canonical: origin + expected.route });
}

const category = (await getLive('/depositos/')).body;
for (const expected of definitions) {
  assert.ok(category.includes('href="' + expected.route + '"'),
    'Falta enlace de categoría a ' + expected.route);
}


const commercialGuides = [
  {
    route: '/blog/que-es-prfv-depositos-fibra-vidrio/',
    firstAnchor: 'consulta cómo pedir precio de un depósito de poliéster',
    needsLarge: true,
  },
  {
    route: '/blog/calcular-capacidad-deposito-agua-riego/',
    firstAnchor: 'consulta qué determina el precio de los depósitos de poliéster',
    needsLarge: false,
  },
  {
    route: '/blog/depositos-gran-capacidad-20000-60000-litros/',
    firstAnchor: 'comparar depósitos PRFV de 20.000 a 60.000 litros',
    needsLarge: true,
  },
];
// Los lectores deben llegar de las guías rastreables al presupuesto sin
// redirecciones antiguas ni navegación complicada. No hay envíos de formulario.
for (const guide of commercialGuides) {
  const { body, meta } = await getLive(guide.route);
  assert.match(meta.contentType || '', /text\/html/i, 'La guía debe servir HTML ' + guide.route);
  const canonical = extractHeadTag(body, 'rel', 'canonical');
  assert.ok(canonical.includes('href="' + origin + guide.route + '"'),
    'Canonical incorrecta en guía ' + guide.route);
  assert.ok(body.includes(guide.firstAnchor), 'Falta texto de compra contextual en ' + guide.route);
  assert.ok(body.includes('href="/depositos/precios/"'), 'Falta enlace a pedir precio en ' + guide.route);
  if (guide.needsLarge) {
    assert.ok(body.includes('href="/depositos/gran-capacidad/"'),
      'Falta enlace de reserva grande en ' + guide.route);
  }
  assert.ok(body.includes('open-quote-trigger') && body.includes('href="/contacto/"'),
    'La guía debe conservar acceso al presupuesto y contacto ' + guide.route);
  results.push({ route: guide.route, status: 'HTTP 200 + canonical + puentes de compra' });
}

const xmlResult = await getLive('/sitemap.xml', 'application/xml,text/xml');
assert.match(xmlResult.meta.contentType || '', /xml/i, 'El sitemap debe responder XML');
const paths = [...xmlResult.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
for (const expected of definitions) {
  assert.ok(paths.includes(origin + expected.route),
    'Falta URL indexable en sitemap de producción: ' + expected.route);
}
assert.equal(new Set(paths).size, paths.length, 'El sitemap no debe contener URLs duplicadas');

console.log('AUDITORÍA COMERCIAL PÚBLICA OK', JSON.stringify({
  checkedOn: new Date().toISOString(), // Fecha de la consulta, no fecha del despliegue.
  results, sitemapUrls: paths.length, category: 'links both pages',
  leadSubmissionAttempted: false, productionModified: false,
}));
