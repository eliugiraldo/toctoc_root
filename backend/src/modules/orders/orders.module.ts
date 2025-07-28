// LÍNEA NUEVA:
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '@core/database/entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderStateMachineService } from './state-machine/order-state-machine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderStateMachineService],
  exports: [OrdersService, OrderStateMachineService],
})
export class OrdersModule {}