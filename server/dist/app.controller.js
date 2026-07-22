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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
let AppController = class AppController {
    health() {
        return {
            service: 'exam-work-app-server',
            status: 'running',
            version: '1.0.0',
            docs: '/api',
            endpoints: {
                auth: '/api/auth',
                users: '/api/users',
                rbac: '/api/rbac',
                exams: '/api/exams',
                sites: '/api/sites',
                tasks: '/api/tasks',
                incidents: '/api/incidents',
                files: '/api/files',
                reports: '/api/reports',
                mock: '/api/mock',
            },
        };
    }
    apiInfo() {
        return {
            name: '考试工作管理系统 API',
            version: '1.0.0',
            endpoints: {
                'POST /api/auth/login': '用户登录',
                'POST /api/auth/register': '用户注册',
                'GET /api/auth/me': '获取当前用户',
                'GET /api/users': '用户列表',
                'GET /api/rbac/roles': '角色列表',
                'GET /api/rbac/permissions': '权限列表',
                'GET /api/exams': '考试列表',
                'GET /api/sites/exam/:examId': '考点列表',
                'GET /api/tasks/exam/:examId': '任务列表',
                'GET /api/incidents/exam/:examId': '异常列表',
                'POST /api/files/upload': '文件上传',
                'POST /api/reports/generate': '生成报告',
                'POST /api/reports/:id/ai-summary': 'AI 总结',
                'GET /api/mock/dashboard': '模拟仪表盘数据',
            },
        };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "health", null);
__decorate([
    (0, common_1.Get)('api'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "apiInfo", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)()
], AppController);
//# sourceMappingURL=app.controller.js.map