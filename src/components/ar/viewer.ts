import type { ModelViewerElement } from '@google/model-viewer';
import viewerModuleUrl from '@google/model-viewer/dist/model-viewer.min.js?url';

const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const selector = get<HTMLSelectElement>('ar-selector');
const host = get('ar-model-host');
type Shade = 'blanco' | 'verde' | 'gris';
const shades: Shade[] = ['blanco', 'verde', 'gris'];
const shadeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-ar-color]'));
let shade: Shade = 'blanco';
const modelPath = (option: HTMLOptionElement) => option.dataset.url! + (shade === 'blanco' ? '' : '-' + shade);
const selectionHash = () => selector.value + (shade === 'blanco' ? '' : ':' + shade);
function setShade(value: Shade) {
  shade = value;
  for (const button of shadeButtons) {
    const isSelected = button.dataset.arColor === shade;
    button.classList.toggle('is-active', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  }
}
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
let arDetectionTimer: number | undefined;
let modelLoadTimeout: number | undefined;

function syncAR() {
  const available = Boolean(ready && viewer?.canActivateAR);
  launch.disabled = !available;
  // No ofrecer el QR de alternativa mientras se está cargando el modelo.
  handoff.hidden = !ready || available;
  support.textContent = !ready
    ? 'Preparando el modelo y comprobando compatibilidad con tu móvil…'
    : available
      ? 'Enfoca el suelo, mueve el móvil suavemente y selecciona el lugar de instalación. La escala depende del seguimiento del dispositivo.'
      : 'La realidad aumentada no está disponible en este navegador. Puedes girar el modelo en 3D o abrir esta selección en otro móvil.';
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

// La selección del modo AR se resuelve asincrónicamente en model-viewer.
// Comprobar canActivateAR solo al recibir load puede dejar el botón desactivado
// de manera indefinida en Safari/Chrome. Se reintenta de forma acotada.
function watchARCapability(model: ModelViewerElement, current: number, attempt = 0) {
  if (current !== revision || viewer !== model || !ready) return;
  syncAR();
  if (!model.canActivateAR && attempt < 36) {
    arDetectionTimer = window.setTimeout(() => watchARCapability(model, current, attempt + 1), 250);
  }
}

async function loadModel() {
  const current = ++revision;
  const option = selector.selectedOptions[0];
  window.clearTimeout(arDetectionTimer);
  window.clearTimeout(modelLoadTimeout);
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
    const path = modelPath(option);
    const version = failedModels.get(path);
    const glb = path + '.glb' + (version ? '?retry=' + version : '');
    const attributes = {
      src: glb, 'ios-src': path + '.usdz',
      alt: option.dataset.note!, 'camera-controls': '', 'disable-pan': '', 'disable-tap': '',
      'camera-orbit': orbit, 'field-of-view': '30deg', 'touch-action': 'pan-y',
      'camera-target': 'auto auto auto',
      'interaction-prompt': 'none', 'shadow-intensity': '0.85', 'shadow-softness': '0.85',
      ar: '', 'ar-modes': 'webxr scene-viewer quick-look', 'ar-scale': 'fixed', 'ar-placement': 'floor',
      'environment-image': '/models/ar/estudio.hdr', 'tone-mapping': 'neutral', loading: 'eager',
    };
    for (const [name, value] of Object.entries(attributes)) model.setAttribute(name, value);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) model.setAttribute('interpolation-decay', '0');
    // El botón incorporado por model-viewer se oculta: usamos el CTA accesible
    // que permanece fuera del lienzo, junto al selector de la referencia.
    model.style.setProperty('--ar-button-display', 'none');
    model.addEventListener('load', () => {
      if (current !== revision) return;
      window.clearTimeout(modelLoadTimeout);
      loadLabel.hidden = true;
      retry.hidden = true;
      setReady(true);
      watchARCapability(model, current);
    });
    model.addEventListener('error', () => {
      if (current !== revision) return;
      window.clearTimeout(modelLoadTimeout);
      window.clearTimeout(arDetectionTimer);
      // The renderer caches failed URLs as well. The next request must fetch fresh bytes.
      failedModels.set(path, current);
      failure('No se ha podido mostrar el modelo. Puedes consultar sus medidas o volver a intentarlo.');
    });
    model.addEventListener('ar-status', () => {
      if (current !== revision) return;
      syncAR();
      if (model.getAttribute('ar-status') === 'failed') {
        handoff.hidden = false;
        support.textContent = 'No se ha podido iniciar la realidad aumentada. Prueba con Safari en iPhone o Chrome en Android, o utiliza el visor 3D.';
      }
    });
    host.replaceChildren(model);
    // Evita un indicador «cargando» permanente cuando una descarga no responde.
    modelLoadTimeout = window.setTimeout(() => {
      if (current === revision && !ready) failure('El modelo está tardando demasiado. Comprueba tu conexión y vuelve a intentarlo.');
    }, 20000);
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
  if (handoff.open) qr.src = '/ar/movil/' + selector.value + (shade === 'blanco' ? '' : '-' + shade) + '.svg';
}

function updateSelection() {
  const option = selector.selectedOptions[0];
  get('ar-caption').textContent = option.text + ' · ' + shade.charAt(0).toUpperCase() + shade.slice(1);
  get('ar-diameter').textContent = option.dataset.diameter!;
  get('ar-longitudinal').textContent = option.dataset.longitudinal!;
  get('ar-quote').dataset.note = option.dataset.note + ' Acabado visual elegido: ' + shade + ' (solo simulación; consultar disponibilidad real).';
  get('ar-distance').hidden = option.dataset.large !== 'true';
  updateQR();
  if (inView) void loadModel();
}

const defaultId = selector.value;
function readSelection() {
  // Antiguos enlaces #id siguen abriendo el acabado blanco por defecto.
  const [id, color] = decodeURIComponent(location.hash.slice(1)).split(':');
  selector.value = Array.from(selector.options).some(option => option.value === id) ? id : defaultId;
  setShade(shades.includes(color as Shade) ? color as Shade : 'blanco');
  updateSelection();
}

selector.disabled = false;
readSelection();
window.addEventListener('hashchange', () => {
  // Scene Viewer uses a temporary fragment when the native app fails to open.
  if (!location.hash || Array.from(selector.options).some(option => option.value === decodeURIComponent(location.hash.slice(1)).split(':')[0])) readSelection();
});
selector.addEventListener('change', () => {
  history.replaceState(null, '', '#' + selectionHash());
  updateSelection();
});
for (const button of shadeButtons) {
  button.addEventListener('click', () => {
    const requested = button.dataset.arColor as Shade;
    if (!shades.includes(requested) || requested === shade) return;
    setShade(requested);
    history.replaceState(null, '', '#' + selectionHash());
    updateSelection();
  });
}
handoff.addEventListener('toggle', updateQR);
retry.addEventListener('click', () => { webGLAvailable = undefined; void loadModel(); });
zoomIn.addEventListener('click', () => viewer?.zoom(1));
zoomOut.addEventListener('click', () => viewer?.zoom(-1));
reset.addEventListener('click', () => {
  if (!viewer) return;
  // Gestures update the controls internally, leaving the declarative defaults unchanged.
  viewer.cameraOrbit = orbit;
  viewer.fieldOfView = '30deg';
  viewer.cameraTarget = 'auto auto auto';
  // Las interacciones táctiles cambian los controles internos sin alterar
  // los atributos originales; forzar su relectura restablece la vista real.
  viewer.requestUpdate('cameraOrbit');
  viewer.requestUpdate('fieldOfView');
  viewer.requestUpdate('cameraTarget');
  viewer.jumpCameraToGoal();
});
launch.addEventListener('click', () => {
  if (!ready || !viewer?.canActivateAR) { syncAR(); return; }
  // Debe invocarse sin operaciones asíncronas previas: Quick Look y Scene
  // Viewer necesitan conservar el gesto directo del usuario.
  void viewer.activateAR().catch(() => {
    handoff.hidden = false;
    support.textContent = 'No se ha podido abrir la cámara. Prueba a abrir el enlace en Safari o Chrome, o utiliza el visor 3D.';
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
