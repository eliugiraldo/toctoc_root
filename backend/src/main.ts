// src/main.ts
import { resolve } from 'path';
import { register } from 'tsconfig-paths';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './core/common/guards/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

// Configuración de paths
register({
  baseUrl: resolve(__dirname, './src'),
  paths: {
    '@/*': ['*'],
    '@modules/*': ['modules/*'],
    '@core/*': ['core/*'],
    '@database/*': ['core/database/*']
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplicar JwtAuthGuard globalmente
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();