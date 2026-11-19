// Astro emits ordinary static files. Native viewers can fetch each model directly.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
import { verticalTanksAR } from '../../../../data/verticalTanksAR.ts';
import { buildTankGlb } from '../../../../lib/ar/tank-glb.mjs';

export function getStaticPaths() {
  return verticalTanksAR.flatMap(tank => ['glb', 'usdz'].map(format => ({
    params: { file: tank.id + '.' + format },
    props: { tank, format },
  })));
}

export async function GET({ props: { tank, format } }) {
  const glb = buildTankGlb(tank);
  if (format === 'glb') return new Response(glb, { headers: { 'Content-Type': 'model/gltf-binary' } });

  // Read the actual GLB bytes to keep both native formats on the same geometry.
  const { scene } = await new GLTFLoader().parseAsync(Uint8Array.from(glb).buffer, '');
  scene.updateMatrixWorld(true);
  const usdz = await new USDZExporter().parseAsync(scene, { quickLookCompatible: true });
  return new Response(usdz, { headers: { 'Content-Type': 'model/vnd.usdz+zip' } });
}
