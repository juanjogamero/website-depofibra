# Integración del CRM y página de confirmación — v0.10.5

- **Web:** `https://depofibra.com`, GitHub Pages + Astro.
- **Formulario:** `https://formulario.depofibra.com/f/ORHV1h16Sme9Jxz_oj2ovqgvbVVJjFNexIHLA4qqR4I`.
- **Landing:** `https://depofibra.com/solicitud-enviada/`, noindex.
- **Retirada:** `public/prueba-formulario.html` debe desaparecer del repositorio y del deploy (404).

## Protocolo propuesto y pendiente de implementar en el CRM

El CRM guarda primero la solicitud, confirma su éxito y entonces envía a la web principal:

```js
window.parent.postMessage(
  { type: 'depofibra:crm:solicitud-registrada' },
  'https://depofibra.com'
);
```

El modal solo admite la señal si `event.origin` coincide con `https://formulario.depofibra.com` y `event.source` corresponde al iframe específico de Depofibra.

El script disponible `insertar.js` solo transmite la altura del iframe en mensajes **numéricos**, no el éxito de una solicitud. Por ello **el envío al formulario no provoca todavía una redirección automática** con la versión del CRM inspeccionada.

## Validación al activar el protocolo

1. Probar envío real autorizado y comprobar que el CRM almacena la solicitud, con identificación interna. No usar datos personales de clientes para pruebas.
2. Verificar que el CRM solo envía el mensaje después de registrar la solicitud.
3. Verificar que la navegación va a `/solicitud-enviada/` en la ventana principal, no dentro del iframe.
4. Probar error de validación, fallo de red y cierre del modal: en ninguno debe navegar a la landing.
5. No marcar una visita directa a la landing como conversión confirmada. Para GA4, conectar posteriormente evento respaldado por estado real del CRM y sin PII.

No se modifica ni se promete acceso a los ficheros o configuraciones del VPS desde este ZIP.
