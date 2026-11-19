/**
 * Medidas de vasos cilíndricos proporcionadas por dirección (imagen 19/11/2026).
 * En milímetros: el diámetro y el alto son cotas de TABLA, no planos CAD.
 * La geometría cónica de base más estrecha es una interpretación fotográfica.
 */
const rows = [
  [110, 510, 690],
  [210, 700, 740],
  [310, 780, 900],
  [530, 960, 950],
  [1030, 1140, 1280],
  [2120, 1600, 1250],
  [3100, 1770, 1630],
  [4000, 1870, 1850],
] as const;

const num = new Intl.NumberFormat('es-ES');
const metres = (mm: number) => (mm / 1000).toLocaleString('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' m';

export const vasosAR = rows.map(([liters, diameterMm, heightMm]) => ({
  family: 'vasos' as const,
  id: 'vaso-' + liters + '-' + diameterMm + '-' + heightMm,
  liters,
  diameterMm,
  heightMm,
  label: num.format(liters) + ' L',
  diameter: metres(diameterMm),
  height: metres(heightMm),
  url: '/models/ar/vasos/vaso-' + liters + '-' + diameterMm + '-' + heightMm,
  note: 'Depósito tipo vaso cilíndrico de ' + num.format(liters) + ' L. Diámetro de ficha ' + metres(diameterMm) + ' y alto de ficha ' + metres(heightMm) + '. Forma de vaso y tapa representadas de manera orientativa.',
}));
