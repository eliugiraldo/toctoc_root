import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { User } from '../../../core/database/entities/user.entity';
import { generateRandomString } from '@core/utils/crypto/crypto.utils';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  /**
   * Valida un usuario (implementación temporal para Fase 0)
   * En Fase 2 se implementará con bcrypt
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    // En Fase 0, la validación es temporal/simple
    // En Fase 2 se reemplazará con bcrypt.compare
    return password === 'temporal123' ? user : null;
  }

  /**
   * Genera un token de acceso temporal (Fase 0)
   * En Fase 2 se implementará con JWT real
   */
  async login(user: User) {
    return {
      access_token: generateRandomString(64),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }

  /**
   * Registra un nuevo usuario (sin hashing real en Fase 0)
   * En Fase 2 se implementará con bcrypt
   */
  async register(registerDto: any) {
    const user = await this.usersService.create({
      ...registerDto,
      passwordHash: 'temporal_hash'
    });
    return this.login(user);
  }
}