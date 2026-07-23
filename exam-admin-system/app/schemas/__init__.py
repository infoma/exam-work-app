# Schemas 包初始化

from app.schemas.source_school import (
    SourceSchoolCreate,
    SourceSchoolUpdate,
    SourceSchoolResponse,
    SchoolServiceRecordCreate,
    SchoolServiceRecordUpdate,
    SchoolServiceRecordResponse,
)
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

__all__ = [
    # Source School
    "SourceSchoolCreate",
    "SourceSchoolUpdate",
    "SourceSchoolResponse",
    "SchoolServiceRecordCreate",
    "SchoolServiceRecordUpdate",
    "SchoolServiceRecordResponse",
    # Staff
    "StaffCreate",
    "StaffUpdate",
    "StaffResponse",
    "StaffTrainingCreate",
    "StaffTrainingUpdate",
    "StaffTrainingResponse",
    "StaffAssignmentCreate",
    "StaffAssignmentUpdate",
    "StaffAssignmentResponse",
    # Exam Site
    "ExamSiteCreate",
    "ExamSiteUpdate",
    "ExamSiteResponse",
    "ExamRoomCreate",
    "ExamRoomUpdate",
    "ExamRoomResponse",
    "ExamSiteInspectionCreate",
    "ExamSiteInspectionUpdate",
    "ExamSiteInspectionResponse",
    "ExamSiteFacilityCreate",
    "ExamSiteFacilityUpdate",
    "ExamSiteFacilityResponse",
]