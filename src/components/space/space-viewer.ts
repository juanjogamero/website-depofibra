import type { ModelViewerElement } from '@google/model-viewer';
import libraryUrl from '@google/model-viewer/dist/model-viewer.min.js?url';

type Family = 'vertical' | 'vasos';
type Shade = 'verde' | 'blanco' | 'gris' | 'negro' | 'personalizado';
const choices: Shade[] = ['verde','blanco','gris','negro'];
const get = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const selects = {
  vertical: get<HTMLSelectElement>('space-size-vertical'),
  vasos: get<HTMLSelectElement>('space-size-vasos'),
};
const host = get('space-model-host');
const loadIndicator = get('space-load');
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
const customInput = get<HTMLInputElement>('space-custom-color');
const customLabel = get('space-color-custom-label');

let family: Family = 'vertical';
let shade: Shade = 'verde';
let customHex = '#ad724b';
let model: ModelViewerElement | null = null;
let ready = false;
let visible = false;
let sequence = 0;
let loadTimeout: number | undefined;
let arTimeout: number | undefined;
let colorTimeout: number | undefined;
let qrRequest = 0;
let libraryFailures = 0;
let webGLSupport: boolean | undefined;
const brokenModels = new Map<string, number>();
const defaultOrbit = '23deg 72deg 100%';

const currentSelect = () => selects[family];
const chosen = () => currentSelect().selectedOptions[0];
const custom = () => shade === 'personalizado';
const colorSlug = () => custom() ? 'personalizado-' + customHex.slice(1).toLowerCase() : shade;
const hash = () => family + '/' + currentSelect().value + '/' + colorSlug();
const modelStem = () => chosen().dataset.src! + (custom() || shade==='blanco' ? '' : '-' + shade);
const modelUrl = () => modelStem() + '.glb';

function syncColors() {
  for (const button of colorButtons) {
    const selected = button.dataset.spaceColor === shade;
    button.classList.toggle('is-active',selected);
    button.setAttribute('aria-pressed', String(selected));
  }
  customLabel.classList.toggle('is-active',custom());
  customInput.value = customHex;
}
function syncFamily() {
  const isVaso = family === 'vasos';
  selects.vertical.hidden = isVaso;
  selects.vertical.disabled = isVaso;
  selects.vasos.hidden = !isVaso;
  selects.vasos.disabled = !isVaso;
  get('space-size-label').setAttribute('for',isVaso ? 'space-size-vasos' : 'space-size-vertical');
  get('space-height-label').textContent = isVaso ? 'Alto de ficha' : 'Cota longitudinal de ficha';
  get('space-config-title').textContent = isVaso ? 'Depósito tipo vaso' : 'Vertical de base plana';
  get('space-config-description').textContent = 'Elige el tamaño y el acabado.';
  for (const button of familyButtons) {
    const selected = button.dataset.spaceFamily === family;
    button.classList.toggle('is-active',selected);
    button.setAttribute('aria-pressed',String(selected));
  }
  syncColors();
}
async function updateQR() {
  const request = ++qrRequest;
  if (!handoff.open) return;
  const familyId = family, selectedId = currentSelect().value, selectedColor = colorSlug();
  if (!custom()) {
    qr.src = '/visualizador/qr/' + familyId + '-' + selectedId + '-' + selectedColor + '.svg';
    return;
  }
  // Los colores arbitrarios se codifican en el enlace sin almacenar datos en el servidor.
  try {
    const QRCode = (await import('qrcode')).default;
    if (request !== qrRequest) return;
    const url = new URL('/visualizador/#'+familyId+'/'+selectedId+'/'+selectedColor,location.origin).href;
    const image = await QRCode.toDataURL(url,{width:232,margin:2,color:{dark:'#002d59',light:'#ffffff'}});
    if (request === qrRequest) qr.src = image;
  } catch {
    if (request === qrRequest) qr.removeAttribute('src');
  }
}
function setReady(value: boolean) {
  ready = value;
  [zoomIn,zoomOut,reset].forEach(button => button.disabled = !value);
  syncAR();
}
function syncAR() {
  launch.disabled = !(ready && model?.canActivateAR);
  if (!ready) {
    support.textContent = 'Preparando el visor…';
  } else if (model?.canActivateAR) {
    support.textContent = custom()
      ? 'Color personalizado: abre la cámara en iPhone o Android compatible con WebXR.'
      : 'Apunta al suelo, mueve el móvil y toca para colocar el depósito.';
  } else {
    support.textContent = custom()
      ? 'El color a medida está disponible en 3D. Para verlo en cámara se necesita Quick Look en iPhone o WebXR en Android.'
      : 'Para abrir la cámara, utiliza Safari en iPhone o Chrome en Android compatible.';
  }
}
function failures(message: string) {
  window.clearTimeout(loadTimeout); window.clearTimeout(arTimeout);
  setReady(false);
  loadIndicator.hidden = false;
  loadIndicator.textContent = message;
  retry.hidden = false;
}
function canRender() {
  if (webGLSupport===undefined) {
    const ctx = document.createElement('canvas').getContext('webgl2');
    webGLSupport = Boolean(ctx);
    ctx?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  return webGLSupport;
}
function applyCustomColor(current: ModelViewerElement) {
  if (!custom()) return;
  const rgb = [1,3,5].map(index => parseInt(customHex.slice(index,index+2),16)/255);
  // El primer material representa el cuerpo PRFV. La tapa y las conexiones no se tiñen.
  const firstMaterial = current.model?.materials?.[0];
  if (!firstMaterial) throw new Error('Material del cuerpo no disponible');
  firstMaterial.pbrMetallicRoughness.setBaseColorFactor([rgb[0],rgb[1],rgb[2],1]);
}
function watchAR(current: ModelViewerElement, token: number, n=0) {
  if (token!==sequence || model!==current || !ready) return;
  syncAR();
  if (!current.canActivateAR && n<40) {
    arTimeout=window.setTimeout(()=>watchAR(current,token,n+1),250);
  }
}
function updateDetails() {
  const option = chosen();
  if (!option) return;
  const colorName = custom() ? customHex.toUpperCase() : shade;
  get('space-model-title').textContent = (family==='vertical'?'Vertical':'Tipo vaso')+' · '+option.text+' · '+colorName;
  get('space-diameter').textContent=option.dataset.diameter!;
  get('space-height').textContent=option.dataset.height!;
  quote.dataset.note=option.dataset.note!+' Color visual elegido: '+colorName+' (simulación, confirmar disponibilidad real).';
  get('space-distance').hidden=option.dataset.large!=='true';
  void updateQR();
  if (visible) void loadModel();
}
async function loadModel() {
  const token=++sequence;
  window.clearTimeout(loadTimeout); window.clearTimeout(arTimeout);
  host.replaceChildren();
  model=null;
  setReady(false);
  loadIndicator.hidden=false;
  loadIndicator.textContent='Cargando el modelo 3D…';
  retry.hidden=true;
  const stem=modelStem();
  try {
    if (!canRender()) throw new Error('WebGL no disponible');
    if (!customElements.get('model-viewer')) {
      const url=libraryFailures?libraryUrl+'?retry='+libraryFailures:libraryUrl;
      try { await import(/* @vite-ignore */ url); }
      catch (err) { libraryFailures++; throw err; }
    }
    if (token!==sequence) return;
    const current=document.createElement('model-viewer') as ModelViewerElement;
    model=current;
    const retryVersion=brokenModels.get(stem);
    const attrs:Record<string,string>={
      src:modelUrl()+(retryVersion?'?retry='+retryVersion:''),
      alt:'Depósito '+(family==='vertical'?'vertical':'tipo vaso')+', '+chosen().text,
      'camera-controls':'', 'disable-pan':'', 'disable-tap':'',
      'camera-orbit':defaultOrbit, 'camera-target':'auto auto auto',
      'field-of-view':'30deg','interaction-prompt':'none','touch-action':'pan-y',
      'shadow-intensity':'0.92','shadow-softness':'0.94',
      ar:'','ar-scale':'fixed','ar-placement':'floor',
      'ar-modes':custom()?'webxr quick-look':'webxr scene-viewer quick-look',
      'environment-image':'/models/ar/estudio.hdr',
      'tone-mapping':'neutral','xr-environment':'','loading':'eager'
    };
    if (!custom()) attrs['ios-src']=stem+'.usdz';
    // Sin ios-src, Quick Look genera un USDZ del estado actual: conserva el color a medida.
    // Scene Viewer solo descargaría el GLB público original, por eso se excluye en modo personalizado.
    for (const [key,value] of Object.entries(attrs)) current.setAttribute(key,value);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) current.setAttribute('interpolation-decay','0');
    current.addEventListener('load',()=>{
      if (token!==sequence) return;
      window.clearTimeout(loadTimeout);
      try { applyCustomColor(current); }
      catch { failures('No se ha podido aplicar este color. Elige otro o vuelve a intentarlo.');return; }
      loadIndicator.hidden=true;
      retry.hidden=true;
      setReady(true);
      watchAR(current,token);
    });
    current.addEventListener('error',()=>{
      if (token!==sequence) return;
      brokenModels.set(stem,token);
      failures('No hemos podido cargar este modelo. Prueba de nuevo.');
    });
    current.addEventListener('ar-status',()=>{
      if (token!==sequence) return;
      if (current.getAttribute('ar-status')==='failed')
        support.textContent='No se ha podido abrir la cámara. Prueba con Safari o Chrome compatible.';
      else syncAR();
    });
    host.replaceChildren(current);
    loadTimeout=window.setTimeout(()=>{
      if (token===sequence && !ready) failures('La carga tarda demasiado. Comprueba tu conexión y reintenta.');
    },25000);
  } catch {
    if (token===sequence) failures('El visor 3D no está disponible en este navegador.');
  }
}
function restoreHash() {
  const [requestedFamily,id,color] = decodeURIComponent(location.hash.slice(1)).split('/');
  family=requestedFamily==='vasos'?'vasos':'vertical';
  if (choices.includes(color as Shade)) shade=color as Shade;
  else if (/^personalizado-[0-9a-f]{6}$/i.test(color||'')) {
    shade='personalizado'; customHex='#'+color.slice('personalizado-'.length).toLowerCase();
  } else shade='verde';
  const sel=currentSelect();
  if (Array.from(sel.options).some(opt=>opt.value===id)) sel.value=id;
  syncFamily();
  updateDetails();
}
restoreHash();
window.addEventListener('hashchange',()=>{
  const [f,id]=decodeURIComponent(location.hash.slice(1)).split('/');
  if ((f==='vertical'||f==='vasos')&&Array.from(selects[f].options).some(o=>o.value===id))
    restoreHash();
});
for (const button of familyButtons) {
  button.addEventListener('click',()=>{
    const f=button.dataset.spaceFamily as Family;
    if (f!=='vertical'&&f!=='vasos') return;
    if (family!==f) {family=f;syncFamily();history.replaceState(null,'','#'+hash());updateDetails();}
    if (matchMedia('(max-width:800px)').matches) {
      get('space-studio').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    }
  });
}
for (const select of Object.values(selects))
  select.addEventListener('change',()=>{history.replaceState(null,'','#'+hash());updateDetails();});
for (const button of colorButtons) {
  button.addEventListener('click',()=>{
    const c=button.dataset.spaceColor as Shade;
    if (!choices.includes(c)||shade===c) return;
    window.clearTimeout(colorTimeout);
    shade=c;syncColors();history.replaceState(null,'','#'+hash());updateDetails();
  });
}
customInput.addEventListener('input',()=>{
  const hex=customInput.value.toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(hex)) return;
  customHex=hex;shade='personalizado';
  syncColors();history.replaceState(null,'','#'+hash());
  window.clearTimeout(colorTimeout);
  colorTimeout=window.setTimeout(()=>updateDetails(),200);
});
customInput.addEventListener('change',()=>{
  window.clearTimeout(colorTimeout);updateDetails();
});
handoff.addEventListener('toggle',()=>void updateQR());
retry.addEventListener('click',()=>{webGLSupport=undefined;void loadModel();});
zoomIn.addEventListener('click',()=>model?.zoom(1));
zoomOut.addEventListener('click',()=>model?.zoom(-1));
reset.addEventListener('click',()=>{
  if (!model) return;
  model.cameraOrbit=defaultOrbit;model.fieldOfView='30deg';model.cameraTarget='auto auto auto';
  model.requestUpdate('cameraOrbit');model.requestUpdate('fieldOfView');
  model.requestUpdate('cameraTarget');model.jumpCameraToGoal();
});
launch.addEventListener('click',()=>{
  if (!ready || !model?.canActivateAR) {syncAR();return;}
  // El gesto directo del usuario es necesario para Quick Look y WebXR.
  void model.activateAR().catch(()=>{
    support.textContent='No se pudo abrir la cámara. Puedes seguir con el visor 3D.';
  });
});
if ('IntersectionObserver' in window) {
  const observer=new IntersectionObserver(entries=>{
    if (!entries.some(e=>e.isIntersecting)) return;
    observer.disconnect();visible=true;void loadModel();
  },{rootMargin:'200px'});
  observer.observe(host);
} else {visible=true;void loadModel();}
