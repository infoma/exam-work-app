import { Module, OnModuleInit } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { RbacModule } from '../rbac/rbac.module';
import { RbacService } from '../rbac/rbac.service';
import { env } from '../../config/env';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: env.jwt.secret,
      signOptions: { expiresIn: env.jwt.expiresIn },
    }),
    RbacModule,
  ],
})
export class DataInitModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private rbacService: RbacService,
  ) {}

  async onModuleInit() {
    const existing = await this.userRepository.findOne({ where: { username: 'admin' } });
    if (existing) return;

    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = this.userRepository.create({
      id: uuidv4(),
      username: 'admin',
      passwordHash,
      realName: '系统管理员',
      status: 'active',
    });
    await this.userRepository.save(admin);

    const roles = await this.rbacService.getAllRoles();
    const adminRole = roles.find(r => r.code === 'admin');
    if (adminRole) {
      await this.rbacService.assignRole(admin.id, adminRole.id);
    }
  }
}