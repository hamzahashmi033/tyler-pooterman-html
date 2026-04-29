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
};

const TOOLS = [
    {
        icon: "📋", tag: "Core Tool", title: "Service Record Logger",
        desc: "Submit verified service records directly to any property profile. Every job you complete builds a permanent, trusted record attached to the address.",
        features: ["One-click record submission", "Category & cost tracking", "Attach photos & invoices", "Auto-attached to property"],
        link: "/providers/service-logging", cta: "Log a Record",
    },
    {
        icon: "🏆", tag: "Reputation", title: "Verified Digital Portfolio",
        desc: "Every record you log contributes to your verified provider profile. Homeowners and buyers can see your full work history across all properties.",
        features: ["Verified provider badge", "Work history across properties", "Star rating from homeowners", "Share profile link"],
        link: null, cta: "Coming Soon",
    },
    {
        icon: "📊", tag: "Analytics", title: "Performance Dashboard",
        desc: "Track your submitted records, view your property coverage, monitor engagement from buyers and homeowners viewing your work.",
        features: ["Records submitted chart", "Properties covered map", "Report view analytics", "Monthly job summary"],
        link: "/dashboard", cta: "Open Dashboard",
    },
    {
        icon: "🔗", tag: "Sharing", title: "QR Property Links",
        desc: "Generate a scannable QR code for any property you've serviced. Leave it with the homeowner so they can instantly access their property's report.",
        features: ["Instant QR generation", "Printable PDF output", "Links to property report", "Branded with your logo"],
        link: null, cta: "Coming Soon",
    },
    {
        icon: "🛡️", tag: "Trust", title: "License Verification",
        desc: "Connect your contractor license to your provider profile. Verified licenses are displayed on every record you submit — building buyer confidence.",
        features: ["State license validation", "Insurance certificate upload", "Verified badge on all records", "Annual re-verification"],
        link: null, cta: "Coming Soon",
    },
    {
        icon: "📣", tag: "Growth", title: "Lead Generation",
        desc: "Homeowners browsing their property's verified history can contact you directly for future jobs. Your past work becomes your best referral.",
        features: ["In-app contact requests", "Job opportunity alerts", "Neighborhood targeting", "Booking integration"],
        link: null, cta: "Coming Soon",
    },
];

const STEPS = [
    { num: "01", icon: "🔍", title: "Find the Property", desc: "Search any address to pull up its property profile. Any property in our database can receive a verified service record." },
    { num: "02", icon: "📝", title: "Log Your Work", desc: "Fill in service category, details, date, cost, and notes. Attach receipts or photos to strengthen the record." },
    { num: "03", icon: "✅", title: "Record Goes Live", desc: "Your record is instantly attached to the property's verified history and visible on its health report." },
    { num: "04", icon: "🏅", title: "Build Your Reputation", desc: "Every logged job adds to your provider portfolio — visible to future buyers, agents, and homeowners." },
];

export default function ToolsOverview() {
    const [activeDemo, setActiveDemo] = useState(0);
    const demoProperty = PROPERTIES[activeDemo % PROPERTIES.length];

    return (
        <div id="wrapper"><div id="pagee" className="clearfix">
            <Header />

            {/* Hero */}
            <section style={{ background: "linear-gradient(135deg, #0b1628 0%, #1a2a4a 100%)", padding: "90px 0 70px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(21,99,223,0.2) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div className="container" style={{ position: "relative", zIndex: 1 }}>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "100px", padding: "6px 18px", marginBottom: "24px" }}>
                                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#60a5fa", display: "inline-block" }} />
                                <span style={{ fontSize: "12px", fontWeight: "600", color: "#93c5fd", textTransform: "uppercase", letterSpacing: "0.08em" }}>Provider Tools</span>
                            </div>
                            <h1 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: "900", color: "#fff", marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: "1.1" }}>
                                Everything You Need to Build a{" "}
                                <span style={{ background: "linear-gradient(90deg, #60a5fa, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                    Verified Reputation
                                </span>
                            </h1>
                            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: "1.75", marginBottom: "36px", maxWidth: "480px" }}>
                                Property History Pro gives service professionals the tools to document work, build trust, and get discovered — all tied to the properties you service.
                            </p>
                            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                                <Link to="/providers/service-logging" style={{ padding: "14px 28px", background: C.primary, color: "#fff", borderRadius: "12px", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxShadow: "0 6px 20px rgba(21,99,223,0.5)" }}>
                                    Start Logging Records →
                                </Link>
                                <a href="#tools" style={{ padding: "14px 28px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "12px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}>
                                    Explore Tools
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-6" style={{ paddingTop: "30px" }}>
                            {/* Live record preview */}
                            <div style={{ background: C.white, borderRadius: "20px", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
                                <div style={{ background: "linear-gradient(135deg, #EEF4FF, #deeafc)", padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <div style={{ fontSize: "11px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Provider Record Preview</div>
                                        <div style={{ fontSize: "14px", fontWeight: "800", color: C.dark }}>CoolAir Pro Austin</div>
                                    </div>
                                    <div style={{ background: C.green, color: "#fff", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", fontWeight: "700" }}>✓ Verified</div>
                                </div>
                                <div style={{ padding: "16px 20px" }}>
                                    {demoProperty.timeline.slice(0, 3).map((item, i) => (
                                        <div key={i} style={{ display: "flex", gap: "12px", padding: "10px 12px", background: i % 2 === 0 ? C.bg : C.white, borderRadius: "10px", marginBottom: "8px" }}>
                                            <div style={{ fontSize: "20px", flexShrink: 0 }}>{item.icon}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{item.service}</div>
                                                <div style={{ fontSize: "11px", color: C.muted }}>{item.provider} · {item.date} · {item.cost}</div>
                                            </div>
                                            <div style={{ fontSize: "10px", color: C.green, fontWeight: "700", alignSelf: "center" }}>✓</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: "12px 20px", background: C.bg, borderTop: `1px solid ${C.border}`, display: "flex", gap: "8px" }}>
                                    {PROPERTIES.slice(0, 4).map((p, i) => (
                                        <button key={i} onClick={() => setActiveDemo(i)}
                                            style={{ width: "32px", height: "32px", borderRadius: "50%", border: `2px solid ${i === activeDemo ? C.primary : C.border}`, overflow: "hidden", padding: 0, cursor: "pointer", background: "none" }}>
                                            <img src={p.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        </button>
                                    ))}
                                    <span style={{ fontSize: "12px", color: C.muted, alignSelf: "center", marginLeft: "4px" }}>Switch property →</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats strip */}
            <section style={{ background: C.white, borderBottom: `1px solid ${C.border}` }}>
                <div className="container">
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
                        {[["4,800+", "Active Providers"], ["280K+", "Records Logged"], ["50K+", "Properties Covered"], ["98%", "Verification Rate"]].map(([v, l], i, arr) => (
                            <div key={l} style={{ padding: "28px 24px", textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${C.border}` : "none" }}>
                                <div style={{ fontSize: "30px", fontWeight: "900", color: C.primary, letterSpacing: "-0.02em" }}>{v}</div>
                                <div style={{ fontSize: "13px", color: C.mid, marginTop: "4px" }}>{l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section style={{ background: C.bg, padding: "80px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "52px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "16px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                            <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>How It Works</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: "800", color: C.dark, letterSpacing: "-0.02em", margin: 0 }}>Four steps from job done to reputation built</h2>
                    </div>
                    <div className="row g-4">
                        {STEPS.map((s, i) => (
                            <div key={i} className="col-lg-3 col-md-6">
                                <div style={{ background: C.white, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "28px 24px", height: "100%", position: "relative" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                        <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{s.icon}</div>
                                        <div style={{ fontSize: "32px", fontWeight: "900", color: C.primaryLight, WebkitTextStroke: `1.5px ${C.primaryBorder}` }}>{s.num}</div>
                                    </div>
                                    <h5 style={{ fontSize: "16px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>{s.title}</h5>
                                    <p style={{ fontSize: "13px", color: C.mid, lineHeight: "1.7", margin: 0 }}>{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools grid */}
            <section id="tools" style={{ background: C.white, padding: "80px 0" }}>
                <div className="container">
                    <div style={{ textAlign: "center", marginBottom: "52px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "100px", padding: "6px 18px", marginBottom: "16px" }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                            <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>All Tools</span>
                        </div>
                        <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: "800", color: C.dark, letterSpacing: "-0.02em" }}>Everything in your provider toolkit</h2>
                    </div>
                    <div className="row g-4">
                        {TOOLS.map((tool, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                                <div style={{ background: C.bg, borderRadius: "18px", border: `1px solid ${C.border}`, padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                                        <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: C.primarySoft, border: `1px solid ${C.primaryBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{tool.icon}</div>
                                        <span style={{ padding: "4px 12px", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, borderRadius: "100px", fontSize: "11px", fontWeight: "600", color: C.primary }}>{tool.tag}</span>
                                    </div>
                                    <h5 style={{ fontSize: "17px", fontWeight: "800", color: C.dark, marginBottom: "8px" }}>{tool.title}</h5>
                                    <p style={{ fontSize: "13px", color: C.mid, lineHeight: "1.7", marginBottom: "16px", flex: 1 }}>{tool.desc}</p>
                                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px" }}>
                                        {tool.features.map((f, j) => (
                                            <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 0", fontSize: "12px", color: C.mid }}>
                                                <span style={{ width: "16px", height: "16px", borderRadius: "50%", background: C.primaryLight, border: `1px solid ${C.primaryBorder}`, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: C.primary, flexShrink: 0 }}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    {tool.link ? (
                                        <Link to={tool.link} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: C.primary, color: "#fff", borderRadius: "10px", fontWeight: "700", fontSize: "13px", textDecoration: "none", boxShadow: "0 4px 14px rgba(21,99,223,0.3)" }}>
                                            {tool.cta} →
                                        </Link>
                                    ) : (
                                        <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", background: C.border, color: C.muted, borderRadius: "10px", fontWeight: "700", fontSize: "13px" }}>
                                            {tool.cta}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section style={{ background: "linear-gradient(135deg, #1563df, #0099CC)", padding: "72px 0" }}>
                <div className="container" style={{ textAlign: "center" }}>
                    <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: "900", color: "#fff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
                        Ready to start building your verified portfolio?
                    </h2>
                    <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", marginBottom: "32px" }}>
                        Log your first service record in under 3 minutes — no setup required.
                    </p>
                    <Link to="/providers/service-logging" style={{ display: "inline-flex", alignItems: "center", padding: "15px 34px", background: "#fff", color: C.primary, borderRadius: "12px", fontWeight: "800", fontSize: "15px", textDecoration: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>
                        Log Your First Record →
                    </Link>
                </div>
            </section>

            <Footer />
        </div></div>
    );
}
