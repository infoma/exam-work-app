import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Select, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getExams, createExam, updateExam, deleteExam, Exam } from '../api/exams';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Exams = () => {
  const [loading, setLoading] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const response = await getExams();
      setExams(response);
    } catch {
      message.error('获取考试列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleAdd = () => {
    setEditingExam(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (exam: Exam) => {
    setEditingExam(exam);
    form.setFieldsValue({
      ...exam,
      dateRange: [dayjs(exam.startTime), dayjs(exam.endTime)],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExam(id);
      message.success('删除成功');
      fetchExams();
    } catch {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const examData = {
        ...values,
        startTime: values.dateRange[0].toISOString(),
        endTime: values.dateRange[1].toISOString(),
      };
      delete examData.dateRange;

      if (editingExam) {
        await updateExam(editingExam.id, examData);
        message.success('更新成功');
      } else {
        await createExam(examData);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchExams();
    } catch {
      message.error('操作失败');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'preparing': 'blue',
      'active': 'green',
      'completed': 'green',
      'cancelled': 'red',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'preparing': '准备中',
      'active': '进行中',
      'completed': '已完成',
      'cancelled': '已取消',
    };
    return texts[status] || status;
  };

  const columns = [
    { title: '考试名称', dataIndex: 'name', key: 'name' },
    { title: '考试类型', dataIndex: 'type', key: 'type' },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime', render: (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm') },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime', render: (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm') },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: Exam) => (
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
        <h2>考试项目管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          添加考试
        </Button>
      </div>

      <Table 
        dataSource={exams} 
        columns={columns} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingExam ? '编辑考试' : '添加考试'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item name="name" label="考试名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="考试类型" rules={[{ required: true }]}>
            <Select options={[
              { value: '高考', label: '高考' },
              { value: '中考', label: '中考' },
              { value: '公务员考试', label: '公务员考试' },
              { value: '职业资格考试', label: '职业资格考试' },
              { value: '其他', label: '其他' },
            ]} />
          </Form.Item>
          <Form.Item name="dateRange" label="考试时间" rules={[{ required: true }]}>
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="globalRequirement" label="全局要求">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="description" label="备注">
            <TextArea rows={3} />
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

export default Exams;