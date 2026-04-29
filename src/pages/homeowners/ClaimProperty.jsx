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
    amber: "#D97706", amberLight: "rgba(217,119,6,0.10)",
};

const inputStyle = {
    width: "100%", padding: "12px 14px",
    border: `1.5px solid ${C.border}`, borderRadius: "10px",
    fontSize: "14px", color: C.dark, outline: "none",
    background: C.white, fontFamily: "Manrope, sans-serif",
    transition: "border-color 0.2s",
};

const StepBar = ({ step }) => {
    const steps = ["Find Property", "Verify Identity", "Privacy Settings", "Confirmed"];
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "48px", gap: "0" }}>
            {steps.map((label, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <div style={{
                            width: "36px", height: "36px", borderRadius: "50%",
                            background: i + 1 < step ? C.green : i + 1 === step ? C.primary : C.border,
                            color: i + 1 <= step ? "#fff" : C.muted,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontWeight: "800", fontSize: "13px", transition: "all 0.3s",
                        }}>
                            {i + 1 < step ? "✓" : i + 1}
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: "600", color: i + 1 === step ? C.primary : C.muted, whiteSpace: "nowrap" }}>{label}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{ width: "80px", height: "2px", background: i + 1 < step ? C.green : C.border, margin: "0 8px", marginBottom: "20px", transition: "all 0.3s" }} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default function ClaimProperty() {
    const [step, setStep] = useState(1);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [identity, setIdentity] = useState({ name: "", email: "", phone: "", docType: "deed", relationship: "owner" });
    const [privacy, setPrivacy] = useState({
        showRecords: true, showScore: true,
        showCost: false, allowBuyerAccess: true, allowAgentAccess: true,
    });

    const matches = query.length > 1
        ? PROPERTIES.filter(p => p.address.toLowerCase().includes(query.toLowerCase()))
        : [];

    const canStep2 = !!selected;
    const canStep3 = identity.name && identity.email && identity.phone;

    const privacyOptions = [
        { key: "showRecords", label: "Show service record timeline", desc: "Buyers can see the list of all past service events" },
        { key: "showScore", label: "Display property health score", desc: "Your property score is visible to report unlockers" },
        { key: "showCost", label: "Include service costs", desc: "Individual service costs shown in the report" },
        { key: "allowBuyerAccess", label: "Allow buyer report access", desc: "Buyers can pay to unlock your full verified report" },
        { key: "allowAgentAccess", label: "Allow real estate agent access", desc: "Licensed agents can request access to your report" },
    ];

    if (step === 4) {
        return (
            <div id="wrapper"><div id="pagee" className="clearfix">
                <Header />
                <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.bg }}>
                    <div style={{ textAlign: "center", background: C.white, borderRadius: "24px", padding: "56px 48px", boxShadow: "0 8px 40px rgba(21,99,223,0.10)", border: `1px solid ${C.border}`, maxWidth: "540px", margin: "20px auto" }}>
                        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: C.greenLight, border: `2px solid ${C.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 20px" }}>🏡</div>
                        <h2 style={{ fontSize: "28px", fontWeight: "900", color: C.dark, marginBottom: "12px" }}>Property Claimed!</h2>
                        <p style={{ color: C.mid, fontSize: "15px", lineHeight: "1.7", marginBottom: "24px" }}>
                            <strong>{selected?.address}</strong> has been added to your account. You now control its verified history and can manage what's shared with buyers and agents.
                        </p>
                        <div style={{ background: C.bg, borderRadius: "12px", border: `1px solid ${C.border}`, padding: "16px 20px", marginBottom: "28px", textAlign: "left" }}>
                            {[
                                ["Current Score", `${selected?.score} / 100`],
                                ["Verified Records", `${selected?.records} records`],
                                ["Property Type", selected?.type],
                                ["Buyer Access", privacy.allowBuyerAccess ? "Enabled" : "Disabled"],
                            ].map(([k, v]) => (
                                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${C.border}` }}>
                                    <span style={{ fontSize: "13px", color: C.muted }}>{k}</span>
                                    <span style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{v}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                            <Link to="/homeowners/manage-records" style={{ padding: "12px 24px", background: C.primary, color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                                Manage Records →
                            </Link>
                            <Link to="/dashboard" style={{ padding: "12px 24px", background: C.primarySoft, color: C.primary, border: `1px solid ${C.primaryBorder}`, borderRadius: "10px", fontWeight: "700", fontSize: "14px", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                                Dashboard
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
            <section style={{ background: "linear-gradient(135deg, #0f2044, #1563df)", padding: "80px 0 60px" }}>
                <div className="container">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 18px", marginBottom: "20px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#86efac", textTransform: "uppercase", letterSpacing: "0.08em" }}>For Homeowners</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: "900", color: "#fff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                        Claim Your Property
                    </h1>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", maxWidth: "520px", lineHeight: "1.7", margin: "0 0 32px" }}>
                        Take ownership of your property's verified service history. Control what buyers see, when they see it, and build the transparency that adds real value at sale time.
                    </p>
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                        {[["🏡", "Own your data"], ["🔒", "Privacy controlled"], ["📈", "Adds resale value"]].map(([icon, label]) => (
                            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <span style={{ fontSize: "18px" }}>{icon}</span>
                                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)", fontWeight: "600" }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form */}
            <section style={{ background: C.bg, padding: "60px 0 80px" }}>
                <div className="container">
                    <div style={{ maxWidth: "680px", margin: "0 auto" }}>
                        <StepBar step={step} />

                        <div style={{ background: C.white, borderRadius: "20px", border: `1px solid ${C.border}`, boxShadow: "0 8px 32px rgba(21,99,223,0.08)", padding: "40px" }}>

                            {/* Step 1: Find property */}
                            {step === 1 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Find Your Property</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "28px" }}>Search by address to locate your property in our database.</p>

                                    <div style={{ position: "relative", marginBottom: "16px" }}>
                                        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "18px" }}>🏠</span>
                                        <input style={{ ...inputStyle, paddingLeft: "42px" }} placeholder="Enter your property address…"
                                            value={query} onChange={e => { setQuery(e.target.value); setSelected(null); }}
                                            onFocus={e => e.target.style.borderColor = C.primary}
                                            onBlur={e => e.target.style.borderColor = C.border} />
                                    </div>

                                    {matches.length > 0 && !selected && (
                                        <div style={{ border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>
                                            {matches.map(p => {
                                                const scoreColor = p.score >= 90 ? C.green : p.score >= 75 ? C.primary : C.amber;
                                                return (
                                                    <div key={p.id} onClick={() => { setSelected(p); setQuery(p.address); }}
                                                        style={{ padding: "14px 16px", cursor: "pointer", borderBottom: `1px solid ${C.border}`, display: "flex", gap: "14px", alignItems: "center", background: C.white, transition: "background 0.15s" }}
                                                        onMouseEnter={e => e.currentTarget.style.background = C.bg}
                                                        onMouseLeave={e => e.currentTarget.style.background = C.white}>
                                                        <img src={p.img} alt="" style={{ width: "56px", height: "44px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: "14px", fontWeight: "700", color: C.dark }}>{p.address}</div>
                                                            <div style={{ fontSize: "12px", color: C.muted }}>{p.type} · {p.records} records</div>
                                                        </div>
                                                        <div style={{ fontSize: "14px", fontWeight: "800", color: scoreColor }}>{p.score}</div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {selected && (
                                        <div style={{ background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, borderRadius: "12px", padding: "16px", display: "flex", gap: "14px", alignItems: "center", marginBottom: "20px" }}>
                                            <img src={selected.img} alt="" style={{ width: "80px", height: "62px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: "15px", fontWeight: "800", color: C.dark }}>{selected.address}</div>
                                                <div style={{ fontSize: "12px", color: C.mid, marginTop: "2px" }}>
                                                    {selected.type} · Score {selected.score} · {selected.records} verified records · Built {selected.yearBuilt}
                                                </div>
                                                <div style={{ display: "flex", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                                                    {selected.tag.split(" · ").map(t => (
                                                        <span key={t} style={{ fontSize: "11px", padding: "2px 8px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "100px", color: C.primary, fontWeight: "600" }}>{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div style={{ background: C.primary, color: "#fff", borderRadius: "8px", padding: "4px 12px", fontSize: "11px", fontWeight: "700", flexShrink: 0 }}>✓ Found</div>
                                        </div>
                                    )}

                                    {query.length > 1 && matches.length === 0 && !selected && (
                                        <div style={{ textAlign: "center", padding: "28px", color: C.muted, fontSize: "14px" }}>
                                            No properties found. <Link to="/contact-us" style={{ color: C.primary }}>Contact us</Link> to add your property.
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Step 2: Verify identity */}
                            {step === 2 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Verify Your Identity</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>We need to confirm you have a legitimate relationship with this property before granting ownership access.</p>

                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Full Name *</label>
                                            <input style={inputStyle} placeholder="As it appears on property documents" value={identity.name} onChange={e => setIdentity(v => ({ ...v, name: e.target.value }))} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Email Address *</label>
                                            <input type="email" style={inputStyle} placeholder="you@example.com" value={identity.email} onChange={e => setIdentity(v => ({ ...v, email: e.target.value }))} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Phone Number *</label>
                                            <input type="tel" style={inputStyle} placeholder="+1 (555) 000-0000" value={identity.phone} onChange={e => setIdentity(v => ({ ...v, phone: e.target.value }))} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
                                        </div>
                                        <div className="col-md-6">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Relationship to Property *</label>
                                            <select style={{ ...inputStyle }} value={identity.relationship} onChange={e => setIdentity(v => ({ ...v, relationship: e.target.value }))}>
                                                <option value="owner">Current Owner</option>
                                                <option value="buyer">Under Contract (Buyer)</option>
                                                <option value="agent">Authorized Agent</option>
                                                <option value="estate">Estate Representative</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label style={{ fontSize: "13px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "6px" }}>Proof of Ownership</label>
                                            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
                                                {["deed", "tax", "mortgage", "utility"].map(doc => (
                                                    <button key={doc} onClick={() => setIdentity(v => ({ ...v, docType: doc }))}
                                                        style={{ padding: "8px 14px", borderRadius: "8px", border: `1.5px solid ${identity.docType === doc ? C.primary : C.border}`, background: identity.docType === doc ? C.primarySoft : C.white, color: identity.docType === doc ? C.primary : C.mid, fontWeight: "600", fontSize: "12px", cursor: "pointer" }}>
                                                        {doc === "deed" ? "Property Deed" : doc === "tax" ? "Tax Bill" : doc === "mortgage" ? "Mortgage" : "Utility Bill"}
                                                    </button>
                                                ))}
                                            </div>
                                            <div style={{ border: `2px dashed ${C.border}`, borderRadius: "10px", padding: "24px", textAlign: "center", cursor: "pointer", background: C.bg }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = C.primary; e.currentTarget.style.background = C.primarySoft; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}>
                                                <div style={{ fontSize: "28px", marginBottom: "8px" }}>📄</div>
                                                <div style={{ fontSize: "13px", fontWeight: "600", color: C.mid }}>Upload {identity.docType === "deed" ? "Property Deed" : identity.docType === "tax" ? "Tax Bill" : identity.docType === "mortgage" ? "Mortgage Statement" : "Utility Bill"}</div>
                                                <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px" }}>PDF or image · Document is kept private and deleted after verification</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Privacy settings */}
                            {step === 3 && (
                                <div>
                                    <h3 style={{ fontSize: "22px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>Privacy & Sharing Settings</h3>
                                    <p style={{ color: C.mid, fontSize: "14px", marginBottom: "24px" }}>You control exactly what's visible in your property's public report. Adjust any time from your dashboard.</p>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {privacyOptions.map(opt => (
                                            <div key={opt.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", background: C.bg, borderRadius: "12px", border: `1px solid ${privacy[opt.key] ? C.primaryBorder : C.border}`, transition: "border-color 0.2s" }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: "14px", fontWeight: "700", color: C.dark }}>{opt.label}</div>
                                                    <div style={{ fontSize: "12px", color: C.muted, marginTop: "2px" }}>{opt.desc}</div>
                                                </div>
                                                <button onClick={() => setPrivacy(p => ({ ...p, [opt.key]: !p[opt.key] }))}
                                                    style={{
                                                        width: "48px", height: "26px", borderRadius: "13px", border: "none", cursor: "pointer",
                                                        background: privacy[opt.key] ? C.primary : C.border, padding: "3px", transition: "all 0.25s", flexShrink: 0, marginLeft: "16px", position: "relative",
                                                    }}>
                                                    <div style={{
                                                        width: "20px", height: "20px", borderRadius: "50%", background: "#fff",
                                                        position: "absolute", top: "3px", transition: "left 0.25s",
                                                        left: privacy[opt.key] ? "25px" : "3px",
                                                        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                                                    }} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ marginTop: "20px", background: C.amberLight, border: `1px solid rgba(217,119,6,0.25)`, borderRadius: "10px", padding: "14px 16px", display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                        <span style={{ fontSize: "18px" }}>💡</span>
                                        <span style={{ fontSize: "13px", color: C.amber, lineHeight: "1.5", fontWeight: "600" }}>
                                            Properties with buyer access enabled sell faster and at higher prices. Transparent history builds immediate buyer confidence.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Nav buttons */}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", paddingTop: "24px", borderTop: `1px solid ${C.border}` }}>
                                {step > 1 ? (
                                    <button onClick={() => setStep(s => s - 1)} style={{ padding: "11px 24px", background: "transparent", border: `1.5px solid ${C.border}`, borderRadius: "10px", fontWeight: "700", fontSize: "14px", color: C.mid, cursor: "pointer" }}>← Back</button>
                                ) : <div />}
                                <button
                                    onClick={() => {
                                        if (step === 1 && canStep2) setStep(2);
                                        else if (step === 2 && canStep3) setStep(3);
                                        else if (step === 3) setStep(4);
                                    }}
                                    disabled={(step === 1 && !canStep2) || (step === 2 && !canStep3)}
                                    style={{
                                        padding: "11px 28px", background: step === 3 ? C.green : C.primary,
                                        border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px",
                                        color: "#fff", cursor: "pointer",
                                        opacity: (step === 1 ? canStep2 : step === 2 ? canStep3 : true) ? 1 : 0.45,
                                        boxShadow: `0 4px 16px ${step === 3 ? "rgba(22,163,74,0.3)" : "rgba(21,99,223,0.3)"}`,
                                    }}>
                                    {step === 3 ? "Claim Property 🏡" : "Continue →"}
                                </button>
                            </div>
                        </div>

                        {/* Trust badges */}
                        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
                            {[["🔒", "SSL Encrypted"], ["🛡️", "Documents deleted after verification"], ["👁️", "You control visibility"]].map(([icon, label]) => (
                                <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ fontSize: "14px" }}>{icon}</span>
                                    <span style={{ fontSize: "12px", color: C.muted, fontWeight: "600" }}>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div></div>
    );
}
