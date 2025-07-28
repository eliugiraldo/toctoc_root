import { Injectable, BadRequestException } from '@nestjs/common';
import { OrderStatus } from '../enums/order-status.enum';
import { ORDER_TRANSITIONS, FINAL_STATES } from './order-transitions.config';
import { OrderStateValidation } from './order-state.interface';

@Injectable()
export class OrderStateMachineService implements OrderStateValidation {
  isValidTransition(from: OrderStatus, to: OrderStatus): boolean {
    // Si el estado actual es final, no se permiten transiciones
    if (FINAL_STATES.includes(from)) {
      return from === to; // Solo se permite mantenerse en el mismo estado final
    }

    // Buscar transición válida
    return ORDER_TRANSITIONS.some(
      transition => transition.from === from && transition.to === to
    );
  }

  getAllowedTransitions(from: OrderStatus): OrderStatus[] {
    // Si el estado es final, solo se permite el mismo estado
    if (FINAL_STATES.includes(from)) {
      return [from];
    }

    return ORDER_TRANSITIONS
      .filter(transition => transition.from === from)
      .map(transition => transition.to);
  }

  validateTransition(from: OrderStatus, to: OrderStatus): void {
    if (!this.isValidTransition(from, to)) {
      throw new BadRequestException(
        `Transición de estado no válida: ${from} -> ${to}`
      );
    }
  }
}