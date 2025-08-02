import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

/*
// Código original comentado - NO PERTENECE A FASE 0
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS } from '@shared/constants/http.constants';
import { LoggerService } from '@core/utils/logs/logger.service';
import { JwtAuthGuard } from '@core/common/guards/jwt-auth.guard';
import { HttpExceptionFilter } from '@core/common/filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 👇 NUEVA CONFIGURACIÓN - ANTES de los guards
  const logger = app.get(LoggerService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      errorHttpStatusCode: HTTP_STATUS.BAD_REQUEST,
      exceptionFactory: (errors) => {
        const messages = errors.map(err => 
          Object.values(err.constraints || {}).join(', ')
        );
        logger.error(`Validation failed: ${messages.join('; ')}`, 'VALIDATION');
        return new BadRequestException({
          statusCode: HTTP_STATUS.BAD_REQUEST,
          error: 'Bad Request',
          message: messages
        });
      }
    })
  );
  // 👇 MANTENER después de los pipes
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  // 👇 Registrar DESPUÉS de los pipes
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

NOTA: El código original pertenece a fases posteriores:
- ValidationPipe avanzado: Fase 21 (Documentación y Pruebas)
- JwtAuthGuard: Fase 2 (Autenticación y Autorización)
- HttpExceptionFilter: Fase 21
- LoggerService: Fase 22 (Seguridad y Auditoría)
- HTTP_STATUS: Fase 21

En Fase 0, main.ts debe ser mínimo, solo creando y ejecutando la aplicación sin configuración avanzada.
*/