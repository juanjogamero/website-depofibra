/**
 * Landings comerciales por capacidad prioritaria. Las medidas son referencias
 * históricas internas pendientes de confirmación: NO equivalen a una ficha
 * técnica vigente ni a una disponibilidad garantizada.
 * La "frase clave objetivo" se guarda editorialmente; Google no utiliza
 * meta keywords y no se genera esa etiqueta.
 */
export interface CapacityLanding {
  slug: string;
  liters: number;
  cubicMeters: number;
  keyword: string;
  titleSeo: string;
  metaDescription: string;
  h1: string;
  lead: string;
  image: string;
  imageAlt: string;
  decisionTitle: string;
  decisionParagraphs: string[];
  checklist: { title: string; detail: string }[];
  faqs: { question: string; answer: string }[];
}

export const capacityLandings: CapacityLanding[] = [
  {
    slug: '5000-litros', liters: 5000, cubicMeters: 5,
    keyword: 'depósito de agua 5000 litros',
    titleSeo: 'Depósito de agua 5.000 litros en poliéster | Depofibra',
    metaDescription: 'Depósito vertical de poliéster de 5.000 litros para riego. Dos geometrías, opciones de equipamiento y conexiones personalizadas. Consulta presupuesto.',
    h1: 'Depósito de agua de 5.000 litros en poliéster',
    lead: '¿Buscas un depósito de agua de 5.000 litros para riego? Esta capacidad equivale a 5 m³. En la documentación de referencia figuran dos geometrías distintas; antes de elegir hay que comprobar el espacio disponible, el uso y las medidas definitivas con el proveedor.',
    image: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-compacto-escala.webp',
    imageAlt: 'Fotografía representativa de un depósito vertical blanco de poliéster, no identificada con la capacidad exacta de 5.000 litros',
    decisionTitle: 'Dos configuraciones de referencia para 5.000 litros',
    decisionParagraphs: [
      'Para esta capacidad hay anotadas dos parejas de cotas. No son intercambiables: antes de comparar precios hay que confirmar cuál corresponde al modelo que se puede suministrar, la altura real y el espacio de maniobra.',
      'Si tienes un acceso estrecho o una altura máxima de paso, comunícalo desde la primera consulta. La capacidad nominal por sí sola no indica si el depósito podrá entrar o instalarse en tu parcela.',
      'En esta familia se contemplan tapadera superior, rebosadero, medidor de capacidad y anillas de elevación. Puedes consultar colores y la ubicación y diámetro de las conexiones; la configuración exacta y los posibles suplementos deben confirmarse para el modelo elegido.'
    ],
    checklist: [
      { title: 'Medidas de acceso', detail: 'Anchura de portones, altura libre y obstáculos hasta el lugar de entrega.' },
      { title: 'Uso y conexiones', detail: 'Agua de riego u otro líquido; especifica entradas, salidas y uso previsto.' },
      { title: 'Destino', detail: 'Población y código postal para estudiar transporte y medios de descarga.' },
    ],
    faqs: [
      { question: '¿Por qué aparecen dos medidas de 5.000 litros?', answer: 'En la documentación interna constan dos configuraciones de referencia. Antes de ofrecer una unidad concreta hay que verificar las dimensiones y la disponibilidad del modelo con el proveedor.' },
      { question: '¿5.000 litros equivalen a 5 m³?', answer: 'Sí. Es la equivalencia de la capacidad nominal: 1 m³ son 1.000 litros. Las dimensiones exteriores siguen siendo propias de cada modelo.' },
      { question: '¿Se puede enterrar este depósito?', answer: 'No debe enterrarse un modelo vertical de superficie sin documentación específica que lo autorice. Para enterramiento consulta las referencias diseñadas para ese uso.' },
      { question: '¿Cómo pedir precio de un depósito de agua de 5.000 litros?', answer: 'Indica si lo necesitas para riego u otro uso, tu código postal y las limitaciones de acceso. Con estos datos podremos verificar la referencia y preparar un presupuesto de producto y transporte. La descarga no está incluida en el transporte estándar.' },
      { question: '¿Se puede elegir el color y la posición de las conexiones de 5.000 litros?', answer: 'Sí, Depofibra ofrece opciones de colores y permite estudiar entradas y salidas en el diámetro y posición necesarios. Debe confirmarse qué configuración admite cada geometría de 5.000 litros y si tiene suplementos.' },
      { question: '¿Qué elementos de equipamiento se contemplan en los verticales?', answer: 'La oferta comercial contempla tapadera superior, rebosadero, medidor de capacidad y anillas de elevación. Antes del pedido confirmaremos qué elementos y condiciones corresponden a la referencia presupuestada.' },
    ],
  },
  {
    slug: '10000-litros', liters: 10000, cubicMeters: 10,
    keyword: 'depósito de agua 10000 litros',
    titleSeo: 'Depósito de agua 10.000 litros en poliéster | Depofibra',
    metaDescription: 'Depósito vertical de poliéster de 10.000 litros para riego. Medidas orientativas, equipamiento y conexiones configurables. Presupuesto según destino.',
    h1: 'Depósito de agua de 10.000 litros en poliéster',
    lead: 'Depósito vertical de poliéster para almacenar 10.000 litros de agua de riego (10 m³) en superficie. Antes de solicitar presupuesto, comprueba el uso previsto, el espacio para instalarlo, las conexiones y las medidas definitivas del modelo.',
    image: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-blanco-escala-frontal.webp',
    imageAlt: 'Fotografía representativa de un depósito vertical de poliéster blanco con escala, sin atribución a una referencia de 10.000 litros',
    decisionTitle: 'Comprueba dimensiones y necesidades de reserva',
    decisionParagraphs: [
      'El depósito de 10.000 litros es una referencia a estudiar cuando el consumo y la frecuencia de reposición requieren un volumen de 10 m³. No se puede recomendar solo por el tamaño de la finca: conviene conocer el consumo real y la autonomía buscada.',
      'Para preparar el suministro es importante determinar las entradas y salidas, el uso del agua y el sitio exacto de apoyo. Antes de cerrar el presupuesto verificaremos el modelo, las medidas definitivas y el transporte.',
      'Para 10.000 litros se puede estudiar una configuración con tapadera, rebosadero, medidor de capacidad y anillas de elevación. Depofibra ofrece opciones de color y personalización de conexiones en posición y diámetro, sujetas a confirmación técnica y al presupuesto.'
    ],
    checklist: [
      { title: 'Consumo previsto', detail: 'Litros que necesitas almacenar y cada cuánto puedes reponer el agua.' },
      { title: 'Espacio y conexiones', detail: 'Diámetro, cota total, superficie de apoyo y posición de bocas necesarias.' },
      { title: 'Acceso de entrega', detail: 'Código postal, camino y medios disponibles para descargar con seguridad.' },
    ],
    faqs: [
      { question: '¿Qué es importante confirmar en un depósito de 10.000 litros?', answer: 'El modelo concreto, las dimensiones totales, las conexiones incluidas, el uso compatible y la logística hasta el punto de entrega.' },
      { question: '¿Se suministra con las conexiones ya decididas?', answer: 'La configuración de entradas y salidas depende de la referencia y del pedido; hay que concretarla y confirmarla con el proveedor antes de presupuestar.' },
      { question: '¿La entrega incluye la descarga?', answer: 'El transporte estándar no incluye la descarga salvo acuerdo expreso. Los medios adecuados de descarga deben preverse antes de la llegada.' },
      { question: '¿Cuánto cuesta un depósito de agua de 10.000 litros?', answer: 'El precio depende del modelo disponible, su configuración y el transporte hasta el código postal de entrega. No ofrecemos un precio único sin verificar estos datos. Puedes solicitar un presupuesto indicando capacidad, uso y localidad.' },
      { question: '¿Se puede pedir el depósito de 10.000 litros con tomas a medida?', answer: 'Podemos estudiar la posición y el diámetro de las entradas y salidas para la instalación prevista. El proveedor debe confirmar su viabilidad técnica, equipamiento y posibles suplementos antes de cerrar el presupuesto.' },
      { question: '¿Qué equipamiento se ofrece en los depósitos verticales de 10.000 litros?', answer: 'En la oferta comercial de la familia se contemplan tapa superior, rebosadero, medidor de capacidad y anillas. Los detalles de cada accesorio, las opciones de color y las condiciones de garantía deben confirmarse para el modelo propuesto.' },
    ],
  },
  {
    slug: '15000-litros', liters: 15000, cubicMeters: 15,
    keyword: 'depósito de agua 15000 litros',
    titleSeo: 'Depósito de agua 15.000 litros en poliéster | Depofibra',
    metaDescription: 'Depósito vertical de poliéster de 15.000 litros para riego. Medidas orientativas, configuración de tomas y entrega según destino. Pide presupuesto.',
    h1: 'Depósito de agua de 15.000 litros en poliéster',
    lead: '¿Necesitas almacenar 15.000 litros de agua para riego? Este depósito vertical de poliéster ofrece una capacidad nominal de 15 m³ para instalación en superficie. La altura, la base de apoyo y los accesos deben verificarse para el modelo concreto antes de preparar la entrega.',
    image: '/images/depositos/vertical-base-plana/deposito-poliester-vertical-base-plana-verde-escala-en-exterior.webp',
    imageAlt: 'Depósito vertical verde de poliéster con escala de nivel, fotografía de familia que no identifica una capacidad concreta',
    decisionTitle: 'Planifica el espacio y la logística antes de comprar',
    decisionParagraphs: [
      'Una reserva de 15.000 litros puede exigir una planificación logística distinta de la de capacidades menores. La altura y los accesos deben contrastarse con las medidas confirmadas del depósito y con los medios de descarga disponibles.',
      'Antes de aceptar un presupuesto conviene confirmar la ubicación de las conexiones, la superficie de apoyo, el modelo que ofrece el fabricante y cómo se realizará la entrega. El transporte se estudia según dimensiones y destino.',
      'La oferta de esta familia contempla tapa superior, rebosadero, medidor de capacidad y anillas de elevación, con opciones de color y conexiones configurables. Para 15.000 litros es especialmente importante verificar las anillas y el procedimiento de izado del modelo concreto; su presencia no implica descarga incluida.'
    ],
    checklist: [
      { title: 'Altura libre', detail: 'Espacio disponible para la unidad y elementos superiores, una vez confirmadas las medidas finales.' },
      { title: 'Condiciones de apoyo', detail: 'Base y situación de instalación que deberán ajustarse a la documentación del modelo.' },
      { title: 'Maniobra de descarga', detail: 'Comprobar accesos y coordinar grúa u otros medios apropiados cuando sean necesarios.' },
    ],
    faqs: [
      { question: '¿Son definitivas las medidas del depósito de 15.000 litros?', answer: 'No. Mostramos las cotas recogidas en una tabla de referencia, pero deben contrastarse las dimensiones exteriores y el modelo vigente antes de la oferta.' },
      { question: '¿La descarga viene incluida al pedir 15.000 litros?', answer: 'No se considera incluida en el transporte estándar. Se deben confirmar medios y condiciones de descarga para el destino.' },
      { question: '¿Puede utilizarse para agua potable?', answer: 'Solo cuando la referencia concreta dispone de aptitud acreditada y documentación exigible para el uso de consumo humano. No debe presuponerse por ser de poliéster.' },
      { question: '¿Cómo solicitar presupuesto de un depósito de agua de 15.000 litros?', answer: 'Indica el uso del depósito, el lugar de entrega y los accesos para el vehículo y la descarga. Confirmaremos modelo, medidas, disponibilidad y transporte antes de facilitar una propuesta económica.' },
      { question: '¿Las anillas del depósito de 15.000 litros permiten descargarlo sin grúa?', answer: 'Las anillas se contemplan en el equipamiento, pero su uso requiere seguir las instrucciones de elevación del fabricante. No sustituyen la comprobación del peso, los medios necesarios ni la coordinación de descarga en destino.' },
      { question: '¿Puedo personalizar el color y las entradas de un depósito de 15.000 litros?', answer: 'Se pueden estudiar colores de la gama y conexiones en posiciones y diámetros adecuados a la instalación. Su disponibilidad técnica y posibles suplementos se confirman en la referencia presupuestada.' },
    ],
  },
];

export const getCapacityLanding = (slug: string) => capacityLandings.find(item => item.slug === slug);
