/**
 * Landings locales de depósitos: solo mercados con evidencia de GSC.
 * No son tiendas/sedes. No se ofrece transporte o aptitud sin confirmación.
 */
export interface DepositLocalLanding {
  slug: 'murcia' | 'valencia' | 'sevilla';
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
  {
    slug: 'sevilla',
    province: 'Sevilla',
    eyebrow: 'SEVILLA · DEPÓSITOS DE POLIÉSTER',
    seoTitle: 'Depósitos de poliéster en Sevilla: capacidades y entrega | Depofibra',
    metaDescription: 'Depósitos de poliéster para agua y riego en Sevilla. Atención desde Casariche, comparación de 5.000, 10.000 y 15.000 litros y presupuesto según destino.',
    h1: 'Depósitos de poliéster para agua en Sevilla',
    lead: 'Depofibra atiende consultas comerciales desde Casariche, en la provincia de Sevilla. Si necesitas un depósito de agua de poliéster reforzado con fibra de vidrio (PRFV) para riego u otro uso compatible, compara las capacidades y aclara cómo se hará la entrega antes de pedir precio.',
    regionHeading: 'Comprar un depósito desde Casariche: capacidad, uso y condiciones reales',
    regionParagraphs: [
      'Casariche forma parte de las comarcas de Osuna, Estepa y Sierra Sur de Sevilla, identificadas por la Junta de Andalucía como ámbito de desarrollo rural. Atender desde esta localidad es un dato de origen comercial, no una promesa de fábrica, almacén, tienda presencial o transporte propio.',
      'Para una finca de riego, un depósito puede servir como reserva entre reposiciones de agua. Para otro uso, antes debemos comprobar que el modelo y sus materiales sean compatibles. La decisión depende de litros consumidos, frecuencia de llenado, base disponible, conexiones y accesos. No existe una capacidad universal por municipio ni por cultivo.',
    ],
    zoneHeading: 'Tres situaciones a valorar dentro de la provincia',
    localCases: [
      {
        place: 'Casariche, Estepa y Sierra Sur',
        need: 'Para consultas cercanas al punto de atención de Depofibra, confirma el modelo y la modalidad de entrega. La cercanía no garantiza recogida presencial, disponibilidad inmediata ni transporte incluido.',
      },
      {
        place: 'Osuna, Écija y la campiña sevillana',
        need: 'Si el depósito irá a una finca, indica si hay carriles estrechos, entradas con altura limitada o caminos de tierra. Las condiciones del acceso influyen en la viabilidad del transporte y la descarga.',
      },
      {
        place: 'Sevilla capital, Vega y Bajo Guadalquivir',
        need: 'En parcelas, naves o instalaciones con espacio de maniobra limitado, conviene comprobar dimensiones exteriores, posición de conexiones, lugar de apoyo y medios previstos para descargar.',
      },
    ],
    choiceHeading: 'Comparar 5.000, 10.000 y 15.000 litros para Sevilla',
    capacityNotes: [
      {
        liters: 5000,
        note: '5 m³ nominales. La documentación de referencia incluye dos geometrías distintas: revisa diámetros, altura real y accesos antes de elegir el modelo.',
      },
      {
        liters: 10000,
        note: '10 m³ nominales. Una opción que conviene valorar según consumo y reposiciones de agua; confirma las cotas, las conexiones y el transporte.',
      },
      {
        liters: 15000,
        note: '15 m³ nominales. Antes de presupuestar comprueba superficie de apoyo, altura libre, accesos del vehículo y medios seguros de descarga.',
      },
    ],
    logisticsHeading: 'Cómo solicitar un presupuesto de depósito para Sevilla',
    logisticsParagraphs: [
      'Depofibra comercializa depósitos de fabricantes externos y atiende desde Casariche (Sevilla). El modelo, las dimensiones definitivas y la disponibilidad se consultan para cada solicitud. El transporte se organiza con operadores externos y se cotiza según referencia y destino; estar en la misma provincia no supone entrega inmediata ni portes gratuitos.',
      'Indica población y código postal de Sevilla, capacidad aproximada, uso del agua o líquido, medidas del acceso y conexiones necesarias. El transporte estándar no incluye descarga salvo acuerdo expreso. No se presupone instalación, grúa, recogida presencial ni otro servicio adicional sin confirmarlo previamente.',
    ],
    faq: [
      {
        question: '¿Depofibra fabrica depósitos de poliéster en Sevilla?',
        answer: 'No. Depofibra es una comercializadora de depósitos PRFV de fabricantes externos. Atendemos consultas desde Casariche (Sevilla), pero no anunciamos fábrica, flota ni almacén propios.',
      },
      {
        question: '¿Puedo recoger un depósito directamente en Casariche?',
        answer: 'No se debe dar por disponible una recogida presencial o una visita a instalaciones. La modalidad de suministro, el lugar de entrega y el transportista se confirman para el modelo y la operación concreta.',
      },
      {
        question: '¿Qué depósito conviene para una finca de Sevilla: 5.000, 10.000 o 15.000 litros?',
        answer: 'Depende de los litros consumidos, los días entre reposiciones y el volumen útil del equipo, además del espacio para colocarlo. Las tres fichas permiten comparar alternativas; no se recomienda una capacidad solo por la localidad.',
      },
      {
        question: '¿Qué precio tiene un depósito de 10.000 litros con transporte a Sevilla?',
        answer: 'No hay un precio único para toda la provincia. Se revisan modelo, equipamiento, accesos, localidad y condiciones de transporte antes de entregar un presupuesto; la descarga no está incluida por defecto.',
      },
      {
        question: '¿Los depósitos anunciados sirven para agua potable o para enterrarlos?',
        answer: 'No se presupone ninguna de esas aptitudes. El uso para consumo humano exige documentación específica y el enterramiento requiere una referencia diseñada y autorizada para esa instalación.',
      },
    ],
    sourceName: 'Junta de Andalucía — comarcas de Osuna, Estepa y Sierra Sur de Sevilla',
    sourceUrl: 'https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/desarrollo-rural/grupos-desarrollo-rural/paginas/gdr-sevilla-estepa-sierrasur-2023-2027.html',
    quoteContext: 'Consulta de depósito PRFV con destino en Sevilla; confirmar capacidad, uso, código postal, accesos, transporte externo y descarga.',
  },
];
