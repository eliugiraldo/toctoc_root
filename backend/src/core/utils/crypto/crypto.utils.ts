import * as crypto from 'crypto';

/**
 * Utilidades criptográficas básicas para Fase 0
 * - Solo funciones esqueléticas
 * - Sin implementación real de hashing de contraseñas
 * - Usando crypto nativo de Node.js
 * - Preparado para evolución en Fase 2
 */

/**
 * Genera una cadena aleatoria (solo para uso temporal en Fase 0)
 * En Fase 2 se implementará con bcrypt
 * @param length - Longitud de la cadena (por defecto 32)
 * @returns Cadena aleatoria en formato hex
 */
export const generateRandomString = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Función esquelética para hashing (sin implementación real)
 * En Fase 2 se reemplazará con bcrypt
 * @param input - Texto a "hashear"
 * @returns Hash simulado
 */
export const hashString = (input: string): string => {
  // Solo para Fase 0 - NO usar en producción
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
};

/**
 * Función esquelética para comparar hashes (sin implementación real)
 * En Fase 2 se reemplazará con bcrypt.compare
 * @param input - Texto a comparar
 * @param hashedValue - Valor hasheado
 * @returns Siempre true en Fase 0
 */
export const compareHash = (input: string, hashedValue: string): boolean => {
  // Solo para Fase 0 - NO usar en producción
  return hashString(input) === hashedValue;
};