import { useMemo, useState } from 'react';
import { message } from 'antd';
import Dashboard from '../Dashboard';

const initialProfile = {
    companyName: 'Tyler Realty Group',
    address: '123 Main Street, Springfield',
    phoneNumber: '+1 (555) 123-4567',
    email: 'info@tylerrealty.com',
    website: 'https://www.tylerrealty.com',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=300&auto=format&fit=crop',
    licensingAgency: 'State Real Estate Board',
    licenseNumber: 'REB-2026-9087',
    yearsInBusiness: '12',
    businessDescription: 'Full-service real estate agency specializing in residential and commercial properties.'
};

const formFields = [
    { key: 'companyName', label: 'Company Name', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'phoneNumber', label: 'Phone Number', type: 'tel' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'website', label: 'Website', type: 'url' },
    { key: 'licensingAgency', label: 'Licensing Agency', type: 'text' },
    { key: 'licenseNumber', label: 'License #', type: 'text' },
    { key: 'yearsInBusiness', label: 'Years in Business', type: 'number' }
];

const ProfileManagement = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [savedProfile, setSavedProfile] = useState(initialProfile);
    const [logoFileName, setLogoFileName] = useState('');
    const [logoUploading, setLogoUploading] = useState(false);

    const hasUnsavedChanges = useMemo(
        () => JSON.stringify(profile) !== JSON.stringify(savedProfile),
        [profile, savedProfile]
    );

    const updateField = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const handleReset = () => {
        setProfile(savedProfile);
    };

    const handleSave = (event) => {
        event.preventDefault();
        setSavedProfile(profile);
        message.success('Business profile updated successfully.');
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        setLogoUploading(true);
        setLogoFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
            updateField('logo', reader.result);
            setLogoUploading(false);
            message.success('Logo uploaded successfully.');
        };
        reader.onerror = () => {
            setLogoUploading(false);
            message.error('Unable to upload logo. Please try again.');
        };
        reader.readAsDataURL(file);
    };

    return (
        <Dashboard pageTitle="Profile Management" hidePageHeading>
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div
                        style={{
                            marginBottom: 18,
                            borderRadius: 18,
                            border: '1px solid #dbe8ff',
                            background: 'linear-gradient(105deg, #0d47a8 0%, #1563df 60%, #2b7bff 100%)',
                            color: '#fff',
                            padding: '24px'
                        }}
                    >
                        <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Profile Management</div>
                        <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14 }}>
                            Keep your company profile details updated for trust and better lead quality.
                        </div>
                    </div>
                    <div className="widget-box-2 mb-24" style={{ borderRadius: 18, border: '1px solid #e1e9fa', boxShadow: '0 12px 26px rgba(18,42,93,0.08)' }}>
                        <form onSubmit={handleSave}>
                            <div style={{ marginBottom: 24 }}>
                                <label className="fw-6" style={{ display: 'block', marginBottom: 10 }}>Upload Logo</label>
                                <div
                                    style={{
                                        border: '1px solid #dbe7fb',
                                        borderRadius: 14,
                                        padding: 16,
                                        background: '#f8fbff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 16,
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    <img
                                        src={profile.logo}
                                        alt="Company logo"
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: 12,
                                            objectFit: 'cover',
                                            border: '1px solid #d4e2fb',
                                            background: '#fff'
                                        }}
                                    />
                                    <div style={{ flex: 1, minWidth: 240 }}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                            style={{
                                                width: '100%',
                                                border: '1px solid #d0def8',
                                                borderRadius: 999,
                                                padding: '10px 12px',
                                                background: '#fff'
                                            }}
                                        />
                                        <div style={{ marginTop: 8, color: '#64748b', fontSize: 12 }}>
                                            {logoUploading
                                                ? 'Uploading logo...'
                                                : logoFileName
                                                    ? `Selected: ${logoFileName}`
                                                    : 'Recommended: Square logo (PNG/JPG), up to 2MB.'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                {formFields.map(field => (
                                    <div className="col-md-6" key={field.key}>
                                        <div className="ip-group">
                                            <label className="fw-6" style={{ display: 'block', marginBottom: '10px' }}>{field.label}</label>
                                            <input
                                                type={field.type}
                                                min={field.key === 'yearsInBusiness' ? 0 : undefined}
                                                value={profile[field.key]}
                                                onChange={(e) => updateField(field.key, e.target.value)}
                                                style={{
                                                    borderRadius: 999,
                                                    border: '1px solid #d8e5fb',
                                                    background: '#fff'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12">
                                    <div className="ip-group">
                                        <label className="fw-6" style={{ display: 'block', marginBottom: '10px' }}>Business Description</label>
                                        <textarea
                                            rows="5"
                                            value={profile.businessDescription}
                                            onChange={(e) => updateField('businessDescription', e.target.value)}
                                            style={{
                                                borderRadius: 24,
                                                border: '1px solid #d8e5fb',
                                                background: '#fff'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-12 mt-16">
                                <button
                                    type="submit"
                                    className="tf-btn primary"
                                    style={{
                                        borderRadius: 10,
                                        height: 44,
                                        paddingInline: 20,
                                        background: 'linear-gradient(135deg, #1563df 0%, #0f4fbe 100%)',
                                        border: 'none',
                                        boxShadow: '0 10px 18px rgba(15,79,190,0.20)'
                                    }}
                                >
                                    Save Profile
                                </button>
                                <button
                                    type="button"
                                    className="tf-btn style-border"
                                    onClick={handleReset}
                                    disabled={!hasUnsavedChanges}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color = '#334155';
                                        e.currentTarget.style.background = '#eef4ff';
                                        e.currentTarget.style.borderColor = '#b8cdf5';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = '#334155';
                                        e.currentTarget.style.background = '#fff';
                                        e.currentTarget.style.borderColor = '#c8d9f8';
                                    }}
                                    style={{
                                        borderRadius: 10,
                                        height: 44,
                                        paddingInline: 20,
                                        borderColor: '#c8d9f8',
                                        color: '#334155',
                                        background: '#fff',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    Reset Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
};

export default ProfileManagement;
