import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getTasks, createTask, updateTaskStatus, Task } from '../api/tasks';
import dayjs from 'dayjs';
import axios from '../api/axios';

interface ExamOption {
  value: string;
  label: string;
}

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState<ExamOption[]>([]);

  useEffect(() => {
    fetchTasks();
    fetchExams();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response);
    } catch {
      message.error('获取任务列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchExams = async () => {
    try {
      const response = await axios.get<{ data: Array<{ id: string; name: string }> }>('/mock/exams');
      setExams(response.data.data.map(e => ({ value: e.id, label: e.name })));
    } catch {
      message.error('获取考试列表失败');
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleComplete = async (id: string) => {
    try {
      await updateTaskStatus(id, 'completed');
      message.success('任务已完成');
      fetchTasks();
    } catch {
      message.error('操作失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await createTask(values.examId, {
        ...values,
        siteId: '',
        ownerId: '',
        dueTime: values.dueTime.toISOString(),
      });
      message.success('创建成功');
      setIsModalOpen(false);
      fetchTasks();
    } catch {
      message.error('操作失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'pending': 'orange',
      'in_progress': 'blue',
      'completed': 'green',
      'overdue': 'red',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'pending': '待处理',
      'in_progress': '进行中',
      'completed': '已完成',
      'overdue': '已逾期',
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

  const getStageText = (stage: string) => {
    const texts: Record<string, string> = {
      'pre_exam': '考前准备',
      'during_exam': '考中执行',
      'post_exam': '考后处理',
    };
    return texts[stage] || stage;
  };

  const columns = [
    { title: '任务名称', dataIndex: 'title', key: 'title' },
    { title: '阶段', dataIndex: 'stage', key: 'stage', render: (stage: string) => getStageText(stage) },
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
    { title: '截止时间', dataIndex: 'dueTime', key: 'dueTime', render: (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm') },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: Task) => (
        record.status !== 'completed' && (
          <Button icon={<CheckCircleOutlined />} onClick={() => handleComplete(record.id)}>
            完成
          </Button>
        )
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>任务中心</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加任务
        </Button>
      </div>

      <Table 
        dataSource={tasks} 
        columns={columns} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="添加任务"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="examId" label="所属考试" rules={[{ required: true }]}>
            <Select options={exams} />
          </Form.Item>
          <Form.Item name="title" label="任务名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="stage" label="阶段" rules={[{ required: true }]}>
            <Select options={[
              { value: '考前准备', label: '考前准备' },
              { value: '考中执行', label: '考中执行' },
              { value: '考后处理', label: '考后处理' },
            ]} />
          </Form.Item>
          <Form.Item name="priority" label="优先级" rules={[{ required: true }]}>
            <Select options={[
              { value: 'high', label: '高' },
              { value: 'medium', label: '中' },
              { value: 'low', label: '低' },
            ]} />
          </Form.Item>
          <Form.Item name="dueTime" label="截止时间" rules={[{ required: true }]}>
            <Input type="datetime-local" />
          </Form.Item>
          <Form.Item name="requirement" label="任务要求">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks;