# API 路由包初始化

from fastapi import APIRouter
from app.api.routers import source_school, staff, exam_site

api_router = APIRouter()

# 注册各模块路由
api_router.include_router(source_school.router)
api_router.include_router(staff.router)
api_router.include_router(exam_site.router)