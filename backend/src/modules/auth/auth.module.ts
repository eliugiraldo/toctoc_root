import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- Añadir estas importaciones
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({ // <-- Cambiar a registerAsync
      imports: [ConfigModule], // <-- Importar ConfigModule
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // <-- Usar ConfigService
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') // <-- Usar variable de entorno
        },
      }),
      inject: [ConfigService], // <-- Inyectar ConfigService
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}