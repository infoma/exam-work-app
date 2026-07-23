# 工作人员管理模型

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Date, Enum
from sqlalchemy import ForeignKey, Table
from sqlalchemy.orm import relationship
import enum
from app.database import Base


class StaffStatus(str, enum.Enum):
    """工作人员状态枚举"""
    ACTIVE = "在职"
    INACTIVE = "离职"
    SUSPENDED = "停职"
    RETIRED = "退休"


class StaffRole(str, enum.Enum):
    """工作人员角色枚举"""
    ADMIN = "系统管理员"
    EXAM_SUPERVISOR = "考试主管"
    EXAM_STAFF = "考试工作人员"
    SCHOOL_COORDINATOR = "学校协调员"
    TECH_SUPPORT = "技术支持"
    SECURITY = "安全人员"


class Staff(Base):
    """工作人员模型"""
    __tablename__ = "staffs"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # 基本信息
    employee_id = Column(String(20), unique=True, nullable=False, comment="工号")
    name = Column(String(50), nullable=False, comment="姓名")
    gender = Column(String(10), comment="性别")
    id_card = Column(String(18), unique=True, comment="身份证号")
    birthday = Column(Date, comment="出生日期")
    
    # 联系信息
    phone = Column(String(20), comment="手机号码")
    email = Column(String(100), comment="电子邮箱")
    address = Column(String(200), comment="家庭住址")
    
    # 工作信息
    department = Column(String(100), comment="所属部门")
    position = Column(String(50), comment="职位")
    role = Column(String(50), comment="角色类型")
    work_years = Column(Integer, default=0, comment="工作年限")
    entry_date = Column(Date, comment="入职日期")
    status = Column(String(20), default="在职", comment="状态")
    
    # 资质信息
    education = Column(String(20), comment="学历")
    major = Column(String(50), comment="专业")
    certifications = Column(Text, comment="资质证书（JSON数组）")
    skills = Column(Text, comment="技能标签（JSON数组）")
    
    # 考务相关
    training_status = Column(String(20), default="未培训", comment="培训状态")
    training_date = Column(Date, comment="培训日期")
    exam_experience = Column(Integer, default=0, comment="监考经验次数")
    last_exam_date = Column(Date, comment="最近监考日期")
    is_qualified = Column(Boolean, default=False, comment="是否具备监考资格")
    
    # 系统字段
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<Staff(id={self.id}, name='{self.name}', employee_id='{self.employee_id}')>"


class StaffTraining(Base):
    """工作人员培训记录模型"""
    __tablename__ = "staff_trainings"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    staff_id = Column(Integer, nullable=False, index=True, comment="工作人员ID")
    
    # 培训信息
    training_name = Column(String(100), nullable=False, comment="培训名称")
    training_type = Column(String(50), comment="培训类型（岗前培训/技能提升/政策学习等）")
    training_date = Column(DateTime, nullable=False, comment="培训日期")
    training_hours = Column(Integer, default=0, comment="培训时长（小时）")
    training_location = Column(String(200), comment="培训地点")
    training_content = Column(Text, comment="培训内容")
    
    # 培训结果
    is_passed = Column(Boolean, default=False, comment="是否通过")
    score = Column(Integer, comment="考核分数")
    certificate_no = Column(String(50), comment="证书编号")
    
    # 系统字段
    trainer = Column(String(50), comment="培训讲师")
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<StaffTraining(id={self.id}, staff_id={self.staff_id}, training_name='{self.training_name}')>"


class StaffAssignment(Base):
    """工作人员分配记录模型（分配到考点）"""
    __tablename__ = "staff_assignments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    staff_id = Column(Integer, nullable=False, index=True, comment="工作人员ID")
    exam_site_id = Column(Integer, nullable=False, index=True, comment="考点ID")
    
    # 分配信息
    assignment_type = Column(String(50), comment="分配类型（监考/巡考/技术支持等）")
    assignment_date = Column(DateTime, nullable=False, comment="分配日期")
    exam_name = Column(String(100), comment="考试名称")
    exam_date = Column(Date, comment="考试日期")
    
    # 工作安排
    room_number = Column(String(20), comment="考场号")
    work_period = Column(String(50), comment="工作时段")
    work_role = Column(String(50), comment="工作角色（主监考/副监考/巡考等）")
    
    # 状态
    status = Column(String(20), default="已分配", comment="状态（已分配/已确认/已完成/已取消）")
    check_in_time = Column(DateTime, comment="签到时间")
    check_out_time = Column(DateTime, comment="签退时间")
    
    # 系统字段
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<StaffAssignment(id={self.id}, staff_id={self.staff_id}, exam_site_id={self.exam_site_id})>"