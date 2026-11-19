// A small linear HDR studio panorama. Used only for reflections and lighting in 3D.
export function GET() {
  const width = 128, height = 64;
  const pixels = Buffer.alloc(width * height * 4);
  function softbox(direction, elevation, azimuth, spread) {
    const dot = direction[0] * Math.cos(elevation) * Math.cos(azimuth)
      + direction[1] * Math.sin(elevation)
      + direction[2] * Math.cos(elevation) * Math.sin(azimuth);
    return Math.exp((dot - 1) * spread);
  }
  for (let y = 0; y < height; y++) {
    const latitude = (0.5 - (y + 0.5) / height) * Math.PI;
    for (let x = 0; x < width; x++) {
      const longitude = ((x + 0.5) / width - 0.5) * 2 * Math.PI;
      const direction = [Math.cos(latitude) * Math.cos(longitude), Math.sin(latitude), Math.cos(latitude) * Math.sin(longitude)];
      const key = 6.5 * softbox(direction, 0.72, 2.8, 5);
      const fill = 1.9 * softbox(direction, 0.35, -1.5, 8);
      const ambient = 0.19 + 0.17 * Math.max(0, direction[1]);
      const rgb = [ambient + key + fill * 0.90, ambient + key * 0.98 + fill, ambient + key * 0.94 + fill * 1.10];
      const exponent = Math.floor(Math.log2(Math.max(...rgb))) + 1;
      const offset = (y * width + x) * 4;
      rgb.forEach((value, channel) => { pixels[offset + channel] = value * 256 / 2 ** exponent; });
      pixels[offset + 3] = exponent + 128;
    }
  }
  const header = Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${height} +X ${width}\n`);
  return new Response(Buffer.concat([header, pixels]), { headers: { 'Content-Type': 'image/vnd.radiance' } });
}
