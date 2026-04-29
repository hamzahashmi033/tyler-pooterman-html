import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { PROPERTIES } from "../data/properties";

const row1 = PROPERTIES.slice(0, 7);
const row2 = [...PROPERTIES.slice(7), ...PROPERTIES.slice(0, 2)];

const swiperData = PROPERTIES.slice(0, 4).map((p) => ({
    id: p.id,
    image: p.img,
    address: p.address,
    score: p.score,
    reportItems: [
        { label: "Year Built", value: String(p.yearBuilt) },
        { label: "Area", value: `${p.sqft.toLocaleString()} sqft` },
        { label: "Price", value: p.price },
        { label: "Bedrooms", value: String(p.beds) },
        { label: "Bathrooms", value: String(p.baths) },
        { label: "Type", value: p.type },
        { label: "Records", value: `${p.records} verified` },
        { label: "History", value: `${p.yearsOfData} yrs` },
    ],
    propertyHealthScore: p.score,
    healthDescription:
        p.score >= 90 ? "Excellent" : p.score >= 80 ? "Good" : "Fair",
}));

// Arrow Style (clean + overlay)
const arrowStyle = (position) => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [position]: "-40px",
    zIndex: 10,
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});


const C = {
    bg: "#f3f7fd",
    white: "#ffffff",
    primary: "#1563df",
    primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.18)",
    primarySoft: "#EEF4FF",
    dark: "#161E2D",
    mid: "#4A5568",
    muted: "#8FA3BF",
    border: "#D8E6F7",
};

const stats = [
    { value: "50K+", label: "Properties Tracked", icon: "🏠" },
    { value: "280K+", label: "Verified Records", icon: "✅" },
    { value: "4,800+", label: "Service Providers", icon: "🛠️" },
    { value: "98%", label: "Verification Accuracy", icon: "🎯" },
];

const features = [
    { icon: "🔐", tag: "Data Integrity", title: "Tamper-Proof Verification", desc: "Every service record is validated by the provider and locked to the property profile — no alterations, no fakes, no ambiguity." },
    { icon: "📅", tag: "Core Feature", title: "Full Property Timeline", desc: "A chronological, structured audit trail of every maintenance event — from day one of ownership to the present day." },
    { icon: "🔑", tag: "Homeowner", title: "Owner Access Control", desc: "Claim your property, decide what gets shared and with whom. You stay in control of your data at every step." },
    { icon: "📊", tag: "Buyer Intelligence", title: "Property Health Score", desc: "A single trust score derived from the depth, recency, and quality of verified service records — like a credit score for homes." },
    { icon: "🛠️", tag: "Service Provider", title: "Provider Dashboard", desc: "A powerful SaaS toolset for service professionals to upload records, manage properties, and grow their verified reputation." },
    { icon: "🔓", tag: "Pay Per Report", title: "On-Demand Report Unlock", desc: "Buyers and agents pay a one-time fee to unlock the full verified report for any property — complete history, no subscription." },
];

const scoreColor = (s) => s >= 90 ? "#16A34A" : s >= 75 ? "#1563df" : "#D97706";

const ListingCard = ({ p }) => (
    <Link
        to={`/property-deatils/${p.id}`}
        style={{
            width: "260px", flexShrink: 0, borderRadius: "16px",
            overflow: "hidden", border: `1px solid ${C.border}`,
            background: C.white, boxShadow: "0 2px 14px rgba(21,99,223,0.07)",
            cursor: "pointer", transition: "transform 0.22s, box-shadow 0.22s",
            display: "block", textDecoration: "none", color: "inherit",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(21,99,223,0.16)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 14px rgba(21,99,223,0.07)"; }}
    >
        {/* Image */}
        <div style={{ position: "relative", height: "148px", overflow: "hidden" }}>
            <img src={p.img} alt={p.address}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

            {/* Top overlays */}
            <div style={{ position: "absolute", top: "10px", left: "10px", right: "10px", display: "flex", justifyContent: "space-between" }}>
                <span style={{
                    background: "rgba(255,255,255,0.92)", borderRadius: "6px",
                    padding: "3px 9px", fontSize: "11px", fontWeight: "700",
                    color: C.dark, backdropFilter: "blur(4px)",
                }}>
                    {p.type}
                </span>
                <span style={{
                    background: C.primary, borderRadius: "6px",
                    padding: "3px 9px", fontSize: "10px",
                    fontWeight: "700", color: "#fff",
                    boxShadow: "0 2px 6px rgba(21,99,223,0.4)",
                }}>
                    ✓ Verified
                </span>
            </div>

            {/* Score badge */}
            <div style={{
                position: "absolute", bottom: "10px", right: "10px",
                background: "rgba(255,255,255,0.95)",
                borderRadius: "8px", padding: "4px 10px",
                backdropFilter: "blur(6px)",
                display: "flex", alignItems: "center", gap: "5px",
            }}>
                <div style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: scoreColor(p.score),
                }} />
                <span style={{ fontSize: "12px", fontWeight: "800", color: scoreColor(p.score) }}>
                    {p.score}
                </span>
            </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
            <div style={{
                fontSize: "13px", fontWeight: "700", color: C.dark,
                marginBottom: "4px", whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis",
            }}>
                {p.address}
            </div>

            <div style={{
                fontSize: "11px", color: C.muted, marginBottom: "10px",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
                {p.tag}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                    <div style={{ fontSize: "10px", color: C.muted }}>Records</div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: C.dark }}>{p.records} verified</div>
                </div>
                <div style={{
                    padding: "6px 14px", background: C.primarySoft,
                    border: `1px solid ${C.primaryBorder}`,
                    borderRadius: "8px", fontSize: "12px",
                    fontWeight: "700", color: C.primary,
                }}>
                    View Report →
                </div>
            </div>
        </div>
    </Link>
);

const FeaturesSection = () => {
    return (
        <section style={{ background: C.white, padding: "90px 0 0", position: "relative", overflow: "hidden" }}>

            {/* Top bg gradient */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "340px",
                background: `linear-gradient(180deg, ${C.bg} 0%, ${C.white} 100%)`,
                pointerEvents: "none",
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1 }}>

                {/* ── Stats Strip ── */}
                <div data-stagger style={{
                    background: C.white, borderRadius: "20px",
                    border: `1px solid ${C.border}`,
                    boxShadow: `0 4px 32px rgba(21,99,223,0.08)`,
                    marginBottom: "72px", overflow: "hidden",
                    display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            padding: "28px 24px", display: "flex", alignItems: "center", gap: "16px",
                            borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
                            transition: "background 0.2s",
                        }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = C.bg)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = C.white)}
                        >
                            <div style={{
                                width: "48px", height: "48px", borderRadius: "14px",
                                background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: "22px", flexShrink: 0,
                            }}>
                                {s.icon}
                            </div>
                            <div>
                                <div style={{ fontSize: "28px", fontWeight: "900", color: C.primary, lineHeight: 1, letterSpacing: "-0.02em" }}>
                                    {s.value}
                                </div>
                                <div style={{ fontSize: "13px", color: C.mid, marginTop: "4px" }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Section Header ── */}
                <div data-animate="up" style={{ textAlign: "center", marginBottom: "56px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                        borderRadius: "100px", padding: "6px 18px", marginBottom: "20px",
                    }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Platform Capabilities
                        </span>
                    </div>
                    <h2 style={{
                        fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: "800",
                        color: C.dark, lineHeight: "1.2", marginBottom: "16px", letterSpacing: "-0.02em",
                    }}>
                        Everything Built Around{" "}
                        <span style={{
                            background: `linear-gradient(90deg, ${C.primary}, #0099CC)`,
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Property Trust
                        </span>
                    </h2>
                    <p style={{ fontSize: "17px", color: C.mid, maxWidth: "560px", margin: "0 auto", lineHeight: "1.7" }}>
                        Six core capabilities that make property data verified, accessible,
                        and valuable — for every role in the transaction.
                    </p>
                </div>

                {/* ── Feature Cards Grid ── */}
                <div data-stagger className="row g-4" style={{ marginBottom: "72px" }}>
                    {features.map((f, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <div style={{
                                background: C.white, borderRadius: "18px",
                                border: `1px solid ${C.border}`, padding: "28px 26px",
                                height: "100%", transition: "all 0.25s", cursor: "default",
                                boxShadow: "0 2px 12px rgba(21,99,223,0.05)",
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.primaryBorder; e.currentTarget.style.background = C.primarySoft; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(21,99,223,0.13)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.white; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(21,99,223,0.05)"; }}
                            >
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                                    <div style={{
                                        width: "52px", height: "52px", borderRadius: "14px",
                                        background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
                                    }}>
                                        {f.icon}
                                    </div>
                                    <span style={{
                                        padding: "4px 12px", background: C.primaryLight,
                                        border: `1px solid ${C.primaryBorder}`, borderRadius: "100px",
                                        fontSize: "11px", fontWeight: "600", color: C.primary,
                                    }}>
                                        {f.tag}
                                    </span>
                                </div>
                                <h5 style={{ fontSize: "17px", fontWeight: "800", color: C.dark, marginBottom: "10px", lineHeight: "1.3" }}>
                                    {f.title}
                                </h5>
                                <p style={{ fontSize: "14px", color: C.mid, lineHeight: "1.7", margin: 0 }}>
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: "center", marginBottom: "72px" }}>
                    <Link
                        to="/all-services"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px 28px",
                            borderRadius: "10px",
                            border: `1px solid ${C.primaryBorder}`,
                            background: C.primary,
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "700",
                            textDecoration: "none",
                            boxShadow: "0 8px 20px rgba(21,99,223,0.25)",
                            transition: "all 0.2s",
                        }}
                    >
                        View All Services
                    </Link>
                </div>
            </div>

            {/* ── Listings Carousel (full bleed) ── */}
            <div style={{
                background: C.bg,
                borderTop: `1px solid ${C.border}`,
                borderBottom: `1px solid ${C.border}`,
                padding: "52px 0 56px",
                overflow: "hidden",
            }}>
                {/* Section label */}
                <div style={{ textAlign: "center", marginBottom: "36px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                        borderRadius: "100px", padding: "6px 18px", marginBottom: "16px",
                    }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Live Property Listings
                        </span>
                    </div>
                    <h3 style={{
                        fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: "800",
                        color: C.dark, margin: 0, letterSpacing: "-0.01em",
                    }}>
                        Verified Properties — Browse & Unlock Reports
                    </h3>
                    <p style={{ fontSize: "15px", color: C.mid, marginTop: "10px", lineHeight: "1.6" }}>
                        Every listing has a verified service history. Click any card to view the full report.
                    </p>
                </div>

                {/* Row 1 — scrolls left */}
                <div style={{ position: "relative", overflow: "hidden", marginBottom: "16px" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to right, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to left, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                    <div style={{
                        display: "flex", gap: "16px", width: "max-content",
                        animation: "scrollLeft 36s linear infinite",
                        paddingLeft: "16px",
                    }}>
                        {[...row1, ...row1].map((p, i) => <ListingCard key={i} p={p} />)}
                    </div>
                </div>

                {/* Row 2 — scrolls right */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to right, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                    <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "100px", background: `linear-gradient(to left, ${C.bg}, transparent)`, zIndex: 2, pointerEvents: "none" }} />
                    <div style={{
                        display: "flex", gap: "16px", width: "max-content",
                        animation: "scrollRight 40s linear infinite",
                        paddingLeft: "16px",
                    }}>
                        {[...row2, ...row2].map((p, i) => <ListingCard key={i} p={p} />)}
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "34px" }}>
                    <Link
                        to="/all-properties"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            padding: "12px 28px",
                            borderRadius: "10px",
                            border: `1px solid ${C.primaryBorder}`,
                            background: C.primary,
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: "700",
                            textDecoration: "none",
                            boxShadow: "0 8px 20px rgba(21,99,223,0.25)",
                            transition: "all 0.2s",
                        }}
                    >
                        View All Properties
                    </Link>
                </div>
            </div>

            {/* ── Report Value Highlight (Swiper) ── */}
            <div className="container" style={{ position: "relative", zIndex: 1, padding: "72px 12px 80px" }}>
                <div style={{ position: "relative" }}>
                    <button className="prev-btn" style={arrowStyle("left")}>←</button>
                    <button className="next-btn" style={arrowStyle("right")}>→</button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop
                    >
                        {swiperData.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div style={{
                                    borderRadius: "24px",
                                    overflow: "hidden",
                                    border: `1px solid ${C.primaryBorder}`,
                                    boxShadow: `0 8px 40px rgba(21,99,223,0.10)`,
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr",
                                }}>
                                    {/* Left Image */}
                                    <div>
                                        <img
                                            src={item.image}
                                            alt={item.address}
                                            style={{ width: "100%", height: "100%", objectFit: "fill" }}
                                        />
                                    </div>

                                    {/* Right Content */}
                                    <div style={{
                                        background: C.white,
                                        padding: "36px 36px 32px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}>
                                        {/* Header */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "20px",
                                        }}>
                                            <div>
                                                <div style={{
                                                    fontSize: "11px", color: C.muted,
                                                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px",
                                                }}>
                                                    Property Intelligence Report
                                                </div>
                                                <div style={{ fontSize: "15px", fontWeight: "700", color: C.dark }}>
                                                    {item.address}
                                                </div>
                                            </div>
                                            <div style={{
                                                background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                                                borderRadius: "8px", padding: "5px 12px",
                                                fontSize: "12px", fontWeight: "700", color: C.primary,
                                            }}>
                                                ✓ VERIFIED
                                            </div>
                                        </div>

                                        {/* Grid Items */}
                                        <div style={{
                                            display: "grid", gridTemplateColumns: "1fr 1fr",
                                            gap: "8px", marginBottom: "20px",
                                        }}>
                                            {item.reportItems.map((rep, i) => (
                                                <div key={i} style={{
                                                    padding: "12px 14px", borderRadius: "10px",
                                                    background: C.bg, border: `1px solid ${C.border}`,
                                                }}>
                                                    <div style={{
                                                        fontSize: "11px", color: C.muted,
                                                        textTransform: "uppercase", marginBottom: "4px",
                                                    }}>
                                                        {rep.label}
                                                    </div>
                                                    <div style={{
                                                        fontSize: "15px", fontWeight: "800",
                                                        color: i === 2 ? C.primary : C.dark,
                                                    }}>
                                                        {rep.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Score bar */}
                                        <div style={{
                                            background: C.bg, borderRadius: "12px",
                                            border: `1px solid ${C.border}`, padding: "14px 16px",
                                            marginBottom: "16px",
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                                <span style={{ fontSize: "12px", fontWeight: "600" }}>Property Health Score</span>
                                                <span style={{ fontSize: "14px", fontWeight: "800", color: C.primary }}>
                                                    {item.propertyHealthScore} / 100
                                                </span>
                                            </div>
                                            <div style={{ height: "8px", borderRadius: "100px", background: C.border, overflow: "hidden" }}>
                                                <div style={{
                                                    height: "100%", width: `${item.propertyHealthScore}%`,
                                                    background: `linear-gradient(90deg, ${C.primary}, #0099CC)`,
                                                }} />
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <Link
                                            to={`/property-deatils/${item.id}`}
                                            style={{
                                                display: "inline-flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "12px 20px",
                                                background: C.primary,
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: "10px",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                                textDecoration: "none",
                                                boxShadow: "0 4px 16px rgba(21,99,223,0.3)",
                                            }}
                                        >
                                            View Full Report →
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <style>{`
                @keyframes scrollLeft {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes scrollRight {
                    0%   { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default FeaturesSection;
