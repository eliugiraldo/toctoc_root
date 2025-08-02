// src/core/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Define roles permitidos para un endpoint
 * FASE 0: Acepta strings genéricos. No hay validación ni tipado restrictivo.
 * Ejemplo: @Roles('admin', 'user')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);


// --- CÓDIGO ORIGINAL COMENTADO ---
// 
// import { SetMetadata } from '@nestjs/common';
// import { Role } from '@shared/constants';
// 
// export const ROLES_KEY = 'roles';
// 
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
//
// El uso de `Role[]` como tipo pertenece a una fase posterior (Fase 2),
// cuando se implemente el sistema de autorización con validación de roles.
// En Fase 0, el decorador solo debe marcar, no validar.