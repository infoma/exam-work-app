export declare const env: {
    port: number;
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        sqlitePath: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    file: {
        uploadDir: string;
        maxSize: number;
    };
    ai: {
        provider: string;
        apiKey: string;
        baseUrl: string;
        model: string;
    };
};
