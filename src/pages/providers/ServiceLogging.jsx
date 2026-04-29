import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { PROPERTIES } from "../../data/properties";

const C = {
    primary: "#1563df", primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.18)", primarySoft: "#EEF4FF",
    dark: "#161E2D", mid: "#4A5568", muted: "#8FA3BF",
    bg: "#f3f7fd", white: "#ffffff", border: "#D8E6F7",
    green: "#16A34A", greenLight: "rgba(22,163,74,0.10)",
    red: "#DC3545", redLight: "rgba(220,53,69,0.08)",
};

const CATEGORIES = [
    { id: "hvac", label: "HVAC", icon: "🔧", desc: "Heating, cooling, ventilation" },
    { id: "roofing", label: "Roofing", icon: "🏠", desc: "Roof repair, replacement" },
    { id: "electrical", label: "Electrical", icon: "⚡", desc: "Wiring, panels, outlets" },
    { id: "plumbing", label: "Plumbing", icon: "💧", desc: "Pipes, fixtures, drains" },
    { id: "foundation", label: "Foundation", icon: "🏗️", desc: "Structural, waterproofing" },
    { id: "pest", label: "Pest Control", icon: "🦟", desc: "Inspection, treatment" },
    { id: "other", label: "Other", icon: "🔩", desc: "General maintenance" },
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

export default function ServiceLogging() {
    const [step, setStep] = useState(1);
    const [query, setQuery] = useState("");
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [category, setCategory] = useState(null);
    const [form, setForm] = useState({
        serviceName: "", date: "", providerName: "", license: "", cost: "", notes: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const matches = query.length > 1
        ? PROPERTIES.filter(p => p.address.toLowerCase().includes(query.toLowerCase()))
        : [];

    const handleFormChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const canProceed1 = !!selectedProperty;
    const canProceed2 = category && form.serviceName && form.date && form.providerName && form.cost;

    const handleSubmit = () => setSubmitted(true);

    if (submitted) {
        return (
            <div id="wrapper"><div id="pagee" className="clearfix">
                <Header />
                <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>
                    <div style={{
                        textAlign: "center", background: C.white,
                        borderRadius: "24px", padding: "56px 48px",
                        boxShadow: "0 8px 40px rgba(21,99,223,0.10)",
                        border: `1px solid ${C.border}`, maxWidth: "520px", margin: "0 auto",
                    }}>
                        <div style={{ fontSize: "64px", marginBottom: "20px" }}>✅</div>
                        <h2 style={{ fontSize: "28px", fontWeight: "800", color: C.dark, marginBottom: "12px" }}>
                            Record Submitted!
                        </h2>
                        <p style={{ color: C.mid, fontSize: "15px", lineHeight: "1.7", marginBottom: "28px" }}>
                            Your service record for <strong>{selectedProperty?.address}</strong> has been logged and is now visible in the property's verified history.
                        </p>
                        <div style={{ background: C.bg, borderRadius: "12px", padding: "16px 20px", marginBottom: "28px", textAlign: "left" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ fontSize: "13px", color: C.muted }}>Category</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{CATEGORIES.find(c => c.id === category)?.label}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span style={{ fontSize: "13px", color: C.muted }}>Service</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{form.serviceName}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: "13px", color: C.muted }}>Cost</span>
                                <span style={{ fontSize: "13px", fontWeight: "700", color: C.primary }}>${form.cost}</span>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                            <button onClick={() => { setSubmitted(false); setStep(1); setSelectedProperty(null); setQuery(""); setCategory(null); setForm({ serviceName: "", date: "", providerName: "", license: "", cost: "", notes: "" }); }}
                                style={{ padding: "12px 24px", background: C.primary, color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                                Log Another
                            </button>
                            <Link to="/dashboard" style={{ padding: "12px 24px", background: C.primarySoft, color: C.primary, border: `1px solid ${C.primaryBorder}`, borderRadius: "10px", fontWeight: "700", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div></div>
        );
    }

    return (
        <div id="wrapper"><div id="pagee" className="clearfix">
            <Header />

            {/* Hero */}
            <section style={{ background: "linear-gradient(135deg, #0b1628, #1563df)", padding: "80px 0 60px" }}>
                <div className="container">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 18px", marginBottom: "20px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em" }}>For Service Providers</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "900", color: "#fff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                        Log a Service Record
                    </h1>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", maxWidth: "520px", lineHeight: "1.7", margin: "0 0 32px" }}>
                        Attach your verified work directly to the property's permanent history. Builds your reputation and adds value to the homeowner's record.
                    </p>
                    {/* Stats */}
                    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                        {[["280K+", "Records Logged"], ["4,800+", "Active Providers"], ["98%", "Verification Rate"]].map(([v, l]) => (
                            <div key={l}>
                                <div style={{ fontSize: "24px", fontWeight: "900", color: "#60a5fa" }}>{v}</div>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stepper + Form */}
            <section style={{ background: C.bg, padding: "60px 0 80px" }}>
                <div className="container">
                    <div style={{ maxWidth: "720px", margin: "0 auto" }}>

                        {/* Step indicators */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "48px", gap: "0" }}>
                            <StepDot num={1} label="Find Property" active={step === 1} done={step > 1} />
                            <div style={{ flex: 1, height: "2px", background: step > 1 ? C.green : C.border, margin: "0 12px", marginBottom: "20px", maxWidth: "120px", transition: "all 0.3s" }} />
                            <StepDot num={2} label="Service Details" active={step === 2} done={step > 2} />
                            <div style={{ flex: 1, height: "2px", background: step > 2 ? C.green : C.border, margin: "0 12px", marginBottom: "20px", maxWidth: "120px", transition: "all 0.3s" }} />
                            <StepDot num={3} label="Review & Submit" active={step === 3} done={false} />
                        </div>

                        <div style={{ background: C.white, borderRadius: "20px", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(21,99,223,0.08)", padding: "40px" }}>

                            {/* ── STEP 1: Find Property ── */}
                            {step === 1 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Find the Property</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "28px" }}>Search by address to attach your service record to the correct property profile.</p>

                                    <div style={{ position: "relative", marginBottom: "20px" }}>
                                        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>📍</span>
                                        <input
                                            style={{ ...inputStyle, paddingLeft: "42px" }}
                                            placeholder="Type a property address…"
                                            value={query}
                                            onChange={e => { setQuery(e.target.value); setSelectedProperty(null); }}
                                            onFocus={e => e.target.style.borderColor = C.primary}
                                            onBlur={e => e.target.style.borderColor = C.border}
                                        />
                                    </div>

                                    {/* Results */}
                                    {matches.length > 0 && !selectedProperty && (
                                        <div style={{ border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", marginBottom: "20px" }}>
                                            {matches.map(p => (
                                                <div key={p.id} onClick={() => { setSelectedProperty(p); setQuery(p.address); }}
                                                    style={{ padding: "14px 16px", cursor: "pointer", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "14px", alignItems: "center", transition: "background 0.15s" }}
                                                    onMouseEnter={e => e.currentTarget.style.background = C.bg}
                                                    onMouseLeave={e => e.currentTarget.style.background = C.white}
                                                >
                                                    <img src={p.img} alt="" style={{ width: "56px", height: "44px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: "14px", fontWeight: "700", color: C.dark }}>{p.address}</div>
                                                        <div style={{ fontSize: "12px", color: C.muted }}>{p.type} · {p.records} records · Score {p.score}</div>
                                                    </div>
                                                    <div style={{ fontSize: "12px", color: C.primary, fontWeight: "700" }}>Select →</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Selected */}
                                    {selectedProperty && (
                                        <div style={{ background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, borderRadius: "12px", padding: "16px", display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
                                            <img src={selectedProperty.img} alt="" style={{ width: "72px", height: "56px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: "15px", fontWeight: "800", color: C.dark }}>{selectedProperty.address}</div>
                                                <div style={{ fontSize: "12px", color: C.mid, marginTop: "2px" }}>
                                                    {selectedProperty.type} · Score {selectedProperty.score} · {selectedProperty.records} verified records
                                                </div>
                                            </div>
                                            <div style={{ background: C.primary, color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: "700" }}>✓ Selected</div>
                                        </div>
                                    )}

                                    {query.length > 1 && matches.length === 0 && !selectedProperty && (
                                        <div style={{ textAlign: "center", padding: "24px", color: C.muted, fontSize: "14px" }}>
                                            No properties found for "{query}". Try a different address.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── STEP 2: Service Details ── */}
                            {step === 2 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Service Details</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>Describe the work performed. All records are verified and attached permanently to the property.</p>

                                    {/* Category picker */}
                                    <div style={{ marginBottom: "24px" }}>
                                        <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "10px" }}>Service Category *</label>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                                            {CATEGORIES.map(cat => (
                                                <div key={cat.id} onClick={() => setCategory(cat.id)}
                                                    style={{
                                                        padding: "12px 10px", borderRadius: "10px", textAlign: "center",
                                                        cursor: "pointer", transition: "all 0.15s",
                                                        border: `1.5px solid ${category === cat.id ? C.primary : C.border}`,
                                                        background: category === cat.id ? C.primarySoft : C.white,
                                                    }}>
                                                    <div style={{ fontSize: "22px", marginBottom: "4px" }}>{cat.icon}</div>
                                                    <div style={{ fontSize: "11px", fontWeight: "700", color: category === cat.id ? C.primary : C.dark }}>{cat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="row g-3">
                                        <div className="col-md-8">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Service Name *</label>
                                            <input style={inputStyle} placeholder="e.g. HVAC Annual Tune-Up & Filter Replacement" value={form.serviceName} onChange={e => handleFormChange("serviceName", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-4">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Date of Service *</label>
                                            <input type="date" style={inputStyle} value={form.date} onChange={e => handleFormChange("date", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Provider / Company Name *</label>
                                            <input style={inputStyle} placeholder="Your business name" value={form.providerName} onChange={e => handleFormChange("providerName", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-3">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>License #</label>
                                            <input style={inputStyle} placeholder="Optional" value={form.license} onChange={e => handleFormChange("license", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-3">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Total Cost ($) *</label>
                                            <input type="number" style={inputStyle} placeholder="0.00" value={form.cost} onChange={e => handleFormChange("cost", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Work Notes</label>
                                            <textarea style={{ ...inputStyle, height: "100px", resize: "vertical" }} placeholder="Describe what was done, parts used, results, warranty info, next service date…" value={form.notes} onChange={e => handleFormChange("notes", e.target.value)} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Attachments</label>
                                            <div style={{ border: `2px dashed ${C.border}`, borderRadius: "10px", padding: "28px", textAlign: "center", cursor: "pointer", background: C.bg }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = C.primarySoft; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}>
                                                <div style={{ fontSize: "28px", marginBottom: "8px" }}>📎</div>
                                                <div style={{ fontSize: "13px", fontWeight: "600", color: C.mid }}>Drop receipts, photos or invoices here</div>
                                                <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px" }}>PNG, JPG, PDF up to 10MB</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── STEP 3: Review ── */}
                            {step === 3 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Review & Submit</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>Confirm the details below before permanently attaching this record to the property.</p>

                                    <div style={{ background: C.bg, borderRadius: "14px", border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: "24px" }}>
                                        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "12px", alignItems: "center" }}>
                                            <img src={selectedProperty.img} alt="" style={{ width: "64px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                                            <div>
                                                <div style={{ fontSize: "15px", fontWeight: "800", color: C.dark }}>{selectedProperty.address}</div>
                                                <div style={{ fontSize: "12px", color: C.muted }}>Score {selectedProperty.score} · {selectedProperty.records} existing records</div>
                                            </div>
                                        </div>
                                        {[
                                            ["Category", CATEGORIES.find(c => c.id === category)?.label],
                                            ["Service", form.serviceName],
                                            ["Date", form.date],
                                            ["Provider", form.providerName],
                                            form.license ? ["License #", form.license] : null,
                                            ["Cost", `$${form.cost}`],
                                        ].filter(Boolean).map(([label, value]) => (
                                            <div key={label} style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between" }}>
                                                <span style={{ fontSize: "13px", color: C.muted }}>{label}</span>
                                                <span style={{ fontSize: "13px", fontWeight: "700", color: label === "Cost" ? C.primary : C.dark }}>{value}</span>
                                            </div>
                                        ))}
                                        {form.notes && (
                                            <div style={{ padding: "12px 20px" }}>
                                                <div style={{ fontSize: "12px", color: C.muted, marginBottom: "4px" }}>Notes</div>
                                                <div style={{ fontSize: "13px", color: C.mid, lineHeight: "1.6" }}>{form.notes}</div>
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, borderRadius: "10px", padding: "14px 16px", display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "24px" }}>
                                        <span style={{ fontSize: "18px" }}>🔒</span>
                                        <span style={{ fontSize: "13px", color: C.mid, lineHeight: "1.5" }}>
                                            This record will be <strong>permanently attached</strong> to the property's verified history and visible to future buyers and homeowners who unlock a report.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Navigation buttons */}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${C.border}` }}>
                                {step > 1 ? (
                                    <button onClick={() => setStep(s => s - 1)} style={{ padding: "11px 24px", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontWeight: "700", fontSize: "14px", color: C.mid, cursor: "pointer" }}>
                                        ← Back
                                    </button>
                                ) : <div />}

                                {step < 3 ? (
                                    <button
                                        onClick={() => { if ((step === 1 && canProceed1) || (step === 2 && canProceed2)) setStep(s => s + 1); }}
                                        disabled={step === 1 ? !canProceed1 : !canProceed2}
                                        style={{
                                            padding: "11px 28px", background: C.primary, border: "none",
                                            borderRadius: "10px", fontWeight: "700", fontSize: "14px",
                                            color: "#fff", cursor: "pointer",
                                            opacity: (step === 1 ? canProceed1 : canProceed2) ? 1 : 0.45,
                                            boxShadow: "0 4px 16px rgba(21,99,223,0.3)",
                                        }}>
                                        Continue →
                                    </button>
                                ) : (
                                    <button onClick={handleSubmit} style={{ padding: "11px 28px", background: C.green, border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", color: "#fff", cursor: "pointer", boxShadow: "0 4px 16px rgba(22,163,74,0.3)" }}>
                                        Submit Record ✓
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div></div>
    );
}
