import { useEffect } from "react";
import { initScrollAnimations } from "../animations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";
import PropertySection from "../components/PropertySection";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import VerifiedPropertiesSection from "../components/VerifiedPropertiesSection";
import PricingSection from "../components/PricingSection";
import TrustedSlider from "../components/TrustedSlider";
import ProvidersSlider from "../components/ProvidersSlider";

const Home = () => {
  useEffect(() => {
    const $ = window.jQuery || window.$;

    if (!$) {
      console.error("jQuery is not available");
      return;
    }

    const initPlugins = () => {
      try {
        initMain($);
        initShortcodes($);
        initCarousels($);
        initRangeSliders($);
        initAnimationHeading($);

        if (window.WOW) {
          new window.WOW().init();
        }

        initScrollAnimations();
      } catch (err) {
        console.error("Plugin initialization error:", err);
      }
    };

    // small delay helps when migrated sections finish rendering first
    const timer = setTimeout(() => {
      initPlugins();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, []);
    return (
        <>
            <div id="wrapper">
                <div id="pagee" className="clearfix">
                    <Header />
                    <HeroSection />

                    <PropertySection />

                    <FeaturesSection />

                    <VerifiedPropertiesSection />

                    <PricingSection />

                    <ProvidersSlider />

                    <section className="flat-section">
                        <div className="container">
                            <div className="box-title text-center wow fadeInUp" data-animate="up">
                                <div className="text-subtitle text-primary">Resources & Insights</div>
                                <h3 className="title mt-4">From the Property History Blog</h3>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <a href="#" className="flat-blog-item hover-img">
                                        <div className="img-style">
                                            <img className="lazyload" data-src="https://homelengo.vercel.app/images/blog/blog-5.jpg" src="https://homelengo.vercel.app/images/blog/blog-5.jpg" alt="img-blog" />
                                            <span className="date-post">March 14, 2025</span>
                                        </div>
                                        <div className="content-box">
                                            <div className="post-author">
                                                <span className="fw-6">Sarah Mitchell</span>
                                                <span>For Buyers</span>
                                            </div>
                                            <h5 className="title link">Why Every Buyer Should Unlock a Property History Report Before Making an Offer</h5>
                                            <p className="description">A verified service record can reveal undisclosed roof damage, aging HVAC systems, and skipped inspections — all before you commit a single dollar...</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="#" className="flat-blog-item hover-img">
                                        <div className="img-style">
                                            <img className="lazyload" data-src="https://homelengo.vercel.app/images/blog/blog-7.jpg" src="https://homelengo.vercel.app/images/blog/blog-7.jpg" alt="img-blog" />
                                            <span className="date-post">February 28, 2025</span>
                                        </div>
                                        <div className="content-box">
                                            <div className="post-author">
                                                <span className="fw-6">Daniel Park</span>
                                                <span>For Providers</span>
                                            </div>
                                            <h5 className="title link">How Service Providers Are Winning More Jobs with a Verified Digital Portfolio</h5>
                                            <p className="description">When your completed work is attached to a property record and visible to future buyers and owners, your reputation sells itself. Here's how to build yours...</p>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="#" className="flat-blog-item hover-img">
                                        <div className="img-style">
                                            <img className="lazyload" data-src="https://homelengo.vercel.app/images/blog/blog-9.jpg" src="https://homelengo.vercel.app/images/blog/blog-9.jpg" alt="img-blog" />
                                            <span className="date-post">February 10, 2025</span>
                                        </div>
                                        <div className="content-box">
                                            <div className="post-author">
                                                <span className="fw-6">Rachel Torres</span>
                                                <span>For Homeowners</span>
                                            </div>
                                            <h5 className="title link">The Property Health Score Explained: What It Measures and Why It Impacts Resale Value</h5>
                                            <p className="description">Your Property Health Score is calculated from verified service frequency, provider credentials, inspection recency, and record completeness. A high score adds real dollars at closing...</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section> */}

                    <TrustedSlider />

                    <Footer />
                </div >
            </div >
        </>
    );
};

export default Home;
