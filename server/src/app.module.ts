import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { ExamsModule } from './modules/exams/exams.module';
import { SitesModule } from './modules/sites/sites.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { IncidentsModule } from './modules/incidents/incidents.module';
import { FilesModule } from './modules/files/files.module';
import { ReportsModule } from './modules/reports/reports.module';
import { MockModule } from './modules/mock/mock.module';
import { AiModule } from './modules/ai/ai.module';
import { DataInitModule } from './modules/data-init/data-init.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AppController } from './app.controller';
import { env } from './config/env';

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

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthModule,
    UsersModule,
    RbacModule,
    ExamsModule,
    SitesModule,
    TasksModule,
    IncidentsModule,
    FilesModule,
    ReportsModule,
    MockModule,
    AiModule,
    DataInitModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
  controllers: [AppController],
})
export class AppModule {}