// glTF 2.0: metres, right-handed, +Y up. No node transforms or external resources.
export function buildTankGlb({ diameterMm, longitudinalMm }) {
  const radius = diameterMm / 2000;
  const height = longitudinalMm / 1000;
  const edge = Math.min(radius, height) * 0.014;
  const segments = 96;
  const positions = [];
  const normals = [];
  const indices = [];
  function vertex(x, y, z, nx, ny, nz) {
    normals.push(nx, ny, nz);
    positions.push(x, y, z);
    return positions.length / 3 - 1;
  }

  // Round only inside the envelope for a small highlight on the white finish.
  // End rings also serve as the perimeters of the flat caps.
  const rings = [];
  for (const top of [false, true]) {
    for (let step = 0; step <= 4; step++) {
      const angle = ((top ? 0 : -1) + step / 4) * Math.PI / 2;
      const r = radius - edge + edge * Math.cos(angle);
      const y = (top ? height - edge : edge) + edge * Math.sin(angle);
      const start = positions.length / 3;
      for (let i = 0; i < segments; i++) {
        const theta = 2 * Math.PI * i / segments;
        const c = Math.cos(theta), s = Math.sin(theta);
        vertex(r * c, y, r * s, c * Math.cos(angle), Math.sin(angle), s * Math.cos(angle));
      }
      rings.push(start);
    }
  }
  for (let ring = 1; ring < rings.length; ring++) {
    const lower = rings[ring - 1], upper = rings[ring];
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      indices.push(lower + i, upper + i, lower + next, lower + next, upper + i, upper + next);
    }
  }
  const bottom = vertex(0, 0, 0, 0, -1, 0);
  const top = vertex(0, height, 0, 0, 1, 0);
  const rim = rings.at(-1);
  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    indices.push(bottom, i, next, top, rim + next, rim + i);
  }

  const buffers = [new Float32Array(positions), new Float32Array(normals), new Uint16Array(indices)];
  let offset = 0;
  const bufferViews = buffers.map((array, index) => {
    const view = { buffer: 0, byteOffset: offset, byteLength: array.byteLength, target: index === 2 ? 34963 : 34962 };
    offset += array.byteLength;
    return view;
  });
  const binary = Buffer.concat(buffers.map(array => Buffer.from(array.buffer)));
  const r = Math.fround(radius), h = Math.fround(height);
  const json = Buffer.from(JSON.stringify({
    asset: { version: '2.0', generator: 'Depofibra · geometría orientativa' },
    scene: 0, scenes: [{ nodes: [0] }], nodes: [{ name: 'Deposito', mesh: 0 }],
    meshes: [{ primitives: [{ attributes: { POSITION: 0, NORMAL: 1 }, indices: 2, material: 0 }] }],
    materials: [{ name: 'PRFV blanco ilustrativo', pbrMetallicRoughness: {
      // Acabado blanco satinado ilustrativo, sin fingir un color autorizado de fábrica.
      baseColorFactor: [0.91, 0.93, 0.95, 1], metallicFactor: 0, roughnessFactor: 0.46,
    } }],
    buffers: [{ byteLength: binary.length }], bufferViews,
    accessors: [
      { bufferView: 0, componentType: 5126, type: 'VEC3', count: positions.length / 3, min: [-r, 0, -r], max: [r, h, r] },
      { bufferView: 1, componentType: 5126, type: 'VEC3', count: normals.length / 3 },
      { bufferView: 2, componentType: 5123, type: 'SCALAR', count: indices.length },
    ],
  }));

  function chunk(bytes, type, padByte) {
    const size = Math.ceil(bytes.length / 4) * 4;
    const result = Buffer.alloc(8 + size, padByte);
    result.writeUInt32LE(size, 0);
    result.write(type, 4, 4, 'ascii');
    bytes.copy(result, 8);
    return result;
  }
  const chunks = [chunk(json, 'JSON', 32), chunk(binary, 'BIN\0', 0)];
  const header = Buffer.alloc(12);
  header.write('glTF');
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + chunks[0].length + chunks[1].length, 8);
  return Buffer.concat([header, ...chunks]);
}
