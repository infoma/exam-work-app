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
exports.SitesController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const sites_service_1 = require("./sites.service");
const create_site_dto_1 = require("./dto/create-site.dto");
const create_room_dto_1 = require("./dto/create-room.dto");
let SitesController = class SitesController {
    constructor(sitesService) {
        this.sitesService = sitesService;
    }
    async create(examId, dto, req) {
        return this.sitesService.create(examId, dto, req.user.userId);
    }
    async findByExam(examId) {
        return this.sitesService.findByExam(examId);
    }
    async findOne(id) {
        return this.sitesService.findOne(id);
    }
    async update(id, dto) {
        return this.sitesService.update(id, dto);
    }
    async delete(id) {
        await this.sitesService.delete(id);
        return { success: true };
    }
    async createRoom(siteId, dto) {
        return this.sitesService.createRoom(siteId, dto);
    }
    async findRooms(siteId) {
        return this.sitesService.findRooms(siteId);
    }
    async updateRoom(id, dto) {
        return this.sitesService.updateRoom(id, dto);
    }
    async deleteRoom(id) {
        await this.sitesService.deleteRoom(id);
        return { success: true };
    }
};
exports.SitesController = SitesController;
__decorate([
    (0, common_1.Post)('exam/:examId'),
    __param(0, (0, common_1.Param)('examId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_site_dto_1.CreateSiteDto, Object]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('exam/:examId'),
    __param(0, (0, common_1.Param)('examId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "findByExam", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':siteId/rooms'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)(':siteId/rooms'),
    __param(0, (0, common_1.Param)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "findRooms", null);
__decorate([
    (0, common_1.Put)('rooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('rooms/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SitesController.prototype, "deleteRoom", null);
exports.SitesController = SitesController = __decorate([
    (0, common_1.Controller)('api/sites'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [sites_service_1.SitesService])
], SitesController);
//# sourceMappingURL=sites.controller.js.map