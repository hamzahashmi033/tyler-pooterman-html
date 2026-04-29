import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";
import { initScrollAnimations } from "../animations";

const SERVICES = [
    { title: "Verified Service Timeline", desc: "Track all maintenance, inspections, and repairs in one trusted timeline.", icon: "01" },
    { title: "Property Health Score", desc: "Understand home condition quickly with a clear score based on verified history.", icon: "02" },
    { title: "Buyer Report Unlock", desc: "Unlock complete due-diligence reports before offer and closing decisions.", icon: "03" },
    { title: "Owner Record Vault", desc: "Store and manage all home records securely from a single dashboard.", icon: "04" },
    { title: "Provider Verification", desc: "Verified professionals add trusted entries directly to property history.", icon: "05" },
    { title: "Maintenance Reminders", desc: "Stay ahead of costly issues with smart, date-based maintenance alerts.", icon: "06" },
    { title: "Secure Share Links", desc: "Share selected records with agents and buyers using protected links.", icon: "07" },
    { title: "Transaction Readiness", desc: "Prepare your property for sale with complete and organized service records.", icon: "08" },
    { title: "Service Performance Insights", desc: "See trends, recurring issues, and quality signals across service history.", icon: "09" },
];

const AllServices = () => {
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
                                <li className="text-white">/ All Services</li>
                            </ul>
                            <h1 className="text-center text-white title">All Services</h1>
                            <p className="text-center text-white body-2 mt-12">
                                Explore every service available on our property trust platform.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flat-section">
                    <div className="container">
                        <div className="box-title text-center wow fadeInUp" data-wow-delay=".1s" data-wow-duration="2000ms">
                            <div className="text-subtitle text-primary">Service Catalog</div>
                            <h3 className="title mt-4">All property services in one place</h3>
                            <p className="desc text-variant-1 mt-12">
                                Each service card below helps homeowners, buyers, and providers work with transparent verified data.
                            </p>
                        </div>

                        <div className="row mt-30 g-4">
                            {SERVICES.map((service) => (
                                <div key={service.icon} className="col-lg-4 col-md-6">
                                    <div
                                        className="wow fadeInUp"
                                        data-wow-delay=".2s"
                                        data-wow-duration="2000ms"
                                        style={{
                                            background: "#ffffff",
                                            border: "1px solid #e9eef5",
                                            borderRadius: "16px",
                                            padding: "24px",
                                            minHeight: "220px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            gap: "14px",
                                            boxShadow: "0 10px 30px rgba(14, 44, 87, 0.06)",
                                        }}
                                    >
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
                                            {service.icon}
                                        </span>
                                        <h5 className="mb-0" style={{ fontSize: "21px", fontWeight: "800" }}>
                                            {service.title}
                                        </h5>
                                        <p className="text-variant-1 body-2 mb-0" style={{ fontSize: "15px" }}>
                                            {service.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default AllServices;
