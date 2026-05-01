import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
const REPORTS_STORAGE_KEY = 'dashboardReports';

const statusStyles = {
    Submitted: { bg: 'rgba(21,99,223,0.12)', color: '#0f4fbe', border: 'rgba(21,99,223,0.32)' },
    Pending: { bg: 'rgba(245,158,11,0.12)', color: '#b45309', border: 'rgba(245,158,11,0.30)' },
    Approved: { bg: 'rgba(34,197,94,0.12)', color: '#15803d', border: 'rgba(34,197,94,0.30)' }
};

const defaultReports = [
    {
        id: 1,
        propertyName: 'Maple Residency',
        serviceDate: '2026-04-20',
        serviceDescription: 'Quarterly maintenance and plumbing inspection completed.',
        status: 'Submitted',    
        documents: ['service-receipt.pdf'],
        images: ['before.jpg', 'after.jpg']
    }
];

const ReportManagement = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState(() => {
        try {
            const storedReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
            return Array.isArray(storedReports) && storedReports.length > 0 ? storedReports : defaultReports;
        } catch (error) {
            return defaultReports;
        }
    });

    const sortedReports = useMemo(
        () => [...reports].sort((a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)),
        [reports]
    );

    useEffect(() => {
        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(reports));
    }, [reports]);

    const columns = [
        {
            title: 'Property',
            dataIndex: 'propertyName',
            key: 'propertyName',
            render: (value) => (
                <div>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{value || '-'}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Verified Property Profile</div>
                </div>
            )
        },
        {
            title: 'Service Date',
            dataIndex: 'serviceDate',
            key: 'serviceDate',
            render: (value) => (
                <span style={{ color: '#1e293b', fontWeight: 600 }}>{value || '-'}</span>
            )
        },
        {
            title: 'Service Description',
            dataIndex: 'serviceDescription',
            key: 'serviceDescription',
            render: (value) => (
                <span style={{ color: '#475569' }}>{value || '-'}</span>
            )
        },
        {
            title: 'Documents',
            dataIndex: 'documents',
            key: 'documents',
            render: (documents) =>
                documents.length > 0
                    ? documents.map(file => <Tag key={file} style={{ borderRadius: 999, paddingInline: 10, border: '1px solid #cddcf8', background: '#f4f8ff', color: '#335ca8' }}>{file}</Tag>)
                    : '-'
        },
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
                images.length > 0
                    ? images.map(file => <Tag key={file} style={{ borderRadius: 999, paddingInline: 10, border: '1px solid #bfd9ff', background: '#ecf5ff', color: '#1563df' }}>{file}</Tag>)
                    : '-'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                const status = statusStyles[value] || { bg: '#f1f5f9', color: '#334155', border: '#d8e1ec' };
                return (
                    <Tag style={{ borderRadius: 999, paddingInline: 12, fontWeight: 700, background: status.bg, color: status.color, border: `1px solid ${status.border}` }}>
                        {value || 'N/A'}
                    </Tag>
                );
            }
        }
    ];

    const stats = useMemo(() => {
        const submitted = reports.filter((item) => item.status === 'Submitted').length;
        const pending = reports.filter((item) => item.status === 'Pending').length;
        const approved = reports.filter((item) => item.status === 'Approved').length;
        return { total: reports.length, submitted, pending, approved };
    }, [reports]);
    const statCards = [
        { label: 'Total', value: stats.total, accent: '#bfdbfe' },
        { label: 'Submitted', value: stats.submitted, accent: '#93c5fd' },
        { label: 'Pending', value: stats.pending, accent: '#fde68a' },
        { label: 'Approved', value: stats.approved, accent: '#86efac' }
    ];

    return (
        <Dashboard pageTitle="Report Management" hidePageHeading>
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div
                        style={{
                            marginBottom: 18,
                            borderRadius: 18,
                            border: '1px solid #dbe8ff',
                            background: 'linear-gradient(105deg, #0d47a8 0%, #1563df 60%, #2b7bff 100%)',
                            color: '#fff',
                            padding: '22px 24px'
                        }}
                    >
                        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Report Management</div>
                        <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14, marginBottom: 16 }}>
                            Track submitted reports, monitor status, and manage verified service records.
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))',
                                gap: 12
                            }}
                        >
                            {statCards.map((item) => (
                                <div
                                    key={item.label}
                                    style={{
                                        background: 'rgba(255,255,255,0.14)',
                                        border: '1px solid rgba(255,255,255,0.25)',
                                        borderRadius: 14,
                                        padding: '12px 14px',
                                        backdropFilter: 'blur(3px)'
                                    }}
                                >
                                    <div style={{ fontSize: 12, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.78)', marginBottom: 4 }}>
                                        {item.label}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.accent, boxShadow: `0 0 0 3px ${item.accent}40` }}></span>
                                        <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{item.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="widget-box-2 mb-24" style={{ borderRadius: 18, border: '1px solid #e1e9fa', boxShadow: '0 12px 26px rgba(18,42,93,0.08)' }}>
                        <div className="d-flex justify-content-between align-items-center mb-20">
                            <h5 className="title mb-0" style={{ color: '#0f172a', fontWeight: 800 }}>Submitted Reports</h5>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => navigate('/dashboard/report-management/add-report')}
                                style={{
                                    borderRadius: 999,
                                    height: 42,
                                    paddingInline: 18,
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #1563df 0%, #0f4fbe 100%)',
                                    border: 'none',
                                    boxShadow: '0 10px 18px rgba(15,79,190,0.22)'
                                }}
                            >
                                Create Report
                            </Button>
                        </div>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={sortedReports}
                            pagination={{ pageSize: 6, style: { paddingRight: 10 } }}
                            locale={{ emptyText: 'No reports submitted yet.' }}
                            scroll={{ x: 1100 }}
                            rowClassName={(_, index) => (index % 2 === 0 ? 'report-row-even' : 'report-row-odd')}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ReportManagement;
