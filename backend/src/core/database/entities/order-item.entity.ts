import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';


@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column({ name: 'final_price', type: 'numeric', precision: 10, scale: 2 })
  finalPrice: number;

  @Column({ name: 'selected_options', type: 'jsonb', nullable: true })
  selectedOptions: any;

  @Column({ name: 'special_notes', nullable: true })
  specialNotes: string;
}