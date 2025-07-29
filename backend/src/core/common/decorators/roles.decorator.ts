// src/core/common/decorators/roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@shared/constants';

/**
 * Define roles permitidos para un endpoint
 * Ejemplo: @Roles(Roles.ADMIN, Roles.RESTAURANT_OWNER)
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);