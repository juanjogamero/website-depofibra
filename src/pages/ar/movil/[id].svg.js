import QRCode from 'qrcode';
import { verticalTanksAR } from '../../../data/verticalTanksAR.ts';
import { AR_COLORS } from '../../../lib/ar/tank-glb.mjs';

export function getStaticPaths() {
  return verticalTanksAR.flatMap(({ id }) => AR_COLORS.map(color => ({
    params: { id: id + (color === 'blanco' ? '' : '-' + color) },
    props: { id, color },
  })));
}

export async function GET({ props: { id, color } }) {
  const href = 'https://depofibra.com/ar/#' + id + (color === 'blanco' ? '' : ':' + color);
  const svg = await QRCode.toString(href, {
    type: 'svg', margin: 4, color: { dark: '#002d59' },
  });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
