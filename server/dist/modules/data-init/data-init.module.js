"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataInitModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const typeorm_3 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const rbac_module_1 = require("../rbac/rbac.module");
const rbac_service_1 = require("../rbac/rbac.service");
const env_1 = require("../../config/env");
let DataInitModule = class DataInitModule {
    constructor(userRepository, rbacService) {
        this.userRepository = userRepository;
        this.rbacService = rbacService;
    }
    async onModuleInit() {
        const existing = await this.userRepository.findOne({ where: { username: 'admin' } });
        if (existing)
            return;
        const passwordHash = await bcrypt.hash('admin123', 10);
        const admin = this.userRepository.create({
            id: (0, uuid_1.v4)(),
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
};
exports.DataInitModule = DataInitModule;
exports.DataInitModule = DataInitModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: env_1.env.jwt.secret,
                signOptions: { expiresIn: env_1.env.jwt.expiresIn },
            }),
            rbac_module_1.RbacModule,
        ],
    }),
    __param(0, (0, typeorm_3.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rbac_service_1.RbacService])
], DataInitModule);
//# sourceMappingURL=data-init.module.js.map