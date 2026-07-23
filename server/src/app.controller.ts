import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
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
        sourceSchools: '/api/source-schools',
        staffs: '/api/staffs',
        siteStandards: '/api/site-standards',
      },
    };
  }

  @Get('api')
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
        'GET /api/source-schools': '生源学校列表',
        'POST /api/source-schools': '创建生源学校',
        'GET /api/source-schools/:id': '生源学校详情',
        'GET /api/source-schools/:schoolId/service-records': '学校服务记录',
        'GET /api/staffs': '工作人员列表',
        'POST /api/staffs': '创建工作人员',
        'GET /api/staffs/:id': '工作人员详情',
        'GET /api/staffs/:staffId/trainings': '培训记录',
        'GET /api/staffs/:staffId/assignments': '分配记录',
        'GET /api/site-standards': '考点标准化列表',
        'POST /api/site-standards': '创建考点',
        'GET /api/site-standards/:id': '考点详情',
        'GET /api/site-standards/:siteId/rooms': '考场列表',
        'GET /api/site-standards/:siteId/inspections': '检查记录',
        'GET /api/site-standards/:siteId/facilities': '设施设备列表',
      },
    };
  }
}