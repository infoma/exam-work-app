import { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, Select, InputNumber, message, Tag, Tabs, Space
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  getStaffs, createStaff, updateStaff, deleteStaff,
  getStaffTrainings, createStaffTraining,
  getStaffAssignments, createStaffAssignment,
  Staff, StaffTraining, StaffAssignment
} from '../api/staffs';
import { getSiteStandards, SiteStandard } from '../api/site-standards';

const { TextArea } = Input;

const Staffs = () => {
  const [loading, setLoading] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);

  // 详情弹窗相关
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [trainings, setTrainings] = useState<StaffTraining[]>([]);
  const [assignments, setAssignments] = useState<StaffAssignment[]>([]);
  const [sites, setSites] = useState<SiteStandard[]>([]);
  const [trainingForm] = Form.useForm();
  const [assignmentForm] = Form.useForm();

  // 筛选
  const [filterDept, setFilterDept] = useState<string | undefined>();
  const [filterStatus, setFilterStatus] = useState<string | undefined>();

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const data = await getStaffs({
        department: filterDept,
        status: filterStatus,
      });
      setStaffs(data);
    } catch {
      message.error('获取工作人员列表失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchSites = async () => {
    try {
      const data = await getSiteStandards();
      setSites(data);
    } catch {
      // 静默失败
    }
  };

  useEffect(() => {
    fetchStaffs();
    fetchSites();
  }, [filterDept, filterStatus]);

  const handleAdd = () => {
    setEditingStaff(null);
    form.resetFields();
    form.setFieldsValue({
      status: '在职',
      workYears: 0,
      isQualified: false,
      trainingStatus: '未培训',
      examExperience: 0,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    form.setFieldsValue(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该工作人员吗？',
      onOk: async () => {
        try {
          await deleteStaff(id);
          message.success('删除成功');
          fetchStaffs();
        } catch {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingStaff) {
        await updateStaff(editingStaff.id, values);
        message.success('更新成功');
      } else {
        await createStaff(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchStaffs();
    } catch {
      message.error('操作失败');
    }
  };

  const openDetail = async (staff: Staff) => {
    setCurrentStaff(staff);
    setDetailOpen(true);
    try {
      const [t, a] = await Promise.all([
        getStaffTrainings(staff.id),
        getStaffAssignments(staff.id),
      ]);
      setTrainings(t);
      setAssignments(a);
    } catch {
      message.error('加载详情失败');
    }
  };

  const handleAddTraining = async (values: any) => {
    if (!currentStaff) return;
    try {
      await createStaffTraining(currentStaff.id, {
        ...values,
        trainingDate: values.trainingDate.toISOString(),
      });
      message.success('培训记录已添加');
      trainingForm.resetFields();
      const t = await getStaffTrainings(currentStaff.id);
      setTrainings(t);
      fetchStaffs();
    } catch {
      message.error('添加失败');
    }
  };

  const handleAddAssignment = async (values: any) => {
    if (!currentStaff) return;
    try {
      await createStaffAssignment(currentStaff.id, {
        ...values,
        assignmentDate: values.assignmentDate.toISOString(),
      });
      message.success('分配成功');
      assignmentForm.resetFields();
      const a = await getStaffAssignments(currentStaff.id);
      setAssignments(a);
      fetchStaffs();
    } catch {
      message.error('分配失败');
    }
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = { '在职': 'green', '离职': 'default', '停职': 'orange', '退休': 'blue' };
    return colors[s] || 'default';
  };

  const columns = [
    { title: '工号', dataIndex: 'employeeId', key: 'employeeId', width: 100 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '性别', dataIndex: 'gender', key: 'gender', width: 60 },
    { title: '部门', dataIndex: 'department', key: 'department', width: 120 },
    { title: '职位', dataIndex: 'position', key: 'position', width: 100 },
    { title: '角色', dataIndex: 'role', key: 'role', width: 100 },
    { title: '电话', dataIndex: 'phone', key: 'phone', width: 120 },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 80,
      render: (s: string) => <Tag color={getStatusColor(s)}>{s}</Tag>
    },
    { title: '学历', dataIndex: 'education', key: 'education', width: 80 },
    {
      title: '培训', dataIndex: 'trainingStatus', key: 'trainingStatus', width: 100,
      render: (s: string) => <Tag color={s === '已培训' ? 'green' : 'orange'}>{s}</Tag>
    },
    { title: '监考经验', dataIndex: 'examExperience', key: 'examExperience', width: 90 },
    {
      title: '监考资格', dataIndex: 'isQualified', key: 'isQualified', width: 90,
      render: (q: boolean) => <Tag color={q ? 'green' : 'default'}>{q ? '已获得' : '未获得'}</Tag>
    },
    {
      title: '操作', key: 'action', width: 220, fixed: 'right' as const,
      render: (_: any, r: Staff) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => openDetail(r)}>详情</Button>
          <Button size="small" icon={<EditOutlined />} onClick={() => handleEdit(r)} />
          <Button size="small" icon={<DeleteOutlined />} danger onClick={() => handleDelete(r.id)} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ margin: 0 }}>工作人员管理</h2>
        <Space>
          <Input
            placeholder="按部门筛选" allowClear style={{ width: 160 }}
            value={filterDept} onChange={(e) => setFilterDept(e.target.value || undefined)}
          />
          <Select
            placeholder="状态" allowClear style={{ width: 120 }}
            value={filterStatus} onChange={setFilterStatus}
            options={['在职', '离职', '停职', '退休'].map(s => ({ value: s, label: s }))}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加工作人员</Button>
        </Space>
      </div>

      <Table
        dataSource={staffs}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1700 }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 人` }}
      />

      {/* 编辑表单弹窗 */}
      <Modal
        title={editingStaff ? '编辑工作人员' : '添加工作人员'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={800}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
            <Form.Item name="employeeId" label="工号" rules={[{ required: true }]}>
              <Input disabled={!!editingStaff} />
            </Form.Item>
            <Form.Item name="name" label="姓名" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="gender" label="性别">
              <Select options={['男', '女'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="idCard" label="身份证号"><Input maxLength={18} /></Form.Item>
            <Form.Item name="phone" label="手机号"><Input /></Form.Item>
            <Form.Item name="email" label="邮箱"><Input /></Form.Item>
            <Form.Item name="department" label="部门"><Input /></Form.Item>
            <Form.Item name="position" label="职位"><Input /></Form.Item>
            <Form.Item name="role" label="角色">
              <Select options={['系统管理员', '考试主管', '考试工作人员', '学校协调员', '技术支持', '安全人员'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="workYears" label="工作年限"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="entryDate" label="入职日期"><Input type="date" /></Form.Item>
            <Form.Item name="status" label="状态">
              <Select options={['在职', '离职', '停职', '退休'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="education" label="学历">
              <Select options={['高中', '中专', '大专', '本科', '硕士', '博士'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="major" label="专业"><Input /></Form.Item>
            <Form.Item name="isQualified" label="具备监考资格" valuePropName="checked">
              <Select options={[{ value: true, label: '是' }, { value: false, label: '否' }]} />
            </Form.Item>
            <Form.Item name="address" label="家庭住址"><Input /></Form.Item>
          </div>
          <Form.Item name="remarks" label="备注"><TextArea rows={2} /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情弹窗 */}
      <Modal
        title={`${currentStaff?.name} - 详细信息`}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={1000}
      >
        <Tabs
          items={[
            {
              key: 'trainings',
              label: `培训记录 (${trainings.length})`,
              children: (
                <>
                  <Table
                    dataSource={trainings} rowKey="id" size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      { title: '培训名称', dataIndex: 'trainingName' },
                      { title: '类型', dataIndex: 'trainingType' },
                      { title: '日期', dataIndex: 'trainingDate', render: (d: string) => new Date(d).toLocaleDateString() },
                      { title: '时长(小时)', dataIndex: 'trainingHours' },
                      { title: '分数', dataIndex: 'score' },
                      {
                        title: '通过', dataIndex: 'isPassed',
                        render: (p: boolean) => <Tag color={p ? 'green' : 'red'}>{p ? '是' : '否'}</Tag>
                      },
                      { title: '证书号', dataIndex: 'certificateNo' },
                    ]}
                  />
                  <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 4 }}>
                    <h4>添加培训记录</h4>
                    <Form form={trainingForm} onFinish={handleAddTraining} layout="inline">
                      <Form.Item name="trainingName" rules={[{ required: true }]}>
                        <Input placeholder="培训名称" style={{ width: 200 }} />
                      </Form.Item>
                      <Form.Item name="trainingDate" rules={[{ required: true }]}>
                        <Input type="datetime-local" />
                      </Form.Item>
                      <Form.Item name="trainingHours" initialValue={4}>
                        <Input type="number" placeholder="时长(小时)" style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item name="isPassed" initialValue={true}>
                        <Select options={[{ value: true, label: '通过' }, { value: false, label: '未通过' }]} style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item name="score">
                        <Input type="number" placeholder="分数" style={{ width: 80 }} />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">添加</Button>
                    </Form>
                  </div>
                </>
              ),
            },
            {
              key: 'assignments',
              label: `考试分配 (${assignments.length})`,
              children: (
                <>
                  <Table
                    dataSource={assignments} rowKey="id" size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      { title: '考试名称', dataIndex: 'examName' },
                      { title: '分配类型', dataIndex: 'assignmentType' },
                      { title: '分配日期', dataIndex: 'assignmentDate', render: (d: string) => new Date(d).toLocaleDateString() },
                      { title: '考点', key: 'site',
                        render: (_: any, r: StaffAssignment) => sites.find(s => s.id === r.examSiteId)?.name || r.examSiteId.slice(0, 8)
                      },
                      { title: '考场号', dataIndex: 'roomNumber' },
                      { title: '工作角色', dataIndex: 'workRole' },
                      {
                        title: '状态', dataIndex: 'status',
                        render: (s: string) => <Tag color="blue">{s}</Tag>
                      },
                    ]}
                  />
                  <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 4 }}>
                    <h4>添加分配</h4>
                    <Form form={assignmentForm} onFinish={handleAddAssignment} layout="inline">
                      <Form.Item name="examSiteId" rules={[{ required: true }]}>
                        <Select
                          placeholder="选择考点" style={{ width: 200 }}
                          options={sites.map(s => ({ value: s.id, label: s.name }))}
                        />
                      </Form.Item>
                      <Form.Item name="examName" rules={[{ required: true }]}>
                        <Input placeholder="考试名称" style={{ width: 160 }} />
                      </Form.Item>
                      <Form.Item name="assignmentDate" rules={[{ required: true }]}>
                        <Input type="datetime-local" />
                      </Form.Item>
                      <Form.Item name="workRole">
                        <Select placeholder="工作角色" style={{ width: 120 }}
                          options={['主监考', '副监考', '巡考', '技术支持'].map(v => ({ value: v, label: v }))}
                        />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">分配</Button>
                    </Form>
                  </div>
                </>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Staffs;
