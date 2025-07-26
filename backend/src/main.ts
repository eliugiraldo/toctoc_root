import { resolve } from 'path';
import { register } from 'tsconfig-paths';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Configuración de paths (DEBE estar antes de cualquier import relativa)
register({
  baseUrl: resolve(__dirname, './src'), // Apunta a /backend/src
  paths: {
    '@/*': ['*'], // Para imports absolutos desde src/
    '@modules/*': ['modules/*'], // Para imports de módulos
    '@core/*': ['core/*'], // Para core/ (consistente con tu tsconfig.json)
    '@database/*': ['core/database/*'] // Para entidades y DB
  }
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();