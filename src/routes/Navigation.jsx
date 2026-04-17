import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contactus from "../pages/Contactus";
import HowItWorks from "../pages/HowItWorks";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/contact-us" element={<Contactus />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;