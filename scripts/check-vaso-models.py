"""Comprobación de los ocho vasos de referencia y sus archivos AR."""
import json, math, struct, zipfile
from pathlib import Path
import subprocess

ROOT=Path(__file__).resolve().parents[1]
FOLDER=ROOT/'dist/models/ar/vasos'
SOURCE="import {vasosAR} from './src/data/vasosAR.ts'; console.log(JSON.stringify(vasosAR));"
DATA=json.loads(subprocess.check_output(['node','--input-type=module','-e',SOURCE],cwd=ROOT))
EXPECTED=[(110,510,690),(210,700,740),(310,780,900),(530,960,950),
          (1030,1140,1280),(2120,1600,1250),(3100,1770,1630),(4000,1870,1850)]
assert [(v['liters'],v['diameterMm'],v['heightMm']) for v in DATA]==EXPECTED
expected_files=set()
for item in DATA:
    stem=item['id']
    glb=FOLDER/(stem+'.glb'); usdz=FOLDER/(stem+'.usdz')
    expected_files.update((glb,usdz))
    raw=glb.read_bytes()
    magic,version,total,json_length,name=struct.unpack_from('<4sIII4s',raw,0)
    assert magic==b'glTF' and version==2 and total==len(raw) and name==b'JSON'
    obj=json.loads(raw[20:20+json_length])
    assert [n['name'] for n in obj['nodes']]==['Vaso','BordeSuperior','Tapa','TapaCentral']
    bin_offset=20+json_length
    bin_length,chunk=struct.unpack_from('<I4s',raw,bin_offset)
    binary=memoryview(raw)[bin_offset+8:]
    assert chunk==b'BIN\0' and len(binary)==bin_length
    allpoints=[]
    for mesh in obj['meshes']:
        primitive,=mesh['primitives']
        accessor=obj['accessors'][primitive['attributes']['POSITION']]
        view=obj['bufferViews'][accessor['bufferView']]
        start=view['byteOffset']+accessor.get('byteOffset',0)
        points=list(struct.iter_unpack('<3f',binary[start:start+accessor['count']*12]))
        allpoints.extend(points)
        idx=obj['accessors'][primitive['indices']]
        assert idx['componentType']==5125 and idx['count']%3==0
    ys=[p[1] for p in allpoints]
    assert math.isclose(min(ys),0,abs_tol=0.00005)
    assert math.isclose(max(ys),item['heightMm']/1000,abs_tol=0.00005)
    r=max(math.hypot(p[0],p[2]) for p in allpoints)
    assert math.isclose(r,item['diameterMm']/2000,abs_tol=0.00005),stem
    assert glb.stat().st_size<700_000
    with zipfile.ZipFile(usdz) as z:
        assert z.testzip() is None
        text=z.read(z.namelist()[0]).decode('utf-8')
        assert 'metersPerUnit = 1' in text and 'upAxis = "Y"' in text
print("Vasos AR: 8 GLB + 8 USDZ verificados. Diámetros y alturas en metros.")
assert set(FOLDER.iterdir())==expected_files
