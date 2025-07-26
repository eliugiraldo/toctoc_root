import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';
import { Restaurant } from './restaurant.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @Column({ name: 'restaurant_rating' })
  restaurantRating: number;

  @Column({ name: 'rider_rating', nullable: true })
  riderRating: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}