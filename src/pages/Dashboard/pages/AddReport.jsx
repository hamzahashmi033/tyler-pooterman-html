import { useMemo, useState } from 'react';
import { Button, Input, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { PROPERTIES } from '../../../data/properties';

const REPORTS_STORAGE_KEY = 'dashboardReports';

const initialReportForm = {
    propertyName: undefined,
    serviceCategory: undefined,
    providedService: undefined,
    serviceProvidedDate: '',
    serviceDescription: '',
    status: 'Submitted',
    documents: [],
    images: []
};

const fieldStyle = {
    borderRadius: '10px',
    height: '20px'
};

const textAreaStyle = {
    borderRadius: '10px'
};

const AddReport = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialReportForm);

    const propertyOptions = useMemo(
        () => PROPERTIES.map((property) => ({ value: property.address, label: property.address })),
        []
    );

    const serviceMap = useMemo(() => {
        return PROPERTIES.reduce((acc, property) => {
            (property.timeline || []).forEach((entry) => {
                const category = entry.category?.trim();
                const service = entry.service?.trim();

                if (!category || !service) {
                    return;
                }

                if (!acc[category]) {
                    acc[category] = new Set();
                }

                acc[category].add(service);
            });

            return acc;
        }, {});
    }, []);

    const serviceCategoryOptions = useMemo(
        () =>
            Object.keys(serviceMap)
                .sort((a, b) => a.localeCompare(b))
                .map((category) => ({ value: category, label: category })),
        [serviceMap]
    );

    const providedServiceOptions = useMemo(
        () =>
            formData.serviceCategory
                ? Array.from(serviceMap[formData.serviceCategory] || [])
                    .sort((a, b) => a.localeCompare(b))
                    .map((service) => ({ value: service, label: service }))
                : [],
        [formData.serviceCategory, serviceMap]
    );

    const updateField = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            serviceCategory: value,
            providedService: undefined
        }));
    };

    const handleFileChange = (key, files) => {
        const selectedFiles = Array.from(files || []).map(file => file.name);
        updateField(key, selectedFiles);
    };

    const handleSubmit = () => {
        if (
            !formData.propertyName ||
            !formData.serviceCategory ||
            !formData.providedService ||
            !formData.serviceProvidedDate ||
            !formData.serviceDescription.trim()
        ) {
            message.warning('Please fill property, service, provided service, date, and description.');
            return;
        }

        const newReport = {
            id: Date.now(),
            ...formData,
            propertyName: formData.propertyName.trim(),
            serviceDescription: formData.serviceDescription.trim()
        };

        let existingReports = [];
        try {
            existingReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
            if (!Array.isArray(existingReports)) {
                existingReports = [];
            }
        } catch (error) {
            existingReports = [];
        }

        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify([...existingReports, newReport]));
        message.success('Report created successfully.');
        navigate('/dashboard/report-management');
    };

    return (
        <Dashboard pageTitle="Add Report">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div className="widget-box-2 mb-24">
                        <div className="row" style={{ marginTop: '10px' }}>
                            <div className="col-md-6">
                                <label className="fw-6 d-block mb-8">Property</label>
                                <Select
                                    value={formData.propertyName}
                                    onChange={(value) => updateField('propertyName', value)}
                                    options={propertyOptions}
                                    placeholder="Select property"
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="fw-6 d-block mb-8">Service Category</label>
                                <Select
                                    value={formData.serviceCategory}
                                    onChange={handleCategoryChange}
                                    options={serviceCategoryOptions}
                                    placeholder="Select service category"
                                    style={{ width: '100%' }}
                                />
                            </div>

                            <div className="col-md-6 mt-12">
                                <label className="fw-6 d-block mb-8">Provided Service</label>
                                <Select
                                    value={formData.providedService}
                                    onChange={(value) => updateField('providedService', value)}
                                    options={providedServiceOptions}
                                    placeholder={formData.serviceCategory ? 'Select provided service' : 'Select service category first'}
                                    disabled={!formData.serviceCategory}
                                    showSearch
                                    optionFilterProp="label"
                                    style={{ width: '100%' }}
                                    styles={{ selector: { borderRadius: '10px', height: '20px' } }}
                                />
                            </div>

                            <div className="col-md-6 mt-12">
                                <label className="fw-6 d-block mb-8">Service Provided Date</label>
                                <Input
                                    type="date"
                                    value={formData.serviceProvidedDate}
                                    onChange={(event) => updateField('serviceProvidedDate', event.target.value)}
                                    style={fieldStyle}
                                />
                            </div>

                            <div className="col-md-12 mt-12">
                                <label className="fw-6 d-block mb-8">Report Status</label>
                                <Select
                                    value={formData.status}
                                    style={{ width: '100%' }}
                                    styles={{ selector: { borderRadius: '10px' } }}
                                    onChange={(value) => updateField('status', value)}
                                    options={[
                                        { value: 'Submitted', label: 'Submitted' },
                                        { value: 'Pending', label: 'Pending' },
                                        { value: 'Approved', label: 'Approved' }
                                    ]}
                                />
                            </div>

                            <div className="col-md-6 mt-12">
                                <label className="fw-6 d-block mb-8">Upload Documents</label>
                                <Input
                                    type="file"
                                    multiple
                                    onChange={(event) => handleFileChange('documents', event.target.files)}
                                    styles={{ selector: { borderRadius: '10px', height: '20px' } }}
                                />
                                {formData.documents.length > 0 && (
                                    <p className="caption-2" style={{ marginTop: '8px' }}>{formData.documents.join(', ')}</p>
                                )}
                            </div>

                            <div className="col-md-6 mt-12">
                                <label className="fw-6 d-block mb-8">Upload Images</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(event) => handleFileChange('images', event.target.files)}
                                    styles={{ selector: { borderRadius: '10px', height: '20px' } }}
                                />
                                {formData.images.length > 0 && (
                                    <p className="caption-2" style={{ marginTop: '8px' }}>{formData.images.join(', ')}</p>
                                )}
                            </div>

                            <div className="col-12 mt-12">
                                <label className="fw-6 d-block mb-8">Service Description</label>
                                <Input.TextArea
                                    rows={4}
                                    value={formData.serviceDescription}
                                    onChange={(event) => updateField('serviceDescription', event.target.value)}
                                    placeholder="Describe service performed for the property."
                                    style={textAreaStyle}
                                />
                            </div>

                            <div className="col-12 mt-16 d-flex gap-3">
                                <Button type="primary" onClick={handleSubmit}>
                                    Submit Report
                                </Button>
                                <Button onClick={() => navigate('/dashboard/report-management')}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default AddReport;
