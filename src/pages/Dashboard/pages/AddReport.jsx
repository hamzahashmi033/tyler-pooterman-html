import { useMemo, useState } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { PROPERTIES } from '../../../data/properties';

const REPORTS_STORAGE_KEY = 'dashboardReports';

const C = {
    primary: "#1563df", primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.18)", primarySoft: "#EEF4FF",
    dark: "#161E2D", mid: "#4A5568", muted: "#8FA3BF",
    bg: "#f3f7fd", white: "#ffffff", border: "#D8E6F7",
    green: "#16A34A", greenLight: "rgba(22,163,74,0.10)",
};

const CATEGORIES = [
    { id: "hvac", label: "HVAC", icon: "🔧" },
    { id: "roofing", label: "Roofing", icon: "🏠" },
    { id: "electrical", label: "Electrical", icon: "⚡" },
    { id: "plumbing", label: "Plumbing", icon: "💧" },
    { id: "foundation", label: "Foundation", icon: "🏗️" },
    { id: "pest", label: "Pest Control", icon: "🦟" },
    { id: "other", label: "Other", icon: "🔩" },
];

const StepDot = ({ num, label, active, done }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <div style={{
            width: "40px", height: "40px", borderRadius: "50%",
            background: done ? C.green : active ? C.primary : C.border,
            color: done || active ? "#fff" : C.muted,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: "800", fontSize: "14px",
            boxShadow: active ? `0 4px 14px rgba(21,99,223,0.35)` : "none",
            transition: "all 0.3s",
        }}>
            {done ? "✓" : num}
        </div>
        <span style={{ fontSize: "12px", fontWeight: "600", color: active ? C.primary : C.muted, whiteSpace: "nowrap" }}>
            {label}
        </span>
    </div>
);

const inputStyle = {
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${C.border}`, borderRadius: "10px",
    fontSize: "14px", color: C.dark, outline: "none",
    background: C.white, fontFamily: "Manrope, sans-serif",
    transition: "border-color 0.2s",
};

const AddReport = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [query, setQuery] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [category, setCategory] = useState(null);
    const [form, setForm] = useState({
        serviceName: "", date: "", providerName: "", license: "", cost: "", notes: "",
    });

    const matches = useMemo(() => (
        query.length > 1
            ? PROPERTIES.filter(p => p.address.toLowerCase().includes(query.toLowerCase()))
            : []
    ), [query]);

    const handleFormChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));
    const canProceed1 = !!selectedProperty;
    const canProceed2 = category && form.serviceName && form.date && form.providerName && form.cost;

    const handleSubmit = () => {
        const newReport = {
            id: Date.now(),
            propertyName: selectedProperty.address,
            serviceCategory: CATEGORIES.find((c) => c.id === category)?.label || category,
            providedService: form.serviceName.trim(),
            serviceProvidedDate: form.date,
            serviceDescription: form.notes.trim() || form.serviceName.trim(),
            status: 'Submitted',
            documents: [],
            images: [],
            providerName: form.providerName.trim(),
            license: form.license.trim(),
            cost: form.cost
        };

        let existingReports = [];
        try {
            existingReports = JSON.parse(localStorage.getItem(REPORTS_STORAGE_KEY) || '[]');
            if (!Array.isArray(existingReports)) existingReports = [];
        } catch (error) {
            existingReports = [];
        }

        localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify([...existingReports, newReport]));
        message.success('Report created successfully.');
        navigate('/dashboard/report-management');
    };

    return (
        <Dashboard pageTitle="Add Report" hidePageHeading>
            <section style={{ background: C.bg, padding: "10px 0 24px" }}>
                <div className="wrapper-content row">
                    <div className="col-12">
                        <div
                            style={{
                                marginBottom: 18,
                                borderRadius: 18,
                                border: '1px solid #dbe8ff',
                                background: 'linear-gradient(105deg, #0d47a8 0%, #1563df 60%, #2b7bff 100%)',
                                color: '#fff',
                                padding: '28px 24px',
                                minHeight: '104px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                        >
                            <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Add Report</div>
                            <div style={{ color: 'rgba(255,255,255,0.88)', fontSize: 14 }}>
                                Add a verified service report and attach it to the correct property profile.
                            </div>
                        </div>
                        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
                                <StepDot num={1} label="Find Property" active={step === 1} done={step > 1} />
                                <div style={{ flex: 1, height: "2px", background: step > 1 ? C.green : C.border, margin: "0 14px 20px", maxWidth: "120px" }} />
                                <StepDot num={2} label="Service Details" active={step === 2} done={step > 2} />
                                <div style={{ flex: 1, height: "2px", background: step > 2 ? C.green : C.border, margin: "0 14px 20px", maxWidth: "120px" }} />
                                <StepDot num={3} label="Review & Submit" active={step === 3} done={false} />
                            </div>

                            <div style={{ background: C.white, borderRadius: "20px", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(21,99,223,0.08)", padding: "36px" }}>
                                {step === 1 && (
                                    <div>
                                        <h3 style={{ fontSize: "22px", fontWeight: 800, color: C.dark, marginBottom: "8px" }}>Find the Property</h3>
                                        <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>Search by address to attach your report to the correct property profile.</p>
                                        <div style={{ position: "relative", marginBottom: "18px" }}>
                                            <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>📍</span>
                                            <input
                                                style={{ ...inputStyle, paddingLeft: "42px" }}
                                                placeholder="Type a property address..."
                                                value={query}
                                                onChange={(e) => { setQuery(e.target.value); setSelectedProperty(null); }}
                                            />
                                        </div>
                                        {matches.length > 0 && !selectedProperty && (
                                            <div style={{ border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                                                {matches.map((p, idx) => (
                                                    <div key={p.id} onClick={() => { setSelectedProperty(p); setQuery(p.address); }} style={{ padding: "14px 16px", cursor: "pointer", borderBottom: idx !== matches.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: "12px", alignItems: "center" }}>
                                                        <img src={p.img} alt="" style={{ width: "56px", height: "44px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: "14px", fontWeight: 700, color: C.dark }}>{p.address}</div>
                                                            <div style={{ fontSize: "12px", color: C.muted }}>{p.type} · {p.records} records · Score {p.score}</div>
                                                        </div>
                                                        <span style={{ fontSize: "12px", color: C.primary, fontWeight: 700 }}>Select →</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {selectedProperty && (
                                            <div style={{ background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, borderRadius: "12px", padding: "16px", display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
                                                <img src={selectedProperty.img} alt="" style={{ width: "72px", height: "56px", objectFit: "cover", borderRadius: "8px" }} />
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: "15px", fontWeight: 800, color: C.dark }}>{selectedProperty.address}</div>
                                                    <div style={{ fontSize: "12px", color: C.mid }}>{selectedProperty.type} · Score {selectedProperty.score} · {selectedProperty.records} records</div>
                                                </div>
                                                <span style={{ background: C.primary, color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: 700 }}>✓ Selected</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {step === 2 && (
                                    <div>
                                        <h3 style={{ fontSize: "22px", fontWeight: 800, color: C.dark, marginBottom: "8px" }}>Service Details</h3>
                                        <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>Describe the work performed. This record will be attached permanently.</p>
                                        <div style={{ marginBottom: "22px" }}>
                                            <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "10px" }}>Service Category *</label>
                                            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                                                {CATEGORIES.map((cat) => (
                                                    <div key={cat.id} onClick={() => setCategory(cat.id)} style={{ padding: "12px 10px", borderRadius: "10px", textAlign: "center", cursor: "pointer", border: `1.5px solid ${category === cat.id ? C.primary : C.border}`, background: category === cat.id ? C.primarySoft : C.white }}>
                                                        <div style={{ fontSize: "22px", marginBottom: "4px" }}>{cat.icon}</div>
                                                        <div style={{ fontSize: "11px", fontWeight: 700, color: category === cat.id ? C.primary : C.dark }}>{cat.label}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-8">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Service Name *</label>
                                                <input style={inputStyle} placeholder="e.g. HVAC Annual Tune-Up" value={form.serviceName} onChange={(e) => handleFormChange("serviceName", e.target.value)} />
                                            </div>
                                            <div className="col-md-4">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Date of Service *</label>
                                                <input type="date" style={inputStyle} value={form.date} onChange={(e) => handleFormChange("date", e.target.value)} />
                                            </div>
                                            <div className="col-md-6">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Provider / Company Name *</label>
                                                <input style={inputStyle} placeholder="Your business name" value={form.providerName} onChange={(e) => handleFormChange("providerName", e.target.value)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>License #</label>
                                                <input style={inputStyle} placeholder="Optional" value={form.license} onChange={(e) => handleFormChange("license", e.target.value)} />
                                            </div>
                                            <div className="col-md-3">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Total Cost ($) *</label>
                                                <input type="number" style={inputStyle} placeholder="0.00" value={form.cost} onChange={(e) => handleFormChange("cost", e.target.value)} />
                                            </div>
                                            <div className="col-12">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Work Notes</label>
                                                <textarea style={{ ...inputStyle, height: "100px", resize: "vertical" }} placeholder="Describe what was done..." value={form.notes} onChange={(e) => handleFormChange("notes", e.target.value)} />
                                            </div>
                                            <div className="col-12">
                                                <label style={{ fontSize: "13px", fontWeight: 700, color: C.dark, display: "block", marginBottom: "6px" }}>Attachments</label>
                                                <div style={{ border: `2px dashed ${C.border}`, borderRadius: "10px", padding: "28px", textAlign: "center", background: C.bg }}>
                                                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>📎</div>
                                                    <div style={{ fontSize: "13px", fontWeight: 600, color: C.mid }}>Drop receipts, photos or invoices here</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div>
                                        <h3 style={{ fontSize: "22px", fontWeight: 800, color: C.dark, marginBottom: "8px" }}>Review & Submit</h3>
                                        <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>Confirm the details below before attaching this report to the property.</p>
                                        <div style={{ background: C.bg, borderRadius: "14px", border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: "24px" }}>
                                            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "12px", alignItems: "center" }}>
                                                <img src={selectedProperty?.img} alt="" style={{ width: "64px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                                                <div>
                                                    <div style={{ fontSize: "15px", fontWeight: "800", color: C.dark }}>{selectedProperty?.address}</div>
                                                    <div style={{ fontSize: "12px", color: C.muted }}>Score {selectedProperty?.score} · {selectedProperty?.records} existing records</div>
                                                </div>
                                            </div>
                                            {[
                                                ["Category", CATEGORIES.find((c) => c.id === category)?.label],
                                                ["Service", form.serviceName],
                                                ["Date", form.date],
                                                ["Provider", form.providerName],
                                                form.license ? ["License #", form.license] : null,
                                                ["Cost", `$${form.cost}`],
                                            ].filter(Boolean).map(([label, value]) => (
                                                <div key={label} style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                                                    <span style={{ fontSize: "13px", color: C.muted }}>{label}</span>
                                                    <span style={{ fontSize: "13px", fontWeight: 700, color: label === "Cost" ? C.primary : C.dark }}>{value}</span>
                                                </div>
                                            ))}
                                            {form.notes && (
                                                <div style={{ padding: "12px 20px" }}>
                                                    <div style={{ fontSize: "12px", color: C.muted, marginBottom: "4px" }}>Notes</div>
                                                    <div style={{ fontSize: "13px", color: C.mid, lineHeight: "1.6" }}>{form.notes}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${C.border}` }}>
                                    {step > 1 ? (
                                        <button onClick={() => setStep((s) => s - 1)} style={{ padding: "11px 24px", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontWeight: 700, fontSize: "14px", color: C.mid, cursor: "pointer" }}>
                                            ← Back
                                        </button>
                                    ) : <div />}

                                    {step < 3 ? (
                                        <button
                                            onClick={() => { if ((step === 1 && canProceed1) || (step === 2 && canProceed2)) setStep((s) => s + 1); }}
                                            disabled={step === 1 ? !canProceed1 : !canProceed2}
                                            style={{
                                                padding: "11px 28px", background: C.primary, border: "none",
                                                borderRadius: "10px", fontWeight: 700, fontSize: "14px",
                                                color: "#fff", cursor: "pointer",
                                                opacity: (step === 1 ? canProceed1 : canProceed2) ? 1 : 0.45,
                                                boxShadow: "0 4px 16px rgba(21,99,223,0.3)",
                                            }}>
                                            Continue →
                                        </button>
                                    ) : (
                                        <button onClick={handleSubmit} style={{ padding: "11px 28px", background: C.green, border: "none", borderRadius: "10px", fontWeight: 700, fontSize: "14px", color: "#fff", cursor: "pointer", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
                                            Submit Report ✓
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Dashboard>
    );
};

export default AddReport;
