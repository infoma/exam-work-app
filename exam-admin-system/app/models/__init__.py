# 数据库模型包初始化

from app.models.source_school import SourceSchool, SchoolServiceRecord
from app.models.staff import Staff, StaffTraining, StaffAssignment
from app.models.exam_site import ExamSite, ExamRoom, ExamSiteInspection, ExamSiteFacility

__all__ = [
    "SourceSchool",
    "SchoolServiceRecord",
    "Staff",
    "StaffTraining",
    "StaffAssignment",
    "ExamSite",
    "ExamRoom",
    "ExamSiteInspection",
    "ExamSiteFacility",
]