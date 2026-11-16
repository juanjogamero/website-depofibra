# Depofibra v0.10.2 — Integración GA4 y GTM

## Identificadores verificados
- GA4: G-5SF28BMKZ1 (flujo Depofibra, https://depofibra.com).
- Google Tag Manager: GTM-KQQZDF6P.
- GTM: etiqueta GA4 | Configuración | Depofibra, guardada como borrador; pendiente de publicación y prueba.

## Privacidad — carga básica, no Consent Mode avanzado
- No se incluye gtag.js ni gtm.js en HTML inicial ni iframe noscript.
- El componente de cookies carga gtm.js solo al aceptar analítica.
- Sin decisión o rechazando: no se cargan etiquetas de terceros de medición.
- Se cambia la versión del consentimiento para volver a preguntar.
- Si se revoca una autorización, se recarga la página para eliminar scripts.
- Preferencias guardadas solo en navegador; no hay panel del VPS todavía.

## Eventos comerciales preparados en dataLayer
- contact_phone: clic en enlace tel:.
- contact_whatsapp: clic en enlace a wa.me o whatsapp.com.
- quote_form_open: clic en disparadores existentes del modal.
- quote_form_submit_attempt: envío válido iniciado (NO verificado por FormSubmit).

Para enviar estos cuatro eventos a GA4, crear en GTM un activador Evento personalizado con regex `^(contact_phone|contact_whatsapp|quote_form_open|quote_form_submit_attempt)$` y una etiqueta Google Analytics: evento que utilice ID G-5SF28BMKZ1, nombre de evento `{{Event}}` y dicho activador. En GA4 no marcarlos como eventos clave de clientes potenciales hasta disponer de confirmación fiable del formulario.

## Comprobaciones necesarias
1. Actualizar la información de cookies/privacidad para reflejar Google Analytics. No se modifica en el ZIP por decisión del propietario de preservar las páginas legales.
2. Subir solo el componente y CHANGELOG, compilar y desplegar.
3. Probar en incógnito sin aceptar: red no debe cargar `googletagmanager.com/gtm.js` ni GA4.
4. Aceptar y confirmar en Tag Assistant y GA4 Tiempo real.
5. Rechazar y verificar que no se descargan scripts. Volver a abrir desde footer.
6. Publicar la versión del contenedor en GTM solo cuando se hayan verificado etiquetas y consentimiento.

## Datos y limitaciones
Nunca enviar nombre, teléfono, email, CP, texto de consultas, URL con parámetros personales ni valores de formulario a Google Analytics. Los eventos anteriores no transmiten campos personalizados. Los clics en WhatsApp y teléfono no garantizan que el contacto se haya completado.
