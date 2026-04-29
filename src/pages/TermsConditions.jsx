import Header from "../components/Header";
import Footer from "../components/Footer";
const TermsConditions = () => {
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
                        Terms and Conditions
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
                            Welcome to Site Scouter! These Terms and Conditions govern your use of our
                            website and services. By accessing or using Site Scouter, you agree to be
                            bound by these terms.
                        </p>
                    </section>

                    {/* User Conduct */}
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
                            2. Acceptable Use
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            You agree to use Site Scouter only for lawful purposes and in accordance with
                            these Terms. You will not use the platform to:
                        </p>
                        <ul
                            style={{
                                marginLeft: "1.5rem",
                                color: "#4a4a4a",
                                lineHeight: "1.6",
                            }}
                        >
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe on the intellectual property rights of others</li>
                            <li>Post or transmit any harmful, offensive, or inappropriate content</li>
                            <li>Attempt to disrupt or interfere with the platform</li>
                        </ul>
                    </section>

                    {/* IP and Content */}
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
                            3. Intellectual Property
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            All content on Site Scouter, including text, graphics, logos, and software,
                            is the property of Site Scouter or its licensors and is protected by copyright
                            and other intellectual property laws.
                        </p>
                    </section>

                    {/* Disclaimers */}
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
                            4. Disclaimers
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            Site Scouter is provided "as is" without warranties of any kind. We do not
                            guarantee that the platform will be error-free or continuously available.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
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
                            5. Limitation of Liability
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6", marginBottom: "1rem" }}>
                            To the fullest extent permitted by law, Site Scouter shall not be liable for any
                            damages arising from your use of the platform.
                        </p>
                    </section>

                    {/* Governing Law */}
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
                            6. Governing Law
                        </h2>
                        <p style={{ color: "#4a4a4a", lineHeight: "1.6" }}>
                            These Terms shall be governed by and construed in accordance with the laws of
                            Delaware.
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default TermsConditions;