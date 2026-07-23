"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialDataSeed = void 0;
const uuid_1 = require("uuid");
const bcrypt = require("bcryptjs");
const user_entity_1 = require("../../modules/users/entities/user.entity");
const role_entity_1 = require("../../modules/rbac/entities/role.entity");
class InitialDataSeed {
    async run(dataSource) {
        const roleRepository = dataSource.getRepository(role_entity_1.Role);
        const userRepository = dataSource.getRepository(user_entity_1.User);
        const roles = [
            { code: 'admin', name: '系统管理员', scopeType: 'global' },
            { code: 'exam_admin', name: '考务管理员', scopeType: 'exam' },
            { code: 'site_leader', name: '考点负责人', scopeType: 'site' },
            { code: 'staff', name: '工作人员', scopeType: 'site' },
        ];
        for (const roleData of roles) {
            const existing = await roleRepository.findOne({ where: { code: roleData.code } });
            if (!existing) {
                const role = roleRepository.create({
                    id: (0, uuid_1.v4)(),
                    ...roleData,
                });
                await roleRepository.save(role);
            }
        }
        const adminExists = await userRepository.findOne({ where: { username: 'admin' } });
        if (!adminExists) {
            const admin = userRepository.create({
                id: (0, uuid_1.v4)(),
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
                id: (0, uuid_1.v4)(),
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
exports.InitialDataSeed = InitialDataSeed;
//# sourceMappingURL=initial-data.seed.js.map