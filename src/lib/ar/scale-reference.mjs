/**
 * Añade una referencia físicamente modelada de 1,000 m a GLB en metros.
 * No toca la escala, altura, diámetro, materiales ni geometría del producto.
 * Variante OPTATIVA para comprobar escala de AR con cinta métrica real.
 *
 * Barras bicolor cada 25 cm, sin leyendas flotantes ni elementos HTML
 * que desaparecen en Scene Viewer o Quick Look.
 */
export function addOneMeterReference(glb, outerRadiusMeters) {
  if (!(outerRadiusMeters > 0)) throw new Error('Radio de ficha inválido');
  const data = Buffer.isBuffer(glb) ? glb : Buffer.from(glb);
  if (data.toString('ascii', 0, 4) !== 'glTF' || data.readUInt32LE(4) !== 2) {
    throw new Error('Solo GLB 2.0');
  }
  const jsonSize = data.readUInt32LE(12);
  if (data.toString('ascii', 16, 20) !== 'JSON') throw new Error('JSON GLB incorrecto');
  const doc = JSON.parse(data.subarray(20, 20 + jsonSize).toString('utf8'));
  const binaryHeader = 20 + jsonSize;
  const oldBinaryLength = data.readUInt32LE(binaryHeader);
  if (data.toString('ascii', binaryHeader + 4, binaryHeader + 8) !== 'BIN\0') {
    throw new Error('BIN GLB incorrecto');
  }
  const oldBinary = data.subarray(binaryHeader + 8, binaryHeader + 8 + oldBinaryLength);
  const outerX = outerRadiusMeters + 0.20;
  const centerZ = 0;
  const thickness = 0.052;
  const groups = [
    { name: 'Regla1mAzul', positions: [], normals: [], indexes: [] },
    { name: 'Regla1mBlanco', positions: [], normals: [], indexes: [] },
  ];
  function quad(group, a, b, c, d, normal) {
    const offset = group.positions.length / 3;
    for (const p of [a,b,c,d]) {
      group.positions.push(...p);
      group.normals.push(...normal);
    }
    group.indexes.push(offset, offset+1, offset+2, offset, offset+2, offset+3);
  }
  function box(group, x0, y0, z0, x1, y1, z1) {
    quad(group, [x0,y0,z1],[x1,y0,z1],[x1,y1,z1],[x0,y1,z1],[0,0,1]);
    quad(group, [x1,y0,z0],[x0,y0,z0],[x0,y1,z0],[x1,y1,z0],[0,0,-1]);
    quad(group, [x1,y0,z1],[x1,y0,z0],[x1,y1,z0],[x1,y1,z1],[1,0,0]);
    quad(group, [x0,y0,z0],[x0,y0,z1],[x0,y1,z1],[x0,y1,z0],[-1,0,0]);
    quad(group, [x0,y1,z1],[x1,y1,z1],[x1,y1,z0],[x0,y1,z0],[0,1,0]);
    quad(group, [x0,y0,z0],[x1,y0,z0],[x1,y0,z1],[x0,y0,z1],[0,-1,0]);
  }
  // 4 tramos EXACTOS de 25 cm = 1.00 m.
  for (let i=0; i<4; i++) {
    const y0 = i / 4;
    const y1 = (i+1) / 4;
    box(groups[i % 2], outerX-thickness/2, y0, centerZ-thickness/2,
      outerX+thickness/2, y1, centerZ+thickness/2);
  }
  // Pequeña peana en el suelo sin elevar la marca de origen.
  box(groups[0],outerX-0.105,0,centerZ-0.105,outerX+0.105,0.014,centerZ+0.105);

  const buffers = [oldBinary], viewBase = oldBinaryLength;
  let offset = viewBase;
  function append(array,target) {
    const b = Buffer.from(array.buffer,array.byteOffset,array.byteLength);
    if (offset % 4) {
      const padding = Buffer.alloc(4 - offset%4);
      buffers.push(padding); offset+=padding.length;
    }
    const v = doc.bufferViews.push({buffer:0,byteOffset:offset,byteLength:b.length,target})-1;
    buffers.push(b);offset+=b.length;
    return v;
  }
  function accessor(view,count,type,componentType,positions=null) {
    const record = {bufferView:view,count,type,componentType};
    if (positions) {
      const min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
      for(let i=0;i<positions.length;i+=3) for(let c=0;c<3;c++){
        min[c]=Math.min(min[c],positions[i+c]);
        max[c]=Math.max(max[c],positions[i+c]);
      }
      record.min=min;record.max=max;
    }
    doc.accessors.push(record);return doc.accessors.length-1;
  }
  for(let j=0;j<groups.length;j++){
    const g=groups[j];
    const p = Float32Array.from(g.positions), n=Float32Array.from(g.normals), ix=Uint32Array.from(g.indexes);
    const position=accessor(append(p,34962),p.length/3,'VEC3',5126,p);
    const normal=accessor(append(n,34962),n.length/3,'VEC3',5126);
    const indices=accessor(append(ix,34963),ix.length,'SCALAR',5125);
    const mat=doc.materials.push({
      name:g.name, doubleSided:true,
      pbrMetallicRoughness:{
        baseColorFactor:j===0?[0.004,0.281,0.557,1]:[0.97,0.98,0.99,1],
        metallicFactor:0,roughnessFactor:0.55
      }
    })-1;
    const mesh=doc.meshes.push({name:g.name,primitives:[{
      attributes:{POSITION:position,NORMAL:normal},indices,material:mat
    }]})-1;
    const node=doc.nodes.push({name:g.name,mesh})-1;
    doc.scenes[doc.scene??0].nodes.push(node);
  }
  const binary=Buffer.concat(buffers);
  doc.buffers[0].byteLength=binary.length;
  const json=Buffer.from(JSON.stringify(doc));
  function chunk(body,tag,pad) {
    const size=Math.ceil(body.length/4)*4;
    const output=Buffer.alloc(size+8,pad);
    output.writeUInt32LE(size,0);output.write(tag,4,4,'ascii');body.copy(output,8);
    return output;
  }
  const chunks=[chunk(json,'JSON',32),chunk(binary,'BIN\0',0)];
  const header=Buffer.alloc(12);header.write('glTF');header.writeUInt32LE(2,4);
  header.writeUInt32LE(12+chunks[0].length+chunks[1].length,8);
  return Buffer.concat([header,...chunks]);
}
