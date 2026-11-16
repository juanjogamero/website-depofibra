# DEPOFIBRA — Panel privado de cookies y estadísticas (propuesta para el VPS)

**Estado:** propuesta técnica. No desarrollada ni desplegada. No cambia DNS, formularios ni privacidad.

## Objetivo

Crear un panel interno en `https://cookies.depofibra.com/`, accesible solo a usuarios autorizados, para supervisar el estado de las preferencias de cookies y, cuando se habiliten herramientas de medición, consultar estadísticas **agregadas** de consentimientos y rechazos. No confundir estadísticas de cookies con visitas, contactos o presupuestos reales.

## Primera versión del panel (propuesta)

1. **Inicio de sesión seguro:** credenciales gestionadas en el servidor del VPS, contraseña con hash robusto, sesiones HTTPS protegidas (`HttpOnly`, `Secure`, `SameSite`), cierre de sesión, limitación de intentos y, preferiblemente, segundo factor.
2. **Resumen de consentimiento agregado:** número de elecciones aceptar/rechazar/personalizar por periodo, versión del aviso, sin identificar a visitantes. La recopilación necesita definirse e informarse antes de activarse.
3. **Inventario de servicios de medición:** servicios que estarán activos, categoría/finalidad, fecha de activación, base jurídica y estado de bloqueo por consentimiento.
4. **Historial de versiones del consentimiento:** qué texto, proveedores y finalidades existían para cada versión; registro auditable de cambios administrativos.
5. **Acceso restringido:** roles y medidas de protección; el panel no debe quedar público ni indexable. Certificado HTTPS propio para el subdominio.
6. **Seguridad operativa:** copias de seguridad, actualización de dependencias, revisión de permisos, caducidad y retención de logs. No guardar contraseñas en el repositorio público.

## Estado actual de depofibra.com (v0.10.1)

- No se han añadido scripts de analítica en el paquete de cookies.
- La elección se almacena localmente en `localStorage` con clave `depofibra-cookie-preferences`, versión `depofibra-cookies-v1-no-analytics`.
- Los eventos `depofibra:consent` se emiten solo en el navegador y NO se envían al VPS.
- No existe base de datos de consentimientos ni métricas centralizadas. El panel futuro **no puede recuperar decisiones pasadas** que solo existan en el navegador.

## Fase de integración, antes de recoger datos

- Determinar con la persona responsable qué se quiere medir: consentimiento por categoría, sesiones/visitas agregadas, clics de llamada/WhatsApp y formularios confirmados. Definir cada sistema por separado.
- Revisar la información facilitada al visitante y la base jurídica/consentimiento cuando proceda.
- Al conectar GA4/GTM/Clarity o estadísticas propias, actualizar la versión del consentimiento y solicitarlo nuevamente. Los scripts no esenciales deben permanecer bloqueados hasta que exista consentimiento válido.
- Diseñar y proteger un endpoint HTTPS para recoger exclusivamente los datos justificados, teniendo en cuenta minimización, política de retención, acceso y seguridad. Evitar almacenar IP, huella digital o identificadores persistentes salvo necesidad documentada.
- Definir si las estadísticas de cookies permanecen separadas del CRM comercial para no vincular navegación y datos de clientes sin justificación.
- Configurar un registro DNS para `cookies.depofibra.com` únicamente cuando el servicio del VPS esté listo. No reutilizar `admin.depofibra.com` ni alterar el correo.

**Nota:** un simple panel con acceso privado no convierte automáticamente el sistema en conforme con normativa. Habrá que documentar adecuadamente proveedores, conservación y tratamiento de datos antes de activar las mediciones.
