"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1704067200000 = void 0;
class CreateTables1704067200000 {
    constructor() {
        this.name = 'CreateTables1704067200000';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        phone VARCHAR(50),
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        real_name VARCHAR(100),
        org_id VARCHAR(100),
        status VARCHAR(30) DEFAULT 'active',
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP
      )
    `);
        await queryRunner.query(`
      CREATE TABLE roles (
        id UUID PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        scope_type VARCHAR(30) NOT NULL,
        description TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);
        await queryRunner.query(`
      CREATE TABLE user_roles (
        user_id UUID NOT NULL,
        role_id UUID NOT NULL,
        exam_id UUID,
        site_id UUID,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        PRIMARY KEY (user_id, role_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (role_id) REFERENCES roles(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE exam_projects (
        id UUID PRIMARY KEY,
        name VARCHAR(120) NOT NULL,
        type VARCHAR(40) NOT NULL,
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        status VARCHAR(30) DEFAULT 'preparing',
        global_requirement TEXT,
        description VARCHAR(500),
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE exam_subjects (
        id UUID PRIMARY KEY,
        exam_id UUID NOT NULL,
        name VARCHAR(100) NOT NULL,
        session_name VARCHAR(50),
        start_time TIMESTAMP,
        end_time TIMESTAMP,
        order_num INTEGER DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (exam_id) REFERENCES exam_projects(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE exam_sites (
        id UUID PRIMARY KEY,
        exam_id UUID NOT NULL,
        name VARCHAR(150) NOT NULL,
        address VARCHAR(500),
        leader_id UUID,
        room_count INTEGER DEFAULT 0,
        candidate_count INTEGER DEFAULT 0,
        status VARCHAR(30) DEFAULT 'preparing',
        notes TEXT,
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP,
        FOREIGN KEY (exam_id) REFERENCES exam_projects(id),
        FOREIGN KEY (leader_id) REFERENCES users(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE exam_rooms (
        id UUID PRIMARY KEY,
        site_id UUID NOT NULL,
        room_no VARCHAR(50) NOT NULL,
        capacity INTEGER DEFAULT 0,
        floor VARCHAR(20),
        status VARCHAR(30) DEFAULT 'ready',
        check_result TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (site_id) REFERENCES exam_sites(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE exam_tasks (
        id UUID PRIMARY KEY,
        exam_id UUID NOT NULL,
        site_id UUID,
        title VARCHAR(160) NOT NULL,
        stage VARCHAR(40) NOT NULL,
        owner_id UUID,
        due_time TIMESTAMP,
        status VARCHAR(30) DEFAULT 'pending',
        priority VARCHAR(20) DEFAULT 'normal',
        requirement TEXT,
        note TEXT,
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        deleted_at TIMESTAMP,
        FOREIGN KEY (exam_id) REFERENCES exam_projects(id),
        FOREIGN KEY (site_id) REFERENCES exam_sites(id),
        FOREIGN KEY (owner_id) REFERENCES users(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE task_records (
        id UUID PRIMARY KEY,
        task_id UUID NOT NULL,
        content TEXT NOT NULL,
        risk_note TEXT,
        progress_text TEXT,
        progress_percent INTEGER DEFAULT 0,
        record_time TIMESTAMP NOT NULL,
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (task_id) REFERENCES exam_tasks(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE incidents (
        id UUID PRIMARY KEY,
        exam_id UUID NOT NULL,
        site_id UUID,
        room_id UUID,
        type VARCHAR(40) NOT NULL,
        level VARCHAR(20) NOT NULL,
        title VARCHAR(160) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(30) DEFAULT 'pending',
        owner_id UUID,
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (exam_id) REFERENCES exam_projects(id),
        FOREIGN KEY (site_id) REFERENCES exam_sites(id),
        FOREIGN KEY (room_id) REFERENCES exam_rooms(id),
        FOREIGN KEY (owner_id) REFERENCES users(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE incident_actions (
        id UUID PRIMARY KEY,
        incident_id UUID NOT NULL,
        action_type VARCHAR(30) NOT NULL,
        content TEXT NOT NULL,
        operator_id UUID NOT NULL,
        action_time TIMESTAMP NOT NULL DEFAULT NOW(),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (incident_id) REFERENCES incidents(id),
        FOREIGN KEY (operator_id) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE attachments (
        id UUID PRIMARY KEY,
        biz_type VARCHAR(40) NOT NULL,
        biz_id UUID NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_type VARCHAR(50),
        file_size BIGINT DEFAULT 0,
        storage_key VARCHAR(500) NOT NULL,
        uploader_id UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (uploader_id) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE reports (
        id UUID PRIMARY KEY,
        exam_id UUID NOT NULL,
        report_type VARCHAR(50) NOT NULL,
        period_start TIMESTAMP,
        period_end TIMESTAMP,
        structured_data JSON,
        ai_content TEXT,
        edited_content TEXT,
        status VARCHAR(30) DEFAULT 'generating',
        created_by UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (exam_id) REFERENCES exam_projects(id),
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
        await queryRunner.query(`
      CREATE TABLE audit_logs (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL,
        action VARCHAR(30) NOT NULL,
        object_type VARCHAR(30) NOT NULL,
        object_id UUID,
        before_data JSON,
        after_data JSON,
        ip VARCHAR(50),
        description VARCHAR(200),
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE audit_logs`);
        await queryRunner.query(`DROP TABLE reports`);
        await queryRunner.query(`DROP TABLE attachments`);
        await queryRunner.query(`DROP TABLE incident_actions`);
        await queryRunner.query(`DROP TABLE incidents`);
        await queryRunner.query(`DROP TABLE task_records`);
        await queryRunner.query(`DROP TABLE exam_tasks`);
        await queryRunner.query(`DROP TABLE exam_rooms`);
        await queryRunner.query(`DROP TABLE exam_sites`);
        await queryRunner.query(`DROP TABLE exam_subjects`);
        await queryRunner.query(`DROP TABLE exam_projects`);
        await queryRunner.query(`DROP TABLE user_roles`);
        await queryRunner.query(`DROP TABLE roles`);
        await queryRunner.query(`DROP TABLE users`);
    }
}
exports.CreateTables1704067200000 = CreateTables1704067200000;
//# sourceMappingURL=1704067200000-create-tables.js.map