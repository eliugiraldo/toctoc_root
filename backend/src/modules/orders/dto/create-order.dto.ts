import { IsUUID, IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentType } from '@modules/payments/enums/payment-type.enum';

export class CreateOrderItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsUUID()
  customerId: string;

  @IsUUID()
  restaurantId: string;

  @IsUUID()
  pickupLocationId: string;

  @IsUUID()
  deliveryLocationId: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber()
  total: number;

  @IsEnum(PaymentType)
  @IsOptional()
  paymentMethod?: PaymentType;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}