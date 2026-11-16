# DEPOFIBRA v0.10.6 — Retirada del CRM experimental

## Instalacion (sin ejecutar comandos)

1. Extrae este ZIP sobre la carpeta raiz de `website-depofibra`.
2. Sobrescribe **solo** los dos archivos incluidos en `src/`.
3. Comprueba en GitHub Desktop y publica el commit:
   `DEPOFIBRA v0.10.6 | Retirada del CRM experimental y recuperación del formulario propio`
4. Verifica que la compilacion de GitHub Actions termina correctamente.

## Cambios

- Eliminados iframe, script y dependencia de `formulario.depofibra.com` del formulario comercial.
- Recuperado formulario nativo con nombre, localidad, telefono, email opcional,
  codigo postal opcional, tipo de producto y observaciones opcionales.
- Envio AJAX a FormSubmit sin dirigir al usuario a una pagina externa.
- Boton deshabilitado temporalmente durante el envio y mensajes claros de error.
- Landing `/solicitud-enviada/` solo muestra agradecimiento si el proveedor
  responde con JSON `success: true` o `success: "true"`.
- Conservados botones de contacto, diseño corporativo, cookie banner y eventos
  `quote_form_open` y `quote_form_submit_attempt` de GA4.
- Un evento de diagnostico `quote_form_provider_accepted` se empuja al dataLayer
  solo tras respuesta aceptada; el GTM ACTUAL NO tiene activador para dicho evento.

## Limitaciones honestas

- GitHub Pages es estatico. Sigue usandose FormSubmit como servicio de entrega
  de correo, **no el CRM experimental**. La politica de privacidad actual lo informa.
- El propietario debe comprobar que FormSubmit esta activado para la cuenta
  destinataria y realizar una prueba real de entrega; no se ha mandado ningun correo
  de prueba durante esta preparacion.
- Una respuesta positiva de FormSubmit NO demuestra que el correo llego ni que
  exista un cliente comercial. No marcar `generate_lead` ni ventas por pagina vista.
- `_captcha=false` permite no abandonar la web; existe honeypot y controles del
  proveedor, pero la proteccion anti-spam puede ser menor o provocar limitaciones.
  Si surgen bloqueos, sera necesario un backend/formulario propio y validaciones.
- Si un navegador bloquea FormSubmit, el cliente ve mensaje de error y conserva
  el contenido del formulario. No se declara exito sin respuesta positiva.
- No se ha probado el POST contra FormSubmit para no generar consultas falsas.

## Archivos cambiados
- `src/components/QuoteModal.astro`
- `src/pages/solicitud-enviada/index.astro`

Ningun fichero del CRM experimental se instala. No se tocan fichas, imagenes,
SEO, cookies, identidad corporativa ni las paginas legales.
