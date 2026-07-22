export const env = {
  port: parseInt(process.env.PORT) || 3000,
  database: {
    type: process.env.DB_TYPE || 'sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'exam_work_app',
    sqlitePath: process.env.DB_SQLITE_PATH || './database.sqlite',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'exam-work-app-secret-key-2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  file: {
    uploadDir: process.env.FILE_UPLOAD_DIR || './uploads',
    maxSize: parseInt(process.env.FILE_MAX_SIZE) || 10 * 1024 * 1024,
  },
  ai: {
    provider: process.env.AI_PROVIDER || 'mock',
    apiKey: process.env.AI_API_KEY || '',
    baseUrl: process.env.AI_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: process.env.AI_MODEL || 'qwen-plus',
  },
};