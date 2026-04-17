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
    green: "#16a34a",
    greenLight: "rgba(22,163,74,0.10)",
    greenBorder: "rgba(22,163,74,0.20)",
};

const PLANS = [
    {
        icon: "🏠",
        name: "Homeowner",
        price: "Free",
        period: "forever",
        tagline: "Claim, manage, and protect your property history at no cost.",
        color: C.primary,
        colorLight: C.primaryLight,
        colorBorder: C.primaryBorder,
        featured: false,
        cta: "Claim Your Property",
        ctaStyle: "outline",
        features: [
            { text: "Claim & verify your property profile", included: true },
            { text: "View your complete service timeline", included: true },
            { text: "Control who accesses your history", included: true },
            { text: "Property Health Score dashboard", included: true },
            { text: "Approve or reject provider records", included: true },
            { text: "Boost resale value with verified data", included: true },
            { text: "Priority listing in search results", included: false },
            { text: "Bulk report generation", included: false },
        ],
    },
    {
        icon: "📋",
        name: "Report Unlock",
        price: "$30",
        period: "per report",
        tagline: "Get the full verified history of any property — before you commit.",
        color: C.white,
        colorLight: "rgba(255,255,255,0.12)",
        colorBorder: "rgba(255,255,255,0.25)",
        featured: true,
        featuredLabel: "Most Popular",
        cta: "Unlock a Report",
        ctaStyle: "solid-white",
        features: [
            { text: "Full maintenance & service audit trail", included: true },
            { text: "Verified provider credentials", included: true },
            { text: "Property Health Score breakdown", included: true },
            { text: "Red-flag risk indicators", included: true },
            { text: "Downloadable PDF report", included: true },
            { text: "30-day secure access window", included: true },
            { text: "Side-by-side property comparison", included: true },
            { text: "Share report link with your agent", included: true },
        ],
    },
    {
        icon: "🛠️",
        name: "Service Provider",
        price: "$49",
        period: "/ month",
        tagline: "Build your verified digital reputation and win clients through trust.",
        color: C.primary,
        colorLight: C.primaryLight,
        colorBorder: C.primaryBorder,
        featured: false,
        cta: "Start Free Trial",
        ctaStyle: "solid-blue",
        badge: "14-day free trial",
        features: [
            { text: "Full provider SaaS dashboard", included: true },
            { text: "Upload unlimited service records", included: true },
            { text: "Attach records to property profiles", included: true },
            { text: "Verified work portfolio page", included: true },
            { text: "Client review & rating system", included: true },
            { text: "Record analytics & job history", included: true },
            { text: "Priority badge on listings", included: true },
            { text: "API access for integrations", included: false },
        ],
    },
];

const Check = ({ ok, color }) => (
    <span style={{
        width: "20px", height: "20px", borderRadius: "50%", display: "inline-flex",
        alignItems: "center", justifyContent: "center", flexShrink: 0,
        background: ok ? (color === C.white ? "rgba(255,255,255,0.18)" : C.primaryLight) : "rgba(0,0,0,0.05)",
        fontSize: "10px", fontWeight: "800",
        color: ok ? (color === C.white ? "#fff" : C.primary) : C.muted,
    }}>
        {ok ? "✓" : "✕"}
    </span>
);

const PricingSection = () => (
    <>
        <style>{`
            .pricing-card {
                border-radius: 24px;
                padding: 36px 32px 32px;
                position: relative;
                transition: transform 0.25s, box-shadow 0.25s;
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .pricing-card:hover {
                transform: translateY(-6px);
            }
            .pricing-card.pricing-light {
                background: #fff;
                border: 1px solid ${C.border};
                box-shadow: 0 4px 24px rgba(21,99,223,0.07);
            }
            .pricing-card.pricing-light:hover {
                box-shadow: 0 16px 48px rgba(21,99,223,0.14);
            }
            .pricing-card.pricing-featured {
                background: linear-gradient(150deg, #1563df 0%, #0d4fc4 55%, #083a96 100%);
                border: none;
                box-shadow: 0 12px 48px rgba(21,99,223,0.45);
            }
            .pricing-card.pricing-featured:hover {
                box-shadow: 0 24px 64px rgba(21,99,223,0.55);
            }
            .pricing-cta-outline {
                display: block; width: 100%; padding: 13px 0; border-radius: 10px;
                border: 1.5px solid ${C.primaryBorder}; background: transparent;
                color: ${C.primary}; font-weight: 700; font-size: 14px;
                cursor: pointer; text-align: center; text-decoration: none;
                transition: all 0.15s;
            }
            .pricing-cta-outline:hover {
                background: ${C.primarySoft}; border-color: ${C.primary};
            }
            .pricing-cta-solid-blue {
                display: block; width: 100%; padding: 13px 0; border-radius: 10px;
                border: none; background: ${C.primary};
                color: #fff; font-weight: 700; font-size: 14px;
                cursor: pointer; text-align: center; text-decoration: none;
                box-shadow: 0 4px 20px rgba(21,99,223,0.35);
                transition: all 0.15s;
            }
            .pricing-cta-solid-blue:hover {
                box-shadow: 0 6px 28px rgba(21,99,223,0.55); opacity: 0.92;
            }
            .pricing-cta-solid-white {
                display: block; width: 100%; padding: 13px 0; border-radius: 10px;
                border: none; background: #fff;
                color: ${C.primary}; font-weight: 700; font-size: 14px;
                cursor: pointer; text-align: center; text-decoration: none;
                box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                transition: all 0.15s;
            }
            .pricing-cta-solid-white:hover {
                box-shadow: 0 6px 28px rgba(0,0,0,0.22); transform: translateY(-1px);
            }
            .pricing-feature-list {
                list-style: none; padding: 0; margin: 0;
                display: flex; flex-direction: column; gap: 11px;
            }
            @media (max-width: 991px) {
                .pricing-card { margin-bottom: 24px; }
            }
        `}</style>

        <section style={{
            background: C.bg,
            padding: "10px 0 10px",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Dot pattern */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(rgba(21,99,223,0.05) 1.5px, transparent 1.5px)",
                backgroundSize: "28px 28px",
            }} />

            {/* Soft glow behind featured card */}
            <div style={{
                position: "absolute", top: "30%", left: "50%",
                transform: "translateX(-50%)",
                width: "520px", height: "520px",
                background: "radial-gradient(circle, rgba(21,99,223,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="container pt-5 mb-5" style={{ position: "relative", zIndex: 1 }}>

                {/* ── Header ── */}
                <div data-animate="up" style={{ textAlign: "center", marginBottom: "60px" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: C.primaryLight, border: `1px solid ${C.primaryBorder}`,
                        borderRadius: "100px", padding: "6px 18px", marginBottom: "20px",
                    }}>
                        <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: C.primary, display: "inline-block" }} />
                        <span style={{ fontSize: "12px", fontWeight: "600", color: C.primary, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                            Simple Pricing
                        </span>
                    </div>

                    <h2 style={{
                        fontSize: "clamp(28px, 3vw, 44px)", fontWeight: "800",
                        color: C.dark, lineHeight: "1.2", marginBottom: "18px",
                        letterSpacing: "-0.02em",
                    }}>
                        Transparent Plans for{" "}
                        <span style={{
                            background: `linear-gradient(90deg, ${C.primary}, #0099CC)`,
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Every Role
                        </span>
                    </h2>

                    <p style={{
                        fontSize: "17px", color: C.mid, lineHeight: "1.7",
                        maxWidth: "520px", margin: "0 auto",
                    }}>
                        No hidden fees. Pay only for what you need — whether you own, buy, or service properties.
                    </p>
                </div>

                {/* ── Cards ── */}
                <div data-stagger className="row g-4 align-items-center justify-content-center">
                    {PLANS.map((plan, i) => (
                        <div key={i} className="col-lg-4 col-md-6">
                            <div className={`pricing-card ${plan.featured ? "pricing-featured" : "pricing-light"}`}>

                                {/* Popular badge */}
                                {plan.featured && (
                                    <div style={{
                                        position: "absolute", top: "-14px", left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                                        borderRadius: "100px", padding: "5px 18px",
                                        fontSize: "11px", fontWeight: "800", color: "#fff",
                                        textTransform: "uppercase", letterSpacing: "0.06em",
                                        boxShadow: "0 4px 14px rgba(245,158,11,0.5)",
                                        whiteSpace: "nowrap",
                                    }}>
                                        ★ {plan.featuredLabel}
                                    </div>
                                )}

                                {/* Trial badge */}
                                {plan.badge && (
                                    <div style={{
                                        position: "absolute", top: "-14px", right: "20px",
                                        background: C.greenLight, border: `1px solid ${C.greenBorder}`,
                                        borderRadius: "100px", padding: "5px 14px",
                                        fontSize: "11px", fontWeight: "700", color: C.green,
                                        whiteSpace: "nowrap",
                                    }}>
                                        {plan.badge}
                                    </div>
                                )}

                                {/* Icon */}
                                <div style={{
                                    width: "54px", height: "54px", borderRadius: "15px",
                                    background: plan.featured ? "rgba(255,255,255,0.15)" : C.primarySoft,
                                    border: `1px solid ${plan.colorBorder}`,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: "24px", marginBottom: "20px",
                                }}>
                                    {plan.icon}
                                </div>

                                {/* Plan name */}
                                <div style={{
                                    fontSize: "12px", fontWeight: "700",
                                    color: plan.featured ? "rgba(255,255,255,0.65)" : C.muted,
                                    textTransform: "uppercase", letterSpacing: "0.1em",
                                    marginBottom: "8px",
                                }}>
                                    {plan.name}
                                </div>

                                {/* Price */}
                                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", marginBottom: "10px" }}>
                                    <span style={{
                                        fontSize: plan.price === "Free" ? "42px" : "48px",
                                        fontWeight: "900", lineHeight: "1",
                                        color: plan.featured ? "#fff" : C.dark,
                                        letterSpacing: "-0.03em",
                                    }}>
                                        {plan.price}
                                    </span>
                                    <span style={{
                                        fontSize: "14px", fontWeight: "500",
                                        color: plan.featured ? "rgba(255,255,255,0.6)" : C.muted,
                                        paddingBottom: "6px",
                                    }}>
                                        {plan.period}
                                    </span>
                                </div>

                                {/* Tagline */}
                                <p style={{
                                    fontSize: "13px", lineHeight: "1.65",
                                    color: plan.featured ? "rgba(255,255,255,0.72)" : C.mid,
                                    marginBottom: "24px",
                                }}>
                                    {plan.tagline}
                                </p>

                                {/* Divider */}
                                <div style={{
                                    height: "1px",
                                    background: plan.featured ? "rgba(255,255,255,0.15)" : C.border,
                                    marginBottom: "24px",
                                }} />

                                {/* Feature list */}
                                <ul className="pricing-feature-list" style={{ flexGrow: 1, marginBottom: "28px" }}>
                                    {plan.features.map((f, j) => (
                                        <li key={j} style={{
                                            display: "flex", alignItems: "center", gap: "10px",
                                            fontSize: "13px", fontWeight: "500",
                                            color: plan.featured
                                                ? (f.included ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.35)")
                                                : (f.included ? C.dark : C.muted),
                                            textDecoration: f.included ? "none" : "none",
                                        }}>
                                            <Check ok={f.included} color={plan.featured ? C.white : C.primary} />
                                            {f.text}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <a href="#" className={`pricing-cta-${plan.ctaStyle}`}>
                                    {plan.cta}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Enterprise strip ── */}
                <div data-animate="up" style={{
                    marginTop: "56px",
                    background: C.white,
                    borderRadius: "20px",
                    border: `1px solid ${C.border}`,
                    padding: "32px 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "20px",
                    boxShadow: "0 4px 24px rgba(21,99,223,0.07)",
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                        <div style={{
                            width: "52px", height: "52px", borderRadius: "14px",
                            background: C.primarySoft, border: `1px solid ${C.primaryBorder}`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "22px", flexShrink: 0,
                        }}>
                            🏢
                        </div>
                        <div>
                            <div style={{ fontSize: "16px", fontWeight: "800", color: C.dark, marginBottom: "4px" }}>
                                Real Estate Agency or Enterprise?
                            </div>
                            <div style={{ fontSize: "14px", color: C.mid, lineHeight: "1.5" }}>
                                Get bulk report access, team seats, API integration, and a dedicated account manager.
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "12px", flexShrink: 0, flexWrap: "wrap" }}>
                        <a href="/contact-us" style={{
                            padding: "12px 26px", background: C.primary,
                            borderRadius: "10px", color: "#fff",
                            fontWeight: "700", fontSize: "14px",
                            textDecoration: "none",
                            boxShadow: "0 4px 20px rgba(21,99,223,0.35)",
                            transition: "opacity 0.15s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                        >
                            Contact Sales →
                        </a>
                        <a href="#" style={{
                            padding: "12px 26px", background: "transparent",
                            border: `1.5px solid ${C.primaryBorder}`, borderRadius: "10px",
                            color: C.primary, fontWeight: "700", fontSize: "14px",
                            textDecoration: "none", transition: "all 0.15s",
                        }}
                            onMouseEnter={e => { e.currentTarget.style.background = C.primarySoft; e.currentTarget.style.borderColor = C.primary; }}
                            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.primaryBorder; }}
                        >
                            View API Docs
                        </a>
                    </div>
                </div>

            </div>
        </section>
    </>
);

export default PricingSection;
