import { PartialType } from '@nestjs/mapped-types';
// LÍNEA VIEJA:
// import { CreateOrderDto } from './create-order.dto';

// LÍNEA NUEVA:
import { CreateOrderDto } from './create-order.dto';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsOptional()
  @IsUUID()
  riderId?: string;
}