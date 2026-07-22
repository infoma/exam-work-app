"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SitesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sites_service_1 = require("./sites.service");
const sites_controller_1 = require("./sites.controller");
const exam_site_entity_1 = require("./entities/exam-site.entity");
const exam_room_entity_1 = require("./entities/exam-room.entity");
const exams_module_1 = require("../exams/exams.module");
let SitesModule = class SitesModule {
};
exports.SitesModule = SitesModule;
exports.SitesModule = SitesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([exam_site_entity_1.ExamSite, exam_room_entity_1.ExamRoom]), exams_module_1.ExamsModule],
        providers: [sites_service_1.SitesService],
        controllers: [sites_controller_1.SitesController],
        exports: [sites_service_1.SitesService],
    })
], SitesModule);
//# sourceMappingURL=sites.module.js.map