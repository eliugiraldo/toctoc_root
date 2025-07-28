import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { OrdersModule } from '@modules/orders/orders.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from './core/config/config.module'; // ✅ Importar TU módulo

@Module({
  imports: [
    ConfigModule, // ✅ Usar tu wrapper en lugar de @nestjs/config directamente
    TypeOrmModule.forRoot(),
    DatabaseModule,
    RestaurantsModule,
    OrdersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}