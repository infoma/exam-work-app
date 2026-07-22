"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const rbac_module_1 = require("./modules/rbac/rbac.module");
const exams_module_1 = require("./modules/exams/exams.module");
const sites_module_1 = require("./modules/sites/sites.module");
const tasks_module_1 = require("./modules/tasks/tasks.module");
const incidents_module_1 = require("./modules/incidents/incidents.module");
const files_module_1 = require("./modules/files/files.module");
const reports_module_1 = require("./modules/reports/reports.module");
const mock_module_1 = require("./modules/mock/mock.module");
const ai_module_1 = require("./modules/ai/ai.module");
const data_init_module_1 = require("./modules/data-init/data-init.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const app_controller_1 = require("./app.controller");
const env_1 = require("./config/env");
const dbConfig = env_1.env.database.type === 'postgres'
    ? {
        type: 'postgres',
        host: env_1.env.database.host,
        port: env_1.env.database.port,
        username: env_1.env.database.username,
        password: env_1.env.database.password,
        database: env_1.env.database.database,
        entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        synchronize: true,
        logging: false,
    }
    : {
        type: 'sqlite',
        database: env_1.env.database.sqlitePath,
        entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
        migrations: ['dist/database/migrations/*{.ts,.js}'],
        synchronize: true,
        logging: false,
    };
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(dbConfig),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            rbac_module_1.RbacModule,
            exams_module_1.ExamsModule,
            sites_module_1.SitesModule,
            tasks_module_1.TasksModule,
            incidents_module_1.IncidentsModule,
            files_module_1.FilesModule,
            reports_module_1.ReportsModule,
            mock_module_1.MockModule,
            ai_module_1.AiModule,
            data_init_module_1.DataInitModule,
        ],
        providers: [
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.HttpExceptionFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: response_interceptor_1.ResponseInterceptor },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map