// Cada acabado tiene archivos independientes para que Quick Look y Scene Viewer
// conserven el mismo color en realidad aumentada, incluso fuera del navegador.
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { USDZExporter } from 'three/addons/exporters/USDZExporter.js';
import { verticalTanksAR } from '../../../../data/verticalTanksAR.ts';
import { AR_COLORS, buildTankGlb } from '../../../../lib/ar/tank-glb.mjs';

export function getStaticPaths() {
  return verticalTanksAR.flatMap(tank => AR_COLORS.flatMap(color => {
    // El modelo blanco conserva la URL publicada antes de esta mejora.
    const stem = tank.id + (color === 'blanco' ? '' : '-' + color);
    return ['glb', 'usdz'].map(format => ({
      params: { file: stem + '.' + format },
      props: { tank, format, color },
    }));
  }));
}

export async function GET({ props: { tank, format, color } }) {
  const glb = buildTankGlb({ ...tank, color });
  if (format === 'glb') return new Response(glb, { headers: { 'Content-Type': 'model/gltf-binary' } });
  const { scene } = await new GLTFLoader().parseAsync(Uint8Array.from(glb).buffer, '');
  scene.updateMatrixWorld(true);
  const usdz = await new USDZExporter().parseAsync(scene, { quickLookCompatible: true });
  return new Response(usdz, { headers: { 'Content-Type': 'model/vnd.usdz+zip' } });
}
