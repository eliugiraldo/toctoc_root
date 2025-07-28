import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '@core/database/entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { OrderStateMachineService } from './state-machine/order-state-machine.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly stateMachineService: OrderStateMachineService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = this.orderRepository.create({
      ...createOrderDto,
      status: OrderStatus.PENDING, // Por defecto
    });
    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: ['customer', 'restaurant', 'items', 'pickupLocation', 'deliveryLocation']
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'restaurant', 'items', 'pickupLocation', 'deliveryLocation', 'rider']
    });
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    
    // Si se está actualizando el estado, validar la transición
    if (updateOrderDto.status && updateOrderDto.status !== order.status) {
      this.stateMachineService.validateTransition(order.status, updateOrderDto.status);
    }

    // Actualizar propiedades
    Object.assign(order, updateOrderDto);
    
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  async updateStatus(id: string, newStatus: OrderStatus): Promise<Order> {
    const order = await this.findOne(id);
    
    // Validar transición de estado
    this.stateMachineService.validateTransition(order.status, newStatus);
    
    order.status = newStatus;
    return await this.orderRepository.save(order);
  }

  async getAvailableStatusTransitions(id: string): Promise<OrderStatus[]> {
    const order = await this.findOne(id);
    return this.stateMachineService.getAllowedTransitions(order.status);
  }

  async assignRider(orderId: string, riderId: string): Promise<Order> {
    const order = await this.findOne(orderId);
    
    // Validar que la orden esté en un estado que permita asignar rider
    if (order.status !== OrderStatus.READY) {
      throw new BadRequestException(
        'Solo se puede asignar rider a órdenes en estado READY'
      );
    }
    
    // Primero cambiar el estado a IN_TRANSIT
    await this.updateStatus(orderId, OrderStatus.IN_TRANSIT);
    
    // Luego asignar el rider
    order.rider = { id: riderId } as any;
    return await this.orderRepository.save(order);
  }
}