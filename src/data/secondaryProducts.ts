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
  faqs?: { question: string; answer: string }[];
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
    faqs: [
      { question: "¿Una fosa estanca depura el agua residual?", answer: "No. Su función es almacenar aguas residuales sin vertido hasta su retirada. La capacidad, el mantenimiento y la frecuencia de vaciado se estudian según el uso y las condiciones de la instalación." },
      { question: "¿Qué datos hacen falta para elegir una fosa estanca?", answer: "Uso, ocupación prevista, volumen que indique el proyecto, acceso para mantenimiento y frecuencia de vaciado estimada; además, código postal y condiciones de descarga para estudiar el transporte." },
      { question: "¿Incluye excavación o descarga?", answer: "No se consideran incluidas por defecto. El transporte estándar no incluye descarga y cualquier trabajo de excavación o instalación necesitaría confirmación aparte." },
    ],
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
    faqs: [
      { question: "¿Es lo mismo una fosa con filtro biológico que una fosa estanca?", answer: "No. La estanca almacena el agua residual sin salida de vertido; una unidad con filtro biológico incorpora una etapa de tratamiento. La elección depende del proyecto, las condiciones del vertido y la referencia concreta." },
      { question: "¿Basta el número de personas para elegir el tamaño?", answer: "No. Los habitantes equivalentes orientan el dimensionamiento, pero también deben revisarse caudal, uso estacional y documentación técnica del equipo." },
      { question: "¿Todas las fosas con filtro biológico tienen marcado CE?", answer: "No debe afirmarse de forma genérica. Hay que comprobar el modelo, las normas aplicables y la declaración de prestaciones y marcado CE cuando sean exigibles." },
    ],
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
    faqs: [
      { question: "¿Una depuradora de oxidación total necesita electricidad?", answer: "El tratamiento mediante aireación suele requerir alimentación eléctrica. Los equipos incluidos, el consumo y el mantenimiento se confirman en la ficha de cada referencia." },
      { question: "¿Puedo escogerla solo por el número de habitantes?", answer: "No. También deben valorarse caudal y carga de entrada, uso previsto, mantenimiento y requisitos de vertido del proyecto." },
      { question: "¿La compra del equipo autoriza el vertido?", answer: "No. La documentación del equipo no sustituye los permisos, el proyecto ni los controles que correspondan según la instalación y la administración competente." },
    ],
    quoteProduct: 'Fosa séptica',
  },
  {
    slug: 'cuba-remolque', family: 'cubas', title: 'Cuba o cisterna de poliéster para remolque agrícola',
    titleSeo: 'Cisternas de poliéster para remolques agrícolas | Depofibra',
    metaDescription: 'Cuba de poliéster para remolque agrícola: consulta solo el recipiente PRFV, sin vehículo. Compara medidas, apoyos y entrega según destino.',
    eyebrow: 'APLICACIÓN AGRÍCOLA',
    summary: 'Si ya tienes un remolque agrícola y buscas solo una cuba de poliéster, podemos estudiar el recipiente de PRFV por separado, según vehículo y fabricante.',
    details: 'Si quieres sustituir solo la cuba de un remolque agrícola, indica las medidas útiles de largo, ancho y alto, la carga admisible y el líquido previsto. Compara la geometría de la nueva cisterna, sus bocas, apoyos y anclajes con la instalación existente, sin asumir que dos recipientes de igual capacidad son intercambiables. El fabricante debe confirmar el modelo y el profesional de montaje los requisitos de fijación y circulación. Ni el remolque ni la instalación están incluidos por defecto.',
    selectionNotes: [
      'Capacidad aproximada y líquido que llevará la cuba.',
      'Medidas útiles, carga admisible y modelo del remolque existente o previsto, si se conocen.',
      'Tipo de apoyo, anclajes y conexiones a estudiar con el fabricante.',
      'Localidad y código postal de entrega, accesos y medios para descargar.'
    ],
    image: '/images/cubas/cuba-remolque.svg',
    imageAlt: 'Esquema orientativo de cuba de poliéster para montaje en remolque agrícola; remolque no incluido',
    faqs: [
      { question: "¿Puedo comprar la cisterna sin comprar un remolque?", answer: "Sí, puede estudiarse el suministro de la cuba o recipiente PRFV por separado. El chasis, el remolque completo y el montaje no se consideran incluidos por defecto." },
      { question: "¿Cómo saber si una cuba encaja en mi remolque?", answer: "Hay que comprobar medidas útiles, carga admisible, apoyos, anclajes y líquido a transportar. El fabricante y el profesional responsable del montaje deben validar la compatibilidad." },
      { question: "¿El precio incluye montaje o descarga?", answer: "No se presuponen esos servicios. El presupuesto debe concretar qué incluye el suministro y cómo se resolverán el transporte y la descarga." },
    ],
    quoteProduct: 'Cuba de poliéster para remolque agrícola',
  },
  {
    slug: 'cisterna-camion', family: 'cubas', title: 'Cisterna de poliéster para camión o plataforma',
    titleSeo: 'Cisternas de poliéster para camión y plataforma | Depofibra',
    metaDescription: 'Cisterna de poliéster para camión o plataforma. Estudiamos el recipiente PRFV sin vehículo: espacio útil, apoyos, cargas y entrega por destino.',
    eyebrow: 'PLATAFORMA / CAMIÓN',
    summary: 'Si ya dispones de una plataforma o camión y necesitas solo la cisterna de poliéster, podemos estudiar el recipiente PRFV según capacidad, espacio útil y uso. El vehículo y el montaje no se incluyen por defecto.',
    details: 'Para sustituir una cisterna existente o estudiar su montaje sobre una plataforma, no basta con saber los litros: deben revisarse la longitud, la anchura y la altura disponibles, la carga admisible con el conjunto lleno, los puntos de apoyo y anclaje, las conexiones y el líquido. El proveedor confirmará las características de la referencia y el profesional competente deberá validar el montaje y las exigencias de circulación. No se presume incluido el chasis, el vehículo, la instalación ni la descarga.',
    selectionNotes: [
      'Vehículo o plataforma previstos, espacio útil (largo, ancho y alto) y carga admisible.',
      'Capacidad nominal orientativa, líquido y frecuencia o condiciones de desplazamiento.',
      'Croquis o foto de apoyos, fijaciones y posición de las conexiones, para revisión del profesional responsable.',
      'Accesorios y conexiones solicitados, código postal, accesos y medios de descarga.'
    ],
    image: '/images/cubas/cisterna-camion.svg',
    imageAlt: 'Esquema orientativo de cisterna de poliéster sobre plataforma; vehículo no incluido',
    faqs: [
      { question: "¿Sirve cualquier cisterna de poliéster para una plataforma?", answer: "No. Deben validarse dimensiones, reparto de cargas, soportes, fijaciones y requisitos aplicables al vehículo y a su circulación." },
      { question: "¿Qué datos necesito facilitar para pedir presupuesto?", answer: "Tipo de plataforma o camión, medidas útiles, capacidad y líquido previstos, apoyos y conexiones requeridos, código postal y medios de descarga." },
      { question: "¿El suministro incluye vehículo y montaje?", answer: "No se consideran incluidos por defecto. La oferta debe especificar el recipiente, accesorios confirmados y cualquier servicio adicional contratado." },
    ],
    quoteProduct: 'Cisterna de poliéster para camión o plataforma',
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
    faqs: [
      { question: "¿Se pueden pedir conexiones o accesorios especiales?", answer: "Pueden estudiarse según el fabricante y la referencia. No todos los accesorios están incluidos ni cualquier cambio es técnicamente viable." },
      { question: "¿Puede utilizarse para productos químicos?", answer: "Solo si se confirma documentalmente la compatibilidad del modelo con la sustancia, concentración y temperatura previstas. No se debe asumir por ser un recipiente PRFV." },
      { question: "¿Qué datos conviene enviar para estudiar una cuba especial?", answer: "Capacidad, uso y líquido, croquis o espacio disponible, conexiones y accesorios solicitados, código postal y condiciones para la descarga." },
    ],
    quoteProduct: 'Cuba o cisterna',
  },
];

// Evita volver a asignar una portada idéntica a fichas distintas.
const images = secondaryProducts.map(item => item.image);
if (new Set(images).size !== images.length) {
  throw new Error('Las fichas de fosas y cubas deben usar ilustraciones de portada diferentes.');
}
