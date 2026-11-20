# Sistema de opiniones de clientes con acceso Google

Estado: **PREPARADO EN CÓDIGO / NO ACTIVADO NI PUBLICADO** hasta completar Firebase, privacidad y pruebas.
No equivale a reseñas verificadas de Google Maps ni a compras verificadas.

## Arquitectura
- Web estática Astro en GitHub Pages, ruta `/opinar/`.
- Firebase Authentication: solo proveedor **Google**. Autorización de dominio `depofibra.com`.
- Cloud Firestore: colección `customerReviews`, documento con ID = Firebase Auth UID; máximo una opinión por cuenta.
- El cliente selecciona de 1 a 5 estrellas, texto entre 20 y 1000 caracteres y consentimiento explícito.
- Cada envío guarda estado `pending`, con sello horario del servidor. El cliente no puede aprobar, editar ni borrar desde la web.
- El administrador revisa en **Firebase Console → Firestore → customerReviews**, comprueba autenticidad, consentimiento y privacidad; cambia `status` a `approved` únicamente desde la consola con privilegios de administración. Las reseñas no se publican automáticamente.
- La Home conserva el carrusel existente; integrar reseñas aprobadas dinámicas en una fase posterior, cuando se haya validado el flujo. Este PR no cambia las tres opiniones ya publicadas en la Home.

## Configuración necesaria por la dirección (no facilitar contraseñas ni claves privadas al asistente)
1. Crear o seleccionar proyecto en https://console.firebase.google.com/ en una cuenta empresarial controlada por Depofibra. Revisar antes el plan, cuotas y posible facturación.
2. Registrar una aplicación **Web** y copiar únicamente los datos **públicos** del objeto de configuración: `apiKey`, `authDomain`, `projectId`, `appId`. Ponerlos en `public/reviews/firebase-config.json`. Nunca guardar service account JSON ni claves privadas en GitHub.
3. En Authentication → Sign-in method habilitar **Google** y establecer correo de soporte. En Authorized domains añadir `depofibra.com` (y el subdominio real si se usará).
4. Crear base de datos Cloud Firestore en región UE apropiada tras evaluar ubicación, RGPD y costes.
5. Publicar las reglas de `firebase/reviews.firestore.rules` desde Firebase Console → Firestore → Rules. **No usar reglas de prueba abiertas.** Si hay otros documentos en la misma base de datos, adaptar y revisar antes de reemplazar reglas globales.
6. Completar política de privacidad con responsable real, Firebase/Google como proveedores, datos de cuenta utilizados, finalidad, base jurídica, conservación, derechos y transferencias. Definir procedimiento para solicitudes de supresión/corrección.
7. Probar en entorno de previsualización con cuenta Google real: inicio de sesión, selección de estrellas, comentario válido e inválido, consentimiento, envío, segundo envío rechazado y lectura limitada por reglas. Revisar en la consola `status: pending`.
8. Moderar una valoración de prueba a `approved` y verificar lectura autorizada. No publicar testimonios de prueba en producción; borrar los datos de prueba con acceso de administrador. Después, habilitar enlace desde Home.
9. Revisar seguridad/abuso y, si el volumen lo justifica, configurar App Check, monitorización, alertas de costes y herramienta de moderación. Una cuenta Google no equivale a cliente con compra verificada.
10. La página no envía correos. Si se desea notificación automática o panel de administración, se necesita una función backend adicional.

## Contrato Firestore
`customerReviews/{firebaseAuthUid}`:
```json
{
  "uid": "<Firebase Auth UID>",
  "author": "<nombre visible de Google>",
  "rating": 5,
  "text": "<comentario del cliente>",
  "status": "pending",
  "consentConfirmed": true,
  "createdAt": "<timestamp del servidor>"
}
```

## Estado de visualización
La ruta `/opinar/` muestra un aviso de **no disponible** mientras faltan parámetros; no se presenta un inicio de sesión falso. Las tres opiniones facilitadas previamente por dirección siguen siendo estáticas en la Home. La integración del carrusel con Firestore queda expresamente pendiente.

Fuentes: documentación oficial Firebase Authentication Google y reglas de Firestore. Versión de importación web Firebase SDK 13.4.0 (16/11/2026).
