// Se publica un GLB y un USDZ por cada vaso para visores nativos.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
import { vasosAR } from '../../../../data/vasosAR.ts';
import { buildVasoGlb } from '../../../../lib/ar/vaso-glb.mjs';
import { AR_COLORS } from '../../../../lib/ar/tank-glb.mjs';

export function getStaticPaths() {
  return vasosAR.flatMap(vaso => AR_COLORS.flatMap(color => ['glb','usdz'].map(format=>({
    params:{file:vaso.id+(color==='blanco'?'':'-'+color)+'.'+format},props:{vaso,format,color}
  }))));
}
export async function GET({props:{vaso,format,color}}) {
  const glb=buildVasoGlb({...vaso,color});
  if(format==='glb') return new Response(glb,{headers:{'Content-Type':'model/gltf-binary'}});
  const {scene}=await new GLTFLoader().parseAsync(Uint8Array.from(glb).buffer,'');
  scene.updateMatrixWorld(true);
  const usdz=await new USDZExporter().parseAsync(scene,{quickLookCompatible:true});
  return new Response(usdz,{headers:{'Content-Type':'model/vnd.usdz+zip'}});
}
