/**
 * Utilidades básicas de fecha para Fase 0
 * - Solo funciones simples usando Date nativo
 * - Sin dependencias externas
 * - Sin zonas horarias complejas
 * - Preparado para evolución en fases posteriores
 */

/**
 * Formatea una fecha a string ISO
 * @param date - Fecha a formatear
 * @returns Fecha en formato ISO string
 */
export const formatDate = (date: Date): string => {
  return date.toISOString();
};

/**
 * Añade días a una fecha
 * @param date - Fecha base
 * @param days - Número de días a añadir (positivo o negativo)
 * @returns Nueva fecha con los días añadidos
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Verifica si una fecha es válida
 * @param date - Fecha a validar
 * @returns true si es válida, false si no
 */
export const isDateValid = (date: Date): boolean => {
  return !isNaN(date.getTime());
};

/**
 * Obtiene la fecha actual
 * @returns Fecha actual
 */
export const getCurrentDate = (): Date => {
  return new Date();
};

/**
 * Calcula la diferencia en días entre dos fechas
 * @param date1 - Primera fecha
 * @param date2 - Segunda fecha
 * @returns Diferencia en días (positiva o negativa)
 */
export const differenceInDays = (date1: Date, date2: Date): number => {
  const oneDay = 24 * 60 * 60 * 1000; // horas*minutos*segundos*milisegundos
  return Math.round((date1.getTime() - date2.getTime()) / oneDay);
};