import Footer from "../components/Footer";
import Header from "../components/Header";

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <div style={{ padding: "2rem", backgroundColor: "#f5f7fa" }}>
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                        background: "white",
                        padding: "3rem",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "32px",
                            marginBottom: "2rem",
                            color: "#132456",
                            fontWeight: "700",
                        }}
                    >
                        Privacy Policy
                    </h1>

                    <p style={{ textAlign: "center", color: "#666", marginBottom: "3rem" }}>
                        Last updated: January 01, 2026
                    </p>

                    {/* Introduction */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                marginBottom: "1rem",
                                color: "#132456",
                                fontWeight: "700",
                                borderBottom: "2px solid #132456",
                                paddingBottom: "0.5rem",
                            }}
                        >
                            1. Introduction
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            Welcome to Site Scouter! This Privacy Policy describes how we collect, use,
                            and share your information when you use our website and services.
                        </p>
                    </section>

                    {/* Information We Collect */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                marginBottom: "1rem",
                                color: "#132456",
                                fontWeight: "700",
                                borderBottom: "2px solid #132456",
                                paddingBottom: "0.5rem",
                            }}
                        >
                            2. Information We Collect
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            We collect information that you provide directly to us, such as when you create
                            an account or contact us. We also collect information automatically when you
                            use our platform.
                        </p>
                    </section>

                    {/* How We Use Information */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                marginBottom: "1rem",
                                color: "#132456",
                                fontWeight: "700",
                                borderBottom: "2px solid #132456",
                                paddingBottom: "0.5rem",
                            }}
                        >
                            3. How We Use Information
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            We use the information we collect to provide, maintain, and improve our
                            services, as well as to communicate with you.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section style={{ marginBottom: "2rem" }}>
                        <h2
                            style={{
                                fontSize: "24px",
                                marginBottom: "1rem",
                                color: "#132456",
                                fontWeight: "700",
                                borderBottom: "2px solid #132456",
                                paddingBottom: "0.5rem",
                            }}
                        >
                            4. Data Security
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6" }}>
                            We take reasonable measures to protect your information from unauthorized
                            access or disclosure.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default PrivacyPolicy;