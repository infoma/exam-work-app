# 考务管理系统 API 文档

## 快速开始

### 安装依赖

```bash
cd exam-admin-system
pip install -e .
```

### 启动服务

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 访问文档

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

---

## 模块概览

### 1. 生源学校服务管理 (`/api/v1/source-schools`)

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | POST | 创建生源学校 |
| `/` | GET | 获取生源学校列表（支持筛选） |
| `/{school_id}` | GET | 获取生源学校详情 |
| `/{school_id}` | PUT | 更新生源学校 |
| `/{school_id}` | DELETE | 删除生源学校 |
| `/{school_id}/service-records/` | POST | 创建服务记录 |
| `/{school_id}/service-records/` | GET | 获取服务记录列表 |
| `/service-records/{record_id}` | GET | 获取服务记录详情 |
| `/service-records/{record_id}` | PUT | 更新服务记录 |
| `/service-records/{record_id}` | DELETE | 删除服务记录 |

### 2. 工作人员管理 (`/api/v1/staffs`)

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | POST | 创建工作人员 |
| `/` | GET | 获取工作人员列表（支持筛选） |
| `/{staff_id}` | GET | 获取工作人员详情 |
| `/{staff_id}` | PUT | 更新工作人员 |
| `/{staff_id}` | DELETE | 删除工作人员 |
| `/{staff_id}/trainings/` | POST | 创建培训记录 |
| `/{staff_id}/trainings/` | GET | 获取培训记录列表 |
| `/trainings/{training_id}` | GET | 获取培训记录详情 |
| `/trainings/{training_id}` | PUT | 更新培训记录 |
| `/trainings/{training_id}` | DELETE | 删除培训记录 |
| `/{staff_id}/assignments/` | POST | 创建分配记录 |
| `/{staff_id}/assignments/` | GET | 获取分配记录列表 |
| `/assignments/{assignment_id}` | GET | 获取分配记录详情 |
| `/assignments/{assignment_id}` | PUT | 更新分配记录 |
| `/assignments/{assignment_id}` | DELETE | 删除分配记录 |

### 3. 考点标准化管理 (`/api/v1/exam-sites`)

| 端点 | 方法 | 说明 |
|------|------|------|
| `/` | POST | 创建考点 |
| `/` | GET | 获取考点列表（支持筛选） |
| `/{site_id}` | GET | 获取考点详情 |
| `/{site_id}` | PUT | 更新考点 |
| `/{site_id}` | DELETE | 删除考点 |
| `/{site_id}/rooms/` | POST | 创建考场 |
| `/{site_id}/rooms/` | GET | 获取考场列表 |
| `/rooms/{room_id}` | GET | 获取考场详情 |
| `/rooms/{room_id}` | PUT | 更新考场 |
| `/rooms/{room_id}` | DELETE | 删除考场 |
| `/{site_id}/inspections/` | POST | 创建检查记录 |
| `/{site_id}/inspections/` | GET | 获取检查记录列表 |
| `/inspections/{inspection_id}` | GET | 获取检查记录详情 |
| `/inspections/{inspection_id}` | PUT | 更新检查记录 |
| `/inspections/{inspection_id}` | DELETE | 删除检查记录 |
| `/{site_id}/facilities/` | POST | 创建设施设备 |
| `/{site_id}/facilities/` | GET | 获取设施设备列表 |
| `/facilities/{facility_id}` | GET | 获取设施设备详情 |
| `/facilities/{facility_id}` | PUT | 更新设施设备 |
| `/facilities/{facility_id}` | DELETE | 删除设施设备 |

---

## 数据模型

### 生源学校 (SourceSchool)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| name | str | 学校名称 |
| code | str | 学校代码（唯一） |
| school_type | str | 学校类型 |
| province/city/district | str | 地理位置 |
| address | str | 详细地址 |
| contact_person | str | 联系人 |
| contact_phone | str | 联系电话 |
| student_count | int | 学生人数 |
| teacher_count | int | 教师人数 |
| is_active | bool | 是否活跃 |
| capacity | int | 容纳能力 |
| facilities_score | float | 设施评分 |
| service_level | str | 服务等级 |
| service_status | str | 服务状态 |
| last_service_date | datetime | 最近服务日期 |
| service_count | int | 累计服务次数 |

### 工作人员 (Staff)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| employee_id | str | 工号（唯一） |
| name | str | 姓名 |
| gender | str | 性别 |
| id_card | str | 身份证号（唯一） |
| phone | str | 手机号码 |
| department | str | 所属部门 |
| position | str | 职位 |
| role | str | 角色类型 |
| status | str | 状态（在职/离职/停职/退休） |
| education | str | 学历 |
| training_status | str | 培训状态 |
| exam_experience | int | 监考经验次数 |
| is_qualified | bool | 是否具备监考资格 |

### 考点 (ExamSite)

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int | 主键 |
| name | str | 考点名称 |
| code | str | 考点代码（唯一） |
| province/city/district | str | 地理位置 |
| address | str | 详细地址 |
| total_rooms | int | 考场总数 |
| total_seats | int | 总座位数 |
| capacity | int | 最大容纳人数 |
| contact_person | str | 负责人 |
| contact_phone | str | 联系电话 |
| standard_level | str | 标准化等级 |
| facility_score | float | 设施设备评分 |
| management_score | float | 管理水平评分 |
| security_score | float | 安全保障评分 |
| overall_score | float | 综合评分 |
| has_monitoring | bool | 是否有监控设备 |
| has_signal_detector | bool | 是否有信号探测器 |
| status | str | 状态 |

---

## 示例请求

### 创建生源学校

```bash
curl -X POST "http://localhost:8000/api/v1/source-schools/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "北京市第一中学",
    "code": "BJ001",
    "school_type": "高中",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "address": "东城区某某街道",
    "contact_person": "张老师",
    "contact_phone": "010-12345678",
    "student_count": 1200,
    "teacher_count": 100
  }'
```

### 创建工作人员

```bash
curl -X POST "http://localhost:8000/api/v1/staffs/" \
  -H "Content-Type: application/json" \
  -d '{
    "employee_id": "ST001",
    "name": "李明",
    "gender": "男",
    "phone": "13800138000",
    "department": "教务处",
    "position": "教务员",
    "role": "考试工作人员",
    "status": "在职"
  }'
```

### 创建考点

```bash
curl -X POST "http://localhost:8000/api/v1/exam-sites/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "北京第一考点",
    "code": "ES001",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区",
    "address": "东城区某某学校",
    "total_rooms": 30,
    "total_seats": 900,
    "contact_person": "王主任",
    "contact_phone": "010-87654321",
    "standard_level": "一级",
    "has_monitoring": true,
    "has_signal_detector": true
  }'
```