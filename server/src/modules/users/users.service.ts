import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find({ where: { deletedAt: null } });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id, deletedAt: null } });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return user;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username, deletedAt: null } });
  }

  async create(data: Partial<User>) {
    const user = this.userRepository.create({
      id: uuidv4(),
      ...data,
      passwordHash: data.passwordHash || (await bcrypt.hash('123456', 10)),
    });
    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.findOne(id);
    if (data.passwordHash) {
      data.passwordHash = await bcrypt.hash(data.passwordHash, 10);
    }
    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.softRemove(user);
  }
}