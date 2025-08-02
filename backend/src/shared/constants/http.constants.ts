/**
 * Códigos de estado HTTP ESTÁNDAR (RFC 7231)
 * Solo códigos oficiales de 3 dígitos
 * Sin códigos personalizados ni mensajes específicos
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

// Tipo para usar en TypeScript
export type HttpStatusCode = typeof HTTP_STATUS[keyof typeof HTTP_STATUS];