import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
// Código original comentado - NO PERTENECE A FASE 0
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from './core/config/config.module';
import { LoggerService } from '@core/utils/logs/logger.service';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule, // ✅ ÚNICA configuración de TypeORM ahora está aquí
    RestaurantsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'GLOBAL_LOGGER',
      useClass: LoggerService,
    }
  ],
  exports: ['GLOBAL_LOGGER']
})
export class AppModule {}

NOTA: El código original pertenece a fases posteriores:
- ConfigModule: Fase 21 (Documentación y Pruebas)
- DatabaseModule: Fase 1 (Modelo de Datos y Base de Datos)
- RestaurantsModule, OrdersModule, UsersModule, AuthModule: Fases 4-6 (Gestión de Restaurantes, Órdenes, Usuarios y Autenticación)
- LoggerService: Fase 22 (Seguridad y Auditoría)

En Fase 0, el módulo raíz debe ser mínimo, sin lógica de negocio ni módulos adicionales.
*/