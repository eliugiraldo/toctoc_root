import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { Order } from './order.entity'; 
import { Location } from './location.entity';
import { Review } from './review.entity';
import { Roles, Role } from '@shared/constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ name: 'profile_img', nullable: true })
  profileImg: string;

  @Column({ 
    type: 'enum', 
    enum: Roles,
    default: Roles.CUSTOMER
  })
  role: Role;

  @Column({ 
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true 
  })
  currentLocation: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relaciones
  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  // Nueva relación para deliveries (como rider)
  @OneToMany(() => Order, (order) => order.rider)
  deliveries: Order[];
}