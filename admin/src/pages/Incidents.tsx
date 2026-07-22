import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag } from 'antd';
import { PlusOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getIncidents, createIncident, closeIncident, Incident } from '../api/incidents';
import dayjs from 'dayjs';

const Incidents = () => {
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const response = await getIncidents();
      setIncidents(response);
    } catch {
      message.error('获取异常事件列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleClose = async (id: string) => {
    try {
      await closeIncident(id);
      message.success('事件已关闭');
      fetchIncidents();
    } catch {
      message.error('操作失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await createIncident({
        ...values,
        examId: '',
        siteId: '',
        ownerId: '',
      });
      message.success('创建成功');
      setIsModalOpen(false);
      fetchIncidents();
    } catch {
      message.error('操作失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'open': 'orange',
      'processing': 'blue',
      'closed': 'green',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'open': '待处理',
      'processing': '处理中',
      'closed': '已关闭',
    };
    return texts[status] || status;
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
      'info': '提示',
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

  const columns = [
    { title: '事件标题', dataIndex: 'title', key: 'title' },
    { title: '事件类型', dataIndex: 'type', key: 'type', render: (type: string) => getIncidentTypeText(type) },
    { 
      title: '级别', 
      dataIndex: 'level', 
      key: 'level',
      render: (level: string) => <Tag color={getLevelColor(level)}>{getLevelText(level)}</Tag>
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { title: '描述', dataIndex: 'description', key: 'description', ellipsis: true },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm') },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: Incident) => (
        record.status !== 'closed' && (
          <Button icon={<CheckCircleOutlined />} onClick={() => handleClose(record.id)}>
            关闭
          </Button>
        )
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>异常事件管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          上报事件
        </Button>
      </div>

      <Table 
        dataSource={incidents} 
        columns={columns} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="上报异常事件"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="title" label="事件标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="事件类型" rules={[{ required: true }]}>
            <Select options={[
              { value: '设备故障', label: '设备故障' },
              { value: '考生违规', label: '考生违规' },
              { value: '网络问题', label: '网络问题' },
              { value: '考务问题', label: '考务问题' },
              { value: '安全问题', label: '安全问题' },
              { value: '其他', label: '其他' },
            ]} />
          </Form.Item>
          <Form.Item name="level" label="事件级别" rules={[{ required: true }]}>
            <Select options={[
              { value: 'critical', label: '严重' },
              { value: 'major', label: '重要' },
              { value: 'minor', label: '一般' },
              { value: 'info', label: '提示' },
            ]} />
          </Form.Item>
          <Form.Item name="description" label="事件描述" rules={[{ required: true }]}>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Incidents;