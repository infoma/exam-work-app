export declare class MockController {
    getMockExams(): {
        id: string;
        name: string;
        type: string;
        startTime: string;
        endTime: string;
        status: string;
        globalRequirement: string;
        description: string;
        createdAt: string;
        updatedAt: string;
    }[];
    getMockSites(req?: any): {
        id: string;
        examId: string;
        name: string;
        address: string;
        leaderId: string;
        roomCount: number;
        candidateCount: number;
        status: string;
        createdAt: string;
    }[];
    getMockTasks(): {
        id: string;
        examId: string;
        siteId: string;
        title: string;
        stage: string;
        ownerId: string;
        dueTime: string;
        status: string;
        priority: string;
        requirement: string;
        createdAt: string;
    }[];
    getMockIncidents(): {
        id: string;
        examId: string;
        siteId: string;
        type: string;
        level: string;
        title: string;
        description: string;
        status: string;
        ownerId: string;
        createdAt: string;
    }[];
    getMockDashboard(req: any): {
        examCount: number;
        siteCount: number;
        taskStats: {
            total: number;
            completed: number;
            pending: number;
            inProgress: number;
        };
        incidentStats: {
            total: number;
            open: number;
            major: number;
        };
        recentTasks: {
            id: string;
            examId: string;
            siteId: string;
            title: string;
            stage: string;
            ownerId: string;
            dueTime: string;
            status: string;
            priority: string;
            requirement: string;
            createdAt: string;
        }[];
        recentIncidents: {
            id: string;
            examId: string;
            siteId: string;
            type: string;
            level: string;
            title: string;
            description: string;
            status: string;
            ownerId: string;
            createdAt: string;
        }[];
    };
    mockLogin(body: {
        username: string;
        password: string;
    }): {
        accessToken: string;
        user: {
            id: string;
            username: string;
            realName: string;
            phone: string;
        };
    };
}
