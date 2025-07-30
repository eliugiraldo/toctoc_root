// src/modules/auth/strategies/jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@core/config/config.service';
import { UsersService } from '@modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    // Obtener el secreto primero
    const jwtSecret = configService.get('JWT_SECRET');
    
    // Llamar a super() inmediatamente
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret || 'default-secret-key-change-in-production' // Fallback temporal
    });

    // Validación después de super()
    if (!jwtSecret) {
      this.logger.error('JWT_SECRET is not defined in configuration');
      throw new Error('JWT_SECRET is required but not configured');
    }
  }

  async validate(payload: any) {
    this.logger.log(`Validating user with ID: ${payload.sub}`);
    
    try {
      // 👇 Esto inyecta el usuario completo en request.user
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user) {
        this.logger.warn(`User not found with ID: ${payload.sub}`);
        return null; // Passport manejará esto como autenticación fallida
      }
      
      this.logger.log(`User validated successfully: ${user.email || user.id}`);
      return user;
    } catch (error) {
      this.logger.error(`Error validating user ${payload.sub}: ${error.message}`, error.stack);
      throw error;
    }
  }
}