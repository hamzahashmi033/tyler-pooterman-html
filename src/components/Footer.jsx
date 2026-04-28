const Footer = () => {
    return (
        <>
            <style>{`
                .footer-new {
                    background: #0b1628;
                    position: relative;
                    overflow: hidden;
                }
                .footer-new::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 50%;
                    transform: translateX(-50%);
                    width: 900px; height: 500px;
                    background: radial-gradient(ellipse at 50% 0%, rgba(21,99,223,0.18) 0%, transparent 65%);
                    pointer-events: none;
                    z-index: 0;
                }
                .footer-new::after {
                    content: "";
                    position: absolute; inset: 0;
                    background-image: radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px);
                    background-size: 28px 28px;
                    pointer-events: none;
                    z-index: 0;
                }
                .footer-inner { position: relative; z-index: 1; }

                .footer-cta-strip {
                    background: linear-gradient(100deg, #1563df 0%, #0d4fc4 55%, #083a96 100%);
                    border-radius: 20px;
                    padding: 40px 48px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    flex-wrap: wrap;
                    margin-bottom: 64px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 16px 56px rgba(21,99,223,0.45);
                }
                .footer-cta-strip::before {
                    content: "";
                    position: absolute; inset: 0;
                    background: radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%);
                    pointer-events: none;
                }
                .footer-cta-btn-primary {
                    padding: 12px 26px;
                    background: #fff; border-radius: 10px;
                    color: #1563df; font-weight: 700; font-size: 14px;
                    text-decoration: none; white-space: nowrap;
                    transition: opacity 0.15s;
                }
                .footer-cta-btn-primary:hover { opacity: 0.88; color: #1563df; }
                .footer-cta-btn-outline {
                    padding: 12px 26px;
                    background: rgba(255,255,255,0.12);
                    border: 1.5px solid rgba(255,255,255,0.3);
                    border-radius: 10px; color: #fff;
                    font-weight: 700; font-size: 14px;
                    text-decoration: none; white-space: nowrap;
                    transition: all 0.15s;
                }
                .footer-cta-btn-outline:hover {
                    background: rgba(255,255,255,0.2); color: #fff;
                }

                .footer-social-link {
                    width: 38px; height: 38px; border-radius: 10px;
                    display: inline-flex; align-items: center; justify-content: center;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.1);
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .footer-social-link:hover {
                    background: #1563df;
                    border-color: #1563df;
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(21,99,223,0.45);
                }

                .footer-newsletter-input {
                    width: 100%;
                    background: rgba(255,255,255,0.07);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 10px;
                    padding: 13px 52px 13px 16px;
                    color: #fff;
                    font-size: 13px;
                    outline: none;
                    transition: border-color 0.2s;
                }
                .footer-newsletter-input::placeholder { color: rgba(255,255,255,0.35); }
                .footer-newsletter-input:focus { border-color: #1563df; }

                .footer-newsletter-btn {
                    position: absolute; right: 8px; top: 50%;
                    transform: translateY(-50%);
                    width: 34px; height: 34px; border-radius: 8px;
                    background: #1563df; border: none; cursor: pointer;
                    display: flex; align-items: center; justify-content: center;
                    transition: opacity 0.15s;
                }
                .footer-newsletter-btn:hover { opacity: 0.85; }

                /* Contact card row */
                .footer-contact-card {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 20px 24px;
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 14px;
                    transition: border-color 0.2s, background 0.2s;
                    min-width: 0;
                }
                .footer-contact-card:hover {
                    background: rgba(21,99,223,0.12);
                    border-color: rgba(21,99,223,0.35);
                }
                .footer-contact-icon {
                    width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
                    background: rgba(21,99,223,0.2);
                    border: 1px solid rgba(21,99,223,0.35);
                    display: flex; align-items: center; justify-content: center;
                }

                .footer-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent 0%, rgba(21,99,223,0.4) 30%, rgba(21,99,223,0.4) 70%, transparent 100%);
                    margin: 40px 0 28px;
                }

                .footer-bottom-link {
                    color: rgba(255,255,255,0.4);
                    font-size: 13px; text-decoration: none;
                    transition: color 0.15s;
                }
                .footer-bottom-link:hover { color: rgba(255,255,255,0.8); }

                @media (max-width: 767px) {
                    .footer-cta-strip { padding: 28px 24px; }
                    .footer-contact-row-wrap { flex-direction: column; }
                }
            `}</style>

            <footer className="footer-new">
                <div className="footer-inner">
                    <div className="container" style={{ paddingTop: "72px" }}>
                        {/* ── CTA Strip ── */}
                        <div data-animate="up" className="footer-cta-strip">
                            <div>
                                <div style={{
                                    fontSize: "11px", fontWeight: "700",
                                    color: "rgba(255,255,255,0.6)",
                                    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px",
                                }}>
                                    Get started today
                                </div>
                                <h3 style={{
                                    fontSize: "clamp(18px, 2.5vw, 26px)",
                                    fontWeight: "800", color: "#fff",
                                    lineHeight: "1.25", margin: 0,
                                }}>
                                    Claim your property. Own your history.
                                </h3>
                                <p style={{
                                    fontSize: "14px", color: "rgba(255,255,255,0.65)",
                                    marginTop: "8px", marginBottom: 0,
                                }}>
                                    It&apos;s free for homeowners. Unlock the full platform in minutes.
                                </p>
                            </div>
                            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                <a href="/contact-us" className="footer-cta-btn-primary">Claim Your Property →</a>
                                <a href="/contact-us" className="footer-cta-btn-outline">Unlock a Report — $30</a>
                            </div>
                        </div>

                        {/* ── Main Row: Logo + Newsletter ── */}
                        <div className="row g-5 align-items-start">
                            {/* Left — Logo + desc + socials */}
                            <div data-animate="left" className="col-lg-5">
                                <a href="/" style={{ display: "inline-block", marginBottom: "20px" }}>
                                    <img src="/images/logo/logo-footer@2x.png" alt="logo" width="166" height="48" />
                                </a>
                                <p style={{
                                    fontSize: "14px", color: "rgba(255,255,255,0.5)",
                                    lineHeight: "1.8", marginBottom: "28px", maxWidth: "340px",
                                }}>
                                    The verified property service history platform — connecting homeowners, buyers, and service providers through transparent, trusted records.
                                </p>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    {/* Facebook */}
                                    <a href="#" className="footer-social-link">
                                        <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M7.60547 9L8.00541 6.10437H5.50481V4.22531C5.50481 3.43313 5.85413 2.66094 6.97406 2.66094H8.11087V0.195625C8.11087 0.195625 7.07925 0 6.09291 0C4.03359 0 2.68753 1.38688 2.68753 3.8975V6.10437H0.398438V9H2.68753V16H5.50481V9H7.60547Z" fill="white" /></svg>
                                    </a>
                                    {/* LinkedIn */}
                                    <a href="#" className="footer-social-link">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3.58151 16H0.264292V5.31762H3.58151V16ZM1.92111 3.86044C0.860376 3.86044 0 2.98185 0 1.92111C7.59231e-09 1.4116 0.202403 0.92296 0.562681 0.562681C0.92296 0.202403 1.4116 0 1.92111 0C2.43063 0 2.91927 0.202403 3.27955 0.562681C3.63983 0.92296 3.84223 1.4116 3.84223 1.92111C3.84223 2.98185 2.98149 3.86044 1.92111 3.86044ZM15.9968 16H12.6867V10.7999C12.6867 9.56057 12.6617 7.97125 10.962 7.97125C9.23735 7.97125 8.97306 9.31771 8.97306 10.7106V16H5.65941V5.31762H8.84091V6.77479H8.88734C9.33021 5.93549 10.412 5.04976 12.026 5.04976C15.3832 5.04976 16.0004 7.26052 16.0004 10.132V16H15.9968Z" fill="white" /></svg>
                                    </a>
                                    {/* X / Twitter */}
                                    <a href="#" className="footer-social-link">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M8.30314 5.92804L13.4029 0H12.1944L7.7663 5.14724L4.22958 0H0.150391L5.4986 7.78354L0.150391 14H1.35894L6.03514 8.56434L9.77017 14H13.8494L8.30284 5.92804H8.30314ZM6.64787 7.85211L6.10598 7.07705L1.79439 0.909771H3.65065L7.13015 5.88696L7.67204 6.66202L12.195 13.1316H10.3387L6.64787 7.85241V7.85211Z" fill="white" /></svg>
                                    </a>
                                    {/* Instagram */}
                                    <a href="#" className="footer-social-link">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M6.99812 4.66567C5.71277 4.66567 4.66383 5.71463 4.66383 7C4.66383 8.28537 5.71277 9.33433 6.99812 9.33433C8.28346 9.33433 9.3324 8.28537 9.3324 7C9.3324 5.71463 8.28346 4.66567 6.99812 4.66567ZM13.9992 7C13.9992 6.03335 14.008 5.07545 13.9537 4.11055C13.8994 2.98979 13.6437 1.99512 12.8242 1.17556C12.0029 0.35426 11.01 0.100338 9.88927 0.0460516C8.92263-0.00823506 7.96475 0.000520879 6.99987 0.000520879C6.03323 0.000520879 5.07536-0.00823506 4.11047 0.0460516C2.98973 0.100338 1.99508 0.356011 1.17554 1.17556C0.354253 1.99687 0.100336 2.98979 0.0460508 4.11055C-0.00823491 5.0772 0.00052087 6.0351 0.00052087 7C0.00052087 7.9649-0.00823491 8.92455 0.0460508 9.88945C0.100336 11.0102 0.356004 12.0049 1.17554 12.8244C1.99683 13.6457 2.98973 13.8997 4.11047 13.9539C5.07711 14.0082 6.03499 13.9995 6.99987 13.9995C7.9665 13.9995 8.92438 14.0082 9.88927 13.9539C11.01 13.8997 12.0047 13.644 12.8242 12.8244C13.6455 12.0031 13.8994 11.0102 13.9537 9.88945C14.0097 8.92455 13.9992 7.96665 13.9992 7ZM6.99812 10.5917C5.01056 10.5917 3.40651 8.98759 3.40651 7C3.40651 5.01241 5.01056 3.40832 6.99812 3.40832C8.98567 3.40832 10.5897 5.01241 10.5897 7C10.5897 8.98759 8.98567 10.5917 6.99812 10.5917ZM10.7368 4.10004C10.2728 4.10004 9.89802 3.72529 9.89802 3.26122C9.89802 2.79716 10.2728 2.42241 10.7368 2.42241C11.2009 2.42241 11.5756 2.79716 11.5756 3.26122C11.5758 3.37142 11.5542 3.48056 11.5121 3.58239C11.47 3.68422 11.4082 3.77675 11.3303 3.85467C11.2523 3.93258 11.1598 3.99437 11.058 4.03647C10.9562 4.07858 10.847 4.10018 10.7368 4.10004Z" fill="white" /></svg>
                                    </a>
                                    {/* YouTube */}
                                    <a href="#" className="footer-social-link">
                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><path d="M15.6657 1.76024C15.4817 1.06737 14.9395 0.521689 14.2511 0.336504C13.0033 0 8 0 8 0C8 0 2.99669 0 1.7489 0.336504C1.06052 0.521718 0.518349 1.06737 0.334336 1.76024C0 3.01611 0 5.63636 0 5.63636C0 5.63636 0 8.25661 0.334336 9.51248C0.518349 10.2053 1.06052 10.7283 1.7489 10.9135C2.99669 11.25 8 11.25 8 11.25C8 11.25 13.0033 11.25 14.2511 10.9135C14.9395 10.7283 15.4817 10.2053 15.6657 9.51248C16 8.25661 16 5.63636 16 5.63636C16 5.63636 16 3.01611 15.6657 1.76024ZM6.36363 8.01535V3.25737L10.5454 5.63642L6.36363 8.01535Z" fill="white" /></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Right — Newsletter */}
                            <div data-animate="right" className="col-lg-7">
                                <div style={{
                                    background: "rgba(255,255,255,0.04)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    borderRadius: "20px",
                                    padding: "32px 36px",
                                }}>
                                    <div style={{
                                        fontSize: "11px", fontWeight: "700",
                                        color: "#1563df", textTransform: "uppercase",
                                        letterSpacing: "0.1em", marginBottom: "8px",
                                    }}>
                                        Newsletter
                                    </div>
                                    <h5 style={{
                                        fontSize: "18px", fontWeight: "700", color: "#fff",
                                        marginBottom: "6px",
                                    }}>
                                        Your Weekly Dose of Property Insights
                                    </h5>
                                    <p style={{
                                        fontSize: "13.5px", color: "rgba(255,255,255,0.45)",
                                        marginBottom: "20px", lineHeight: "1.6",
                                    }}>
                                        Tips on verified buying, provider best practices, and platform updates — straight to your inbox.
                                    </p>

                                    <form id="subscribe-form" action="#" method="post" acceptCharset="utf-8" data-mailchimp="true">
                                        <div id="subscribe-content" style={{ position: "relative" }}>
                                            <input
                                                type="email"
                                                name="email-form"
                                                id="subscribe-email"
                                                placeholder="Your email address"
                                                className="footer-newsletter-input"
                                            />
                                            <button type="button" id="subscribe-button" className="footer-newsletter-btn">
                                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                                    <path d="M5.00044 9.99935L2.72461 2.60352C8.16867 4.18685 13.3024 6.68806 17.9046 9.99935C13.3027 13.3106 8.16921 15.8118 2.72544 17.3952L5.00044 9.99935ZM5.00044 9.99935H11.2504" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div id="subscribe-msg"></div>
                                    </form>

                                    {/* Stats */}
                                    <div style={{
                                        display: "flex", gap: "0", marginTop: "24px",
                                        borderTop: "1px solid rgba(255,255,255,0.07)",
                                        paddingTop: "20px",
                                    }}>
                                        {[
                                            { num: "50K+", label: "Properties Verified" },
                                            { num: "4.8★", label: "Average Rating" },
                                            { num: "98%", label: "Record Accuracy" },
                                        ].map((s, i) => (
                                            <div key={i} style={{
                                                flex: 1, textAlign: "center",
                                                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
                                                padding: "0 12px",
                                            }}>
                                                <div style={{ fontSize: "20px", fontWeight: "800", color: "#fff", lineHeight: 1 }}>{s.num}</div>
                                                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "5px" }}>{s.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>{/* end main row */}

                        {/* ── Contact Info Row ── */}
                        <div data-stagger style={{
                            display: "flex", gap: "16px", marginTop: "36px",
                            flexWrap: "wrap",
                        }} className="footer-contact-row-wrap">

                            {/* Address */}
                            <div className="footer-contact-card">
                                <div className="footer-contact-icon">
                                    <i className="icon icon-mapPinLine" style={{ color: "#1563df", fontSize: "18px" }}></i>
                                </div>
                                <div>
                                    <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>Address</div>
                                    <div style={{ fontSize: "13.5px", color: "#fff", lineHeight: "1.5" }}>Address Here</div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="footer-contact-card">
                                <div className="footer-contact-icon">
                                    <i className="icon icon-phone2" style={{ color: "#1563df", fontSize: "18px" }}></i>
                                </div>
                                <div>
                                    <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>Phone</div>
                                    <a href="tel:1-333-345-6868" style={{ fontSize: "13.5px", color: "#fff", textDecoration: "none", transition: "color 0.15s" }}
                                        onMouseEnter={e => e.currentTarget.style.color = "#6ba3ff"}
                                        onMouseLeave={e => e.currentTarget.style.color = "#fff"}
                                    >+1928-899-5100</a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="footer-contact-card">
                                <div className="footer-contact-icon">
                                    <i className="icon icon-mail" style={{ color: "#1563df", fontSize: "18px" }}></i>
                                </div>
                                <div>
                                    <div style={{ fontSize: "11px", fontWeight: "700", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "3px" }}>Email</div>
                                    <div style={{ fontSize: "13.5px", color: "#fff" }}>info@sitescouter.com</div>
                                </div>
                            </div>

                        </div>

                        {/* ── Divider ── */}
                        <div className="footer-divider" />

                        {/* ── Bottom bar ── */}
                        <div style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between", flexWrap: "wrap",
                            gap: "12px", paddingBottom: "32px",
                        }}>
                            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
                                ©2026 Site Scouter. All Rights Reserved.
                            </div>
                            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                                <a href="/terms-conditions" className="footer-bottom-link">Terms & Conditions</a>
                                <a href="/privacy-policy" className="footer-bottom-link">Privacy Policy</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
