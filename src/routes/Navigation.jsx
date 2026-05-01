import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AllServices from "../pages/AllServices";
import AllProperties from "../pages/AllProperties";
import PropertyDetails from "../pages/PropertyDetails";
import ProfileManagement from "../pages/Dashboard/pages/ProfileManagement";
import ReportManagement from "../pages/Dashboard/pages/ReportManagement";
import AddReport from "../pages/Dashboard/pages/AddReport";
import Subscription from "../pages/Dashboard/pages/Subscription";
import Message from "../pages/Dashboard/pages/Message";
import AddProperty from "../pages/Dashboard/pages/AddProperty";
import PropertyManagement from "../pages/Dashboard/pages/PropertyManagement";

import ServiceLogging from "../pages/providers/ServiceLogging";
import ToolsOverview from "../pages/providers/ToolsOverview";
import ClaimProperty from "../pages/homeowners/ClaimProperty";
import ManageRecords from "../pages/homeowners/ManageRecords";  

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        AOS.refresh();
    }, [pathname]);

    return null;
};

const Navigation = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
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
                <Route path="/all-services" element={<AllServices />} />
                <Route path="/all-properties" element={<AllProperties />} />
                <Route path="/property-deatils/:id" element={<PropertyDetails />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile-management" element={<ProfileManagement />} />
                <Route path="/dashboard/report-management" element={<ReportManagement />} />
                <Route path="/dashboard/report-management/add-report" element={<AddReport />} />
                <Route path="/dashboard/property-management" element={<PropertyManagement />} />
                <Route path="/dashboard/subscription" element={<Subscription />} />
                <Route path="/dashboard/message" element={<Message />} />
                <Route path="/dashboard/add-property" element={<AddProperty />} />

                <Route path="/providers/service-logging" element={<ServiceLogging />} />
                <Route path="/providers/tools-overview" element={<ToolsOverview />} />
                <Route path="/homeowners/claim-property" element={<ClaimProperty />} />
                <Route path="/homeowners/manage-records" element={<ManageRecords />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;