/**
 * Landings locales de depósitos: solo mercados con evidencia de GSC.
 * No son tiendas/sedes. No se ofrece transporte o aptitud sin confirmación.
 */
export interface DepositLocalLanding {
  slug: 'murcia' | 'valencia';
  province: string;
  eyebrow: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  regionHeading: string;
  regionParagraphs: string[];
  zoneHeading: string;
  localCases: { place: string; need: string }[];
  choiceHeading: string;
  capacityNotes: { liters: 5000 | 10000 | 15000; note: string }[];
  logisticsHeading: string;
  logisticsParagraphs: string[];
  faq: { question: string; answer: string }[];
  sourceName: string;
  sourceUrl: string;
  quoteContext: string;
}

export const depositLocalLandings: DepositLocalLanding[] = [
  {
    slug: 'murcia',
    province: 'Región de Murcia',
    eyebrow: 'REGIÓN DE MURCIA · DEPÓSITOS PARA RIEGO',
    seoTitle: 'Depósitos de agua en Murcia: 5.000, 10.000 y 15.000 L | Depofibra',
    metaDescription: 'Depósitos de poliéster para agua de riego en Murcia. Compara 5.000, 10.000 y 15.000 litros y solicita transporte a tu localidad según modelo y accesos.',
    h1: 'Depósitos de agua de poliéster en Murcia',
    lead: '¿Necesitas almacenar agua para una finca, una instalación de riego o una explotación agrícola en la Región de Murcia? Compara depósitos de poliéster (PRFV) y solicita una propuesta ajustada a los litros, al uso y al destino.',
    regionHeading: 'Almacenamiento de agua para instalaciones agrícolas de Murcia',
    regionParagraphs: [
      'La demanda agrícola y la programación del riego son elementos relevantes en la cuenca del Segura. La Confederación Hidrográfica del Segura describe usos del agua y zonas agrícolas como el Campo de Cartagena. Para dimensionar un depósito debes conocer el consumo de tu instalación y la frecuencia efectiva de reposición: la superficie de la finca, por sí sola, no determina los litros.',
      'Si recibes agua por turnos de una comunidad de regantes, la capacidad se estudia a partir de los intervalos entre aportaciones y del consumo previsto. Si trabajas con otro origen de suministro autorizado, cambia el balance de entradas y salidas. Instalar un depósito no supone obtener derechos de agua ni permite captar o usar recursos fuera de las condiciones legales aplicables.',
    ],
    zoneHeading: 'Qué revisar según la finca o el punto de entrega',
    localCases: [
      {place:'Campo de Cartagena y litoral',need:'Revisa accesos de camión, espacio disponible y exposición de la instalación; el tipo de agua y la ubicación de las tomas se confirman para la referencia elegida.'},
      {place:'Lorca y valle del Guadalentín',need:'Si hay turnos de riego o diferencias de nivel entre la toma y el terreno, indica consumo, desnivel e intervalo de reposición para estudiar capacidad y conexiones.'},
      {place:'Vega del Segura y Altiplano',need:'En parcelas con caminos estrechos o accesos condicionados, conviene enviar código postal, anchura de paso y posibles obstáculos antes de presupuestar transporte.'},
    ],
    choiceHeading: 'Tres capacidades para comparar antes de solicitar precio en Murcia',
    capacityNotes: [
      {liters:5000,note:'Referencia inicial para consumos moderados o reservas parciales: calcula autonomía a partir de litros por día y volumen útil.'},
      {liters:10000,note:'Punto de comparación cuando los turnos de riego o el consumo exigen más reserva; verifica diámetro y cotas para el acceso.'},
      {liters:15000,note:'Para necesidades mayores de almacenamiento, confirma apoyo, maniobra de descarga y espacio de mantenimiento antes de escoger.'},
    ],
    logisticsHeading:'Presupuesto de transporte a Murcia sin sorpresas',
    logisticsParagraphs:[
      'Depofibra comercializa desde Casariche (Sevilla) depósitos de fabricantes externos. No tenemos delegación ni fábrica en Murcia. Podemos estudiar el suministro con transporte externo a un destino concreto, sujeto a la viabilidad y condiciones de la referencia, la ruta y el transportista. No anunciamos reparto inmediato ni disponibilidad por provincia.',
      'El transporte estándar no incluye descarga salvo que se acuerde expresamente. Facilítanos municipio y código postal, dimensiones y capacidad, acceso del camión, obstáculos en altura y el medio previsto para descargar. También debes indicar la posición y diámetro de las conexiones que necesitas.',
    ],
    faq:[
      {question:'¿Depofibra tiene fábrica o almacén en Murcia?',answer:'No anunciamos fábrica, almacén ni punto de atención físico en Murcia. Depofibra es una comercializadora con atención desde Casariche (Sevilla); el suministro a una ubicación murciana se estudia según el producto y la logística.'},
      {question:'¿Qué depósito elegir para riego en el Campo de Cartagena o Lorca?',answer:'No hay un tamaño universal por municipio o cultivo. Calcula litros consumidos por día y días entre reposiciones; después revisa geometría, volumen útil, conexiones y acceso a la finca.'},
      {question:'¿Incluye la descarga el transporte hasta Murcia?',answer:'No se incluye por defecto en el transporte estándar. Hay que planificar los medios de descarga apropiados y confirmar cualquier servicio adicional por escrito.'},
      {question:'¿Sirven todos los depósitos PRFV para agua potable?',answer:'No. Para consumo humano deben verificarse la aptitud y la documentación del modelo específico; las páginas de depósitos para riego no certifican por sí solas ese uso.'},
    ],
    sourceName:'Confederación Hidrográfica del Segura — usos y demandas',
    sourceUrl:'https://www.chsegura.es/es/cuenca/caracterizacion/usos-demandas-y-presiones/usos-y-demandas/',
    quoteContext:'Consulta de depósito para Región de Murcia; confirmar referencia, transporte y descarga a código postal de destino.',
  },
  {
    slug: 'valencia',
    province: 'provincia de Valencia',
    eyebrow: 'PROVINCIA DE VALENCIA · DEPÓSITOS DE POLIÉSTER',
    seoTitle: 'Depósitos de poliéster en Valencia: agua y riego | Depofibra',
    metaDescription: 'Depósitos de agua de poliéster para fincas e instalaciones en Valencia. Compara capacidades, conexiones y transporte según localidad, modelo y accesos.',
    h1: 'Depósitos de poliéster para agua en Valencia',
    lead: 'Si buscas un depósito de poliéster para riego, reserva de agua o una instalación compatible en la provincia de Valencia, consulta las capacidades de referencia y prepara un presupuesto con las medidas y el destino exactos.',
    regionHeading: 'Cómo elegir un depósito para riego en la provincia de Valencia',
    regionParagraphs: [
      'La Confederación Hidrográfica del Júcar identifica áreas de regadío en la Ribera y la cuenca baja del Júcar, el entorno del Turia y otras comarcas valencianas, con cultivos y sistemas de riego distintos. En las áreas citrícolas, hortícolas o de cultivos leñosos no conviene dimensionar el almacenamiento por un número fijo de hectáreas sin conocer el consumo y el calendario de aportaciones.',
      'En instalaciones que dependen de una comunidad de regantes, conviene saber cuándo llega el agua y durante cuánto tiempo debe mantenerse la reserva. Si el agua se almacena antes de distribuirla por sectores, la posición y el diámetro de las salidas pueden importar tanto como el volumen nominal. Un depósito no modifica las dotaciones, concesiones ni derechos de uso del agua.',
    ],
    zoneHeading: 'Situaciones de instalación que merece la pena distinguir',
    localCases:[
      {place:'La Ribera y áreas del Júcar',need:'Para almacenar agua antes de riego localizado o por sectores, calcula el consumo entre aportaciones y define las tomas que necesita la red existente.'},
      {place:'L’Horta y entorno del Turia',need:'Si el depósito se instalará en una parcela con accesos reducidos, comprueba portones, giro del vehículo y espacio para la colocación y el mantenimiento.'},
      {place:'La Safor y zonas del interior',need:'En fincas con desniveles o ubicación alejada del punto de descarga, documenta pendientes, firme del camino y distancia hasta la base prevista.'},
    ],
    choiceHeading: 'Comparar depósitos de 5.000, 10.000 y 15.000 litros en Valencia',
    capacityNotes:[
      {liters:5000,note:'Útil como referencia de comparación para reservas fraccionadas o consumos acotados: la autonomía debe calcularse con datos reales.'},
      {liters:10000,note:'Valora esta capacidad si el balance entre riego y reposiciones exige más volumen; revisa las distintas geometrías disponibles.'},
      {liters:15000,note:'Antes de subir a esta capacidad, confirma condiciones de apoyo, espacio libre y dimensiones necesarias para el transporte y la descarga.'},
    ],
    logisticsHeading:'Entrega de depósitos en Valencia: qué se verifica antes del precio',
    logisticsParagraphs:[
      'Depofibra es una comercializadora de fabricantes externos con atención desde Casariche (Sevilla), no una fábrica ni una tienda en Valencia. Podemos valorar el transporte externo a la provincia según referencia, dimensiones, ruta y condiciones del destino. No existe una tarifa única ni un plazo garantizado de entrega provincial.',
      'La descarga no está incluida por defecto en el transporte estándar. Para preparar un presupuesto útil indica municipio, código postal, tipo de finca o instalación, altura y anchura libres y si dispones de medios adecuados para descargar. Las tomas, accesorios y cualquier exigencia de uso se verifican antes de cotizar.',
    ],
    faq:[
      {question:'¿Dónde puedo pedir presupuesto de un depósito de poliéster para Valencia?',answer:'Desde el formulario de Depofibra puedes enviar capacidad, uso y código postal de destino. Estudiaremos con proveedores y transportistas las condiciones viables de referencia y suministro.'},
      {question:'¿Qué depósito conviene para cítricos o riego localizado?',answer:'No existe una capacidad fija por cultivo. Debes calcular consumo, tiempos de funcionamiento y frecuencia de abastecimiento; después confirmar volumen útil, medidas y conexiones del modelo.'},
      {question:'¿Hacéis la instalación o tenéis sede en Valencia?',answer:'No anunciamos una sede ni instalación propia en Valencia. Depofibra comercializa depósitos de fabricantes externos y coordina las condiciones del suministro según cada operación; los trabajos de instalación deben concretarse por separado.'},
      {question:'¿Un depósito horizontal de superficie puede enterrarse?',answer:'No. Para enterramiento se necesita una referencia específicamente diseñada para ello y seguir las condiciones del fabricante y del proyecto. Un modelo con cunas no equivale a uno enterrable.'},
    ],
    sourceName:'Confederación Hidrográfica del Júcar — actividad agraria y regadíos',
    sourceUrl:'https://www.chj.es/es-es/medioambiente/cuencahidrografica/Paginas/CaracteristicasSocioeconomicas.aspx',
    quoteContext:'Consulta de depósito para provincia de Valencia; confirmar referencia, transporte y descarga a código postal de destino.',
  },
];
