/**
 * Landings territoriales para captar intención comercial; el contexto no acredita demanda GSC.
 * No son tiendas/sedes. No se ofrece transporte o aptitud sin confirmación.
 */
export interface DepositLocalLanding {
  slug: 'murcia' | 'valencia' | 'sevilla' | 'palencia' | 'soria' | 'huelva' | 'badajoz' | 'segovia' | 'huesca' | 'teruel' | 'cuenca' | 'avila' | 'salamanca' | 'malaga';
  heroImage: { src: string; alt: string; productHref: string; productLabel: string };
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
    heroImage: { src: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-alto-escala.webp', alt: 'Depósito vertical verde de poliéster con escala de nivel sobre base de hormigón', productHref: '/depositos/vertical-base-plana/', productLabel: 'Ver depósitos verticales' },
    province: 'Región de Murcia',
    eyebrow: 'REGIÓN DE MURCIA · DEPÓSITOS PARA RIEGO',
    seoTitle: 'Depósitos de poliéster para riego en Murcia | Depofibra',
    metaDescription: 'Depósitos PRFV para agua de riego en Murcia. Compara modelos verticales y horizontales, distintas capacidades y transporte según destino y accesos.',
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
    choiceHeading: 'Qué modelos y capacidades de depósito comparar en Murcia',
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
    heroImage: { src: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-instalado.webp', alt: 'Depósito vertical blanco de poliéster con escala sobre una plataforma de obra', productHref: '/depositos/vertical-base-plana/', productLabel: 'Ver depósitos verticales' },
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
    choiceHeading: 'Elegir formato y capacidad del depósito para Valencia',
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
    heroImage: { src: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-frontal.webp', alt: 'Depósito vertical blanco de poliéster con base plana y escala de nivel frontal', productHref: '/depositos/vertical-base-plana/', productLabel: 'Ver depósitos verticales' },
    province: 'Sevilla',
    eyebrow: 'SEVILLA · DEPÓSITOS DE POLIÉSTER',
    seoTitle: 'Depósitos de poliéster en Sevilla: entrega | Depofibra',
    metaDescription: 'Depósitos PRFV para agua y riego en Sevilla. Compara modelos y capacidades y solicita presupuesto según uso, accesos y destino.',
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
    choiceHeading: 'Qué capacidad y tipo de depósito elegir para Sevilla',
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
  {
    "slug": "palencia",
    heroImage: { src: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verdes-conjunto-diferentes-tamanos.webp', alt: 'Varios depósitos verticales verdes de distintas alturas colocados en línea', productHref: '/depositos/vertical-base-plana/', productLabel: 'Ver depósitos verticales' },
    "province": "provincia de Palencia",
    "eyebrow": "PALENCIA · DEPÓSITOS DE POLIÉSTER PARA AGUA Y RIEGO",
    "seoTitle": "Depósitos de poliéster en Palencia para riego | Depofibra",
    "metaDescription": "Depósitos PRFV para fincas y riego en Palencia. Compara verticales, horizontales y capacidades; solicita presupuesto de transporte según modelo y accesos.",
    "h1": "Depósitos de poliéster para agua y riego en Palencia",
    "lead": "¿Estás buscando un depósito de poliéster reforzado con fibra de vidrio para almacenar agua de riego o reserva en Palencia? En Depofibra puedes consultar diferentes geometrías y capacidades del catálogo, y preparar el presupuesto según tu uso, el municipio y las condiciones de entrega.",
    "regionHeading": "Depósito para riego en Palencia: reserva útil y reposición del agua",
    "regionParagraphs": [
      "En la demarcación del Duero existen distintas unidades de demanda agraria, documentadas por la Confederación Hidrográfica del Duero. La presencia de regadío no determina por sí sola qué depósito necesita una explotación: la capacidad depende de las aportaciones de agua autorizadas, del consumo y de los intervalos entre reposiciones.",
      "Para una finca que recibe agua por turnos, estima primero litros consumidos por jornada y días sin reposición. Por ejemplo, una demanda de 2.000 litros diarios durante cuatro días supone 8.000 litros teóricos antes de considerar volumen útil, reservas de seguridad o limitaciones de instalación. No es una recomendación cerrada de modelo ni modifica derechos de captación o uso del agua.",
      "Si el espacio permite instalación en superficie, compara verticales de base plana y horizontales con cunas. Para enterrar es imprescindible una referencia específica de enterramiento y las condiciones del fabricante; compartir dimensiones no hace que un modelo de superficie sea enterrable."
    ],
    "zoneHeading": "Tres situaciones habituales que conviene comprobar en Palencia",
    "localCases": [
      {
        "place": "Palencia capital y entorno del Carrión",
        "need": "Si el destino está en una nave o parcela próxima a vías urbanas, comunica altura de entrada, anchura de accesos, ubicación de la base y espacio de descarga. El vehículo y el horario se acuerdan según la operación."
      },
      {
        "place": "Tierra de Campos y fincas agrícolas",
        "need": "Para reservas de riego en fincas, informa del consumo real, distancia entre llenados y condición del camino hasta el punto de colocación. Un terreno aparentemente amplio no garantiza acceso de un camión."
      },
      {
        "place": "Aguilar de Campoo y Montaña Palentina",
        "need": "En emplazamientos con pendientes, maniobra limitada o climatología condicionante, conviene comprobar con especial atención firme, gálibos, ruta y disponibilidad de medios adecuados de descarga."
      }
    ],
    "choiceHeading": "Fichas orientativas y otros volúmenes para Palencia",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Una referencia para comparar alternativas compactas de reserva; la tabla histórica contempla más de una geometría de este volumen, a confirmar por proveedor."
      },
      {
        "liters": 10000,
        "note": "Compara la autonomía teórica con el calendario de aportaciones y verifica dimensiones exteriores y necesidades de colocación."
      },
      {
        "liters": 15000,
        "note": "Una referencia para consumos superiores; antes de presupuestar confirma base, altura libre, tipo de camión y descarga."
      }
    ],
    "logisticsHeading": "Presupuesto de depósito con entrega en Palencia",
    "logisticsParagraphs": [
      "Depofibra comercializa productos PRFV de fabricantes externos y atiende desde Casariche (Sevilla). No dispone de fábrica ni almacén propios en Palencia. La salida de cada mercancía depende del proveedor y del modelo elegido; no debe darse por hecho que un producto salga físicamente de Casariche.",
      "Para valorar transporte externo, indica población y código postal, capacidad aproximada, uso del líquido, accesos y medios de descarga. El porte estándar no incluye descarga salvo confirmación escrita de un servicio específico. El coste y el plazo se consultan por operación; no prometemos una ruta regular, instalación ni disponibilidad inmediata.",
      "Además de las fichas de 5.000, 10.000 y 15.000 litros, el catálogo incluye diferentes tipos verticales, horizontales, enterrables y otras capacidades de referencia; la viabilidad, las tomas y la documentación se verifican por modelo."
    ],
    "faq": [
      {
        "question": "¿Vendéis depósitos de poliéster para riego con destino Palencia?",
        "answer": "Podemos estudiar el suministro a Palencia de referencias PRFV de fabricantes externos según uso, modelo y logística disponible. Para cotizar hacen falta localidad, código postal y condiciones de descarga; el suministro no está garantizado antes de confirmar condiciones."
      },
      {
        "question": "¿Qué depósito conviene para una finca de Tierra de Campos?",
        "answer": "La localidad no fija la capacidad. Calcula consumo y frecuencia de reposición y compara volumen útil, diámetro, longitud, espacio de apoyo y conexiones de modelos aptos para el uso concreto."
      },
      {
        "question": "¿El precio incluye transporte y descarga?",
        "answer": "No existe una tarifa única provincial. Se consulta el porte vigente según origen real de carga, dimensiones y destino. La descarga no forma parte del transporte estándar salvo acuerdo expreso."
      },
      {
        "question": "¿Puedo comprar capacidades mayores de 15.000 litros?",
        "answer": "Sí se pueden estudiar otras capacidades documentadas en el catálogo, sujetas a disponibilidad y validación por referencia. Las tres capacidades enlazadas son ejemplos con ficha propia, no el límite de gama."
      },
      {
        "question": "¿Todos los depósitos permiten agua potable o enterramiento?",
        "answer": "No. La aptitud para consumo humano requiere documentación específica, y para enterramiento debe seleccionarse un modelo diseñado para esa instalación y seguir las instrucciones del fabricante."
      }
    ],
    "sourceName": "Confederación Hidrográfica del Duero — unidades de demanda agraria",
    "sourceUrl": "https://datos.chduero.es/dataset/demandas-agrarias",
    "quoteContext": "Consulta de depósito PRFV para Palencia. Confirmar modelo, uso, CP, origen del transporte, accesos y descarga."
  },
  {
    "slug": "soria",
    heroImage: { src: '/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-perspectiva.webp', alt: 'Depósito horizontal verde de poliéster con apoyos visto en perspectiva', productHref: '/depositos/horizontal-con-cunas/', productLabel: 'Ver depósitos horizontales' },
    "province": "provincia de Soria",
    "eyebrow": "SORIA · DEPÓSITOS PARA FINCAS Y RESERVA DE AGUA",
    "seoTitle": "Depósitos de agua de poliéster en Soria | Depofibra",
    "metaDescription": "Consulta depósitos de poliéster para fincas, riego y reserva de agua en Soria. Compara formatos PRFV y pide presupuesto según capacidad y destino.",
    "h1": "Depósitos de poliéster para agua en Soria",
    "lead": "Si necesitas reservar agua para riego o para una instalación compatible en Soria, consulta depósitos PRFV verticales, horizontales y modelos específicos para enterramiento. Depofibra comercializa referencias de fabricantes externos y estudia cada presupuesto con el destino y los accesos reales.",
    "regionHeading": "Reserva de agua en Soria: caudal, turnos y autonomía",
    "regionParagraphs": [
      "La Confederación Hidrográfica del Duero documenta en su planificación zonas regables y unidades agrarias de la provincia de Soria, como el entorno de Almazán y del río Ucero. Esto no permite estimar la demanda de depósitos ni escoger capacidad solo por municipio: hay que comparar consumo, caudal disponible e intervalos de suministro.",
      "Cuando una instalación recibe el agua de forma intermitente, calcula cuántos litros necesita acumular entre aportaciones. Si el suministro es continuo, quizá convenga otra configuración. También importan la altura disponible, el apoyo, las conexiones y el recorrido entre el camión y el lugar definitivo de colocación.",
      "Un depósito para superficie puede ser vertical de base plana u horizontal con cunas si la referencia admite el uso previsto. Para enterrarlo se necesita un modelo enterrable concreto; la elección del recipiente no sustituye el proyecto ni autoriza captaciones de agua."
    ],
    "zoneHeading": "Puntos de entrega que requieren comprobaciones diferentes en Soria",
    "localCases": [
      {
        "place": "Almazán y su entorno agrícola",
        "need": "Para depósitos de reserva vinculados a riego, prepara consumo aproximado, periodicidad de llenado, tipo de base y accesos del vehículo. Valora conexiones y salida hacia la red existente."
      },
      {
        "place": "El Burgo de Osma y valle del Ucero",
        "need": "Si el equipo se colocará en una finca, verifica la anchura del camino, giros, tendidos y si existe espacio para una descarga segura. Son variables decisivas antes del transporte."
      },
      {
        "place": "Ágreda, Ólvega y el este provincial",
        "need": "En instalaciones con naves, patios o espacios de paso restringidos, aporta el gálibo de las entradas y las dimensiones máximas admisibles, no solo la capacidad nominal."
      }
    ],
    "choiceHeading": "Comparar referencias de depósito para Soria sin limitarse a tres tamaños",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Referencia inicial para reservas acotadas; calcula días de autonomía y comprueba qué geometría se adapta realmente al acceso."
      },
      {
        "liters": 10000,
        "note": "Opción de comparación para almacenamiento intermedio; confirma la altura total con boca y las conexiones que necesita la instalación."
      },
      {
        "liters": 15000,
        "note": "Para mayor volumen nominal, revisa apoyos, diámetros, longitud y medios de elevación y descarga antes del presupuesto."
      }
    ],
    "logisticsHeading": "Cómo estudiar una entrega de depósito PRFV en Soria",
    "logisticsParagraphs": [
      "Depofibra atiende comercialmente desde Casariche (Sevilla), pero no es fabricante ni tiene fábrica o almacén en Soria. La mercancía puede salir de un proveedor externo, por lo que el origen de carga y la ruta se confirman al seleccionar referencia. No ofrecemos por defecto una tarifa cerrada para toda Soria.",
      "Indica capacidad, uso, municipio y código postal, dimensiones disponibles, acceso de camión y cómo se realizará la descarga. El transporte externo estándar no incorpora descarga salvo que figure expresamente en la propuesta. No afirmar entrega inmediata, instalación incluida ni servicios de grúa sin cotización específica.",
      "Se pueden estudiar capacidades distintas de 5.000, 10.000 y 15.000 litros y varias geometrías del catálogo. Si se requieren prestaciones especiales, agua de consumo humano o instalación enterrada, la documentación del modelo debe revisarse previamente."
    ],
    "faq": [
      {
        "question": "¿Depofibra puede presupuestar depósitos de agua con destino Soria?",
        "answer": "Podemos estudiar una propuesta para Soria según el modelo y la viabilidad logística. Necesitamos uso, capacidad y código postal, además de condiciones de acceso y descarga. No confirmamos transporte o fecha antes de recibir la oferta correspondiente."
      },
      {
        "question": "¿Es mejor un depósito vertical u horizontal para una finca en Soria?",
        "answer": "Depende del espacio, del apoyo, de la capacidad y de la maniobra de entrega. Un vertical ocupa una huella diferente; el horizontal con cunas necesita espacio longitudinal y apoyos adecuados. Confirmamos cotas reales por modelo."
      },
      {
        "question": "¿Los depósitos para riego pueden enterrarse?",
        "answer": "Solo cuando se seleccione una referencia específicamente diseñada para enterramiento y se sigan las condiciones técnicas de fabricación e instalación; no por coincidir con las medidas de un modelo de superficie."
      },
      {
        "question": "¿Cuánto cuesta transportar un depósito a Almazán o El Burgo de Osma?",
        "answer": "No existe un precio garantizado para esos municipios. Se cotiza según referencia, fábrica de origen, medidas, peso, acceso y servicio. La descarga no está incluida por defecto."
      },
      {
        "question": "¿Puedo consultar depósitos de más de 15.000 litros?",
        "answer": "Sí, hay otras capacidades históricas en distintas familias que se pueden estudiar. La ficha y disponibilidad vigentes se verifican antes de confirmar una propuesta."
      }
    ],
    "sourceName": "Confederación Hidrográfica del Duero — Plan Hidrológico vigente",
    "sourceUrl": "https://www.chduero.es/plan-hidrol%C3%B3gico-del-duero-vigente-",
    "quoteContext": "Consulta de depósito PRFV con destino en Soria. Confirmar capacidad, uso, CP, accesos, transporte externo y descarga."
  }
,
  {
    "slug": "huelva",
    "heroImage": {
      "src": "/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-escala-en-exterior.webp",
      "alt": "Depósito vertical verde de poliéster con escala de nivel en una instalación exterior de referencia",
      "productHref": "/depositos/vertical-base-plana/",
      "productLabel": "Comparar verticales de base plana"
    },
    "province": "provincia de Huelva",
    "eyebrow": "PROVINCIA DE HUELVA · RIEGO AGRÍCOLA Y FRUTOS ROJOS",
    "seoTitle": "Depósitos de poliéster para riego en Huelva | Depofibra",
    "metaDescription": "Depósitos PRFV para riego en Huelva. Compara capacidades para fincas de frutos rojos y solicita presupuesto según modelo, accesos y transporte.",
    "h1": "Depósitos de poliéster para agua de riego en Huelva",
    "lead": "Si tu finca está en Moguer, Almonte, Lepe, Cartaya u otra localidad de Huelva y necesitas una reserva de agua, podemos estudiar un depósito de poliéster (PRFV) conforme al consumo, las aportaciones autorizadas, el espacio y los accesos. No hay una capacidad fija por hectárea ni por cultivo.",
    "regionHeading": "Riego de frutos rojos: del calendario de aportaciones a los litros de reserva",
    "regionParagraphs": [
      "IFAPA dispone de un manual específico de programación del riego para la fresa, frambuesa y arándano en Huelva. En estos cultivos la demanda varía con la fase de desarrollo, la climatología y el sistema de riego; calcular un depósito multiplicando hectáreas por una cifra genérica puede dar un resultado inadecuado. El volumen de reserva se estudia con consumos medidos, turnos de suministro y margen de operación, no por el nombre de la provincia.",
      "Un depósito PRFV puede servir como almacenamiento intermedio de agua para riego cuando el modelo sea compatible. No sustituye la filtración, los automatismos ni los equipos de bombeo del proyecto. Si se almacena una disolución fertilizante, hay que consultar por separado la compatibilidad química de resinas, revestimientos y conexiones. La disponibilidad legal del agua depende de los derechos y condiciones de captación o suministro, no de instalar un depósito."
    ],
    "zoneHeading": "Tres situaciones habituales que conviene distinguir en Huelva",
    "localCases": [
      {
        "place": "Moguer, Palos de la Frontera y Lucena del Puerto",
        "need": "En explotaciones de frutos rojos, indica el caudal de entrada, las horas de riego y la reserva entre aportaciones. Define entradas y salidas antes de elegir diámetro y volumen."
      },
      {
        "place": "Almonte, Rociana del Condado y Bonares",
        "need": "Además del consumo, revisa el origen legal del agua y el espacio disponible. Un depósito no amplía concesiones ni modifica restricciones de riego de la zona."
      },
      {
        "place": "Lepe, Cartaya e Isla Cristina",
        "need": "Cuando la finca tiene caminos agrícolas o parcelas dispersas, documenta el acceso del vehículo, el giro, el firme y el medio de descarga. El municipio por sí solo no fija el precio de transporte."
      }
    ],
    "choiceHeading": "Comparar depósitos de 5.000, 10.000 y 15.000 litros para riego en Huelva",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Ejemplo de reserva parcial o para consumo acotado. Calcula cuántas horas reales de riego puede cubrir según caudal y volumen aprovechable."
      },
      {
        "liters": 10000,
        "note": "Permite estudiar una reserva mayor entre turnos o reposiciones. Verifica dimensiones del modelo, conexiones y espacio de maniobra en la finca."
      },
      {
        "liters": 15000,
        "note": "Referencia a contrastar para necesidades de más volumen. Debe verificarse base, accesos, elevación y descarga, sin asumir que es suficiente para una superficie concreta."
      }
    ],
    "logisticsHeading": "Entregar un depósito en Huelva requiere verificar ruta y descarga",
    "logisticsParagraphs": [
      "Depofibra comercializa depósitos de fabricantes externos y atiende consultas desde Casariche (Sevilla). No dispone de sede, almacén, fábrica o servicio de instalación propios anunciados en Huelva. Se puede estudiar un envío con transporte externo según la referencia y la dirección exacta, pero ni el origen físico de carga ni el plazo o el precio se garantizan hasta la cotización.",
      "Para presupuestar necesitamos la capacidad aproximada, el uso real del agua, el municipio y código postal, anchura y altura de paso, dimensiones disponibles y medios de descarga. El transporte estándar no incluye descarga. Cuando el equipo sea grande, se decidirá si hacen falta medios mecánicos adecuados, sin presuponer grúa incluida."
    ],
    "faq": [
      {
        "question": "¿Qué depósito necesito para fresas o arándanos en Huelva?",
        "answer": "No existe una capacidad universal para fresas o arándanos. Calcula primero el volumen consumido por ciclo y el intervalo efectivo entre aportaciones; después compara el volumen útil, la geometría y las conexiones del modelo."
      },
      {
        "question": "¿Sirve un depósito de riego para fertilizantes líquidos?",
        "answer": "No debe presuponerse. Hay que conocer producto, concentración, temperatura y condiciones de operación, y solicitar compatibilidad específica de resina, revestimiento y conexiones al fabricante."
      },
      {
        "question": "¿Podéis valorar un depósito para Moguer, Almonte o Lepe?",
        "answer": "Podemos estudiar una propuesta según el depósito, la ruta y los accesos de destino. Necesitamos municipio y código postal; no anunciamos stock ni entrega garantizada a esas localidades."
      },
      {
        "question": "¿Incluye instalación o descarga del depósito en Huelva?",
        "answer": "No se incluye por defecto. Depofibra comercializa productos de fabricantes externos; la descarga no forma parte del transporte estándar salvo acuerdo verificado, y cualquier instalación debe presupuestarse por separado."
      },
      {
        "question": "¿Se pueden pedir capacidades distintas de 5.000, 10.000 y 15.000 litros?",
        "answer": "Sí. Son referencias comerciales con fichas individuales, no todo el catálogo. Otros modelos y capacidades deben verificarse con el proveedor antes de confirmar sus dimensiones y disponibilidad."
      }
    ],
    "sourceName": "IFAPA (Junta de Andalucía) — Manual de programación del riego de los frutos rojos",
    "sourceUrl": "https://www.juntadeandalucia.es/agriculturaypesca/ifapa/servifapa/registro-servifapa/dcf255d3-71ea-47b5-aab4-5656e3694452",
    "quoteContext": "Consulta de depósito PRFV con destino en Huelva: verificar cultivo/uso, consumo y aportaciones, CP, capacidad, accesos, transporte externo y descarga."
  },
  {
    "slug": "badajoz",
    "heroImage": {
      "src": "/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-compacto-escala.webp",
      "alt": "Depósito vertical compacto de poliéster blanco con escala de nivel, fotografía de producto de referencia",
      "productHref": "/depositos/vertical-base-plana/",
      "productLabel": "Ver modelos verticales"
    },
    "province": "provincia de Badajoz",
    "eyebrow": "PROVINCIA DE BADAJOZ · RESERVA PARA RIEGO DEL GUADIANA",
    "seoTitle": "Depósitos de agua de poliéster en Badajoz | Depofibra",
    "metaDescription": "Depósitos PRFV para riego en Badajoz. Compara litros, turnos de agua, conexiones y transporte antes de pedir presupuesto según el municipio.",
    "h1": "Depósitos de agua de poliéster en Badajoz",
    "lead": "Si buscas un depósito de poliéster para una explotación agrícola en Badajoz, compara formatos y capacidades según los días u horas entre aportaciones, el consumo y los accesos. Estudiamos presupuestos de producto y transporte externo sujetos a referencia y destino, sin prometer disponibilidad provincial.",
    "regionHeading": "Vegas del Guadiana: dimensionar la reserva cuando el riego llega por turnos",
    "regionParagraphs": [
      "La Confederación Hidrográfica del Guadiana identifica comunidades de regantes y sistemas como los canales de Orellana, Zújar, Montijo y Lobón. Una explotación puede tener necesidades de almacenamiento distintas según su derecho de uso, intervalo efectivo de entrega y caudal disponible. Las zonas y nombres de canales sirven para comprender el contexto, pero no demuestran por sí solos que una finca concreta tenga suministro autorizado.",
      "Un depósito PRFV para agua de riego puede estudiarse para desacoplar aportaciones y consumos en una parcela. La reserva necesaria se obtiene del balance real: litros consumidos durante los periodos sin reposición, más el margen operativo que proceda y descontando volumen no aprovechable. El depósito no aumenta la dotación de agua disponible ni sustituye el diseño hidráulico de bombeo, filtración y presión."
    ],
    "zoneHeading": "Qué estudiar según la finca y el lugar de entrega en Badajoz",
    "localCases": [
      {
        "place": "Don Benito, Villanueva de la Serena y Vegas Altas",
        "need": "Cuando el suministro se organiza en turnos, indica los litros y el calendario de aportaciones; revisa si interesa un vertical de superficie u otra geometría según base y altura libre."
      },
      {
        "place": "Montijo, Lobón y Vegas Bajas",
        "need": "Para regadíos asociados a canalizaciones o sectores, confirma el volumen consumido entre llenados y la ubicación de tomas, rebosadero y desagüe antes de pedir presupuesto."
      },
      {
        "place": "Mérida, Almendralejo y otras fincas del sur",
        "need": "No uses una tarifa por provincia como referencia cerrada: el código postal, la ruta real desde el fabricante, el acceso a la finca y la descarga pueden cambiar el coste del envío."
      }
    ],
    "choiceHeading": "Elegir capacidad de depósito para riego en Badajoz",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Referencia inicial para una reserva parcial o un sector de consumo limitado; necesita contrastarse con el calendario de suministro y el volumen útil."
      },
      {
        "liters": 10000,
        "note": "Capacidad intermedia a valorar cuando la reposición llega por turnos; no se presupone una autonomía fija sin conocer el caudal de riego."
      },
      {
        "liters": 15000,
        "note": "Para un almacenamiento mayor hay que revisar dimensiones reales, base, vías de acceso y medios de descarga; existen otras capacidades por consultar."
      }
    ],
    "logisticsHeading": "Cómo presupuestar el suministro a Badajoz sin confundir precio y entrega",
    "logisticsParagraphs": [
      "Depofibra comercializa depósitos PRFV de fabricantes externos y atiende desde Casariche (Sevilla). No tiene fábrica, punto de venta físico, almacén ni flota propia confirmados en Badajoz. Aunque se estudie un transporte externo a la provincia, el origen real de carga depende del proveedor, y el coste, plazo, viabilidad y disponibilidad se verifican por pedido.",
      "Antes de cotizar necesitamos el código postal y municipio, uso del depósito, capacidad aproximada, dimensiones del espacio, estado y anchura de accesos, presencia de líneas u obstáculos, posición de las conexiones y medios para recibir el producto. El transporte estándar no incorpora la descarga salvo acuerdo confirmado por escrito."
    ],
    "faq": [
      {
        "question": "¿Qué depósito necesito si recibo agua de riego por turnos en las Vegas del Guadiana?",
        "answer": "Mide el consumo entre dos aportaciones, el caudal disponible en cada turno y la reserva mínima que necesita la instalación. No basta con conocer el nombre del canal, las hectáreas o la capacidad nominal del depósito."
      },
      {
        "question": "¿Hacéis entrega de depósitos en Don Benito o Montijo?",
        "answer": "Podemos estudiar la viabilidad según referencia, destino y transporte externo, pero no garantizamos reparto, fecha ni precio sin confirmar el trayecto y las condiciones del vehículo y de descarga."
      },
      {
        "question": "¿Depofibra tiene almacén o fábrica en Badajoz?",
        "answer": "No. Nuestra actividad es la comercialización de productos de fabricantes externos, con atención desde Casariche (Sevilla). La fabricación y el transporte físico corresponden a terceros según referencia y operación."
      },
      {
        "question": "¿La descarga está incluida en el precio del transporte?",
        "answer": "El transporte estándar no incluye descarga. Deben confirmarse los medios para descargar de forma segura y presupuestar cualquier servicio adicional antes de comprometer las condiciones."
      },
      {
        "question": "¿También hay depósitos horizontales o capacidades mayores?",
        "answer": "Se pueden estudiar familias verticales, horizontales con cunas o enterrables específicos y otros volúmenes del catálogo, siempre verificando ficha vigente, dimensiones, uso y disponibilidad con el proveedor."
      }
    ],
    "sourceName": "Confederación Hidrográfica del Guadiana — Junta de explotación occidental y regantes",
    "sourceUrl": "https://www.chguadiana.es/el-organismo/organos-de-participacion-y-gestion/organo-de-gestion-en-regimen-de-participacion/juntas-de-explotacion/junta-de-explotacion-occidental",
    "quoteContext": "Consulta de depósito PRFV con destino en Badajoz: verificar fuente de agua autorizada, litros, turnos, CP, accesos, origen fabricante, transporte externo y descarga."
  },
  {
    "slug": "segovia",
    "heroImage": {
      "src": "/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-escala-frontal.webp",
      "alt": "Depósito vertical verde de poliéster con escala de nivel en su parte frontal",
      "productHref": "/depositos/vertical-base-plana/",
      "productLabel": "Ver depósitos verticales"
    },
    "province": "provincia de Segovia",
    "eyebrow": "SEGOVIA · ALMACENAMIENTO DE AGUA PARA GRANJAS Y FINCAS",
    "seoTitle": "Depósitos de poliéster en Segovia para agua | Depofibra",
    "metaDescription": "Depósitos PRFV para granjas, fincas y riego en Segovia. Compara formatos y litros y consulta transporte según modelo, accesos y código postal.",
    "h1": "Depósitos de poliéster para agua en Segovia",
    "lead": "¿Buscas un depósito de poliéster para reserva de agua en una granja o finca segoviana? Compara depósitos verticales, horizontales de superficie y modelos de enterramiento para necesidades compatibles. Estudiaremos el presupuesto según consumo, modelo y destino exactos, sin asumir reparto inmediato.",
    "regionHeading": "Segovia: reserva de agua en explotaciones ganaderas y parcelas agrícolas",
    "regionParagraphs": [
      "La Junta de Castilla y León mantiene un conjunto de datos sobre explotaciones ganaderas de porcino y su distribución territorial. Esa actividad sirve para identificar usos potenciales de reservas de agua, no para afirmar cuántos compradores buscan depósitos o que un modelo determinado sea apto para dar de beber a animales.",
      "En una explotación ganadera conviene separar tres cuestiones: cuánto se consume cada jornada, cuánto tiempo debe funcionar la instalación sin reposición y qué condiciones de higiene y compatibilidad exige el agua almacenada. Una reserva nominal de 10.000 litros no equivale automáticamente a 10.000 litros útiles ni asegura una autonomía sin calcular consumos.",
      "Para fincas con riego o naves agrícolas, la geometría puede ser decisiva: un vertical necesita base y altura libre; un horizontal con cunas requiere longitud y apoyos adecuados; para enterrar se consulta un modelo específicamente concebido para ello. La elección no sustituye autorizaciones de agua ni trabajos de instalación."
    ],
    "zoneHeading": "Tres escenarios de compra y entrega en Segovia",
    "localCases": [
      {
        "place": "Cuéllar y Tierra de Pinares",
        "need": "Si la reserva se plantea para una granja, indica consumo diario, origen del agua y días de autonomía. Aporta la anchura de acceso, espacio de colocación y condiciones para descargar el depósito vacío."
      },
      {
        "place": "Cantalejo, Sepúlveda y el nordeste",
        "need": "Para fincas con caminos rurales, comprueba curvas, firme, pasos estrechos y obstáculos elevados antes de elegir un diámetro. La foto de catálogo no sustituye las cotas exteriores de la referencia."
      },
      {
        "place": "Segovia capital, Nava de la Asunción y entorno",
        "need": "En naves o patios interiores es prioritario medir portones, gálibo y maniobra. Un depósito horizontal puede encajar donde uno vertical resulta demasiado alto, según modelo."
      }
    ],
    "choiceHeading": "Comparar capacidad y formato para Segovia: de 5.000 a 15.000 L y otras referencias",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Ejemplo para reservas acotadas o por sectores. Conviene comprobar cuántas horas o días cubre con el consumo real y qué geometría cabe en el acceso."
      },
      {
        "liters": 10000,
        "note": "Capacidad intermedia orientativa cuando hay periodos sin reposición. Verifica litros útiles, dimensiones máximas y si la descarga dispone de medios adecuados."
      },
      {
        "liters": 15000,
        "note": "Reserva nominal mayor a valorar sin dar por supuesta su suficiencia; para proyectos superiores se pueden consultar otras capacidades y familias."
      }
    ],
    "logisticsHeading": "Cómo solicitar un presupuesto para una granja o finca de Segovia",
    "logisticsParagraphs": [
      "Depofibra comercializa depósitos de fabricantes externos y atiende desde Casariche (Sevilla). No dispone de sede, fabricación, almacén ni flota propios en Segovia. Para estudiar una venta deben confirmarse la referencia, el origen real de carga y la disponibilidad del transportista.",
      "Indica municipio y código postal, litros aproximados, uso y tipo de agua, espacio, dimensiones de los accesos y medios de descarga. El transporte estándar no incluye descarga. No se garantizan instalaciones, grúas, fechas ni portes antes de cotizarlo con el proveedor."
    ],
    "faq": [
      {
        "question": "¿Se pueden pedir depósitos de poliéster para una granja en Cuéllar o Cantalejo?",
        "answer": "Podemos estudiar una propuesta según modelo, compatibilidad de uso, código postal y transporte disponible. No anunciamos stock ni ruta garantizada por municipio."
      },
      {
        "question": "¿El depósito está certificado para agua de bebida animal?",
        "answer": "No se presume esa aptitud en todas las referencias. Debe verificarse el uso y la documentación del modelo concreto y las condiciones higiénicas de la instalación."
      },
      {
        "question": "¿Qué capacidad necesito para dos días sin suministro?",
        "answer": "Multiplica el consumo diario medido por los días de reserva y revisa volumen útil y margen operativo. Por ejemplo, 4.000 litros diarios durante dos días requieren al menos 8.000 litros teóricos, sin afirmar que un modelo concreto cumpla el proyecto."
      },
      {
        "question": "¿Qué diferencias hay entre vertical y horizontal con cunas?",
        "answer": "El vertical de superficie requiere base adecuada y altura disponible. El horizontal con cunas precisa espacio longitudinal y apoyos confirmados; ninguno se debe enterrar si el modelo no está diseñado para ello."
      },
      {
        "question": "¿Incluye descarga el transporte a Segovia?",
        "answer": "No por defecto. La descarga debe planificarse con medios seguros y cualquier servicio adicional se confirma antes del presupuesto definitivo."
      }
    ],
    "sourceName": "Junta de Castilla y León — datos de explotaciones ganaderas de porcino",
    "sourceUrl": "https://analisis.datosabiertos.jcyl.es/explore/dataset/explotaciones-ganaderas-de-porcino/",
    "quoteContext": "Consulta de depósito PRFV para Segovia: granja/finca, consumo y uso, litros, municipio/CP, cotas, origen de carga, transporte externo y descarga."
  },
  {
    "slug": "huesca",
    "heroImage": {
      "src": "/images/depositos/vertical-con-patas/deposito-poliester-vertical-con-patas-verde-con-cubierta-solar.webp",
      "alt": "Depósito vertical verde de poliéster elevado sobre apoyos junto a una cubierta con placas solares",
      "productHref": "/depositos/vertical-con-patas/",
      "productLabel": "Comparar verticales con patas"
    },
    "province": "provincia de Huesca",
    "eyebrow": "HUESCA · RESERVA DE AGUA PARA GRANJAS Y REGADÍO",
    "seoTitle": "Depósitos de poliéster para agua en Huesca | Depofibra",
    "metaDescription": "Depósitos de poliéster para granjas y fincas de Huesca. Estudia reserva de agua, modelos verticales y horizontales y transporte por destino.",
    "h1": "Depósitos de poliéster para agua en Huesca",
    "lead": "Si necesitas un depósito PRFV para reserva de agua en una granja o explotación agrícola oscense, consulta formatos y capacidades según consumo, red de suministro y espacio disponible. La propuesta se prepara para el modelo y código postal concretos, no con una tarifa provincial genérica.",
    "regionHeading": "La Litera, Bajo Cinca y Monegros: prever reservas de agua por uso",
    "regionParagraphs": [
      "El Gobierno de Aragón publica estadísticas sobre la distribución territorial de explotaciones ganaderas. Huesca tiene un importante sector agrario y ganadero, pero eso no acredita una cantidad concreta de búsquedas de depósitos ni ausencia de competidores: hay empresas locales que anuncian depósitos de poliéster.",
      "En granjas, el cálculo empieza por el volumen consumido en un intervalo sin aportación. Conviene definir consumo real, posibles interrupciones, calidad del agua requerida, condiciones de limpieza y tratamiento del sistema, sin afirmar que un recipiente PRFV cualquiera cumple las necesidades de agua de bebida animal.",
      "En riego, el depósito puede ayudar a acompasar entradas autorizadas y periodos de uso. Si el espacio en altura es limitado, contrasta vertical base plana con horizontal con cunas; los modelos con patas exigen revisar estructura, estabilidad y cotas, no garantizan por sí solos presión hidráulica."
    ],
    "zoneHeading": "Tres situaciones diferentes en la provincia de Huesca",
    "localCases": [
      {
        "place": "Tamarite de Litera, Binéfar y La Litera",
        "need": "En granjas, concreta consumo de agua, autonomía y limpieza. Una instalación elevada exige revisar apoyo y proyecto; no se presupone aptitud ni presión del sistema solo por la foto."
      },
      {
        "place": "Fraga y Bajo Cinca",
        "need": "Para parcelas de riego, revisa horarios de aportación, litros por sector, posición de tomas y reserva intermedia. El depósito no amplía concesiones de agua."
      },
      {
        "place": "Sariñena, Monegros y entorno de Huesca",
        "need": "En caminos de acceso a fincas, confirma radio de giro, firme, pasos y obstáculos superiores; el transporte y la descarga necesitan planificación según tamaño."
      }
    ],
    "choiceHeading": "Qué depósitos de poliéster comparar para Huesca",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Referencia para almacenamiento parcial o consumo acotado; verifica si los litros útiles cubren la autonomía que se persigue."
      },
      {
        "liters": 10000,
        "note": "Compara esta capacidad con consumos y frecuencia de reposición reales; elige el formato después de medir base, longitud y altura."
      },
      {
        "liters": 15000,
        "note": "Para una reserva superior revisa dimensiones exteriores, condiciones del apoyo y descarga; otras capacidades del catálogo pueden estudiarse por referencia."
      }
    ],
    "logisticsHeading": "Presupuesto y transporte de depósito PRFV a Huesca",
    "logisticsParagraphs": [
      "Atendemos desde Casariche (Sevilla) y trabajamos con fabricantes y transportistas externos. Depofibra no tiene fábrica, almacén o delegación en Huesca. La competencia y la viabilidad del porte se valoran caso a caso; no anunciamos plazos o precios provinciales cerrados.",
      "Antes del presupuesto indica modelo o litros deseados, uso real, municipio y código postal, altura y anchura de accesos, camino de entrada y medios de descarga. El servicio estándar de transporte no incluye descarga salvo que se pacte expresamente."
    ],
    "faq": [
      {
        "question": "¿Podéis estudiar un depósito para una granja de La Litera?",
        "answer": "Sí, podemos evaluar un presupuesto según modelo, uso, documentación, destino y transporte externo. La viabilidad de entrega no se da por confirmada antes de cotizarla."
      },
      {
        "question": "¿Sirve un depósito vertical con patas para dar presión a bebederos?",
        "answer": "No se puede garantizar por ese solo hecho. El proyecto hidráulico debe verificar desnivel disponible, caudal, presión, estructura y compatibilidad del depósito con el agua requerida."
      },
      {
        "question": "¿Qué opción ocupa menos altura, un vertical o un horizontal?",
        "answer": "Depende de las cotas de cada referencia. El horizontal con cunas suele distribuir volumen longitudinalmente, pero requiere apoyos y superficie; hay que medir antes de decidir."
      },
      {
        "question": "¿Hacéis suministro a Fraga o Sariñena con descarga?",
        "answer": "Se puede estudiar destino y transporte según referencia; la descarga no está incluida por defecto y debe contratarse o prepararse por separado."
      },
      {
        "question": "¿Solo hay depósitos de 5.000, 10.000 y 15.000 litros?",
        "answer": "No. Son tres capacidades con ficha individual. Pueden estudiarse otras capacidades y geometrías de las familias del catálogo, sujetas a confirmación."
      }
    ],
    "sourceName": "Gobierno de Aragón — distribución de explotaciones ganaderas",
    "sourceUrl": "https://www.aragon.es/estadisticas-agrarias/ganaderas/distribucion-de-ganaderia",
    "quoteContext": "Consulta de depósito para Huesca: explotación, uso y condiciones de agua, capacidad, CP, modelo, accesos, transporte de tercero y descarga."
  },
  {
    "slug": "teruel",
    "heroImage": {
      "src": "/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-lateral.webp",
      "alt": "Depósito horizontal verde de poliéster con cunas de apoyo visto de lado",
      "productHref": "/depositos/horizontal-con-cunas/",
      "productLabel": "Ver horizontales con cunas"
    },
    "province": "provincia de Teruel",
    "eyebrow": "TERUEL · DEPÓSITOS DE RESERVA PARA FINCAS Y GANADERÍA",
    "seoTitle": "Depósitos de agua de poliéster en Teruel | Depofibra",
    "metaDescription": "Depósitos PRFV para agua y riego en Teruel. Compara formatos para fincas y granjas, capacidades y condiciones de transporte y descarga.",
    "h1": "Depósitos de poliéster para agua en Teruel",
    "lead": "¿Necesitas almacenar agua en una finca, explotación ganadera o instalación agrícola de Teruel? Estudia depósitos verticales y horizontales de poliéster según autonomía, espacio y accesos. Las medidas, usos admitidos y entrega se confirman antes de presupuestar.",
    "regionHeading": "Reserva de agua para explotaciones del Bajo Aragón y el interior turolense",
    "regionParagraphs": [
      "Las estadísticas agrarias del Gobierno de Aragón registran actividad agrícola y ganadera en Teruel. En unas explotaciones la prioridad puede ser una reserva ante cortes de suministro; en otras, equilibrar periodos de llenado y necesidades de riego. Ninguna de esas actividades demuestra cuántos clientes comprarán depósitos ni sustituye comprobar el precio puesto en destino.",
      "Un depósito horizontal con cunas puede estudiarse donde la altura de instalación resulte restrictiva, siempre que el suelo y los apoyos sean adecuados. Un vertical de base plana puede resolver otras configuraciones; la comparación exige diámetro, altura, longitud y peso de una referencia concreta.",
      "Si el destino es riego agrícola, diferencia consumo de la instalación y suministro legal disponible. Si el agua se destina a ganadería, solicita compatibilidad y documentación del modelo; no des por supuesta la idoneidad para bebida animal o almacenamiento químico."
    ],
    "zoneHeading": "Qué revisar al recibir un depósito en diferentes comarcas de Teruel",
    "localCases": [
      {
        "place": "Alcañiz, Calanda y Bajo Aragón",
        "need": "Para una explotación con riego, calcula litros entre llenados y revisa acometidas y puntos de distribución. En la entrega comprueba caminos y espacio para descargar."
      },
      {
        "place": "Valderrobres, Matarraña y Maestrazgo",
        "need": "En instalaciones con accesos sinuosos o pendientes, determina antes las dimensiones máximas del camión, el giro disponible y la plataforma de descarga."
      },
      {
        "place": "Calamocha, Jiloca y entorno de Teruel",
        "need": "Para naves y explotaciones ganaderas compara altura, longitud y bases disponibles; consulta la compatibilidad del líquido y las conexiones necesarias para el uso concreto."
      }
    ],
    "choiceHeading": "Elegir geometría y litros del depósito para Teruel",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Ejemplo de referencia para necesidades pequeñas o parciales; calcula horas o días de reserva con el consumo de la instalación."
      },
      {
        "liters": 10000,
        "note": "Capacidad a estudiar para reserva intermedia; puede ser necesario contrastar vertical y horizontal por accesos y altura libre."
      },
      {
        "liters": 15000,
        "note": "Referente para necesidades mayores: confirma peso en vacío, longitud/diámetro, acceso y tipo de descarga antes de cotizar."
      }
    ],
    "logisticsHeading": "Cómo preparar el precio de un depósito con destino Teruel",
    "logisticsParagraphs": [
      "Depofibra comercializa referencias PRFV de fabricantes externos, atendiendo desde Casariche (Sevilla), sin delegación, fábrica ni flota propia anunciadas en Teruel. El punto real de carga y la ruta dependen del producto y del proveedor; no prometemos tarifa o entrega urgente uniforme.",
      "Facilita uso, formato, volumen, código postal, anchura de portones, trazado de acceso y medios previstos de recepción. El transporte estándar no incorpora descarga. Si la referencia precisa un servicio especial, su coste y viabilidad se confirman por escrito."
    ],
    "faq": [
      {
        "question": "¿Hay depósitos de poliéster con entrega a Alcañiz o Calanda?",
        "answer": "Podemos estudiar un presupuesto para esos destinos sujeto a referencia, origen de carga y transporte confirmados. No anunciamos entrega fija ni stock local."
      },
      {
        "question": "¿Qué depósito conviene donde hay poca altura libre?",
        "answer": "Conviene comparar las cotas exteriores reales de un horizontal con cunas y las de un vertical; el primero necesita longitud y apoyos suficientes."
      },
      {
        "question": "¿Un depósito horizontal con cunas se puede enterrar?",
        "answer": "No por ser horizontal. Para enterramiento hace falta un modelo específicamente diseñado para ese uso y respetar sus condiciones de instalación."
      },
      {
        "question": "¿Sirven estos depósitos para agua de bebida animal o fertilizantes?",
        "answer": "No se debe generalizar. Hay que verificar la compatibilidad del modelo con el líquido y, cuando proceda, su documentación técnica."
      },
      {
        "question": "¿El transporte hasta Teruel incluye descarga y colocación?",
        "answer": "No. La descarga no está incluida por defecto y la colocación o instalación requieren condiciones y presupuesto separados."
      }
    ],
    "sourceName": "Gobierno de Aragón — estadísticas agrarias y ganaderas",
    "sourceUrl": "https://www.aragon.es/estadisticas-agrarias",
    "quoteContext": "Consulta depósito PRFV para Teruel: tipo de finca, uso, capacidad, municipio/CP, dimensiones/accesos, origen transporte y descarga."
  },
  {
    "slug": "cuenca",
    "heroImage": {
      "src": "/images/depositos/horizontal-enterrable/deposito-poliester-horizontal-enterrable-gris-lateral-cielo.webp",
      "alt": "Depósito horizontal gris de poliéster visto de lado, con cielo azul de fondo",
      "productHref": "/depositos/horizontal-enterrable/",
      "productLabel": "Comparar enterrables"
    },
    "province": "provincia de Cuenca",
    "eyebrow": "CUENCA · DEPÓSITOS PARA RESERVA DE AGUA Y RIEGO",
    "seoTitle": "Depósitos de poliéster para agua en Cuenca | Depofibra",
    "metaDescription": "Consulta depósitos PRFV para agua de riego en Cuenca y La Manchuela. Compara verticales, horizontales y enterrables y pide presupuesto según destino.",
    "h1": "Depósitos de poliéster para agua en Cuenca",
    "lead": "Si necesitas un depósito de poliéster para almacenar agua en una finca de Cuenca, podemos estudiar distintas geometrías y capacidades según los litros de reserva, el uso compatible y la ubicación. No se presuponen una dotación de agua, una instalación completa ni un precio de transporte para toda la provincia.",
    "regionHeading": "La Manchuela conquense: proyecto de riego y planificación de la reserva",
    "regionParagraphs": [
      "El Gobierno de Castilla-La Mancha informó en julio de 2026 sobre el desarrollo de propuestas de regadío en La Manchuela y la solicitud de concesión presentada por una asociación de regantes. Se trata de un contexto agrario documentado: una solicitud o proyecto no acredita que cada finca tenga agua concedida ni que exista demanda mensurable de depósitos.",
      "Si un cultivo recibe aportaciones de agua en periodos concretos, conviene calcular la reserva entre entregas con los caudales y derechos efectivos, sin atribuir al depósito capacidad para aumentar la disponibilidad legal del recurso. Para otras instalaciones, puede ser más importante el espacio, la altura o la posibilidad de situar una referencia apropiada bajo tierra.",
      "Un horizontal enterrable y uno con cunas para superficie son productos diferentes. Antes de aconsejar un aljibe enterrado hay que revisar compatibilidad del líquido, resistencia y condiciones de excavación y relleno del modelo. También existen verticales de base plana para instalaciones de superficie."
    ],
    "zoneHeading": "Cuatro preguntas según la zona de entrega de Cuenca",
    "localCases": [
      {
        "place": "Quintanar del Rey e Iniesta",
        "need": "En explotaciones de La Manchuela, diferencia necesidades estimadas de riego de un suministro autorizado. Estudia consumo por ciclos, frecuencia efectiva de llenado y conexión a la red."
      },
      {
        "place": "Motilla del Palancar y Graja de Iniesta",
        "need": "Si el depósito se colocará en una parcela, revisa camino, zona de descarga, anchura libre y espacio de apoyo. La distancia no determina por sí sola el porte."
      },
      {
        "place": "Tarancón, Cuenca capital y entorno",
        "need": "Para naves o instalaciones con limitación de superficie, indica si se requiere depósito vertical, horizontal de superficie o enterrable específico y aporta las cotas máximas."
      }
    ],
    "choiceHeading": "Comparar depósitos PRFV para Cuenca sin limitarse a una capacidad",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Una referencia para reservas parciales: determina el consumo entre reposiciones y comprueba dimensiones y volumen útil."
      },
      {
        "liters": 10000,
        "note": "Punto de comparación para necesidades intermedias; contrasta si encaja mejor un modelo vertical u horizontal según apoyo y altura."
      },
      {
        "liters": 15000,
        "note": "Reserva nominal mayor que exige revisar accesos y descarga. Otras capacidades del catálogo se consultan por familia y referencia."
      }
    ],
    "logisticsHeading": "Transporte y presupuesto de un depósito para Cuenca",
    "logisticsParagraphs": [
      "Depofibra comercializa productos PRFV de fabricantes externos y atiende desde Casariche (Sevilla), sin anunciar fábrica, almacén o delegación en Cuenca. El precio y viabilidad del transporte dependen del producto, su lugar real de carga y el destino exacto.",
      "Indica municipio, código postal, uso y capacidad, superficie o enterramiento, accesibilidad del camión, cotas disponibles y descarga prevista. El transporte estándar no incluye descarga; tampoco se presupone excavación, instalación ni obtención de permisos."
    ],
    "faq": [
      {
        "question": "¿Podéis estudiar un depósito para Iniesta o Quintanar del Rey?",
        "answer": "Podemos valorar producto y transporte externo según referencia, uso y código postal. La entrega, la disponibilidad y el importe deben confirmarse antes de ofrecer condiciones."
      },
      {
        "question": "¿Un depósito para riego garantiza agua disponible en La Manchuela?",
        "answer": "No. El depósito almacena agua que debe proceder de una fuente y aprovechamiento autorizados. Las concesiones y restricciones no cambian por instalar una reserva."
      },
      {
        "question": "¿Qué diferencia hay entre aljibe enterrable y horizontal con cunas?",
        "answer": "El enterrable exige diseño y condiciones de instalación específicos. El horizontal con cunas está previsto para superficie y no debe enterrarse por similitud de forma."
      },
      {
        "question": "¿Qué información necesitáis para calcular la reserva?",
        "answer": "Consumo por hora o jornada, intervalos y caudal de reposición, volumen útil requerido, finalidad del agua y espacio disponible. Con ello se puede estudiar una capacidad nominal adecuada."
      },
      {
        "question": "¿El transporte a Cuenca incluye descarga, excavación o instalación?",
        "answer": "No por defecto. Son operaciones diferentes que necesitan cotización y organización, y el transporte estándar no incorpora descarga salvo acuerdo expreso."
      }
    ],
    "sourceName": "Gobierno de Castilla-La Mancha — propuesta de regadío en La Manchuela (julio de 2026)",
    "sourceUrl": "https://www.castillalamancha.es/actualidad/notasdeprensa/el-gobierno-regional-muestra-su-apoyo-al-desarrollo-del-regadio-en-la-manchuela",
    "quoteContext": "Consulta de depósito PRFV para Cuenca: municipio/CP, uso y origen autorizado del agua, capacidad, formato, accesos, transporte y descarga."
  },
  {
    "slug": "avila",
    "heroImage": {
      "src": "/images/depositos/vertical-con-patas/deposito-poliester-vertical-con-patas-verde-con-estructura-metalica.webp",
      "alt": "Depósito verde de poliéster instalado sobre una estructura metálica de soporte",
      "productHref": "/depositos/vertical-con-patas/",
      "productLabel": "Ver depósitos con patas"
    },
    "province": "provincia de Ávila",
    "eyebrow": "ÁVILA · AGUA DE RESERVA PARA GRANJAS Y FINCAS",
    "seoTitle": "Depósitos de poliéster en Ávila para agua | Depofibra",
    "metaDescription": "Depósitos PRFV para fincas, riego y explotaciones ganaderas de Ávila. Consulta modelos de 100 a 60.000 L según referencia y transporte por destino.",
    "h1": "Depósitos de poliéster para agua en Ávila",
    "lead": "Si buscas un depósito de poliéster para una granja, finca o instalación agrícola de Ávila, podemos estudiar formatos de superficie y enterrables según el uso y las medidas disponibles. Trabajamos con distintas capacidades de 100 a 60.000 litros en el conjunto del catálogo, sujetas a la familia y referencia. El transporte se calcula para el destino real.",
    "regionHeading": "Ávila: autonomía de agua para fincas y explotaciones ganaderas",
    "regionParagraphs": [
      "Los datos públicos de la Junta de Castilla y León documentan explotaciones de porcino y bovino en la provincia. El entorno de Arévalo y Madrigal de las Altas Torres constituye una zona agraria y ganadera donde puede ser relevante planificar el almacenamiento de agua, pero la existencia de explotaciones no demuestra un volumen de búsquedas ni ausencia de distribuidores.",
      "En una granja, el cálculo útil comienza por el consumo durante una jornada y el número de días que debe cubrir la reserva si se interrumpe el suministro. No es lo mismo agua destinada a limpiar una instalación que agua de bebida animal: hay que comprobar por referencia la compatibilidad y la documentación técnica que exija ese uso. No se afirma la aptitud de todos los modelos para agua de consumo.",
      "Para una finca con riego, el volumen depende de los caudales disponibles y autorizados, turnos de suministro y litros que necesita la instalación entre aportaciones. Un depósito no modifica concesiones, caudales legales ni derechos de uso. El formato horizontal puede ser interesante si falta altura libre; uno vertical exige comprobar base, altura y maniobras de descarga."
    ],
    "zoneHeading": "Situaciones concretas de Ávila que conviene distinguir",
    "localCases": [
      {
        "place": "Arévalo, Madrigal de las Altas Torres y La Moraña",
        "need": "Para instalaciones porcinas o parcelas agrícolas, indica consumo, frecuencia de llenado y autonomía deseada. Si necesitas un depósito elevado, revisa soporte y estabilidad con un técnico; la foto no acredita presión ni estructura adecuadas."
      },
      {
        "place": "Ávila capital, Muñana y entorno rural",
        "need": "Antes de elegir diámetro y altura, mide el portón, el paso del camión y la superficie de apoyo. Una reserva de agua útil requiere definir volumen y conexiones, no elegir solo por litros nominales."
      },
      {
        "place": "El Barco de Ávila, Piedrahíta y Sierra de Gredos",
        "need": "En fincas ganaderas o lugares con accesos de montaña, confirma firme, pendientes, curvas y obstáculos altos. La ruta del transportista, el punto de descarga y las cotas máximas pueden condicionar el formato ofertable."
      }
    ],
    "choiceHeading": "Capacidades y geometrías para instalaciones de Ávila",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Una capacidad nominal que puede estudiarse para reservas parciales, sin presuponer autonomía suficiente."
      },
      {
        "liters": 10000,
        "note": "Referencia intermedia a contrastar con consumo, duración de la reserva y espacio disponible."
      },
      {
        "liters": 15000,
        "note": "Una de las capacidades posibles; para otras necesidades se estudian más tamaños y tipos de depósito."
      }
    ],
    "logisticsHeading": "Presupuesto de depósito con destino Ávila: modelo, acceso y descarga",
    "logisticsParagraphs": [
      "Depofibra comercializa depósitos PRFV de fabricantes externos y atiende desde Casariche (Sevilla). No tiene sede, fábrica, almacén ni flota propia en Ávila. No todos los tamaños existen en todas las familias, y los costes y viabilidad del transporte se confirman según producto, origen real de carga, código postal y accesos.",
      "Para estudiar una operación indica uso y tipo de agua, capacidad aproximada, municipio/CP, dimensiones o restricciones del paso, espacio disponible, accesos y medios para recibir el depósito. El transporte estándar no incluye descarga salvo acuerdo específico: los medios de descarga deben prepararse o presupuestarse por separado. No se garantizan fechas, montaje, stock ni aptitud técnica antes de verificar la referencia."
    ],
    "faq": [
      {
        "question": "¿Puedo pedir presupuesto para una granja de Arévalo o Madrigal de las Altas Torres?",
        "answer": "Sí, se puede estudiar una oferta según el modelo y su aptitud para el uso, la capacidad, código postal y transporte externo. No se presupone disponibilidad o entrega confirmada antes de consultar al proveedor."
      },
      {
        "question": "¿Tenéis depósitos entre 100 y 60.000 litros?",
        "answer": "Es el rango general de capacidades con el que trabaja Depofibra según familia y modelo, no una lista de todos los tamaños disponibles en todos los formatos. Consulta la referencia que necesitas."
      },
      {
        "question": "¿Qué depósito sirve para agua de bebida de animales?",
        "answer": "No puede afirmarse para todas las referencias. Hay que comprobar la compatibilidad del líquido, la documentación del fabricante y los requisitos higiénicos de la instalación por modelo y destino."
      },
      {
        "question": "¿Es adecuado elevar un depósito con patas para alimentar bebederos?",
        "answer": "La presión, la estabilidad, el peso y las cargas se calculan para la instalación concreta; tener patas no garantiza presión suficiente ni sustituye un proyecto técnico."
      },
      {
        "question": "¿El transporte a Ávila incluye descarga?",
        "answer": "No por defecto. El servicio estándar de transporte no incluye descarga. El acceso y los medios de manipulación deben confirmarse al presupuestar."
      }
    ],
    "sourceName": "Junta de Castilla y León — explotaciones ganaderas de porcino",
    "sourceUrl": "https://analisis.datosabiertos.jcyl.es/explore/dataset/explotaciones-ganaderas-de-porcino/",
    "quoteContext": "Consulta depósito de poliéster Ávila: granja, finca o riego, uso y líquido, litros nominales y necesarios, modelo, CP, origen de carga, accesos y descarga externa."
  },
  {
    "slug": "salamanca",
    "heroImage": {
      "src": "/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-izado-grua.webp",
      "alt": "Depósito vertical blanco de poliéster durante una maniobra de izado con grúa",
      "productHref": "/depositos/vertical-base-plana/",
      "productLabel": "Ver depósitos verticales"
    },
    "province": "provincia de Salamanca",
    "eyebrow": "SALAMANCA · RESERVA DE AGUA EN RIEGO Y GANADERÍA",
    "seoTitle": "Depósitos de poliéster en Salamanca para agua | Depofibra",
    "metaDescription": "Depósitos PRFV para riego y fincas de Salamanca: La Armuña, Peñaranda y otras comarcas. Compara tipos y solicita presupuesto según modelo y CP.",
    "h1": "Depósitos de poliéster para agua en Salamanca",
    "lead": "Para una parcela de regadío, una explotación ganadera o una finca de Salamanca, puedes comparar depósitos PRFV verticales, horizontales y modelos de enterramiento. El catálogo global trabaja capacidades de 100 a 60.000 litros según familia y modelo. La elección y el transporte deben estudiarse con las condiciones del destino concreto.",
    "regionHeading": "La Armuña: la reserva se dimensiona según aportaciones reales",
    "regionParagraphs": [
      "La zona de La Armuña cuenta con actuaciones documentadas de transformación de regadío y con comunidades de regantes identificadas por la Administración. Un proyecto de regadío no significa que todas las fincas dispongan de una dotación de agua concedida ni que cada explotación necesite un depósito. La capacidad se estima según el suministro efectivamente autorizado y los consumos de la instalación.",
      "En cultivos agrícolas, un depósito de reserva puede estudiarse para acompasar turnos de entrada y consumos por sectores. Antes de pedir presupuesto conviene calcular litros entre reposiciones, caudal disponible y altura o presión de salida requeridas. Un depósito por sí solo no aporta derechos de extracción ni garantiza presión hidráulica en la red.",
      "En explotaciones ganaderas de Salamanca, las necesidades de reserva dependen del número y tipo de animales, el consumo real, la frecuencia de suministro y el uso concreto del agua. La aptitud para bebida animal y las conexiones no se generalizan: el modelo debe verificarse con su documentación y la instalación debe cumplir las condiciones correspondientes."
    ],
    "zoneHeading": "Tres escenarios distintos para un depósito en Salamanca",
    "localCases": [
      {
        "place": "Cantalpino, Villaflores y La Armuña",
        "need": "En regadío por turnos, indica la dotación efectiva, frecuencia de aportación y consumo por sector. Confirma base de apoyo y espacio de maniobra; el depósito no debe dimensionarse por hectáreas sin datos de caudal."
      },
      {
        "place": "Peñaranda de Bracamonte y Campo de Peñaranda",
        "need": "Para fincas agrícolas y naves ganaderas, revisa tomas, periodicidad de llenado, capacidad útil y acceso desde la carretera. Un horizontal puede requerir más longitud; un vertical precisa altura disponible."
      },
      {
        "place": "Ciudad Rodrigo, Campo Charro y oeste de la provincia",
        "need": "En explotaciones extensivas conviene detallar autonomía, usos del agua y distancia al punto de descarga. Hay proveedores regionales activos; se cotiza por referencia, transporte y acceso sin prometer una ventaja de precio general."
      }
    ],
    "choiceHeading": "Cómo elegir el tipo y la capacidad del depósito para Salamanca",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Volumen nominal de ejemplo para reserva acotada, no garantía de consumo o autonomía."
      },
      {
        "liters": 10000,
        "note": "Otra referencia para comparar con necesidades reales y cotas máximas del espacio."
      },
      {
        "liters": 15000,
        "note": "Capacidad de comparación, junto con otras referencias de la gama según formato y producto."
      }
    ],
    "logisticsHeading": "Condiciones para estudiar un suministro a Salamanca",
    "logisticsParagraphs": [
      "Depofibra es comercializadora de productos PRFV de fabricantes externos, con atención desde Casariche (Sevilla). No tiene fábrica, delegación, almacén ni flota propia en Salamanca. Existen proveedores de material de riego y depósitos en la provincia; por tanto, no afirmamos ausencia de competencia ni precio inferior.",
      "El presupuesto depende de la referencia, el origen efectivo de carga, la localidad y CP de destino, dimensiones y ruta, altura libre y medios de descarga. El transporte estándar no incluye descarga salvo condición expresamente confirmada. Los modelos para enterramiento, agua potable u otros usos especiales requieren su propia documentación, no una aptitud genérica."
    ],
    "faq": [
      {
        "question": "¿Podéis estudiar un depósito para una finca de La Armuña o Peñaranda?",
        "answer": "Podemos estudiar una propuesta sujeta al modelo, uso permitido, capacidad requerida, origen de carga y transporte externo al código postal. No garantizamos entregas ni stock local."
      },
      {
        "question": "¿Una parcela de regadío necesita obligatoriamente un depósito?",
        "answer": "No necesariamente. Depende del suministro autorizado, del calendario de aportaciones, del consumo por sectores y de la configuración hidráulica de la finca."
      },
      {
        "question": "¿Qué capacidades trabaja Depofibra?",
        "answer": "El catálogo comercial contempla capacidades desde 100 hasta 60.000 litros según tipo y referencia, no solamente las fichas de 5.000, 10.000 o 15.000 litros."
      },
      {
        "question": "¿Puedo enterrar un horizontal con cunas para ahorrar espacio?",
        "answer": "No. Un horizontal con cunas para superficie no equivale a un depósito enterrable. Si se necesita enterrar, hay que elegir una referencia específicamente diseñada para ello y seguir sus instrucciones."
      },
      {
        "question": "¿Incluís la descarga del depósito en Salamanca?",
        "answer": "No en el transporte estándar. Se confirma la ruta, accesos, tamaño del vehículo y equipo necesario para descargar antes de acordar el presupuesto."
      }
    ],
    "sourceName": "Junta de Castilla y León — actuaciones de regadío en La Armuña",
    "sourceUrl": "https://analisis.datosabiertos.jcyl.es/explore/dataset/expropiaciones-forzosas-en-materia-de-desarrollo-rural/?flg=es-es",
    "quoteContext": "Consulta depósito PRFV para Salamanca: finca/ganadería, uso, suministro de agua autorizado, capacidad, comarca, CP, acceso del transporte y descarga a organizar."
  },

  {
    "slug": "malaga",
    "heroImage": {
      "src": "/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-extremo.webp",
      "alt": "Depósito horizontal verde de poliéster con cunas visto desde un extremo; imagen representativa de la familia, no entrega en Málaga",
      "productHref": "/depositos/vertical-base-plana/",
      "productLabel": "Ver depósitos de base plana"
    },
    "province": "provincia de Málaga",
    "eyebrow": "MÁLAGA · DEPÓSITOS PRFV PARA FINCAS Y RIEGO",
    "seoTitle": "Depósitos de poliéster en Málaga para riego | Depofibra",
    "metaDescription": "Depósitos de poliéster para agua y riego en Málaga. Compara 5.000, 10.000 y 15.000 L, tipos de apoyo, accesos y transporte según el municipio.",
    "h1": "Depósitos de agua de poliéster en Málaga",
    "lead": "Si necesitas un depósito de agua para una finca en Málaga, Depofibra puede estudiar referencias de poliéster reforzado con fibra de vidrio (PRFV) de fabricantes externos. Compara formatos y capacidades según el uso del agua, los turnos de suministro, el espacio y el acceso al punto de entrega. No anunciamos almacén, fábrica ni reparto propio en la provincia.",
    "regionHeading": "Fincas y riego de Málaga: la reserva se elige según el suministro real",
    "regionParagraphs": [
      "El Sistema de Información Geográfica de Regadíos de la Junta de Andalucía documenta diversidad de zonas de riego, modalidades y orígenes de agua. Esa información ayuda a contextualizar la necesidad agrícola, pero no demuestra que cualquier finca de Málaga tenga derecho de agua ni que necesite un depósito. La capacidad debe calcularse con la dotación autorizada, el consumo y el calendario efectivos de cada explotación.",
      "Para almacenar agua de riego, no es suficiente comparar el precio por litro. Conviene revisar el volumen útil, los periodos entre aportaciones, las conexiones con la instalación existente y las dimensiones exteriores. El almacenamiento no garantiza presión en goteo ni mejora el caudal de un pozo; la hidráulica de riego la debe dimensionar el técnico responsable.",
      "Los depósitos verticales de base plana constituyen una familia prioritaria, con fichas de 5.000, 10.000 y 15.000 litros y más capacidades documentadas. También hay horizontales para superficie y enterrables expresamente diseñados. Un modelo de superficie no debe enterrarse por el mero hecho de ser de poliéster."
    ],
    "zoneHeading": "Tres situaciones diferentes antes de solicitar presupuesto",
    "localCases": [
      {
        "place": "Axarquía y este de Málaga",
        "need": "En parcelas de riego, indica origen autorizado del agua, volumen entre turnos y acceso a la ubicación. Si la parcela está en ladera, confirma pendientes, firme y espacios de maniobra del vehículo de transporte."
      },
      {
        "place": "Valle del Guadalhorce y entorno de Málaga",
        "need": "Para instalaciones con riego sectorizado, prepara consumo por sector, horario de aportación, conexiones y espacio de apoyo. Comprueba portones, restricciones de altura y dónde se realizaría la descarga."
      },
      {
        "place": "Antequera, campiña e interior",
        "need": "En fincas de olivar u otros cultivos, el tamaño no se decide por hectáreas sino por consumo y reposiciones. Si se trata de olivar, consulta además nuestra guía específica de reserva para riego por goteo."
      }
    ],
    "choiceHeading": "Qué capacidades de depósitos de agua comparar en Málaga",
    "capacityNotes": [
      {
        "liters": 5000,
        "note": "Capacidad de referencia para reservas acotadas o parciales; valida litros reales entre turnos, modelo y dimensiones antes de elegir."
      },
      {
        "liters": 10000,
        "note": "Interesa compararla si el consumo y el intervalo de reposición requieren más volumen; comprueba diámetro, altura, base y accesos."
      },
      {
        "liters": 15000,
        "note": "Para estudiar necesidades de reserva mayores, valora espacio, volumen útil, conexión, peso de servicio y los medios de descarga."
      }
    ],
    "logisticsHeading": "Entrega de un depósito en Málaga: ruta, accesos y descarga",
    "logisticsParagraphs": [
      "Depofibra es una comercializadora con atención desde Casariche (Sevilla), no una fábrica ni una tienda con sede en Málaga. El lugar de carga depende del fabricante y del producto. Podemos estudiar operaciones con transporte externo según ruta, dimensiones del depósito, acceso y viabilidad comercial; no anunciamos disponibilidad inmediata ni un precio o plazo uniforme para toda la provincia.",
      "Indica el municipio, código postal, modelo/capacidad, líquido, anchura y altura libres, pendientes, firme del camino y medios para descargar. La modalidad estándar de transporte NO incluye descarga, y la excavación o la instalación no se presuponen como servicio contratado. El uso para agua potable, productos químicos o enterramiento requiere confirmación documental de la referencia exacta."
    ],
    "faq": [
      {
        "question": "¿Tenéis fábrica o almacén de depósitos de poliéster en Málaga?",
        "answer": "No anunciamos instalaciones propias en Málaga. Depofibra comercializa desde Casariche (Sevilla) referencias de fabricantes externos y estudia el suministro al destino que indiques."
      },
      {
        "question": "¿Cuánto cuesta un depósito de 10.000 litros entregado en Málaga?",
        "answer": "No existe una tarifa única válida para todos los modelos y destinos. Hay que confirmar variante, geometría, entradas y salidas, origen de carga, código postal y medios de descarga antes de elaborar una oferta actualizada."
      },
      {
        "question": "¿Qué depósito elegir para riego de olivar en Antequera o la campiña?",
        "answer": "La elección depende del agua disponible y autorizada, consumo real entre turnos, emplazamiento y accesos. Se pueden comparar verticales de base plana y horizontales según referencia; el hecho de cultivar olivar no determina una capacidad universal."
      },
      {
        "question": "¿Puedo enterrar un depósito horizontal de superficie?",
        "answer": "No. Solo deben enterrarse referencias expresamente diseñadas y validadas para las condiciones del terreno, nivel freático y cargas del proyecto."
      },
      {
        "question": "¿El transporte hasta la Axarquía o Guadalhorce incluye descarga?",
        "answer": "El porte estándar no incluye descarga. Deben confirmarse el acceso del camión, la maniobra, el equipo para descargar y cualquier servicio adicional antes de cerrar el presupuesto."
      }
    ],
    "sourceName": "Junta de Andalucía — Sistema de Información Geográfica de Regadíos",
    "sourceUrl": "https://www.juntadeandalucia.es/organismos/agriculturapescaaguaydesarrollorural/areas/infraestructuras-agrarias/regadios/paginas/sig-regadios.html",
    "quoteContext": "Consulta depósito de poliéster para Málaga: capacidad y uso, finca o instalación, origen autorizado del agua, municipio y CP, accesos, modelo y descarga a coordinar."
  }
];
