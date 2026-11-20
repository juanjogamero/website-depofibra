"""Verifica cotas métricas y regla opcional de un metro de vasos GLB/USDZ."""
import json
import math
import struct
import subprocess
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / 'dist/models/ar/vasos'
SOURCE = "import {vasosAR} from './src/data/vasosAR.ts'; console.log(JSON.stringify(vasosAR));"
DATA = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', SOURCE], cwd=ROOT))
EXPECTED = [(110, 510, 690), (210, 700, 740), (310, 780, 900), (530, 960, 950),
            (1030, 1140, 1280), (2120, 1600, 1250), (3100, 1770, 1630),
            (4000, 1870, 1850)]
COLORS = ('blanco', 'verde', 'gris', 'negro')
assert [(v['liters'], v['diameterMm'], v['heightMm']) for v in DATA] == EXPECTED


def read_glb(path):
    raw = path.read_bytes()
    magic, version, length, jlen, mark = struct.unpack_from('<4sIII4s', raw)
    assert (magic, version, length, mark) == (b'glTF', 2, len(raw), b'JSON')
    doc = json.loads(raw[20:20+jlen])
    off = 20 + jlen
    size, marker = struct.unpack_from('<I4s', raw, off)
    binary = memoryview(raw)[off+8:]
    assert marker == b'BIN\0' and len(binary) == size

    def accessor(idx, fmt):
        acc = doc['accessors'][idx]
        view = doc['bufferViews'][acc['bufferView']]
        at = view.get('byteOffset', 0) + acc.get('byteOffset', 0)
        stride = struct.calcsize(fmt)
        return list(struct.iter_unpack(fmt, binary[at:at+acc['count']*stride]))

    groups = {}
    for node in doc['nodes']:
        prim, = doc['meshes'][node['mesh']]['primitives']
        positions = accessor(prim['attributes']['POSITION'], '<3f')
        normals = accessor(prim['attributes']['NORMAL'], '<3f')
        indices = [i for (i,) in accessor(prim['indices'], '<I')]
        assert indices and max(indices) < len(positions)
        assert len(indices) % 3 == 0 and len(positions) == len(normals)
        assert all(all(math.isfinite(x) for x in pt) for pt in positions)
        groups[node['name']] = positions
    return doc, groups


def within(value, expected):
    return math.isclose(value, expected, abs_tol=0.00005)


files = set()
for item in DATA:
    finishes = set()
    for color in COLORS:
        for ruler in (False, True):
            name = item['id'] + ('' if color == 'blanco' else '-'+color) + ('-regla' if ruler else '')
            glb = FOLDER/(name+'.glb')
            usdz = FOLDER/(name+'.usdz')
            files.update([glb, usdz])
            doc, groups = read_glb(glb)
            assert glb.stat().st_size < 900_000
            assert {'Vaso', 'BordeSuperior', 'Tapa', 'TapaCentral'} <= groups.keys()
            if not ruler:
                finishes.add(tuple(doc['materials'][0]['pbrMetallicRoughness']['baseColorFactor']))
            core = [p for name, pts in groups.items()
                    if name not in ('Regla1mAzul', 'Regla1mBlanco') for p in pts]
            assert within(min(p[1] for p in core), 0)
            assert within(max(p[1] for p in core), item['heightMm']/1000)
            r = max(math.hypot(p[0], p[2]) for p in core)
            assert within(r, item['diameterMm']/2000), (name, r)
            if ruler:
                assert {'Regla1mAzul', 'Regla1mBlanco'} <= groups.keys()
                points = groups['Regla1mAzul'] + groups['Regla1mBlanco']
                assert within(min(p[1] for p in points), 0)
                assert within(max(p[1] for p in points), 1.0)
                assert min(p[0] for p in points) > item['diameterMm']/2000
            else:
                assert 'Regla1mAzul' not in groups and 'Regla1mBlanco' not in groups
            with zipfile.ZipFile(usdz) as archive:
                assert archive.testzip() is None
                usda = archive.read(archive.namelist()[0]).decode('utf-8')
                assert 'metersPerUnit = 1' in usda and 'upAxis = "Y"' in usda
    assert len(finishes) == 4
assert set(FOLDER.iterdir()) == files
print('Vasos AR: 8 medidas, 4 colores, 2 modos = 64 GLB + 64 USDZ; cotas y regla de 1 m verificadas.')
