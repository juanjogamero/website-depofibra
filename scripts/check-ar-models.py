"""Verifica los 17 tamaños x 3 acabados y sus GLB/USDZ publicados, sin depender de cámara."""
import argparse
import json
import math
from pathlib import Path
import struct
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]
MODELS = ROOT / 'dist/models/ar/verticales'
TOLERANCE_M = 0.00004
COLORS = ("blanco", "verde", "gris")
REQUIRED = {"Deposito", "Tapadera", "FranjaIndicadora", "Numeracion",
            "NumeracionDestacada", "BocasMetalicas", "InteriorBocas"}


def read_glb(path):
    data = path.read_bytes()
    magic, version, length, json_length, json_chunk = struct.unpack_from('<4sIII4s', data)
    assert (magic, version, length, json_chunk) == (b'glTF', 2, len(data), b'JSON')
    doc = json.loads(data[20:20 + json_length])
    binary_offset = 20 + json_length
    bin_length, bin_chunk = struct.unpack_from('<I4s', data, binary_offset)
    binary = memoryview(data)[binary_offset + 8:]
    assert bin_chunk == b'BIN\0' and len(binary) == bin_length
    assert len(doc['meshes']) >= 7
    groups = {}

    def accessor_values(index):
        accessor = doc['accessors'][index]
        view = doc['bufferViews'][accessor['bufferView']]
        count = accessor['count']
        comp = accessor['componentType']
        tup = accessor['type']
        assert accessor.get('byteOffset', 0) % 4 == 0
        sizefmt = ('f' if comp == 5126 else 'I' if comp == 5125 else 'H')
        component_count = 3 if tup == 'VEC3' else 1
        fmt = '<' + sizefmt * component_count
        start = view.get('byteOffset', 0) + accessor.get('byteOffset', 0)
        size = count * struct.calcsize(fmt)
        values = list(struct.iter_unpack(fmt, binary[start:start + size]))
        return values

    for node in doc['nodes']:
        mesh = doc['meshes'][node['mesh']]
        primitive, = mesh['primitives']
        vertices = accessor_values(primitive['attributes']['POSITION'])
        normals = accessor_values(primitive['attributes']['NORMAL'])
        indices = [i for (i,) in accessor_values(primitive['indices'])]
        assert len(vertices) == len(normals)
        assert len(indices) % 3 == 0 and max(indices) < len(vertices)
        assert all(all(math.isfinite(x) for x in point) for point in vertices)
        assert all(0.94 < math.sqrt(sum(c*c for c in n)) < 1.06 for n in normals)
        groups[node['name']] = (vertices, indices)
    assert REQUIRED.issubset(groups), (path.name, groups.keys())
    return doc, groups


def check_bounds(groups, diameter, height):
    core, _ = groups['Deposito']
    for axis in [0, 2]:
        actual = min(p[axis] for p in core), max(p[axis] for p in core)
        expected = -diameter / 2, diameter / 2
        assert all(math.isclose(a, e, abs_tol=TOLERANCE_M) for a, e in zip(actual, expected)), (actual, expected)
    assert math.isclose(min(p[1] for p in core), 0, abs_tol=TOLERANCE_M)
    all_points = [p for part, _ in groups.values() for p in part]
    assert math.isclose(max(p[1] for p in all_points), height, abs_tol=TOLERANCE_M)
    assert min(p[1] for p in all_points) >= -TOLERANCE_M
    # Los dos racores pueden sobresalir del cilindro, pero no varios decímetros.
    assert max(math.hypot(p[0], p[2]) for p in all_points) <= diameter/2 + 0.19


def check_usdz(path, full):
    with path.open('rb') as stream, zipfile.ZipFile(path) as archive:
        assert archive.namelist()[0].endswith('.usda')
        assert archive.testzip() is None
        for item in archive.infolist():
            stream.seek(item.header_offset + 26)
            name_len, extra_len = struct.unpack('<HH', stream.read(4))
            assert (item.header_offset + 30 + name_len + extra_len) % 64 == 0
            assert item.compress_type == zipfile.ZIP_STORED
        usda = archive.read(archive.namelist()[0]).decode('utf-8')
        assert 'metersPerUnit = 1' in usda and 'upAxis = "Y"' in usda
    if full:
        from pxr import Usd, UsdGeom, UsdShade
        stage = Usd.Stage.Open(str(path))
        assert stage.GetDefaultPrim()
        assert UsdGeom.GetStageUpAxis(stage) == 'Y'
        assert UsdGeom.GetStageMetersPerUnit(stage) == 1
        meshes = [UsdGeom.Mesh(p) for p in stage.Traverse() if p.IsA(UsdGeom.Mesh)]
        assert len(meshes) >= 7
        for mesh in meshes:
            assert UsdShade.MaterialBindingAPI(mesh).ComputeBoundMaterial()[0]
            assert len(mesh.GetPointsAttr().Get()) > 0


def main(full):
    source = "import {verticalFlatBaseDimensions as rows} from './src/data/depositDimensions.ts'; console.log(JSON.stringify(rows));"
    rows = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', source], cwd=ROOT))
    assert len(rows) == 17
    expected = set()
    appearances = {}
    for row in rows:
        liters, diameter, height = (row[key] for key in ('liters', 'diameterMm', 'longitudinalMm'))
        for color in COLORS:
            stem = f'{liters}-{diameter}-{height}' + (f'-{color}' if color != 'blanco' else '')
            glb, usdz = (MODELS / (stem + ext) for ext in ['.glb', '.usdz'])
            expected.update([glb, usdz])
            assert glb.is_file() and usdz.is_file()
            assert glb.stat().st_size < 2_500_000
            doc, groups = read_glb(glb)
            check_bounds(groups, diameter/1000, height/1000)
            material = doc['materials'][0]['pbrMetallicRoughness']['baseColorFactor']
            appearances.setdefault(color, material)
            assert material == appearances[color]
            check_usdz(usdz, full)
    assert len({tuple(x) for x in appearances.values()}) == 3
    assert set(MODELS.iterdir()) == expected
    print('51 modelos GLB + 51 USDZ, 17 medidas x 3 acabados; geometría, cotas y accesorios verificados.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--usd', action='store_true', help='Valida materiales USDZ también con usd-core.')
    main(parser.parse_args().usd)
