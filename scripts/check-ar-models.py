"""Verifica los archivos de dist contra la tabla del catálogo. Con --usd usa OpenUSD."""
import argparse
import json
import math
from pathlib import Path
import struct
import subprocess
import zipfile

ROOT = Path(__file__).resolve().parents[1]
MODELS = ROOT / 'dist/models/ar/verticales'
TOLERANCE_M = 0.00001


def read_glb(path):
    data = path.read_bytes()
    magic, version, size, json_size, chunk = struct.unpack_from('<4sIII4s', data)
    assert (magic, version, size, chunk) == (b'glTF', 2, len(data), b'JSON')
    doc = json.loads(data[20:20 + json_size])
    bin_size, name = struct.unpack_from('<I4s', data, 20 + json_size)
    binary = memoryview(data)[28 + json_size:]
    assert name == b'BIN\0' and len(binary) == bin_size
    assert doc['nodes'] == [{'name': 'Deposito', 'mesh': 0}]
    primitive = doc['meshes'][0]['primitives'][0]

    def unpack(index, fmt):
        accessor = doc['accessors'][index]
        view = doc['bufferViews'][accessor['bufferView']]
        start = view.get('byteOffset', 0) + accessor.get('byteOffset', 0)
        size = accessor['count'] * struct.calcsize(fmt)
        return list(struct.iter_unpack(fmt, binary[start:start + size]))

    points = unpack(primitive['attributes']['POSITION'], '<3f')
    indices = [i for (i,) in unpack(primitive['indices'], '<H')]
    return points, indices


def check_bounds(points, diameter, height):
    for axis, limits in enumerate([(-diameter / 2, diameter / 2), (0, height), (-diameter / 2, diameter / 2)]):
        values = [p[axis] for p in points]
        for actual, expected in zip([min(values), max(values)], limits):
            assert math.isclose(actual, expected, abs_tol=TOLERANCE_M), (axis, actual, expected)


def check_usdz(path, points, indices, full):
    with path.open('rb') as stream, zipfile.ZipFile(path) as archive:
        assert archive.namelist()[0].endswith('.usda')
        assert archive.testzip() is None
        for item in archive.infolist():
            stream.seek(item.header_offset + 26)
            name_len, extra_len = struct.unpack('<HH', stream.read(4))
            assert (item.header_offset + 30 + name_len + extra_len) % 64 == 0
            assert item.compress_type == zipfile.ZIP_STORED
    if full:
        from pxr import Usd, UsdGeom, UsdShade
        stage = Usd.Stage.Open(str(path))
        assert stage.GetDefaultPrim() and UsdGeom.GetStageUpAxis(stage) == 'Y'
        assert UsdGeom.GetStageMetersPerUnit(stage) == 1
        mesh, = [UsdGeom.Mesh(p) for p in stage.Traverse() if p.IsA(UsdGeom.Mesh)]
        assert UsdShade.MaterialBindingAPI(mesh).ComputeBoundMaterial()[0]
        assert list(mesh.GetFaceVertexIndicesAttr().Get()) == indices
        matrix = mesh.ComputeLocalToWorldTransform(Usd.TimeCode.Default())
        actual = [matrix.Transform(p) for p in mesh.GetPointsAttr().Get()]
        assert len(points) == len(actual)
        assert all(math.dist(a, b) < TOLERANCE_M for a, b in zip(points, actual))


def main(full):
    source = "import {verticalFlatBaseDimensions as rows} from './src/data/depositDimensions.ts'; console.log(JSON.stringify(rows));"
    rows = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', source], cwd=ROOT))
    assert len(rows) == 17
    expected = set()
    for row in rows:
        liters, diameter, height = (row[key] for key in ('liters', 'diameterMm', 'longitudinalMm'))
        stem = f'{liters}-{diameter}-{height}'
        glb, usdz = (MODELS / (stem + ext) for ext in ['.glb', '.usdz'])
        expected.update([glb, usdz])
        points, indices = read_glb(glb)
        check_bounds(points, diameter / 1000, height / 1000)
        assert len(indices) % 3 == 0 and max(indices) < len(points)
        check_usdz(usdz, points, indices, full)
    assert set(MODELS.iterdir()) == expected
    print('17 parejas GLB/USDZ verificadas.' + (' Mallas y transformaciones USD comprobadas con OpenUSD.' if full else ''))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--usd', action='store_true', help='Compara también los vértices e índices con OpenUSD (usd-core).')
    main(parser.parse_args().usd)
