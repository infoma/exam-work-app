import { useState } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, message } from 'antd';
import { 
  DashboardOutlined, 
  BookOutlined, 
  EnvironmentOutlined, 
  CheckSquareOutlined, 
  AlertOutlined, 
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = AntLayout;

const menuItems = [
  { key: '/', label: '工作台', icon: <DashboardOutlined /> },
  { key: '/exams', label: '考试项目', icon: <BookOutlined /> },
  { key: '/sites', label: '考点管理', icon: <EnvironmentOutlined /> },
  { key: '/tasks', label: '任务中心', icon: <CheckSquareOutlined /> },
  { key: '/incidents', label: '异常事件', icon: <AlertOutlined /> },
  { key: '/reports', label: '报告管理', icon: <FileTextOutlined /> },
];

const Layout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    message.success('已退出登录');
    navigate('/login');
  };

  const userMenu = [
    { key: 'profile', label: '个人信息', icon: <UserOutlined /> },
    { type: 'divider' },
    { key: 'logout', label: '退出登录', icon: <LogoutOutlined />, onClick: handleLogout },
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="dark">
        <div style={{ padding: '16px', textAlign: 'center', borderBottom: '1px solid #333' }}>
          <h3 style={{ color: '#fff', fontSize: collapsed ? 14 : 16, fontWeight: 'bold', margin: 0 }}>
            {collapsed ? '考试系统' : '考试管理系统'}
          </h3>
        </div>
        <Menu 
          mode="inline" 
          items={menuItems} 
          selectedKeys={[window.location.pathname]}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <AntLayout>
        <Header style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', borderBottom: '1px solid #e8e8e8' }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color: '#1D4ED8' }}>
            大型考试工作管理系统
          </div>
          <Dropdown menu={{ items: userMenu }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span>{user.realName || user.username}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ padding: '24px', background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;