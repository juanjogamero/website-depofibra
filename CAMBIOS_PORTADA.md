# Portada más general — Depofibra

Modificación del archivo `src/pages/index.astro` sobre la versión facilitada en `depofibra-web.zip`.

## Qué se ha cambiado
- Se ha mantenido **exactamente igual el hero** de inicio (titular, descripción, imagen, botones y estilo).
- Se sustituye el bloque centrado en depósitos de 5.000, 10.000 y 15.000 litros por un bloque de tipos: verticales, horizontales, enterrables y compactos.
- Se elimina la etiqueta interna «Primera prioridad» de la tarjeta pública de depósitos.
- La sección de logística ya no menciona solamente depósitos verticales de 5.000 a 15.000 L.
- La pregunta frecuente sobre las tres capacidades se sustituye por otra sobre tipos y capacidades en general.

## Lo que se conserva
- Estructura de la home, paleta, tipografía, hero, catálogo de familias y resto de secciones.
- Botones de presupuesto conectados al modal existente mediante `open-quote-trigger`.
- Las tres capacidades siguen siendo relevantes para sus fichas específicas y la estrategia SEO, pero dejan de dominar la portada.

## Validación y requisitos
- Se ha verificado que el bloque del hero es idéntico al original y que los textos específicos anteriores ya no aparecen.
- No se ha podido ejecutar la compilación completa en este entorno porque la versión de Node disponible es 22.16.0 y Astro 7.4.5 requiere Node >=22.23.4. Para validar el despliegue, instalar esa versión (o superior compatible) y ejecutar `npm ci && npm run build`.
- El ZIP incluye código fuente, configuración e imágenes. No contiene `node_modules` ni archivos temporales, que se restauran con `npm ci`.
