/**
 * Opiniones de clientes publicadas en Home.
 *
 * Nunca inventar autorías, compras, estrellas, fechas, fuentes ni la etiqueta
 * "verificada". Antes de añadir una opinión, conservar prueba de su origen y
 * consentimiento de publicación fuera de este repositorio público.
 * No añadir Review/AggregateRating JSON-LD a la Home: Depofibra se evalúa a sí
 * misma y Google no permite estrellas enriquecidas para ese caso.
 */
export interface CustomerReview {
  id: string;
  author: string;
  date: string; // ISO, fecha acreditada de publicación/recepción
  text: string;
  sourceLabel: string;
  sourceUrl?: string; // Enlace original, solo si realmente existe
  rating?: 1 | 2 | 3 | 4 | 5;
  consentConfirmed: true;
  sourceVerified: true;
}

// No se han acreditado testimonios públicos a fecha 20/11/2026.
export const publishedCustomerReviews: ReadonlyArray<CustomerReview> = [];
