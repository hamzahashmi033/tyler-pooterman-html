import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contactus from "../pages/Contactus";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Contactus" element={<Contactus />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Navigation;