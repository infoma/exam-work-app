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
exports.StaffsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const staffs_service_1 = require("./staffs.service");
let StaffsController = class StaffsController {
    constructor(staffsService) {
        this.staffsService = staffsService;
    }
    async create(dto, req) {
        return this.staffsService.create(dto, req.user.userId);
    }
    async findAll(department, status, role, isQualified) {
        return this.staffsService.findAll({ department, status, role, isQualified });
    }
    async findOne(id) {
        return this.staffsService.findOne(id);
    }
    async update(id, dto) {
        return this.staffsService.update(id, dto);
    }
    async remove(id) {
        await this.staffsService.remove(id);
        return { success: true };
    }
    async createTraining(staffId, dto) {
        return this.staffsService.createTraining(staffId, dto);
    }
    async findTrainings(staffId) {
        return this.staffsService.findTrainings(staffId);
    }
    async findOneTraining(trainingId) {
        return this.staffsService.findOneTraining(trainingId);
    }
    async updateTraining(trainingId, dto) {
        return this.staffsService.updateTraining(trainingId, dto);
    }
    async removeTraining(trainingId) {
        await this.staffsService.removeTraining(trainingId);
        return { success: true };
    }
    async createAssignment(staffId, dto) {
        return this.staffsService.createAssignment(staffId, dto);
    }
    async findAssignments(staffId) {
        return this.staffsService.findAssignments(staffId);
    }
    async findOneAssignment(assignmentId) {
        return this.staffsService.findOneAssignment(assignmentId);
    }
    async updateAssignment(assignmentId, dto) {
        return this.staffsService.updateAssignment(assignmentId, dto);
    }
    async removeAssignment(assignmentId) {
        await this.staffsService.removeAssignment(assignmentId);
        return { success: true };
    }
};
exports.StaffsController = StaffsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('department')),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('role')),
    __param(3, (0, common_1.Query)('isQualified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':staffId/trainings'),
    __param(0, (0, common_1.Param)('staffId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "createTraining", null);
__decorate([
    (0, common_1.Get)(':staffId/trainings'),
    __param(0, (0, common_1.Param)('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findTrainings", null);
__decorate([
    (0, common_1.Get)('trainings/:trainingId'),
    __param(0, (0, common_1.Param)('trainingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findOneTraining", null);
__decorate([
    (0, common_1.Put)('trainings/:trainingId'),
    __param(0, (0, common_1.Param)('trainingId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "updateTraining", null);
__decorate([
    (0, common_1.Delete)('trainings/:trainingId'),
    __param(0, (0, common_1.Param)('trainingId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "removeTraining", null);
__decorate([
    (0, common_1.Post)(':staffId/assignments'),
    __param(0, (0, common_1.Param)('staffId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "createAssignment", null);
__decorate([
    (0, common_1.Get)(':staffId/assignments'),
    __param(0, (0, common_1.Param)('staffId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findAssignments", null);
__decorate([
    (0, common_1.Get)('assignments/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "findOneAssignment", null);
__decorate([
    (0, common_1.Put)('assignments/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "updateAssignment", null);
__decorate([
    (0, common_1.Delete)('assignments/:assignmentId'),
    __param(0, (0, common_1.Param)('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StaffsController.prototype, "removeAssignment", null);
exports.StaffsController = StaffsController = __decorate([
    (0, common_1.Controller)('api/staffs'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [staffs_service_1.StaffsService])
], StaffsController);
//# sourceMappingURL=staffs.controller.js.map