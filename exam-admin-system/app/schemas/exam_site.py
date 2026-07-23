# 考点标准化管理 Schemas

from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel, Field
from enum import Enum


class StandardLevel(str, Enum):
    LEVEL_1 = "一级"
    LEVEL_2 = "二级"
    LEVEL_3 = "三级"
    UNRATED = "未评级"


# ==================== 考点 Schemas ====================

class ExamSiteBase(BaseModel):
    """考点基础模型"""
    name: str = Field(..., max_length=100, description="考点名称")
    code: str = Field(..., max_length=20, description="考点代码")
    
    province: Optional[str] = Field(None, max_length=50, description="省份")
    city: Optional[str] = Field(None, max_length=50, description="城市")
    district: Optional[str] = Field(None, max_length=50, description="区/县")
    address: Optional[str] = Field(None, max_length=200, description="详细地址")
    longitude: Optional[float] = Field(None, description="经度")
    latitude: Optional[float] = Field(None, description="纬度")
    
    total_rooms: Optional[int] = Field(0, ge=0, description="考场总数")
    available_rooms: Optional[int] = Field(0, ge=0, description="可用考场数")
    total_seats: Optional[int] = Field(0, ge=0, description="总座位数")
    capacity: Optional[int] = Field(0, ge=0, description="最大容纳人数")
    
    contact_person: Optional[str] = Field(None, max_length=50, description="负责人")
    contact_phone: Optional[str] = Field(None, max_length=20, description="联系电话")
    backup_phone: Optional[str] = Field(None, max_length=20, description="备用电话")
    
    standard_level: Optional[str] = Field("未评级", description="标准化等级")
    facility_score: Optional[float] = Field(0.0, ge=0, le=100, description="设施设备评分")
    management_score: Optional[float] = Field(0.0, ge=0, le=100, description="管理水平评分")
    security_score: Optional[float] = Field(0.0, ge=0, le=100, description="安全保障评分")
    overall_score: Optional[float] = Field(0.0, ge=0, le=100, description="综合评分")
    
    has_monitoring: Optional[bool] = Field(False, description="是否有监控设备")
    has_signal_detector: Optional[bool] = Field(False, description="是否有信号探测器")
    has_identity_checker: Optional[bool] = Field(False, description="是否有身份验证设备")
    has_emergency_power: Optional[bool] = Field(False, description="是否有应急电源")
    has_medical_room: Optional[bool] = Field(False, description="是否有医务室")
    
    status: Optional[str] = Field("正常", description="状态")
    is_active: Optional[bool] = Field(True, description="是否启用")
    
    description: Optional[str] = Field(None, description="考点描述")
    remarks: Optional[str] = Field(None, description="备注")


class ExamSiteCreate(ExamSiteBase):
    """创建考点"""
    pass


class ExamSiteUpdate(BaseModel):
    """更新考点"""
    name: Optional[str] = Field(None, max_length=100)
    code: Optional[str] = Field(None, max_length=20)
    
    province: Optional[str] = Field(None, max_length=50)
    city: Optional[str] = Field(None, max_length=50)
    district: Optional[str] = Field(None, max_length=50)
    address: Optional[str] = Field(None, max_length=200)
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    
    total_rooms: Optional[int] = Field(None, ge=0)
    available_rooms: Optional[int] = Field(None, ge=0)
    total_seats: Optional[int] = Field(None, ge=0)
    capacity: Optional[int] = Field(None, ge=0)
    
    contact_person: Optional[str] = Field(None, max_length=50)
    contact_phone: Optional[str] = Field(None, max_length=20)
    backup_phone: Optional[str] = Field(None, max_length=20)
    
    standard_level: Optional[str] = None
    facility_score: Optional[float] = Field(None, ge=0, le=100)
    management_score: Optional[float] = Field(None, ge=0, le=100)
    security_score: Optional[float] = Field(None, ge=0, le=100)
    overall_score: Optional[float] = Field(None, ge=0, le=100)
    
    has_monitoring: Optional[bool] = None
    has_signal_detector: Optional[bool] = None
    has_identity_checker: Optional[bool] = None
    has_emergency_power: Optional[bool] = None
    has_medical_room: Optional[bool] = None
    
    status: Optional[str] = None
    is_active: Optional[bool] = None
    
    description: Optional[str] = None
    remarks: Optional[str] = None


class ExamSiteResponse(ExamSiteBase):
    """考点响应模型"""
    id: int
    last_exam_date: Optional[date] = None
    exam_count: int = 0
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 考场 Schemas ====================

class ExamRoomBase(BaseModel):
    """考场基础模型"""
    exam_site_id: int = Field(..., description="考点ID")
    room_number: str = Field(..., max_length=20, description="考场号")
    room_name: Optional[str] = Field(None, max_length=100, description="考场名称")
    floor: Optional[int] = Field(None, ge=1, description="所在楼层")
    building: Optional[str] = Field(None, max_length=50, description="所在楼栋")
    
    total_seats: Optional[int] = Field(30, ge=1, description="总座位数")
    available_seats: Optional[int] = Field(30, ge=0, description="可用座位数")
    spare_seats: Optional[int] = Field(2, ge=0, description="备用座位数")
    
    room_type: Optional[str] = Field("标准考场", description="考场类型")
    has_projector: Optional[bool] = Field(False, description="是否有投影仪")
    has_computer: Optional[bool] = Field(False, description="是否有电脑")
    has_air_conditioner: Optional[bool] = Field(False, description="是否有空调")
    has_clock: Optional[bool] = Field(True, description="是否有挂钟")
    
    camera_count: Optional[int] = Field(0, ge=0, description="摄像头数量")
    signal_detector_count: Optional[int] = Field(0, ge=0, description="信号探测器数量")
    
    status: Optional[str] = Field("正常", description="状态")
    is_active: Optional[bool] = Field(True, description="是否启用")
    
    remarks: Optional[str] = Field(None, description="备注")


class ExamRoomCreate(ExamRoomBase):
    """创建考场"""
    pass


class ExamRoomUpdate(BaseModel):
    """更新考场"""
    room_number: Optional[str] = Field(None, max_length=20)
    room_name: Optional[str] = Field(None, max_length=100)
    floor: Optional[int] = Field(None, ge=1)
    building: Optional[str] = Field(None, max_length=50)
    
    total_seats: Optional[int] = Field(None, ge=1)
    available_seats: Optional[int] = Field(None, ge=0)
    spare_seats: Optional[int] = Field(None, ge=0)
    
    room_type: Optional[str] = None
    has_projector: Optional[bool] = None
    has_computer: Optional[bool] = None
    has_air_conditioner: Optional[bool] = None
    has_clock: Optional[bool] = None
    
    camera_count: Optional[int] = Field(None, ge=0)
    signal_detector_count: Optional[int] = Field(None, ge=0)
    
    status: Optional[str] = None
    is_active: Optional[bool] = None
    
    remarks: Optional[str] = None


class ExamRoomResponse(ExamRoomBase):
    """考场响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 考点检查记录 Schemas ====================

class ExamSiteInspectionBase(BaseModel):
    """考点检查记录基础模型"""
    exam_site_id: int = Field(..., description="考点ID")
    
    inspection_date: datetime = Field(..., description="检查日期")
    inspection_type: Optional[str] = Field(None, max_length=50, description="检查类型")
    inspector: Optional[str] = Field(None, max_length=50, description="检查人员")
    
    facility_check: Optional[str] = Field(None, max_length=20, description="设施设备检查结果")
    security_check: Optional[str] = Field(None, max_length=20, description="安全保障检查结果")
    environment_check: Optional[str] = Field(None, max_length=20, description="环境条件检查结果")
    management_check: Optional[str] = Field(None, max_length=20, description="管理水平检查结果")
    
    facility_score: Optional[float] = Field(0.0, ge=0, le=100, description="设施设备评分")
    security_score: Optional[float] = Field(0.0, ge=0, le=100, description="安全保障评分")
    environment_score: Optional[float] = Field(0.0, ge=0, le=100, description="环境条件评分")
    management_score: Optional[float] = Field(0.0, ge=0, le=100, description="管理水平评分")
    overall_score: Optional[float] = Field(0.0, ge=0, le=100, description="综合评分")
    
    issues_found: Optional[str] = Field(None, description="发现的问题")
    rectification_required: Optional[bool] = Field(False, description="是否需要整改")
    rectification_deadline: Optional[date] = Field(None, description="整改截止日期")
    rectification_status: Optional[str] = Field(None, max_length=20, description="整改状态")
    
    remarks: Optional[str] = Field(None, description="备注")


class ExamSiteInspectionCreate(ExamSiteInspectionBase):
    """创建考点检查记录"""
    pass


class ExamSiteInspectionUpdate(BaseModel):
    """更新考点检查记录"""
    inspection_date: Optional[datetime] = None
    inspection_type: Optional[str] = Field(None, max_length=50)
    inspector: Optional[str] = Field(None, max_length=50)
    
    facility_check: Optional[str] = Field(None, max_length=20)
    security_check: Optional[str] = Field(None, max_length=20)
    environment_check: Optional[str] = Field(None, max_length=20)
    management_check: Optional[str] = Field(None, max_length=20)
    
    facility_score: Optional[float] = Field(None, ge=0, le=100)
    security_score: Optional[float] = Field(None, ge=0, le=100)
    environment_score: Optional[float] = Field(None, ge=0, le=100)
    management_score: Optional[float] = Field(None, ge=0, le=100)
    overall_score: Optional[float] = Field(None, ge=0, le=100)
    
    issues_found: Optional[str] = None
    rectification_required: Optional[bool] = None
    rectification_deadline: Optional[date] = None
    rectification_status: Optional[str] = Field(None, max_length=20)
    
    remarks: Optional[str] = None


class ExamSiteInspectionResponse(ExamSiteInspectionBase):
    """考点检查记录响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ==================== 考点设施设备 Schemas ====================

class ExamSiteFacilityBase(BaseModel):
    """考点设施设备基础模型"""
    exam_site_id: int = Field(..., description="考点ID")
    
    facility_type: str = Field(..., max_length=50, description="设施类型")
    facility_name: Optional[str] = Field(None, max_length=100, description="设施名称")
    facility_model: Optional[str] = Field(None, max_length=100, description="设施型号")
    facility_brand: Optional[str] = Field(None, max_length=50, description="设施品牌")
    
    quantity: Optional[int] = Field(1, ge=1, description="数量")
    working_quantity: Optional[int] = Field(1, ge=0, description="正常工作数量")
    status: Optional[str] = Field("正常", description="状态")
    
    purchase_date: Optional[date] = Field(None, description="采购日期")
    warranty_expire_date: Optional[date] = Field(None, description="保修到期日期")
    supplier: Optional[str] = Field(None, max_length=100, description="供应商")
    
    location: Optional[str] = Field(None, max_length=100, description="放置位置")
    
    remarks: Optional[str] = Field(None, description="备注")


class ExamSiteFacilityCreate(ExamSiteFacilityBase):
    """创建考点设施设备"""
    pass


class ExamSiteFacilityUpdate(BaseModel):
    """更新考点设施设备"""
    facility_type: Optional[str] = Field(None, max_length=50)
    facility_name: Optional[str] = Field(None, max_length=100)
    facility_model: Optional[str] = Field(None, max_length=100)
    facility_brand: Optional[str] = Field(None, max_length=50)
    
    quantity: Optional[int] = Field(None, ge=1)
    working_quantity: Optional[int] = Field(None, ge=0)
    status: Optional[str] = None
    
    purchase_date: Optional[date] = None
    warranty_expire_date: Optional[date] = None
    supplier: Optional[str] = Field(None, max_length=100)
    
    location: Optional[str] = Field(None, max_length=100)
    
    remarks: Optional[str] = None


class ExamSiteFacilityResponse(ExamSiteFacilityBase):
    """考点设施设备响应模型"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True