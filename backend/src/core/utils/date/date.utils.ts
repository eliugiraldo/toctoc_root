// src/core/utils/date/date.utils.ts
import { DateTime } from 'luxon';

const DEFAULT_TIMEZONE = 'UTC';

/**
 * Convierte Date a ISO string con validación
 */
export const toIsoString = (date: Date): string => {
  const iso = DateTime.fromJSDate(date).toUTC().toISO();
  if (!iso) {
    throw new Error(`Invalid date conversion: ${date}`);
  }
  return iso;
};

/**
 * Convierte ISO string a Date con zona horaria
 */
export const fromIsoString = (
  isoString: string,
  timezone: string = DEFAULT_TIMEZONE,
): Date => {
  const date = DateTime.fromISO(isoString, { zone: timezone }).toJSDate();
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid ISO string: ${isoString}`);
  }
  return date;
};

/**
 * Obtiene fecha actual en zona horaria específica
 */
export const nowInTimezone = (timezone: string = DEFAULT_TIMEZONE): Date => {
  const date = DateTime.now().setZone(timezone).toJSDate();
  if (isNaN(date.getTime())) {
    throw new Error(`Invalid timezone: ${timezone}`);
  }
  return date;
};