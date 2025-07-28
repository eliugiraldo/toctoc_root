import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../core/common/dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Líneas viejas (comentadas):
  // async findAll(paginationDto: PaginationDto): Promise<User[]> {
  //   const { limit, offset } = paginationDto;
  //   return this.userRepository.find({
  //     skip: offset,
  //     take: limit,
  //   });
  // }
  
  // Líneas nuevas:
  async findAll(paginationDto: PaginationDto): Promise<User[]> {
    const { limit = 10, page = 1, offset } = paginationDto;
    // Si offset está definido, lo usamos directamente. Si no, calculamos desde page
    const skip = offset !== undefined ? offset : (page - 1) * limit;
    return this.userRepository.find({
      skip,
      take: limit,
    });
  }

  // Líneas viejas (comentadas):
  // async findOne(id: string): Promise<User> {
  //   return this.userRepository.findOne({ where: { id } });
  // }
  
  // Líneas nuevas:
  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Líneas viejas (comentadas):
  // async findByEmail(email: string): Promise<User | undefined> {
  //   return this.userRepository.findOne({ where: { email } });
  // }
  
  // Líneas nuevas:
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || undefined; // Convierte null a undefined explícitamente
  }

  // Líneas viejas (comentadas):
  // async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
  //   await this.userRepository.update(id, updateUserDto);
  //   return this.findOne(id);
  // }
  
  // Líneas nuevas:
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  // Líneas viejas (comentadas):
  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
  
  // Líneas nuevas:
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // Métodos adicionales que puedes implementar según necesites
  async getUserRestaurants(id: string): Promise<any[]> {
    // Implementa la lógica para obtener restaurantes del usuario
    return [];
  }

  async getUserOrders(id: string): Promise<any[]> {
    // Implementa la lógica para obtener órdenes del usuario
    return [];
  }
}