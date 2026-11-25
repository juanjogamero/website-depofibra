/**
 * Auditoría HTTP externa de las URLs antiguas todavía visibles en GSC.
 *
 * Solo lectura: nunca modifica el sitio ni sigue automáticamente redirecciones.
 * Distingue HTTP 301/308 real del fallback HTML meta-refresh de GitHub Pages.
 * Uso: node scripts/audit-legacy-http.mjs
 * Ejecutar en un equipo/runner con salida HTTPS; sin credenciales.
 */
const origin = 'https://depofibra.com';
const routes = [
  ['/cisternas.html', '/cubas-cisternas/'],
  ['/depositos-poliester-valencia.html', '/depositos/valencia/'],
  ['/fosas-septicas-sevilla.html', '/fosas-septicas/sevilla/'],
  ['/depositos-agua-murcia.html', '/depositos/murcia/'],
];
const detail = [];
const extractTag = (html, token) =>
  [...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)]
    .map(match => match[0])
    .find(tag => new RegExp(token, 'i').test(tag)) ?? null;

for (const [alias, expectedDestination] of routes) {
  const abort = AbortSignal.timeout(18000);
  const url = origin + alias;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'manual', // NO seguir 30x: medimos el primer salto HTTP.
      signal: abort,
      headers: { 'Accept': 'text/html' },
    });
    const raw = await response.text();
    const refreshTag = extractTag(raw, 'http-equiv\\s*=\\s*[\\x22\\x27]?refresh');
    const canonicalTag = extractTag(raw, 'rel\\s*=\\s*[\\x22\\x27]?canonical');
    const location = response.headers.get('location');
    const result = {
      alias,
      expectedDestination,
      httpStatus: response.status,
      location,
      httpRefresh: response.headers.get('refresh'),
      contentType: response.headers.get('content-type'),
      server: response.headers.get('server'),
      metaRefresh: refreshTag,
      canonical: canonicalTag,
      source: 'live GET without following HTTP redirects',
    };
    detail.push(result);
    console.log(JSON.stringify(result));
    if (response.status >= 400) {
      console.error('Ruta antigua con error HTTP:', alias, response.status);
      process.exitCode = 1;
    }
  } catch (error) {
    console.error(JSON.stringify({ alias, error: String(error), source: 'live GET' }));
    process.exitCode = 1;
  }
}
const results = detail.map(({ alias, httpStatus, location, metaRefresh, canonical }) => ({
  alias, httpStatus, location, hasMetaRefresh: Boolean(metaRefresh), hasCanonical: Boolean(canonical),
}));
console.log('RESUMEN DE CABECERAS:', JSON.stringify(results));
// Un HTTP 200 con meta-refresh NO se declara HTTP 301: señal distinta.
// Este programa no concluye que Google haya cambiado su canonical.
