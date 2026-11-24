/**
 * GitHub Pages sirve los archivos HTML antiguos mejor si existen como ficheros
 * /cisternas.html y no como carpetas /cisternas.html/index.html.
 *
 * Normalizamos rutas legadas con señales GSC o resultados antiguos públicos; no cambia
 * el destino, el contenido del redirect ni las páginas nuevas. No toca legal.
 * Este paso corre después de "astro build" en PR CI y deploy.
 */
import { existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist');
const oldToNew = new Map([
  // GSC 21/08–21/11: rutas antiguas todavía presentes en resultados.
  // Conservamos el destino publicado y quitamos el salto /archivo.html/.
  ['productos.html', '/'],
  ['depositos-horizontales.html', '/depositos/'],
  ['fosas.html', '/fosas-septicas/'],
  ['blog/blog.html', '/blog/'],
  ['blog/poliester-vs-hormigon.html', '/blog/que-es-prfv-depositos-fibra-vidrio/'],
  ['blog/poliester-vs-plastico-pehd.html', '/blog/poliester-vs-plastico-pehd/'],
  // Resultados públicos de Google conservan fragmentos de la web antigua
  // sobre fabricación/logística: simplificar el acceso a destinos veraces.
  ['depositos-piscinas-alicante.html', '/'],
  ['depositos-poliester-jaen.html', '/depositos/'],
  ['piscinas.html', '/piscinas/'],
  ['sobre-nosotros.html', '/sobre-depofibra/'],
  ['cisternas.html', '/cubas-cisternas/'],
  ['depositos-agua-murcia.html', '/depositos/murcia/'],
  ['depositos-poliester-valencia.html', '/depositos/valencia/'],
  ['fosas-septicas-sevilla.html', '/fosas-septicas/sevilla/'],
  // URLs legadas con señales de búsqueda en GSC; publicar sin salto extra /xxx.html/.
  ['blog/normativa-fosas-septicas-2026.html', '/blog/normativa-fosas-septicas-2026-permisos-documentacion/'],
  ['blog/mantenimiento-piscina-poliester.html', '/blog/mantenimiento-piscina-poliester/'],
  ['blog/guia-tecnica-prfv.html', '/blog/que-es-prfv-depositos-fibra-vidrio/'],
  ['piscinas-poliester-badajoz.html', '/piscinas/'],
]);

for (const [oldPath, destination] of oldToNew) {
  const folder = path.join(output, oldPath);
  const generated = path.join(folder, 'index.html');

  if (!existsSync(generated) || !statSync(generated).isFile()) {
    throw new Error(`No existe el redirect Astro esperado: ${oldPath}/index.html`);
  }
  const members = readdirSync(folder);
  if (members.length !== 1 || members[0] !== 'index.html') {
    throw new Error(`La carpeta ${oldPath} contiene otros archivos: no se transforma`);
  }

  const html = readFileSync(generated, 'utf8');
  const canonical = `https://depofibra.com${destination}`;
  if (!html.includes(`url=${destination}`) || !html.includes(canonical) ||
      !/http-equiv=["']refresh["']/i.test(html)) {
    throw new Error(`Redirect/canonical inesperado para ${oldPath}`);
  }

  rmSync(folder, { recursive: true, force: false });
  writeFileSync(folder, html, 'utf8');
  if (!statSync(folder).isFile()) throw new Error(`No se pudo publicar ${oldPath} como archivo`);
  console.log(`Legacy directo: /${oldPath} -> ${destination} (meta refresh)`);
}
