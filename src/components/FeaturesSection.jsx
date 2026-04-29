import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";



const data = [
    {
        image: "/images/features/77-Sunset-Blvd,-Phoenix-AZ.webp",
        address: "142 Maple Avenue, Austin, TX",
        score: 86,
        reportItems: [
            { label: "Year Built", value: "2015" },
            { label: "Lot Size", value: "2,400 sqft" },
            { label: "Value", value: "$450,000" },
            { label: "Condition", value: "Good" },
            { label: "Bedrooms", value: "3" },
            { label: "Bathrooms", value: "2" },
            { label: "Parking", value: "2-car garage" },
            { label: "Neighborhood", value: "Suburban, quiet area" },
        ],
        propertyHealthScore: 86,
        healthDescription: "Good - Minor Updates Needed"
    },
    {
        image: "/images/features/77-Sunset-Blvd,-Phoenix-AZ.webp",
        address: "55 Sunset Blvd, Phoenix, AZ",
        score: 92,
        reportItems: [
            { label: "Year Built", value: "2018" },
            { label: "Lot Size", value: "3,000 sqft" },
            { label: "Value", value: "$520,000" },
            { label: "Condition", value: "Excellent" },
            { label: "Bedrooms", value: "4" },
            { label: "Bathrooms", value: "3" },
            { label: "Parking", value: "3-car garage" },
            { label: "Neighborhood", value: "Urban, near parks and shopping" },
        ],
        propertyHealthScore: 92,
        healthDescription: "Excellent - No Improvements Needed"
    },
    {
        image: "/images/features/77-Sunset-Blvd,-Phoenix-AZ.webp",
        address: "420 Oak Street, San Francisco, CA",
        score: 80,
        reportItems: [
            { label: "Year Built", value: "2000" },
            { label: "Lot Size", value: "1,800 sqft" },
            { label: "Value", value: "$750,000" },
            { label: "Condition", value: "Fair" },
            { label: "Bedrooms", value: "2" },
            { label: "Bathrooms", value: "1" },
            { label: "Parking", value: "Street parking" },
            { label: "Neighborhood", value: "Central, high-traffic area" },
        ],
        propertyHealthScore: 85,
        healthDescription: "Fair - Needs Renovation"
    },
    {
        image: "/images/features/77-Sunset-Blvd,-Phoenix-AZ.webp",
        address: "101 Park Avenue, New York, NY",
        score: 95,
        reportItems: [
            { label: "Year Built", value: "2020" },
            { label: "Lot Size", value: "2,100 sqft" },
            { label: "Value", value: "$1,200,000" },
            { label: "Condition", value: "Brand New" },
            { label: "Bedrooms", value: "3" },
            { label: "Bathrooms", value: "3" },
            { label: "Parking", value: "Private parking garage" },
            { label: "Neighborhood", value: "Luxury, prime location" },
        ],
        propertyHealthScore: 95,
        healthDescription: "Excellent - Brand New Construction"
    }
];
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

// Two rows of listings, scrolling in opposite directions
const row1 = [
    { img: "/images/features/142-Maple-Ave,-Austin-TX.jpg", address: "142 Maple Ave, Austin TX", score: 86, records: 12, price: "$485,000", type: "House", tag: "HVAC · Roofing · Electrical" },
    { img: "/images/features/88-Oak-Street,-Denver-CO.jfif", address: "88 Oak Street, Denver CO", score: 92, records: 18, price: "$372,000", type: "Villa", tag: "Plumbing · Foundation" },
    { img: "/images/features/221-Pine-Rd,-Seattle-WA.webp", address: "221 Pine Rd, Seattle WA", score: 74, records: 8, price: "$621,000", type: "Condo", tag: "HVAC · Pest Control" },
    { img: "/images/features/9-Harbor-Blvd,-Miami-F.webp", address: "9 Harbor Blvd, Miami FL", score: 88, records: 15, price: "$890,000", type: "House", tag: "Roofing · Electrical" },
    { img: "/images/features/33-Elm-Court,-Chicago-IL.jpg", address: "33 Elm Court, Chicago IL", score: 79, records: 10, price: "$310,000", type: "Studio", tag: "Plumbing · HVAC" },
    { img: "/images/features/500-Lakeview-Dr,-Portland-OR.png", address: "500 Lakeview Dr, Portland OR", score: 95, records: 22, price: "$540,000", type: "House", tag: "Full History" },
    { img: "/images/features/14-Birch-Lane,-Nashville-TN.jpeg", address: "14 Birch Lane, Nashville TN", score: 83, records: 14, price: "$425,000", type: "House", tag: "HVAC · Roofing" },
];
const row2 = [
    { img: "/images/features/77-Sunset-Blvd,-Phoenix-AZ.webp", address: "77 Sunset Blvd, Phoenix AZ", score: 90, records: 17, price: "$398,000", type: "Villa", tag: "Electrical · Foundation" },
    { img: "/images/features/3-Willow-Way,-Boston-MA.jpg", address: "3 Willow Way, Boston MA", score: 68, records: 6, price: "$710,000", type: "Condo", tag: "Pest Control · HVAC" },
    { img: "/images/features/19-Cedar-Ave,-San-Diego-CA.jpg", address: "19 Cedar Ave, San Diego CA", score: 94, records: 20, price: "$950,000", type: "House", tag: "Full History" },
    { img: "/images/features/60-Redwood-St,-Las-Vegas-NV.jpeg", address: "60 Redwood St, Las Vegas NV", score: 77, records: 9, price: "$285,000", type: "Studio", tag: "HVAC · Plumbing" },
    { img: "/images/features/28-Magnolia-Dr,-Atlanta-G.jpg", address: "28 Magnolia Dr, Atlanta GA", score: 85, records: 13, price: "$460,000", type: "House", tag: "Roofing · Electrical" },
    { img: "/images/features/101-Spruce-Ln,-Minneapolis-MN.jpg", address: "101 Spruce Ln, Minneapolis MN", score: 81, records: 11, price: "$335,000", type: "House", tag: "Foundation · HVAC" },
    { img: "/images/features/57-Aspen-Ct,-Salt-Lake-City-UT.png", address: "57 Aspen Ct, Salt Lake City UT", score: 89, records: 16, price: "$512,000", type: "Villa", tag: "Plumbing · Roofing" },
];

const scoreColor = (s) => s >= 90 ? "#16A34A" : s >= 75 ? "#1563df" : "#D97706";

const ListingCard = ({ p }) => (
    <div style={{
        width: "260px", flexShrink: 0, borderRadius: "16px",
        overflow: "hidden", border: `1px solid ${C.border}`,
        background: C.white, boxShadow: "0 2px 14px rgba(21,99,223,0.07)",
        cursor: "pointer", transition: "transform 0.22s, box-shadow 0.22s",
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
                <button style={{
                    padding: "6px 14px", background: C.primarySoft,
                    border: `1px solid ${C.primaryBorder}`,
                    borderRadius: "8px", fontSize: "12px",
                    fontWeight: "700", color: C.primary, cursor: "pointer",
                    transition: "all 0.15s",
                }}
                    onMouseEnter={(e) => { e.target.style.background = C.primary; e.target.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.target.style.background = C.primarySoft; e.target.style.color = C.primary; }}
                >
                    Unlock $30
                </button>
            </div>
        </div>
    </div>
);

const reportItems = [
    { label: "Service Records", value: "12 verified" },
    { label: "Last Inspection", value: "Mar 2024" },
    { label: "Property Health Score", value: "86 / 100" },
    { label: "Years of Data", value: "7 years" },
    { label: "Active Providers", value: "4 companies" },
    { label: "Report Access", value: "$30 one-time" },
];

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
                        Every listing has a verified service history. Pay once to unlock the full report.
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

            {/* ── Report Value Highlight ── */}
            <div className="container" style={{ position: "relative", zIndex: 1, padding: "72px 12px 80px", }}>
                <div style={{ position: "relative" }}>
                    {/* Left and Right Navigation Arrows */}
                    <button
                        className="prev-btn"
                        style={arrowStyle("left")}
                    >
                        ←
                    </button>
                    <button
                        className="next-btn"
                        style={arrowStyle("right")}
                    >
                        →
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".next-btn",
                            prevEl: ".prev-btn"
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        loop
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
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
                                            alt=""
                                            style={{ width: "100%", height: "100%", objectFit: "fill" }}
                                        />
                                    </div>

                                    {/* Right Content */}
                                    <div style={{
                                        background: C.white,
                                        padding: "36px 36px 32px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center"
                                    }}>

                                        {/* Header */}
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            marginBottom: "20px"
                                        }}>
                                            <div>
                                                <div style={{
                                                    fontSize: "11px",
                                                    color: C.muted,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.1em",
                                                    marginBottom: "4px"
                                                }}>
                                                    Property Intelligence Report
                                                </div>

                                                <div style={{
                                                    fontSize: "15px",
                                                    fontWeight: "700",
                                                    color: C.dark
                                                }}>
                                                    {item.address}
                                                </div>
                                            </div>

                                            <div style={{
                                                background: C.primaryLight,
                                                border: `1px solid ${C.primaryBorder}`,
                                                borderRadius: "8px",
                                                padding: "5px 12px",
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                color: C.primary
                                            }}>
                                                ✓ VERIFIED
                                            </div>
                                        </div>

                                        {/* GRID ITEMS */}
                                        <div style={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "8px",
                                            marginBottom: "20px"
                                        }}>
                                            {item.reportItems.map((rep, i) => (
                                                <div key={i} style={{
                                                    padding: "12px 14px",
                                                    borderRadius: "10px",
                                                    background: C.bg,
                                                    border: `1px solid ${C.border}`
                                                }}>
                                                    <div style={{
                                                        fontSize: "11px",
                                                        color: C.muted,
                                                        textTransform: "uppercase",
                                                        marginBottom: "4px"
                                                    }}>
                                                        {rep.label}
                                                    </div>

                                                    <div style={{
                                                        fontSize: "15px",
                                                        fontWeight: "800",
                                                        color: i === 2 ? C.primary : C.dark
                                                    }}>
                                                        {rep.value}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* SCORE */}
                                        <div style={{
                                            background: C.bg,
                                            borderRadius: "12px",
                                            border: `1px solid ${C.border}`,
                                            padding: "14px 16px"
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginBottom: "8px"
                                            }}>
                                                <span style={{ fontSize: "12px", fontWeight: "600" }}>
                                                    Property Health Score
                                                </span>

                                                <span style={{
                                                    fontSize: "14px",
                                                    fontWeight: "800",
                                                    color: C.primary
                                                }}>
                                                    {item.propertyHealthScore} / 100
                                                </span>
                                            </div>

                                            <div style={{
                                                height: "8px",
                                                borderRadius: "100px",
                                                background: C.border,
                                                overflow: "hidden"
                                            }}>
                                                <div style={{
                                                    height: "100%",
                                                    width: `${item.propertyHealthScore}%`,
                                                    background: `linear-gradient(90deg, ${C.primary}, #0099CC)`
                                                }} />
                                            </div>
                                        </div>

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
