/** Enlace público de contacto WhatsApp. No incluye datos personales del visitante. */
export const whatsappNumber = '34642129233';
export const whatsappDefaultMessage =
  'Hola, quiero consultar un producto de Depofibra. ¿Me podéis ayudar con el modelo y el transporte a mi localidad?';
export const whatsappContactHref =
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMessage)}`;
