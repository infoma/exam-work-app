# 工作人员管理 API 路由

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.staff import Staff, StaffTraining, StaffAssignment
from app.schemas.staff import (
    StaffCreate,
    StaffUpdate,
    StaffResponse,
    StaffTrainingCreate,
    StaffTrainingUpdate,
    StaffTrainingResponse,
    StaffAssignmentCreate,
    StaffAssignmentUpdate,
    StaffAssignmentResponse,
)

router = APIRouter(prefix="/staffs", tags=["工作人员管理"])


# ==================== 工作人员 API ====================

@router.post("/", response_model=StaffResponse, summary="创建工作人员")
def create_staff(staff: StaffCreate, db: Session = Depends(get_db)):
    """创建新的工作人员"""
    # 检查工号是否已存在
    existing = db.query(Staff).filter(Staff.employee_id == staff.employee_id).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"工号 {staff.employee_id} 已存在")
    
    # 检查身份证号是否已存在
    if staff.id_card:
        existing = db.query(Staff).filter(Staff.id_card == staff.id_card).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"身份证号 {staff.id_card} 已存在")
    
    db_staff = Staff(**staff.model_dump())
    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)
    return db_staff


@router.get("/", response_model=List[StaffResponse], summary="获取工作人员列表")
def list_staffs(
    skip: int = Query(0, ge=0, description="跳过记录数"),
    limit: int = Query(100, ge=1, le=100, description="返回记录数"),
    department: Optional[str] = Query(None, description="部门筛选"),
    status: Optional[str] = Query(None, description="状态筛选"),
    role: Optional[str] = Query(None, description="角色筛选"),
    is_qualified: Optional[bool] = Query(None, description="是否具备监考资格"),
    db: Session = Depends(get_db),
):
    """获取工作人员列表，支持多条件筛选"""
    query = db.query(Staff)
    
    if department:
        query = query.filter(Staff.department == department)
    if status:
        query = query.filter(Staff.status == status)
    if role:
        query = query.filter(Staff.role == role)
    if is_qualified is not None:
        query = query.filter(Staff.is_qualified == is_qualified)
    
    return query.offset(skip).limit(limit).all()


@router.get("/{staff_id}", response_model=StaffResponse, summary="获取工作人员详情")
def get_staff(staff_id: int, db: Session = Depends(get_db)):
    """根据ID获取工作人员详情"""
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    return staff


@router.put("/{staff_id}", response_model=StaffResponse, summary="更新工作人员")
def update_staff(staff_id: int, staff: StaffUpdate, db: Session = Depends(get_db)):
    """更新工作人员信息"""
    db_staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not db_staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    # 检查工号唯一性
    if staff.employee_id and staff.employee_id != db_staff.employee_id:
        existing = db.query(Staff).filter(Staff.employee_id == staff.employee_id).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"工号 {staff.employee_id} 已存在")
    
    # 检查身份证号唯一性
    if staff.id_card and staff.id_card != db_staff.id_card:
        existing = db.query(Staff).filter(Staff.id_card == staff.id_card).first()
        if existing:
            raise HTTPException(status_code=400, detail=f"身份证号 {staff.id_card} 已存在")
    
    update_data = staff.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_staff, key, value)
    
    db.commit()
    db.refresh(db_staff)
    return db_staff


@router.delete("/{staff_id}", summary="删除工作人员")
def delete_staff(staff_id: int, db: Session = Depends(get_db)):
    """删除工作人员"""
    db_staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not db_staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    db.delete(db_staff)
    db.commit()
    return {"message": f"工作人员 ID {staff_id} 已删除"}


# ==================== 工作人员培训记录 API ====================

@router.post("/{staff_id}/trainings/", response_model=StaffTrainingResponse, summary="创建培训记录")
def create_training(staff_id: int, training: StaffTrainingCreate, db: Session = Depends(get_db)):
    """为指定工作人员创建培训记录"""
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    training_data = training.model_dump()
    training_data["staff_id"] = staff_id
    db_training = StaffTraining(**training_data)
    db.add(db_training)
    
    # 更新工作人员培训状态
    staff.training_status = "已培训"
    staff.training_date = training.training_date.date() if hasattr(training.training_date, 'date') else training.training_date
    
    db.commit()
    db.refresh(db_training)
    return db_training


@router.get("/{staff_id}/trainings/", response_model=List[StaffTrainingResponse], summary="获取培训记录列表")
def list_trainings(
    staff_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取指定工作人员的培训记录列表"""
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    trainings = db.query(StaffTraining).filter(
        StaffTraining.staff_id == staff_id
    ).offset(skip).limit(limit).all()
    return trainings


@router.get("/trainings/{training_id}", response_model=StaffTrainingResponse, summary="获取培训记录详情")
def get_training(training_id: int, db: Session = Depends(get_db)):
    """根据ID获取培训记录详情"""
    training = db.query(StaffTraining).filter(StaffTraining.id == training_id).first()
    if not training:
        raise HTTPException(status_code=404, detail=f"培训记录 ID {training_id} 不存在")
    return training


@router.put("/trainings/{training_id}", response_model=StaffTrainingResponse, summary="更新培训记录")
def update_training(training_id: int, training: StaffTrainingUpdate, db: Session = Depends(get_db)):
    """更新培训记录"""
    db_training = db.query(StaffTraining).filter(StaffTraining.id == training_id).first()
    if not db_training:
        raise HTTPException(status_code=404, detail=f"培训记录 ID {training_id} 不存在")
    
    update_data = training.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_training, key, value)
    
    db.commit()
    db.refresh(db_training)
    return db_training


@router.delete("/trainings/{training_id}", summary="删除培训记录")
def delete_training(training_id: int, db: Session = Depends(get_db)):
    """删除培训记录"""
    db_training = db.query(StaffTraining).filter(StaffTraining.id == training_id).first()
    if not db_training:
        raise HTTPException(status_code=404, detail=f"培训记录 ID {training_id} 不存在")
    
    db.delete(db_training)
    db.commit()
    return {"message": f"培训记录 ID {training_id} 已删除"}


# ==================== 工作人员分配记录 API ====================

@router.post("/{staff_id}/assignments/", response_model=StaffAssignmentResponse, summary="创建分配记录")
def create_assignment(staff_id: int, assignment: StaffAssignmentCreate, db: Session = Depends(get_db)):
    """为指定工作人员创建分配记录"""
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    assignment_data = assignment.model_dump()
    assignment_data["staff_id"] = staff_id
    db_assignment = StaffAssignment(**assignment_data)
    db.add(db_assignment)
    
    # 更新工作人员监考经验
    staff.exam_experience += 1
    staff.last_exam_date = assignment.exam_date
    
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


@router.get("/{staff_id}/assignments/", response_model=List[StaffAssignmentResponse], summary="获取分配记录列表")
def list_assignments(
    staff_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """获取指定工作人员的分配记录列表"""
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail=f"工作人员 ID {staff_id} 不存在")
    
    assignments = db.query(StaffAssignment).filter(
        StaffAssignment.staff_id == staff_id
    ).offset(skip).limit(limit).all()
    return assignments


@router.get("/assignments/{assignment_id}", response_model=StaffAssignmentResponse, summary="获取分配记录详情")
def get_assignment(assignment_id: int, db: Session = Depends(get_db)):
    """根据ID获取分配记录详情"""
    assignment = db.query(StaffAssignment).filter(StaffAssignment.id == assignment_id).first()
    if not assignment:
        raise HTTPException(status_code=404, detail=f"分配记录 ID {assignment_id} 不存在")
    return assignment


@router.put("/assignments/{assignment_id}", response_model=StaffAssignmentResponse, summary="更新分配记录")
def update_assignment(assignment_id: int, assignment: StaffAssignmentUpdate, db: Session = Depends(get_db)):
    """更新分配记录"""
    db_assignment = db.query(StaffAssignment).filter(StaffAssignment.id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail=f"分配记录 ID {assignment_id} 不存在")
    
    update_data = assignment.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_assignment, key, value)
    
    db.commit()
    db.refresh(db_assignment)
    return db_assignment


@router.delete("/assignments/{assignment_id}", summary="删除分配记录")
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    """删除分配记录"""
    db_assignment = db.query(StaffAssignment).filter(StaffAssignment.id == assignment_id).first()
    if not db_assignment:
        raise HTTPException(status_code=404, detail=f"分配记录 ID {assignment_id} 不存在")
    
    db.delete(db_assignment)
    db.commit()
    return {"message": f"分配记录 ID {assignment_id} 已删除"}