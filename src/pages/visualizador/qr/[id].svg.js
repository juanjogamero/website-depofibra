import QRCode from 'qrcode';
import { verticalTanksAR } from '../../../data/verticalTanksAR.ts';
import { vasosAR } from '../../../data/vasosAR.ts';
import { AR_COLORS } from '../../../lib/ar/tank-glb.mjs';

// Código específico para cada producto/acabado sin guardar imágenes del usuario.
export function getStaticPaths() {
  const vertical = verticalTanksAR.flatMap(tank => AR_COLORS.map(color => ({
    params: { id: 'vertical-' + tank.id + '-' + color },
    props: { family: 'vertical', id: tank.id, color },
  })));
  const vasos = vasosAR.map(vaso => ({
    params: { id: 'vasos-' + vaso.id + '-blanco' },
    props: { family: 'vasos', id: vaso.id, color: 'blanco' },
  }));
  return [...vertical, ...vasos];
}
export async function GET({ props: { family, id, color } }) {
  const url = 'https://depofibra.com/visualizador/#' + family + '/' + id + '/' + color;
  const svg = await QRCode.toString(url, {
    type: 'svg', margin: 3,
    color: {dark: '#002d59', light: '#ffffff'},
  });
  return new Response(svg, {headers: {'Content-Type': 'image/svg+xml'}});
}
