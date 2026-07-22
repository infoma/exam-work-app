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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existing = await this.userRepository.findOne({ where: { username: dto.username } });
        if (existing) {
            throw new common_1.ConflictException('用户名已存在');
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            id: (0, uuid_1.v4)(),
            username: dto.username,
            passwordHash,
            realName: dto.realName,
            phone: dto.phone,
            orgId: dto.orgId,
        });
        await this.userRepository.save(user);
        return this.login({ username: dto.username, password: dto.password });
    }
    async login(dto) {
        let user = await this.userRepository.findOne({ where: { username: dto.username } });
        if (!user && dto.username === 'admin' && dto.password === 'admin123') {
            const passwordHash = await bcrypt.hash(dto.password, 10);
            user = this.userRepository.create({
                id: (0, uuid_1.v4)(),
                username: dto.username,
                passwordHash,
                realName: '系统管理员',
                status: 'active',
            });
            await this.userRepository.save(user);
        }
        if (!user) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('用户名或密码错误');
        }
        if (user.status !== 'active') {
            throw new common_1.UnauthorizedException('账号已被禁用');
        }
        const payload = { sub: user.id, username: user.username };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                username: user.username,
                realName: user.realName,
                phone: user.phone,
            },
        };
    }
    async validateUser(userId) {
        return this.userRepository.findOne({ where: { id: userId } });
    }
    async getCurrentUser(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('用户不存在');
        }
        return {
            id: user.id,
            username: user.username,
            realName: user.realName,
            phone: user.phone,
            orgId: user.orgId,
            status: user.status,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map