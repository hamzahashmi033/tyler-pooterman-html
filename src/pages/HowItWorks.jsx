import { useEffect } from "react";
import { initScrollAnimations } from "../animations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";

const STEPS = [
    {
        number: "01",
        title: "Claim or Search a Property",
        description:
            "Homeowners claim their property profile in minutes. Buyers and agents can search any listed property to review timeline highlights before paying for the full report.",
        tag: "Start",
    },
    {
        number: "02",
        title: "Providers Upload Verified Records",
        description:
            "Service providers log completed jobs like HVAC, roofing, and electrical work with dates, invoices, and notes so each record is tied to the property history.",
        tag: "Verify",
    },
    {
        number: "03",
        title: "System Builds Health Score",
        description:
            "Our platform organizes all service events and inspection updates into a property health score so users can quickly spot strengths and risks.",
        tag: "Analyze",
    },

];

const HowItWorks = () => {
    useEffect(() => {
        if (window.jQuery) {
            const $ = window.jQuery;
            try {
                initMain($);
                initShortcodes($);
                initCarousels($);
                initRangeSliders($);
                initAnimationHeading($);
            } catch (err) {
                console.error("Plugin initialization error:", err);
            }
        }

        if (window.WOW) {
            new window.WOW().init();
        }

        initScrollAnimations();
    }, []);

    return (
        <div id="wrapper">
            <div id="pagee" className="clearfix">
                <Header />

                <section
                    className="flat-title-page"
                    style={{ backgroundImage: "url(https://homelengo.vercel.app/images/page-title/page-title-2.jpg)" }}
                >
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul className="breadcrumb">
                                <li><a href="/" className="text-white">Home</a></li>
                                
                                <li className="text-white">/ How It Works</li>
                            </ul>
                            <h1 className="text-center text-white title">How It Works</h1>
                            <p className="text-center text-white body-2 mt-12">
                                A clear, verified workflow for homeowners, buyers, agents, and service providers.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flat-section">
                    <div className="container">
                        <div className="box-title text-center wow fadeInUp" data-wow-delay=".1s" data-wow-duration="2000ms">
                            <div className="text-subtitle text-primary">Simple Process</div>
                            <h3 className="title mt-4">From service logs to trusted property reports</h3>
                            <p className="desc text-variant-1 mt-12">
                                Every update is connected to the property timeline so decisions are based on real maintenance history, not guesswork.
                            </p>
                        </div>
                        <div className="row mt-30">
                            {STEPS.map((step) => (
                                <div key={step.number} className="col-lg-4 col-md-6">
                                    <div
                                        className="wow fadeInUp"
                                        data-wow-delay=".2s"
                                        data-wow-duration="2000ms"
                                        style={{
                                            background: "#ffffff",
                                            border: "1px solid #e9eef5",
                                            borderRadius: "16px",
                                            padding: "26px 22px",
                                            height: "100%",
                                            boxShadow: "0 10px 30px rgba(14, 44, 87, 0.06)",
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-12">
                                            <span
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "42px",
                                                    height: "42px",
                                                    borderRadius: "12px",
                                                    background: "rgba(21, 99, 223, 0.1)",
                                                    color: "#1563df",
                                                    fontWeight: "700",
                                                    fontSize: "16px",
                                                }}
                                            >
                                                {step.number}
                                            </span>
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#1563df",
                                                    background: "rgba(21, 99, 223, 0.08)",
                                                    border: "1px solid rgba(21, 99, 223, 0.2)",
                                                    borderRadius: "999px",
                                                    padding: "4px 10px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {step.tag}
                                            </span>
                                        </div>
                                        <h5 className="mb-10">{step.title}</h5>
                                        <p className="text-variant-1 body-2 mb-0">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flat-section pt-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div
                                    className="wow fadeInUp"
                                    data-wow-delay=".1s"
                                    style={{
                                        borderRadius: "18px",
                                        border: "1px solid #dce8fb",
                                        background: "linear-gradient(135deg, #f8fbff 0%, #edf4ff 100%)",
                                        padding: "28px",
                                        height: "100%",
                                    }}
                                >
                                    <div className="text-subtitle text-primary">For Homeowners & Sellers</div>
                                    <h4 className="mt-8 mb-10">Build trust before listing your home</h4>
                                    <ul className="list">
                                        <li className="text-variant-1">Claim your property profile and verify ownership.</li>
                                        <li className="text-variant-1">Collect old and new maintenance records in one timeline.</li>
                                        <li className="text-variant-1">Share report links with buyers to reduce negotiation friction.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div
                                    className="wow fadeInUp"
                                    data-wow-delay=".2s"
                                    style={{
                                        borderRadius: "18px",
                                        border: "1px solid #dce8fb",
                                        background: "linear-gradient(135deg, #ffffff 0%, #f7faff 100%)",
                                        padding: "28px",
                                        height: "100%",
                                    }}
                                >
                                    <div className="text-subtitle text-primary">For Buyers, Agents & Providers</div>
                                    <h4 className="mt-8 mb-10">Buy, advise, and service with confidence</h4>
                                    <ul className="list">
                                        <li className="text-variant-1">Buyers unlock reports and avoid hidden repair costs.</li>
                                        <li className="text-variant-1">Agents use health score insights during due diligence.</li>
                                        <li className="text-variant-1">Providers grow credibility through verified job history.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="flat-section pt-0 flat-banner wow fadeInUpSmall" data-wow-delay=".2s" data-wow-duration="2000ms">
                    <div className="container">
                        <div className="wrap-banner bg-primary-new">
                            <div className="box-left">
                                <div className="box-title">
                                    <div className="text-subtitle text-primary">Get Started</div>
                                    <h3 className="mt-4 fw-8">Ready to unlock smarter property decisions?</h3>
                                </div>
                                <div className="d-flex gap-12 flex-wrap">
                                    <a href="/" className="tf-btn primary size-1">
                                        Explore Home
                                    </a>
                                    <a href="/contact-us" className="tf-btn btn-line">
                                        Contact Team
                                    </a>
                                </div>
                            </div>
                            <div className="box-right">
                                <img src="https://homelengo.vercel.app/images/banner/banner.png" alt="banner" />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default HowItWorks;
