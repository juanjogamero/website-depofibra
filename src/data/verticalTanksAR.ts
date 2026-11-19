import { verticalFlatBaseDimensions } from './depositDimensions.ts';

const numberFormat = new Intl.NumberFormat('es-ES', { useGrouping: 'always' });
const meterFormat = new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const verticalTanksAR = verticalFlatBaseDimensions.map(row => {
  const id = [row.liters, row.diameterMm, row.longitudinalMm].join('-');
  // The narrower 5,000 L tank is variant A, regardless of catalogue order.
  const siblings = verticalFlatBaseDimensions.filter(other => other.liters === row.liters)
    .sort((a, b) => a.diameterMm - b.diameterMm);
  const variant = siblings.length > 1 ? String.fromCharCode(65 + siblings.indexOf(row)) : '';
  const capacity = numberFormat.format(row.liters) + ' L';
  const label = variant ? capacity + ' · Variante ' + variant : capacity;
  const diameter = meterFormat.format(row.diameterMm / 1000) + ' m';
  const longitudinal = meterFormat.format(row.longitudinalMm / 1000) + ' m';
  const note = `Depósito vertical de base plana de ${label}. Diámetro ${diameter}. Cota longitudinal de ficha ${longitudinal}.`;
  return { ...row, id, label, diameter, longitudinal, note, url: '/models/ar/verticales/' + id };
}).sort((a, b) => a.liters - b.liters || a.diameterMm - b.diameterMm);
