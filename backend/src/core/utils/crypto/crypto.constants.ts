/**
 * Constantes criptográficas BÁSICAS para Fase 0
 * Sin referencias a casos de uso específicos
 * Solo valores genéricos para funciones criptográficas básicas
 */

export const CRYPTO_CONSTANTS = {
  /**
   * Longitud predeterminada para cadenas aleatorias
   */
  DEFAULT_RANDOM_STRING_LENGTH: 32,
  
  /**
   * Algoritmo predeterminado para hashing básico
   */
  DEFAULT_HASH_ALGORITHM: 'sha256',
  
  /**
   * Longitud mínima para contraseñas (solo para validación básica en Fase 0)
   */
  MIN_PASSWORD_LENGTH: 8,
} as const;