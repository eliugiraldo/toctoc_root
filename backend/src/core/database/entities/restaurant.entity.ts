import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { Location } from './location.entity';
import { Review } from './review.entity';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string;

  @Column('text', { array: true, nullable: true })
  cuisineType: string[];

  @Column({ type: 'numeric', precision: 3, scale: 1, default: 0.0 })
  rating: number;

  @Column({ default: true })
  active: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Relación con productos (asumiendo que existe módulo products)
  @OneToMany(() => Product, (product) => product.restaurant)
  products: Product[];

  // Relación con pedidos
  @OneToMany(() => Order, (order) => order.restaurant)
  orders: Order[];

  // Relación con ubicaciones (asumiendo que Location está en geo/locations)
  @OneToMany(() => Location, (location) => location.restaurant)
  locations: Location[];

  // Relación con reseñas
  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];
}