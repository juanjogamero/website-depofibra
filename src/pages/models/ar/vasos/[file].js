// Se publica un GLB y un USDZ por cada vaso para visores nativos.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
import { vasosAR } from '../../../../data/vasosAR.ts';
import { buildVasoGlb } from '../../../../lib/ar/vaso-glb.mjs';

export function getStaticPaths() {
  return vasosAR.flatMap(vaso => ['glb','usdz'].map(format=>({
    params:{file:vaso.id+'.'+format},props:{vaso,format}
  })));
}
export async function GET({props:{vaso,format}}) {
  const glb=buildVasoGlb(vaso);
  if(format==='glb') return new Response(glb,{headers:{'Content-Type':'model/gltf-binary'}});
  const {scene}=await new GLTFLoader().parseAsync(Uint8Array.from(glb).buffer,'');
  scene.updateMatrixWorld(true);
  const usdz=await new USDZExporter().parseAsync(scene,{quickLookCompatible:true});
  return new Response(usdz,{headers:{'Content-Type':'model/vnd.usdz+zip'}});
}
