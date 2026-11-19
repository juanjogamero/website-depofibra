# Visor de depósitos verticales de base plana

La ruta `/ar/` permite comparar el volumen de las 17 configuraciones de Depofibra y solicitar presupuesto de la seleccionada. En un ordenador, el código QR abre esa misma selección en un móvil. El fragmento de la URL identifica la configuración. La página usa el layout y el formulario comerciales existentes y tiene `noindex`.

## Geometría y escala

La fuente es `verticalFlatBaseDimensions`, en `src/data/depositDimensions.ts`. La capacidad identifica el producto. El generador divide las dos cotas por 1.000 para trabajar en metros. La variante A de 5.000 L es la de menor diámetro.

Astro genera dos archivos estáticos por fila mediante `src/pages/models/ar/verticales/[file].js`. El código paramétrico está en `src/lib/ar/tank-glb.mjs`. Construye un cuerpo cilíndrico blanco con 64 segmentos, caras superior e inferior planas y un redondeo interior en los bordes. La base queda en Y = 0, centrada en X y Z. La malla carece de transformaciones de escala. El exportador USDZ de Three.js lee el GLB generado y escribe una escena métrica con anclaje horizontal.

Se usa la cota longitudinal de ficha como dimensión vertical provisional. Depofibra debe confirmar por referencia la altura exterior total y los accesorios con su proveedor. Los modelos omiten bocas, conexiones, anillas y holguras de montaje. La simulación permite valorar la ocupación aproximada.

## Navegadores y carga

La página importa la distribución local de `@google/model-viewer` cuando el visor se acerca a la pantalla. Descarga el GLB seleccionado (24.060 bytes) y un entorno de iluminación compartido (unos 32 KiB). El USDZ se solicita al abrir Quick Look. Los códigos QR se generan durante la compilación a partir de `Astro.site` y se descargan solo al desplegar su control.

- En un navegador con WebGL 2 se puede girar, acercar y restablecer la vista. El selector y las medidas siguen disponibles si falla el render.
- En Android compatible se intenta WebXR y, después, Scene Viewer. En iOS compatible, Quick Look recibe la URL del USDZ correspondiente. El botón de realidad aumentada depende de las capacidades detectadas y de la carga de la malla.
- Se solicita `ar-placement="floor"` y `ar-scale="fixed"`. Scene Viewer recibe `resizable=false` y Quick Look recibe `allowsContentScaling=0`. La percepción de escala depende también del seguimiento del dispositivo.
- El botón de presupuesto usa `.open-quote-trigger`, con el producto «Depósito» y una nota que identifica capacidad, variante y cotas.

## Reproducir las comprobaciones

Desde la raíz, con Node 24 y Python 3, ejecutar:

```sh
npm ci
DEPOFIBRA_SITE_URL=https://depofibra.com npm run build
npm run check:links
python3 scripts/check-ar-models.py
```

La prueba lee la tabla desde TypeScript y mide los vértices del GLB. También verifica la integridad, el almacenamiento sin compresión y la alineación de 64 bytes del USDZ. Para contrastar las dos mallas en coordenadas de mundo, instalar `usd-core` en un entorno Python de pruebas y ejecutar:

```sh
python3 scripts/check-ar-models.py --usd
```

Con `npm run preview`, abrir `/ar/`. Cambiar entre las dos variantes de 5.000 L, abrir el presupuesto y comprobar que la nota indica la variante actual. En la configuración de 60.000 L deben aparecer 3,00 m de diámetro y 9,00 m de cota. Para probar WebXR desde otro dispositivo, abrir el sitio por HTTPS.

## Validación física pendiente

Probar con un Android con ARCore y un iPhone con Quick Look. Marcar en suelo nivelado un diámetro documentado, colocar ambas variantes de 5.000 L y contrastar huella, apoyo y comportamiento del gesto de escala. Probar también el encuadre del modelo de 60.000 L desde una distancia suficiente. Registrar dispositivo, navegador y resultado. La validación de archivos y los enlaces nativos se pueden reproducir en escritorio. La colocación, el seguimiento y la escala percibida requieren esta comprobación física.
