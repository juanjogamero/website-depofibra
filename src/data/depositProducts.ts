/**
 * Depofibra · fichas de familias de depósitos.
 * Datos editoriales públicos, sin precios privados, stock, medidas no verificadas ni certificaciones genéricas.
 * Fotografías de referencia organizadas por familia: una portada y una galería por producto.
 */

export type DepositFamily = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  intro: string;
  installation: string;
  geometry: string;
  application: string;
  quoteProduct: string;
  gallery: { src: string; alt: string; kind: 'Fotografía de referencia' | 'Dibujo orientativo' }[];
  titleSeo: string;
  metaDescription: string;
  highlights: { title: string; text: string }[];
  description: string[];
  installationPoints: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  capacityChoices?: { label: string; product: string }[];
};

export const depositFamilies: DepositFamily[] = [
  {
    slug: 'vertical-base-plana',
    name: 'Depósitos verticales de poliéster de base plana',
    shortName: 'Vertical de base plana',
    eyebrow: 'Depósitos · Instalación en superficie',
    intro: 'Depósitos verticales de poliéster (PRFV) de base plana para almacenamiento en superficie. La tabla orientativa de esta familia recoge referencias de 5.000 a 60.000 litros. Compara el volumen, diámetro, base de apoyo, conexiones y transporte; las características y la disponibilidad real se comprueban por modelo antes del presupuesto.',
    installation: 'En superficie',
    geometry: 'Vertical · Base plana',
    application: 'Agua y riego, según referencia',
    quoteProduct: 'Depósito vertical de base plana',
    gallery:[
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-frontal.webp',alt:'Depósito vertical blanco de poliéster con base plana y escala de nivel frontal',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-escala-frontal.webp',alt:'Depósito vertical verde de poliéster de base plana con escala frontal',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-instalado.webp',alt:'Depósito vertical blanco de poliéster con escala sobre una plataforma de obra',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-alto-escala.webp',alt:'Depósito vertical verde de poliéster con escala de nivel sobre base de hormigón',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-compacto-escala.webp',alt:'Depósito vertical blanco compacto con escala de nivel frontal',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-escala-en-exterior.webp',alt:'Depósito vertical verde con escala de nivel instalado en una parcela',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-izado-grua.webp',alt:'Depósito vertical blanco de poliéster suspendido mediante grúa durante una maniobra',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verdes-conjunto-diferentes-tamanos.webp',alt:'Varios depósitos verticales verdes de distintas alturas colocados en línea',kind:'Fotografía de referencia'},
    ],
    titleSeo: 'Depósitos verticales de poliéster base plana | Depofibra',
    metaDescription:'Depósitos verticales de poliéster PRFV para riego, con referencias orientativas de 5.000 a 60.000 L. Compara medidas y solicita presupuesto por destino.',
    highlights:[
      {title:'Amplia variedad de capacidades',text:'La tabla orientativa recoge varias capacidades entre 5.000 y 60.000 litros. Se verifican las dimensiones y la posibilidad real de suministro por modelo.'},
      {title:'Medidas y accesos',text:'Comprueba diámetro exterior, altura total, portones y superficie de apoyo antes del pedido.'},
      {title:'Uso y conexiones',text:'Indica si almacenarás agua de riego u otro líquido. Entradas, salidas y compatibilidad se verifican por modelo.'},
    ],
    description:[
      'Un depósito vertical de poliéster de base plana es una opción para almacenar agua de riego en superficie cuando se dispone de una base adecuada y altura suficiente. A diferencia del formato horizontal, su geometría concentra el volumen en un espacio de apoyo diferente; conviene comparar diámetro y altura, no solo los litros.',
      'Para elegir una capacidad, calcula el consumo previsto y cada cuánto podrás reponer el agua. Las tablas de trabajo incluyen diversos volúmenes, también por encima de 15.000 litros. Después revisa el espacio disponible, las conexiones y el acceso del transporte. Las medidas son orientativas: el modelo y el equipamiento se verifican con el proveedor antes de presupuestar.',
      'En los verticales de base plana se contemplan tapadera superior, rebosadero, medidor de capacidad y anillas de elevación. Depofibra también permite estudiar colores y conexiones en posición y diámetro según la instalación; la configuración definitiva, el refuerzo estructural y cualquier suplemento se concretan por referencia.',
    ],
    installationPoints:[
      {title:'Instalación en superficie',text:'El depósito debe apoyarse sobre una base adecuada al modelo y dejar espacio para acceso y mantenimiento. No es un depósito concebido para enterrar.'},
      {title:'Medidas y recorrido',text:'Contrasta el diámetro y la altura exterior definitivos, así como las puertas, caminos y obstáculos hasta el lugar de instalación.'},
      {title:'Entrega y descarga',text:'Facilita localidad y código postal. La descarga requiere medios adecuados y no está incluida por defecto en el transporte estándar.'},
    ],
    faqs:[
      {q:'¿Qué capacidades puedo consultar en los depósitos verticales de base plana?',a:'Las tablas orientativas de esta familia incluyen referencias desde 5.000 hasta 60.000 litros, con diferentes geometrías. Las fichas individuales de 5.000, 10.000 y 15.000 litros son ejemplos, no el límite del catálogo. Para elegir se revisan consumo, reposiciones, espacio, medidas y disponibilidad real del modelo.'},
      {q:'¿Es adecuado para agua potable?',a:'Solo si la referencia concreta es apta para agua de consumo humano y cuenta con la documentación exigible para ese uso.'},
      {q:'¿Necesito medidas exactas antes de pedir precio?',a:'Para una primera consulta basta con indicar uso, capacidad aproximada, código postal y posibles límites de acceso. Confirmaremos las dimensiones exteriores y las conexiones de la referencia que se presupuestará.'},
      {q:'¿Se puede enterrar un depósito vertical de base plana?',a:'No debe enterrarse un depósito diseñado para superficie sin documentación expresa que autorice ese uso. Consulta las referencias específicamente enterrables para instalaciones bajo tierra.'},
      {q:'¿El presupuesto incluye transporte y descarga?',a:'Podemos estudiar el transporte según el modelo y el lugar de entrega. La descarga no forma parte del transporte estándar salvo que se acuerde y confirme expresamente.'},
      {q:'¿Qué equipamiento y opciones de personalización tienen los verticales de base plana?',a:'La oferta de la familia contempla tapadera, rebosadero, medidor de capacidad y anillas de elevación. Se pueden estudiar colores de la gama y entradas y salidas según diámetro y ubicación solicitados. Cada elemento y posible suplemento se confirman en el presupuesto del modelo concreto.'},
      {q:'¿Los refuerzos y la garantía son iguales en todos los tamaños?',a:'Depofibra comunica refuerzos estructurales mejorados y garantía para esta familia, pero el alcance técnico y las condiciones aplicables deben verificarse por referencia y recogerse por escrito antes del pedido. No se afirma una resistencia superior a la competencia.'},
    ],
    capacityChoices: [
      { label: '5.000 L', product: 'Depósito vertical de base plana 5.000 L' },
      { label: '10.000 L', product: 'Depósito vertical de base plana 10.000 L' },
      { label: '15.000 L', product: 'Depósito vertical de base plana 15.000 L' },
    ],
  },
  {
    slug:'horizontal-con-cunas',
    name:'Depósito horizontal con cunas',
    shortName:'Horizontal con cunas',
    eyebrow:'Depósitos · Instalación en superficie',
    intro:'Depósitos horizontales de poliéster con cunas para instalación en superficie. Compara capacidad, número de apoyos y longitud, y consulta opciones de color y conexiones antes de presupuestar.',
    installation:'En superficie', geometry:'Horizontal · Con apoyos', application:'Almacenamiento según uso',
    quoteProduct:'Depósito horizontal con cunas',
    gallery:[
      {src:'/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-perspectiva.webp',alt:'Depósito horizontal verde de poliéster con apoyos visto en perspectiva',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-lateral.webp',alt:'Depósito horizontal verde con cunas de apoyo visto de lado',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-verde-vista-extremo.webp',alt:'Depósito horizontal verde con cunas de apoyo visto desde un extremo',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-con-cunas/deposito-poliester-horizontal-con-cunas-blanco-en-transporte.webp',alt:'Depósito horizontal blanco con soportes durante el transporte en camión',kind:'Fotografía de referencia'},
    ],
    titleSeo:'Depósitos horizontales de poliéster con cunas | Depofibra',
    metaDescription:'Depósitos horizontales de poliéster con cunas para superficie. Consulta capacidades, apoyos, medidor, colores y conexiones configurables. Presupuesto.',
    highlights:[
      {title:'Formato bajo',text:'Interesante cuando el espacio en altura condiciona la instalación.'},
      {title:'Apoyos específicos',text:'El número y disposición de las cunas se comprueban según modelo.'},
      {title:'Equipamiento configurable',text:'Se contemplan medidor de capacidad, tapadera, rebosadero y anillas, con colores y conexiones según referencia y presupuesto.'},
    ],
    description:[
      'Los depósitos horizontales con cunas se colocan en superficie sobre apoyos adecuados a su geometría. Son una alternativa a los verticales cuando conviene distribuir el volumen de forma longitudinal.',
      'Para seleccionar la referencia conviene conocer la capacidad, la longitud disponible, las conexiones y las condiciones de descarga. Un depósito horizontal de superficie no debe confundirse con un depósito enterrable.',
      'La oferta de horizontales con cunas contempla tapadera superior, rebosadero, medidor de capacidad y anillas de elevación. Es posible estudiar colores, diámetros y posiciones de las entradas y salidas; la inclusión efectiva, el refuerzo y los suplementos se confirman para cada referencia.',
    ],
    installationPoints:[
      {title:'Longitud útil',text:'Revisar el espacio horizontal disponible, las distancias de acceso y las posibles interferencias.'},
      {title:'Cunas y base',text:'Los apoyos deben corresponder al modelo concreto y sus condiciones de instalación.'},
      {title:'Transporte y descarga',text:'Confirmar la llegada del vehículo y los medios de descarga según las dimensiones.'},
    ],
    faqs:[
      {q:'¿Un horizontal con cunas puede enterrarse?',a:'No debe darse por supuesto. Para enterrar un depósito hay que elegir una referencia diseñada expresamente para ese uso.'},
      {q:'¿Las cunas están incluidas?',a:'Los elementos incluidos se confirman al presupuestar la referencia y el conjunto de apoyos correspondiente.'},
      {q:'¿Puedo consultar otra capacidad?',a:'Sí. La capacidad, dimensiones y configuración se verifican según el modelo que se estudie.'},
      {q:'¿Los horizontales con cunas llevan medidor de capacidad?',a:'Según la oferta de Depofibra, esta familia contempla medidor de capacidad junto con tapadera, rebosadero y anillas de elevación. El equipo concreto y su inclusión deben constar en el presupuesto.'},
      {q:'¿Se pueden elegir el color y las conexiones de un horizontal con cunas?',a:'Se ofrecen colores de gama y puede estudiarse la ubicación y el diámetro de las tomas para cada instalación. Es necesario confirmar viabilidad técnica y suplementos con el proveedor.'},
    ],
  },
  {
    slug:'horizontal-enterrable',
    name:'Depósito horizontal enterrable',
    shortName:'Horizontal enterrable',
    eyebrow:'Depósitos · Instalación enterrada',
    intro:'Depósitos horizontales de poliéster diseñados para enterramiento, conocidos en algunas aplicaciones de almacenamiento de agua como aljibes prefabricados de PRFV. Comparten medidas de referencia con los horizontales con cunas, pero son productos distintos: el enterrable exige condiciones de instalación específicas y no lleva medidor de capacidad visible.',
    installation:'Enterrado · Bajo proyecto',geometry:'Horizontal · Enterrable',application:'Agua y otros usos compatibles',
    quoteProduct:'Depósito horizontal para enterrar',
    gallery:[
      {src:'/images/depositos/horizontal-enterrable/deposito-poliester-horizontal-enterrable-gris-registro-lateral.webp',alt:'Depósito horizontal gris de poliéster con registro lateral circular, en superficie',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-enterrable/deposito-poliester-horizontal-enterrable-gris-lateral-cielo.webp',alt:'Vista lateral de depósito horizontal gris de poliéster con cielo azul de fondo',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-enterrable/deposito-poliester-horizontal-enterrable-gris-vista-frontal.webp',alt:'Vista frontal de depósito horizontal gris con boca de acceso superior',kind:'Fotografía de referencia'},
      {src:'/images/depositos/horizontal-enterrable/deposito-poliester-horizontal-enterrable-gris-en-zanja-instalacion.webp',alt:'Depósito horizontal gris colocado en una zanja con boca de acceso superior',kind:'Fotografía de referencia'},
    ],
    titleSeo:'Depósitos horizontales enterrables de poliéster | Depofibra',
    metaDescription:'Aljibes prefabricados de poliéster y depósitos horizontales enterrables. Compara usos, terreno, accesos, conexiones y presupuesto según destino.',
    highlights:[
      {title:'Uso enterrado',text:'La elección debe partir de un modelo diseñado expresamente para enterramiento.'},
      {title:'Terreno y cargas',text:'Condiciones del suelo y profundidad requieren verificación técnica.'},
      {title:'Sin medidor visible',text:'El modelo enterrable no incorpora el medidor externo de capacidad previsto en los modelos de superficie; consulta accesos y conexiones.'},
    ],
    description:[
      'Las referencias enterrables permiten estudiar instalaciones donde no interesa ocupar espacio visible en superficie. No son intercambiables con los depósitos horizontales con cunas.',
      'El terreno, la profundidad, la presencia de agua subterránea y las cargas previstas condicionan la solución. La instalación debe seguir la documentación y las prescripciones técnicas aplicables al modelo.',
      'Según las tablas facilitadas, las referencias enterrables comparten parejas de diámetro y longitud con los horizontales con cunas, pero no son el mismo depósito ni llevan sus apoyos de superficie. En el enterrable no se incluye medidor de capacidad visible. Se estudian tapadera, rebosadero, anillas, colores y conexiones personalizadas según viabilidad técnica de la referencia y las exigencias del enterramiento.',
    ],
    installationPoints:[
      {title:'Comprobar el terreno',text:'Identificar condiciones del suelo, nivel freático y cargas del entorno.'},
      {title:'Revisión técnica',text:'Solicitar la ficha de la referencia y seguir las instrucciones de instalación y relleno.'},
      {title:'Entrega y maniobra',text:'Estudiar cómo accederá el camión y qué medios de descarga se necesitan.'},
    ],
    faqs:[
      {q:'¿Puedo enterrar un depósito horizontal convencional?',a:'No se debe hacer. Solo debe enterrarse una referencia diseñada y validada para ese uso.'},
      {q:'¿Qué diferencia hay entre un aljibe de poliéster y una fosa séptica?',a:'El aljibe se plantea para almacenar agua con el uso permitido por su ficha; una fosa séptica tiene una función de saneamiento y una documentación diferente. No son productos intercambiables ni puede darse por apto cualquier aljibe para agua potable.'},
      {q:'¿El precio incluye excavación e instalación?',a:'No se presuponen esos trabajos. Se concretarán por separado si correspondiese, y siempre según condiciones acordadas.'},
      {q:'¿Es obligatorio un proyecto?',a:'Los requisitos técnicos y administrativos dependen del uso y la instalación. Deben revisarse para cada caso.'},
      {q:'¿Los depósitos horizontales enterrables llevan medidor de capacidad?',a:'No llevan el medidor de capacidad visible que se contempla en los verticales y los horizontales con cunas. La forma de acceso, inspección y mantenimiento debe estudiarse según el modelo y la instalación enterrada.'},
      {q:'¿Tienen las mismas medidas que los horizontales con cunas?',a:'La documentación facilitada recoge las mismas combinaciones de diámetro y longitud, pero no son productos intercambiables. El enterrable debe estar diseñado y validado específicamente para las condiciones del suelo y las cargas del proyecto.'},
      {q:'¿Se pueden personalizar las entradas y salidas de un enterrable?',a:'Se estudian las conexiones en el diámetro y la posición necesarios, pero su viabilidad y estanqueidad deben confirmarse para la referencia y las condiciones de instalación enterrada.'},
    ],
  },
  {
    slug:'vertical-con-patas',
    name:'Depósito vertical con patas',
    shortName:'Vertical con patas',
    eyebrow:'Depósitos · Instalación elevada',
    intro:'Formato vertical con apoyos elevados, para estudiar configuraciones que necesitan una altura o posición de salida concreta.',
    installation:'Superficie · Estructura elevada',geometry:'Vertical · Con patas',application:'Configuración según necesidad',
    quoteProduct:'Depósito vertical con patas',
    gallery:[
      {src:'/images/depositos/vertical-con-patas/deposito-poliester-vertical-con-patas-verde-con-estructura-metalica.webp',alt:'Depósito vertical verde elevado sobre estructura de apoyo metálica azul',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-con-patas/deposito-poliester-vertical-con-patas-verde-con-cubierta-solar.webp',alt:'Depósito vertical verde con patas bajo una cubierta con paneles solares',kind:'Fotografía de referencia'},
      {src:'/images/depositos/vertical-con-patas/deposito-poliester-vertical-con-patas-verde-lateral-con-cubierta.webp',alt:'Vista lateral de depósito vertical verde elevado sobre apoyos metálicos',kind:'Fotografía de referencia'},
    ],
    titleSeo:'Depósitos verticales con patas | Depofibra',
    metaDescription:'Consulta depósitos verticales de poliéster con patas. Configuraciones elevadas, apoyo, instalación y presupuesto según necesidades.',
    highlights:[
      {title:'Altura de instalación',text:'La altura y el tipo de soporte se estudian según las necesidades del proyecto.'},
      {title:'Apoyo y estabilidad',text:'Es necesario revisar la superficie, la estructura y las cargas correspondientes.'},
      {title:'Conexiones',text:'La posición de entradas y salidas se comprueba para cada referencia.'},
    ],
    description:[
      'Los depósitos verticales con patas son una variante de instalación que puede resultar útil cuando la salida del líquido debe situarse a una altura determinada o el proyecto requiere una estructura de apoyo.',
      'No todas las configuraciones usan los mismos soportes ni alcanzan las mismas alturas. Los detalles de la estructura, la capacidad y las conexiones se verifican con el proveedor para cada referencia.',
    ],
    installationPoints:[
      {title:'Base y estructura',text:'Comprobar el soporte necesario y la estabilidad del conjunto.'},
      {title:'Altura disponible',text:'Revisar la altura total de depósito y patas frente a las limitaciones de espacio.'},
      {title:'Montaje y descarga',text:'Planificar el acceso y los medios adecuados para manejar el conjunto.'},
    ],
    faqs:[
      {q:'¿Puedo elegir la altura de las patas?',a:'La altura y el material de los apoyos deben confirmarse con la configuración concreta.'},
      {q:'¿Todos tienen la misma estructura?',a:'No. El sistema de apoyo depende de la referencia, la capacidad y el diseño.'},
      {q:'¿Incluye la instalación?',a:'No se presuponen trabajos de instalación; cualquier condición se confirmaría en el presupuesto.'},
    ],
  },
  {
    slug:'tipo-vaso',
    name:'Depósito de poliéster tipo vaso',
    shortName:'Tipo vaso',
    eyebrow:'Depósitos · Formatos específicos',
    intro:'Una familia distinta de los depósitos cerrados habituales, para estudiar geometrías y usos específicos.',
    installation:'Según modelo',geometry:'Tipo vaso',application:'Usos compatibles por verificar',
    quoteProduct:'Depósito tipo vaso',
    gallery:[
      {src:'/images/depositos/tipo-vaso/deposito-poliester-tipo-vaso-blanco-con-tapa.webp',alt:'Depósito de poliéster tipo vaso blanco con tapa superior circular',kind:'Fotografía de referencia'},
      {src:'/images/depositos/tipo-vaso/deposito-poliester-tipo-vaso-blanco-tronconico-con-tapa.webp',alt:'Depósito tipo vaso blanco de forma troncocónica con tapa',kind:'Fotografía de referencia'},
      {src:'/images/depositos/tipo-vaso/deposito-poliester-tipo-vaso-blancos-vista-interior.webp',alt:'Dos recipientes tipo vaso blancos, uno tumbado para mostrar su interior',kind:'Fotografía de referencia'},
    ],
    titleSeo:'Depósitos tipo vaso de poliéster | Depofibra',
    metaDescription:'Depósitos tipo vaso de poliéster. Consulta configuración, capacidad y condiciones de uso antes de pedir presupuesto.',
    highlights:[
      {title:'Geometría diferente',text:'Su forma se diferencia de las familias verticales y horizontales cerradas.'},
      {title:'Capacidad por definir',text:'Se estudia según el espacio y la referencia del catálogo aplicable.'},
      {title:'Uso compatible',text:'Antes de decidir es necesario conocer qué líquido contendrá y cómo se instalará.'},
    ],
    description:[
      'Los depósitos tipo vaso constituyen una alternativa cuando el proyecto requiere una geometría específica. Su adecuación depende del volumen, la forma y las conexiones solicitadas.',
      'En esta familia no conviene suponer que todos los productos comparten medidas, tapa, accesorios o resistencia. La propuesta se prepara con datos de la referencia concreta.',
    ],
    installationPoints:[
      {title:'Definir uso y líquido',text:'Especificar las condiciones reales de uso para revisar la compatibilidad.'},
      {title:'Espacio disponible',text:'Concretar el hueco, la altura y el tipo de apoyo.'},
      {title:'Accesorios',text:'Consultar entradas, salidas o elementos adicionales antes del presupuesto.'},
    ],
    faqs:[
      {q:'¿Todos los tipo vaso son iguales?',a:'No. La geometría, capacidad y accesorios dependen del modelo.'},
      {q:'¿Puedo elegir una capacidad concreta?',a:'Sí, puedes indicarnos los litros aproximados que necesitas y se revisará qué referencia encaja.'},
      {q:'¿Se pueden utilizar para cualquier líquido?',a:'No debe suponerse. La compatibilidad con el contenido se comprueba expresamente.'},
    ],
  },
  {
    slug:'cuadrados-rectangulares',
    name:'Depósito cuadrado o rectangular',
    shortName:'Cuadrado o rectangular',
    eyebrow:'Depósitos · Aprovechamiento de espacio',
    intro:'Modelos con geometría cuadrada o rectangular para estudiar instalaciones donde el espacio condiciona la elección.',
    installation:'En superficie · Según modelo',geometry:'Cuadrado / rectangular',application:'Almacenamiento compatible',
    quoteProduct:'Depósito cuadrado o rectangular',
    gallery:[
      {src:'/images/depositos/rectangulares/deposito-poliester-rectangulares-blanco-abierto-vista-interior.webp',alt:'Depósito rectangular blanco de poliéster abierto con vista de su interior',kind:'Fotografía de referencia'},
      {src:'/images/depositos/rectangulares/deposito-poliester-rectangulares-blanco-con-junto-circular.webp',alt:'Depósito rectangular blanco de poliéster junto a otro recipiente circular',kind:'Fotografía de referencia'},
    ],
    titleSeo:'Depósitos cuadrados y rectangulares | Depofibra',
    metaDescription:'Depósitos cuadrados y rectangulares de poliéster para espacios condicionados. Consulta modelos, accesorios y presupuesto.',
    highlights:[
      {title:'Geometría definida',text:'Permite estudiar huecos donde una forma cilíndrica no encaja bien.'},
      {title:'Medidas por modelo',text:'Ancho, largo y altura requieren confirmación en la referencia concreta.'},
      {title:'Conexiones',text:'Las tomas y accesorios se revisan según uso y posibilidades de configuración.'},
    ],
    description:[
      'Los depósitos cuadrados y rectangulares se valoran cuando importa aprovechar un espacio con condicionantes geométricos. No todos ofrecen las mismas dimensiones o configuraciones.',
      'Para orientar una consulta es útil conocer las medidas máximas del hueco, la capacidad aproximada, el líquido y el modo de instalación previsto.',
    ],
    installationPoints:[
      {title:'Tomar medidas',text:'Identificar las dimensiones interiores y de acceso al lugar de instalación.'},
      {title:'Base compatible',text:'Comprobar que el apoyo es adecuado para el modelo elegido.'},
      {title:'Entrada y salida',text:'Revisar ubicación y diámetros de conexiones según la configuración.'},
    ],
    faqs:[
      {q:'¿Puedo pedir un depósito rectangular para un hueco exacto?',a:'Puedes enviarnos las dimensiones máximas y estudiaremos las referencias que puedan encajar; no se garantiza fabricación a medida sin confirmación.'},
      {q:'¿Son aptos para cualquier líquido?',a:'La compatibilidad de materiales y la documentación técnica deben verificarse según el contenido.'},
      {q:'¿Puedo solicitar presupuesto con transporte?',a:'Sí. Conviene facilitar destino, acceso y medidas disponibles para valorar la entrega.'},
    ],
  },
];

export const getDepositFamily = (slug: string): DepositFamily | undefined => depositFamilies.find(family => family.slug === slug);
