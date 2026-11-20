import type { ModelViewerElement } from '@google/model-viewer';
import libraryUrl from '@google/model-viewer/dist/model-viewer.min.js?url';
import { isGoogleInAppBrowser, createChromeHandoff, createIOSChromeHandoff } from '../../lib/ar/browser-handoff.mjs';

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
const openChrome = get<HTMLAnchorElement>('space-open-chrome');
const iosOpenChrome = get<HTMLAnchorElement>('space-ios-open-chrome');
const iosQuickLook = get<HTMLAnchorElement>('space-ios-quicklook');
const copyLink = get<HTMLButtonElement>('space-copy-link');
// La app de Google puede abrir una pestaña integrada que no ofrece la misma AR que Chrome/Safari.
const googleApp = isGoogleInAppBrowser(navigator.userAgent);
const android = /Android/i.test(navigator.userAgent);
const ios = /iPhone|iPad|iPod/i.test(navigator.userAgent);
// Iniciado desde el enlace profundo tras pulsar AR en Google App iOS.
// La activación sin gesto puede ser bloqueada: mantenemos botón manual si falla.
const autoARRequested = ios && !googleApp && new URLSearchParams(location.search).get('iniciarAR') === '1';
const handoff = get<HTMLDetailsElement>('space-handoff');
const qr = get<HTMLImageElement>('space-qr-img');
const zoomIn = get<HTMLButtonElement>('space-zoom-in');
const zoomOut = get<HTMLButtonElement>('space-zoom-out');
const reset = get<HTMLButtonElement>('space-reset');
const familyButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-space-family]'));
const colorButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-space-color]'));
const customInput = get<HTMLInputElement>('space-custom-color');
const customLabel = get('space-color-custom-label');
const scaleCheck = get<HTMLInputElement>('space-scale-reference');

let family: Family = 'vertical';
let shade: Shade = 'verde';
let customHex = '#ad724b';
let scaleReference = false;
let model: ModelViewerElement | null = null;
let ready = false;
let visible = false;
let activeModelIsCustom = false;
let arFailed = false;
let autoARAttempted = false;
let autoARInFlight = false;
let autoARRetryNeeded = false;
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
const hash = () => family + '/' + currentSelect().value + '/' + colorSlug() + (scaleReference ? '/regla' : '');
const modelStem = () => chosen().dataset.src! + (custom() || shade==='blanco' ? '' : '-' + shade) + (scaleReference ? '-regla' : '');
const modelUrl = () => modelStem() + '.glb';

// Los fragmentos # no pueden colocarse antes de #Intent. El estado se transporta
// por query y se recupera al llegar a Chrome, conservando familia, tamaño y color.
const shareableUrl = (startAR = false) => {
  const url = new URL('/visualizador/', location.origin);
  url.searchParams.set('seleccion', hash());
  if (startAR) url.searchParams.set('iniciarAR', '1');
  return url.href;
};
function updateBrowserLinks() {
  openChrome.href = createChromeHandoff(shareableUrl());
  iosOpenChrome.href = createIOSChromeHandoff(shareableUrl(true));
  // La apertura directa sin model-viewer también debe bloquear el escalado.
  if (!custom()) iosQuickLook.href = modelStem() + '.usdz#allowsContentScaling=0';
}
function showBrowserFallback() {
  updateBrowserLinks();
  const onGoogleAndroid = googleApp && android;
  const onGoogleIOS = googleApp && ios;
  // También funciona para otros navegadores integrados en los que falla AR.
  const otherMobileFailure = (android || ios) && ready && (arFailed || !model?.canActivateAR);
  launch.hidden = onGoogleAndroid || onGoogleIOS || arFailed;
  openChrome.hidden = !(android && (onGoogleAndroid || otherMobileFailure));
  // En iPhone de Google, el CTA principal es un enlace de aplicación:
  // un toque abre Chrome instalado con el mismo modelo y color.
  iosOpenChrome.hidden = !onGoogleIOS;
  // Para modelos predefinidos, Quick Look puede funcionar también desde
  // algunos WebViews de iOS. No ofrecerlo con HEX libre: mostraría blanco.
  iosQuickLook.hidden = !onGoogleIOS || custom();
  // Ya no se exige copiar enlace en iPhone.
  copyLink.hidden = onGoogleIOS || !(onGoogleAndroid || otherMobileFailure);
}

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
  if (!custom() && !scaleReference) {
    qr.src = '/visualizador/qr/' + familyId + '-' + selectedId + '-' + selectedColor + '.svg';
    return;
  }
  // Los colores arbitrarios se codifican en el enlace sin almacenar datos en el servidor.
  try {
    const QRCode = (await import('qrcode')).default;
    if (request !== qrRequest) return;
    const url = new URL('/visualizador/#'+hash(),location.origin).href;
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
  const supported = Boolean(ready && model?.canActivateAR && !arFailed);
  launch.disabled = !supported;
  showBrowserFallback();
  if (googleApp && android) {
    support.textContent = 'La app de Google limita la cámara AR. Abre este mismo modelo en Chrome.';
  } else if (googleApp && ios) {
    support.textContent = custom()
      ? 'Se abrirá Chrome con tu color elegido. Si no tienes Chrome, esta versión solo puede verse en 3D aquí.'
      : 'Se abrirá Chrome con este depósito. También puedes probar AR directamente si tu app de Google lo permite.';
  } else if (autoARRetryNeeded) {
    support.textContent = 'Chrome ha abierto el depósito. Pulsa «Ver en mi espacio» para iniciar la cámara.';
  } else if (arFailed) {
    support.textContent = 'No se pudo iniciar la cámara aquí. Abre el modelo en un navegador compatible.';
  } else if (!ready) {
    support.textContent = 'Preparando el visor…';
  } else if (supported) {
    support.textContent = scaleReference
      ? 'La regla a la derecha mide exactamente 1 m. Contrástala con una cinta real en el mismo plano.'
      : 'Apunta al suelo, mueve el móvil y toca para colocar el depósito.';
  } else {
    support.textContent = custom()
      ? 'Color a medida: requiere Safari o Chrome Android con WebXR.'
      : 'Abre el modelo en Safari o Chrome compatible para usar la cámara.';
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
  if (current.canActivateAR && autoARRequested && !autoARAttempted && !autoARRetryNeeded) {
    autoARAttempted = true;
    autoARInFlight = true;
    // Intento único al llegar desde Google a Chrome. iOS puede exigir un
    // segundo gesto: si lo bloquea, el botón manual continúa disponible.
    try {
      void current.activateAR().catch(() => {
        if (token!==sequence) return;
        autoARInFlight = false;
        autoARRetryNeeded = true;
        arFailed = false;
        syncAR();
      });
    } catch {
      autoARInFlight = false;
      autoARRetryNeeded = true;
      arFailed = false;
      syncAR();
    }
  }
  if (!current.canActivateAR && n<40) {
    arTimeout=window.setTimeout(()=>watchAR(current,token,n+1),250);
  }
}
function updateDetails(reload = true) {
  const option = chosen();
  if (!option) return;
  const colorName = custom() ? customHex.toUpperCase() : shade;
  get('space-model-title').textContent = (family==='vertical'?'Vertical':'Tipo vaso')+' · '+option.text+' · '+colorName + (scaleReference ? ' · regla 1 m' : '');
  get('space-diameter').textContent=option.dataset.diameter!;
  get('space-height').textContent=option.dataset.height!;
  quote.dataset.note=option.dataset.note!+' Color visual elegido: '+colorName+' (simulación, confirmar disponibilidad real).';
  get('space-distance').hidden=option.dataset.large!=='true';
  void updateQR();
  if (visible && reload) void loadModel();
}
async function loadModel() {
  const token=++sequence;
  arFailed = false;
  autoARInFlight = false;
  window.clearTimeout(loadTimeout); window.clearTimeout(arTimeout);
  host.replaceChildren();
  model=null;
  setReady(false);
  loadIndicator.hidden=false;
  loadIndicator.textContent='Cargando el modelo 3D…';
  retry.hidden=true;
  const stem=modelStem();
  const builtForCustom = custom();
  activeModelIsCustom = false;
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
      try { applyCustomColor(current); activeModelIsCustom = builtForCustom; }
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
    current.addEventListener('ar-status',(event)=>{
      if (token!==sequence) return;
      const status = (event as CustomEvent<{status?:string}>).detail?.status ?? current.getAttribute('ar-status');
      if (status==='failed' && autoARInFlight) {
        autoARInFlight = false;
        autoARRetryNeeded = true;
        arFailed = false; // Permitir repetir con un toque real en Chrome.
      } else if (status==='failed') {
        arFailed = true;
      } else if (status==='session-started') {
        autoARInFlight = false;
        autoARRetryNeeded = false;
      }
      syncAR();
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
  const fromQuery = new URLSearchParams(location.search).get('seleccion') || '';
  const fromHash = location.hash.slice(1);
  const [requestedFamily,id,color,measure] = decodeURIComponent(fromHash || fromQuery).split('/');
  scaleReference = measure === 'regla';
  scaleCheck.checked = scaleReference;
  family=requestedFamily==='vasos'?'vasos':'vertical';
  if (choices.includes(color as Shade)) shade=color as Shade;
  else if (/^personalizado-[0-9a-f]{6}$/i.test(color||'')) {
    shade='personalizado'; customHex='#'+color.slice('personalizado-'.length).toLowerCase();
  } else shade='verde';
  const sel=currentSelect();
  if (Array.from(sel.options).some(opt=>opt.value===id)) sel.value=id;
  syncFamily();
  updateDetails();
  if (!fromHash && fromQuery && id && Array.from(sel.options).some(opt => opt.value === id)) {
    history.replaceState(null,'',location.pathname+'#'+hash());
  }
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
  const wasCustom = custom();
  customHex=hex;shade='personalizado';
  syncColors();history.replaceState(null,'','#'+hash());
  window.clearTimeout(colorTimeout);
  if (wasCustom && ready && model && activeModelIsCustom) {
    applyCustomColor(model);
    colorTimeout=window.setTimeout(()=>updateDetails(false),140);
  } else {
    colorTimeout=window.setTimeout(()=>updateDetails(),160);
  }
});
customInput.addEventListener('change',()=>{
  window.clearTimeout(colorTimeout);
  if (ready && custom() && model && activeModelIsCustom) {
    applyCustomColor(model);updateDetails(false);
  } else updateDetails();
});
scaleCheck.addEventListener('change', () => {
  scaleReference = scaleCheck.checked;
  history.replaceState(null, '', '#' + hash());
  updateDetails();
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
    arFailed = true;
    syncAR();
  });
});
copyLink.addEventListener('click',()=>{
  const url = shareableUrl();
  const fallBackCopy = () => {
    const input = document.createElement('textarea');
    input.value = url; input.readOnly = true;
    input.style.position='fixed';input.style.opacity='0';
    document.body.append(input);input.select();
    const success = document.execCommand('copy');input.remove();
    if (!success) window.prompt('Copia este enlace y ábrelo en Chrome o Safari:',url);
    return success;
  };
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(url).then(()=>{
      support.textContent='Enlace copiado. Ábrelo en Chrome o Safari.';
    }).catch(()=>{
      if (fallBackCopy()) support.textContent='Enlace copiado. Ábrelo en Chrome o Safari.';
    });
  } else if (fallBackCopy()) {
    support.textContent='Enlace copiado. Ábrelo en Chrome o Safari.';
  }
});
if ('IntersectionObserver' in window) {
  const observer=new IntersectionObserver(entries=>{
    if (!entries.some(e=>e.isIntersecting)) return;
    observer.disconnect();visible=true;void loadModel();
  },{rootMargin:'200px'});
  observer.observe(host);
} else {visible=true;void loadModel();}
