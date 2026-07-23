import { useState, useEffect } from 'react';
import {
  Table, Button, Modal, Form, Input, Select, InputNumber, message, Tag, Tabs, Space, Checkbox
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import {
  getSiteStandards, createSiteStandard, updateSiteStandard, deleteSiteStandard,
  getStandardRooms, createStandardRoom,
  getSiteInspections, createSiteInspection,
  getSiteFacilities, createSiteFacility,
  SiteStandard, StandardRoom, SiteInspection, SiteFacility
} from '../api/site-standards';

const { TextArea } = Input;

const SiteStandards = () => {
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState<SiteStandard[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<SiteStandard | null>(null);

  // 详情相关
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentSite, setCurrentSite] = useState<SiteStandard | null>(null);
  const [rooms, setRooms] = useState<StandardRoom[]>([]);
  const [inspections, setInspections] = useState<SiteInspection[]>([]);
  const [facilities, setFacilities] = useState<SiteFacility[]>([]);
  const [roomForm] = Form.useForm();
  const [inspectionForm] = Form.useForm();
  const [facilityForm] = Form.useForm();

  // 筛选
  const [filterLevel, setFilterLevel] = useState<string | undefined>();
  const [filterStatus, setFilterStatus] = useState<string | undefined>();

  const fetchSites = async () => {
    setLoading(true);
    try {
      const data = await getSiteStandards({
        standardLevel: filterLevel,
        status: filterStatus,
      });
      setSites(data);
    } catch {
      message.error('获取考点列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSites();
  }, [filterLevel, filterStatus]);

  const handleAdd = () => {
    setEditingSite(null);
    form.resetFields();
    form.setFieldsValue({
      totalRooms: 0,
      totalSeats: 0,
      capacity: 0,
      standardLevel: '未评级',
      facilityScore: 0,
      managementScore: 0,
      securityScore: 0,
      overallScore: 0,
      status: '正常',
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (site: SiteStandard) => {
    setEditingSite(site);
    form.setFieldsValue(site);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该考点吗？',
      onOk: async () => {
        try {
          await deleteSiteStandard(id);
          message.success('删除成功');
          fetchSites();
        } catch {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingSite) {
        await updateSiteStandard(editingSite.id, values);
        message.success('更新成功');
      } else {
        await createSiteStandard(values);
        message.success('创建成功');
      }
      setIsModalOpen(false);
      fetchSites();
    } catch {
      message.error('操作失败');
    }
  };

  const openDetail = async (site: SiteStandard) => {
    setCurrentSite(site);
    setDetailOpen(true);
    try {
      const [r, i, f] = await Promise.all([
        getStandardRooms(site.id),
        getSiteInspections(site.id),
        getSiteFacilities(site.id),
      ]);
      setRooms(r);
      setInspections(i);
      setFacilities(f);
    } catch {
      message.error('加载详情失败');
    }
  };

  const handleAddRoom = async (values: any) => {
    if (!currentSite) return;
    try {
      await createStandardRoom(currentSite.id, values);
      message.success('考场已添加');
      roomForm.resetFields();
      const r = await getStandardRooms(currentSite.id);
      setRooms(r);
      fetchSites();
    } catch {
      message.error('添加失败');
    }
  };

  const handleAddInspection = async (values: any) => {
    if (!currentSite) return;
    try {
      await createSiteInspection(currentSite.id, {
        ...values,
        inspectionDate: values.inspectionDate.toISOString(),
      });
      message.success('检查记录已添加');
      inspectionForm.resetFields();
      const i = await getSiteInspections(currentSite.id);
      setInspections(i);
      fetchSites();
    } catch {
      message.error('添加失败');
    }
  };

  const handleAddFacility = async (values: any) => {
    if (!currentSite) return;
    try {
      await createSiteFacility(currentSite.id, values);
      message.success('设施设备已添加');
      facilityForm.resetFields();
      const f = await getSiteFacilities(currentSite.id);
      setFacilities(f);
    } catch {
      message.error('添加失败');
    }
  };

  const getLevelColor = (l: string) => {
    const colors: Record<string, string> = { '一级': 'gold', '二级': 'blue', '三级': 'cyan', '未评级': 'default' };
    return colors[l] || 'default';
  };

  const columns = [
    { title: '考点代码', dataIndex: 'code', key: 'code', width: 100 },
    { title: '考点名称', dataIndex: 'name', key: 'name', width: 180 },
    {
      title: '所在地', key: 'location', width: 180,
      render: (_: any, r: SiteStandard) => [r.province, r.city, r.district].filter(Boolean).join(' / ') || '-'
    },
    { title: '考场数', dataIndex: 'totalRooms', key: 'totalRooms', width: 80 },
    { title: '座位数', dataIndex: 'totalSeats', key: 'totalSeats', width: 80 },
    {
      title: '标准化等级', dataIndex: 'standardLevel', key: 'standardLevel', width: 110,
      render: (l: string) => <Tag color={getLevelColor(l)}>{l}</Tag>
    },
    { title: '综合评分', dataIndex: 'overallScore', key: 'overallScore', width: 90 },
    {
      title: '设施', key: 'facilities', width: 200,
      render: (_: any, r: SiteStandard) => (
        <Space size={4} wrap>
          {r.hasMonitoring && <Tag color="green">监控</Tag>}
          {r.hasSignalDetector && <Tag color="green">信号</Tag>}
          {r.hasIdentityChecker && <Tag color="green">身份</Tag>}
          {r.hasEmergencyPower && <Tag color="green">应急</Tag>}
          {r.hasMedicalRoom && <Tag color="green">医务</Tag>}
        </Space>
      )
    },
    { title: '联系人', dataIndex: 'contactPerson', key: 'contactPerson', width: 100 },
    {
      title: '状态', dataIndex: 'status', key: 'status', width: 80,
      render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag>
    },
    {
      title: '操作', key: 'action', width: 220, fixed: 'right' as const,
      render: (_: any, r: SiteStandard) => (
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
        <h2 style={{ margin: 0 }}>考点标准化管理</h2>
        <Space>
          <Select
            placeholder="标准化等级" allowClear style={{ width: 140 }}
            value={filterLevel} onChange={setFilterLevel}
            options={['一级', '二级', '三级', '未评级'].map(l => ({ value: l, label: l }))}
          />
          <Select
            placeholder="状态" allowClear style={{ width: 120 }}
            value={filterStatus} onChange={setFilterStatus}
            options={['正常', '维修中', '停用'].map(s => ({ value: s, label: s }))}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>添加考点</Button>
        </Space>
      </div>

      <Table
        dataSource={sites}
        columns={columns}
        rowKey="id"
        loading={loading}
        scroll={{ x: 1500 }}
        pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t) => `共 ${t} 个` }}
      />

      {/* 编辑表单弹窗 */}
      <Modal
        title={editingSite ? '编辑考点' : '添加考点'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={900}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0 16px' }}>
            <Form.Item name="name" label="考点名称" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item name="code" label="考点代码" rules={[{ required: true }]}>
              <Input disabled={!!editingSite} />
            </Form.Item>
            <Form.Item name="standardLevel" label="标准化等级">
              <Select options={['一级', '二级', '三级', '未评级'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="province" label="省份"><Input /></Form.Item>
            <Form.Item name="city" label="城市"><Input /></Form.Item>
            <Form.Item name="district" label="区/县"><Input /></Form.Item>
            <Form.Item name="address" label="详细地址"><Input /></Form.Item>
            <Form.Item name="contactPerson" label="负责人"><Input /></Form.Item>
            <Form.Item name="contactPhone" label="联系电话"><Input /></Form.Item>
            <Form.Item name="totalRooms" label="考场总数"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="totalSeats" label="总座位数"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="capacity" label="最大容纳人数"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="facilityScore" label="设施评分(0-100)"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="managementScore" label="管理评分(0-100)"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="securityScore" label="安全评分(0-100)"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="overallScore" label="综合评分(0-100)"><InputNumber min={0} max={100} style={{ width: '100%' }} /></Form.Item>
            <Form.Item name="status" label="状态">
              <Select options={['正常', '维修中', '停用'].map(v => ({ value: v, label: v }))} />
            </Form.Item>
            <Form.Item name="isActive" label="是否启用" valuePropName="checked">
              <Select options={[{ value: true, label: '是' }, { value: false, label: '否' }]} />
            </Form.Item>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ marginBottom: 8, color: '#666' }}>设施配置：</div>
            <Space size={16} wrap>
              <Form.Item name="hasMonitoring" valuePropName="checked" noStyle>
                <Checkbox>监控设备</Checkbox>
              </Form.Item>
              <Form.Item name="hasSignalDetector" valuePropName="checked" noStyle>
                <Checkbox>信号探测器</Checkbox>
              </Form.Item>
              <Form.Item name="hasIdentityChecker" valuePropName="checked" noStyle>
                <Checkbox>身份验证</Checkbox>
              </Form.Item>
              <Form.Item name="hasEmergencyPower" valuePropName="checked" noStyle>
                <Checkbox>应急电源</Checkbox>
              </Form.Item>
              <Form.Item name="hasMedicalRoom" valuePropName="checked" noStyle>
                <Checkbox>医务室</Checkbox>
              </Form.Item>
            </Space>
          </div>
          <Form.Item name="description" label="描述"><TextArea rows={2} /></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 详情弹窗 */}
      <Modal
        title={`${currentSite?.name} - 详细管理`}
        open={detailOpen}
        onCancel={() => setDetailOpen(false)}
        footer={null}
        width={1100}
      >
        <Tabs
          items={[
            {
              key: 'rooms',
              label: `考场 (${rooms.length})`,
              children: (
                <>
                  <Table
                    dataSource={rooms} rowKey="id" size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      { title: '考场号', dataIndex: 'roomNumber' },
                      { title: '考场名', dataIndex: 'roomName' },
                      { title: '座位数', dataIndex: 'totalSeats' },
                      { title: '备用', dataIndex: 'spareSeats' },
                      { title: '摄像头', dataIndex: 'cameraCount' },
                      { title: '空调', dataIndex: 'hasAirConditioner', render: (v: boolean) => v ? '是' : '否' },
                      { title: '状态', dataIndex: 'status', render: (s: string) => <Tag color="green">{s}</Tag> },
                    ]}
                  />
                  <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 4 }}>
                    <h4>添加考场</h4>
                    <Form form={roomForm} onFinish={handleAddRoom} layout="inline">
                      <Form.Item name="roomNumber" rules={[{ required: true }]}>
                        <Input placeholder="考场号" style={{ width: 120 }} />
                      </Form.Item>
                      <Form.Item name="roomName">
                        <Input placeholder="考场名" style={{ width: 160 }} />
                      </Form.Item>
                      <Form.Item name="totalSeats" initialValue={30} rules={[{ required: true }]}>
                        <Input type="number" placeholder="座位数" style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item name="cameraCount" initialValue={0}>
                        <Input type="number" placeholder="摄像头数" style={{ width: 100 }} />
                      </Form.Item>
                      <Form.Item name="hasAirConditioner" initialValue={true} valuePropName="checked">
                        <Checkbox>空调</Checkbox>
                      </Form.Item>
                      <Button type="primary" htmlType="submit">添加</Button>
                    </Form>
                  </div>
                </>
              ),
            },
            {
              key: 'inspections',
              label: `检查记录 (${inspections.length})`,
              children: (
                <>
                  <Table
                    dataSource={inspections} rowKey="id" size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      { title: '检查日期', dataIndex: 'inspectionDate', render: (d: string) => new Date(d).toLocaleDateString() },
                      { title: '类型', dataIndex: 'inspectionType' },
                      { title: '检查员', dataIndex: 'inspector' },
                      { title: '设施', dataIndex: 'facilityScore' },
                      { title: '安全', dataIndex: 'securityScore' },
                      { title: '管理', dataIndex: 'managementScore' },
                      {
                        title: '总分', dataIndex: 'overallScore',
                        render: (s: number) => <Tag color={s >= 90 ? 'green' : s >= 75 ? 'blue' : 'orange'}>{s}</Tag>
                      },
                      {
                        title: '需整改', dataIndex: 'rectificationRequired',
                        render: (r: boolean) => r ? <Tag color="red">是</Tag> : <Tag>否</Tag>
                      },
                    ]}
                  />
                  <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 4 }}>
                    <h4>添加检查记录</h4>
                    <Form form={inspectionForm} onFinish={handleAddInspection} layout="inline">
                      <Form.Item name="inspectionDate" rules={[{ required: true }]}>
                        <Input type="datetime-local" />
                      </Form.Item>
                      <Form.Item name="inspectionType" rules={[{ required: true }]}>
                        <Select placeholder="类型" style={{ width: 140 }} options={['日常检查', '考前检查', '专项检查'].map(v => ({ value: v, label: v }))} />
                      </Form.Item>
                      <Form.Item name="inspector">
                        <Input placeholder="检查员" style={{ width: 120 }} />
                      </Form.Item>
                      <Form.Item name="overallScore" rules={[{ required: true }]}>
                        <Input type="number" placeholder="综合评分" style={{ width: 100 }} />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">添加</Button>
                    </Form>
                  </div>
                </>
              ),
            },
            {
              key: 'facilities',
              label: `设施设备 (${facilities.length})`,
              children: (
                <>
                  <Table
                    dataSource={facilities} rowKey="id" size="small"
                    pagination={{ pageSize: 5 }}
                    columns={[
                      { title: '类型', dataIndex: 'facilityType' },
                      { title: '名称', dataIndex: 'facilityName' },
                      { title: '品牌', dataIndex: 'facilityBrand' },
                      { title: '数量', dataIndex: 'quantity' },
                      { title: '正常', dataIndex: 'workingQuantity' },
                      { title: '采购日期', dataIndex: 'purchaseDate' },
                      {
                        title: '状态', dataIndex: 'status',
                        render: (s: string) => <Tag color={s === '正常' ? 'green' : 'orange'}>{s}</Tag>
                      },
                    ]}
                  />
                  <div style={{ marginTop: 16, padding: 16, background: '#fafafa', borderRadius: 4 }}>
                    <h4>添加设施设备</h4>
                    <Form form={facilityForm} onFinish={handleAddFacility} layout="inline">
                      <Form.Item name="facilityType" rules={[{ required: true }]}>
                        <Select placeholder="类型" style={{ width: 160 }} options={['监控设备', '信号探测器', '身份验证设备', '应急电源', '其他'].map(v => ({ value: v, label: v }))} />
                      </Form.Item>
                      <Form.Item name="facilityName">
                        <Input placeholder="名称" style={{ width: 160 }} />
                      </Form.Item>
                      <Form.Item name="facilityBrand">
                        <Input placeholder="品牌" style={{ width: 120 }} />
                      </Form.Item>
                      <Form.Item name="quantity" initialValue={1}>
                        <Input type="number" placeholder="数量" style={{ width: 80 }} />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">添加</Button>
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

export default SiteStandards;
