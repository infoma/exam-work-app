# 生源学校服务管理 Schemas

from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class ServiceLevel(str, Enum):
    EXCELLENT = "优质"
    STANDARD = "标准"
    BASIC = "基础"


class ServiceStatus(str, Enum):
    NORMAL = "正常"
    SUSPENDED = "暂停"
    TERMINATED = "终止"


# ==================== 生源学校 Schemas ====================

class SourceSchoolBase(BaseModel):
    """生源学校基础模型"""
    name: str = Field(..., max_length=100, description="学校名称")
    code: str = Field(..., max_length=20, description="学校代码")
    school_type: Optional[str] = Field(None, max_length=20, description="学校类型")
    
    province: Optional[str] = Field(None, max_length=50, description="省份")
    city: Optional[str] = Field(None, max_length=50, description="城市")
    district: Optional[str] = Field(None, max_length=50, description="区/县")
    address: Optional[str] = Field(None, max_length=200, description="详细地址")
    contact_person: Optional[str] = Field(None, max_length=50, description="联系人")
    contact_phone: Optional[str] = Field(None, max_length=20, description="联系电话")
    email: Optional[str] = Field(None, max_length=100, description="电子邮箱")
    
    student_count: Optional[int] = Field(0, ge=0, description="学生人数")
    teacher_count: Optional[int] = Field(0, ge=0, description="教师人数")
    is_active: Optional[bool] = Field(True, description="是否活跃")
    capacity: Optional[int] = Field(0, ge=0, description="容纳能力")
    facilities_score: Optional[float] = Field(0.0, ge=0, le=100, description="设施评分")
    
    service_level: Optional[str] = Field("标准", description="服务等级")
    service_status: Optional[str] = Field("正常", description="服务状态")
    description: Optional[str] = Field(None, description="学校描述")


class SourceSchoolCreate(SourceSchoolBase):
    """创建生源学校"""
    pass


class SourceSchoolUpdate(BaseModel):
    """更新生源学校"""
    name: Optional[str] = Field(None, max_length=100)
    code: Optional[str] = Field(None, max_length=20)
    school_type: Optional[str] = Field(None, max_length=20)
    
    province: Optional[str] = Field(None, max_length=50)
    city: Optional[str] = Field(None, max_length=50)
    district: Optional[str] = Field(None, max_length=50)
    address: Optional[str] = Field(None, max_length=200)
    contact_person: Optional[str] = Field(None, max_length=50)
    contact_phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=100)
    
    student_count: Optional[int] = Field(None, ge=0)
    teacher_count: Optional[int] = Field(None, ge=0)
    is_active: Optional[bool] = None
    capacity: Optional[int] = Field(None, ge=0)
    facilities_score: Optional[float] = Field(None, ge=0, le=100)
    
    service_level: Optional[str] = None
    service_status: Optional[str] = None
    description: Optional[str] = None


class SourceSchoolResponse(SourceSchoolBase):
    """生源学校响应模型"""
    id: int
    last_service_date: Optional[datetime] = None
    service_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 学校服务记录 Schemas ====================

class SchoolServiceRecordBase(BaseModel):
    """学校服务记录基础模型"""
    school_id: int = Field(..., description="学校ID")
    service_type: Optional[str] = Field(None, max_length=50, description="服务类型")
    service_date: datetime = Field(..., description="服务日期")
    service_content: Optional[str] = Field(None, description="服务内容")
    service_count: Optional[int] = Field(1, ge=1, description="服务人次")
    
    satisfaction_level: Optional[str] = Field(None, max_length=20, description="满意度")
    feedback: Optional[str] = Field(None, description="反馈意见")
    
    operator_id: Optional[int] = Field(None, description="操作人员ID")
    operator_name: Optional[str] = Field(None, max_length=50, description="操作人员姓名")


class SchoolServiceRecordCreate(SchoolServiceRecordBase):
    """创建学校服务记录"""
    pass


class SchoolServiceRecordUpdate(BaseModel):
    """更新学校服务记录"""
    service_type: Optional[str] = Field(None, max_length=50)
    service_date: Optional[datetime] = None
    service_content: Optional[str] = None
    service_count: Optional[int] = Field(None, ge=1)
    
    satisfaction_level: Optional[str] = Field(None, max_length=20)
    feedback: Optional[str] = None
    
    operator_id: Optional[int] = None
    operator_name: Optional[str] = Field(None, max_length=50)


class SchoolServiceRecordResponse(SchoolServiceRecordBase):
    """学校服务记录响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True