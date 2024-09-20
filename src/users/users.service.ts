/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}

  getHashPassword(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async checkUserExists(id: number): Promise<boolean> {
    const count = await this.usersRepository.count({ where: { id } });
    return count > 0;
  }
  
  async create(createDto: CreateUserDto): Promise<User> {
    const hashPassword = this.getHashPassword(createDto.password);
    
    const user = this.usersRepository.create({
      email: createDto.email,
      password: hashPassword,
      name: createDto.name,
    });
    
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersRepository.update(updateUserDto.id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
