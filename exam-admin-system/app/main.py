# 考务管理系统主入口

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import api_router
from app.database import init_db

# 创建 FastAPI 应用
app = FastAPI(
    title="考务管理系统 API",
    description="""
## 考务管理系统

基于 FastAPI 的考务管理系统后端服务，包含以下模块：

### 生源学校服务管理
- 生源学校基本信息管理
- 学校服务记录管理
- 服务统计与评估

### 工作人员管理
- 工作人员基本信息管理
- 培训记录管理
- 考试分配管理

### 考点标准化管理
- 考点基本信息管理
- 考场管理
- 检查记录管理
- 设施设备管理
    """,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    """应用启动时初始化数据库"""
    init_db()


@app.get("/", tags=["Root"])
async def root():
    """根路径，返回 API 信息"""
    return {
        "message": "考务管理系统 API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """健康检查接口"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)