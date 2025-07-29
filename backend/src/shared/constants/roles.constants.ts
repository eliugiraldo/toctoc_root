/**
 * Roles de usuario (usados en @Roles() y guards)
 * ✅ Usa string literals para evitar errores de escritura
 * ✅ Única fuente de verdad para todos los módulos
 */
export const Roles = {
  ADMIN: 'admin',
  RESTAURANT_OWNER: 'restaurant_owner',
  DELIVERY_PERSON: 'delivery_person',
  CUSTOMER: 'customer',
  RESTAURANT: 'restaurant',
  RIDER: 'rider',
} as const;

// ✅ Tipo para las keys (usado en decoradores)
export type RoleKey = keyof typeof Roles;

// ✅ Tipo para los valores (usado en guards y entidades)
export type RoleValue = typeof Roles[keyof typeof Roles];

// ✅ Tipo principal para uso general (valores reales)
export type Role = RoleValue;