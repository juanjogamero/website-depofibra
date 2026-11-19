import QRCode from 'qrcode';
import { verticalTanksAR } from '../../../data/verticalTanksAR.ts';

export function getStaticPaths() {
  return verticalTanksAR.map(({ id }) => ({ params: { id } }));
}

export async function GET({ params, site }) {
  const href = new URL('/ar/#' + params.id, site).href;
  const svg = await QRCode.toString(href, { type: 'svg', margin: 4, color: { dark: '#002d59' } });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
