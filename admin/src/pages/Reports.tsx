import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message, Tag, Spin } from 'antd';
import { PlusOutlined, PlayCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { generateReport, getReports, getReport, generateAiSummary, Report } from '../api/reports';
import dayjs from 'dayjs';
import axios from '../api/axios';

interface ExamOption {
  value: string;
  label: string;
}

const Reports = () => {
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exams, setExams] = useState<ExamOption[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await axios.get<{ data: Array<{ id: string; name: string }> }>('/mock/exams');
      setExams(response.data.data.map(e => ({ value: e.id, label: e.name })));
    } catch {
      message.error('获取考试列表失败');
    }
  };

  const fetchReports = async (examId: string) => {
    setLoading(true);
    try {
      const response = await getReports(examId);
      setReports(response);
    } catch {
      message.error('获取报告列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (values: any) => {
    setIsGenerating(true);
    try {
      await generateReport(values.examId, values.reportType);
      message.success('报告生成成功');
      setIsModalOpen(false);
      fetchReports(values.examId);
    } catch {
      message.error('生成失败');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleView = async (id: string) => {
    try {
      const response = await getReport(id);
      setSelectedReport(response);
    } catch {
      message.error('获取报告失败');
    }
  };

  const handleAiSummary = async (id: string) => {
    setIsAiGenerating(true);
    try {
      const response = await generateAiSummary(id);
      setSelectedReport(response);
      message.success('AI总结生成成功');
    } catch {
      message.error('生成失败');
    } finally {
      setIsAiGenerating(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'draft': 'default',
      'generated': 'blue',
      'ai_summary_generated': 'green',
      'published': 'success',
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      'draft': '草稿',
      'generated': '已生成',
      'ai_summary_generated': 'AI总结已生成',
      'published': '已发布',
    };
    return texts[status] || status;
  };

  const getReportTypeText = (type: string) => {
    const texts: Record<string, string> = {
      'daily': '日报',
      'weekly': '周报',
      'exam': '考试报告',
      'summary': '总结报告',
    };
    return texts[type] || type;
  };

  const columns = [
    { title: '报告类型', dataIndex: 'reportType', key: 'reportType', render: (type: string) => getReportTypeText(type) },
    { title: '所属考试', dataIndex: 'examId', key: 'examId' },
    { title: '开始时间', dataIndex: 'periodStart', key: 'periodStart', render: (t: string) => dayjs(t).format('YYYY-MM-DD') },
    { title: '结束时间', dataIndex: 'periodEnd', key: 'periodEnd', render: (t: string) => dayjs(t).format('YYYY-MM-DD') },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
    },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt', render: (t: string) => dayjs(t).format('YYYY-MM-DD HH:mm') },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: Report) => (
        <span>
          <Button icon={<EyeOutlined />} onClick={() => handleView(record.id)} style={{ marginRight: 8 }} />
          {record.status !== 'ai_summary_generated' && (
            <Button icon={<PlayCircleOutlined />} onClick={() => handleAiSummary(record.id)}>
              AI总结
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>报告管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
          生成报告
        </Button>
      </div>

      <Table 
        dataSource={reports} 
        columns={columns} 
        rowKey="id"
        loading={loading}
      />

      <Modal
        title="生成报告"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleGenerate} layout="vertical">
          <Form.Item name="examId" label="选择考试" rules={[{ required: true }]}>
            <Select options={exams} />
          </Form.Item>
          <Form.Item name="reportType" label="报告类型" rules={[{ required: true }]}>
            <Select options={[
              { value: 'daily', label: '日报' },
              { value: 'weekly', label: '周报' },
              { value: 'exam', label: '考试报告' },
              { value: 'summary', label: '总结报告' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isGenerating}>生成</Button>
            <Button onClick={() => setIsModalOpen(false)} style={{ marginLeft: 8 }}>取消</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="报告详情"
        open={!!selectedReport}
        onCancel={() => setSelectedReport(null)}
        footer={null}
        width={800}
      >
        {selectedReport && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <strong>报告类型：</strong>{getReportTypeText(selectedReport.reportType)}
            </div>
            <div style={{ marginBottom: 16 }}>
              <strong>状态：</strong><Tag color={getStatusColor(selectedReport.status)}>{getStatusText(selectedReport.status)}</Tag>
            </div>
            {selectedReport.aiContent && (
              <div style={{ marginBottom: 16 }}>
                <strong>AI总结：</strong>
                <div style={{ marginTop: 8, padding: 12, background: '#f5f5f5', borderRadius: 4 }}>
                  {selectedReport.aiContent}
                </div>
              </div>
            )}
            {!selectedReport.aiContent && (
              <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => handleAiSummary(selectedReport.id)} loading={isAiGenerating}>
                生成AI总结
              </Button>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;