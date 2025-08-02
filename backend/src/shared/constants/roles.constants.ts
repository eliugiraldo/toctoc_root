/**
 * Roles de usuario (usados en @Roles() y guards)
 * ✅ Usa string literals para evitar errores de escritura
 * ✅ Única fuente de verdad para todos los módulos
 * 
 * FASE 0: Solo roles genéricos. No se anticipan roles especializados.
 */
export const Roles = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

// Tipo para usar en TypeScript
export type RoleKey = keyof typeof Roles;
export type RoleValue = typeof Roles[keyof typeof Roles];
export type Role = RoleValue;




// --- CÓDIGO ORIGINAL COMENTADO (para uso en fases posteriores) ---
// 
// export const Roles = {
//   ADMIN: 'admin',
//   RESTAURANT_OWNER: 'restaurant_owner',
//   DELIVERY_PERSON: 'delivery_person',
//   CUSTOMER: 'customer',
//   RESTAURANT: 'restaurant',
//   RIDER: 'rider',
// } as const;
// 
// export type RoleKey = keyof typeof Roles;
// export type RoleValue = typeof Roles[keyof typeof Roles];
// export type Role = RoleValue;
//
// Este conjunto de roles será implementado en la Fase 2 o Fase 3,
// cuando se defina la lógica de autorización por roles especializados.
// Por ahora, Fase 0 solo requiere roles genéricos (USER, ADMIN).