import { DataSource } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { User } from '../../modules/users/entities/user.entity';
import { Role, ScopeType } from '../../modules/rbac/entities/role.entity';

export class InitialDataSeed {
  async run(dataSource: DataSource) {
    const roleRepository = dataSource.getRepository(Role);
    const userRepository = dataSource.getRepository(User);

    const roles: Array<{ code: string; name: string; scopeType: ScopeType }> = [
      { code: 'admin', name: '系统管理员', scopeType: 'global' },
      { code: 'exam_admin', name: '考务管理员', scopeType: 'exam' },
      { code: 'site_leader', name: '考点负责人', scopeType: 'site' },
      { code: 'staff', name: '工作人员', scopeType: 'site' },
    ];

    for (const roleData of roles) {
      const existing = await roleRepository.findOne({ where: { code: roleData.code } });
      if (!existing) {
        const role = roleRepository.create({
          id: uuidv4(),
          ...roleData,
        });
        await roleRepository.save(role);
      }
    }

    const adminExists = await userRepository.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const admin = userRepository.create({
        id: uuidv4(),
        username: 'admin',
        passwordHash: await bcrypt.hash('admin123', 10),
        realName: '系统管理员',
        status: 'active',
      });
      await userRepository.save(admin);
    }

    const testUserExists = await userRepository.findOne({ where: { username: 'testuser' } });
    if (!testUserExists) {
      const testUser = userRepository.create({
        id: uuidv4(),
        username: 'testuser',
        passwordHash: await bcrypt.hash('test123', 10),
        realName: '测试用户',
        phone: '13800138000',
        status: 'active',
      });
      await userRepository.save(testUser);
    }
  }
}