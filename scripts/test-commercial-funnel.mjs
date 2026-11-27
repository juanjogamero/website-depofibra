/**
 * Pruebas sin enviar formularios ni cargar etiquetas externas.
 * Revisa el contrato técnico del embudo comercial, no el estado real de GTM/GA4
 * ni la aceptación de correos por FormSubmit.
 * Ejecutar DESPUÉS de npm run build.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = file => readFileSync(path.resolve(root, file), 'utf8');
const modalSource = read('src/components/QuoteModal.astro');
const consentSource = read('src/components/CookieConsent.astro');
const thanksSource = read('src/pages/solicitud-enviada/index.astro');

// Cobertura de conversión: todas las URLs comerciales prioritarias deben
// mantener la opción real de solicitar presupuesto tras cada despliegue.
const commercialPages = [
  '/', '/depositos/', '/depositos/para-riego/', '/depositos/para-granjas/',
  '/depositos/agua-de-lluvia/', '/depositos/agua-de-pozo/',
  '/depositos/vertical-base-plana/5000-litros/',
  '/depositos/vertical-base-plana/10000-litros/',
  '/depositos/vertical-base-plana/15000-litros/',
  '/depositos/murcia/', '/depositos/valencia/', '/depositos/sevilla/',
  '/depositos/palencia/', '/depositos/soria/',
  '/cubas-cisternas/', '/cubas-cisternas/cuba-remolque/',
  '/cubas-cisternas/cisterna-camion/',
  '/fosas-septicas/', '/fosas-septicas/fosa-estanca/',
  '/fosas-septicas/fosa-biologica/', '/fosas-septicas/oxidacion-total/',
  '/piscinas/', '/contacto/'
];

function compiledHtml(urlPath) {
  const file = path.resolve(root, 'dist', urlPath.slice(1), 'index.html');
  assert.ok(existsSync(file), 'Página comercial no compilada: ' + urlPath);
  return readFileSync(file, 'utf8');
}

test('Todas las páginas comerciales principales incluyen formulario y CTA funcional por clase', () => {
  for (const route of commercialPages) {
    const html = compiledHtml(route);
    assert.match(html, /id=["']quoteModal["']/, route + ' modal');
    assert.match(html, /id=["']quoteForm["']/, route + ' formulario');
    assert.match(html, /class=["'][^"']*\bopen-quote-trigger\b/, route + ' botón');
    assert.match(html, /id=["']quoteOrigin["']/, route + ' origen de consulta');
    assert.match(html, /id=["']quoteReference["']/, route + ' referencia del producto');
    assert.match(html, /href=["']tel:\+34642129233["']/, route + ' alternativa de llamada');
  }
});

test('WhatsApp prioritario conserva el formulario alternativo en la web comercial', () => {
  const config = read('src/data/whatsappContact.ts');
  const header = read('src/components/Header.astro');
  const mobile = read('src/components/MobileNav.astro');
  const footer = read('src/components/Footer.astro');
  const contact = read('src/pages/contacto/index.astro');

  assert.match(config, /whatsappNumber = '34642129233'/);
  assert.match(config, /encodeURIComponent\(whatsappDefaultMessage\)/);
  assert.match(header, /class="header-whatsapp"[^>]*href=\{whatsappHref\}/);
  assert.match(header, /header-whatsapp__label">WhatsApp<\/span>/);
  assert.match(mobile, /class="mobile-nav__item mobile-nav__item--primary"[^>]*[\s\S]*?href=\{whatsappContactHref\}/);
  assert.match(mobile, /mobile-panel__whatsapp/);
  assert.match(mobile, /open-quote-trigger[^"]*" type="button"/);
  assert.match(footer, /df-footer__whatsapp/);
  assert.match(footer, /open-quote-trigger df-footer__form/);
  assert.match(contact, /id="contactWhatsapp"/);
  assert.match(contact, /open-quote-trigger" type="button">Pedir presupuesto por formulario/);
  assert.match(contact, /encodeURIComponent\(message\)/);

  // El canal principal debe estar en el HTML generado sin depender de JS
  // y el formulario existente sigue disponible en todas las URLs probadas.
  for (const route of commercialPages) {
    const html = compiledHtml(route);
    assert.match(html, /href="https:\/\/wa\.me\/34642129233\?text=/, route + ' WhatsApp visible');
    assert.match(html, /id="quoteForm"/, route + ' formulario conservado');
  }
});

test('Los botones WhatsApp comparten icono relleno y letras blancas sobre verde', () => {
  const icon = read('src/components/WhatsAppIcon.astro');
  const header = read('src/components/Header.astro');
  const mobile = read('src/components/MobileNav.astro');
  const footer = read('src/components/Footer.astro');
  const contact = read('src/pages/contacto/index.astro');
  const detail = read('src/components/DepositProductDetail.astro');

  // Corrige .btn svg (fill:none y stroke:currentColor), que anulaba el icono
  // relleno en Contacto. El tamaño debe seguir la prop size de cada uso.
  assert.match(icon, /width:\$\{size\}px;height:\$\{size\}px/);
  assert.match(icon, /fill:currentColor;stroke:none/);
  assert.match(header, /\.header-whatsapp \{[^\n]*background: #25d366; color: #fff;/);
  assert.match(header, /\.header-whatsapp:hover \{[^\n]*color: #fff;/);
  assert.match(mobile, /\.mobile-nav__item--primary \{[\s\S]*?background: #25d366;[\s\S]*?color: #fff;/);
  assert.match(mobile, /\.mobile-panel__whatsapp \{[\s\S]*?background: #25d366;[\s\S]*?color: #fff;/);
  assert.match(footer, /\.df-footer__action \.df-footer__whatsapp\{[^\n]*background:#25d366;color:#fff\}/);
  assert.match(contact, /\.contact-actions \.contact-actions__whatsapp \{[^\n]*background:#25d366;[^\n]*color:#fff/);
  assert.match(detail, /\.product-button--whatsapp\{background:#25d366;color:#fff\}/);
  for (const route of ['/', '/contacto/', '/depositos/vertical-base-plana/10000-litros/']) {
    const html = compiledHtml(route);
    assert.match(html, /fill:currentColor;stroke:none/, route + ' debe tener SVG WhatsApp relleno');
  }
});

test('La solicitud AJAX usa contrato de FormSubmit y no anuncia éxito con solo HTTP 200', () => {
  assert.match(modalSource, /action=["']https:\/\/formsubmit\.co\/ajax\/[^"']+["']/);
  assert.match(modalSource, /headers:\s*\{\s*'Content-Type':\s*'application\/json',\s*'Accept':\s*'application\/json'/);
  assert.match(modalSource, /event\.preventDefault\(\)/);
  assert.match(modalSource, /if\s*\(!form\.checkValidity\(\)\)/);
  assert.match(modalSource, /const accepted = response\.ok && \(data\?\.success === true \|\| data\?\.success === 'true'\)/);
  const accepted = modalSource.indexOf('const accepted = response.ok');
  const reject = modalSource.indexOf('if (!accepted) throw', accepted);
  const session = modalSource.indexOf("sessionStorage.setItem('depofibra-form-success-v1', '1')", accepted);
  const navigate = modalSource.indexOf("window.location.assign('/solicitud-enviada/')", accepted);
  assert.ok(accepted >= 0 && reject > accepted && session > reject && navigate > session,
    'Sin confirmación explícita no debe mostrarse la página de gracias');
  assert.match(modalSource, /quoteOrigin\.value = window\.location\.origin \+ window\.location\.pathname/);
  assert.ok(!modalSource.includes('quoteOrigin.value = window.location.href'),
    'El formulario no debe adjuntar a los correos parámetros de URL potencialmente privados');
  assert.match(modalSource, /id="quoteFallback" class="quote-fallback" hidden/);
  assert.match(modalSource, /href=\{whatsappContactHref\}/);
  assert.match(modalSource, /if \(quoteFallback\) quoteFallback\.hidden = false;/);
  assert.match(modalSource, /if \(quoteFallback\) quoteFallback\.hidden = true;/);
  assert.match(modalSource, /quoteReference\.value = selectedProduct/);
});

test('La página de gracias no contabiliza visitas directas como consultas aceptadas', () => {
  const marker = "sessionStorage.getItem('depofibra-form-success-v1')";
  const used = thanksSource.indexOf(marker);
  const consumed = thanksSource.indexOf("sessionStorage.removeItem('depofibra-form-success-v1')");
  const success = thanksSource.indexOf('if (accepted) {');
  const event = thanksSource.indexOf("event: 'quote_form_provider_accepted'");
  assert.ok(used >= 0 && consumed > used && success > consumed && event > success);
  assert.match(thanksSource, /pref\.analytics !== true\) return/);
  assert.match(thanksSource, /pref\?\.version !== 'depofibra-cookies-v2-ga4-consent'/);
  assert.match(thanksSource, /if \(accepted\) submittedFrom = sessionStorage\.getItem\('depofibra-form-origin-path-v1'\)/);
  assert.match(thanksSource, /sessionStorage\.removeItem\('depofibra-form-origin-path-v1'\)/);
  assert.match(modalSource, /sessionStorage\.setItem\('depofibra-form-origin-path-v1', window\.location\.pathname\)/);
  assert.ok(!modalSource.includes("sessionStorage.setItem('depofibra-form-origin-path-v1', window.location.href"),
    'No deben enviarse parámetros ni fragmentos de URL a Analytics');
});

test('Eventos de intención separados de aceptación y respetando la elección analítica', () => {
  assert.match(consentSource, /const initial = currentChoice\(\);[\s\S]*if \(initial\.analytics\) enableMeasurement\(\)/);
  assert.match(consentSource, /if \(analytics\) enableMeasurement\(\)/);
  assert.match(consentSource, /function pushEvent\(name: string\) \{\s*if \(!gtmLoaded\) return;/);
  for (const name of ['contact_phone','contact_whatsapp','quote_form_open','quote_form_submit_attempt']) {
    assert.ok(consentSource.includes("pushEvent('" + name + "')"), 'Falta evento: ' + name);
  }
  assert.ok(!consentSource.includes("pushEvent('quote_form_provider_accepted')"),
    'El éxito del proveedor no debe atribuirse a un simple click/submit');
  assert.match(consentSource, /dataLayer\?\.push\(\{event:name\}\)/);
  assert.match(consentSource, /gtm\.js\?id=GTM-/);
});

test('No hay nombres, teléfono, correos ni contenido del formulario en payload de medición', () => {
  const allowed = [...consentSource.matchAll(/dataLayer\?\.push\(([^)]*)\)/g)].map(m => m[1]);
  assert.deepEqual(allowed, ['{event:name}']);
  assert.match(thanksSource, /source_page_path: safeSource/);
  assert.match(thanksSource, /layer\.push\(safeSource/);
  assert.ok(!thanksSource.includes('source_page_path: quoteDetails'));
  assert.ok(!thanksSource.includes('source_page_path: quotePhone'));
  assert.ok(!thanksSource.includes('source_page_path: quoteEmail'));
  assert.ok(!consentSource.includes('formData.forEach('));
});


test('Las capacidades prioritarias permiten identificar la geometría orientativa en cada consulta', () => {
  const cases = [
    ['/depositos/vertical-base-plana/5000-litros/', [
      ['1.700', '2.500'], ['2.050', '1.650']
    ]],
    ['/depositos/vertical-base-plana/10000-litros/', [['2.450', '2.500']]],
    ['/depositos/vertical-base-plana/15000-litros/', [['2.450', '3.650']]],
  ];
  for (const [route, geometries] of cases) {
    const html = compiledHtml(route);
    const buttons = [...html.matchAll(/<button\b[^>]*class=["'][^"']*cap-measure-cta[^"']*["'][^>]*>/g)].map(m => m[0]);
    assert.equal(buttons.length, geometries.length, route + ' debe tener consulta por cada geometría documentada');
    for (const [diameter, secondCota] of geometries) {
      const found = buttons.find(button => button.includes('Diámetro de ficha: ' + diameter + ' mm')
        && button.includes('Segunda cota de ficha: ' + secondCota + ' mm'));
      assert.ok(found, route + ': no llega la combinación de cotas ' + diameter + ' / ' + secondCota + ' ; botones=' + JSON.stringify(buttons));
      assert.match(found, /open-quote-trigger/);
      assert.match(found, /NO altura total verificada/);
    }
  }
});


test('Las seis fichas de depósitos abren presupuesto in situ y conservan enlace a Contacto sin JS', () => {
  const familyRoutes = [
    '/depositos/vertical-base-plana/',
    '/depositos/horizontal-con-cunas/',
    '/depositos/horizontal-enterrable/',
    '/depositos/vertical-con-patas/',
    '/depositos/tipo-vaso/',
    '/depositos/cuadrados-rectangulares/',
  ];
  const withDimensionTable = new Set([
    '/depositos/vertical-base-plana/',
    '/depositos/horizontal-con-cunas/',
    '/depositos/horizontal-enterrable/',
  ]);
  for (const route of familyRoutes) {
    const html = compiledHtml(route);
    const selectors = withDimensionTable.has(route)
      ? ['data-contact-cta', 'data-contact-measures']
      : ['data-contact-cta'];
    for (const selector of selectors) {
      const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(m => m[0]).filter(tag => tag.includes(selector));
      assert.equal(anchors.length, 1, route + ': un solo enlace ' + selector);
      const link = anchors[0];
      assert.match(link, /open-quote-trigger/, route);
      assert.match(link, /href=["']\/contacto\//, route + ' alternativa sin JavaScript');
      assert.match(link, /data-product=["'][^"']+["']/, route + ' referencia del artículo');
    }
  }
  assert.match(modalSource, /trigger\.matches\('\[data-contact-cta\], \[data-contact-measures\]'\)/);
  assert.match(modalSource, /event\.preventDefault\(\)/);
  const source = read('src/components/DepositProductDetail.astro');
  assert.match(source, /contact\.dataset\.product = productText/);
  assert.match(source, /dimensionsContact\.dataset\.product = productText/);
  assert.match(source, /contact\.href = contactUrl\.pathname \+ contactUrl\.search/);
  assert.match(source, /dimensionsContact\.href = contactUrl\.pathname \+ contactUrl\.search/);
});
