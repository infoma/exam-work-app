export declare class AppController {
    health(): {
        service: string;
        status: string;
        version: string;
        docs: string;
        endpoints: {
            auth: string;
            users: string;
            rbac: string;
            exams: string;
            sites: string;
            tasks: string;
            incidents: string;
            files: string;
            reports: string;
            mock: string;
            sourceSchools: string;
            staffs: string;
            siteStandards: string;
        };
    };
    apiInfo(): {
        name: string;
        version: string;
        endpoints: {
            'POST /api/auth/login': string;
            'POST /api/auth/register': string;
            'GET /api/auth/me': string;
            'GET /api/users': string;
            'GET /api/rbac/roles': string;
            'GET /api/rbac/permissions': string;
            'GET /api/exams': string;
            'GET /api/sites/exam/:examId': string;
            'GET /api/tasks/exam/:examId': string;
            'GET /api/incidents/exam/:examId': string;
            'POST /api/files/upload': string;
            'POST /api/reports/generate': string;
            'POST /api/reports/:id/ai-summary': string;
            'GET /api/mock/dashboard': string;
            'GET /api/source-schools': string;
            'POST /api/source-schools': string;
            'GET /api/source-schools/:id': string;
            'GET /api/source-schools/:schoolId/service-records': string;
            'GET /api/staffs': string;
            'POST /api/staffs': string;
            'GET /api/staffs/:id': string;
            'GET /api/staffs/:staffId/trainings': string;
            'GET /api/staffs/:staffId/assignments': string;
            'GET /api/site-standards': string;
            'POST /api/site-standards': string;
            'GET /api/site-standards/:id': string;
            'GET /api/site-standards/:siteId/rooms': string;
            'GET /api/site-standards/:siteId/inspections': string;
            'GET /api/site-standards/:siteId/facilities': string;
        };
    };
}
