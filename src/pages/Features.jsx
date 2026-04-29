import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";
import { initScrollAnimations } from "../animations";

const FEATURES = [
    {
        title: "Verified Service Timeline",
        desc: "Every repair, inspection, and upgrade is connected to the property with date-stamped records and provider details.",
        tag: "Trust",
        icon: "01",
    },
    {
        title: "Property Health Score",
        desc: "A smart score summarizes the overall condition of the property based on maintenance consistency and overdue items.",
        tag: "Insights",
        icon: "02",
    },
    {
        title: "Buyer Reports on Demand",
        desc: "Buyers and agents can unlock complete reports before making offers, reducing hidden-risk surprises at closing.",
        tag: "Reports",
        icon: "03",
    },
    {
        title: "Provider Reputation Engine",
        desc: "Service providers build a trusted digital portfolio as each completed job is verified and attached to the property.",
        tag: "Growth",
        icon: "04",
    },
    {
        title: "Owner Dashboard",
        desc: "Homeowners manage records, upload documents, track upcoming maintenance, and share history in one place.",
        tag: "Control",
        icon: "05",
    },
    {
        title: "Deal-Ready Sharing Tools",
        desc: "Generate secure share links for agents and buyers to accelerate due diligence and improve closing confidence.",
        tag: "Speed",
        icon: "06",
    },
];

const Features = () => {
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
                    style={{ backgroundImage: "url(https://homelengo.vercel.app/images/page-title/page-title-1.jpg)" }}
                >
                    <div className="container">
                        <div className="breadcrumb-content">
                            <ul className="breadcrumb">
                                <li><a href="/" className="text-white">Home</a></li>
                                <li className="text-white">/ Features</li>
                            </ul>
                            <h1 className="text-center text-white title">Features</h1>
                            <p className="text-center text-white body-2 mt-12">
                                Powerful tools built to make property history clear, verified, and actionable.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flat-section">
                    <div className="container">
                        <div className="box-title text-center wow fadeInUp" data-wow-delay=".1s" data-wow-duration="2000ms">
                            <div className="text-subtitle text-primary">Platform Highlights</div>
                            <h3 className="title mt-4">Everything needed for transparent property decisions</h3>
                            <p className="desc text-variant-1 mt-12">
                                From verified service records to buyer-ready reports, each feature is designed to reduce risk and improve trust.
                            </p>
                        </div>

                        <div className="row mt-30 g-4">
                            {FEATURES.map((feature) => (
                                <div key={feature.icon} className="col-lg-4 col-md-6">
                                    <div
                                        className="wow fadeInUp"
                                        data-wow-delay=".2s"
                                        data-wow-duration="2000ms"
                                        style={{
                                            background: "#ffffff",
                                            border: "1px solid #e9eef5",
                                            borderRadius: "16px",
                                            padding: "24px",
                                            height: "230px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            flexDirection: "column",
                                            gap: "10px",
                                            boxShadow: "0 10px 30px rgba(14, 44, 87, 0.06)",
                                        }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-14 w-100">
                                            <span
                                                style={{
                                                    width: "44px",
                                                    height: "44px",
                                                    borderRadius: "12px",
                                                    background: "rgba(21, 99, 223, 0.1)",
                                                    color: "#1563df",
                                                    fontWeight: "700",
                                                    fontSize: "15px",
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {feature.icon}
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
                                                {feature.tag}
                                            </span>
                                        </div>
                                        <h5 className="mb-0 w-100" style={{ fontSize: "21px", fontWeight: "800" }}>{feature.title}</h5>
                                        <p className="text-variant-1 body-2 mb-0" style={{ fontSize: "15px" }}>{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="flat-section pt-0">
                    <div className="container">
                        <div
                            className="wow fadeInUp"
                            data-wow-delay=".2s"
                            style={{
                                borderRadius: "18px",
                                border: "1px solid #dce8fb",
                                background: "linear-gradient(135deg, #f5f9ff 0%, #eaf2ff 100%)",
                                padding: "28px",
                            }}
                        >
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    <div className="text-subtitle text-primary">Why this matters</div>
                                    <h4 className="mt-8 mb-10">No more guesswork in property transactions</h4>
                                    <p className="text-variant-1 mb-0">
                                        Buyers avoid expensive surprises, homeowners prove proper maintenance, and providers grow trust with every verified service entry.
                                    </p>
                                </div>
                                <div className="col-lg-4 text-lg-end mt-lg-0 mt-20">
                                    <a href="/how-it-works" className="tf-btn primary size-1">
                                        See How It Works
                                    </a>
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
                                    <div className="text-subtitle text-primary">Explore More</div>
                                    <h3 className="mt-4 fw-8">Start with one report, decide with full confidence</h3>
                                </div>
                                <div className="d-flex gap-12 flex-wrap">
                                    <a href="/pricing" className="tf-btn primary size-1">View Pricing</a>
                                    <a href="/contact-us" className="tf-btn btn-line">Contact Us</a>
                                </div>
                            </div>
                            <div className="box-right">
                                <img src="https://homelengo.vercel.app/images/banner/banner.png" alt="feature banner" />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default Features;
