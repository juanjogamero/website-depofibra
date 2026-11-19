/**
 * Depofibra AR - modelos paramétricos, sin imágenes raster ni geometría externa.
 * Referencia: fotografías facilitadas por dirección el 19/11/2026.
 * Dimensiones de catálogo orientativas; los accesorios y la graduación NO están certificados.
 * Todas las geometrías usan metros, origen sobre el suelo (Y = 0), frontal hacia +Z.
 *
 * Se producen tres GLB distintos para que Scene Viewer/Quick Look respeten el color:
 * cambiar materiales exclusivamente en el navegador NO se propaga a todos los visores AR.
 */
export const AR_COLORS = ['blanco', 'verde', 'gris'];

const FINISHES = {
  blanco: {
    body: [0.88, 0.90, 0.92, 1],
    seam: [0.78, 0.82, 0.85, 1],
    stripe: [0.045, 0.31, 0.22, 1],
    ink: [0.01, 0.12, 0.29, 1],
    accent: [0.01, 0.36, 0.73, 1],
  },
  verde: {
    body: [0.025, 0.23, 0.16, 1],
    seam: [0.018, 0.18, 0.13, 1],
    stripe: [0.91, 0.89, 0.75, 1],
    ink: [0.94, 0.96, 0.91, 1],
    accent: [0.99, 0.78, 0.07, 1],
  },
  gris: {
    body: [0.39, 0.44, 0.49, 1],
    seam: [0.31, 0.35, 0.39, 1],
    stripe: [0.89, 0.93, 0.92, 1],
    ink: [0.98, 0.98, 0.94, 1],
    accent: [0.83, 0.95, 0.65, 1],
  },
};

const MATERIALS = ['Deposito', 'Juntas', 'Tapadera', 'BocasMetalicas', 'FranjaIndicadora',
  'Numeracion', 'NumeracionDestacada', 'InteriorBocas'];
const V = (x, y, z, nx = 0, ny = 1, nz = 0) => ({ p: [x, y, z], n: [nx, ny, nz] });

export function buildTankGlb({ diameterMm, longitudinalMm, liters, color = 'blanco' }) {
  if (!FINISHES[color]) throw new Error('Acabado no admitido: ' + color);
  if (!(diameterMm > 0 && longitudinalMm > 0 && liters > 0)) throw new Error('Cotas no válidas');
  const radius = diameterMm / 2000;
  const height = longitudinalMm / 1000;
  const finish = FINISHES[color];
  const groups = MATERIALS.map(name => ({ name, positions: [], normals: [], indices: [] }));
  const quad = (material, a, b, c, d) => {
    const g = groups[material];
    const offset = g.positions.length / 3;
    for (const v of [a, b, c, a, c, d]) {
      g.positions.push(...v.p); g.normals.push(...v.n);
    }
    for (let i = 0; i < 6; i++) g.indices.push(offset + i);
  };
  const tri = (material, a, b, c) => {
    const g = groups[material];
    const offset = g.positions.length / 3;
    for (const v of [a, b, c]) { g.positions.push(...v.p); g.normals.push(...v.n); }
    g.indices.push(offset, offset + 1, offset + 2);
  };
  const radialV = (r, y, theta, ny = 0, nr = 1) => {
    const s = Math.sin(theta), c = Math.cos(theta);
    const norm = Math.hypot(nr, ny) || 1;
    return V(s * r, y, c * r, s * nr / norm, ny / norm, c * nr / norm);
  };
  const around = (material, profiles, steps = 96) => {
    for (let j = 0; j < profiles.length - 1; j++) {
      const low = profiles[j], high = profiles[j + 1];
      for (let i = 0; i < steps; i++) {
        const a = 2 * Math.PI * i / steps, b = 2 * Math.PI * (i + 1) / steps;
        quad(material, radialV(low.r, low.y, a, low.ny, low.nr),
          radialV(low.r, low.y, b, low.ny, low.nr),
          radialV(high.r, high.y, b, high.ny, high.nr),
          radialV(high.r, high.y, a, high.ny, high.nr));
      }
    }
  };
  const disk = (material, y, r, up = true, steps = 96) => {
    for (let i = 0; i < steps; i++) {
      const a = 2 * Math.PI * i / steps, b = 2 * Math.PI * (i + 1) / steps;
      const c = V(0, y, 0, 0, up ? 1 : -1, 0);
      const p = (t) => V(Math.sin(t) * r, y, Math.cos(t) * r, 0, up ? 1 : -1, 0);
      if (up) tri(material, c, p(a), p(b));
      else tri(material, c, p(b), p(a));
    }
  };

  // El hombro redondeado y la tapa se integran DENTRO de la cota longitudinal de
  // ficha; no se añade una altura total inventada para la boca de hombre.
  const neckRadius = Math.min(radius * 0.265, 0.345);
  const lidThickness = Math.min(0.034, height * 0.021);
  const collarHeight = Math.min(0.115, height * 0.075);
  const shoulderHeight = Math.min(radius * 0.22, height * 0.19);
  const shoulderY = height - shoulderHeight - collarHeight - lidThickness;
  const neckY = shoulderY + shoulderHeight;
  const neckTop = height - lidThickness;
  if (shoulderY <= 0.3) throw new Error('Altura insuficiente para el modelo');

  const body = [
    { r: radius - 0.008, y: 0, nr: 1, ny: 0 },
    { r: radius, y: 0.018, nr: 1, ny: 0 },
    { r: radius, y: shoulderY, nr: 1, ny: 0 },
  ];
  for (let i = 1; i <= 12; i++) {
    const t = i / 12 * Math.PI / 2;
    const r = neckRadius + (radius - neckRadius) * Math.cos(t);
    const y = shoulderY + shoulderHeight * Math.sin(t);
    // Normal del perfil elíptico: superficie radial positiva y hombro ascendente.
    const dr = -(radius - neckRadius) * Math.sin(t);
    const dy = shoulderHeight * Math.cos(t);
    const length = Math.hypot(dr, dy) || 1;
    body.push({ r, y, nr: dy / length, ny: -dr / length });
  }
  body.push({ r: neckRadius, y: neckTop, nr: 1, ny: 0 });
  around(0, body);
  disk(0, 0, radius - 0.008, false);

  // Cierre y tapadera blancos para los tres acabados, con pestaña perimetral.
  const lidRadius = neckRadius * 1.115;
  around(2, [
    { r: neckRadius * 1.025, y: neckTop - 0.008, nr: 1, ny: 0 },
    { r: lidRadius, y: neckTop, nr: 0, ny: 1 },
    { r: lidRadius, y: height - 0.007, nr: 1, ny: 0 },
    { r: lidRadius * 0.975, y: height, nr: 0, ny: 1 },
  ]);
  disk(2, height, lidRadius * 0.975);
  // Junta de la tapa (ilustrativa).
  around(1, [
    { r: neckRadius * 1.025, y: neckTop - 0.018, nr: 1, ny: 0 },
    { r: neckRadius * 1.025, y: neckTop - 0.009, nr: 1, ny: 0 },
  ]);
  // Bandas de unión discretas que recuerdan la superficie estratificada del PRFV.
  for (const fraction of [0.35, 0.68]) {
    const y = shoulderY * fraction;
    around(1, [
      { r: radius + 0.0009, y: y - 0.002, nr: 1, ny: 0 },
      { r: radius + 0.0009, y: y + 0.002, nr: 1, ny: 0 },
    ], 96);
  }

  // Manómetro visual en la cara frontal: banda y graduación pintadas sobre el
  // cilindro. NO pretende medir litros reales; la calibración depende del vaso.
  const gaugeTheta = -0.15;
  const gaugeBottom = Math.max(0.11, height * 0.082);
  const gaugeTop = shoulderY - 0.013;
  const surface = (theta, y, offset = 0.003, rad = radius) =>
    radialV(rad + offset, y, theta);
  const patch = (material, a, b, lowY, highY, offset = 0.003) => {
    const steps = 5;
    for (let i = 0; i < steps; i++) {
      const t0 = a + (b - a) * i / steps, t1 = a + (b - a) * (i + 1) / steps;
      quad(material, surface(t0, lowY, offset), surface(t1, lowY, offset),
        surface(t1, highY, offset), surface(t0, highY, offset));
    }
  };
  const gaugeWidth = Math.min(0.074, 0.066 / radius);
  patch(4, gaugeTheta - gaugeWidth / 2, gaugeTheta + gaugeWidth / 2, gaugeBottom, gaugeTop, 0.0036);

  // Cifras segmentadas dibujadas como polígonos sobre el modelo, NO overlays
  // HTML: permanecen visibles en Android Scene Viewer y Apple Quick Look.
  const glyphs = {
    '0': 'abcdef', '1': 'bc', '2': 'abdeg', '3': 'abcdg', '4': 'bcfg',
    '5': 'acdfg', '6': 'acdefg', '7': 'abc', '8': 'abcdefg', '9': 'abcdfg',
    'L': 'def',
  };
  function surfaceRect(material, startU, endU, bottomY, topY) {
    const theta0 = gaugeTheta + gaugeWidth * 0.88 + startU / radius;
    const theta1 = gaugeTheta + gaugeWidth * 0.88 + endU / radius;
    quad(material, surface(theta0, bottomY, 0.006), surface(theta1, bottomY, 0.006),
      surface(theta1, topY, 0.006), surface(theta0, topY, 0.006));
  }
  function drawLabel(value, y, size, material) {
    const glyphWidth = size * 0.51, spacing = size * 0.105;
    const thickness = size * 0.105;
    let x = 0;
    for (const character of value) {
      if (character === '.') {
        surfaceRect(material, x, x + thickness, y, y + thickness);
        x += size * 0.22;
        continue;
      }
      const letters = glyphs[character] ?? '';
      const segments = {
        a: [0.15, 0.88, 0.85, 1.00],
        b: [0.82, 0.52, 0.98, 0.96],
        c: [0.82, 0.04, 0.98, 0.48],
        d: [0.15, 0.00, 0.85, 0.12],
        e: [0.02, 0.04, 0.18, 0.48],
        f: [0.02, 0.52, 0.18, 0.96],
        g: [0.15, 0.44, 0.85, 0.56],
      };
      for (const letter of letters) {
        const [x0, y0, x1, y1] = segments[letter];
        surfaceRect(material, x + x0 * glyphWidth, x + x1 * glyphWidth,
          y + y0 * size, y + y1 * size);
      }
      x += glyphWidth + spacing;
    }
  }

  const step = liters >= 50000 ? 10000 : liters >= 30000 ? 5000 :
    liters >= 16000 ? 4000 : liters >= 8000 ? 2000 : 1000;
  const values = [];
  for (let n = liters; n > 0 && values.length < 8; n -= step) values.push(n);
  const topLabelY = gaugeTop - 0.085, lowerLabelY = gaugeBottom + 0.07;
  const labelSize = Math.max(0.049, Math.min(0.095, (topLabelY - lowerLabelY) / (values.length * 2.15)));
  values.forEach((value, i) => {
    const y = topLabelY - i * (topLabelY - lowerLabelY) / Math.max(1, values.length - 1);
    // En el primer rótulo se muestra la capacidad nominal, no nivel operativo.
    const text = value.toLocaleString('es-ES');
    patch(i % 2 === 0 ? 6 : 5, gaugeTheta + gaugeWidth * 0.7,
      gaugeTheta + gaugeWidth * 0.7 + Math.min(0.013, 0.018 / radius), y + labelSize * 0.43,
      y + labelSize * 0.53, 0.006);
    drawLabel(text, y, labelSize, i % 2 === 0 ? 6 : 5);
  });

  // Bocas con brida, racor hueco y sombreado interior. Las posiciones y salientes
  // son ILUSTRATIVOS, no cotas de fábrica ni compromiso de accesorios incluidos.
  function nozzle(theta, y, size, projection) {
    const s = Math.sin(theta), c = Math.cos(theta);
    const position = (depth, phi, r, nr = 1) => {
      const u = Math.cos(phi), v = Math.sin(phi);
      const x = s * (radius + depth) + c * r * u;
      const z = c * (radius + depth) - s * r * u;
      return V(x, y + r * v, z, c * u * nr, v * nr, -s * u * nr);
    };
    const ring = (material, from, to, r1, r2) => {
      for (let i = 0; i < 20; i++) {
        const a = i * 2 * Math.PI / 20, b = (i + 1) * 2 * Math.PI / 20;
        quad(material, position(from, a, r1), position(from, b, r1),
          position(to, b, r2), position(to, a, r2));
      }
    };
    const annulus = (material, at, inner, outer) => {
      for (let i = 0; i < 20; i++) {
        const a = i * 2 * Math.PI / 20, b = (i + 1) * 2 * Math.PI / 20;
        quad(material, position(at, a, inner), position(at, b, inner),
          position(at, b, outer), position(at, a, outer));
      }
    };
    ring(1, 0.003, 0.016, size * 1.7, size * 1.7);
    annulus(1, 0.016, size * 0.91, size * 1.7);
    ring(3, 0.016, projection, size, size);
    annulus(2, projection, size * 0.72, size);
    // Interior más oscuro para que las bocas no parezcan macizas.
    for (let i = 0; i < 20; i++) {
      const a = i * 2 * Math.PI / 20, b = (i + 1) * 2 * Math.PI / 20;
      tri(7, position(projection - 0.006, 0, 0),
        position(projection - 0.006, a, size * 0.73),
        position(projection - 0.006, b, size * 0.73));
    }
  }
  const pipeSize = Math.max(0.027, Math.min(0.043, radius * 0.043));
  nozzle(gaugeTheta, Math.max(0.091, height * 0.065), pipeSize, 0.092);
  nozzle(0.96, Math.max(0.16, height * 0.11), pipeSize * 0.9, 0.078);

  const definitions = [
    { name: 'PRFV ' + color + ' (simulación)', rgba: finish.body, metallic: 0.0, roughness: 0.41 },
    { name: 'Uniones y bridas', rgba: finish.seam, metallic: 0.04, roughness: 0.46 },
    { name: 'Tapadera', rgba: [0.9, 0.92, 0.91, 1], metallic: 0.0, roughness: 0.43 },
    { name: 'Bocas grises', rgba: [0.39, 0.45, 0.47, 1], metallic: 0.12, roughness: 0.39 },
    { name: 'Franja', rgba: finish.stripe, metallic: 0, roughness: 0.63 },
    { name: 'Graduación clara', rgba: finish.ink, metallic: 0, roughness: 0.85 },
    { name: 'Graduación destacada', rgba: finish.accent, metallic: 0, roughness: 0.83 },
    { name: 'Interior oscuro', rgba: [0.018, 0.023, 0.024, 1], metallic: 0, roughness: 0.9 },
  ];

  const buffers = [], views = [], accessors = [], nodes = [], meshes = [];
  let offset = 0;
  function append(array, target) {
    const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
    const entry = { buffer: 0, byteOffset: offset, byteLength: bytes.length, target };
    views.push(entry); buffers.push(bytes); offset += bytes.length;
    return views.length - 1;
  }
  function accessor(view, count, type, componentType, list) {
    const a = { bufferView: view, componentType, type, count };
    if (list) {
      const mins = [Infinity, Infinity, Infinity], maxs = [-Infinity, -Infinity, -Infinity];
      for (let i = 0; i < list.length; i += 3) {
        for (let d = 0; d < 3; d++) {
          mins[d] = Math.min(mins[d], list[i + d]);
          maxs[d] = Math.max(maxs[d], list[i + d]);
        }
      }
      a.min = mins; a.max = maxs;
    }
    accessors.push(a);
    return accessors.length - 1;
  }
  for (let i = 0; i < groups.length; i++) {
    const g = groups[i]; if (!g.indices.length) continue;
    const positions = Float32Array.from(g.positions);
    const normals = Float32Array.from(g.normals);
    const indices = Uint32Array.from(g.indices);
    const p = accessor(append(positions, 34962), positions.length / 3, 'VEC3', 5126, positions);
    const n = accessor(append(normals, 34962), normals.length / 3, 'VEC3', 5126);
    const ix = accessor(append(indices, 34963), indices.length, 'SCALAR', 5125);
    const meshId = meshes.length;
    meshes.push({ name: g.name, primitives: [{
      attributes: { POSITION: p, NORMAL: n }, indices: ix, material: i,
    }] });
    nodes.push({ name: g.name, mesh: meshId });
  }
  const materials = definitions.map(mat => ({
    name: mat.name, doubleSided: true,
    pbrMetallicRoughness: {
      baseColorFactor: mat.rgba, metallicFactor: mat.metallic, roughnessFactor: mat.roughness,
    },
  }));
  const binary = Buffer.concat(buffers);
  const json = Buffer.from(JSON.stringify({
    asset: { version: '2.0', generator: 'Depofibra AR · volúmenes orientativos' },
    scene: 0, scenes: [{ nodes: nodes.map((_, i) => i) }],
    nodes, meshes, materials,
    buffers: [{ byteLength: binary.length }], bufferViews: views, accessors,
  }));
  function chunk(bytes, name, padding) {
    const size = Math.ceil(bytes.length / 4) * 4;
    const data = Buffer.alloc(8 + size, padding);
    data.writeUInt32LE(size, 0);
    data.write(name, 4, 4, 'ascii');
    bytes.copy(data, 8);
    return data;
  }
  const chunks = [chunk(json, 'JSON', 32), chunk(binary, 'BIN\0', 0)];
  const header = Buffer.alloc(12);
  header.write('glTF', 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + chunks[0].length + chunks[1].length, 8);
  return Buffer.concat([header, ...chunks]);
}
