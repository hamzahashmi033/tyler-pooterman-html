import { useEffect, useMemo, useState } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
const REPORTS_STORAGE_KEY = 'dashboardReports';

const statusColors = {
    Submitted: 'processing',
    Pending: 'warning',
    Approved: 'success'
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

    const handleDelete = (reportId) => {
        setReports(prev => prev.filter(report => report.id !== reportId));
        message.success('Report deleted successfully.');
    };

    const columns = [
        {
            title: 'Property',
            dataIndex: 'propertyName',
            key: 'propertyName'
        },
        {
            title: 'Service Date',
            dataIndex: 'serviceDate',
            key: 'serviceDate',
            render: (value) => value || '-'
        },
        {
            title: 'Service Description',
            dataIndex: 'serviceDescription',
            key: 'serviceDescription',
            render: (value) => <span>{value || '-'}</span>
        },
        {
            title: 'Documents',
            dataIndex: 'documents',
            key: 'documents',
            render: (documents) =>
                documents.length > 0
                    ? documents.map(file => <Tag key={file}>{file}</Tag>)
                    : '-'
        },
        {
            title: 'Images',
            dataIndex: 'images',
            key: 'images',
            render: (images) =>
                images.length > 0
                    ? images.map(file => <Tag color="blue" key={file}>{file}</Tag>)
                    : '-'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => <Tag color={statusColors[value] || 'default'}>{value || 'N/A'}</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Popconfirm
                        title="Delete report?"
                        description="This action cannot be undone."
                        okText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger type="text" icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Dashboard pageTitle="Report Management">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div className="widget-box-2 mb-24">
                        <div className="d-flex justify-content-between align-items-center mb-20">
                            <h5 className="title mb-0"></h5>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => navigate('/dashboard/report-management/add-report')}
                            >
                                Create Report
                            </Button>
                        </div>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={sortedReports}
                            pagination={{ pageSize: 6 }}
                            locale={{ emptyText: 'No reports submitted yet.' }}
                            scroll={{ x: 1100 }}
                        />
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ReportManagement;
