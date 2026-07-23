import { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, Select, InputNumber, message, Tag, Tabs, Space
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  getSourceSchools, createSourceSchool, updateSourceSchool, deleteSourceSchool,
  getServiceRecords, createServiceRecord, deleteServiceRecord,
  SourceSchool, SchoolServiceRecord
} from '../api/source-schools';

const { TextArea } = Input;

const SourceSchools = () => {
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState<SourceSchool[]>([]);
  const [filteredSchools, setFilteredSchools] = useState<SourceSchool[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<SourceSchool | null>(null);

  // 服务记录相关状态
  const [recordModalOpen, setRecordModalOpen] = useState(false);
  const [recordSchool, setRecordSchool] = useState<SourceSchool | null>(null);
  const [records, setRecords] = useState<SchoolServiceRecord[]>([]);
  const [recordForm] = Form.useForm();
  const [recordLoading, setRecordLoading] = useState(false);

  // 筛选条件
  const [filterProvince, setFilterProvince] = useState<string | undefined>();
  const [filterStatus, setFilterStatus] = useState<string | undefined>();

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const data = await getSourceSchools({
        province: filterProvince,
        serviceStatus: filterStatus,
      });
      setSchools(data);
      setFilteredSchools(data);
    } catch {
      message.error('获取生源学校列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [filterProvince, filterStatus]);

  const handleAdd = () => {
    setEditingSchool(null);
    form.resetFields();
    form.setFieldsValue({
      studentCount: 0,
      teacherCount: 0,
      capacity: 0,
      facilitiesScore: 0,
      serviceLevel: '标准',
      serviceStatus: '正常',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (school: SourceSchool) => {
    setEditingSchool(school);
    form.setFieldsValue(school);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个生源学校吗？',
      onOk: async () => {
        try {
          await deleteSourceSchool(id);
          message.success('删除成功');
          fetchSchools();
        } catch {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingSchool) {
        await updateSourceSchool(editingSchool.id, values);
        message.success('更新成功');
      } else {
        await createSourceSchool(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchSchools();
    } catch {
      message.error('操作失败');
    }
  };

  // 服务记录相关
  const openRecords = async (school: SourceSchool) => {
    setRecordSchool(school);
    setRecordModalOpen(true);
    await loadRecords(school.id);
  };

  const loadRecords = async (schoolId: string) => {
    setRecordLoading(true);
    try {
      const data = await getServiceRecords(schoolId);
      setRecords(data);
    } catch {
      message.error('加载服务记录失败');
    } finally {
      setRecordLoading(false);
    }
  };

  const handleAddRecord = async (values: any) => {
    if (!recordSchool) return;
    try {
      await createServiceRecord(recordSchool.id, {
        ...values,
        serviceDate: values.serviceDate.toISOString(),
        serviceCount: values.serviceCount ?? 1,
      });
      message.success('服务记录已添加');
      recordForm.resetFields();
      loadRecords(recordSchool.id);
      fetchSchools();
    } catch {
      message.error('添加失败');
    }
  };

  const handleDeleteRecord = async (recordId: string) => {
    try {
      await deleteServiceRecord(recordId);
      message.success('已删除');
      if (recordSchool) loadRecords(recordSchool.id);
    } catch {
      message.error('删除失败');
    }
  };

  const getServiceStatusColor = (s: string) => {
    const colors: Record<string, string> = { '正常': 'green', '暂停': 'orange', '终止': 'red' };
    return colors[s] || 'default';
  };

  const getServiceLevelColor = (s: string) => {
    const colors: Record<string, string> = { '优质': 'gold', '标准': 'blue', '基础': 'default' };
    return colors[s] || 'default';
  };

  const columns = [
    { title: '学校代码', dataIndex: 'code', key: 'code', width: 100 },
    { title: '学校名称', dataIndex: 'name', key: 'name', width: 180 },
    {
      title: '学校类型', dataIndex: 'schoolType', key: 'schoolType', width: 100,
    },
    {
      title: '所在地', key: 'location', width: 180,
      render: (_: any, r: SourceSchool) => [r.province, r.city, r.district].filter(Boolean).join(' / ') || '-'
    },
    { title: '学生数', dataIndex: 'studentCount', key: 'studentCount', width: 80 },
    { title: '教师数', dataIndex: 'teacherCount', key: 'teacherCount', width: 80 },
    {
      title: '服务等级', dataIndex: 'serviceLevel', key: 'serviceLevel', width: 100,
      render: (s: string) => <Tag color={getServiceLevelColor(s)}>{s}</Tag>
    },
    {
      title: '服务状态', dataIndex: 'serviceStatus', key: 'serviceStatus', width: 100,
      render: (s: string) => <Tag color={getServiceStatusColor(s)}>{s}</Tag>
    },
    { title: '服务次数', dataIndex: 'serviceCount', key: 'serviceCount', width: 80 },
    { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson', width: 100 },
    {
      title: '操作', key: 'action', width: 240, fixed: 'right' as const,
      render: (_: any, r: SourceSchool) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => openRecords(r)}>服务记录</Button>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(r)} />
          <Button size="small" icon={<DeleteOutlined />} danger onClick={() => handleDelete(r.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ margin: 0 }}>生源学校服务管理</h2>
        <Space>
          <Select
            placeholder="省份筛选" allowClear style={{ width: 140 }}
            value={filterProvince} onChange={setFilterProvince}
            options={['北京市', '上海市', '广东省', '江苏省', '浙江省', '四川省'].map(p => ({ value: p, label: p }))}
          />
          <Select
            placeholder="服务状态" allowClear style={{ width: 140 }}
            value={filterStatus} onChange={setFilterStatus}
            options={['正常', '暂停', '终止'].map(s => ({ value: s, label: s }))}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加学校</Button>
        </Space>
      </div>

      <Table
        dataSource={filteredSchools}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 所` }}
      />

      {/* 编辑表单弹窗 */}
      <Modal
        title={editingSchool ? '编辑生源学校' : '添加生源学校'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Item name="name" label="学校名称" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="code" label="学校代码" rules={[{ required: true }]}>
              <Input disabled={!!editingSchool} />
            </Form.Item>
            <Form.Item name="schoolType" label="学校类型">
              <Select options={['小学', '初中', '高中', '中专', '大学'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="isActive" label="是否启用" valuePropName="checked">
              <Select options={[{ value: true, label: '是' }, { value: false, label: '否' }]} />
            </Form.Item>
            <Form.Item name="province" label="省份"><Input /></Form.Item>
            <Form.Item name="city" label="城市"><Input /></Form.Item>
            <Form.Item name="district" label="区/县"><Input /></Form.Item>
            <Form.Item name="address" label="详细地址"><Input /></Form.Item>
            <Form.Item name="contactPerson" label="联系人"><Input /></Form.Item>
            <Form.Item name="contactPhone" label="联系电话"><Input /></Form.Item>
            <Form.Item name="email" label="邮箱"><Input /></Form.Item>
            <Form.Item name="studentCount" label="学生人数"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="teacherCount" label="教师人数"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="capacity" label="容纳能力"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="facilitiesScore" label="设施评分(0-100)"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="serviceLevel" label="服务等级">
              <Select options={['优质', '标准', '基础'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="serviceStatus" label="服务状态">
              <Select options={['正常', '暂停', '终止'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
          </div>
          <Form.Item name="description" label="描述"><TextArea rows={2} /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 服务记录弹窗 */}
      <Modal
        title={`${recordSchool?.name} - 服务记录`}
        open={recordModalOpen}
        onCancel={() => setRecordModalOpen(false)}
        footer={null}
        width={900}
      >
        <Tabs
          items={[
            {
              key: 'list',
              label: '服务记录列表',
              children: (
                <Table
                  dataSource={records}
                  rowKey="id"
                  loading={recordLoading}
                  pagination={{ pageSize: 5 }}
                  columns={[
                    { title: '服务日期', dataIndex: 'serviceDate', key: 'serviceDate', render: (d: string) => new Date(d).toLocaleString() },
                    { title: '服务类型', dataIndex: 'serviceType', key: 'serviceType' },
                    { title: '服务人次', dataIndex: 'serviceCount', key: 'serviceCount' },
                    { title: '满意度', dataIndex: 'satisfactionLevel', key: 'satisfactionLevel' },
                    { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' },
                    {
                      title: '操作', key: 'action',
                      render: (_: any, r: SchoolServiceRecord) => (
                        <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteRecord(r.id)} />
                      ),
                    },
                  ]}
                />
              ),
            },
            {
              key: 'add',
              label: '添加服务记录',
              children: (
                <Form form={recordForm} onFinish={handleAddRecord} layout="vertical" style={{ maxWidth: 600 }}>
                  <Form.Item name="serviceType" label="服务类型" rules={[{ required: true }]}>
                    <Select options={['报名服务', '考试服务', '成绩服务', '咨询服务', '其他'].map(v => ({ value: v, label: v }))} />
                  </Form.Item>
                  <Form.Item name="serviceDate" label="服务日期" rules={[{ required: true }]}>
                    <Input type="datetime-local" />
                  </Form.Item>
                  <Form.Item name="serviceContent" label="服务内容"><TextArea rows={3} /></Form.Item>
                  <Form.Item name="serviceCount" label="服务人次" initialValue={1}>
                    <Input type="number" min={1} />
                  </Form.Item>
                  <Form.Item name="satisfactionLevel" label="满意度">
                    <Select options={['非常满意', '满意', '一般', '不满意'].map(v => ({ value: v, label: v }))} />
                  </Form.Item>
                  <Form.Item name="feedback" label="反馈意见"><TextArea rows={2} /></Form.Item>
                  <Form.Item name="operatorName" label="操作人员"><Input /></Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">提交</Button>
                  </Form.Item>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default SourceSchools;
