import type { ModelViewerElement } from '@google/model-viewer';
import viewerModuleUrl from '@google/model-viewer/dist/model-viewer.min.js?url';

const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const selector = get<HTMLSelectElement>('ar-selector');
const host = get('ar-model-host');
const loadLabel = get('ar-load');
const retry = get<HTMLButtonElement>('ar-retry');
const launch = get<HTMLButtonElement>('ar-launch');
const support = get('ar-support');
const handoff = get<HTMLDetailsElement>('ar-handoff');
const qr = get<HTMLImageElement>('ar-code');
const zoomIn = get<HTMLButtonElement>('ar-plus');
const zoomOut = get<HTMLButtonElement>('ar-minus');
const reset = get<HTMLButtonElement>('ar-reset');
const orbit = '28deg 72deg 100%';
let viewer: ModelViewerElement | null = null;
let ready = false;
let inView = false;
let revision = 0;
let libraryFailures = 0;
const failedModels = new Map<string, number>();
let availabilityObserver: ResizeObserver | null = null;

function syncAR() {
  const available = Boolean(ready && viewer?.canActivateAR);
  launch.disabled = !available;
  handoff.hidden = available;
  support.textContent = available
    ? 'Enfoca el suelo, mueve el móvil suavemente y selecciona el lugar donde quieres visualizar el depósito. La escala es aproximada y depende del visor y del seguimiento.'
    : 'La realidad aumentada requiere un móvil compatible. Aquí puedes consultar las medidas y, si tu navegador admite 3D, girar el depósito.';
}

function setReady(value: boolean) {
  ready = value;
  for (const control of [zoomIn, zoomOut, reset]) control.disabled = !value;
  syncAR();
}

function failure(message: string) {
  setReady(false);
  loadLabel.textContent = message;
  loadLabel.hidden = false;
  retry.hidden = false;
}

async function loadModel() {
  const current = ++revision;
  const option = selector.selectedOptions[0];
  availabilityObserver?.disconnect();
  host.replaceChildren();
  viewer = null;
  setReady(false);
  support.textContent = 'Comprobando si tu dispositivo admite realidad aumentada…';
  retry.hidden = true;
  loadLabel.hidden = false;
  loadLabel.textContent = 'Cargando el modelo 3D…';
  try {
    // Avoid loading the rendering library if this browser cannot render the model.
    if (!hasWebGL()) throw new Error('webgl');
    if (!customElements.get('model-viewer')) {
      const scriptUrl = libraryFailures ? viewerModuleUrl + '?retry=' + libraryFailures : viewerModuleUrl;
      try { await import(/* @vite-ignore */ scriptUrl); }
      catch (error) { libraryFailures++; throw error; }
    }
    if (current !== revision) return;
    const model = document.createElement('model-viewer') as ModelViewerElement;
    viewer = model;
    const version = failedModels.get(option.value);
    const glb = option.dataset.url + '.glb' + (version ? '?retry=' + version : '');
    const attributes = {
      src: glb, 'ios-src': option.dataset.url + '.usdz',
      alt: option.dataset.note!, 'camera-controls': '', 'disable-pan': '', 'disable-tap': '',
      'camera-orbit': orbit, 'field-of-view': '30deg', 'touch-action': 'pan-y',
      'interaction-prompt': 'none', 'shadow-intensity': '0.85', 'shadow-softness': '0.85',
      ar: '', 'ar-modes': 'webxr scene-viewer quick-look', 'ar-scale': 'fixed', 'ar-placement': 'floor',
      'environment-image': '/models/ar/estudio.hdr', 'tone-mapping': 'neutral', loading: 'eager',
    };
    for (const [name, value] of Object.entries(attributes)) model.setAttribute(name, value);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) model.setAttribute('interpolation-decay', '0');
    // The native AR slot gains a layout box when asynchronous capability detection succeeds.
    const availability = document.createElement('span');
    availability.slot = 'ar-button';
    availability.setAttribute('aria-hidden', 'true');
    availability.style.cssText = 'display:block;width:1px;height:1px;pointer-events:none';
    model.append(availability);
    availabilityObserver = new ResizeObserver(() => { if (current === revision && ready) syncAR(); });
    availabilityObserver.observe(availability);
    model.addEventListener('load', () => {
      if (current !== revision) return;
      loadLabel.hidden = true;
      retry.hidden = true;
      setReady(true);
    });
    model.addEventListener('error', () => {
      if (current !== revision) return;
      // The renderer caches failed URLs as well. The next request must fetch fresh bytes.
      failedModels.set(option.value, current);
      failure('No se ha podido mostrar el modelo. Puedes consultar sus medidas o volver a intentarlo.');
    });
    model.addEventListener('ar-status', event => {
      if (current !== revision || event.detail.status !== 'failed') return;
      syncAR();
      handoff.hidden = false;
      support.textContent = 'No se ha podido iniciar la realidad aumentada. Puedes seguir en 3D o abrir el modelo en otro móvil.';
    });
    host.replaceChildren(model);
  } catch {
    if (current === revision) failure('El visor 3D no está disponible. Puedes seleccionar un depósito y consultar sus medidas.');
  }
}

let webGLAvailable: boolean | undefined;
function hasWebGL() {
  if (webGLAvailable === undefined) {
    const gl = document.createElement('canvas').getContext('webgl2');
    webGLAvailable = Boolean(gl);
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return webGLAvailable;
}

function updateQR() {
  if (handoff.open) qr.src = '/ar/movil/' + selector.value + '.svg';
}

function updateSelection() {
  const option = selector.selectedOptions[0];
  get('ar-caption').textContent = option.text;
  get('ar-diameter').textContent = option.dataset.diameter!;
  get('ar-longitudinal').textContent = option.dataset.longitudinal!;
  get('ar-quote').dataset.note = option.dataset.note;
  get('ar-distance').hidden = option.dataset.large !== 'true';
  updateQR();
  if (inView) void loadModel();
}

const defaultId = selector.value;
function readSelection() {
  const id = location.hash.slice(1);
  selector.value = Array.from(selector.options).some(option => option.value === id) ? id : defaultId;
  updateSelection();
}

selector.disabled = false;
readSelection();
window.addEventListener('hashchange', () => {
  // Scene Viewer uses a temporary fragment when the native app fails to open.
  if (!location.hash || Array.from(selector.options).some(option => '#' + option.value === location.hash)) readSelection();
});
selector.addEventListener('change', () => {
  history.replaceState(null, '', '#' + selector.value);
  updateSelection();
});
handoff.addEventListener('toggle', updateQR);
retry.addEventListener('click', () => { webGLAvailable = undefined; void loadModel(); });
zoomIn.addEventListener('click', () => viewer?.zoom(1));
zoomOut.addEventListener('click', () => viewer?.zoom(-1));
reset.addEventListener('click', () => {
  if (!viewer) return;
  // Gestures update the controls internally, leaving the declarative defaults unchanged.
  viewer.requestUpdate('cameraOrbit');
  viewer.requestUpdate('fieldOfView');
  viewer.jumpCameraToGoal();
});
launch.addEventListener('click', () => {
  if (!ready || !viewer?.canActivateAR) { syncAR(); return; }
  void viewer.activateAR().catch(() => {
    handoff.hidden = false;
    support.textContent = 'No se ha podido abrir la cámara. Puedes seguir en 3D o probar con otro móvil.';
  });
});

const observer = new IntersectionObserver(entries => {
  if (entries.some(entry => entry.isIntersecting)) {
    observer.disconnect();
    inView = true;
    void loadModel();
  }
}, { rootMargin: '150px' });
observer.observe(host);
