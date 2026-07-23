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
exports.SourceSchoolsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const source_schools_service_1 = require("./source-schools.service");
let SourceSchoolsController = class SourceSchoolsController {
    constructor(schoolsService) {
        this.schoolsService = schoolsService;
    }
    async create(dto, req) {
        return this.schoolsService.create(dto, req.user.userId);
    }
    async findAll(province, city, schoolType, serviceStatus, isActive) {
        return this.schoolsService.findAll({ province, city, schoolType, serviceStatus, isActive });
    }
    async findOne(id) {
        return this.schoolsService.findOne(id);
    }
    async update(id, dto) {
        return this.schoolsService.update(id, dto);
    }
    async remove(id) {
        await this.schoolsService.remove(id);
        return { success: true };
    }
    async createServiceRecord(schoolId, dto, req) {
        return this.schoolsService.createServiceRecord(schoolId, dto, req.user.userId);
    }
    async findServiceRecords(schoolId) {
        return this.schoolsService.findServiceRecords(schoolId);
    }
    async findOneServiceRecord(recordId) {
        return this.schoolsService.findOneServiceRecord(recordId);
    }
    async updateServiceRecord(recordId, dto) {
        return this.schoolsService.updateServiceRecord(recordId, dto);
    }
    async removeServiceRecord(recordId) {
        await this.schoolsService.removeServiceRecord(recordId);
        return { success: true };
    }
};
exports.SourceSchoolsController = SourceSchoolsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('province')),
    __param(1, (0, common_1.Query)('city')),
    __param(2, (0, common_1.Query)('schoolType')),
    __param(3, (0, common_1.Query)('serviceStatus')),
    __param(4, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':schoolId/service-records'),
    __param(0, (0, common_1.Param)('schoolId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "createServiceRecord", null);
__decorate([
    (0, common_1.Get)(':schoolId/service-records'),
    __param(0, (0, common_1.Param)('schoolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "findServiceRecords", null);
__decorate([
    (0, common_1.Get)('service-records/:recordId'),
    __param(0, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "findOneServiceRecord", null);
__decorate([
    (0, common_1.Put)('service-records/:recordId'),
    __param(0, (0, common_1.Param)('recordId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "updateServiceRecord", null);
__decorate([
    (0, common_1.Delete)('service-records/:recordId'),
    __param(0, (0, common_1.Param)('recordId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SourceSchoolsController.prototype, "removeServiceRecord", null);
exports.SourceSchoolsController = SourceSchoolsController = __decorate([
    (0, common_1.Controller)('api/source-schools'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [source_schools_service_1.SourceSchoolsService])
], SourceSchoolsController);
//# sourceMappingURL=source-schools.controller.js.map