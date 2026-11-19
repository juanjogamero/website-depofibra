# Visor 3D y realidad aumentada de depósitos verticales

Versión de referencia: 19/11/2026. Ruta pública de demostración /ar/, con noindex.

## Fuente dimensional y alcance

Se utilizan las 17 configuraciones en src/data/depositDimensions.ts (incluyendo dos geometrías para 5.000 L), sin modificar sus medidas. La unidad en GLB y USDZ es el metro, el suelo está en Y=0 y el frontal hacia +Z.

El dato longitudinalMm sigue siendo únicamente una cota de ficha, no altura exterior total validada con bocas/tapa. La geometría del cilindro conserva exactamente su diámetro; la tapa se mantiene por debajo del máximo de la cota longitudinal. Los dos racores sí sobresalen lateralmente de la envolvente circular principal, pero sus posiciones, tamaños y número se han estimado visualmente a partir de fotografías facilitadas por dirección. No deben utilizarse para decidir holguras de obra ni para comprometer accesorios incluidos.

## Mejoras 3D y tres acabados ilustrativos

- Geometría paramétrica en src/lib/ar/tank-glb.mjs, sin fotografías convertidas en texturas ni modelos de terceros.
- Hombro curvo, cuello y tapa superior de boca de hombre, dos bocas con bridas y hueco oscuro, franjas de unión discretas y una franja vertical con graduación numérica modelada en polígonos. El cuerpo principal utiliza 96 segmentos. Los números son ilustrativos y NO calibrados; el volumen real no guarda necesariamente relación lineal con la altura en un depósito con hombro.
- Acabados visuales: blanco, verde y gris. No indican disponibilidad comercial confirmada. La tapadera y los racores tienen materiales específicos y quedan visibles en todos los colores.
- Los números y la franja son mallas 3D, no HTML flotando; se verán también en la experiencia AR nativa.
- Se generan 17 x 3 x 2 = 102 archivos (51 GLB y 51 USDZ). El acabado blanco conserva la URL antigua id.glb/usdz; los colores adicionales usan id-verde y id-gris. No se cambia el color solo en JS: los visores nativos descargan las geometrías con materiales integrados.

La referencia visual son las tres fotos de depósitos facilitadas por dirección en conversación el 19/11/2026; el modelo es interpretación 3D y no reconstrucción exacta ni ficha certificada de fabricante.

## Integración y experiencia

- El selector de capacidad conserva variantes A/B; el selector accesible de acabados se encuentra en src/pages/ar/index.astro.
- src/components/ar/viewer.ts actualiza el modelo del visor, el USDZ para iPhone, el GLB que consume Android, el QR de escritorio y el fragmento compartible #id:verde / #id:gris. Los enlaces antiguos #id siguen mostrando blanco.
- El presupuesto reutiliza .open-quote-trigger y QuoteModal sin cambiar su envío. Se informa de que el acabado elegido es solo simulación.
- Interfaz responsive, cargada bajo demanda, con reintentos, accesibilidad y fallback sin AR.
- ar-scale=fixed; precisión de colocación dependiente del teléfono, la cámara y la superficie. No afirmar exactitud topográfica.

## Tests de lanzamiento

Desde la raíz con Node 24 y Python 3:

    npm ci
    DEPOFIBRA_SITE_URL=https://depofibra.com npm run build
    npm run check:links
    python3 scripts/check-ar-models.py

La prueba valida 51 GLB, 51 USDZ, sus cotas corporales en metros, accesorios dentro de una tolerancia, integridad del contenedor USDZ, materiales, acoplamiento al suelo y los tres acabados. Para comprobar también materiales USDZ usando OpenUSD, instalar usd-core en entorno de pruebas y ejecutar python3 scripts/check-ar-models.py --usd.

### Prueba manual pendiente o por repetir

1. Android Chrome/ARCore: elegir verde, girar el 3D, pulsar «Ver en mi espacio», comprobar que en Scene Viewer el depósito sigue siendo verde y que la franja, tapa y bocas aparecen; contrastar diámetro con una marca real de suelo.
2. iPhone Safari/Quick Look: repetir en gris, verificar material, boca superior y escala de la huella.
3. Comprobar 5.000 L A/B y 60.000 L; zoom, restablecer vista, QR que conserva selección y color, giro sin perder el medidor.
4. Comprobar el presupuesto contextual sin enviar datos falsos ni formularios de prueba.
5. Pedir al proveedor planos, acabado comercial y geometría de tapa, bocas y conexiones si se desea una versión técnicamente fiel.

El resultado de CI es una prueba de construcción y geometría, no una prueba de cámara física ni de disponibilidad de las configuraciones.
