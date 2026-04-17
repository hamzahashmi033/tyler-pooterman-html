import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contactus from "../pages/Contactus";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/pricing";
import Features from "../pages/Features";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact-us" element={<Contactus />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;