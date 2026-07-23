# 考点标准化管理 API 路由

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.exam_site import ExamSite, ExamRoom, ExamSiteInspection, ExamSiteFacility
from app.schemas.exam_site import (
    ExamSiteCreate,
    ExamSiteUpdate,
    ExamSiteResponse,
    ExamRoomCreate,
    ExamRoomUpdate,
    ExamRoomResponse,
    ExamSiteInspectionCreate,
    ExamSiteInspectionUpdate,
    ExamSiteInspectionResponse,
    ExamSiteFacilityCreate,
    ExamSiteFacilityUpdate,
    ExamSiteFacilityResponse,
)

router = APIRouter(prefix="/exam-sites", tags=["考点标准化管理"])


# ==================== 考点 API ====================

@router.post("/", response_model=ExamSiteResponse, summary="创建考点")
def create_exam_site(exam_site: ExamSiteCreate, db: Session = Depends(get_db)):
    """创建新的考点"""
    existing = db.query(ExamSite).filter(ExamSite.code == exam_site.code).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"考点代码 {exam_site.code} 已存在")
    
    db_exam_site = ExamSite(**exam_site.model_dump())
    db.add(db_exam_site)
    db.commit()
    db.refresh(db_exam_site)
    return db_exam_site


@router.get("/", response_model=List[ExamSiteResponse], summary="获取考点列表")
def list_exam_sites(
    skip: int = Query(0, ge=0, description="跳过记录数"),
    limit: int = Query(100, ge=1, le=100, description="返回记录数"),
    province: Optional[str] = Query(None, description="省份筛选"),
    city: Optional[str] = Query(None, description="城市筛选"),
    standard_level: Optional[str] = Query(None, description="标准化等级筛选"),
    status: Optional[str] = Query(None, description="状态筛选"),
    is_active: Optional[bool] = Query(None, description="是否启用"),
    db: Session = Depends(get_db),
):
    """获取考点列表，支持多条件筛选"""
    query = db.query(ExamSite)
    
    if province:
        query = query.filter(ExamSite.province == province)
    if city:
        query = query.filter(ExamSite.city == city)
    if standard_level:
        query = query.filter(ExamSite.standard_level == standard_level)
    if status:
        query = query.filter(ExamSite.status == status)
    if is_active is not None:
        query = query.filter(ExamSite.is_active == is_active)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{site_id}", response_model=ExamSiteResponse, summary="获取考点详情")
def get_exam_site(site_id: int, db: Session = Depends(get_db)):
    """根据ID获取考点详情"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    return exam_site


@router.put("/{site_id}", response_model=ExamSiteResponse, summary="更新考点")
def update_exam_site(site_id: int, exam_site: ExamSiteUpdate, db: Session = Depends(get_db)):
    """更新考点信息"""
    db_exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not db_exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    if exam_site.code and exam_site.code != db_exam_site.code:
        existing = db.query(ExamSite).filter(ExamSite.code == exam_site.code).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"考点代码 {exam_site.code} 已存在")
    
    update_data = exam_site.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_exam_site, key, value)
    
    db.commit()
    db.refresh(db_exam_site)
    return db_exam_site


@router.delete("/{site_id}", summary="删除考点")
def delete_exam_site(site_id: int, db: Session = Depends(get_db)):
    """删除考点"""
    db_exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not db_exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    db.delete(db_exam_site)
    db.commit()
    return {"message": f"考点 ID {site_id} 已删除"}


# ==================== 考场 API ====================

@router.post("/{site_id}/rooms/", response_model=ExamRoomResponse, summary="创建考场")
def create_exam_room(site_id: int, exam_room: ExamRoomCreate, db: Session = Depends(get_db)):
    """为指定考点创建考场"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    room_data = exam_room.model_dump()
    room_data["exam_site_id"] = site_id
    db_room = ExamRoom(**room_data)
    db.add(db_room)
    
    # 更新考点统计
    exam_site.total_rooms += 1
    exam_site.total_seats += exam_room.total_seats or 0
    
    db.commit()
    db.refresh(db_room)
    return db_room


@router.get("/{site_id}/rooms/", response_model=List[ExamRoomResponse], summary="获取考场列表")
def list_exam_rooms(
    site_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[str] = Query(None, description="状态筛选"),
    db: Session = Depends(get_db),
):
    """获取指定考点的考场列表"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    query = db.query(ExamRoom).filter(ExamRoom.exam_site_id == site_id)
    if status:
        query = query.filter(ExamRoom.status == status)
    
    return query.offset(skip).limit(limit).all()


@router.get("/rooms/{room_id}", response_model=ExamRoomResponse, summary="获取考场详情")
def get_exam_room(room_id: int, db: Session = Depends(get_db)):
    """根据ID获取考场详情"""
    exam_room = db.query(ExamRoom).filter(ExamRoom.id == room_id).first()
    if not exam_room:
        raise HTTPException(status_code=404, detail=f"考场 ID {room_id} 不存在")
    return exam_room


@router.put("/rooms/{room_id}", response_model=ExamRoomResponse, summary="更新考场")
def update_exam_room(room_id: int, exam_room: ExamRoomUpdate, db: Session = Depends(get_db)):
    """更新考场信息"""
    db_room = db.query(ExamRoom).filter(ExamRoom.id == room_id).first()
    if not db_room:
        raise HTTPException(status_code=404, detail=f"考场 ID {room_id} 不存在")
    
    update_data = exam_room.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_room, key, value)
    
    db.commit()
    db.refresh(db_room)
    return db_room


@router.delete("/rooms/{room_id}", summary="删除考场")
def delete_exam_room(room_id: int, db: Session = Depends(get_db)):
    """删除考场"""
    db_room = db.query(ExamRoom).filter(ExamRoom.id == room_id).first()
    if not db_room:
        raise HTTPException(status_code=404, detail=f"考场 ID {room_id} 不存在")
    
    exam_site = db.query(ExamSite).filter(ExamSite.id == db_room.exam_site_id).first()
    if exam_site:
        exam_site.total_rooms -= 1
        exam_site.total_seats -= db_room.total_seats or 0
    
    db.delete(db_room)
    db.commit()
    return {"message": f"考场 ID {room_id} 已删除"}


# ==================== 考点检查记录 API ====================

@router.post("/{site_id}/inspections/", response_model=ExamSiteInspectionResponse, summary="创建检查记录")
def create_inspection(site_id: int, inspection: ExamSiteInspectionCreate, db: Session = Depends(get_db)):
    """为指定考点创建检查记录"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    inspection_data = inspection.model_dump()
    inspection_data["exam_site_id"] = site_id
    db_inspection = ExamSiteInspection(**inspection_data)
    db.add(db_inspection)
    
    # 更新考点评分
    if inspection.overall_score:
        exam_site.facility_score = inspection.facility_score or exam_site.facility_score
        exam_site.management_score = inspection.management_score or exam_site.management_score
        exam_site.security_score = inspection.security_score or exam_site.security_score
        exam_site.overall_score = inspection.overall_score
    
    db.commit()
    db.refresh(db_inspection)
    return db_inspection


@router.get("/{site_id}/inspections/", response_model=List[ExamSiteInspectionResponse], summary="获取检查记录列表")
def list_inspections(
    site_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取指定考点的检查记录列表"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    inspections = db.query(ExamSiteInspection).filter(
        ExamSiteInspection.exam_site_id == site_id
    ).offset(skip).limit(limit).all()
    return inspections


@router.get("/inspections/{inspection_id}", response_model=ExamSiteInspectionResponse, summary="获取检查记录详情")
def get_inspection(inspection_id: int, db: Session = Depends(get_db)):
    """根据ID获取检查记录详情"""
    inspection = db.query(ExamSiteInspection).filter(ExamSiteInspection.id == inspection_id).first()
    if not inspection:
        raise HTTPException(status_code=404, detail=f"检查记录 ID {inspection_id} 不存在")
    return inspection


@router.put("/inspections/{inspection_id}", response_model=ExamSiteInspectionResponse, summary="更新检查记录")
def update_inspection(inspection_id: int, inspection: ExamSiteInspectionUpdate, db: Session = Depends(get_db)):
    """更新检查记录"""
    db_inspection = db.query(ExamSiteInspection).filter(ExamSiteInspection.id == inspection_id).first()
    if not db_inspection:
        raise HTTPException(status_code=404, detail=f"检查记录 ID {inspection_id} 不存在")
    
    update_data = inspection.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_inspection, key, value)
    
    db.commit()
    db.refresh(db_inspection)
    return db_inspection


@router.delete("/inspections/{inspection_id}", summary="删除检查记录")
def delete_inspection(inspection_id: int, db: Session = Depends(get_db)):
    """删除检查记录"""
    db_inspection = db.query(ExamSiteInspection).filter(ExamSiteInspection.id == inspection_id).first()
    if not db_inspection:
        raise HTTPException(status_code=404, detail=f"检查记录 ID {inspection_id} 不存在")
    
    db.delete(db_inspection)
    db.commit()
    return {"message": f"检查记录 ID {inspection_id} 已删除"}


# ==================== 考点设施设备 API ====================

@router.post("/{site_id}/facilities/", response_model=ExamSiteFacilityResponse, summary="创建设施设备")
def create_facility(site_id: int, facility: ExamSiteFacilityCreate, db: Session = Depends(get_db)):
    """为指定考点创建设施设备记录"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    facility_data = facility.model_dump()
    facility_data["exam_site_id"] = site_id
    db_facility = ExamSiteFacility(**facility_data)
    db.add(db_facility)
    db.commit()
    db.refresh(db_facility)
    return db_facility


@router.get("/{site_id}/facilities/", response_model=List[ExamSiteFacilityResponse], summary="获取设施设备列表")
def list_facilities(
    site_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    facility_type: Optional[str] = Query(None, description="设施类型筛选"),
    status: Optional[str] = Query(None, description="状态筛选"),
    db: Session = Depends(get_db),
):
    """获取指定考点的设施设备列表"""
    exam_site = db.query(ExamSite).filter(ExamSite.id == site_id).first()
    if not exam_site:
        raise HTTPException(status_code=404, detail=f"考点 ID {site_id} 不存在")
    
    query = db.query(ExamSiteFacility).filter(ExamSiteFacility.exam_site_id == site_id)
    if facility_type:
        query = query.filter(ExamSiteFacility.facility_type == facility_type)
    if status:
        query = query.filter(ExamSiteFacility.status == status)
    
    return query.offset(skip).limit(limit).all()


@router.get("/facilities/{facility_id}", response_model=ExamSiteFacilityResponse, summary="获取设施设备详情")
def get_facility(facility_id: int, db: Session = Depends(get_db)):
    """根据ID获取设施设备详情"""
    facility = db.query(ExamSiteFacility).filter(ExamSiteFacility.id == facility_id).first()
    if not facility:
        raise HTTPException(status_code=404, detail=f"设施设备 ID {facility_id} 不存在")
    return facility


@router.put("/facilities/{facility_id}", response_model=ExamSiteFacilityResponse, summary="更新设施设备")
def update_facility(facility_id: int, facility: ExamSiteFacilityUpdate, db: Session = Depends(get_db)):
    """更新设施设备信息"""
    db_facility = db.query(ExamSiteFacility).filter(ExamSiteFacility.id == facility_id).first()
    if not db_facility:
        raise HTTPException(status_code=404, detail=f"设施设备 ID {facility_id} 不存在")
    
    update_data = facility.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_facility, key, value)
    
    db.commit()
    db.refresh(db_facility)
    return db_facility


@router.delete("/facilities/{facility_id}", summary="删除设施设备")
def delete_facility(facility_id: int, db: Session = Depends(get_db)):
    """删除设施设备"""
    db_facility = db.query(ExamSiteFacility).filter(ExamSiteFacility.id == facility_id).first()
    if not db_facility:
        raise HTTPException(status_code=404, detail=f"设施设备 ID {facility_id} 不存在")
    
    db.delete(db_facility)
    db.commit()
    return {"message": f"设施设备 ID {facility_id} 已删除"}