import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './modules/restaurants/restaurants.module'; // Módulo de restaurantes
import { OrdersModule } from '@modules/orders/orders.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module'; // Configuración de DB

@Module({
  imports: [
    TypeOrmModule.forRoot(), // Configuración global de TypeORM
    DatabaseModule, // Si tienes configuración personalizada de DB
    RestaurantsModule, // Módulo de restaurantes (incluye Product)
    OrdersModule, // Módulo de órdenes (depende de RestaurantsModule)
    UsersModule, // Módulo de usuarios
    AuthModule, // Si aplica
    // ...otros módulos (geo, payments, etc.)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}