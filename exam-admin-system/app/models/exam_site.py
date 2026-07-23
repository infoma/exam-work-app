# 考点标准化管理模型

from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float, Date
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class ExamSite(Base):
    """考点模型"""
    __tablename__ = "exam_sites"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # 基本信息
    name = Column(String(100), nullable=False, comment="考点名称")
    code = Column(String(20), unique=True, nullable=False, comment="考点代码")
    
    # 地理位置
    province = Column(String(50), comment="省份")
    city = Column(String(50), comment="城市")
    district = Column(String(50), comment="区/县")
    address = Column(String(200), comment="详细地址")
    longitude = Column(Float, comment="经度")
    latitude = Column(Float, comment="纬度")
    
    # 场地信息
    total_rooms = Column(Integer, default=0, comment="考场总数")
    available_rooms = Column(Integer, default=0, comment="可用考场数")
    total_seats = Column(Integer, default=0, comment="总座位数")
    capacity = Column(Integer, default=0, comment="最大容纳人数")
    
    # 联系信息
    contact_person = Column(String(50), comment="负责人")
    contact_phone = Column(String(20), comment="联系电话")
    backup_phone = Column(String(20), comment="备用电话")
    
    # 标准化指标
    standard_level = Column(String(20), default="未评级", comment="标准化等级（一级/二级/三级/未评级）")
    facility_score = Column(Float, default=0.0, comment="设施设备评分")
    management_score = Column(Float, default=0.0, comment="管理水平评分")
    security_score = Column(Float, default=0.0, comment="安全保障评分")
    overall_score = Column(Float, default=0.0, comment="综合评分")
    
    # 设施状态
    has_monitoring = Column(Boolean, default=False, comment="是否有监控设备")
    has_signal_detector = Column(Boolean, default=False, comment="是否有信号探测器")
    has_identity_checker = Column(Boolean, default=False, comment="是否有身份验证设备")
    has_emergency_power = Column(Boolean, default=False, comment="是否有应急电源")
    has_medical_room = Column(Boolean, default=False, comment="是否有医务室")
    
    # 运营状态
    status = Column(String(20), default="正常", comment="状态（正常/维修中/停用）")
    is_active = Column(Boolean, default=True, comment="是否启用")
    last_exam_date = Column(Date, comment="最近考试日期")
    exam_count = Column(Integer, default=0, comment="累计考试次数")
    
    # 系统字段
    description = Column(Text, comment="考点描述")
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<ExamSite(id={self.id}, name='{self.name}', code='{self.code}')>"


class ExamRoom(Base):
    """考场模型"""
    __tablename__ = "exam_rooms"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    exam_site_id = Column(Integer, nullable=False, index=True, comment="考点ID")
    
    # 基本信息
    room_number = Column(String(20), nullable=False, comment="考场号")
    room_name = Column(String(100), comment="考场名称")
    floor = Column(Integer, comment="所在楼层")
    building = Column(String(50), comment="所在楼栋")
    
    # 容量信息
    total_seats = Column(Integer, default=30, comment="总座位数")
    available_seats = Column(Integer, default=30, comment="可用座位数")
    spare_seats = Column(Integer, default=2, comment="备用座位数")
    
    # 设施配置
    room_type = Column(String(20), default="标准考场", comment="考场类型（标准考场/特殊考场）")
    has_projector = Column(Boolean, default=False, comment="是否有投影仪")
    has_computer = Column(Boolean, default=False, comment="是否有电脑")
    has_air_conditioner = Column(Boolean, default=False, comment="是否有空调")
    has_clock = Column(Boolean, default=True, comment="是否有挂钟")
    
    # 监控设备
    camera_count = Column(Integer, default=0, comment="摄像头数量")
    signal_detector_count = Column(Integer, default=0, comment="信号探测器数量")
    
    # 状态
    status = Column(String(20), default="正常", comment="状态（正常/维修中/停用）")
    is_active = Column(Boolean, default=True, comment="是否启用")
    
    # 系统字段
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<ExamRoom(id={self.id}, room_number='{self.room_number}', exam_site_id={self.exam_site_id})>"


class ExamSiteInspection(Base):
    """考点检查记录模型"""
    __tablename__ = "exam_site_inspections"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    exam_site_id = Column(Integer, nullable=False, index=True, comment="考点ID")
    
    # 检查信息
    inspection_date = Column(DateTime, nullable=False, comment="检查日期")
    inspection_type = Column(String(50), comment="检查类型（日常检查/考前检查/专项检查）")
    inspector = Column(String(50), comment="检查人员")
    
    # 检查项目
    facility_check = Column(String(20), comment="设施设备检查结果")
    security_check = Column(String(20), comment="安全保障检查结果")
    environment_check = Column(String(20), comment="环境条件检查结果")
    management_check = Column(String(20), comment="管理水平检查结果")
    
    # 评分
    facility_score = Column(Float, default=0.0, comment="设施设备评分")
    security_score = Column(Float, default=0.0, comment="安全保障评分")
    environment_score = Column(Float, default=0.0, comment="环境条件评分")
    management_score = Column(Float, default=0.0, comment="管理水平评分")
    overall_score = Column(Float, default=0.0, comment="综合评分")
    
    # 问题与整改
    issues_found = Column(Text, comment="发现的问题")
    rectification_required = Column(Boolean, default=False, comment="是否需要整改")
    rectification_deadline = Column(Date, comment="整改截止日期")
    rectification_status = Column(String(20), comment="整改状态")
    
    # 系统字段
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<ExamSiteInspection(id={self.id}, exam_site_id={self.exam_site_id})>"


class ExamSiteFacility(Base):
    """考点设施设备模型"""
    __tablename__ = "exam_site_facilities"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    exam_site_id = Column(Integer, nullable=False, index=True, comment="考点ID")
    
    # 设施信息
    facility_type = Column(String(50), nullable=False, comment="设施类型（监控设备/信号探测器/身份验证设备等）")
    facility_name = Column(String(100), comment="设施名称")
    facility_model = Column(String(100), comment="设施型号")
    facility_brand = Column(String(50), comment="设施品牌")
    
    # 数量与状态
    quantity = Column(Integer, default=1, comment="数量")
    working_quantity = Column(Integer, default=1, comment="正常工作数量")
    status = Column(String(20), default="正常", comment="状态（正常/维修中/报废）")
    
    # 采购信息
    purchase_date = Column(Date, comment="采购日期")
    warranty_expire_date = Column(Date, comment="保修到期日期")
    supplier = Column(String(100), comment="供应商")
    
    # 位置
    location = Column(String(100), comment="放置位置")
    
    # 系统字段
    remarks = Column(Text, comment="备注")
    created_at = Column(DateTime, default=datetime.now, comment="创建时间")
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, comment="更新时间")
    
    def __repr__(self):
        return f"<ExamSiteFacility(id={self.id}, facility_type='{self.facility_type}', exam_site_id={self.exam_site_id})>"