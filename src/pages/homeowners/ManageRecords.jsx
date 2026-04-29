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
    red: "#DC3545",
};

const scoreColor = s => s >= 90 ? C.green : s >= 75 ? C.primary : C.amber;
const ALL_CATS = ["All", "HVAC", "Roofing", "Electrical", "Plumbing", "Foundation", "Pest Control"];

export default function ManageRecords() {
    const [selectedId, setSelectedId] = useState(PROPERTIES[0].id);
    const [activeFilter, setActiveFilter] = useState("All");
    const [hiddenRecords, setHiddenRecords] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRecord, setNewRecord] = useState({ service: "", category: "HVAC", provider: "", date: "", cost: "", notes: "" });
    const [extraRecords, setExtraRecords] = useState({});
    const [copied, setCopied] = useState(false);

    const property = PROPERTIES.find(p => p.id === selectedId);
    const allTimeline = [...(property?.timeline || []), ...(extraRecords[selectedId] || [])];
    const filtered = activeFilter === "All"
        ? allTimeline
        : allTimeline.filter(r => r.category === activeFilter || r.category?.toLowerCase() === activeFilter.toLowerCase());

    const toggleHide = (idx) => setHiddenRecords(h => ({ ...h, [`${selectedId}-${idx}`]: !h[`${selectedId}-${idx}`] }));
    const isHidden = (idx) => !!hiddenRecords[`${selectedId}-${idx}`];

    const visibleCount = allTimeline.filter((_, i) => !isHidden(i)).length;
    const sc = scoreColor(property?.score || 0);

    const handleAddRecord = () => {
        if (!newRecord.service || !newRecord.provider || !newRecord.date || !newRecord.cost) return;
        const record = {
            icon: "🔩", service: newRecord.service, provider: newRecord.provider,
            providerVerified: false, date: newRecord.date, category: newRecord.category,
            cost: `$${newRecord.cost}`, notes: newRecord.notes,
        };
        setExtraRecords(e => ({ ...e, [selectedId]: [...(e[selectedId] || []), record] }));
        setNewRecord({ service: "", category: "HVAC", provider: "", date: "", cost: "", notes: "" });
        setShowAddForm(false);
    };

    const handleCopyLink = () => {
        navigator.clipboard?.writeText(`${window.location.origin}/property-deatils/${selectedId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div id="wrapper"><div id="pagee" className="clearfix">
            <Header />

            {/* Hero */}
            <section style={{ background: "linear-gradient(135deg, #0f2044, #1563df)", padding: "70px 0 50px" }}>
                <div className="container">
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "100px", padding: "6px 18px", marginBottom: "20px" }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: "#86efac", textTransform: "uppercase", letterSpacing: "0.08em" }}>Homeowner Dashboard</span>
                    </div>
                    <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "900", color: "#fff", marginBottom: "14px", letterSpacing: "-0.02em" }}>Manage Property Records</h1>
                    <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.65)", maxWidth: "500px", lineHeight: "1.7" }}>
                        Control what's visible in your property's public report, add new service events, and share your verified history with buyers and agents.
                    </p>
                </div>
            </section>

            <section style={{ background: C.bg, padding: "48px 0 80px" }}>
                <div className="container">
                    <div className="row g-4">

                        {/* ── LEFT: Property selector + score ── */}
                        <div className="col-lg-4">
                            {/* Property select */}
                            <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "20px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(21,99,223,0.07)" }}>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, marginBottom: "10px" }}>My Properties</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    {PROPERTIES.slice(0, 6).map(p => (
                                        <button key={p.id} onClick={() => { setSelectedId(p.id); setActiveFilter("All"); }}
                                            style={{
                                                display: "flex", gap: "10px", alignItems: "center", padding: "10px 12px",
                                                borderRadius: "10px", border: `1.5px solid ${selectedId === p.id ? C.primary : C.border}`,
                                                background: selectedId === p.id ? C.primarySoft : C.white,
                                                cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                                            }}>
                                            <img src={p.img} alt="" style={{ width: "44px", height: "36px", objectFit: "cover", borderRadius: "6px", flexShrink: 0 }} />
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: "12px", fontWeight: "700", color: selectedId === p.id ? C.primary : C.dark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.address}</div>
                                                <div style={{ fontSize: "11px", color: C.muted }}>{p.records} records</div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <Link to="/homeowners/claim-property" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "12px", padding: "10px", borderRadius: "10px", border: `1.5px dashed ${C.primaryBorder}`, color: C.primary, fontSize: "13px", fontWeight: "700", textDecoration: "none", background: C.primaryLight }}>
                                    + Claim Another Property
                                </Link>
                            </div>

                            {/* Score card */}
                            {property && (
                                <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "20px", marginBottom: "16px", boxShadow: "0 4px 20px rgba(21,99,223,0.07)" }}>
                                    <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, marginBottom: "14px" }}>Property Health Score</div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                                        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: `conic-gradient(${sc} 0% ${property.score}%, ${C.border} ${property.score}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "900", color: sc }}>{property.score}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: "20px", fontWeight: "900", color: sc }}>{property.score} / 100</div>
                                            <div style={{ fontSize: "12px", color: C.muted }}>{property.score >= 90 ? "Excellent" : property.score >= 80 ? "Good" : property.score >= 70 ? "Fair" : "Needs Work"}</div>
                                        </div>
                                    </div>
                                    {Object.entries(property.scoreBreakdown).map(([key, val]) => (
                                        <div key={key} style={{ marginBottom: "8px" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                                <span style={{ fontSize: "11px", color: C.mid, textTransform: "capitalize" }}>{val.label}</span>
                                                <span style={{ fontSize: "11px", fontWeight: "700", color: scoreColor(val.score) }}>{val.score}</span>
                                            </div>
                                            <div style={{ height: "5px", borderRadius: "100px", background: C.border, overflow: "hidden" }}>
                                                <div style={{ height: "100%", width: `${val.score}%`, background: `linear-gradient(90deg, ${scoreColor(val.score)}, ${scoreColor(val.score)}aa)`, borderRadius: "100px" }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quick actions */}
                            <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "20px", boxShadow: "0 4px 20px rgba(21,99,223,0.07)" }}>
                                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, marginBottom: "12px" }}>Quick Actions</div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <button onClick={() => setShowAddForm(true)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${C.primaryBorder}`, background: C.primarySoft, color: C.primary, fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                                        <span>➕</span> Add Service Record
                                    </button>
                                    <button onClick={handleCopyLink} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${C.border}`, background: C.white, color: C.mid, fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                                        <span>{copied ? "✅" : "🔗"}</span> {copied ? "Link Copied!" : "Copy Report Link"}
                                    </button>
                                    <Link to={`/property-deatils/${selectedId}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${C.border}`, background: C.white, color: C.mid, fontWeight: "700", fontSize: "13px", textDecoration: "none" }}>
                                        <span>👁️</span> Preview Public Report
                                    </Link>
                                    <button style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", border: `1px solid ${C.border}`, background: C.white, color: C.mid, fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                                        <span>📥</span> Download Report PDF
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── RIGHT: Records timeline ── */}
                        <div className="col-lg-8">
                            {property && (
                                <>
                                    {/* Property header */}
                                    <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`, overflow: "hidden", marginBottom: "16px", boxShadow: "0 4px 20px rgba(21,99,223,0.07)" }}>
                                        <img src={property.img} alt="" style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                                        <div style={{ padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <div>
                                                <h4 style={{ fontSize: "18px", fontWeight: "800", color: C.dark, margin: "0 0 4px" }}>{property.address}</h4>
                                                <div style={{ fontSize: "13px", color: C.muted }}>{property.type} · Built {property.yearBuilt} · {property.sqft.toLocaleString()} sqft · {property.beds}bd / {property.baths}ba</div>
                                            </div>
                                            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                <div style={{ background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", color: C.primary }}>
                                                    {visibleCount} public · {allTimeline.length - visibleCount} hidden
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Category filter */}
                                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                                        {ALL_CATS.map(cat => (
                                            <button key={cat} onClick={() => setActiveFilter(cat)}
                                                style={{
                                                    padding: "7px 16px", borderRadius: "100px", border: `1.5px solid ${activeFilter === cat ? C.primary : C.border}`,
                                                    background: activeFilter === cat ? C.primary : C.white,
                                                    color: activeFilter === cat ? "#fff" : C.mid,
                                                    fontWeight: "600", fontSize: "12px", cursor: "pointer", transition: "all 0.15s",
                                                }}>
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Records */}
                                    {filtered.length === 0 ? (
                                        <div style={{ background: C.white, borderRadius: "14px", border: `1px solid ${C.border}`, padding: "40px", textAlign: "center" }}>
                                            <div style={{ fontSize: "32px", marginBottom: "12px" }}>📭</div>
                                            <div style={{ fontSize: "15px", color: C.mid }}>No {activeFilter} records yet.</div>
                                            <button onClick={() => setShowAddForm(true)} style={{ marginTop: "16px", padding: "10px 20px", background: C.primary, color: "#fff", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>Add First Record</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                            {filtered.map((rec, i) => {
                                                const hidden = isHidden(i);
                                                return (
                                                    <div key={i} style={{
                                                        background: hidden ? "#fafafa" : C.white,
                                                        borderRadius: "14px", border: `1px solid ${hidden ? C.border : C.primaryBorder}`,
                                                        padding: "16px 18px", opacity: hidden ? 0.6 : 1,
                                                        boxShadow: hidden ? "none" : "0 2px 12px rgba(21,99,223,0.07)",
                                                        transition: "all 0.2s",
                                                    }}>
                                                        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                                                            <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: hidden ? C.border : C.primarySoft, border: `1px solid ${hidden ? C.border : C.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>
                                                                {rec.icon}
                                                            </div>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px", flexWrap: "wrap" }}>
                                                                    <div>
                                                                        <div style={{ fontSize: "14px", fontWeight: "800", color: C.dark, marginBottom: "2px" }}>{rec.service}</div>
                                                                        <div style={{ fontSize: "12px", color: C.muted }}>
                                                                            {rec.provider} · {rec.date}
                                                                            {rec.providerVerified && <span style={{ color: C.green, fontWeight: "700", marginLeft: "6px" }}>✓ Verified</span>}
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                                                                        <span style={{ fontSize: "14px", fontWeight: "800", color: C.primary }}>{rec.cost}</span>
                                                                        <span style={{ padding: "2px 8px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "6px", fontSize: "10px", fontWeight: "600", color: C.primary }}>{rec.category}</span>
                                                                    </div>
                                                                </div>
                                                                {rec.notes && (
                                                                    <div style={{ marginTop: "8px", fontSize: "12px", color: C.mid, lineHeight: "1.6", background: C.bg, borderRadius: "8px", padding: "8px 10px" }}>
                                                                        {rec.notes}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", gap: "8px", marginTop: "12px", paddingTop: "10px", borderTop: `1px solid ${C.border}` }}>
                                                            <button onClick={() => toggleHide(i)}
                                                                style={{ padding: "5px 12px", borderRadius: "7px", border: `1px solid ${C.border}`, background: C.white, color: hidden ? C.primary : C.mid, fontWeight: "600", fontSize: "11px", cursor: "pointer" }}>
                                                                {hidden ? "👁️ Show in Report" : "🙈 Hide from Report"}
                                                            </button>
                                                            <button style={{ padding: "5px 12px", borderRadius: "7px", border: `1px solid ${C.border}`, background: C.white, color: C.mid, fontWeight: "600", fontSize: "11px", cursor: "pointer" }}>
                                                                📄 View Receipt
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {/* Add record inline button */}
                                    {!showAddForm && (
                                        <button onClick={() => setShowAddForm(true)}
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginTop: "14px", padding: "14px", borderRadius: "12px", border: `2px dashed ${C.primaryBorder}`, background: C.primaryLight, color: C.primary, fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                                            ➕ Add New Service Record
                                        </button>
                                    )}

                                    {/* Add record form */}
                                    {showAddForm && (
                                        <div style={{ background: C.white, borderRadius: "16px", border: `1.5px solid ${C.primaryBorder}`, padding: "24px", marginTop: "14px", boxShadow: "0 4px 20px rgba(21,99,223,0.1)" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                                                <h5 style={{ fontSize: "16px", fontWeight: "800", color: C.dark, margin: 0 }}>Add Service Record</h5>
                                                <button onClick={() => setShowAddForm(false)} style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: C.muted }}>✕</button>
                                            </div>
                                            <div className="row g-3">
                                                <div className="col-md-8">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Service Name *</label>
                                                    <input style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif" }} placeholder="e.g. HVAC Annual Tune-Up" value={newRecord.service} onChange={e => setNewRecord(r => ({ ...r, service: e.target.value }))} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Category *</label>
                                                    <select style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif" }} value={newRecord.category} onChange={e => setNewRecord(r => ({ ...r, category: e.target.value }))}>
                                                        {ALL_CATS.slice(1).map(c => <option key={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div className="col-md-5">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Provider / Company *</label>
                                                    <input style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif" }} placeholder="Company name" value={newRecord.provider} onChange={e => setNewRecord(r => ({ ...r, provider: e.target.value }))} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Date *</label>
                                                    <input type="date" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif" }} value={newRecord.date} onChange={e => setNewRecord(r => ({ ...r, date: e.target.value }))} />
                                                </div>
                                                <div className="col-md-3">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Cost ($) *</label>
                                                    <input type="number" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif" }} placeholder="0" value={newRecord.cost} onChange={e => setNewRecord(r => ({ ...r, cost: e.target.value }))} />
                                                </div>
                                                <div className="col-12">
                                                    <label style={{ fontSize: "12px", fontWeight: "700", color: C.dark, display: "block", marginBottom: "5px" }}>Notes</label>
                                                    <textarea style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${C.border}`, borderRadius: "8px", fontSize: "13px", outline: "none", fontFamily: "Manrope, sans-serif", height: "72px", resize: "vertical" }} placeholder="What was done, warranty, next service date…" value={newRecord.notes} onChange={e => setNewRecord(r => ({ ...r, notes: e.target.value }))} />
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                                                <button onClick={handleAddRecord}
                                                    disabled={!newRecord.service || !newRecord.provider || !newRecord.date || !newRecord.cost}
                                                    style={{ padding: "10px 22px", background: C.primary, color: "#fff", border: "none", borderRadius: "9px", fontWeight: "700", fontSize: "13px", cursor: "pointer", opacity: (!newRecord.service || !newRecord.provider || !newRecord.date || !newRecord.cost) ? 0.5 : 1 }}>
                                                    Save Record
                                                </button>
                                                <button onClick={() => setShowAddForm(false)} style={{ padding: "10px 20px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: "9px", fontWeight: "600", fontSize: "13px", color: C.mid, cursor: "pointer" }}>Cancel</button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div></div>
    );
}
