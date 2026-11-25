/**
 * QA REAL del embudo de solicitud en Chromium. NO se envían datos a terceros.
 * Todas las peticiones externas quedan bloqueadas, salvo la respuesta simulada
 * de FormSubmit; GTM/GA4 nunca se contactan y no se emplean personas reales.
 *
 * Uso: con Astro preview ejecutándose en 127.0.0.1:4321,
 * npm install --no-save playwright@1.57.0 && npx playwright install chromium
 * node scripts/test-quote-browser.mjs
 */
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4321';
const cookieKey = 'depofibra-cookie-preferences';
const cookieVersion = 'depofibra-cookies-v2-ga4-consent';
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });

async function newQaPage({ analytics = false, mobile = false } = {}) {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1280, height: 900 } });
  if (analytics) {
    await context.addInitScript(({ key, version }) => {
      try {
        localStorage.setItem(key, JSON.stringify({ version, necessary: true, analytics: true, savedAt: '2026-11-25T00:00:00.000Z' }));
      } catch {}
    }, { key: cookieKey, version: cookieVersion });
  }
  let providerResult = false;
  const submitted = [];
  await context.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.origin === base) return route.continue();
    // Bloqueo por defecto de TODOS los destinos externos. Nunca contacto real.
    if (url.hostname !== 'formsubmit.co' || !url.pathname.startsWith('/ajax/')) return route.abort();
    const headers = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type, accept',
      'content-type': 'application/json'
    };
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers, body: '' });
    if (req.method() !== 'POST') return route.abort();
    submitted.push(req.postDataJSON());
    return route.fulfill({ status: 200, headers, body: JSON.stringify({ success: providerResult }) });
  });
  const page = await context.newPage();
  return { context, page, submitted, setProviderResult(value) { providerResult = value; } };
}

try {
  // Caso: CTA 10.000 L -> formulario con contexto -> rechazo simulado
  // -> alternativa WhatsApp -> aceptación simulada -> confirmación/medición.
  const qa = await newQaPage({ analytics: true, mobile: true });
  await qa.page.goto(base + '/depositos/vertical-base-plana/10000-litros/?utm_email=secreto_ficticio_no_reenviar#origen', { waitUntil: 'domcontentloaded' });
  await qa.page.locator('.cap-btn--primary.open-quote-trigger').first().click();
  assert.equal(await qa.page.locator('#quoteModal').getAttribute('aria-hidden'), 'false', 'El CTA de 10k debe abrir formulario');
  assert.equal(await qa.page.locator('#quoteProduct').inputValue(), 'Depósito', 'Debe seleccionar categoría de depósito');
  assert.match(await qa.page.locator('#quoteReference').inputValue(), /10\.000 litros/);
  assert.match(await qa.page.locator('#quoteDetails').inputValue(), /10\.000 litros/);
  assert.equal(await qa.page.locator('#quoteOrigin').inputValue(), base + '/depositos/vertical-base-plana/10000-litros/',
    'La procedencia debe omitir búsquedas y fragmentos potencialmente sensibles');

  await qa.page.locator('#quoteName').fill('QA Ficticia');
  await qa.page.locator('#quoteLocation').fill('Casariche');
  await qa.page.locator('#quotePhone').fill('000000000');
  await qa.page.locator('#quoteSubmit').click();
  await qa.page.waitForFunction(() => !document.getElementById('quoteFeedback')?.hidden, { timeout: 12000 });
  assert.match(await qa.page.locator('#quoteFeedback').textContent(), /No hemos podido confirmar el envío/);
  assert.equal(await qa.page.locator('#quoteFallback').isVisible(), true, 'Debe ofrecer WhatsApp ante fallo proveedor');
  assert.match(await qa.page.locator('#quoteFallback a').getAttribute('href'), /^https:\/\/wa\.me\/34642129233\?text=/);
  assert.equal(await qa.page.locator('#quoteName').inputValue(), 'QA Ficticia', 'El error debe conservar la consulta');
  assert.equal(qa.submitted.length, 1, 'Primer envío simulado');
  assert.equal(qa.submitted[0]['Página de origen'], base + '/depositos/vertical-base-plana/10000-litros/');
  assert.match(qa.submitted[0]['Referencia consultada'], /10\.000 litros/);
  assert.ok(!JSON.stringify(qa.submitted[0]).includes('secreto_ficticio_no_reenviar'), 'Nunca enviar query potencialmente sensible');

  // Segundo intento: el proveedor lo acepta pero NO se valida entrega de email.
  qa.setProviderResult(true);
  await qa.page.locator('#quoteSubmit').click();
  await qa.page.waitForURL('**/solicitud-enviada/', { timeout: 12000 });
  assert.match(await qa.page.locator('#confirmationTitle').textContent(), /Gracias por tu consulta/);
  assert.equal(qa.submitted.length, 2);
  await qa.page.waitForFunction(() => Array.isArray(window.dataLayer) && window.dataLayer.some(x => x.event === 'quote_form_provider_accepted'), { timeout: 12000 });
  assert.equal(await qa.page.evaluate(() => sessionStorage.getItem('depofibra-form-success-v1')), null,
    'No se puede reutilizar el marcador de éxito');

  await qa.page.reload({ waitUntil: 'load' });
  assert.equal((await qa.page.locator('#confirmationTitle').textContent())?.trim(), 'Solicitar presupuesto',
    'Una visita/reload directa no debe mostrar falso éxito');
  assert.equal(await qa.page.evaluate(() => (window.dataLayer || []).filter(x => x.event === 'quote_form_provider_accepted').length), 0,
    'El éxito no debe contabilizarse dos veces');
  await qa.context.close();
  console.log('PASS: CTA 10k, origen sin query, fallo y fallback, éxito real simulado, evento único con consentimiento.');

  // Otra sesión sin consentimiento: la página de gracias directa no crea evento.
  const direct = await newQaPage({ analytics: false });
  await direct.page.goto(base + '/solicitud-enviada/', { waitUntil: 'load' });
  assert.equal((await direct.page.locator('#confirmationTitle').textContent())?.trim(), 'Solicitar presupuesto');
  assert.equal(await direct.page.evaluate(() => (window.dataLayer || []).some(x => x.event === 'quote_form_provider_accepted')), false);
  assert.equal(direct.submitted.length, 0);
  await direct.context.close();
  console.log('PASS: visita directa sin consentimiento no genera solicitud ni carga evento de éxito.');
} finally {
  await browser.close();
}
