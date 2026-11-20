/**
 * Textos de opiniones que el propietario ha proporcionado directamente.
 * No se atribuyen nombres, fechas, estrellas, plataformas ni verificación
 * externa si esos datos no han sido facilitados.
 * La autorización individual y procedencia original siguen pendientes de archivo.
 * Sin Review/AggregateRating JSON-LD de valoraciones autorreferidas.
 */
export interface CustomerReview {
  id: string;
  text: string;
  author?: string;
  date?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  sourceLabel?: string;
  sourceUrl?: string;
}

// Textos recibidos del propietario el 20/11/2026; conservar literalmente.
export const publishedCustomerReviews: ReadonlyArray<CustomerReview> = [
  {
    id: 'opinion-1',
    text: 'Nos han dado un servicio de 10 super atentos y el chico super amable con toda la gestión.'
  },
  {
    id: 'opinion-2',
    text: 'Hemos recibido el pedido del depósito y la fosa y todo perfecto desde que lo pedimos hasta la entrega, la calidad nos ha encantado.'
  },
  {
    id: 'opinion-3',
    text: 'Super atentos en todo momento y nos han guiado perfectamente en todo lo que necesitabamos'
  }
];
