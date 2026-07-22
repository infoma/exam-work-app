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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rbac_guard_1 = require("./rbac.guard");
const permissions_guard_1 = require("./permissions.guard");
const rbac_service_1 = require("./rbac.service");
const rbac_controller_1 = require("./rbac.controller");
const role_entity_1 = require("./entities/role.entity");
const permission_entity_1 = require("./entities/permission.entity");
const user_role_entity_1 = require("./entities/user-role.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
let RbacModule = class RbacModule {
    constructor(rbacService) {
        this.rbacService = rbacService;
    }
    async onModuleInit() {
        await this.rbacService.initDefaultRolesAndPermissions();
    }
};
exports.RbacModule = RbacModule;
exports.RbacModule = RbacModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([role_entity_1.Role, permission_entity_1.Permission, user_role_entity_1.UserRole, role_permission_entity_1.RolePermission])],
        providers: [rbac_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard, rbac_service_1.RbacService],
        controllers: [rbac_controller_1.RbacController],
        exports: [rbac_guard_1.RolesGuard, permissions_guard_1.PermissionsGuard, rbac_service_1.RbacService],
    }),
    __metadata("design:paramtypes", [rbac_service_1.RbacService])
], RbacModule);
//# sourceMappingURL=rbac.module.js.map