import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '@core/database/entities/user.entity';
import { Restaurant } from '@core/database/entities/restaurant.entity';
import { LocationType } from '../../../modules/geo/locations/enums/location-type.enum';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.locations, { nullable: true })
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.locations, { nullable: true })
  restaurant: Restaurant;

  @Column()
  address: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326
  })
  coordinates: { type: 'Point'; coordinates: [number, number] };

  @Column({
    type: 'enum',
    enum: LocationType
  })
  type: LocationType;

  @Column({ name: 'is_primary', default: false })
  isPrimary: boolean;

  @Column({ type: 'jsonb', nullable: true })
  details: any;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}