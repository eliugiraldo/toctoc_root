import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Restaurant } from './restaurant.entity';
import { Location } from './location.entity';
import { OrderItem } from './order-item.entity';
import { Review } from './review.entity';
import { OrderStatus } from '../../../modules/orders/enums/order-status.enum';
import { PaymentType } from '@modules/payments/enums/payment-type.enum';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'pickup_location' })
  pickupLocation: Location;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'delivery_location' })
  deliveryLocation: Location;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({
    type: 'enum',
    enum: PaymentType,
    name: 'payment_method',
    nullable: true
  })
  paymentMethod: PaymentType;

  @ManyToOne(() => User, (user) => user.deliveries)
  @JoinColumn({ name: 'rider_id' })
  rider: User;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @OneToOne(() => Review, (review) => review.order)
  review: Review;
}