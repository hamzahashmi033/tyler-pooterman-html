import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { playHeroEntrance } from "../animations";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "swiper/css";
import "swiper/css/navigation";
import { PROPERTIES } from "../data/properties";

const C = {
    bg: "#0b1628",
    primary: "#1563df",
    primaryLight: "rgba(21,99,223,0.22)",
    primaryBorder: "rgba(21,99,223,0.45)",
    primarySoft: "rgba(21,99,223,0.18)",
    white: "#ffffff",
    textHigh: "#ffffff",
    textMid: "rgba(255,255,255,0.65)",
    textLow: "rgba(255,255,255,0.38)",
    border: "rgba(255,255,255,0.10)",
    borderStrong: "rgba(255,255,255,0.16)",
    glassCard: "rgba(255,255,255,0.05)",
    glassInput: "rgba(255,255,255,0.07)",
    // kept for the white report card on the right
    lightBg: "#f3f7fd",
    lightBorder: "#D8E6F7",
    lightMid: "#4A5568",
    lightMuted: "#8FA3BF",
    lightDark: "#161E2D",
    lightSoft: "#EEF4FF",
    lightSoftBdr: "rgba(21,99,223,0.18)",
};

const heroProperties = [
    { img: "/images/banner/banner-property-1.jpg", address: "142 Maple Ave, Austin TX", score: 86 },
    { img: "/images/banner/banner-property-2.jpg", address: "88 Oak Street, Denver CO", score: 92 },
    { img: "/images/banner/banner-property-3.jpg", address: "221 Pine Rd, Seattle WA", score: 74 },
    { img: "/images/banner/banner-property-4.jpg", address: "9 Harbor Blvd, Miami FL", score: 88 },
    { img: "/images/banner/banner-property-5.jpg", address: "33 Elm Court, Chicago IL", score: 79 },
    { img: "/images/banner/banner-property-6.jpg", address: "500 Lakeview Dr, Portland OR", score: 95 },
];

const scoreColor = (s) => s >= 90 ? "#22c55e" : s >= 80 ? "#3b82f6" : "#f59e0b";

const HeroSection = () => {
    const [activeTab, setActiveTab] = useState("search");
    const [searchValue, setSearchValue] = useState("");




    const data = PROPERTIES.slice(0, 4).map((p) => ({
        id: p.id,
        image: p.img,
        address: p.address,
        score: p.score,
        basedOn: `Based on ${p.records} verified service records`,
        updated: p.lastUpdated,
        price: 30,
        timeline: p.timeline.slice(0, 2),
    }));



// Arrow Style (clean + overlay)
const arrowStyle = (position) => ({
  position: "absolute",
  top: "55%",
  transform: "translateY(-50%)",
  [position]: "-20px",
  zIndex: 10,
  background: "#fff",
  border: "1px solid #ddd",
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
});



    const timelineItems = [
        { icon: "🔧", service: "HVAC Full Service", provider: "CoolAir Pro", date: "Mar 2024" },
        { icon: "⚡", service: "Electrical Panel Upgrade", provider: "WireRight LLC", date: "Nov 2023" },
        // { icon: "🏠", service: "Roof Inspection & Repair", provider: "TopGuard Roofing", date: "Jun 2023" },
        // { icon: "💧", service: "Plumbing System Check", provider: "FlowMaster Plumbing", date: "Jan 2023" },
    ];

    const stats = [
        { value: "50K+", label: "Properties Tracked" },
        { value: "280K+", label: "Verified Records" },
        { value: "4,800+", label: "Service Providers" },
    ];

    const roles = [
        { icon: "🏡", label: "Homeowner", desc: "Manage your property history" },
        { icon: "🔍", label: "Buyer / Agent", desc: "Unlock full property reports" },
        { icon: "🛠️", label: "Service Provider", desc: "Log & manage your work" },
    ];


    const strip = [...heroProperties, ...heroProperties];

    useEffect(() => {
        const tl = playHeroEntrance();
        return () => tl.kill();
    }, []);



    return (
        <section style={{
            background: C.bg,
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: "50px",
            paddingBottom: "0px",
        }}>
            <style>{`
                @keyframes heroPulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 10px #1563df; }
                    50%       { opacity: 0.5; box-shadow: 0 0 22px #1563df; }
                }
                @keyframes heroScroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes heroAurora {
                    0%, 100% { opacity: 0.55; transform: scale(1) translateY(0); }
                    50%      { opacity: 0.75; transform: scale(1.08) translateY(-20px); }
                }
                .hero-tag:hover {
                    background: rgba(21,99,223,0.35) !important;
                    border-color: rgba(21,99,223,0.7) !important;
                    color: #fff !important;
                }
                .hero-role-card:hover {
                    background: rgba(21,99,223,0.2) !important;
                    border-color: rgba(21,99,223,0.5) !important;
                    transform: translateY(-3px) !important;
                    box-shadow: 0 10px 28px rgba(21,99,223,0.25) !important;
                }
                .hero-search-btn:hover {
                    transform: translateY(-1px) !important;
                    box-shadow: 0 8px 30px rgba(21,99,223,0.6) !important;
                }
                .hero-input:focus {
                    border-color: rgba(21,99,223,0.6) !important;
                    background: rgba(255,255,255,0.1) !important;
                }
            `}</style>

            {/* ── Background layers ── */}

            {/* Dot grid */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
            }} />

            {/* Aurora glow — top left */}
            <div style={{
                position: "absolute", top: "-10%", left: "-12%",
                width: "700px", height: "700px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(21,99,223,0.28) 0%, transparent 65%)",
                pointerEvents: "none", animation: "heroAurora 8s ease-in-out infinite",
            }} />

            {/* Aurora glow — bottom right */}
            <div style={{
                position: "absolute", bottom: "0%", right: "-6%",
                width: "560px", height: "560px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0,153,204,0.18) 0%, transparent 65%)",
                pointerEvents: "none", animation: "heroAurora 10s ease-in-out infinite reverse",
            }} />

            {/* Top highlight line */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: "linear-gradient(90deg, transparent 0%, #1563df 40%, #0099CC 60%, transparent 100%)",
                pointerEvents: "none",
            }} />

            {/* ── Main content row ── */}
            <div className="container" style={{ position: "relative", zIndex: 2, paddingBottom: "60px" }}>
                <div className="row align-items-center">

                    {/* ─── LEFT COLUMN ─── */}
                    <div className="col-lg-7" style={{ paddingRight: "40px" }}>

                        {/* Badge pill */}
                        <div data-hero-seq style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: C.primaryLight, opacity: 0,
                            border: `1px solid ${C.primaryBorder}`,
                            borderRadius: "100px", padding: "7px 18px", marginBottom: "30px",
                        }}>
                            <span style={{
                                width: "8px", height: "8px", borderRadius: "50%",
                                background: "#60a5fa",
                                boxShadow: "0 0 10px #60a5fa",
                                display: "inline-block",
                                animation: "heroPulse 2s infinite",
                            }} />
                            <span style={{
                                fontSize: "13px", fontWeight: "600", color: "#93c5fd",
                                letterSpacing: "0.05em", textTransform: "uppercase",
                            }}>
                                Verified Property Intelligence Platform
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 data-hero-seq style={{
                            fontSize: "clamp(36px, 4.5vw, 51px)", fontWeight: "900", opacity: 0,
                            lineHeight: "1.08", color: C.textHigh, marginBottom: "24px",
                            letterSpacing: "-0.03em",
                        }}>
                            The Complete{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #60a5fa, #38bdf8, #06b6d4)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}>
                                Service History
                            </span>
                            <br />
                            <span style={{ color: "rgba(255,255,255,0.92)" }}>of Every Property</span>
                        </h1>

                        {/* Subtext */}
                        <p data-hero-seq style={{
                            fontSize: "17px", color: C.textMid, lineHeight: "1.75", opacity: 0,
                            marginBottom: "36px", maxWidth: "500px",
                        }}>
                            Search, verify, and unlock structured property service records.
                            Built for homeowners who want control, buyers who demand trust,
                            and professionals who deliver quality.
                        </p>

                        {/* Search box — glass morphism */}
                        <div data-hero-seq style={{
                            background: "rgba(255,255,255,0.06)", opacity: 0,
                            border: `1px solid ${C.borderStrong}`,
                            borderRadius: "18px", padding: "22px", marginBottom: "36px",
                            backdropFilter: "blur(12px)",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
                        }}>
                            {/* Tabs */}
                            <div style={{
                                display: "flex", gap: "4px",
                                background: "rgba(255,255,255,0.06)",
                                borderRadius: "10px", padding: "4px",
                                marginBottom: "18px", width: "fit-content",
                                border: `1px solid ${C.border}`,
                            }}>
                                {[
                                    { id: "search", label: "Search Property Report" },
                                    { id: "upload", label: "Upload Service Record" },
                                ].map((tab) => (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                        padding: "8px 18px", borderRadius: "8px", border: "none",
                                        cursor: "pointer", fontSize: "13px", fontWeight: "600",
                                        transition: "all 0.2s",
                                        background: activeTab === tab.id ? C.primary : "transparent",
                                        color: activeTab === tab.id ? "#fff" : C.textMid,
                                        boxShadow: activeTab === tab.id ? "0 2px 12px rgba(21,99,223,0.45)" : "none",
                                    }}>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Input row */}
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <div style={{ flex: 1, minWidth: "220px", position: "relative" }}>
                                    <span style={{
                                        position: "absolute", left: "14px", top: "50%",
                                        transform: "translateY(-50%)", fontSize: "16px",
                                        pointerEvents: "none",
                                    }}>
                                        {activeTab === "search" ? "📍" : "🏠"}
                                    </span>
                                    <input
                                        type="text"
                                        value={activeTab === "search" ? searchValue : undefined}
                                        onChange={activeTab === "search" ? (e) => setSearchValue(e.target.value) : undefined}
                                        placeholder={activeTab === "search" ? "Enter property address or ID..." : "Property address..."}
                                        className="hero-input"
                                        style={{
                                            width: "100%", padding: "13px 13px 13px 42px",
                                            background: C.glassInput,
                                            border: `1.5px solid ${C.border}`,
                                            borderRadius: "10px",
                                            color: C.textHigh,
                                            fontSize: "14px", outline: "none",
                                            transition: "all 0.2s",
                                        }}
                                    />
                                </div>
                                <button
                                    className="hero-search-btn"
                                    style={{
                                        padding: "13px 28px", background: C.primary,
                                        border: "none", borderRadius: "10px", color: "#fff",
                                        fontWeight: "700", fontSize: "14px", cursor: "pointer",
                                        whiteSpace: "nowrap",
                                        boxShadow: "0 4px 20px rgba(21,99,223,0.5)",
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {activeTab === "search" ? "Get Report →" : "Upload Record →"}
                                </button>
                            </div>

                            {/* Quick tags */}
                            <div style={{ marginTop: "14px", display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                                <span style={{ fontSize: "12px", color: C.textLow, marginRight: "2px" }}>Popular:</span>
                                {["HVAC", "Roofing", "Electrical", "Plumbing", "Foundation", "Pest Control"].map((tag) => (
                                    <span key={tag} className="hero-tag" style={{
                                        padding: "4px 13px",
                                        background: "rgba(255,255,255,0.06)",
                                        border: `1px solid ${C.border}`,
                                        borderRadius: "100px", fontSize: "12px",
                                        color: C.textMid, cursor: "pointer",
                                        transition: "all 0.2s",
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats row */}
                        <div data-hero-seq style={{ display: "flex", gap: "0", flexWrap: "wrap", opacity: 0 }}>
                            {stats.map((stat, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: "0",
                                    paddingRight: i < stats.length - 1 ? "36px" : "0",
                                    marginRight: i < stats.length - 1 ? "36px" : "0",
                                    borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none",
                                }}>
                                    <div>
                                        <div style={{
                                            fontSize: "28px", fontWeight: "900",
                                            color: "#60a5fa", lineHeight: 1,
                                            letterSpacing: "-0.02em",
                                        }}>{stat.value}</div>
                                        <div style={{ fontSize: "13px", color: C.textLow, marginTop: "4px" }}>{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>



                    {/* ─── RIGHT COLUMN ─── */}
                    <div data-hero-right className="col-lg-5" style={{ paddingLeft: "16px", opacity: 0 }}>



                        <div>
                            <div style={{ position: "relative",  margin: "auto" }}>

                                {/* Custom Arrows */}
                                <button className="prev-btn" style={arrowStyle("left")}> <FiChevronLeft size={26} /></button>
                                <button className="next-btn" style={arrowStyle("right")}> <FiChevronRight size={26} /></button>

                                <Swiper
                                    modules={[Navigation]}
                                    navigation={{
                                        nextEl: ".next-btn",
                                        prevEl: ".prev-btn",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    loop
                                >
                                    {data.map((property, index) => (
                                        <SwiperSlide key={index}>

                                            <div>
                                                <div style={{
                                                    background: "#fff",
                                                    borderRadius: "22px",
                                                    overflow: "hidden",
                                                    boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
                                                }}>

                                                    {/* Image */}
                                                    <div>
                                                        <img src={property.image} alt="" width="100%" />
                                                    </div>

                                                    {/* Header */}
                                                    <div style={{
                                                        background: "linear-gradient(135deg, #EEF4FF, #deeafc)",
                                                        borderBottom: "1px solid #D8E6F7",
                                                        padding: "18px 22px",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}>
                                                        <div style={{ maxWidth: "70%" }}>
                                                            <div style={{ fontSize: "11px", color: C.lightMuted }}>
                                                                Property Intelligence Report
                                                            </div>
                                                            <div style={{ fontSize: "15px", fontWeight: "700", color: C.lightDark }}>
                                                                {property.address}
                                                            </div>
                                                        </div>
                                                        <div style={{
                                                            background: "rgba(21,99,223,0.1)",
                                                            border: "1px solid rgba(21,99,223,0.2)",
                                                            borderRadius: "8px",
                                                            padding: "5px 12px",
                                                            fontSize: "12px",
                                                            fontWeight: "700",
                                                            color: C.primary,
                                                        }}>
                                                            ✓ VERIFIED
                                                        </div>
                                                    </div>

                                                    {/* Score */}
                                                    <div style={{
                                                        padding: "16px 22px",
                                                        borderBottom: "1px solid #D8E6F7",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "14px",
                                                    }}>
                                                        <div style={{
                                                            width: "52px",
                                                            height: "52px",
                                                            borderRadius: "50%",
                                                            background: `conic-gradient(${C.primary} 0% ${property.score}%, #D8E6F7 ${property.score}% 100%)`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}>
                                                            <div style={{
                                                                width: "38px",
                                                                height: "38px",
                                                                borderRadius: "50%",
                                                                background: "#fff",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: "13px",
                                                                fontWeight: "800",
                                                                color: C.primary,
                                                            }}>
                                                                {property.score}
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <div style={{ fontSize: "13px", fontWeight: "700", color: C.lightDark }}>
                                                                Property Health Score
                                                            </div>
                                                            <div style={{ fontSize: "12px", color: C.lightMuted }}>
                                                                {property.basedOn}
                                                            </div>
                                                        </div>

                                                        <div style={{ marginLeft: "auto", textAlign: "right" }}>
                                                            <div style={{ fontSize: "11px", color: C.lightMuted }}>
                                                                Last updated
                                                            </div>
                                                            <div style={{ fontSize: "12px", fontWeight: "600", color: C.lightMid }}>
                                                                {property.updated}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Timeline */}
                                                    <div style={{ padding: "14px 22px" }}>
                                                        {property.timeline.map((item, i) => (
                                                            <div key={i} style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                marginBottom: "8px",
                                                                padding: "10px",
                                                                background: "#f3f7fd",
                                                                borderRadius: "10px",
                                                            }}>
                                                                <div>
                                                                    {item.icon} {item.service}
                                                                    <div style={{ fontSize: "11px", color: C.lightMuted }}>
                                                                        {item.provider}
                                                                    </div>
                                                                </div>
                                                                <div style={{ fontSize: "11px" }}>{item.date}</div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* CTA */}
                                                    <div style={{
                                                        padding: "14px 22px",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        borderTop: "1px solid #D8E6F7",
                                                    }}>
                                                        <div>
                                                            <div style={{ fontSize: "12px", color: C.lightMuted }}>
                                                                Full report access
                                                            </div>
                                                            <div style={{ fontSize: "20px", fontWeight: "800" }}>
                                                                ${property.price}
                                                            </div>
                                                        </div>
                                                        <Link
                                                            to={`/property-deatils/${property.id}`}
                                                            style={{
                                                                padding: "10px 20px",
                                                                background: C.primary,
                                                                color: "#fff",
                                                                border: "none",
                                                                borderRadius: "10px",
                                                                textDecoration: "none",
                                                                display: "inline-flex",
                                                                alignItems: "center",
                                                                fontWeight: "700",
                                                                fontSize: "14px",
                                                            }}
                                                        >
                                                            View Full Report →
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>

                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>






                        
                        {/* Role cards — dark glass */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginTop: "14px" }}>
                            {roles.map((role, i) => (
                                <div key={i} className="hero-role-card" style={{
                                    background: "rgba(255,255,255,0.06)",
                                    border: `1px solid ${C.borderStrong}`,
                                    borderRadius: "14px", padding: "14px 10px",
                                    textAlign: "center", cursor: "pointer",
                                    transition: "all 0.22s",
                                    backdropFilter: "blur(8px)",
                                }}>
                                    <div style={{ fontSize: "22px", marginBottom: "7px" }}>{role.icon}</div>
                                    <div style={{ fontSize: "12px", fontWeight: "700", color: C.textHigh, marginBottom: "3px" }}>{role.label}</div>
                                    <div style={{ fontSize: "10px", color: C.textLow, lineHeight: "1.4" }}>{role.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </div>


        </section>
    );
};

export default HeroSection;
