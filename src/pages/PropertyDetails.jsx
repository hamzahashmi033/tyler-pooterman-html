import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { PROPERTIES } from "../data/properties";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";
import { initScrollAnimations } from "../animations";

const C = {
    heroBg: "#0b1628",
    primary: "#1563df",
    primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.18)",
    primarySoft: "#EEF4FF",
    dark: "#161E2D",
    mid: "#4A5568",
    muted: "#8FA3BF",
    border: "#D8E6F7",
    lightBg: "#f3f7fd",
    white: "#ffffff",
    green: "#16A34A",
    greenLight: "rgba(22,163,74,0.08)",
    greenBorder: "rgba(22,163,74,0.2)",
    amber: "#D97706",
    amberLight: "rgba(217,119,6,0.08)",
    amberBorder: "rgba(217,119,6,0.22)",
};

const catColors = {
    "HVAC": { bg: "rgba(21,99,223,0.08)", color: "#1563df", border: "rgba(21,99,223,0.2)" },
    "Roofing": { bg: "rgba(22,163,74,0.08)", color: "#16A34A", border: "rgba(22,163,74,0.2)" },
    "Electrical": { bg: "rgba(180,83,9,0.08)", color: "#B45309", border: "rgba(180,83,9,0.2)" },
    "Plumbing": { bg: "rgba(8,145,178,0.08)", color: "#0891B2", border: "rgba(8,145,178,0.2)" },
    "Foundation": { bg: "rgba(147,51,234,0.08)", color: "#9333EA", border: "rgba(147,51,234,0.2)" },
    "Pest Control": { bg: "rgba(220,38,38,0.08)", color: "#DC2626", border: "rgba(220,38,38,0.2)" },
    "General": { bg: "rgba(107,114,128,0.08)", color: "#6B7280", border: "rgba(107,114,128,0.2)" },
};

const catIcon = (cat) => ({
    "HVAC": "🔧", "Roofing": "🏠", "Electrical": "⚡",
    "Plumbing": "💧", "Foundation": "🏗️", "Pest Control": "🦟",
})[cat] || "🔨";

const catColor = (cat) => catColors[cat] || catColors["General"];

const scoreColor = (s) => s >= 90 ? C.green : s >= 75 ? C.primary : C.amber;
const scoreLabel = (s) => s >= 90 ? "Excellent" : s >= 80 ? "Very Good" : s >= 70 ? "Good" : "Needs Attention";
const scoreBg = (s) => s >= 90 ? C.greenLight : s >= 75 ? C.primaryLight : C.amberLight;
const scoreBorder = (s) => s >= 90 ? C.greenBorder : s >= 75 ? C.primaryBorder : C.amberBorder;
const scoreGradient = (s) =>
    s >= 90 ? "linear-gradient(90deg,#16A34A,#22c55e)"
    : s >= 75 ? "linear-gradient(90deg,#1563df,#0099CC)"
    : "linear-gradient(90deg,#D97706,#f59e0b)";

const PropertyDetails = () => {
    const { id } = useParams();
    const property = PROPERTIES.find((p) => p.id === id);
    const similar = PROPERTIES.filter((p) => p.id !== id).slice(0, 3);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.jQuery) {
            const $ = window.jQuery;
            try {
                initMain($); initShortcodes($); initCarousels($);
                initRangeSliders($); initAnimationHeading($);
            } catch (err) { console.error(err); }
        }
        if (window.WOW) new window.WOW().init();
        initScrollAnimations();
    }, [id]);

    if (!property) {
        return (
            <div id="wrapper">
                <div id="pagee" className="clearfix">
                    <Header />
                    <section style={{ background: C.lightBg, padding: "120px 0" }}>
                        <div className="container" style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "72px", marginBottom: "24px" }}>🏚️</div>
                            <h2 style={{ color: C.dark, marginBottom: "12px" }}>Property Not Found</h2>
                            <p style={{ color: C.mid, fontSize: "16px", marginBottom: "32px" }}>
                                The requested property does not exist or may have been removed.
                            </p>
                            <Link to="/all-properties" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "12px 28px", borderRadius: "10px",
                                background: C.primary, color: "#fff",
                                fontSize: "14px", fontWeight: "700", textDecoration: "none",
                                boxShadow: "0 8px 20px rgba(21,99,223,0.3)",
                            }}>Browse All Properties</Link>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        );
    }

    const sc = scoreColor(property.score);
    const sl = scoreLabel(property.score);
    const circumference = 2 * Math.PI * 52;
    const dashOffset = circumference - (property.score / 100) * circumference;
    const visibleTimeline = (property.timeline || []).slice(0, 5);
    const lockedCount = (property.records || 0) - visibleTimeline.length;
    const categories = property.tag.split(" · ");
    const breakdown = Object.values(property.scoreBreakdown || {});

    const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "", type: "buyer" });
    const [leadSent, setLeadSent] = useState(false);
    const [leadLoading, setLeadLoading] = useState(false);

    const handleLeadSubmit = (e) => {
        e.preventDefault();
        setLeadLoading(true);
        setTimeout(() => { setLeadLoading(false); setLeadSent(true); }, 1200);
    };

    return (
        <div id="wrapper">
            <div id="pagee" className="clearfix">
                <Header />

                {/* ════════════════════════════════════════
                    HERO BANNER
                ════════════════════════════════════════ */}
                <section style={{
                    background: C.heroBg,
                    position: "relative",
                    overflow: "hidden",
                    paddingTop: "110px",
                    paddingBottom: "64px",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: `url(${property.img})`,
                        backgroundSize: "cover", backgroundPosition: "center",
                        opacity: 0.1, filter: "blur(3px)",
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg,rgba(11,22,40,0.93) 0%,rgba(11,22,40,0.87) 100%)",
                    }} />
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.035) 1px,transparent 1px)",
                        backgroundSize: "28px 28px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", top: "-15%", left: "-8%",
                        width: "600px", height: "600px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(21,99,223,0.22) 0%,transparent 65%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "0%", right: "-5%",
                        width: "400px", height: "400px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(0,153,204,0.14) 0%,transparent 65%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                        background: "linear-gradient(90deg,transparent 0%,#1563df 40%,#0099CC 60%,transparent 100%)",
                    }} />

                    <div className="container" style={{ position: "relative", zIndex: 2 }}>
                        <div className="row align-items-center g-5">

                            {/* ── LEFT: property info ── */}
                            <div className="col-lg-7">
                                {/* Breadcrumb */}
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
                                    <Link to="/" style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: "500", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}
                                        onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}>
                                        Home
                                    </Link>
                                    <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "12px" }}>›</span>
                                    <Link to="/all-properties" style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", fontWeight: "500", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={(e) => (e.target.style.color = "rgba(255,255,255,0.8)")}
                                        onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}>
                                        All Properties
                                    </Link>
                                    <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "12px" }}>›</span>
                                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", fontWeight: "600" }}>
                                        {property.address}
                                    </span>
                                </div>

                                {/* Badges */}
                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
                                    <span style={{
                                        background: "rgba(21,99,223,0.18)", border: "1px solid rgba(21,99,223,0.42)",
                                        color: "#93c5fd", borderRadius: "100px", padding: "5px 15px",
                                        fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em",
                                    }}>{property.type}</span>
                                    <span style={{
                                        background: "rgba(22,163,74,0.18)", border: "1px solid rgba(22,163,74,0.42)",
                                        color: "#86efac", borderRadius: "100px", padding: "5px 15px",
                                        fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em",
                                    }}>✓ Verified Property</span>
                                    <span style={{
                                        background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
                                        color: "rgba(255,255,255,0.7)", borderRadius: "100px", padding: "5px 15px",
                                        fontSize: "12px", fontWeight: "600",
                                    }}>📋 {property.records} Service Records</span>
                                    <span style={{
                                        background: scoreBg(property.score), border: `1px solid ${scoreBorder(property.score)}`,
                                        color: sc, borderRadius: "100px", padding: "5px 15px",
                                        fontSize: "12px", fontWeight: "700",
                                    }}>⭐ Score {property.score} — {sl}</span>
                                </div>

                                {/* Address */}
                                <h1 style={{
                                    fontSize: "clamp(26px, 3.8vw, 48px)", fontWeight: "900",
                                    color: "#ffffff", lineHeight: 1.1,
                                    letterSpacing: "-0.025em", marginBottom: "16px",
                                }}>
                                    {property.address}
                                </h1>

                                {/* Description */}
                                <p style={{
                                    fontSize: "15px", color: "rgba(255,255,255,0.55)",
                                    marginBottom: "36px", lineHeight: "1.78",
                                }}>
                                    {property.description}
                                </p>

                                {/* Stats strip */}
                                <div style={{ display: "flex", gap: "0", flexWrap: "wrap" }}>
                                    {[
                                        { label: "Health Score", value: `${property.score}/100`, color: sc },
                                        { label: "Verified Records", value: property.records, color: "#60a5fa" },
                                        { label: "Years of Data", value: `${property.yearsOfData || 5} yrs`, color: "#60a5fa" },
                                        { label: "Active Providers", value: property.providers || 3, color: "#60a5fa" },
                                    ].map((s, i) => (
                                        <div key={i} style={{
                                            paddingRight: i < 3 ? "32px" : 0,
                                            marginRight: i < 3 ? "32px" : 0,
                                            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
                                        }}>
                                            <div style={{ fontSize: "26px", fontWeight: "900", color: s.color, lineHeight: 1, letterSpacing: "-0.02em" }}>
                                                {s.value}
                                            </div>
                                            <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", marginTop: "5px" }}>{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ── RIGHT: Lead form ── */}
                            <div className="col-lg-5">
                                <div style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: "24px",
                                    backdropFilter: "blur(18px)",
                                    boxShadow: "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
                                    overflow: "hidden",
                                }}>
                                    {/* Form header */}
                                    <div style={{
                                        background: "linear-gradient(135deg,rgba(21,99,223,0.28) 0%,rgba(21,99,223,0.15) 100%)",
                                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                                        padding: "22px 26px",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                            <div style={{
                                                width: "42px", height: "42px", borderRadius: "12px",
                                                background: "rgba(255,255,255,0.12)",
                                                border: "1px solid rgba(255,255,255,0.18)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "20px", flexShrink: 0,
                                            }}>🏡</div>
                                            <div>
                                                <div style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff", lineHeight: 1.2 }}>
                                                    Interested in This Property?
                                                </div>
                                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", marginTop: "3px" }}>
                                                    Submit your interest — we'll connect you directly
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form body */}
                                    <div style={{ padding: "24px 26px" }}>
                                        {leadSent ? (
                                            /* ── Success state ── */
                                            <div style={{ textAlign: "center", padding: "20px 0" }}>
                                                <div style={{
                                                    width: "64px", height: "64px", borderRadius: "50%",
                                                    background: "rgba(22,163,74,0.18)", border: "1px solid rgba(22,163,74,0.35)",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontSize: "30px", margin: "0 auto 18px",
                                                }}>✓</div>
                                                <div style={{ fontSize: "17px", fontWeight: "800", color: "#fff", marginBottom: "8px" }}>
                                                    Interest Submitted!
                                                </div>
                                                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.65", marginBottom: "20px" }}>
                                                    Your inquiry for <strong style={{ color: "rgba(255,255,255,0.8)" }}>{property.address}</strong> has been received.
                                                    A representative will contact you within 24 hours.
                                                </p>
                                                <button onClick={() => setLeadSent(false)} style={{
                                                    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                                                    borderRadius: "10px", color: "rgba(255,255,255,0.75)",
                                                    padding: "9px 20px", fontSize: "13px", fontWeight: "600",
                                                    cursor: "pointer",
                                                }}>
                                                    Submit Another Inquiry
                                                </button>
                                            </div>
                                        ) : (
                                            /* ── Lead form ── */
                                            <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                                                {/* Buyer type toggle */}
                                                <div style={{
                                                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                                                    background: "rgba(255,255,255,0.06)",
                                                    border: "1px solid rgba(255,255,255,0.1)",
                                                    borderRadius: "12px", padding: "4px", gap: "4px",
                                                }}>
                                                    {[
                                                        { val: "buyer", label: "🏠 Buyer" },
                                                        { val: "agent", label: "🔍 Agent" },
                                                        { val: "investor", label: "📈 Investor" },
                                                    ].map((opt) => (
                                                        <button key={opt.val} type="button"
                                                            onClick={() => setLeadForm({ ...leadForm, type: opt.val })}
                                                            style={{
                                                                padding: "8px 6px", borderRadius: "9px",
                                                                border: "none", cursor: "pointer", fontSize: "12px",
                                                                fontWeight: "700", transition: "all 0.18s",
                                                                background: leadForm.type === opt.val ? C.primary : "transparent",
                                                                color: leadForm.type === opt.val ? "#fff" : "rgba(255,255,255,0.5)",
                                                                boxShadow: leadForm.type === opt.val ? "0 2px 12px rgba(21,99,223,0.45)" : "none",
                                                            }}>
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Full name */}
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text" required
                                                        placeholder="e.g. John Smith"
                                                        value={leadForm.name}
                                                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                                                        style={{
                                                            width: "100%", padding: "11px 14px",
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "1px solid rgba(255,255,255,0.12)",
                                                            borderRadius: "11px", color: "#fff",
                                                            fontSize: "14px", outline: "none",
                                                            transition: "border-color 0.18s, background 0.18s",
                                                            boxSizing: "border-box",
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = "rgba(21,99,223,0.65)"; e.target.style.background = "rgba(21,99,223,0.12)"; }}
                                                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                                                    />
                                                </div>

                                                {/* Email */}
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email" required
                                                        placeholder="you@example.com"
                                                        value={leadForm.email}
                                                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                                        style={{
                                                            width: "100%", padding: "11px 14px",
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "1px solid rgba(255,255,255,0.12)",
                                                            borderRadius: "11px", color: "#fff",
                                                            fontSize: "14px", outline: "none",
                                                            transition: "border-color 0.18s, background 0.18s",
                                                            boxSizing: "border-box",
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = "rgba(21,99,223,0.65)"; e.target.style.background = "rgba(21,99,223,0.12)"; }}
                                                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                                                    />
                                                </div>

                                                {/* Phone */}
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        placeholder="+1 (555) 000-0000"
                                                        value={leadForm.phone}
                                                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                                                        style={{
                                                            width: "100%", padding: "11px 14px",
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "1px solid rgba(255,255,255,0.12)",
                                                            borderRadius: "11px", color: "#fff",
                                                            fontSize: "14px", outline: "none",
                                                            transition: "border-color 0.18s, background 0.18s",
                                                            boxSizing: "border-box",
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = "rgba(21,99,223,0.65)"; e.target.style.background = "rgba(21,99,223,0.12)"; }}
                                                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                                                    />
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
                                                        Message
                                                    </label>
                                                    <textarea
                                                        rows={3}
                                                        placeholder={`I'm interested in ${property.address}. Please send me more information.`}
                                                        value={leadForm.message}
                                                        onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                                                        style={{
                                                            width: "100%", padding: "11px 14px",
                                                            background: "rgba(255,255,255,0.07)",
                                                            border: "1px solid rgba(255,255,255,0.12)",
                                                            borderRadius: "11px", color: "#fff",
                                                            fontSize: "14px", outline: "none", resize: "none",
                                                            transition: "border-color 0.18s, background 0.18s",
                                                            boxSizing: "border-box", lineHeight: "1.6",
                                                            fontFamily: "inherit",
                                                        }}
                                                        onFocus={(e) => { e.target.style.borderColor = "rgba(21,99,223,0.65)"; e.target.style.background = "rgba(21,99,223,0.12)"; }}
                                                        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.12)"; e.target.style.background = "rgba(255,255,255,0.07)"; }}
                                                    />
                                                </div>

                                                {/* Submit */}
                                                <button type="submit" disabled={leadLoading} style={{
                                                    width: "100%", padding: "13px",
                                                    background: leadLoading ? "rgba(21,99,223,0.5)" : C.primary,
                                                    border: "none", borderRadius: "12px",
                                                    color: "#fff", fontWeight: "800", fontSize: "15px",
                                                    cursor: leadLoading ? "not-allowed" : "pointer",
                                                    boxShadow: "0 6px 24px rgba(21,99,223,0.45)",
                                                    letterSpacing: "-0.01em", transition: "all 0.18s",
                                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                                }}
                                                    onMouseEnter={(e) => { if (!leadLoading) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(21,99,223,0.55)"; } }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(21,99,223,0.45)"; }}
                                                >
                                                    {leadLoading ? (
                                                        <>
                                                            <span style={{
                                                                width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)",
                                                                borderTopColor: "#fff", borderRadius: "50%",
                                                                display: "inline-block", animation: "leadSpin 0.7s linear infinite",
                                                            }} />
                                                            Submitting…
                                                        </>
                                                    ) : "Express Interest →"}
                                                </button>

                                                {/* Trust micro-copy */}
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                                                    {["🔒 Private & secure", "📧 No spam, ever", "⚡ Reply in 24h"].map((t, i) => (
                                                        <span key={i} style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>{t}</span>
                                                    ))}
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                </div>
                                <style>{`
                                    @keyframes leadSpin {
                                        to { transform: rotate(360deg); }
                                    }
                                    ::placeholder { color: rgba(255,255,255,0.28) !important; }
                                `}</style>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════
                    MAIN CONTENT
                ════════════════════════════════════════ */}
                <section style={{ background: C.lightBg, padding: "56px 0 80px" }}>
                    <div className="container">
                        <div className="row g-4">

                            {/* ───────── LEFT COLUMN ───────── */}
                            <div className="col-lg-8">

                                {/* ── Property Image Card ── */}
                                <div style={{
                                    background: C.white, borderRadius: "22px",
                                    border: `1px solid ${C.border}`,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                    marginBottom: "24px",
                                }}>
                                    <div style={{ position: "relative" }}>
                                        <img
                                            src={property.img}
                                            alt={property.address}
                                            style={{ width: "100%", height: "380px", objectFit: "cover", display: "block" }}
                                        />
                                        {/* Gradient overlay on image */}
                                        <div style={{
                                            position: "absolute", bottom: 0, left: 0, right: 0, height: "100px",
                                            background: "linear-gradient(to top,rgba(22,30,45,0.55),transparent)",
                                            pointerEvents: "none",
                                        }} />
                                        {/* Verified badge */}
                                        <div style={{
                                            position: "absolute", top: "18px", left: "18px",
                                            background: C.primary, color: "#fff",
                                            borderRadius: "9px", padding: "7px 15px",
                                            fontSize: "12px", fontWeight: "700",
                                            boxShadow: "0 3px 14px rgba(21,99,223,0.45)",
                                        }}>✓ Verified Property</div>
                                        {/* Score badge */}
                                        <div style={{
                                            position: "absolute", top: "18px", right: "18px",
                                            background: "rgba(255,255,255,0.96)",
                                            borderRadius: "14px", padding: "10px 16px",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.14)",
                                            display: "flex", alignItems: "center", gap: "11px",
                                        }}>
                                            <svg width="44" height="44" viewBox="0 0 44 44">
                                                <circle cx="22" cy="22" r="19" fill="none" stroke={C.border} strokeWidth="4" />
                                                <circle cx="22" cy="22" r="19" fill="none"
                                                    stroke={sc} strokeWidth="4"
                                                    strokeLinecap="round"
                                                    strokeDasharray={`${2 * Math.PI * 19}`}
                                                    strokeDashoffset={`${2 * Math.PI * 19 - (property.score / 100) * 2 * Math.PI * 19}`}
                                                    transform="rotate(-90 22 22)" />
                                                <text x="22" y="26" textAnchor="middle" fill={sc} fontSize="12" fontWeight="800">{property.score}</text>
                                            </svg>
                                            <div>
                                                <div style={{ fontSize: "11px", color: C.muted, lineHeight: 1 }}>Health Score</div>
                                                <div style={{ fontSize: "13px", fontWeight: "800", color: sc, marginTop: "3px" }}>{sl}</div>
                                            </div>
                                        </div>
                                        {/* Address strip at bottom */}
                                        <div style={{
                                            position: "absolute", bottom: "16px", left: "18px",
                                            color: "rgba(255,255,255,0.9)", fontSize: "14px", fontWeight: "700",
                                            display: "flex", alignItems: "center", gap: "6px",
                                            textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                                        }}>
                                            📍 {property.address}
                                        </div>
                                    </div>

                                    {/* Quick property stats */}
                                    <div style={{
                                        display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                                        borderTop: `1px solid ${C.border}`,
                                    }}>
                                        {[
                                            { icon: "🛏️", label: "Bedrooms", value: property.beds || 4 },
                                            { icon: "🚿", label: "Bathrooms", value: property.baths || 3 },
                                            { icon: "📐", label: "Square Feet", value: (property.sqft || 2340).toLocaleString() },
                                            { icon: "🏗️", label: "Year Built", value: property.yearBuilt || 1998 },
                                        ].map((item, i) => (
                                            <div key={i} style={{
                                                padding: "20px 14px",
                                                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                                                textAlign: "center",
                                                transition: "background 0.18s",
                                            }}
                                                onMouseEnter={(e) => (e.currentTarget.style.background = C.lightBg)}
                                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                            >
                                                <div style={{ fontSize: "24px", marginBottom: "7px" }}>{item.icon}</div>
                                                <div style={{ fontSize: "18px", fontWeight: "800", color: C.dark, lineHeight: 1 }}>{item.value}</div>
                                                <div style={{ fontSize: "11px", color: C.muted, marginTop: "4px" }}>{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Service History Timeline Card ── */}
                                <div style={{
                                    background: C.white, borderRadius: "22px",
                                    border: `1px solid ${C.border}`,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                    marginBottom: "24px",
                                }}>
                                    <div style={{
                                        padding: "26px 30px 22px",
                                        borderBottom: `1px solid ${C.border}`,
                                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap",
                                    }}>
                                        <div>
                                            <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "6px" }}>
                                                <div style={{
                                                    width: "42px", height: "42px", borderRadius: "12px",
                                                    background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                                                }}>📋</div>
                                                <h4 style={{ fontSize: "19px", fontWeight: "800", color: C.dark, margin: 0 }}>
                                                    Service History Timeline
                                                </h4>
                                            </div>
                                            <p style={{ fontSize: "13px", color: C.muted, margin: 0, paddingLeft: "53px" }}>
                                                Chronological record of all verified maintenance events
                                            </p>
                                        </div>
                                        <div style={{
                                            background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                            borderRadius: "100px", padding: "6px 16px",
                                            fontSize: "12px", fontWeight: "700", color: C.primary, whiteSpace: "nowrap",
                                        }}>
                                            {property.records} Total Records
                                        </div>
                                    </div>

                                    <div style={{ padding: "28px 30px" }}>
                                        {visibleTimeline.map((event, i) => {
                                            const cc = catColor(event.category);
                                            const isLast = i === visibleTimeline.length - 1;
                                            return (
                                                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: isLast ? 0 : "4px" }}>
                                                    {/* Timeline track */}
                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "44px" }}>
                                                        <div style={{
                                                            width: "44px", height: "44px", borderRadius: "13px",
                                                            background: cc.bg, border: `1.5px solid ${cc.border}`,
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            fontSize: "20px", flexShrink: 0, zIndex: 1,
                                                        }}>{event.icon}</div>
                                                        {!isLast && (
                                                            <div style={{ width: "2px", flex: 1, background: C.border, margin: "5px 0", minHeight: "24px" }} />
                                                        )}
                                                    </div>

                                                    {/* Event card */}
                                                    <div style={{
                                                        flex: 1, background: C.lightBg,
                                                        border: `1px solid ${C.border}`,
                                                        borderRadius: "16px", padding: "16px 18px",
                                                        marginBottom: isLast ? 0 : "10px",
                                                        transition: "border-color 0.15s, box-shadow 0.15s",
                                                    }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = cc.border; e.currentTarget.style.boxShadow = `0 4px 20px ${cc.bg}`; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
                                                    >
                                                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "8px" }}>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ fontSize: "14px", fontWeight: "700", color: C.dark, marginBottom: "5px", lineHeight: "1.4" }}>
                                                                    {event.service}
                                                                </div>
                                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                                                    <span style={{ fontSize: "12px", color: cc.color, fontWeight: "600" }}>
                                                                        🏢 {event.provider}
                                                                    </span>
                                                                    {event.providerVerified && (
                                                                        <span style={{
                                                                            background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                                                                            color: C.green, borderRadius: "100px",
                                                                            padding: "1px 9px", fontSize: "10px", fontWeight: "700",
                                                                        }}>✓ Verified Provider</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div style={{ textAlign: "right", flexShrink: 0 }}>
                                                                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{event.date}</div>
                                                                {event.cost && (
                                                                    <div style={{ fontSize: "11px", color: C.muted, marginTop: "3px" }}>{event.cost}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {event.notes && (
                                                            <p style={{
                                                                fontSize: "12px", color: C.mid, margin: "0",
                                                                lineHeight: "1.65",
                                                                borderTop: `1px solid ${C.border}`,
                                                                paddingTop: "10px",
                                                            }}>
                                                                {event.notes}
                                                            </p>
                                                        )}
                                                        <div style={{ marginTop: "10px" }}>
                                                            <span style={{
                                                                background: cc.bg, border: `1px solid ${cc.border}`,
                                                                color: cc.color, borderRadius: "100px",
                                                                padding: "3px 11px", fontSize: "11px", fontWeight: "600",
                                                            }}>
                                                                {catIcon(event.category)} {event.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Locked records teaser */}
                                        {lockedCount > 0 && (
                                            <div style={{
                                                background: "linear-gradient(135deg,#EEF4FF,#deeafc)",
                                                border: `1px solid ${C.primaryBorder}`,
                                                borderRadius: "18px", padding: "24px 26px",
                                                marginTop: "20px", textAlign: "center",
                                                position: "relative", overflow: "hidden",
                                            }}>
                                                <div style={{
                                                    position: "absolute", top: "-40px", right: "-40px",
                                                    width: "160px", height: "160px", borderRadius: "50%",
                                                    background: "rgba(21,99,223,0.06)", pointerEvents: "none",
                                                }} />
                                                <div style={{ fontSize: "28px", marginBottom: "10px" }}>🔒</div>
                                                <div style={{ fontSize: "16px", fontWeight: "800", color: C.dark, marginBottom: "6px" }}>
                                                    {lockedCount} More Records in the Full Report
                                                </div>
                                                <p style={{ fontSize: "13px", color: C.mid, margin: "0 auto 20px", maxWidth: "420px", lineHeight: "1.65" }}>
                                                    Unlock the complete service timeline — all {property.records} verified records
                                                    with provider details, costs, inspection certificates, and service notes.
                                                </p>
                                                <button style={{
                                                    padding: "11px 28px", background: C.primary,
                                                    border: "none", borderRadius: "11px", color: "#fff",
                                                    fontWeight: "700", fontSize: "14px", cursor: "pointer",
                                                    boxShadow: "0 6px 20px rgba(21,99,223,0.35)",
                                                    transition: "all 0.15s",
                                                }}
                                                    onMouseEnter={(e) => { e.target.style.transform = "translateY(-1px)"; e.target.style.boxShadow = "0 10px 28px rgba(21,99,223,0.45)"; }}
                                                    onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 6px 20px rgba(21,99,223,0.35)"; }}
                                                >
                                                    Unlock Full Timeline — $30
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* ── Score Breakdown Card ── */}
                                <div style={{
                                    background: C.white, borderRadius: "22px",
                                    border: `1px solid ${C.border}`,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                    marginBottom: "24px",
                                }}>
                                    <div style={{
                                        padding: "26px 30px 22px",
                                        borderBottom: `1px solid ${C.border}`,
                                        display: "flex", alignItems: "center", gap: "11px",
                                    }}>
                                        <div style={{
                                            width: "42px", height: "42px", borderRadius: "12px",
                                            background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                                        }}>📊</div>
                                        <div>
                                            <h4 style={{ fontSize: "19px", fontWeight: "800", color: C.dark, margin: 0 }}>
                                                Health Score Breakdown
                                            </h4>
                                            <p style={{ fontSize: "13px", color: C.muted, margin: 0, marginTop: "2px" }}>
                                                Score by service category — based on recency, coverage, and provider credentials
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ padding: "28px 30px" }}>
                                        {breakdown.map((cat, i) => {
                                            const cc = catColor(cat.label);
                                            const catSc = scoreColor(cat.score);
                                            return (
                                                <div key={i} style={{ marginBottom: i < breakdown.length - 1 ? "22px" : 0 }}>
                                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                                            <div style={{
                                                                width: "36px", height: "36px", borderRadius: "10px",
                                                                background: cc.bg, border: `1px solid ${cc.border}`,
                                                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px",
                                                            }}>{catIcon(cat.label)}</div>
                                                            <span style={{ fontSize: "14px", fontWeight: "700", color: C.dark }}>{cat.label}</span>
                                                            <span style={{
                                                                background: cc.bg, border: `1px solid ${cc.border}`,
                                                                color: cc.color, borderRadius: "100px",
                                                                padding: "2px 9px", fontSize: "10px", fontWeight: "600",
                                                            }}>{cat.records} records</span>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                            <span style={{ fontSize: "16px", fontWeight: "800", color: catSc }}>{cat.score}</span>
                                                            <span style={{ fontSize: "12px", color: C.muted }}>/100</span>
                                                        </div>
                                                    </div>
                                                    <div style={{ height: "10px", borderRadius: "100px", background: C.border, overflow: "hidden" }}>
                                                        <div style={{
                                                            height: "100%",
                                                            width: `${cat.score}%`,
                                                            borderRadius: "100px",
                                                            background: scoreGradient(cat.score),
                                                            boxShadow: `0 2px 8px ${catSc}33`,
                                                            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
                                                        }} />
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                                                        <span style={{ fontSize: "10px", color: C.muted }}>{scoreLabel(cat.score)}</span>
                                                        <span style={{ fontSize: "10px", color: catSc, fontWeight: "600" }}>
                                                            {cat.score >= 90 ? "★ Top Tier" : cat.score >= 80 ? "✓ Strong" : cat.score >= 70 ? "~ Adequate" : "⚠ Needs Attention"}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* ── What's Included Card ── */}
                                <div style={{
                                    background: C.white, borderRadius: "22px",
                                    border: `1px solid ${C.border}`,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                }}>
                                    <div style={{
                                        padding: "26px 30px 22px",
                                        borderBottom: `1px solid ${C.border}`,
                                        display: "flex", alignItems: "center", gap: "11px",
                                    }}>
                                        <div style={{
                                            width: "42px", height: "42px", borderRadius: "12px",
                                            background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px",
                                        }}>📄</div>
                                        <div>
                                            <h4 style={{ fontSize: "19px", fontWeight: "800", color: C.dark, margin: 0 }}>
                                                What's Inside the Full Report
                                            </h4>
                                            <p style={{ fontSize: "13px", color: C.muted, margin: 0, marginTop: "2px" }}>
                                                One $30 unlock gives you everything — instantly
                                            </p>
                                        </div>
                                    </div>

                                    <div style={{ padding: "28px 30px" }}>
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                            {[
                                                { icon: "📋", title: "Complete Service Timeline", desc: `All ${property.records} verified records with full details, dates, and notes` },
                                                { icon: "🏢", title: "Provider Profiles", desc: "License numbers, credentials, and ratings for every contractor" },
                                                { icon: "💰", title: "Full Cost History", desc: "Actual amounts paid for every maintenance event" },
                                                { icon: "🔍", title: "Inspection Reports", desc: "Third-party inspection findings and completion certificates" },
                                                { icon: "📊", title: "Score Breakdown", desc: "Category-level scoring with trend data and comparison benchmarks" },
                                                { icon: "🔄", title: "Maintenance Schedule", desc: "Upcoming service intervals, next-due dates, and system lifespans" },
                                            ].map((item, i) => (
                                                <div key={i} style={{
                                                    background: C.lightBg, border: `1px solid ${C.border}`,
                                                    borderRadius: "14px", padding: "18px 16px",
                                                    display: "flex", gap: "13px", alignItems: "flex-start",
                                                    transition: "all 0.18s",
                                                }}
                                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primaryBorder; e.currentTarget.style.background = C.primarySoft; }}
                                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.lightBg; }}
                                                >
                                                    <div style={{
                                                        width: "40px", height: "40px", borderRadius: "11px",
                                                        background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: "19px", flexShrink: 0,
                                                    }}>{item.icon}</div>
                                                    <div>
                                                        <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark, marginBottom: "4px" }}>{item.title}</div>
                                                        <div style={{ fontSize: "11px", color: C.mid, lineHeight: "1.55" }}>{item.desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ───────── RIGHT SIDEBAR ───────── */}
                            <div className="col-lg-4">
                                <div style={{ position: "sticky", top: "100px", display: "flex", flexDirection: "column", gap: "20px" }}>

                                    {/* ── Health Score Widget ── */}
                                    <div style={{
                                        background: C.white, borderRadius: "22px",
                                        border: `1px solid ${C.border}`,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                    }}>
                                        <div style={{
                                            background: "linear-gradient(145deg,#EEF4FF,#deeafc)",
                                            borderBottom: `1px solid ${C.border}`,
                                            padding: "24px 22px",
                                            textAlign: "center",
                                        }}>
                                            <div style={{ fontSize: "11px", fontWeight: "700", color: C.muted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "18px" }}>
                                                Property Health Score
                                            </div>
                                            <div style={{ display: "inline-block", position: "relative", marginBottom: "14px" }}>
                                                <svg width="128" height="128" viewBox="0 0 128 128">
                                                    <circle cx="64" cy="64" r="52" fill="none" stroke={C.border} strokeWidth="10" />
                                                    <circle cx="64" cy="64" r="52" fill="none"
                                                        stroke={sc} strokeWidth="10"
                                                        strokeLinecap="round"
                                                        strokeDasharray={circumference}
                                                        strokeDashoffset={dashOffset}
                                                        transform="rotate(-90 64 64)" />
                                                    <text x="64" y="59" textAnchor="middle" fill={sc} fontSize="30" fontWeight="900" dominantBaseline="middle">{property.score}</text>
                                                    <text x="64" y="80" textAnchor="middle" fill={C.muted} fontSize="12" fontWeight="600" dominantBaseline="middle">out of 100</text>
                                                </svg>
                                            </div>
                                            <div style={{ fontSize: "18px", fontWeight: "800", color: sc }}>{sl}</div>
                                            <div style={{ fontSize: "12px", color: C.muted, marginTop: "5px" }}>
                                                Based on {property.records} verified records
                                            </div>
                                        </div>
                                        <div style={{ padding: "16px 20px" }}>
                                            {[
                                                { label: "Last Updated", value: property.lastUpdated || "Apr 2025" },
                                                { label: "Data Since", value: `${2025 - (property.yearsOfData || 5)}` },
                                                { label: "Service Providers", value: property.providers || 3 },
                                                { label: "Property ID", value: property.id, mono: true },
                                            ].map((item, i) => (
                                                <div key={i} style={{
                                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                                    padding: "11px 0",
                                                    borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                                                }}>
                                                    <span style={{ fontSize: "13px", color: C.muted }}>{item.label}</span>
                                                    <span style={{
                                                        fontSize: "13px", fontWeight: "700", color: C.dark,
                                                        fontFamily: item.mono ? "monospace" : undefined,
                                                    }}>{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ── Unlock CTA Card ── */}
                                    <div style={{
                                        background: "linear-gradient(145deg,#1563df 0%,#0d4fc4 100%)",
                                        borderRadius: "22px",
                                        overflow: "hidden",
                                        boxShadow: "0 10px 44px rgba(21,99,223,0.38)",
                                        padding: "28px 24px",
                                        position: "relative",
                                    }}>
                                        <div style={{
                                            position: "absolute", top: "-50px", right: "-50px",
                                            width: "200px", height: "200px", borderRadius: "50%",
                                            background: "rgba(255,255,255,0.06)", pointerEvents: "none",
                                        }} />
                                        <div style={{
                                            display: "inline-flex", alignItems: "center", gap: "7px",
                                            background: "rgba(255,255,255,0.12)", borderRadius: "100px",
                                            padding: "5px 14px", marginBottom: "18px",
                                        }}>
                                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#86efac", display: "inline-block" }} />
                                            <span style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", letterSpacing: "0.09em" }}>
                                                Full Report Access
                                            </span>
                                        </div>
                                        <div style={{ fontSize: "42px", fontWeight: "900", color: "#fff", lineHeight: 1, marginBottom: "4px", letterSpacing: "-0.03em" }}>
                                            $30
                                        </div>
                                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
                                            One-time · Instant access · No subscription
                                        </div>
                                        <div style={{ marginBottom: "24px", display: "flex", flexDirection: "column", gap: "11px" }}>
                                            {[
                                                `All ${property.records} verified service records`,
                                                "Provider licenses & credentials",
                                                "Full cost & payment history",
                                                "Health score breakdown by category",
                                                "Upcoming maintenance schedule",
                                            ].map((item, i) => (
                                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                                                    <div style={{
                                                        width: "20px", height: "20px", borderRadius: "50%",
                                                        background: "rgba(255,255,255,0.18)",
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        fontSize: "10px", flexShrink: 0, marginTop: "1px",
                                                    }}>✓</div>
                                                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.5" }}>{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button style={{
                                            width: "100%", padding: "15px",
                                            background: "#ffffff", border: "none", borderRadius: "13px",
                                            color: C.primary, fontWeight: "800", fontSize: "15px",
                                            cursor: "pointer",
                                            boxShadow: "0 4px 22px rgba(0,0,0,0.18)",
                                            marginBottom: "12px", letterSpacing: "-0.01em",
                                            transition: "all 0.15s",
                                        }}
                                            onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 10px 32px rgba(0,0,0,0.24)"; }}
                                            onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 22px rgba(0,0,0,0.18)"; }}
                                        >
                                            Unlock Full Report →
                                        </button>
                                        <button style={{
                                            width: "100%", background: "transparent",
                                            border: "1px solid rgba(255,255,255,0.28)",
                                            borderRadius: "12px", color: "rgba(255,255,255,0.72)",
                                            padding: "11px 20px", fontSize: "13px", fontWeight: "600",
                                            cursor: "pointer", transition: "all 0.15s",
                                        }}
                                            onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.1)"; e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.color = "#fff"; }}
                                            onMouseLeave={(e) => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.28)"; e.target.style.color = "rgba(255,255,255,0.72)"; }}
                                        >
                                            👁️ Preview Sample Report
                                        </button>
                                    </div>

                                    {/* ── Service Categories Card ── */}
                                    <div style={{
                                        background: C.white, borderRadius: "22px",
                                        border: `1px solid ${C.border}`,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                    }}>
                                        <div style={{
                                            padding: "18px 22px",
                                            borderBottom: `1px solid ${C.border}`,
                                        }}>
                                            <h6 style={{ fontSize: "14px", fontWeight: "800", color: C.dark, margin: 0 }}>
                                                Documented Service Categories
                                            </h6>
                                        </div>
                                        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "9px" }}>
                                            {categories.map((tag, i) => {
                                                const tagName = tag.trim();
                                                const cc = catColor(tagName);
                                                return (
                                                    <div key={i} style={{
                                                        display: "flex", alignItems: "center", gap: "12px",
                                                        padding: "12px 14px", borderRadius: "12px",
                                                        background: cc.bg, border: `1px solid ${cc.border}`,
                                                        transition: "all 0.15s",
                                                    }}
                                                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
                                                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
                                                    >
                                                        <span style={{ fontSize: "18px" }}>{catIcon(tagName)}</span>
                                                        <span style={{ fontSize: "13px", fontWeight: "700", color: cc.color, flex: 1 }}>
                                                            {tagName === "Full History" ? "🏆 Full Service History" : tagName}
                                                        </span>
                                                        <span style={{
                                                            fontSize: "10px", fontWeight: "700", color: "#fff",
                                                            background: cc.color, borderRadius: "100px", padding: "3px 9px",
                                                        }}>✓ Verified</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* ── Trust Signals Card ── */}
                                    <div style={{
                                        background: C.white, borderRadius: "22px",
                                        border: `1px solid ${C.border}`,
                                        overflow: "hidden",
                                        boxShadow: "0 4px 28px rgba(21,99,223,0.09)",
                                        padding: "20px 22px",
                                    }}>
                                        <h6 style={{ fontSize: "13px", fontWeight: "800", color: C.dark, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                            Why You Can Trust This Report
                                        </h6>
                                        {[
                                            { icon: "🔐", title: "Tamper-Proof Records", desc: "All entries locked and timestamped on upload" },
                                            { icon: "🏢", title: "Verified Providers", desc: "Every contractor license-checked before approval" },
                                            { icon: "🎯", title: "98% Accuracy Rate", desc: "Cross-verified against municipal records" },
                                        ].map((item, i) => (
                                            <div key={i} style={{
                                                display: "flex", gap: "12px", alignItems: "flex-start",
                                                padding: "10px 0",
                                                borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                                            }}>
                                                <div style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</div>
                                                <div>
                                                    <div style={{ fontSize: "12px", fontWeight: "700", color: C.dark }}>{item.title}</div>
                                                    <div style={{ fontSize: "11px", color: C.muted, marginTop: "2px" }}>{item.desc}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════
                    UNLOCK BANNER
                ════════════════════════════════════════ */}
                <section style={{
                    background: "linear-gradient(135deg,#0b1628 0%,#142240 50%,#0b1628 100%)",
                    padding: "80px 0",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <style>{`
                        @keyframes pdPulse {
                            0%,100% { opacity: 1; box-shadow: 0 0 10px #1563df; }
                            50%      { opacity: 0.5; box-shadow: 0 0 22px #1563df; }
                        }
                    `}</style>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)",
                        backgroundSize: "24px 24px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", top: "-20%", right: "-8%",
                        width: "650px", height: "650px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(21,99,223,0.2) 0%,transparent 65%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-20%", left: "-8%",
                        width: "500px", height: "500px", borderRadius: "50%",
                        background: "radial-gradient(circle,rgba(0,153,204,0.12) 0%,transparent 65%)",
                        pointerEvents: "none",
                    }} />
                    <div className="container" style={{ position: "relative", zIndex: 1 }}>
                        <div style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between", gap: "48px", flexWrap: "wrap",
                        }}>
                            <div style={{ flex: 1, minWidth: "280px" }}>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: "9px",
                                    background: "rgba(21,99,223,0.2)", border: "1px solid rgba(21,99,223,0.4)",
                                    borderRadius: "100px", padding: "6px 17px", marginBottom: "22px",
                                }}>
                                    <span style={{
                                        width: "8px", height: "8px", borderRadius: "50%",
                                        background: "#60a5fa", display: "inline-block",
                                        animation: "pdPulse 2s infinite",
                                    }} />
                                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        Don't Buy Blind
                                    </span>
                                </div>
                                <h2 style={{
                                    fontSize: "clamp(26px, 3.2vw, 44px)", fontWeight: "900",
                                    color: "#ffffff", lineHeight: 1.15,
                                    letterSpacing: "-0.025em", marginBottom: "18px",
                                }}>
                                    Know every detail about<br />
                                    <span style={{
                                        background: "linear-gradient(90deg,#60a5fa,#38bdf8,#06b6d4)",
                                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                    }}>
                                        this property before you offer.
                                    </span>
                                </h2>
                                <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.55)", maxWidth: "520px", lineHeight: "1.75", margin: 0 }}>
                                    A verified service record can reveal undisclosed damage, aging systems, and skipped inspections
                                    — all for less than the cost of a single contractor quote.
                                </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", minWidth: "220px" }}>
                                <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", marginBottom: "4px" }}>Full report for just</div>
                                    <div style={{ fontSize: "60px", fontWeight: "900", color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>$30</div>
                                    <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginTop: "4px" }}>one-time · instant PDF delivery</div>
                                </div>
                                <button style={{
                                    padding: "15px 44px", background: C.primary,
                                    border: "none", borderRadius: "13px", color: "#fff",
                                    fontWeight: "700", fontSize: "16px", cursor: "pointer",
                                    boxShadow: "0 10px 36px rgba(21,99,223,0.55)",
                                    width: "100%", letterSpacing: "-0.01em",
                                    transition: "all 0.15s",
                                }}
                                    onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 16px 44px rgba(21,99,223,0.65)"; }}
                                    onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 10px 36px rgba(21,99,223,0.55)"; }}
                                >
                                    Unlock Full Report →
                                </button>
                                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>
                                    🔒 Secure payment · Instant access · No subscription
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ════════════════════════════════════════
                    SIMILAR PROPERTIES
                ════════════════════════════════════════ */}
                <section style={{ background: C.lightBg, padding: "80px 0 88px" }}>
                    <div className="container">
                        <div style={{ textAlign: "center", marginBottom: "48px" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                                borderRadius: "100px", padding: "6px 18px", marginBottom: "18px",
                            }}>
                                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                                <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                    More Properties
                                </span>
                            </div>
                            <h3 style={{
                                fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: "800",
                                color: C.dark, margin: "0 0 12px", letterSpacing: "-0.02em",
                            }}>
                                Browse More Verified Properties
                            </h3>
                            <p style={{ fontSize: "15px", color: C.mid, margin: 0 }}>
                                Every listing is backed by verified service history. Unlock any report for $30.
                            </p>
                        </div>

                        <div className="row g-4">
                            {similar.map((prop) => (
                                <div key={prop.id} className="col-lg-4 col-md-6">
                                    <Link to={`/property-deatils/${prop.id}`} style={{ textDecoration: "none", display: "block" }}>
                                        <div style={{
                                            background: C.white, borderRadius: "20px",
                                            border: `1px solid ${C.border}`,
                                            overflow: "hidden",
                                            boxShadow: "0 2px 16px rgba(21,99,223,0.07)",
                                            transition: "transform 0.24s, box-shadow 0.24s",
                                        }}
                                            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 18px 44px rgba(21,99,223,0.18)"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(21,99,223,0.07)"; }}
                                        >
                                            <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                                                <img src={prop.img} alt={prop.address} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.35s" }} />
                                                <div style={{
                                                    position: "absolute", top: "14px", left: "14px",
                                                    background: C.primary, color: "#fff",
                                                    borderRadius: "7px", padding: "5px 12px",
                                                    fontSize: "11px", fontWeight: "700",
                                                    boxShadow: "0 2px 10px rgba(21,99,223,0.4)",
                                                }}>✓ Verified</div>
                                                <div style={{
                                                    position: "absolute", bottom: "14px", right: "14px",
                                                    background: "rgba(255,255,255,0.96)",
                                                    borderRadius: "9px", padding: "5px 12px",
                                                    backdropFilter: "blur(8px)",
                                                    display: "flex", alignItems: "center", gap: "6px",
                                                    boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                                                }}>
                                                    <div style={{ width: "9px", height: "9px", borderRadius: "50%", background: scoreColor(prop.score), flexShrink: 0 }} />
                                                    <span style={{ fontSize: "13px", fontWeight: "800", color: scoreColor(prop.score) }}>{prop.score}</span>
                                                </div>
                                            </div>
                                            <div style={{ padding: "18px 20px" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                                                    <span style={{
                                                        background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                                                        color: C.primary, borderRadius: "100px", padding: "3px 11px",
                                                        fontSize: "11px", fontWeight: "700",
                                                    }}>{prop.type}</span>
                                                    <span style={{ fontSize: "12px", color: C.muted, fontWeight: "600" }}>{prop.records} records</span>
                                                </div>
                                                <div style={{ fontSize: "14px", fontWeight: "800", color: C.dark, marginBottom: "5px", lineHeight: "1.3" }}>
                                                    {prop.address}
                                                </div>
                                                <div style={{ fontSize: "12px", color: C.muted, marginBottom: "16px" }}>{prop.tag}</div>
                                                <div style={{
                                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                                    borderTop: `1px solid ${C.border}`, paddingTop: "14px",
                                                }}>
                                                    <span style={{ fontSize: "13px", color: C.mid, fontWeight: "500" }}>
                                                        📋 Full Report
                                                    </span>
                                                    <span style={{ fontSize: "14px", fontWeight: "800", color: C.primary }}>$30 →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div style={{ textAlign: "center", marginTop: "48px" }}>
                            <Link to="/all-properties" style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "13px 32px", borderRadius: "12px",
                                background: C.primary, color: "#fff",
                                fontSize: "15px", fontWeight: "700", textDecoration: "none",
                                boxShadow: "0 8px 24px rgba(21,99,223,0.28)",
                                transition: "all 0.2s",
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(21,99,223,0.38)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(21,99,223,0.28)"; }}
                            >
                                View All Properties
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default PropertyDetails;
