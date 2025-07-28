import { OrderStatus } from '../enums/order-status.enum';

export interface OrderStateTransition {
  from: OrderStatus;
  to: OrderStatus;
}

export interface OrderStateValidation {
  isValidTransition(from: OrderStatus, to: OrderStatus): boolean;
  getAllowedTransitions(from: OrderStatus): OrderStatus[];
}