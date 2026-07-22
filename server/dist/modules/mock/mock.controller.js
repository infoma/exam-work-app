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
exports.MockController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const mockExams = [
    {
        id: '11111111-1111-1111-1111-111111111111',
        name: '2026年统一考试',
        type: 'unified',
        startTime: '2026-07-21T09:00:00',
        endTime: '2026-07-22T17:00:00',
        status: 'preparing',
        globalRequirement: '严格遵守考试纪律，确保考试公平公正',
        description: '年度大型统一考试',
        createdAt: '2026-07-01T00:00:00',
        updatedAt: '2026-07-15T00:00:00',
    },
    {
        id: '22222222-2222-2222-2222-222222222222',
        name: '2026年资格考试',
        type: 'qualification',
        startTime: '2026-08-10T09:00:00',
        endTime: '2026-08-10T17:00:00',
        status: 'preparing',
        globalRequirement: '严格保密管理',
        description: '职业资格认证考试',
        createdAt: '2026-07-10T00:00:00',
        updatedAt: '2026-07-15T00:00:00',
    },
];
const mockSites = [
    {
        id: '33333333-3333-3333-3333-333333333333',
        examId: '11111111-1111-1111-1111-111111111111',
        name: '第一考点',
        address: '北京市海淀区考试中心',
        leaderId: 'user1',
        roomCount: 20,
        candidateCount: 600,
        status: 'preparing',
        createdAt: '2026-07-05T00:00:00',
    },
    {
        id: '44444444-4444-4444-4444-444444444444',
        examId: '11111111-1111-1111-1111-111111111111',
        name: '第二考点',
        address: '北京市朝阳区考试中心',
        leaderId: 'user2',
        roomCount: 15,
        candidateCount: 450,
        status: 'pending_verification',
        createdAt: '2026-07-06T00:00:00',
    },
];
const mockTasks = [
    {
        id: '55555555-5555-5555-5555-555555555555',
        examId: '11111111-1111-1111-1111-111111111111',
        siteId: '33333333-3333-3333-3333-333333333333',
        title: '考场布置检查',
        stage: 'pre_exam',
        ownerId: 'user1',
        dueTime: '2026-07-20T18:00:00',
        status: 'completed',
        priority: 'high',
        requirement: '检查所有考场桌椅、门贴、座位号',
        createdAt: '2026-07-10T00:00:00',
    },
    {
        id: '66666666-6666-6666-6666-666666666666',
        examId: '11111111-1111-1111-1111-111111111111',
        siteId: '44444444-4444-4444-4444-444444444444',
        title: '试卷接收确认',
        stage: 'pre_exam',
        ownerId: 'user2',
        dueTime: '2026-07-20T16:00:00',
        status: 'pending',
        priority: 'urgent',
        requirement: '双人签收、拍照留痕',
        createdAt: '2026-07-12T00:00:00',
    },
];
const mockIncidents = [
    {
        id: '77777777-7777-7777-7777-777777777777',
        examId: '11111111-1111-1111-1111-111111111111',
        siteId: '33333333-3333-3333-3333-333333333333',
        type: 'equipment_failure',
        level: 'important',
        title: '第三考场监控故障',
        description: '第三考场监控设备无法正常工作，已联系技术人员处理',
        status: 'processing',
        ownerId: 'user1',
        createdAt: '2026-07-18T10:30:00',
    },
];
let MockController = class MockController {
    getMockExams() {
        return mockExams;
    }
    getMockSites(req) {
        return mockSites;
    }
    getMockTasks() {
        return mockTasks;
    }
    getMockIncidents() {
        return mockIncidents;
    }
    getMockDashboard(req) {
        return {
            examCount: mockExams.length,
            siteCount: mockSites.length,
            taskStats: {
                total: mockTasks.length,
                completed: mockTasks.filter(t => t.status === 'completed').length,
                pending: mockTasks.filter(t => t.status === 'pending').length,
                inProgress: mockTasks.filter(t => t.status === 'in_progress').length,
            },
            incidentStats: {
                total: mockIncidents.length,
                open: mockIncidents.filter(i => i.status !== 'closed').length,
                major: mockIncidents.filter(i => i.level === 'major').length,
            },
            recentTasks: mockTasks.slice(0, 3),
            recentIncidents: mockIncidents.slice(0, 3),
        };
    }
    mockLogin(body) {
        if (body.username === 'admin' && body.password === 'admin123') {
            return {
                accessToken: 'mock-jwt-token-admin',
                user: {
                    id: 'admin-id',
                    username: 'admin',
                    realName: '系统管理员',
                    phone: '13800138000',
                },
            };
        }
        return {
            accessToken: 'mock-jwt-token-user',
            user: {
                id: 'user-id',
                username: body.username,
                realName: '普通用户',
                phone: '13900139000',
            },
        };
    }
};
exports.MockController = MockController;
__decorate([
    (0, common_1.Get)('exams'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MockController.prototype, "getMockExams", null);
__decorate([
    (0, common_1.Get)('sites'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MockController.prototype, "getMockSites", null);
__decorate([
    (0, common_1.Get)('tasks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MockController.prototype, "getMockTasks", null);
__decorate([
    (0, common_1.Get)('incidents'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MockController.prototype, "getMockIncidents", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MockController.prototype, "getMockDashboard", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MockController.prototype, "mockLogin", null);
exports.MockController = MockController = __decorate([
    (0, common_1.Controller)('api/mock')
], MockController);
//# sourceMappingURL=mock.controller.js.map