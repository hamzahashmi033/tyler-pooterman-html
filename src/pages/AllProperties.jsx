import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";
import { initScrollAnimations } from "../animations";
import { PROPERTIES } from "../data/properties";

const scoreColor = (score) => (score >= 90 ? "#16A34A" : score >= 75 ? "#1563df" : "#D97706");

const AllProperties = () => {
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
                                <li className="text-white">/ All Properties</li>
                            </ul>
                            <h1 className="text-center text-white title">All Properties</h1>
                            <p className="text-center text-white body-2 mt-12">
                                Browse all verified properties and unlock complete reports.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="flat-section">
                    <div className="container">
                        <div className="box-title text-center wow fadeInUp" data-wow-delay=".1s" data-wow-duration="2000ms">
                            <div className="text-subtitle text-primary">Verified Listings</div>
                            <h3 className="title mt-4">All properties in card view</h3>
                            <p className="desc text-variant-1 mt-12">
                                Every property below includes verified service records and a trust score.
                            </p>
                        </div>

                        <div className="row mt-30 g-4">
                            {PROPERTIES.map((property) => (
                                <div key={property.id} className="col-lg-4 col-md-6">
                                    <Link
                                        to={`/property-deatils/${property.id}`}
                                        className="wow fadeInUp"
                                        data-wow-delay=".2s"
                                        data-wow-duration="2000ms"
                                        style={{
                                            background: "#fff",
                                            border: "1px solid #d8e6f7",
                                            borderRadius: "16px",
                                            overflow: "hidden",
                                            boxShadow: "0 8px 28px rgba(21,99,223,0.09)",
                                            height: "100%",
                                            display: "block",
                                            textDecoration: "none",
                                            color: "inherit",
                                        }}
                                    >
                                        <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                                            <img
                                                src={property.img}
                                                alt={property.address}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "12px",
                                                    left: "12px",
                                                    background: "rgba(255,255,255,0.95)",
                                                    borderRadius: "8px",
                                                    padding: "4px 10px",
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                {property.type}
                                            </span>
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    top: "12px",
                                                    right: "12px",
                                                    background: "#1563df",
                                                    color: "#fff",
                                                    borderRadius: "8px",
                                                    padding: "4px 10px",
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                }}
                                            >
                                                Verified
                                            </span>
                                        </div>

                                        <div style={{ padding: "18px" }}>
                                            <h5 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>
                                                {property.address}
                                            </h5>
                                            <p className="text-variant-1" style={{ fontSize: "14px", marginBottom: "14px" }}>
                                                {property.tag}
                                            </p>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <div>
                                                    <div style={{ fontSize: "12px", color: "#8fa3bf" }}>Records</div>
                                                    <div style={{ fontSize: "14px", fontWeight: "700" }}>{property.records} verified</div>
                                                </div>
                                                <div
                                                    style={{
                                                        fontSize: "14px",
                                                        fontWeight: "800",
                                                        color: scoreColor(property.score),
                                                        background: "rgba(21,99,223,0.08)",
                                                        border: "1px solid rgba(21,99,223,0.2)",
                                                        borderRadius: "9px",
                                                        padding: "6px 10px",
                                                    }}
                                                >
                                                    Score {property.score}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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

export default AllProperties;
