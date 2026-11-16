# DEPOFIBRA v0.10.7 — Presentación de correos de presupuesto

## Qué cambia
- Se sustituye la plantilla de notificación de FormSubmit `table` por `box`.
- Se conservan el asunto dinámico por producto, los campos, el orden de datos, el envío AJAX y la redirección a la landing.
- No cambia el formulario que ve el cliente, el destinatario ni las configuraciones de analítica.

## Instalación
1. Descomprimir el ZIP en la raíz de `website-depofibra`.
2. Sobrescribir `src/components/QuoteModal.astro`.
3. Añadir opcionalmente este documento a `docs/`.
4. Hacer commit y Push origin; esperar a que GitHub Actions termine correctamente.
5. Realizar un envío de prueba y comprobar el nuevo aspecto del correo.

## Limitación de FormSubmit
FormSubmit admite las plantillas prediseñadas `basic`, `table` y `box`.
No admite inyectar HTML/CSS personalizado de la marca en sus notificaciones.
Para un correo verdaderamente corporativo (colores, logotipo, encabezado, secciones),
hay que usar en el futuro un servicio de correo transaccional desde un backend seguro.

## Commit sugerido
DEPOFIBRA v0.10.7 | Mejora visual de correos de presupuesto

Documentación oficial:
https://formsubmit.co/email-templates
https://formsubmit.co/documentation
