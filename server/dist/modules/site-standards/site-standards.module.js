"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteStandardsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const site_standards_service_1 = require("./site-standards.service");
const site_standards_controller_1 = require("./site-standards.controller");
const site_standard_entity_1 = require("./entities/site-standard.entity");
const standard_room_entity_1 = require("./entities/standard-room.entity");
const site_inspection_entity_1 = require("./entities/site-inspection.entity");
const site_facility_entity_1 = require("./entities/site-facility.entity");
let SiteStandardsModule = class SiteStandardsModule {
};
exports.SiteStandardsModule = SiteStandardsModule;
exports.SiteStandardsModule = SiteStandardsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([site_standard_entity_1.SiteStandard, standard_room_entity_1.StandardRoom, site_inspection_entity_1.SiteInspection, site_facility_entity_1.SiteFacility])],
        providers: [site_standards_service_1.SiteStandardsService],
        controllers: [site_standards_controller_1.SiteStandardsController],
        exports: [site_standards_service_1.SiteStandardsService],
    })
], SiteStandardsModule);
//# sourceMappingURL=site-standards.module.js.map