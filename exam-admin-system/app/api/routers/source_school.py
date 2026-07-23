# 生源学校服务管理 API 路由

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.source_school import SourceSchool, SchoolServiceRecord
from app.schemas.source_school import (
    SourceSchoolCreate,
    SourceSchoolUpdate,
    SourceSchoolResponse,
    SchoolServiceRecordCreate,
    SchoolServiceRecordUpdate,
    SchoolServiceRecordResponse,
)

router = APIRouter(prefix="/source-schools", tags=["生源学校服务管理"])


# ==================== 生源学校 API ====================

@router.post("/", response_model=SourceSchoolResponse, summary="创建生源学校")
def create_source_school(school: SourceSchoolCreate, db: Session = Depends(get_db)):
    """创建新的生源学校"""
    # 检查学校代码是否已存在
    existing = db.query(SourceSchool).filter(SourceSchool.code == school.code).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"学校代码 {school.code} 已存在")
    
    db_school = SourceSchool(**school.model_dump())
    db.add(db_school)
    db.commit()
    db.refresh(db_school)
    return db_school


@router.get("/", response_model=List[SourceSchoolResponse], summary="获取生源学校列表")
def list_source_schools(
    skip: int = Query(0, ge=0, description="跳过记录数"),
    limit: int = Query(100, ge=1, le=100, description="返回记录数"),
    province: Optional[str] = Query(None, description="省份筛选"),
    city: Optional[str] = Query(None, description="城市筛选"),
    school_type: Optional[str] = Query(None, description="学校类型筛选"),
    service_status: Optional[str] = Query(None, description="服务状态筛选"),
    is_active: Optional[bool] = Query(None, description="是否活跃"),
    db: Session = Depends(get_db),
):
    """获取生源学校列表，支持多条件筛选"""
    query = db.query(SourceSchool)
    
    if province:
        query = query.filter(SourceSchool.province == province)
    if city:
        query = query.filter(SourceSchool.city == city)
    if school_type:
        query = query.filter(SourceSchool.school_type == school_type)
    if service_status:
        query = query.filter(SourceSchool.service_status == service_status)
    if is_active is not None:
        query = query.filter(SourceSchool.is_active == is_active)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{school_id}", response_model=SourceSchoolResponse, summary="获取生源学校详情")
def get_source_school(school_id: int, db: Session = Depends(get_db)):
    """根据ID获取生源学校详情"""
    school = db.query(SourceSchool).filter(SourceSchool.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail=f"生源学校 ID {school_id} 不存在")
    return school


@router.put("/{school_id}", response_model=SourceSchoolResponse, summary="更新生源学校")
def update_source_school(school_id: int, school: SourceSchoolUpdate, db: Session = Depends(get_db)):
    """更新生源学校信息"""
    db_school = db.query(SourceSchool).filter(SourceSchool.id == school_id).first()
    if not db_school:
        raise HTTPException(status_code=404, detail=f"生源学校 ID {school_id} 不存在")
    
    # 检查代码唯一性
    if school.code and school.code != db_school.code:
        existing = db.query(SourceSchool).filter(SourceSchool.code == school.code).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"学校代码 {school.code} 已存在")
    
    update_data = school.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_school, key, value)
    
    db.commit()
    db.refresh(db_school)
    return db_school


@router.delete("/{school_id}", summary="删除生源学校")
def delete_source_school(school_id: int, db: Session = Depends(get_db)):
    """删除生源学校"""
    db_school = db.query(SourceSchool).filter(SourceSchool.id == school_id).first()
    if not db_school:
        raise HTTPException(status_code=404, detail=f"生源学校 ID {school_id} 不存在")
    
    db.delete(db_school)
    db.commit()
    return {"message": f"生源学校 ID {school_id} 已删除"}


# ==================== 学校服务记录 API ====================

@router.post("/{school_id}/service-records/", response_model=SchoolServiceRecordResponse, summary="创建学校服务记录")
def create_service_record(school_id: int, record: SchoolServiceRecordCreate, db: Session = Depends(get_db)):
    """为指定学校创建服务记录"""
    # 验证学校存在
    school = db.query(SourceSchool).filter(SourceSchool.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail=f"生源学校 ID {school_id} 不存在")
    
    # 创建服务记录
    record_data = record.model_dump()
    record_data["school_id"] = school_id
    db_record = SchoolServiceRecord(**record_data)
    db.add(db_record)
    
    # 更新学校服务统计
    school.service_count += 1
    school.last_service_date = record.service_date
    
    db.commit()
    db.refresh(db_record)
    return db_record


@router.get("/{school_id}/service-records/", response_model=List[SchoolServiceRecordResponse], summary="获取学校服务记录列表")
def list_service_records(
    school_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取指定学校的服务记录列表"""
    school = db.query(SourceSchool).filter(SourceSchool.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail=f"生源学校 ID {school_id} 不存在")
    
    records = db.query(SchoolServiceRecord).filter(
        SchoolServiceRecord.school_id == school_id
    ).offset(skip).limit(limit).all()
    return records


@router.get("/service-records/{record_id}", response_model=SchoolServiceRecordResponse, summary="获取服务记录详情")
def get_service_record(record_id: int, db: Session = Depends(get_db)):
    """根据ID获取服务记录详情"""
    record = db.query(SchoolServiceRecord).filter(SchoolServiceRecord.id == record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail=f"服务记录 ID {record_id} 不存在")
    return record


@router.put("/service-records/{record_id}", response_model=SchoolServiceRecordResponse, summary="更新服务记录")
def update_service_record(record_id: int, record: SchoolServiceRecordUpdate, db: Session = Depends(get_db)):
    """更新服务记录"""
    db_record = db.query(SchoolServiceRecord).filter(SchoolServiceRecord.id == record_id).first()
    if not db_record:
        raise HTTPException(status_code=404, detail=f"服务记录 ID {record_id} 不存在")
    
    update_data = record.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_record, key, value)
    
    db.commit()
    db.refresh(db_record)
    return db_record


@router.delete("/service-records/{record_id}", summary="删除服务记录")
def delete_service_record(record_id: int, db: Session = Depends(get_db)):
    """删除服务记录"""
    db_record = db.query(SchoolServiceRecord).filter(SchoolServiceRecord.id == record_id).first()
    if not db_record:
        raise HTTPException(status_code=404, detail=f"服务记录 ID {record_id} 不存在")
    
    db.delete(db_record)
    db.commit()
    return {"message": f"服务记录 ID {record_id} 已删除"}