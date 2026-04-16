import { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { initMain } from "../js/main";
import { initShortcodes } from "../js/shortcodes";
import { initCarousels } from "../js/carousel";
import { initRangeSliders } from "../js/rangle-slider";
import { initAnimationHeading } from "../js/animation_heading";

const Contact = () => {
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
    }, []);
    return (
        <>
            <div id="wrapper">
                <div id="pagee" className="clearfix">
                    <Header />
                  
                    {/* <!-- End partner --> */}
                    <Footer />
                </div >
            </div >
        </>
    );
};

export default Contact;