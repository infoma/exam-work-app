import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getSites, createSite, updateSite, deleteSite, Site } from '../api/sites';
import axios from '../api/axios';

interface ExamOption {
  value: string;
  label: string;
}

const Sites = () => {
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<Site[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<Site | null>(null);
  const [exams, setExams] = useState<ExamOption[]>([]);
  const [selectedExam, setSelectedExam] = useState('');

  useEffect(() => {
    fetchExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchSites(selectedExam);
    }
  }, [selectedExam]);

  const fetchExams = async () => {
    try {
      const response = await axios.get<{ data: Array<{ id: string; name: string }> }>('/exams');
      setExams(response.data.data.map(e => ({ value: e.id, label: e.name })));
      if (response.data.data.length > 0) {
        setSelectedExam(response.data.data[0].id);
      }
    } catch {
      message.error('获取考试列表失败');
    }
  };

  const fetchSites = async (examId: string) => {
    setLoading(true);
    try {
      const response = await getSites(examId);
      setSites(response);
    } catch {
      message.error('获取考点列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSite(null);
    form.resetFields();
    form.setFieldsValue({ examId: selectedExam });
    setIsModalOpen(true);
  };

  const handleEdit = (site: Site) => {
    setEditingSite(site);
    form.setFieldsValue(site);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSite(id);
      message.success('删除成功');
      fetchSites(selectedExam);
    } catch {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        ...values,
        roomCount: Number(values.roomCount),
        candidateCount: Number(values.candidateCount),
      };
      if (editingSite) {
        await updateSite(editingSite.id, payload);
        message.success('更新成功');
      } else {
        await createSite(selectedExam, payload);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchSites(selectedExam);
    } catch {
      message.error('操作失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'green',
      'inactive': 'default',
      'closed': 'red',
      'preparing': 'blue',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'active': '启用',
      'inactive': '停用',
      'closed': '已关闭',
      'preparing': '准备中',
    };
    return texts[status] || status;
  };

  const columns = [
    { title: '考点名称', dataIndex: 'name', key: 'name' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '考场数', dataIndex: 'roomCount', key: 'roomCount' },
    { title: '考生数', dataIndex: 'candidateCount', key: 'candidateCount' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: Site) => (
        <span>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} style={{ marginRight: 8 }} />
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <h2>考点管理</h2>
          <Select 
            value={selectedExam} 
            onChange={setSelectedExam}
            options={exams}
            style={{ width: 200 }}
          />
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加考点
        </Button>
      </div>

      <Table 
        dataSource={sites} 
        columns={columns} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingSite ? '编辑考点' : '添加考点'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="考点名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="roomCount" label="考场数" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="candidateCount" label="考生数" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="leaderId" label="负责人ID">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select options={[
              { value: 'active', label: '启用' },
              { value: 'inactive', label: '停用' },
            ]} />
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

export default Sites;