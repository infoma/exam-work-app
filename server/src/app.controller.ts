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
      },
    };
  }
}