import type { ModelViewerElement } from '@google/model-viewer';
import libraryUrl from '@google/model-viewer/dist/model-viewer.min.js?url';

type Family = 'vertical' | 'vasos';
type Shade = 'blanco' | 'verde' | 'gris';
const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const vertical = get<HTMLSelectElement>('space-size-vertical');
const vasos = get<HTMLSelectElement>('space-size-vasos');
const host = get('space-model-host');
const load = get('space-load');
const retry = get<HTMLButtonElement>('space-retry');
const launch = get<HTMLButtonElement>('space-launch');
const quote = get<HTMLButtonElement>('space-quote');
const support = get('space-support');
const handoff = get<HTMLDetailsElement>('space-handoff');
const qr = get<HTMLImageElement>('space-qr-img');
const zoomIn = get<HTMLButtonElement>('space-zoom-in');
const zoomOut = get<HTMLButtonElement>('space-zoom-out');
const reset = get<HTMLButtonElement>('space-reset');
const familyButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-space-family]'));
const colorButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-space-color]'));
const colors: Shade[] = ['blanco', 'verde', 'gris'];

let family: Family = 'vertical';
let shade: Shade = 'blanco';
let model: ModelViewerElement | null = null;
let ready = false;
let visible = false;
let sequence = 0;
let loadTimeout: number | undefined;
let arTimeout: number | undefined;
let loadLibraryFailureCount = 0;
let webGLSupport: boolean | undefined;
const broken = new Map<string, number>();
const initialOrbit = '28deg 72deg 100%';

function selectElement() {
  return family === 'vertical' ? vertical : vasos;
}
function selection() {
  return selectElement().selectedOptions[0];
}
function effectiveShade(): Shade {
  return family === 'vertical' ? shade : 'blanco';
}
function selectedId() {
  return selectElement().value;
}
function modelStem() {
  const option = selection();
  return option.dataset.src! + (family === 'vertical' && shade !== 'blanco' ? '-' + shade : '');
}
function currentHash() {
  return family + '/' + selectedId() + '/' + effectiveShade();
}
function updateUrl() {
  history.replaceState(null, '', '#' + currentHash());
}
function updateQR() {
  if (!handoff.open) return;
  qr.src = '/visualizador/qr/' + family + '-' + selectedId() + '-' + effectiveShade() + '.svg';
}
function setColorUI() {
  for (const button of colorButtons) {
    const active = button.dataset.spaceColor === shade;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('is-active', active);
  }
}
function setFamilyUI() {
  const isVaso = family === 'vasos';
  vertical.hidden = isVaso;
  vertical.disabled = isVaso;
  vasos.hidden = !isVaso;
  vasos.disabled = !isVaso;
  get('space-color-field').hidden = isVaso;
  get('space-size-label').setAttribute('for', isVaso ? 'space-size-vasos' : 'space-size-vertical');
  get('space-height-label').textContent = isVaso ? 'Alto de tabla' : 'Cota longitudinal de ficha';
  get('space-config-title').textContent = isVaso ? 'Depósito tipo vaso' : 'Vertical de base plana';
  get('space-config-description').textContent = isVaso
    ? 'Formato compacto con borde y cubierta superior. El cuerpo del modelo sigue la forma visible de la referencia.'
    : 'Explora sus dimensiones y comprueba visualmente la ocupación en tu espacio.';
  for (const button of familyButtons) {
    const active = button.dataset.spaceFamily === family;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  }
  setColorUI();
}
function updateDetails() {
  const option = selection();
  if (!option) return;
  get('space-model-title').textContent = (family === 'vertical' ? 'Vertical · ' : 'Tipo vaso · ') +
    option.text + (family === 'vertical' ? ' · ' + shade.charAt(0).toUpperCase() + shade.slice(1) : '');
  get('space-diameter').textContent = option.dataset.diameter!;
  get('space-height').textContent = option.dataset.height!;
  quote.dataset.note = option.dataset.note! + (family === 'vertical'
    ? ' Acabado visual ' + shade + ' (simulación; confirmar disponibilidad real).'
    : ' Depósito tipo vaso; confirmar dimensiones exteriores reales y tapa con el proveedor.');
  get('space-distance').hidden = option.dataset.large !== 'true';
  updateQR();
  if (visible) void loadModel();
}
function syncAR() {
  const canLaunch = Boolean(ready && model?.canActivateAR);
  launch.disabled = !canLaunch;
  support.textContent = !ready
    ? 'Preparando el modelo y comprobando tu dispositivo…'
    : canLaunch
      ? 'Enfoca una superficie despejada, mueve el móvil suavemente y toca el suelo para colocar el producto.'
      : 'Este dispositivo no permite abrir la cámara desde el visor. Puedes explorar el 3D o continuar desde un móvil compatible.';
}
function setReady(value: boolean) {
  ready = value;
  [zoomIn, zoomOut, reset].forEach(el => el.disabled = !value);
  syncAR();
}
function fail(message: string) {
  window.clearTimeout(loadTimeout);
  window.clearTimeout(arTimeout);
  setReady(false);
  load.textContent = message;
  load.hidden = false;
  retry.hidden = false;
}
function hasWebGL(): boolean {
  if (webGLSupport === undefined) {
    const context = document.createElement('canvas').getContext('webgl2');
    webGLSupport = Boolean(context);
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return webGLSupport;
}
function watchAR(current: ModelViewerElement, token: number, count = 0) {
  if (token !== sequence || !ready || model !== current) return;
  syncAR();
  if (!current.canActivateAR && count < 40) {
    arTimeout = window.setTimeout(() => watchAR(current, token, count + 1), 250);
  }
}
async function loadModel() {
  const token = ++sequence;
  window.clearTimeout(loadTimeout);
  window.clearTimeout(arTimeout);
  host.replaceChildren();
  model = null;
  setReady(false);
  retry.hidden = true;
  load.hidden = false;
  load.textContent = 'Cargando el modelo 3D…';
  const base = modelStem();
  try {
    if (!hasWebGL()) throw new Error('webgl');
    if (!customElements.get('model-viewer')) {
      const url = loadLibraryFailureCount ? libraryUrl + '?retry=' + loadLibraryFailureCount : libraryUrl;
      try { await import(/* @vite-ignore */ url); }
      catch (error) { loadLibraryFailureCount++; throw error; }
    }
    if (token !== sequence) return;
    const current = document.createElement('model-viewer') as ModelViewerElement;
    model = current;
    const reload = broken.get(base);
    const attrs = {
      src: base + '.glb' + (reload ? '?retry=' + reload : ''),
      'ios-src': base + '.usdz',
      alt: (family === 'vertical' ? 'Depósito vertical' : 'Depósito tipo vaso') +
        ', ' + selection().text + ', representación 3D orientativa.',
      'camera-controls': '', 'disable-pan': '', 'disable-tap': '',
      'camera-orbit': initialOrbit, 'camera-target': 'auto auto auto',
      'field-of-view': '30deg', 'touch-action': 'pan-y',
      'interaction-prompt': 'none', 'shadow-intensity': '0.86',
      'shadow-softness': '0.85', ar: '',
      'ar-modes': 'webxr scene-viewer quick-look', 'ar-scale': 'fixed',
      'ar-placement': 'floor',
      'environment-image': '/models/ar/estudio.hdr',
      'tone-mapping': 'neutral', loading: 'eager',
    };
    for (const [name, value] of Object.entries(attrs)) current.setAttribute(name, value);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) current.setAttribute('interpolation-decay', '0');
    current.addEventListener('load', () => {
      if (token !== sequence) return;
      window.clearTimeout(loadTimeout);
      load.hidden = true;
      retry.hidden = true;
      setReady(true);
      watchAR(current, token);
    });
    current.addEventListener('error', () => {
      if (token !== sequence) return;
      broken.set(base, token);
      fail('No hemos podido cargar este modelo. Puedes consultar sus medidas y reintentarlo.');
    });
    current.addEventListener('ar-status', () => {
      if (token !== sequence) return;
      syncAR();
      if (current.getAttribute('ar-status') === 'failed') {
        support.textContent = 'No se ha podido abrir la cámara. Prueba en Safari para iPhone o Chrome para Android.';
      }
    });
    host.replaceChildren(current);
    loadTimeout = window.setTimeout(() => {
      if (token === sequence && !ready) fail('La descarga está tardando demasiado. Comprueba tu conexión y vuelve a intentar.');
    }, 25000);
  } catch {
    if (token === sequence) fail('El visor no está disponible en este navegador. Puedes consultar los modelos y sus dimensiones.');
  }
}
function readHash() {
  const raw = decodeURIComponent(window.location.hash.slice(1));
  const [requestedFamily, id, color] = raw.split('/');
  family = requestedFamily === 'vasos' ? 'vasos' : 'vertical';
  if (family === 'vertical') shade = colors.includes(color as Shade) ? color as Shade : 'blanco';
  const select = selectElement();
  const valid = Array.from(select.options).some(option => option.value === id);
  if (valid) select.value = id;
  setFamilyUI();
  updateDetails();
}
readHash();
window.addEventListener('hashchange', () => {
  const [candidate, id] = decodeURIComponent(location.hash.slice(1)).split('/');
  if ((candidate === 'vertical' || candidate === 'vasos') &&
      Array.from((candidate === 'vertical' ? vertical : vasos).options).some(o => o.value === id)) {
    readHash();
  }
});
for (const button of familyButtons) {
  button.addEventListener('click', () => {
    const requested = button.dataset.spaceFamily;
    if (requested !== 'vertical' && requested !== 'vasos') return;
    if (requested === family) {
      if (matchMedia('(max-width:900px)').matches) get('space-studio').scrollIntoView({block:'start',behavior:'smooth'});
      return;
    }
    family = requested;
    setFamilyUI();
    updateUrl();
    updateDetails();
    if (matchMedia('(max-width:900px)').matches) {
      get('space-studio').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }
  });
}
for (const select of [vertical, vasos]) {
  select.addEventListener('change', () => { updateUrl(); updateDetails(); });
}
for (const button of colorButtons) {
  button.addEventListener('click', () => {
    const value = button.dataset.spaceColor as Shade;
    if (family !== 'vertical' || !colors.includes(value) || shade === value) return;
    shade = value;
    setColorUI();
    updateUrl();
    updateDetails();
  });
}
handoff.addEventListener('toggle', updateQR);
retry.addEventListener('click', () => { webGLSupport = undefined; void loadModel(); });
zoomIn.addEventListener('click', () => model?.zoom(1));
zoomOut.addEventListener('click', () => model?.zoom(-1));
reset.addEventListener('click', () => {
  if (!model) return;
  model.cameraOrbit = initialOrbit;
  model.fieldOfView = '30deg';
  model.cameraTarget = 'auto auto auto';
  model.requestUpdate('cameraOrbit');
  model.requestUpdate('fieldOfView');
  model.requestUpdate('cameraTarget');
  model.jumpCameraToGoal();
});
launch.addEventListener('click', () => {
  if (!ready || !model?.canActivateAR) { syncAR(); return; }
  // Mantener el gesto directo; Safari Quick Look y Scene Viewer lo necesitan.
  void model.activateAR().catch(() => {
    support.textContent = 'No se pudo activar la realidad aumentada. Sigue en 3D o utiliza un navegador compatible.';
  });
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(e => e.isIntersecting)) return;
    observer.disconnect();
    visible = true;
    void loadModel();
  }, {rootMargin:'200px'});
  observer.observe(host);
} else {
  visible = true;
  void loadModel();
}
