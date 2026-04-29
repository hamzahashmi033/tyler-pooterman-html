import { useMemo, useState } from 'react';
import { message } from 'antd';
import Dashboard from '../Dashboard';

const initialProfile = {
    companyName: 'Tyler Realty Group',
    address: '123 Main Street, Springfield',
    phoneNumber: '+1 (555) 123-4567',
    email: 'info@tylerrealty.com',
    website: 'https://www.tylerrealty.com',
    logo: 'https://via.placeholder.com/120x120.png?text=Logo',
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
    { key: 'logo', label: 'Logo URL', type: 'url' },
    { key: 'licensingAgency', label: 'Licensing Agency', type: 'text' },
    { key: 'licenseNumber', label: 'License #', type: 'text' },
    { key: 'yearsInBusiness', label: 'Years in Business', type: 'number' }
];

const ProfileManagement = () => {
    const [profile, setProfile] = useState(initialProfile);
    const [savedProfile, setSavedProfile] = useState(initialProfile);

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

    return (
        <Dashboard pageTitle="Update Business Profile">
            <div className="wrapper-content row">
                <div className="col-xl-12">
                    <div className="widget-box-2 mb-24">
                        <form onSubmit={handleSave}>
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
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-12 mt-16">
                                <button type="submit" className="tf-btn primary">
                                    Save Profile
                                </button>
                                <button
                                    type="button"
                                    className="tf-btn style-border"
                                    onClick={handleReset}
                                    disabled={!hasUnsavedChanges}
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
