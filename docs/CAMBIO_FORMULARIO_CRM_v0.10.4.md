# DEPOFIBRA · v0.10.4 · Formulario CRM incrustado

## Contenido de este ZIP

- `src/components/QuoteModal.astro`: reemplaza exclusivamente el formulario antiguo de FormSubmit por el iframe oficial del CRM facilitado. Conserva los botones «Pedir presupuesto», el modal, la llamada directa y los estilos de marca. El código del iframe y la URL del script son los suministrados por el propietario.
- `public/prueba-formulario.html`: página mínima para probar directamente en `https://depofibra.com/prueba-formulario.html`. Contiene las metas robots y googlebot `noindex, nofollow, noarchive, nosnippet`. No enlazarla desde menús ni sitemap.

## Instalación

Descomprimir en la RAÍZ de `website-depofibra/`, fusionar `src/` y `public/`, sobrescribir únicamente `src/components/QuoteModal.astro`. La nueva página pública de prueba se añadirá en `public/`.

## Condiciones técnicas importantes

- La web está alojada en GitHub Pages (sitio estático). La gestión del envío y las notificaciones pasa a `formulario.depofibra.com`; configurar el destinatario y validar con una prueba real en dicho CRM.
- El iframe se carga desde un subdominio de origen diferente; no es posible comprobar ni capturar el envío desde JavaScript de `depofibra.com` sin un protocolo `postMessage` o una integración del CRM documentados. El evento de GA4 `quote_form_open` se conserva en los botones existentes. El evento `quote_form_submit_attempt` del formulario antiguo dejará de generarse; no marcar `generate_lead` sin confirmación real.
- Los datos de cliente no se transfieren a GA4 desde el código de esta actualización. Las preferencias de analítica siguen gestionadas por el aviso de cookies ya desplegado.
- La referencia de producto indicada en los botones se muestra como texto de ayuda antes del iframe, pero NO se precompleta automáticamente dentro del CRM porque no se ha confirmado una API para ello.
- El CRM puede fijar cookies, establecer conexiones o recopilar otros datos dentro del iframe; se debe auditar su privacidad antes de usarlo en producción. Esta actualización no verifica cumplimiento normativo por sí sola.
- La página de prueba no garantiza invisibilidad absoluta: las etiquetas `noindex` evitan la indexación por buscadores que las respetan, pero la URL sigue siendo pública. Para bloquearla de verdad, usar autenticación o eliminarla tras la prueba.
- GitHub Pages no interpreta `.htaccess` ni permite fijar por archivo cabeceras `X-Robots-Tag`. No se incluye `.htaccess` por ese motivo.
- No se cambian otros componentes, el layout, las páginas legales, el favicon, las rutas o el SEO comercial.

## Pruebas posteriores a desplegar

1. Abre `/prueba-formulario.html`: debe verse el iframe embebido y ajustarse en móvil.
2. Abre un botón «Pedir presupuesto» desde una ficha de producto: modal y enlace de teléfono visibles; el iframe debe poder rellenarse y cerrarse.
3. Envía un presupuesto de prueba con datos autorizados y verifica su llegada al CRM/correo, la notificación, la página de gracias y su registro comercial.
4. Comprueba la carga del iframe con y sin aceptar analítica; el iframe es un recurso funcional independiente de GTM.
5. Revisa DebugView de GA4: apertura del formulario (`quote_form_open`) se mantiene. No interpretes como conversión un clic ni un intento.

## Commit sugerido

**Summary:** `DEPOFIBRA v0.10.4 | Integración del formulario del CRM en la web`

**Description:**

- Sustituido el formulario antiguo de FormSubmit por el iframe oficial del CRM.
- Integración responsive en el modal existente, preservando el acceso telefónico.
- Incorporada página HTML de prueba, con `noindex` y `nofollow`.
- Conservados eventos de apertura sin introducir conversiones no verificadas.
- Sin modificaciones en fichas, páginas legales o identidad visual.
- Pendientes: validar recepción en CRM, privacidad del iframe y medición de solicitudes confirmadas mediante integración segura.

## Cabeceras antiindexación si la prueba se instala en hosting propio

Estos ajustes **no funcionan en GitHub Pages**, que no procesa `.htaccess` ni permite configurar estas cabeceras HTTP desde un repositorio.

**Apache** (en el `.htaccess` de la carpeta de prueba; requiere `mod_headers`):

```apache
<IfModule mod_headers.c>
    Header always set X-Robots-Tag "noindex, nofollow"
</IfModule>
```

**nginx** (dentro del bloque `server` apropiado, restringiendo por URL):

```nginx
location = /prueba-formulario.html {
    add_header X-Robots-Tag "noindex, nofollow" always;
    try_files $uri =404;
}
```

La cabecera impide indexar para rastreadores que la respetan, pero no sustituye protección por autenticación si se trata de una prueba confidencial.
