"""Comprobación automática de los 8 vasos × 4 acabados, GLB y USDZ."""
import json, math, struct, zipfile, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
FOLDER=ROOT/'dist/models/ar/vasos'
SOURCE="import {vasosAR} from './src/data/vasosAR.ts'; console.log(JSON.stringify(vasosAR));"
DATA=json.loads(subprocess.check_output(['node','--input-type=module','-e',SOURCE],cwd=ROOT))
EXPECTED=[(110,510,690),(210,700,740),(310,780,900),(530,960,950),
          (1030,1140,1280),(2120,1600,1250),(3100,1770,1630),(4000,1870,1850)]
COLORS=('blanco','verde','gris','negro')
assert [(v['liters'],v['diameterMm'],v['heightMm']) for v in DATA]==EXPECTED
files=set()
for item in DATA:
    finishes=set()
    for color in COLORS:
        name=item['id']+('' if color=='blanco' else '-'+color)
        glb=FOLDER/(name+'.glb')
        usdz=FOLDER/(name+'.usdz')
        files.update((glb,usdz))
        raw=glb.read_bytes()
        magic,version,length,jlen,name_=struct.unpack_from('<4sIII4s',raw,0)
        assert (magic,version,length,name_)==(b'glTF',2,len(raw),b'JSON')
        doc=json.loads(raw[20:20+jlen])
        assert [n['name'] for n in doc['nodes']]==['Vaso','BordeSuperior','Tapa','TapaCentral']
        finishes.add(tuple(doc['materials'][0]['pbrMetallicRoughness']['baseColorFactor']))
        off=20+jlen
        blen,marker=struct.unpack_from('<I4s',raw,off)
        data=memoryview(raw)[off+8:]
        assert marker==b'BIN\0' and len(data)==blen
        allpoints=[]
        for mesh in doc['meshes']:
            prim,=mesh['primitives']
            acc=doc['accessors'][prim['attributes']['POSITION']]
            view=doc['bufferViews'][acc['bufferView']]
            start=view['byteOffset']+acc.get('byteOffset',0)
            xyz=list(struct.iter_unpack('<3f',data[start:start+acc['count']*12]))
            allpoints.extend(xyz)
            ind=doc['accessors'][prim['indices']]
            assert ind['componentType']==5125 and ind['count']%3==0
        assert math.isclose(min(p[1] for p in allpoints),0,abs_tol=0.00005)
        assert math.isclose(max(p[1] for p in allpoints),item['heightMm']/1000,abs_tol=0.00005)
        r=max(math.hypot(p[0],p[2]) for p in allpoints)
        assert math.isclose(r,item['diameterMm']/2000,abs_tol=0.00005)
        assert glb.stat().st_size<700_000
        with zipfile.ZipFile(usdz) as zipf:
            assert zipf.testzip() is None
            usda=zipf.read(zipf.namelist()[0]).decode('utf-8')
            assert 'metersPerUnit = 1' in usda and 'upAxis = "Y"' in usda
    assert len(finishes)==4
assert set(FOLDER.iterdir())==files
print('Vasos: 32 GLB y 32 USDZ, 8 capacidades x 4 colores, cotas y materiales verificados.')
