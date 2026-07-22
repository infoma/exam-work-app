"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const incidents_service_1 = require("./incidents.service");
const incidents_controller_1 = require("./incidents.controller");
const incident_entity_1 = require("./entities/incident.entity");
const incident_action_entity_1 = require("./entities/incident-action.entity");
const exams_module_1 = require("../exams/exams.module");
let IncidentsModule = class IncidentsModule {
};
exports.IncidentsModule = IncidentsModule;
exports.IncidentsModule = IncidentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([incident_entity_1.Incident, incident_action_entity_1.IncidentAction]), exams_module_1.ExamsModule],
        providers: [incidents_service_1.IncidentsService],
        controllers: [incidents_controller_1.IncidentsController],
        exports: [incidents_service_1.IncidentsService],
    })
], IncidentsModule);
//# sourceMappingURL=incidents.module.js.map