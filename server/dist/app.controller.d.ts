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
        };
    };
}
