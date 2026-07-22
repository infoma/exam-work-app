import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('api/users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((u) => ({
      id: u.id,
      username: u.username,
      realName: u.realName,
      phone: u.phone,
      orgId: u.orgId,
      status: u.status,
      createdAt: u.createdAt,
    }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return {
      id: user.id,
      username: user.username,
      realName: user.realName,
      phone: user.phone,
      orgId: user.orgId,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Post()
  async create(@Body() data: Partial<User>) {
    const user = await this.usersService.create(data);
    return {
      id: user.id,
      username: user.username,
      realName: user.realName,
      phone: user.phone,
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<User>) {
    const user = await this.usersService.update(id, data);
    return {
      id: user.id,
      username: user.username,
      realName: user.realName,
      phone: user.phone,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { success: true };
  }
}