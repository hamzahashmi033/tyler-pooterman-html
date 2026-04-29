import { Link, useLocation } from "react-router-dom";

const NavMenu = () => {
    const { pathname } = useLocation();
    const isActivePath = (path) => (path === "/" ? pathname === "/" : pathname.startsWith(path));
    const navClass = (baseClass, path) => `${baseClass}${isActivePath(path) ? " current" : ""}`;
    return <>
        <ul className="navigation clearfix">
            <li className={navClass("home", "/")}>
                <Link to="/">Home</Link>
            </li>
            <li className={navClass("home", "/how-it-works")}>
                <Link to="/how-it-works">How It Works</Link>
            </li>
            <li className={navClass("home", "/pricing")}>
                <Link to="/pricing">Pricing</Link>
            </li>
            <li className={navClass("home", "/features")}>
                <Link to="/features">Features</Link>
            </li>
            <li className={`dropdown2${pathname.startsWith("/providers") ? " current" : ""}`}>
                <a href="#">For Providers</a>
                <ul>
                    <li><Link to="/providers/service-logging">Service Logging</Link></li>
                    <li><Link to="/providers/tools-overview">Tools Overview</Link></li>
                </ul>
            </li>
            <li className={`dropdown2${pathname.startsWith("/homeowners") ? " current" : ""}`}>
                <a href="#">For Homeowners</a>
                <ul>
                    <li><Link to="/homeowners/claim-property">Claim Property</Link></li>
                    <li><Link to="/homeowners/manage-records">Manage Records</Link></li>
                </ul>
            </li>
            <li className={navClass("home", "/contact-us")}>
                <Link to="/contact-us">Contact Us</Link>
            </li>

            {/* <li className="dropdown2"><a href="#">Dashboard</a>
                <ul>
                    <li><a href="dashboard.html">Dashboard</a></li>
                    <li><a href="my-property.html">My Properties</a></li>
                    <li><a href="message.html">Message</a></li>
                    <li><a href="my-favorites.html">My Favorites</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="my-profile.html">My Profile</a></li>
                    <li><a href="add-property.html">Add Property</a></li>
                </ul>
            </li> */}
        </ul>
    </>
}
export default NavMenu;