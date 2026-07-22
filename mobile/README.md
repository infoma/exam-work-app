# 大型考试工作管理系统 - 移动端

基于 Flutter 开发的考试工作管理 APP，支持 Android 和 iOS。

## 功能模块

- 🔐 **登录认证** - JWT 登录、自动登录、Token 刷新
- 📊 **工作台** - 数据概览、待办事项、快捷入口
- 📋 **考试项目** - 考试列表、详情查看、进度跟踪
- 🏫 **考点管理** - 考点信息、考场分配、人员管理
- ✅ **任务中心** - 任务列表、进度上报、状态跟踪
- 🚨 **异常事件** - 事件上报、处理跟踪、闭环管理
- 📁 **文件管理** - 文件上传、下载、预览
- 📝 **报告查看** - 查看各类工作报告和 AI 总结
- 👤 **个人中心** - 个人信息、修改密码、设置

## 技术栈

- **框架**: Flutter 3.x
- **状态管理**: Provider
- **网络请求**: Dio
- **本地存储**: shared_preferences + flutter_secure_storage
- **UI 设计**: Material 3

## 快速开始

### 1. 安装 Flutter

参考官方文档：https://docs.flutter.dev/get-started/install

### 2. 克隆项目并安装依赖

```bash
cd mobile
flutter pub get
```

### 3. 配置 API 地址

修改 `lib/config/api_config.dart` 中的 baseUrl 为你的后端地址。

### 4. 运行

```bash
flutter run
```

## 项目结构

```
lib/
├── config/              # 配置文件
│   └── api_config.dart
├── models/              # 数据模型
│   ├── user.dart
│   ├── exam.dart
│   ├── site.dart
│   ├── task.dart
│   ├── incident.dart
│   └── report.dart
├── providers/           # 状态管理
│   ├── auth_provider.dart
│   └── theme_provider.dart
├── services/            # API 服务
│   ├── api_client.dart
│   ├── auth_service.dart
│   ├── exam_service.dart
│   ├── site_service.dart
│   ├── task_service.dart
│   └── incident_service.dart
├── pages/               # 页面
│   ├── login/
│   │   └── login_page.dart
│   ├── home/
│   │   └── home_page.dart
│   ├── dashboard/
│   │   └── dashboard_page.dart
│   ├── exams/
│   │   ├── exam_list_page.dart
│   │   └── exam_detail_page.dart
│   ├── sites/
│   │   ├── site_list_page.dart
│   │   └── site_detail_page.dart
│   ├── tasks/
│   │   ├── task_list_page.dart
│   │   └── task_detail_page.dart
│   ├── incidents/
│   │   ├── incident_list_page.dart
│   │   ├── incident_detail_page.dart
│   │   └── incident_report_page.dart
│   ├── profile/
│   │   └── profile_page.dart
│   └── common/
│       └── webview_page.dart
├── widgets/             # 通用组件
│   ├── custom_app_bar.dart
│   ├── loading_widget.dart
│   ├── empty_widget.dart
│   ├── status_badge.dart
│   └── list_tile.dart
├── utils/               # 工具类
│   ├── date_utils.dart
│   ├── toast_utils.dart
│   └── validation_utils.dart
├── routes/              # 路由
│   └── app_routes.dart
├── theme/               # 主题
│   └── app_theme.dart
└── main.dart            # 入口文件
```

## 默认账号

- 用户名: `admin`
- 密码: `admin123`

## 打包发布

### Android

```bash
flutter build apk --release
```

### iOS

```bash
flutter build ios --release
```