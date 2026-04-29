import { useState } from "react";
import { Link } from "react-router-dom";
import { PROPERTIES } from "../data/properties";

const C = {
    primary: "#1563df",
    primaryLight: "rgba(21,99,223,0.08)",
    primaryBorder: "rgba(21,99,223,0.18)",
    primarySoft: "#EEF4FF",
    dark: "#161E2D",
    mid: "#4A5568",
    bg: "#f3f7fd",
    green: "#16a34a",
    greenLight: "rgba(22,163,74,0.10)",
    amber: "#d97706",
    amberLight: "rgba(217,119,6,0.10)",
};

const scoreStyle = (score) => {
    if (score >= 90) return { color: C.green, bg: C.greenLight };
    if (score >= 80) return { color: C.primary, bg: C.primaryLight };
    return { color: C.amber, bg: C.amberLight };
};

const highScoreProps = PROPERTIES.filter((p) => p.score >= 90).slice(0, 6);
const recentProps = [...PROPERTIES]
    .sort((a, b) => (b.lastUpdated > a.lastUpdated ? 1 : -1))
    .slice(0, 6);
const houseProps = PROPERTIES.filter((p) => p.type === "House").slice(0, 6);
const condoVillaProps = PROPERTIES.filter((p) => p.type !== "House").slice(0, 6);

const TABS = [
    { id: "allProps", label: "All Properties", props: PROPERTIES.slice(0, 6) },
    { id: "highScore", label: "High Score 90+", props: highScoreProps },
    { id: "recentUpdate", label: "Recently Updated", props: recentProps },
    { id: "houseType", label: "Houses", props: houseProps },
    { id: "condoVilla", label: "Condo / Villa", props: condoVillaProps },
];

const PinSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PropCard = ({ p }) => {
    const sc = scoreStyle(p.score);
    return (
        <Link
            to={`/property-deatils/${p.id}`}
            className="homelengo-box"
            style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
            <div className="archive-top">
                <div className="images-group">
                    <div className="images-style">
                        <img
                            className="lazyload"
                            data-src={p.img}
                            src={p.img}
                            alt={p.address}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    </div>
                    <div className="top">
                        <ul className="d-flex gap-6">
                            <li className="flag-tag primary">Verified ✓</li>
                            <li className="flag-tag style-1">{p.type}</li>
                        </ul>
                        <div style={{
                            position: "absolute", top: "0px", right: "12px",
                            background: sc.bg, border: `1px solid ${sc.color}22`,
                            borderRadius: "100px", padding: "3px 10px",
                            display: "flex", alignItems: "center", gap: "5px",
                            backdropFilter: "blur(6px)",
                        }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: sc.color, display: "inline-block", flexShrink: 0 }} />
                            <span style={{ fontSize: "11px", fontWeight: "700", color: sc.color, lineHeight: 1 }}>
                                Score {p.score}
                            </span>
                        </div>
                    </div>
                    <div className="bottom">
                        <PinSVG />
                        {p.address}
                    </div>
                </div>
            </div>

            <div className="archive-bottom">
                <div className="content-top">
                    <h6 className="text-capitalize">
                        <span className="link">{p.address}</span>
                    </h6>
                    <ul className="meta-list" style={{ flexWrap: "wrap", gap: "6px 14px" }}>
                        <li className="item">
                            <span style={{ fontSize: "13px" }}>📋</span>
                            <span className="text-variant-1">Records:</span>
                            <span className="fw-6">{p.records}</span>
                        </li>
                        <li className="item">
                            <span style={{ fontSize: "13px" }}>⭐</span>
                            <span className="text-variant-1">Health:</span>
                            <span className="fw-6" style={{ color: sc.color }}>{p.score}/100</span>
                        </li>
                        <li className="item">
                            <span style={{ fontSize: "13px" }}>🔄</span>
                            <span className="text-variant-1">Updated:</span>
                            <span className="fw-6">{p.lastUpdated}</span>
                        </li>
                    </ul>
                </div>

                <div className="content-bottom">
                    <div style={{ fontSize: "13px", color: C.mid, fontStyle: "italic" }}>
                        {p.tag}
                    </div>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        background: C.primary, color: "#fff",
                        borderRadius: "8px", padding: "7px 14px",
                        fontSize: "12px", fontWeight: "700",
                        textDecoration: "none", whiteSpace: "nowrap",
                        boxShadow: "0 3px 12px rgba(21,99,223,0.3)",
                    }}>
                        View Report →
                    </div>
                </div>
            </div>
        </Link>
    );
};

const VerifiedPropertiesSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <style>{`
                .vps-tab-nav .nav-link-item { position: relative; }
                .vps-score-pill { line-height: 1; }
            `}</style>

            <section className="flat-section flat-recommended pt-0" style={{ background: C.bg }}>
                <div className="container" style={{ paddingTop: "60px" }}>

                    <div data-animate="up" className="box-title text-center wow fadeInUp">
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                            borderRadius: "100px", padding: "6px 18px", marginBottom: "16px",
                        }}>
                            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                            <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                Verified Properties
                            </span>
                        </div>

                        <h3 className="title mt-4" style={{ color: C.dark, letterSpacing: "-0.02em" }}>
                            Properties with a{" "}
                            <span style={{
                                background: `linear-gradient(90deg, ${C.primary}, #0099CC)`,
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                            }}>
                                Complete Service History
                            </span>
                        </h3>

                        <p style={{
                            fontSize: "16px", color: C.mid, lineHeight: "1.7",
                            maxWidth: "560px", margin: "12px auto 0",
                        }}>
                            Every listing below is backed by verified maintenance records, credentialed provider work, and a transparent Property Health Score.
                        </p>
                    </div>

                    <div className="flat-tab-recommended flat-animate-tab vps-tab-nav wow fadeInUp" data-wow-delay=".2s">
                        <ul className="nav-tab-recommended justify-content-md-center" role="tablist">
                            {TABS.map((tab, i) => (
                                <li key={tab.id} className="nav-tab-item" role="presentation">
                                    <button
                                        style={{
                                            backgroundColor: "#fff",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        className={`nav-link-item${i === activeTab ? " active" : ""}`}
                                        onClick={() => setActiveTab(i)}
                                        type="button"
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="tab-content">
                            {TABS.map((tab, i) => (
                                <div
                                    key={tab.id}
                                    className={`tab-pane${i === activeTab ? " active show" : ""}`}
                                    id={tab.id}
                                    role="tabpanel"
                                >
                                    <div className="row">
                                        {tab.props.map((p) => (
                                            <div key={p.id} className="col-xl-4 col-lg-6 col-md-6">
                                                <PropCard p={p} />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="text-center" style={{ marginTop: "8px" }}>
                                        <Link to="/all-properties" className="tf-btn btn-view primary size-1 hover-btn-view">
                                            View All Verified Properties <span className="icon icon-arrow-right2"></span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default VerifiedPropertiesSection;
