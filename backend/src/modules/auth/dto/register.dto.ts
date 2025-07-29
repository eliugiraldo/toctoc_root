import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { Roles, Role } from '@shared/constants'; // ✅ Importación corregida

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsEnum(Roles)    // ✅ Validación con Roles
  role?: Role;      // ✅ Tipo Role en lugar de UserRole
}