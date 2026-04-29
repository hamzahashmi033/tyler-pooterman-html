import { useMemo, useState } from 'react';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Popconfirm, Space, Table, Tag } from 'antd';
import Dashboard from '../Dashboard';

const initialForm = {
    propertyName: '',
    address: '',
    serviceDate: '',
    serviceType: '',
    notes: '',
    documents: [],
    photos: []
};

const PropertyManagement = () => {
    const [properties, setProperties] = useState([
        {
            id: 1,
            propertyName: 'Maple Residency',
            address: '221B Oak Avenue, Springfield',
            serviceDate: '2026-04-21',
            serviceType: 'Inspection',
            notes: 'Initial service completed and client approved.',
            documents: ['inspection-receipt.pdf'],
            photos: ['front-view.jpg', 'lobby.jpg']
        }
    ]);
    const [formData, setFormData] = useState(initialForm);
    const [editingId, setEditingId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const sortedProperties = useMemo(
        () => [...properties].sort((a, b) => new Date(b.serviceDate) - new Date(a.serviceDate)),
        [properties]
    );

    const updateField = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (key, files) => {
        const selectedFiles = Array.from(files || []).map(file => file.name);
        updateField(key, selectedFiles);
    };

    const resetForm = () => {
        setFormData(initialForm);
        setEditingId(null);
        setIsModalOpen(false);
    };

    const handleSubmit = () => {
        if (!formData.propertyName.trim() || !formData.address.trim() || !formData.serviceDate) {
            message.warning('Please fill property name, address, and service date.');
            return;
        }

        if (editingId) {
            setProperties(prev =>
                prev.map(property =>
                    property.id === editingId
                        ? { ...property, ...formData, propertyName: formData.propertyName.trim(), address: formData.address.trim() }
                        : property
                )
            );
            message.success('Property updated successfully.');
        } else {
            setProperties(prev => [
                ...prev,
                {
                    id: Date.now(),
                    ...formData,
                    propertyName: formData.propertyName.trim(),
                    address: formData.address.trim()
                }
            ]);
            message.success('Property added successfully.');
        }

        resetForm();
    };

    const openCreateModal = () => {
        setFormData(initialForm);
        setEditingId(null);
        setIsModalOpen(true);
    };

    const handleEdit = (property) => {
        setEditingId(property.id);
        setFormData({
            propertyName: property.propertyName,
            address: property.address,
            serviceDate: property.serviceDate,
            serviceType: property.serviceType,
            notes: property.notes,
            documents: property.documents,
            photos: property.photos
        });
        setIsModalOpen(true);
    };

    const handleDelete = (propertyId) => {
        setProperties(prev => prev.filter(property => property.id !== propertyId));
        message.success('Property deleted successfully.');

        if (editingId === propertyId) {
            resetForm();
        }
    };

    const modalTitle = editingId ? 'Edit Property' : 'Create Property';

    const columns = [
        {
            title: 'Property',
            dataIndex: 'propertyName',
            key: 'propertyName'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Service Date',
            dataIndex: 'serviceDate',
            key: 'serviceDate',
            render: (value) => value || '-'
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            key: 'serviceType',
            render: (value) => value || '-'
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
            title: 'Photos',
            dataIndex: 'photos',
            key: 'photos',
            render: (photos) =>
                photos.length > 0
                    ? photos.map(file => <Tag color="blue" key={file}>{file}</Tag>)
                    : '-'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Popconfirm
                        title="Delete property?"
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
        <Dashboard pageTitle="Property Management">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div className="widget-box-2 mb-24">
                        <div className="d-flex justify-content-between align-items-center mb-20">
                            <h5 className="title mb-0"></h5>
                            <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
                                Add Property
                            </Button>
                        </div>
                        <Table
                            rowKey="id"
                            columns={columns}
                            dataSource={sortedProperties}
                            pagination={{ pageSize: 6 }}
                            locale={{ emptyText: 'No properties added yet.' }}
                            scroll={{ x: 900 }}
                        />
                    </div>
                </div>
            </div>

            <Modal
                open={isModalOpen}
                title={modalTitle}
                okText={editingId ? 'Update Property' : 'Create Property'}
                cancelText="Cancel"
                onOk={handleSubmit}
                onCancel={resetForm}
                width={760}
                destroyOnClose
            >
                <div className="row" style={{ marginTop: '10px' }}>
                    <div className="col-md-6">
                        <label className="fw-6 d-block mb-8">Property Name</label>
                        <Input
                            value={formData.propertyName}
                            onChange={(event) => updateField('propertyName', event.target.value)}
                            placeholder="Enter property name"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="fw-6 d-block mb-8">Service Date</label>
                        <Input
                            type="date"
                            value={formData.serviceDate}
                            onChange={(event) => updateField('serviceDate', event.target.value)}
                        />
                    </div>
                    <div className="col-md-6 mt-12">
                        <label className="fw-6 d-block mb-8">Address</label>
                        <Input
                            value={formData.address}
                            onChange={(event) => updateField('address', event.target.value)}
                            placeholder="Enter full address"
                        />
                    </div>
                    <div className="col-md-6 mt-12">
                        <label className="fw-6 d-block mb-8">Service Type</label>
                        <Input
                            value={formData.serviceType}
                            onChange={(event) => updateField('serviceType', event.target.value)}
                            placeholder="Inspection / Maintenance / Cleaning"
                        />
                    </div>
                    <div className="col-md-6 mt-12">
                        <label className="fw-6 d-block mb-8">Upload Receipts / Documents</label>
                        <Input
                            type="file"
                            multiple
                            onChange={(event) => handleFileChange('documents', event.target.files)}
                        />
                        {formData.documents.length > 0 && (
                            <p className="caption-2" style={{ marginTop: '8px' }}>{formData.documents.join(', ')}</p>
                        )}
                    </div>
                    <div className="col-md-6 mt-12">
                        <label className="fw-6 d-block mb-8">Upload Property Photos</label>
                        <Input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(event) => handleFileChange('photos', event.target.files)}
                        />
                        {formData.photos.length > 0 && (
                            <p className="caption-2" style={{ marginTop: '8px' }}>{formData.photos.join(', ')}</p>
                        )}
                    </div>
                    <div className="col-12 mt-12">
                        <label className="fw-6 d-block mb-8">Service Notes</label>
                        <Input.TextArea
                            rows={4}
                            value={formData.notes}
                            onChange={(event) => updateField('notes', event.target.value)}
                            placeholder="Add service details, client notes, etc."
                        />
                    </div>
                </div>
            </Modal>
        </Dashboard>
    );
};

export default PropertyManagement;
