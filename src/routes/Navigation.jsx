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
import AllServices from "../pages/AllServices";
import AllProperties from "../pages/AllProperties";
import PropertyDetails from "../pages/PropertyDetails";
import Profile from "../pages/Dashboard/pages/Profile";
import Reviews from "../pages/Dashboard/pages/Reviews";
import MyProperties from "../pages/Dashboard/pages/MyProperties";
import MyFavorite from "../pages/Dashboard/pages/MyFavorite";
import Message from "../pages/Dashboard/pages/Message";
import AddProperty from "../pages/Dashboard/pages/AddProperty";

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
                <Route path="/all-services" element={<AllServices />} />
                <Route path="/all-properties" element={<AllProperties />} />
                <Route path="/property-deatils/:id" element={<PropertyDetails />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<Profile />} />
                <Route path="/dashboard/reviews" element={<Reviews />} />
                <Route path="/dashboard/my-properties" element={<MyProperties />} />
                <Route path="/dashboard/my-favorite" element={<MyFavorite />} />
                <Route path="/dashboard/message" element={<Message />} />
                <Route path="/dashboard/add-property" element={<AddProperty />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;