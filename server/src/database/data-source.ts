import { DataSource } from 'typeorm';
import { env } from '../config/env';

const dbConfig = env.database.type === 'postgres'
  ? {
      type: 'postgres' as const,
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.database,
      entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
    }
  : {
      type: 'sqlite' as const,
      database: env.database.sqlitePath,
      entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
    };

export const AppDataSource = new DataSource(dbConfig);