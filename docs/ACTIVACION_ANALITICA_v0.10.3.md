# DEPOFIBRA · Registro de cambio v0.10.3

**Fecha:** 16 de noviembre de 2026  
**Área:** Cookies, transparencia y medición web  
**Rama prevista:** `main`  
**Dominio de producción:** `https://depofibra.com`

## Archivos

- `src/pages/politica-de-cookies/index.astro`: actualización exclusivamente textual de la información sobre Google Analytics 4, Google Tag Manager, almacenamiento de preferencias y cookies analíticas. Se conserva el componente visual `LegalPage` y no se introduce ninguna dirección ni dato personal adicional del titular.

## Configuración de medición existente

- Contenedor Tag Manager: `GTM-KQQZDF6P`.
- Flujo GA4: `G-5SF28BMKZ1`.
- Etiqueta «GA4 | Configuración | Depofibra» y etiqueta «GA4 | Eventos comerciales | Depofibra» preparadas y verificadas mediante vista previa.
- Eventos: `contact_phone`, `contact_whatsapp`, `quote_form_open`, `quote_form_submit_attempt`.
- La analítica se carga solo después de la aceptación desde el aviso v0.10.2. La prueba de rechazo se ha dado por realizada por el propietario.
- Los eventos personalizados no transportan los valores de los campos de formularios. La funcionalidad de datos proporcionados por usuarios de Google está desactivada.

## Pasos posteriores al commit y despliegue

1. Esperar a que el workflow de GitHub Pages concluya correctamente.
2. Abrir `https://depofibra.com/politica-de-cookies/` y comprobar el texto de producción.
3. Publicar la versión pendiente de Google Tag Manager SOLO después de esa comprobación.
4. Validar en Google Analytics 4 > Tiempo real una nueva visita consentida y un evento de contacto.
5. Revisar periódicamente las cookies reales del navegador y la conservación de datos de GA4; el inventario de esta página describe las integraciones conocidas y no reemplaza una auditoría técnica exhaustiva.

## Alcance excluido

- Sin cambios en las demás páginas legales, identidad visual, página principal, fichas, formularios, imágenes, favicon, SEO o archivos de configuración.
- Sin conexión todavía con `cookies.depofibra.com` ni registro centralizado de consentimientos.
- Sin publicar ni habilitar Google Ads, remarketing o datos proporcionados por usuarios.

## Commit propuesto

**Resumen**: `DEPOFIBRA v0.10.3 | Actualización de la política de cookies para GA4`

**Descripción**: Actualización informativa de las cookies analíticas y del uso de Google Tag Manager tras consentimiento. Se mantienen el diseño de la web y los datos del titular sin cambios. Documentados los controles de medición y los pasos de activación de producción.
