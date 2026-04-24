import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contactus from "../pages/Contactus";
import HowItWorks from "../pages/HowItWorks";
import Pricing from "../pages/pricing";
import Features from "../pages/Features";
import TermsConditions from "../pages/TermsConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Realtors from "../pages/Realtors";
import HomeOwners from "../pages/HomeOwners";
import ServiceProfessionals from "../pages/ServiceProfessionals";
import Dashboard from "../pages/Dashboard/Dashboard";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/realtors" element={<Realtors />} />
                <Route path="/home-owners" element={<HomeOwners />} />
                <Route path="/service-professionals" element={<ServiceProfessionals />} />

                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;