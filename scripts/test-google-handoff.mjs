import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isGoogleInAppBrowser, createChromeHandoff, createIOSChromeHandoff } from '../src/lib/ar/browser-handoff.mjs';

test('Google App es distinta a Chrome para selección de navegador', () => {
  assert.equal(isGoogleInAppBrowser('Mozilla/5.0 (Linux; Android 15) AppleWebKit GSA/17.2 Chrome/135'), true);
  assert.equal(isGoogleInAppBrowser('Mozilla/5.0 (iPhone; CPU iPhone OS 18_4) AppleWebKit GSA/350.0'), true);
  assert.equal(isGoogleInAppBrowser('Mozilla/5.0 (Linux; Android 15; Pixel) AppleWebKit Chrome/137 Safari/537.36'), false);
  assert.equal(isGoogleInAppBrowser('Mozilla/5.0 (Linux; Android 15; Pixel; wv) Chrome/137'), true);
});

test('Chrome recibe el producto, la capacidad y el color (también HEX)', () => {
  const selections = [
    'vertical/10000-2450-2500/verde',
    'vasos/vaso-530-960-950/gris',
    'vasos/vaso-110-510-690/personalizado-ad724b',
  ];
  for (const selection of selections) {
    const url = new URL('https://depofibra.com/visualizador/');
    url.searchParams.set('seleccion', selection);
    const intent = createChromeHandoff(url.href);
    assert.ok(intent.startsWith('intent://depofibra.com/visualizador/?seleccion='));
    assert.ok(intent.includes('#Intent;scheme=https;package=com.android.chrome;'));
    assert.ok(intent.includes('action=android.intent.action.VIEW;'));
    const fallback = intent.match(/S\.browser_fallback_url=([^;]+);end;$/)?.[1];
    assert.ok(fallback);
    assert.equal(new URL(decodeURIComponent(fallback)).searchParams.get('seleccion'), selection);
  }
});

test('No permite insertar fragmentos que rompan la estructura de #Intent', () => {
  assert.throws(() => createChromeHandoff('https://depofibra.com/visualizador/#vertical/123/verde'));
  assert.throws(() => createChromeHandoff('javascript:alert(1)'));
});


test('Un toque en Google iOS abre Chrome instalado sin copiar y mantiene la selección', () => {
  const selections = [
    'vertical/10000-2450-2500/verde',
    'vasos/vaso-530-960-950/negro',
    'vasos/vaso-110-510-690/personalizado-ad724b',
  ];
  for (const selection of selections) {
    const incoming = new URL('https://depofibra.com/visualizador/');
    incoming.searchParams.set('seleccion', selection);
    incoming.searchParams.set('iniciarAR', '1');
    const link = createIOSChromeHandoff(incoming.href);
    assert.ok(link.startsWith('googlechromes://depofibra.com/visualizador/'));
    const restored = new URL('https://' + link.slice('googlechromes://'.length));
    assert.equal(restored.searchParams.get('seleccion'), selection);
    assert.equal(restored.searchParams.get('iniciarAR'), '1');
  }
});

test('Los esquemas iOS válidos preservan HTTPS, HTTP y rechazan otros esquemas', () => {
  assert.equal(createIOSChromeHandoff('https://depofibra.com/visualizador/'),
    'googlechromes://depofibra.com/visualizador/');
  assert.equal(createIOSChromeHandoff('http://example.com/prueba'),
    'googlechrome://example.com/prueba');
  assert.throws(() => createIOSChromeHandoff('javascript:alert(1)'));
  assert.throws(() => createIOSChromeHandoff('file:///temp/modelo.usdz'));
});
