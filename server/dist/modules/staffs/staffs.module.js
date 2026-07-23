"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staffs_service_1 = require("./staffs.service");
const staffs_controller_1 = require("./staffs.controller");
const staff_entity_1 = require("./entities/staff.entity");
const staff_training_entity_1 = require("./entities/staff-training.entity");
const staff_assignment_entity_1 = require("./entities/staff-assignment.entity");
let StaffsModule = class StaffsModule {
};
exports.StaffsModule = StaffsModule;
exports.StaffsModule = StaffsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_entity_1.Staff, staff_training_entity_1.StaffTraining, staff_assignment_entity_1.StaffAssignment])],
        providers: [staffs_service_1.StaffsService],
        controllers: [staffs_controller_1.StaffsController],
        exports: [staffs_service_1.StaffsService],
    })
], StaffsModule);
//# sourceMappingURL=staffs.module.js.map