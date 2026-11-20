/**
 * La app Google Search puede usar un navegador integrado sin capacidad AR.
 * Este traspaso se inicia solo al pulsar un enlace, sin redirecciones forzadas.
 */
export function isGoogleInAppBrowser(ua = '') {
  const userAgent = String(ua).toLowerCase();
  return userAgent.includes('gsa/') ||
    userAgent.includes('googleapp/') ||
    userAgent.includes('googlequicksearchbox') ||
    userAgent.includes('; wv)') || userAgent.includes('; wv;');
}

export function createChromeHandoff(urlString) {
  const url = new URL(urlString);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('Solo se admiten enlaces web');
  }
  if (url.hash) {
    throw new Error('Trasladar la selección a ?seleccion= antes de crear #Intent');
  }
  const path = url.host + url.pathname + url.search;
  return 'intent://' + path +
    '#Intent;scheme=' + url.protocol.slice(0, -1) +
    ';package=com.android.chrome;action=android.intent.action.VIEW;' +
    'S.browser_fallback_url=' + encodeURIComponent(url.href) + ';end;';
}


/**
 * Chrome iOS registra googlechromes:// para URLs HTTPS.
 * Su apertura requiere un clic real; una página no puede forzar Safari
 * ni comprobar de forma fiable si Chrome está instalado.
 * Ver: Chromium docs/ios/opening_links.md.
 */
export function createIOSChromeHandoff(urlString) {
  const url = new URL(urlString);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('Solo se admiten enlaces web');
  }
  const scheme = url.protocol === 'https:' ? 'googlechromes' : 'googlechrome';
  return scheme + '://' + url.host + url.pathname + url.search + url.hash;
}
