/**
 * Códigos de estado personalizados (ej: para logs o métricas)
 */
export const HTTP_STATUS = {
  INVALID_CREDENTIALS: 401001,
  PAYMENT_REQUIRED: 402001,
  ORDER_NOT_FOUND: 404001,
} as const;