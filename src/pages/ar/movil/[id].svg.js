import QRCode from 'qrcode';
import { verticalTanksAR } from '../../../data/verticalTanksAR.ts';

export function getStaticPaths() {
  return verticalTanksAR.map(({ id }) => ({ params: { id } }));
}

export async function GET({ params }) {
  // El QR debe abrir el dominio comercial, incluso si el build conserva
  // un Astro.site temporal de demo.depofibra.com.
  const href = 'https://depofibra.com/ar/#' + params.id;
  const svg = await QRCode.toString(href, { type: 'svg', margin: 4, color: { dark: '#002d59' } });
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
}
