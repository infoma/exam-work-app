# 生源学校服务管理模型

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float
from sqlalchemy.orm import relationship
from app.database import Base


class SourceSchool(Base):
    """生源学校模型"""
    __tablename__ = "source_schools"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # 基本信息
    name = Column(String(100), nullable=False, comment="学校名称")
    code = Column(String(20), unique=True, nullable=False, comment="学校代码")
    school_type = Column(String(20), comment="学校类型（小学/初中/高中/中专等）")
    
    # 联系信息
    province = Column(String(50), comment="省份")
    city = Column(String(50), comment="城市")
    district = Column(String(50), comment="区/县")
    address = Column(String(200), comment="详细地址")
    contact_person = Column(String(50), comment="联系人")
    contact_phone = Column(String(20), comment="联系电话")
    email = Column(String(100), comment="电子邮箱")
    
    # 学校属性
    student_count = Column(Integer, default=0, comment="学生人数")
    teacher_count = Column(Integer, default=0, comment="教师人数")
    is_active = Column(Boolean, default=True, comment="是否活跃")
    capacity = Column(Integer, default=0, comment="容纳能力")
    facilities_score = Column(Float, default=0.0, comment="设施评分(0-100)")
    
    # 服务相关
    service_level = Column(String(20), default="标准", comment="服务等级（优质/标准/基础）")
    service_status = Column(String(20), default="正常", comment="服务状态（正常/暂停/终止）")
    last_service_date = Column(DateTime, comment="最近服务日期")
    service_count = Column(Integer, default=0, comment="累计服务次数")
    
    # 系统字段
    description = Column(Text, comment="学校描述/备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<SourceSchool(id={self.id}, name='{self.name}', code='{self.code}')>"


class SchoolServiceRecord(Base):
    """学校服务记录模型"""
    __tablename__ = "school_service_records"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    school_id = Column(Integer, nullable=False, index=True, comment="学校ID")
    
    # 服务信息
    service_type = Column(String(50), comment="服务类型（报名服务/考试服务/成绩服务等）")
    service_date = Column(DateTime, nullable=False, comment="服务日期")
    service_content = Column(Text, comment="服务内容")
    service_count = Column(Integer, default=1, comment="服务人次")
    
    # 服务评价
    satisfaction_level = Column(String(20), comment="满意度（非常满意/满意/一般/不满意）")
    feedback = Column(Text, comment="反馈意见")
    
    # 操作人员
    operator_id = Column(Integer, comment="操作人员ID")
    operator_name = Column(String(50), comment="操作人员姓名")
    
    # 系统字段
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<SchoolServiceRecord(id={self.id}, school_id={self.school_id})>"