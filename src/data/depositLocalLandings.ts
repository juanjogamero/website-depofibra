/**
 * Landings territoriales para captar intención comercial; el contexto no acredita demanda GSC.
 * No son tiendas/sedes. No se ofrece transporte o aptitud sin confirmación.
 */
export interface DepositLocalLanding {
  slug: 'murcia' | 'valencia' | 'sevilla' | 'palencia' | 'soria';
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
];
