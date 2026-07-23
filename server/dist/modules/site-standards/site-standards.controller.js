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
exports.SiteStandardsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const site_standards_service_1 = require("./site-standards.service");
let SiteStandardsController = class SiteStandardsController {
    constructor(siteStandardsService) {
        this.siteStandardsService = siteStandardsService;
    }
    async create(dto, req) {
        return this.siteStandardsService.create(dto, req.user.userId);
    }
    async findAll(province, city, standardLevel, status, isActive) {
        return this.siteStandardsService.findAll({ province, city, standardLevel, status, isActive });
    }
    async findOne(id) {
        return this.siteStandardsService.findOne(id);
    }
    async update(id, dto) {
        return this.siteStandardsService.update(id, dto);
    }
    async remove(id) {
        await this.siteStandardsService.remove(id);
        return { success: true };
    }
    async createRoom(siteId, dto) {
        return this.siteStandardsService.createRoom(siteId, dto);
    }
    async findRooms(siteId) {
        return this.siteStandardsService.findRooms(siteId);
    }
    async findOneRoom(roomId) {
        return this.siteStandardsService.findOneRoom(roomId);
    }
    async updateRoom(roomId, dto) {
        return this.siteStandardsService.updateRoom(roomId, dto);
    }
    async removeRoom(roomId) {
        await this.siteStandardsService.removeRoom(roomId);
        return { success: true };
    }
    async createInspection(siteId, dto) {
        return this.siteStandardsService.createInspection(siteId, dto);
    }
    async findInspections(siteId) {
        return this.siteStandardsService.findInspections(siteId);
    }
    async findOneInspection(inspectionId) {
        return this.siteStandardsService.findOneInspection(inspectionId);
    }
    async updateInspection(inspectionId, dto) {
        return this.siteStandardsService.updateInspection(inspectionId, dto);
    }
    async removeInspection(inspectionId) {
        await this.siteStandardsService.removeInspection(inspectionId);
        return { success: true };
    }
    async createFacility(siteId, dto) {
        return this.siteStandardsService.createFacility(siteId, dto);
    }
    async findFacilities(siteId, facilityType, facilityStatus) {
        return this.siteStandardsService.findFacilities(siteId, { facilityType, status: facilityStatus });
    }
    async findOneFacility(facilityId) {
        return this.siteStandardsService.findOneFacility(facilityId);
    }
    async updateFacility(facilityId, dto) {
        return this.siteStandardsService.updateFacility(facilityId, dto);
    }
    async removeFacility(facilityId) {
        await this.siteStandardsService.removeFacility(facilityId);
        return { success: true };
    }
};
exports.SiteStandardsController = SiteStandardsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('province')),
    __param(1, (0, common_1.Query)('city')),
    __param(2, (0, common_1.Query)('standardLevel')),
    __param(3, (0, common_1.Query)('status')),
    __param(4, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':siteId/rooms'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)(':siteId/rooms'),
    __param(0, (0, common_1.Param)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findRooms", null);
__decorate([
    (0, common_1.Get)('rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findOneRoom", null);
__decorate([
    (0, common_1.Put)('rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)('rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "removeRoom", null);
__decorate([
    (0, common_1.Post)(':siteId/inspections'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "createInspection", null);
__decorate([
    (0, common_1.Get)(':siteId/inspections'),
    __param(0, (0, common_1.Param)('siteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findInspections", null);
__decorate([
    (0, common_1.Get)('inspections/:inspectionId'),
    __param(0, (0, common_1.Param)('inspectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findOneInspection", null);
__decorate([
    (0, common_1.Put)('inspections/:inspectionId'),
    __param(0, (0, common_1.Param)('inspectionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "updateInspection", null);
__decorate([
    (0, common_1.Delete)('inspections/:inspectionId'),
    __param(0, (0, common_1.Param)('inspectionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "removeInspection", null);
__decorate([
    (0, common_1.Post)(':siteId/facilities'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "createFacility", null);
__decorate([
    (0, common_1.Get)(':siteId/facilities'),
    __param(0, (0, common_1.Param)('siteId')),
    __param(1, (0, common_1.Query)('facilityType')),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findFacilities", null);
__decorate([
    (0, common_1.Get)('facilities/:facilityId'),
    __param(0, (0, common_1.Param)('facilityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "findOneFacility", null);
__decorate([
    (0, common_1.Put)('facilities/:facilityId'),
    __param(0, (0, common_1.Param)('facilityId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "updateFacility", null);
__decorate([
    (0, common_1.Delete)('facilities/:facilityId'),
    __param(0, (0, common_1.Param)('facilityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SiteStandardsController.prototype, "removeFacility", null);
exports.SiteStandardsController = SiteStandardsController = __decorate([
    (0, common_1.Controller)('api/site-standards'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [site_standards_service_1.SiteStandardsService])
], SiteStandardsController);
//# sourceMappingURL=site-standards.controller.js.map