import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from '../../core/database/entities/restaurant.entity';
import { Product } from '../../core/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Product])],
  exports: [TypeOrmModule], // Para que otros módulos (como Orders) puedan usar estas entidades
})
export class RestaurantsModule {}