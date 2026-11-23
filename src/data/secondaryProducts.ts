/**
 * Fichas informativas de fosas y cubas: datos comerciales tomados de las
 * categorías actuales de Depofibra. No son fichas técnicas confirmadas.
 * Cada ficha muestra un esquema orientativo propio, disponible en el catálogo.
 * La imagen social rasterizada puede seguir siendo genérica por familia.
 */
export interface SecondaryProduct {
  slug: string;
  family: 'fosas' | 'cubas';
  title: string;
  eyebrow: string;
  summary: string;
  details: string;
  image: string;
  imageAlt: string;
  selectionNotes?: string[];
  quoteProduct: string;
  titleSeo: string;
  metaDescription: string;
}

export const secondaryProducts: SecondaryProduct[] = [
  {
    slug: 'fosa-estanca', family: 'fosas', title: 'Fosa séptica estanca',
    titleSeo: 'Fosa séptica estanca de poliéster | Depofibra',
    metaDescription: 'Fosa séptica estanca para almacenar aguas residuales: características generales, vaciado periódico y datos necesarios para solicitar presupuesto.',
    eyebrow: 'ALMACENAMIENTO SIN VERTIDO',
    summary: 'Almacenamiento de aguas residuales sin salida de vertido; requiere vaciado periódico.',
    details: 'Una fosa estanca almacena las aguas residuales para su retirada posterior. Debe estudiarse la capacidad, la frecuencia de vaciado, los accesos para mantenimiento y la documentación de la referencia.',
    selectionNotes: [
      'Uso, ocupación prevista y volumen de acumulación que indique el proyecto.',
      'Gestión y frecuencia prevista de vaciado; acceso para los trabajos de mantenimiento.',
      'Modelo de la fosa y documentación técnica exigible para esa referencia.',
      'Código postal de entrega, cotas de acceso y medios de descarga disponibles.'
    ],
    image: '/images/fosas-septicas/estanca.svg',
    imageAlt: 'Esquema ilustrativo de fosa estanca para almacenar aguas residuales sin vertido; no es una ficha técnica',
    quoteProduct: 'Fosa séptica',
  },
  {
    slug: 'fosa-biologica', family: 'fosas', title: 'Fosa séptica con filtro biológico',
    titleSeo: 'Fosa séptica con filtro biológico de poliéster | Depofibra',
    metaDescription: 'Fosa séptica con filtro biológico PRFV: compara uso, habitantes equivalentes, documentación exigible y transporte antes de solicitar presupuesto.',
    eyebrow: 'TRATAMIENTO BIOLÓGICO',
    summary: 'Sistema que incorpora tratamiento biológico. La selección depende del proyecto y del vertido.',
    details: 'El filtro biológico incorpora una etapa de tratamiento distinta del simple almacenamiento. Es necesario conocer los habitantes equivalentes, caudal previsto y condiciones de vertido.',
    selectionNotes: [
      'Habitantes equivalentes, caudal de diseño y uso estacional o permanente de la instalación.',
      'Destino del efluente y exigencias de vertido indicadas por proyecto y administración.',
      'Ficha del modelo, marcado CE y declaración de prestaciones cuando sean exigibles.',
      'Accesos, emplazamiento, mantenimiento, código postal y descarga prevista.'
    ],
    image: '/images/fosas-septicas/filtro-biologico.svg',
    imageAlt: 'Esquema ilustrativo de fosa con filtro biológico; la configuración real depende del fabricante',
    quoteProduct: 'Fosa séptica',
  },
  {
    slug: 'oxidacion-total', family: 'fosas', title: 'Depuradora de oxidación total',
    titleSeo: 'Depuradora de oxidación total de poliéster | Depofibra',
    metaDescription: 'Depuradora de oxidación total: tratamiento mediante aireación, mantenimiento y datos de instalación que conviene revisar antes de solicitar presupuesto.',
    eyebrow: 'DEPURACIÓN CON AIREACIÓN',
    summary: 'Tratamiento biológico mediante aireación, con necesidades de electricidad y mantenimiento.',
    details: 'La oxidación total necesita equipos de aireación y mantenimiento según fabricante. El dimensionamiento y las condiciones de vertido dependen del uso y de la normativa aplicable al proyecto.',
    selectionNotes: [
      'Habitantes equivalentes y caudal estimados en proyecto, con variación estacional.',
      'Necesidades de aireación, energía, mantenimiento y rendimiento a justificar por la referencia.',
      'Destino del vertido, requisitos administrativos y documentación exigible del equipo.',
      'Emplazamiento, acceso de transporte, código postal y medios de descarga.'
    ],
    image: '/images/fosas-septicas/oxidacion-total.svg',
    imageAlt: 'Esquema ilustrativo de depuradora por oxidación total; no representa un equipo certificado concreto',
    quoteProduct: 'Fosa séptica',
  },
  {
    slug: 'cuba-remolque', family: 'cubas', title: 'Cuba o cisterna de poliéster para remolque agrícola',
    titleSeo: 'Cisternas de poliéster para remolques agrícolas | Depofibra',
    metaDescription: 'Cuba o cisterna de poliéster para remolque agrícola. Estudia el depósito PRFV sin vehículo: capacidad, medidas, apoyos y transporte según destino.',
    eyebrow: 'APLICACIÓN AGRÍCOLA',
    summary: 'Si ya tienes un remolque agrícola y buscas solo una cuba de poliéster, podemos estudiar el recipiente de PRFV por separado, según vehículo y fabricante.',
    details: 'Para sustituir una cuba existente o equipar un remolque, indica la longitud y la anchura útiles, la carga admisible, el líquido, los apoyos y los anclajes previstos. La compatibilidad, el montaje y los requisitos de circulación debe confirmarlos el profesional responsable. No se incluye el remolque completo por defecto.',
    selectionNotes: [
      'Capacidad aproximada y líquido que llevará la cuba.',
      'Medidas útiles, carga admisible y modelo del remolque existente o previsto, si se conocen.',
      'Tipo de apoyo, anclajes y conexiones a estudiar con el fabricante.',
      'Localidad y código postal de entrega, accesos y medios para descargar.'
    ],
    image: '/images/cubas/cuba-remolque.svg',
    imageAlt: 'Esquema orientativo de cuba de poliéster para montaje en remolque agrícola; remolque no incluido',
    quoteProduct: 'Cuba o cisterna',
  },
  {
    slug: 'cisterna-camion', family: 'cubas', title: 'Cisterna para plataforma',
    titleSeo: 'Cisterna de poliéster para plataforma o camión | Depofibra',
    metaDescription: 'Cisternas de poliéster para plataforma o camión. Consulta compatibilidad, medidas, soportes y condiciones de suministro según tu vehículo.',
    eyebrow: 'PLATAFORMA / CAMIÓN',
    summary: 'Formato para montaje sobre plataforma o caja de vehículo según proyecto.',
    details: 'Debe comprobarse la compatibilidad con el vehículo o plataforma, la distribución de cargas, las sujeciones, los apoyos y las condiciones de circulación aplicables.',
    selectionNotes: [
      'Vehículo o plataforma previstos y espacio útil disponible.',
      'Capacidad, líquido y frecuencia de desplazamientos.',
      'Requisitos de sujeción, reparto de cargas y montaje que revisará el profesional responsable.',
      'Accesorios y conexiones necesarios, destino y descarga.'
    ],
    image: '/images/cubas/cisterna-camion.svg',
    imageAlt: 'Esquema orientativo de cisterna de poliéster sobre plataforma; vehículo no incluido',
    quoteProduct: 'Cuba o cisterna',
  },
  {
    slug: 'cuba-especial', family: 'cubas', title: 'Cuba de configuración especial',
    titleSeo: 'Cubas de poliéster con configuración especial | Depofibra',
    metaDescription: 'Cubas de poliéster con accesorios o configuración especial a consultar. Indica uso, capacidad y soporte para estudiar un presupuesto adaptado.',
    eyebrow: 'CONFIGURACIÓN A CONSULTAR',
    summary: 'Configuraciones y accesorios a estudiar según capacidad, uso y soporte.',
    details: 'Los accesorios y detalles como conexiones, escaleras o barandillas dependen de la configuración que confirme el proveedor. No se consideran incluidos por defecto.',
    selectionNotes: [
      'Uso previsto, líquido y capacidad aproximada.',
      'Conexiones, bocas de acceso y accesorios que se solicitan expresamente.',
      'Necesidades de soporte, acceso o manipulación particulares.',
      'Destino de entrega y medios disponibles para descargar.'
    ],
    image: '/images/cubas/cuba-configurable.svg',
    imageAlt: 'Esquema ilustrativo de cuba de poliéster configurable; accesorios y medidas por confirmar',
    quoteProduct: 'Cuba o cisterna',
  },
];

// Evita volver a asignar una portada idéntica a fichas distintas.
const images = secondaryProducts.map(item => item.image);
if (new Set(images).size !== images.length) {
  throw new Error('Las fichas de fosas y cubas deben usar ilustraciones de portada diferentes.');
}
