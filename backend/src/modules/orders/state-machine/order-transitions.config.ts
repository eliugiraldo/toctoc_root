import { OrderStatus } from '../enums/order-status.enum';

// Definición de transiciones válidas para órdenes
export const ORDER_TRANSITIONS = [
  // De PENDING a otros estados
  { from: OrderStatus.PENDING, to: OrderStatus.CONFIRMED },
  { from: OrderStatus.PENDING, to: OrderStatus.CANCELLED },
  
  // De CONFIRMED a otros estados
  { from: OrderStatus.CONFIRMED, to: OrderStatus.PREPARING },
  { from: OrderStatus.CONFIRMED, to: OrderStatus.CANCELLED },
  
  // De PREPARING a otros estados
  { from: OrderStatus.PREPARING, to: OrderStatus.READY },
  { from: OrderStatus.PREPARING, to: OrderStatus.CANCELLED },
  
  // De READY a otros estados
  { from: OrderStatus.READY, to: OrderStatus.IN_TRANSIT },
  { from: OrderStatus.READY, to: OrderStatus.CANCELLED },
  
  // De IN_TRANSIT a otros estados
  { from: OrderStatus.IN_TRANSIT, to: OrderStatus.DELIVERED },
  { from: OrderStatus.IN_TRANSIT, to: OrderStatus.CANCELLED },
  
  // Estados finales (no se pueden cambiar)
  { from: OrderStatus.DELIVERED, to: OrderStatus.DELIVERED },
  { from: OrderStatus.CANCELLED, to: OrderStatus.CANCELLED },
];

// Estados que no permiten transiciones posteriores
export const FINAL_STATES = [
  OrderStatus.DELIVERED,
  OrderStatus.CANCELLED
];