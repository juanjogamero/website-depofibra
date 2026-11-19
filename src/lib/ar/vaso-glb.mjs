/**
 * Vaso PRFV de superficie basado visualmente en fotografía aportada por dirección.
 * Sin accesorios falsos, sin medidor volumétrico ni dimensiones extrapoladas.
 * Diámetro exterior máximo y alto total == cotas de tabla; m, +Y arriba.
 *
 * La base estrecha y los anillos de tapa son ILUSTRATIVOS porque no hay
 * despiece dimensional; el aro superior marca el diámetro exterior tabulado.
 */
export function buildVasoGlb({ diameterMm, heightMm }) {
  if (!Number.isFinite(diameterMm) || !Number.isFinite(heightMm) || diameterMm <= 0 || heightMm <= 0) {
    throw new Error('Dimensiones de vaso no válidas');
  }
  const radius = diameterMm / 2000;
  const height = heightMm / 1000;
  const groups = [
    { name: 'Vaso', p: [], n: [], ix: [], material: 0 },
    { name: 'BordeSuperior', p: [], n: [], ix: [], material: 1 },
    { name: 'Tapa', p: [], n: [], ix: [], material: 2 },
    { name: 'TapaCentral', p: [], n: [], ix: [], material: 1 },
  ];
  const segments = 96;
  const v = (r, y, theta, nr = 1, ny = 0) => {
    const c = Math.cos(theta), s = Math.sin(theta);
    const norm = Math.hypot(nr, ny) || 1;
    return { p: [r * s, y, r * c], n: [nr * s / norm, ny / norm, nr * c / norm] };
  };
  function triangle(g, a, b, c) {
    const i = g.p.length / 3;
    for (const x of [a,b,c]) { g.p.push(...x.p); g.n.push(...x.n); }
    g.ix.push(i, i+1, i+2);
  }
  function quad(g, a, b, c, d) {
    triangle(g, a,b,c); triangle(g, a,c,d);
  }
  function lathe(g, rings) {
    for (let j = 0; j < rings.length - 1; j++) {
      const a = rings[j], b = rings[j+1];
      for (let i = 0; i < segments; i++) {
        const t = i * 2 * Math.PI / segments, next = (i+1)*2*Math.PI/segments;
        quad(g, v(a.r,a.y,t,a.nr,a.ny),v(a.r,a.y,next,a.nr,a.ny),
            v(b.r,b.y,next,b.nr,b.ny),v(b.r,b.y,t,b.nr,b.ny));
      }
    }
  }
  function disk(g, r, y, normal) {
    for (let i=0;i<segments;i++) {
      const theta=i*2*Math.PI/segments, next=(i+1)*2*Math.PI/segments;
      const center={p:[0,y,0],n:[0,normal,0]};
      const a=v(r,y,theta,0,normal), b=v(r,y,next,0,normal);
      if (normal>0) triangle(g, center,a,b);
      else triangle(g, center,b,a);
    }
  }
  // Perfil fotográfico ligeramente troncocónico: el diámetro inferior no se
  // afirma como medición, pues la ficha solo facilita un diámetro por modelo.
  const innerBottom=radius*0.79;
  const upperBody=radius*0.967;
  lathe(groups[0], [
    {r:innerBottom*0.98,y:0,nr:1,ny:0},
    {r:innerBottom,y:Math.min(0.022,height*0.028),nr:1,ny:0},
    {r:upperBody,y:height*0.88,nr:0.99,ny:-0.13},
    {r:upperBody,y:height*0.914,nr:1,ny:0},
  ]);
  disk(groups[0], innerBottom*0.98, 0, -1);
  // Reborde visto en la foto: su máxima anchura representa el diámetro tabulado.
  lathe(groups[1], [
    {r:upperBody,y:height*0.914,nr:1,ny:0},
    {r:radius,y:height*0.928,nr:1,ny:0},
    {r:radius,y:height*0.961,nr:1,ny:0},
    {r:radius*0.978,y:height*0.971,nr:0,ny:1},
  ]);
  // Cubierta horizontal con una leve depresión visual en la zona intermedia.
  lathe(groups[2], [
    {r:radius*0.978,y:height*0.971,nr:0,ny:1},
    {r:radius*0.70,y:height*0.969,nr:0,ny:1},
    {r:radius*0.35,y:height*0.972,nr:0,ny:1},
    {r:radius*0.32,y:height*0.980,nr:1,ny:0},
  ]);
  lathe(groups[3], [
    {r:radius*0.32,y:height*0.980,nr:1,ny:0},
    {r:radius*0.31,y:height*0.993,nr:0,ny:1},
    {r:radius*0.29,y:height,nr:0,ny:1},
  ]);
  disk(groups[3], radius*0.29, height, 1);

  const mats=[
    {name:'PRFV blanco ilustrativo', rgba:[0.91,0.92,0.91,1],roughness:0.55},
    {name:'Borde blanco satinado', rgba:[0.95,0.96,0.95,1],roughness:0.36},
    {name:'Tapa blanca',rgba:[0.925,0.935,0.93,1],roughness:0.44},
  ];
  const buffers=[], bufferViews=[], accessors=[], nodes=[], meshes=[];
  let offset=0;
  function append(array,target) {
    const buf=Buffer.from(array.buffer,array.byteOffset,array.byteLength);
    buffers.push(buf);
    bufferViews.push({buffer:0,byteOffset:offset,byteLength:buf.length,target});
    offset+=buf.length;
    return bufferViews.length-1;
  }
  function addAccessor(view,count,type,componentType,positions) {
    const data={bufferView:view,componentType,type,count};
    if (positions) {
      const mi=[Infinity,Infinity,Infinity], ma=[-Infinity,-Infinity,-Infinity];
      for (let i=0;i<positions.length;i+=3) {
        for (let k=0;k<3;k++) {mi[k]=Math.min(mi[k],positions[i+k]);ma[k]=Math.max(ma[k],positions[i+k]);}
      }
      data.min=mi;data.max=ma;
    }
    accessors.push(data);
    return accessors.length-1;
  }
  for (const g of groups) {
    const p=Float32Array.from(g.p), n=Float32Array.from(g.n), ix=Uint32Array.from(g.ix);
    const pa=addAccessor(append(p,34962),p.length/3,'VEC3',5126,p);
    const na=addAccessor(append(n,34962),n.length/3,'VEC3',5126);
    const ia=addAccessor(append(ix,34963),ix.length,'SCALAR',5125);
    const meshId=meshes.length;
    meshes.push({name:g.name,primitives:[{attributes:{POSITION:pa,NORMAL:na},indices:ia,material:g.material}]});
    nodes.push({name:g.name,mesh:meshId});
  }
  const binary=Buffer.concat(buffers);
  const json=Buffer.from(JSON.stringify({
    asset:{version:'2.0',generator:'Depofibra · vaso cilíndrico orientativo'},
    scene:0,scenes:[{nodes:nodes.map((_,i)=>i)}],nodes,meshes,
    materials:mats.map(m=>({name:m.name,doubleSided:true,pbrMetallicRoughness:{
      baseColorFactor:m.rgba,roughnessFactor:m.roughness,metallicFactor:0
    }})),
    buffers:[{byteLength:binary.length}],bufferViews,accessors
  }));
  function chunk(payload,name,pad) {
    const length=Math.ceil(payload.length/4)*4;
    const output=Buffer.alloc(8+length,pad);
    output.writeUInt32LE(length,0);
    output.write(name,4,4,'ascii');
    payload.copy(output,8);
    return output;
  }
  const chunks=[chunk(json,'JSON',32),chunk(binary,'BIN\0',0)];
  const header=Buffer.alloc(12);
  header.write('glTF');header.writeUInt32LE(2,4);
  header.writeUInt32LE(12+chunks[0].length+chunks[1].length,8);
  return Buffer.concat([header,...chunks]);
}
