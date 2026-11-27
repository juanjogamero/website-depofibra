/**
 * Auditoría pública de migración legacy -> URLs comerciales vigentes.
 * Solo lectura: HTTP GET sin seguir redirects; nunca toca DNS, web ni GSC.
 * Ejecutar: node scripts/audit-legacy-http.mjs
 *
 * Compara: status HTTP, Location, meta-refresh inmediato, rel canonical del
 * alias y status/canonical del destino. No infiere la canonical elegida
 * por Google, que solo se comprueba con URL Inspection de Search Console.
 */
const origin = 'https://depofibra.com';
const routes = [
  ['/cisternas.html', '/cubas-cisternas/'],
  ['/depositos-poliester-valencia.html', '/depositos/valencia/'],
  ['/fosas-septicas-sevilla.html', '/fosas-septicas/sevilla/'],
  ['/depositos-agua-murcia.html', '/depositos/murcia/'],
  ['/piscinas-poliester-badajoz.html', '/piscinas/'],
  ['/blog/normativa-fosas-septicas-2026.html', '/blog/normativa-fosas-septicas-2026-permisos-documentacion/'],
  ['/blog/mantenimiento-piscina-poliester.html', '/blog/mantenimiento-piscina-poliester/'],
  ['/blog/guia-tecnica-prfv.html', '/blog/que-es-prfv-depositos-fibra-vidrio/'],
  ['/fosas.html', '/fosas-septicas/'],
];

const matches = (html, tagName) =>
  [...html.matchAll(new RegExp('<' + tagName + '\\b[^>]*>', 'gi'))].map(hit => hit[0]);

function getAttribute(tag, attribute) {
  if (!tag) return null;
  const regex = new RegExp('\\b' + attribute + '\\s*=\\s*(?:"([^"]*)"|\\x27([^\\x27]*)\\x27|([^\\s>]+))', 'i');
  const result = regex.exec(tag);
  return result ? (result[1] ?? result[2] ?? result[3]) : null;
}

function canonicalUrl(html) {
  const tag = matches(html, 'link').find(candidate =>
    (getAttribute(candidate, 'rel') || '').toLowerCase().split(/\s+/).includes('canonical')
  );
  return getAttribute(tag, 'href');
}

function instantMetaRefreshTarget(html, fromPath) {
  const tag = matches(html, 'meta').find(candidate =>
    (getAttribute(candidate, 'http-equiv') || '').toLowerCase() === 'refresh'
  );
  const content = getAttribute(tag, 'content');
  // Only an immediate refresh is regarded by Google as a permanent signal.
  const match = content?.match(/^\s*0\s*;\s*url\s*=\s*(.+?)\s*$/i);
  if (!match) return { value: content, target: null };
  const target = match[1].replace(/^(["'])|(["'])$/g, '');
  try {
    return { value: content, target: new URL(target, origin + fromPath).href };
  } catch {
    return { value: content, target: null };
  }
}

async function read(path) {
  const response = await fetch(origin + path, {
    method: 'GET',
    redirect: 'manual',
    signal: AbortSignal.timeout(20000),
    headers: { Accept: 'text/html' },
  });
  return {
    response,
    html: await response.text(),
  };
}

async function check([alias, target]) {
  const intended = origin + target;
  const result = {
    alias,
    destination: target,
    errors: [],
  };
  try {
    const { response, html } = await read(alias);
    result.aliasStatus = response.status;
    result.httpLocation = response.headers.get('location');
    result.httpRefresh = response.headers.get('refresh');
    result.aliasCanonical = canonicalUrl(html);
    result.meta = instantMetaRefreshTarget(html, alias);

    if ([301, 308].includes(response.status)) {
      // Real HTTP permanent redirects, should they ever be configured later.
      let finalLocation = null;
      try { finalLocation = new URL(result.httpLocation, origin + alias).href; }
      catch { /* invalid Location */ }
      if (finalLocation !== intended) {
        result.errors.push('HTTP permanent redirect points somewhere other than intended destination');
      }
    } else if (response.status === 200) {
      // Current GitHub Pages fallback is HTML, NOT an HTTP 301.
      if (result.meta.target !== intended) result.errors.push('Missing or incorrect instant meta refresh');
      if (result.aliasCanonical !== intended) result.errors.push('Alias canonical does not match destination');
    } else {
      result.errors.push('Alias returns HTTP ' + response.status);
    }

    const dest = await read(target);
    result.destinationStatus = dest.response.status;
    result.destinationCanonical = canonicalUrl(dest.html);
    if (dest.response.status !== 200) result.errors.push('Target does not return HTTP 200');
    if (result.destinationCanonical !== intended) result.errors.push('Target does not declare its own canonical');

    // Only statements backed by this HTTP test: not a claim about Google's index.
    result.method = [301, 308].includes(response.status) ? 'HTTP permanent' :
      response.status === 200 && result.meta.target === intended ? 'HTML immediate refresh' : 'unverified';
  } catch (error) {
    result.errors.push(String(error));
  }
  console.log(JSON.stringify(result));
  return result;
}

const results = [];
for (let i = 0; i < routes.length; i += 3) {
  results.push(...await Promise.all(routes.slice(i, i + 3).map(check)));
}

// GSC separately records /fosas.html/ as a historical trailing-slash variant.
// Probe the variant without pretending it is a supported alias.
try {
  const { response, html } = await read('/fosas.html/');
  console.log(JSON.stringify({
    observation: 'legacy trailing slash variant',
    path: '/fosas.html/',
    httpStatus: response.status,
    httpLocation: response.headers.get('location'),
    canonical: canonicalUrl(html),
    meta: instantMetaRefreshTarget(html, '/fosas.html/'),
    informationalOnly: true,
  }));
} catch (error) {
  console.log(JSON.stringify({
    observation: 'legacy trailing slash variant',
    path: '/fosas.html/',
    error: String(error),
    informationalOnly: true,
  }));
}

const failed = results.filter(item => item.errors.length);
const methods = results.reduce((all, item) => {
  all[item.method || 'unverified'] = (all[item.method || 'unverified'] || 0) + 1;
  return all;
}, {});
console.log('RESUMEN HTTP LEGACY:', JSON.stringify({
  checked: results.length,
  failing: failed.length,
  methods,
  failedAliases: failed.map(item => item.alias),
  source: 'Live GET - no Google canonical claim',
  observedAt: new Date().toISOString(),
}));
if (failed.length) process.exitCode = 1;
