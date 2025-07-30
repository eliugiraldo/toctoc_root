// src/shared/constants/http.constants.ts
/**
 * Códigos HTTP ESTÁNDAR + personalizados
 */
export const HTTP_STATUS = {
  // ESTÁNDARES (RFC 7231)
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,

  // PERSONALIZADOS (para logs/métricas)
  INVALID_CREDENTIALS: 401001,
  PAYMENT_REQUIRED: 402001,
  ORDER_NOT_FOUND: 404001,
} as const;