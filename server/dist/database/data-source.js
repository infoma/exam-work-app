"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("../config/env");
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
exports.AppDataSource = new typeorm_1.DataSource(dbConfig);
//# sourceMappingURL=data-source.js.map