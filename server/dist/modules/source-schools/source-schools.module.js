"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceSchoolsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const source_schools_service_1 = require("./source-schools.service");
const source_schools_controller_1 = require("./source-schools.controller");
const source_school_entity_1 = require("./entities/source-school.entity");
const school_service_record_entity_1 = require("./entities/school-service-record.entity");
let SourceSchoolsModule = class SourceSchoolsModule {
};
exports.SourceSchoolsModule = SourceSchoolsModule;
exports.SourceSchoolsModule = SourceSchoolsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([source_school_entity_1.SourceSchool, school_service_record_entity_1.SchoolServiceRecord])],
        providers: [source_schools_service_1.SourceSchoolsService],
        controllers: [source_schools_controller_1.SourceSchoolsController],
        exports: [source_schools_service_1.SourceSchoolsService],
    })
], SourceSchoolsModule);
//# sourceMappingURL=source-schools.module.js.map