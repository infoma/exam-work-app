# 工作人员管理 Schemas

from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class StaffStatus(str, Enum):
    ACTIVE = "在职"
    INACTIVE = "离职"
    SUSPENDED = "停职"
    RETIRED = "退休"


# ==================== 工作人员 Schemas ====================

class StaffBase(BaseModel):
    """工作人员基础模型"""
    employee_id: str = Field(..., max_length=20, description="工号")
    name: str = Field(..., max_length=50, description="姓名")
    gender: Optional[str] = Field(None, max_length=10, description="性别")
    id_card: Optional[str] = Field(None, max_length=18, description="身份证号")
    birthday: Optional[date] = Field(None, description="出生日期")
    
    phone: Optional[str] = Field(None, max_length=20, description="手机号码")
    email: Optional[str] = Field(None, max_length=100, description="电子邮箱")
    address: Optional[str] = Field(None, max_length=200, description="家庭住址")
    
    department: Optional[str] = Field(None, max_length=100, description="所属部门")
    position: Optional[str] = Field(None, max_length=50, description="职位")
    role: Optional[str] = Field(None, max_length=50, description="角色类型")
    work_years: Optional[int] = Field(0, ge=0, description="工作年限")
    entry_date: Optional[date] = Field(None, description="入职日期")
    status: Optional[str] = Field("在职", description="状态")
    
    education: Optional[str] = Field(None, max_length=20, description="学历")
    major: Optional[str] = Field(None, max_length=50, description="专业")
    certifications: Optional[str] = Field(None, description="资质证书")
    skills: Optional[str] = Field(None, description="技能标签")
    
    training_status: Optional[str] = Field("未培训", description="培训状态")
    training_date: Optional[date] = Field(None, description="培训日期")
    exam_experience: Optional[int] = Field(0, ge=0, description="监考经验次数")
    last_exam_date: Optional[date] = Field(None, description="最近监考日期")
    is_qualified: Optional[bool] = Field(False, description="是否具备监考资格")
    
    remarks: Optional[str] = Field(None, description="备注")


class StaffCreate(StaffBase):
    """创建工作人员"""
    pass


class StaffUpdate(BaseModel):
    """更新工作人员"""
    employee_id: Optional[str] = Field(None, max_length=20)
    name: Optional[str] = Field(None, max_length=50)
    gender: Optional[str] = Field(None, max_length=10)
    id_card: Optional[str] = Field(None, max_length=18)
    birthday: Optional[date] = None
    
    phone: Optional[str] = Field(None, max_length=20)
    email: Optional[str] = Field(None, max_length=100)
    address: Optional[str] = Field(None, max_length=200)
    
    department: Optional[str] = Field(None, max_length=100)
    position: Optional[str] = Field(None, max_length=50)
    role: Optional[str] = Field(None, max_length=50)
    work_years: Optional[int] = Field(None, ge=0)
    entry_date: Optional[date] = None
    status: Optional[str] = None
    
    education: Optional[str] = Field(None, max_length=20)
    major: Optional[str] = Field(None, max_length=50)
    certifications: Optional[str] = None
    skills: Optional[str] = None
    
    training_status: Optional[str] = None
    training_date: Optional[date] = None
    exam_experience: Optional[int] = Field(None, ge=0)
    last_exam_date: Optional[date] = None
    is_qualified: Optional[bool] = None
    
    remarks: Optional[str] = None


class StaffResponse(StaffBase):
    """工作人员响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 工作人员培训记录 Schemas ====================

class StaffTrainingBase(BaseModel):
    """工作人员培训记录基础模型"""
    staff_id: int = Field(..., description="工作人员ID")
    training_name: str = Field(..., max_length=100, description="培训名称")
    training_type: Optional[str] = Field(None, max_length=50, description="培训类型")
    training_date: datetime = Field(..., description="培训日期")
    training_hours: Optional[int] = Field(0, ge=0, description="培训时长（小时）")
    training_location: Optional[str] = Field(None, max_length=200, description="培训地点")
    training_content: Optional[str] = Field(None, description="培训内容")
    
    is_passed: Optional[bool] = Field(False, description="是否通过")
    score: Optional[int] = Field(None, ge=0, le=100, description="考核分数")
    certificate_no: Optional[str] = Field(None, max_length=50, description="证书编号")
    
    trainer: Optional[str] = Field(None, max_length=50, description="培训讲师")
    remarks: Optional[str] = Field(None, description="备注")


class StaffTrainingCreate(StaffTrainingBase):
    """创建工作人员培训记录"""
    pass


class StaffTrainingUpdate(BaseModel):
    """更新工作人员培训记录"""
    training_name: Optional[str] = Field(None, max_length=100)
    training_type: Optional[str] = Field(None, max_length=50)
    training_date: Optional[datetime] = None
    training_hours: Optional[int] = Field(None, ge=0)
    training_location: Optional[str] = Field(None, max_length=200)
    training_content: Optional[str] = None
    
    is_passed: Optional[bool] = None
    score: Optional[int] = Field(None, ge=0, le=100)
    certificate_no: Optional[str] = Field(None, max_length=50)
    
    trainer: Optional[str] = Field(None, max_length=50)
    remarks: Optional[str] = None


class StaffTrainingResponse(StaffTrainingBase):
    """工作人员培训记录响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 工作人员分配记录 Schemas ====================

class StaffAssignmentBase(BaseModel):
    """工作人员分配记录基础模型"""
    staff_id: int = Field(..., description="工作人员ID")
    exam_site_id: int = Field(..., description="考点ID")
    
    assignment_type: Optional[str] = Field(None, max_length=50, description="分配类型")
    assignment_date: datetime = Field(..., description="分配日期")
    exam_name: Optional[str] = Field(None, max_length=100, description="考试名称")
    exam_date: Optional[date] = Field(None, description="考试日期")
    
    room_number: Optional[str] = Field(None, max_length=20, description="考场号")
    work_period: Optional[str] = Field(None, max_length=50, description="工作时段")
    work_role: Optional[str] = Field(None, max_length=50, description="工作角色")
    
    status: Optional[str] = Field("已分配", description="状态")
    check_in_time: Optional[datetime] = Field(None, description="签到时间")
    check_out_time: Optional[datetime] = Field(None, description="签退时间")
    
    remarks: Optional[str] = Field(None, description="备注")


class StaffAssignmentCreate(StaffAssignmentBase):
    """创建工作人员分配记录"""
    pass


class StaffAssignmentUpdate(BaseModel):
    """更新工作人员分配记录"""
    assignment_type: Optional[str] = Field(None, max_length=50)
    assignment_date: Optional[datetime] = None
    exam_name: Optional[str] = Field(None, max_length=100)
    exam_date: Optional[date] = None
    
    room_number: Optional[str] = Field(None, max_length=20)
    work_period: Optional[str] = Field(None, max_length=50)
    work_role: Optional[str] = Field(None, max_length=50)
    
    status: Optional[str] = None
    check_in_time: Optional[datetime] = None
    check_out_time: Optional[datetime] = None
    
    remarks: Optional[str] = None


class StaffAssignmentResponse(StaffAssignmentBase):
    """工作人员分配记录响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True