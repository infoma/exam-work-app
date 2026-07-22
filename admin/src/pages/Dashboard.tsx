import { useState, useEffect } from 'react';
import { Card, Statistic, Row, Col, Table, Tag, Progress, message } from 'antd';
import { 
  BookOutlined, 
  EnvironmentOutlined, 
  CheckSquareOutlined, 
  AlertOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined
} from '@ant-design/icons';
import axios from '../api/axios';

interface DashboardData {
  totalExams: number;
  activeExams: number;
  totalSites: number;
  todayTasks: number;
  todayIncidents: number;
  pendingTasks: number;
  examList: Array<{ id: string; name: string; status: string; siteCount: number; candidateCount: number }>;
  recentTasks: Array<{ id: string; title: string; examName: string; status: string; priority: string; dueTime: string }>;
  recentIncidents: Array<{ id: string; title: string; siteName: string; type: string; level: string; createdAt: string }>;
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ data: DashboardData }>('/mock/dashboard');
        setData(response.data.data);
      } catch {
        message.error('获取数据失败');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'preparing': 'blue',
      'active': 'green',
      'completed': 'green',
      'pending': 'orange',
      'processing': 'blue',
      'closed': 'default',
      'cancelled': 'red',
      'in_progress': 'processing',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'preparing': '准备中',
      'active': '进行中',
      'completed': '已完成',
      'pending': '待处理',
      'processing': '处理中',
      'closed': '已关闭',
      'cancelled': '已取消',
      'in_progress': '进行中',
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'urgent': 'red',
      'high': 'red',
      'medium': 'orange',
      'low': 'default',
    };
    return colors[priority] || 'default';
  };

  const getPriorityText = (priority: string) => {
    const texts: Record<string, string> = {
      'urgent': '紧急',
      'high': '高',
      'medium': '中',
      'low': '低',
    };
    return texts[priority] || priority;
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'critical': 'red',
      'important': 'red',
      'major': 'orange',
      'minor': 'default',
      'info': 'blue',
    };
    return colors[level] || 'default';
  };

  const getLevelText = (level: string) => {
    const texts: Record<string, string> = {
      'critical': '严重',
      'important': '重要',
      'major': '重大',
      'minor': '一般',
      'info': '信息',
    };
    return texts[level] || level;
  };

  const getIncidentTypeText = (type: string) => {
    const texts: Record<string, string> = {
      'equipment_failure': '设备故障',
      'network_issue': '网络问题',
      'security_breach': '安全事件',
      'paper_error': '试卷问题',
      'candidate_issue': '考生异常',
      'other': '其他',
    };
    return texts[type] || type;
  };

  const examColumns = [
    { title: '考试名称', dataIndex: 'name', key: 'name' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { title: '考点数', dataIndex: 'siteCount', key: 'siteCount' },
    { title: '考生数', dataIndex: 'candidateCount', key: 'candidateCount' },
  ];

  const taskColumns = [
    { title: '任务名称', dataIndex: 'title', key: 'title' },
    { title: '所属考试', dataIndex: 'examName', key: 'examName' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { 
      title: '优先级', 
      dataIndex: 'priority', 
      key: 'priority',
      render: (priority: string) => <Tag color={getPriorityColor(priority)}>{getPriorityText(priority)}</Tag>
    },
    { title: '截止时间', dataIndex: 'dueTime', key: 'dueTime' },
  ];

  const incidentColumns = [
    { title: '事件标题', dataIndex: 'title', key: 'title' },
    { title: '所属考点', dataIndex: 'siteName', key: 'siteName' },
    { 
      title: '类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => getIncidentTypeText(type)
    },
    { 
      title: '级别', 
      dataIndex: 'level', 
      key: 'level',
      render: (level: string) => <Tag color={getLevelColor(level)}>{getLevelText(level)}</Tag>
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>工作台</h2>
      
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="考试项目总数" value={data?.totalExams || 0} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="进行中考试" value={data?.activeExams || 0} prefix={<ClockCircleOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="考点总数" value={data?.totalSites || 0} prefix={<EnvironmentOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日任务" value={data?.todayTasks || 0} prefix={<CheckSquareOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic title="今日异常" value={data?.todayIncidents || 0} prefix={<AlertOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="待处理任务" value={data?.pendingTasks || 0} prefix={<CloseCircleOutlined />} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="任务完成进度">
            <Progress percent={data ? Math.round((data.todayTasks - data.pendingTasks) / data.todayTasks * 100) : 0} showInfo />
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="考试项目概览" extra={<a href="/exams">查看全部</a>}>
            <Table 
              dataSource={data?.examList} 
              columns={examColumns} 
              pagination={false}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="最近任务" extra={<a href="/tasks">查看全部</a>}>
            <Table 
              dataSource={data?.recentTasks} 
              columns={taskColumns} 
              pagination={false}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="最近异常" extra={<a href="/incidents">查看全部</a>}>
            <Table 
              dataSource={data?.recentIncidents} 
              columns={incidentColumns} 
              pagination={false}
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;