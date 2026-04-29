const BASE = "https://homelengo.vercel.app";

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

// ── Property data ─────────────────────────────────────────────────────────────
const ALL_PROPS = [
    {
        img: `${BASE}/images/home/house-13.jpg`,
        address: "145 Brooklyn Ave, New York, NY",
        title: "Maple Ridge Estate",
        records: 24, score: 94, updated: "Apr 2025",
        avatar: `${BASE}/images/avatar/avt-png1.png`, owner: "Jessica Miller",
        badge1: "Verified ✓", badge2: "High Score",
    },
    {
        img: `${BASE}/images/home/house-14.jpg`,
        address: "210 Park Blvd, Los Angeles, CA",
        title: "Sunset View Villa",
        records: 18, score: 87, updated: "Mar 2025",
        avatar: `${BASE}/images/avatar/avt-png2.png`, owner: "Michael Chen",
        badge1: "Verified ✓", badge2: "HVAC Done",
    },
    {
        img: `${BASE}/images/home/house-15.jpg`,
        address: "88 Ocean Drive, Miami, FL",
        title: "Palm Crest Residence",
        records: 31, score: 96, updated: "Apr 2025",
        avatar: `${BASE}/images/avatar/avt-png3.png`, owner: "Sarah Johnson",
        badge1: "Verified ✓", badge2: "Top Rated",
    },
    {
        img: `${BASE}/images/home/house-16.jpg`,
        address: "56 Highland Rd, Denver, CO",
        title: "Rocky Mountain Home",
        records: 12, score: 78, updated: "Jan 2025",
        avatar: `${BASE}/images/avatar/avt-png4.png`, owner: "David Brown",
        badge1: "Verified ✓", badge2: "HVAC Done",
    },
    {
        img: `${BASE}/images/home/house-17.jpg`,
        address: "320 Elm Street, Chicago, IL",
        title: "Greenwood Manor",
        records: 27, score: 91, updated: "Mar 2025",
        avatar: `${BASE}/images/avatar/avt-png5.png`, owner: "Emily Davis",
        badge1: "Verified ✓", badge2: "Full Docs",
    },
    {
        img: `${BASE}/images/home/house-18.jpg`,
        address: "445 Cedar Ave, Phoenix, AZ",
        title: "Desert Oasis Estate",
        records: 9, score: 72, updated: "Feb 2025",
        avatar: `${BASE}/images/avatar/avt-png6.png`, owner: "Robert Wilson",
        badge1: "Verified ✓", badge2: "Roof Done",
    },
];

const TABS = [
    { id: "allProps", label: "All Properties", props: ALL_PROPS },
    { id: "highScore", label: "High Score 90+", props: [ALL_PROPS[0], ALL_PROPS[2], ALL_PROPS[4]] },
    { id: "recentUpdate", label: "Recently Updated", props: [ALL_PROPS[2], ALL_PROPS[0], ALL_PROPS[4]] },
    { id: "hvacVerified", label: "HVAC Verified", props: [ALL_PROPS[1], ALL_PROPS[3], ALL_PROPS[0]] },
    { id: "fullyDocs", label: "Fully Documented", props: [ALL_PROPS[0], ALL_PROPS[2], ALL_PROPS[4]] },
];

// ── Location SVG ──────────────────────────────────────────────────────────────
const PinSVG = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// ── Single property card ──────────────────────────────────────────────────────
const PropCard = ({ p }) => {
    const sc = scoreStyle(p.score);
    return (
        <div className="homelengo-box">
            <div className="archive-top">
                <a href="#" className="images-group">
                    <div className="images-style">
                        <img className="lazyload" data-src={p.img} src={p.img} alt={p.title} />
                    </div>
                    {/* Top badges */}
                    <div className="top">
                        <ul className="d-flex gap-6">
                            <li className="flag-tag primary">{p.badge1}</li>
                            <li className="flag-tag style-1"
                                style={{ background: p.badge2 === "High Score" || p.badge2 === "Top Rated" ? C.green : undefined }}>
                                {p.badge2}
                            </li>
                        </ul>
                        {/* Score pill top-right */}
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
                    {/* Address strip */}
                    <div className="bottom">
                        <PinSVG />
                        {p.address}
                    </div>
                </a>
            </div>

            <div className="archive-bottom">
                <div className="content-top">
                    <h6 className="text-capitalize">
                        <a href="#" className="link">{p.title}</a>
                    </h6>
                    {/* Service-history meta — replaces beds/baths/sqft */}
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
                            <span className="fw-6">{p.updated}</span>
                        </li>
                    </ul>
                </div>

                <div className="content-bottom">
                    {/* Owner avatar + name */}
                    <div className="d-flex gap-8 align-items-center">
                        <div className="avatar avt-40 round">
                            <img src={p.avatar} alt={p.owner} />
                        </div>
                        <span style={{ fontSize: "13px", color: C.mid }}>{p.owner}</span>
                    </div>
                    {/* CTA instead of price */}
                    <a href="#" style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        background: C.primary, color: "#fff",
                        borderRadius: "8px", padding: "7px 14px",
                        fontSize: "12px", fontWeight: "700",
                        textDecoration: "none", whiteSpace: "nowrap",
                        boxShadow: "0 3px 12px rgba(21,99,223,0.3)",
                        transition: "opacity 0.15s",
                    }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                        onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                    >
                        Unlock — $30
                    </a>
                </div>
            </div>
        </div>
    );
};

// ── Section ───────────────────────────────────────────────────────────────────
const VerifiedPropertiesSection = () => (
    <>
        <style>{`
            .vps-tab-nav .nav-link-item { position: relative; }
            .vps-score-pill { line-height: 1; }
        `}</style>

        <section className="flat-section flat-recommended pt-0" style={{ background: C.bg }}>
            <div className="container" style={{ paddingTop: "60px" }}>

                {/* ── Header ── */}
                <div data-animate="up" className="box-title text-center wow fadeInUp">
                    {/* Badge */}
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

                {/* ── Tabs ── */}
                <div className="flat-tab-recommended flat-animate-tab vps-tab-nav wow fadeInUp" data-wow-delay=".2s">
                    <ul className="nav-tab-recommended justify-content-md-center" role="tablist">
                        {TABS.map((tab, i) => (
                            <li key={tab.id} className="nav-tab-item" role="presentation">
                                <a
                                    href={`#${tab.id}`}
                                    style={{ backgroundColor: "#fff" }}
                                    className={`nav-link-item${i === 0 ? " active" : ""}`}
                                    data-bs-toggle="tab"
                                >
                                    {tab.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* ── Tab panes ── */}
                    <div className="tab-content">
                        {TABS.map((tab, i) => (
                            <div
                                key={tab.id}
                                className={`tab-pane${i === 0 ? " active show" : ""}`}
                                id={tab.id}
                                role="tabpanel"
                            >
                                <div className="row">
                                    {tab.props.map((p, j) => (
                                        <div key={j} className="col-xl-4 col-lg-6 col-md-6">
                                            <PropCard p={p} />
                                        </div>
                                    ))}
                                </div>

                                {/* View all CTA */}
                                <div className="text-center" style={{ marginTop: "8px" }}>
                                    <a href="#" className="tf-btn btn-view primary size-1 hover-btn-view">
                                        View All Verified Properties <span className="icon icon-arrow-right2"></span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    </>
);

export default VerifiedPropertiesSection;
