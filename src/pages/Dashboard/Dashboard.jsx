import { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';

// ============================================
// MAIN DASHBOARD COMPONENT (includes inner parts)
// ============================================
const DASHBOARD_HERO_IMAGE =
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1200&auto=format&fit=crop";

const DASHBOARD_STATS = [
    {
        key: "viewed",
        title: "Viewed Listings",
        value: "3",
        helper: "/8 remaining",
        icon: "icon-listing",
        accent: "#1563df",
        bg: "linear-gradient(140deg, #eef4ff 0%, #dfeaff 100%)"
    },
    {
        key: "reports",
        title: "Reports",
        value: "4",
        helper: "submitted",
        icon: "icon-pending",
        accent: "#0f4fbe",
        bg: "linear-gradient(140deg, #edf5ff 0%, #e1eeff 100%)"
    },
    {
        key: "active",
        title: "Active Requests",
        value: "9",
        helper: "open now",
        icon: "icon-review",
        accent: "#0ea5b7",
        bg: "linear-gradient(140deg, #ecfeff 0%, #d8f7fb 100%)"
    },
    {
        key: "approved",
        title: "Approved Services",
        value: "6",
        helper: "this month",
        icon: "icon-favorite",
        accent: "#5b57d8",
        bg: "linear-gradient(140deg, #f1efff 0%, #e6e2ff 100%)"
    }
];

const LISTING_RESULTS = [
    {
        id: 1,
        title: 'Gorgeous Apartment Building',
        postingDate: 'March 22, 2024',
        price: '$7,500',
        status: 'Approved',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        title: 'Mountain Mist Retreat, Aspen',
        postingDate: 'March 22, 2024',
        price: '$7,500',
        status: 'Approved',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        title: 'Lakeview Haven, Lake Tahoe',
        postingDate: 'March 22, 2024',
        price: '$7,500',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 4,
        title: 'Coastal Serenity Cottage',
        postingDate: 'March 22, 2024',
        price: '$7,500',
        status: 'Approved',
        image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        title: 'Sunset Heights Estate',
        postingDate: 'March 22, 2024',
        price: '$7,500',
        status: 'Pending',
        image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop'
    }
];

const STATUS_META = {
    approved: { bg: "rgba(34,197,94,0.14)", color: "#15803d", border: "rgba(22,163,74,0.35)" },
    pending: { bg: "rgba(249,115,22,0.14)", color: "#c2410c", border: "rgba(249,115,22,0.35)" }
};

// Listing Table Row Component
const ListingRow = ({ listing, onDelete, onEdit }) => (
    <tr className="file-delete" style={{ borderBottom: "1px solid #e8eefb", background: "#ffffff" }}>
        <td style={{ paddingLeft: "18px" }}>
            <div className="listing-box" style={{ gap: "16px", alignItems: "center" }}>
                <div
                    className="images"
                    style={{
                        width: "116px",
                        height: "78px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #d9e5fb",
                        flexShrink: 0
                    }}
                >
                    <img
                        src={listing.image}
                        alt={listing.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="content">
                    <div className="title"><a href="property-details-v1.html" className="link" style={{ fontWeight: 700, color: "#0f172a" }}>{listing.title}</a></div>
                    <div className="text-date" style={{ color: "#6b7280", marginTop: "2px" }}>Posting date: {listing.postingDate}</div>
                    <div className="text-btn text-primary" style={{ marginTop: "5px", fontWeight: 700 }}>{listing.price}</div>
                </div>
            </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
            <div className="status-wrap">
                <span
                    className={`btn-status ${listing.status.toLowerCase()}`}
                    style={{
                        background: STATUS_META[listing.status.toLowerCase()]?.bg,
                        color: STATUS_META[listing.status.toLowerCase()]?.color,
                        border: `1px solid ${STATUS_META[listing.status.toLowerCase()]?.border}`,
                        borderRadius: "999px",
                        minWidth: "84px",
                        display: "inline-flex",
                        justifyContent: "center",
                        fontWeight: 700
                    }}
                >
                    {listing.status}
                </span>
            </div>
        </td>
        <td style={{ verticalAlign: "middle" }}>
            <ul className="list-action" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>
                    <button type="button" className="item" onClick={() => onEdit(listing.id)} style={{ border: "none", background: "transparent", color: "#475569", fontWeight: 600, padding: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Edit
                    </button>
                </li>
                <li>
                    <button type="button" className="remove-file item" onClick={() => onDelete(listing.id)} style={{ border: "none", background: "transparent", color: "#dc2626", fontWeight: 600, padding: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Delete
                    </button>
                </li>
            </ul>
        </td>
    </tr>
);

// Counter Stats Component
const CounterStats = () => (
    <div className="row g-3" style={{ marginBottom: "20px" }}>
        {DASHBOARD_STATS.map((stat) => (
            <div className="col-12 col-sm-6 col-xl-3" key={stat.key}>
                <div
                    className="counter-box"
                    style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        background: stat.bg,
                        border: "1px solid rgba(21,99,223,0.14)",
                        borderRadius: "18px",
                        boxShadow: "0 10px 22px rgba(15,79,190,0.08)",
                        height: "100%",
                        minHeight: "112px",
                        padding: "18px 16px"
                    }}
                >
                    <div
                        className="box-icon"
                        style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            borderRadius: "12px",
                            background: `${stat.accent}1A`,
                            border: `1px solid ${stat.accent}4D`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <span className={`icon ${stat.icon}`} style={{ color: stat.accent }}></span>
                    </div>
                    <div className="content-box" style={{ marginTop: "10px" }}>
                        <div className="title-count text-variant-1" style={{ color: "#566175", fontWeight: 600 }}>
                            {stat.title}
                        </div>
                        <div className="box-count d-flex align-items-end" style={{ gap: "6px" }}>
                            <h3 className="fw-8" style={{ color: "#0f1728", marginBottom: 0 }}>{stat.value}</h3>
                            <span className="text" style={{ color: "#6b7280", marginBottom: "3px" }}>{stat.helper}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// New Listing Table Component
const NewListingTable = () => {
    const [listings, setListings] = useState(LISTING_RESULTS);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('Select');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const filterBoxStyle = { borderRadius: "14px", border: "1px solid #d7e4fb", background: "linear-gradient(180deg,#fbfdff 0%,#f3f8ff 100%)" };
    const filterFieldStyle = { border: "none", outline: "none", boxShadow: "none", background: "transparent" };

    const handleDelete = (id) => setListings(listings.filter(l => l.id !== id));
    const handleEdit = (id) => alert(`Edit property with id ${id}`);

    const filtered = listings.filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === 'Select' || l.status === filterStatus)
    );

    return (
        <div
            className="widget-box-2 wd-listing"
            style={{
                borderRadius: "20px",
                border: "1px solid #e1e9fa",
                boxShadow: "0 12px 26px rgba(18,42,93,0.08)",
                background: "#ffffff",
                padding: "24px"
            }}
        >
            <h5 className="title" style={{ marginBottom: "16px" }}>Viewed Listings</h5>
            <div className="wd-filter">
                <div className="ip-group icon-left" style={filterBoxStyle}>
                    <input type="text" placeholder="Search listing title" value={search} onChange={e => setSearch(e.target.value)} style={filterFieldStyle} />
                    <span className="icon icon-search"></span>
                </div>
                <div className="ip-group icon" style={filterBoxStyle}>
                    <input type="date" id="datepicker1" className="ip-datepicker icon" placeholder="From Date" value={fromDate} onChange={e => setFromDate(e.target.value)} style={filterFieldStyle} />
                </div>
                <div className="ip-group icon" style={filterBoxStyle}>
                    <input type="date" id="datepicker2" className="ip-datepicker icon" placeholder="To Date" value={toDate} onChange={e => setToDate(e.target.value)} style={filterFieldStyle} />
                </div>
                <div className="ip-group" style={filterBoxStyle}>
                    <select className="nice-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ ...filterFieldStyle, width: "100%" }}>
                        <option value="Select">Select</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>
            <div className="d-flex gap-4" style={{ marginBottom: "14px", marginTop: "12px" }}>
                <span className="text-primary fw-7">{filtered.length}</span><span className="fw-6">Results found</span>
            </div>
            <div className="wrap-table" style={{ borderRadius: "16px", border: "1px solid #dce7fb", overflow: "hidden", marginTop: 0, background: "#fff", boxShadow: "0 14px 30px rgba(13,45,98,0.08)" }}>
                <div className="table-responsive">
                    <table className="table" style={{ marginBottom: 0, borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "linear-gradient(90deg, #0d47a8 0%, #1563df 55%, #2b7bff 100%)" }}>
                                <th style={{ borderRadius: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Listing</th>
                                <th style={{ borderRadius: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Status</th>
                                <th style={{ borderRadius: 0, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(listing => (
                                <ListingRow key={listing.id} listing={listing} onDelete={handleDelete} onEdit={handleEdit} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <ul className="wd-navigation" style={{ justifyContent: "center", paddingBottom: "16px", marginBottom: 0 }}>
                    <li><a href="#" className="nav-item"><i className="icon icon-arr-l"></i></a></li>
                    <li><a href="#" className="nav-item">1</a></li>
                    <li><a href="#" className="nav-item">2</a></li>
                    <li><a href="#" className="nav-item active">3</a></li>
                    <li><a href="#" className="nav-item">4</a></li>
                    <li><a href="#" className="nav-item">...</a></li>
                    <li><a href="#" className="nav-item"><i className="icon icon-arr-r"></i></a></li>
                </ul>
            </div>
        </div>
    );
};



// Main Dashboard Content
const MainDashboard = () => {
    return (
        <div className="main-content" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div className="main-content-inner" style={{ flex: 1 }}>
                <div className="button-show-hide show-mb"><span className="body-1">Show Dashboard</span></div>
                <div
                    style={{
                        marginBottom: "20px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        position: "relative",
                        minHeight: "180px",
                        border: "1px solid #dbe8ff",
                        backgroundImage: `linear-gradient(105deg, rgba(9, 27, 62, 0.66), rgba(9, 27, 62, 0.28)), url(${DASHBOARD_HERO_IMAGE})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-start"
                    }}
                >
                    <div style={{ padding: "26px 28px", maxWidth: "620px" }}>
                        <h4 style={{ color: "#ffffff", fontWeight: 800, marginBottom: "8px" }}>Service Professional Dashboard</h4>
                        <p style={{ color: "rgba(255,255,255,0.9)", marginBottom: 0, lineHeight: 1.6 }}>
                            Track listing views, reports, and active requests in one place. Keep your service updates
                            organized and respond faster to new opportunities.
                        </p>
                    </div>
                </div>
                <CounterStats />
                <div className="wrapper-content row">
                    <div className="col-md-12">
                        <NewListingTable />
                        {/* <ChartSection /> */}
                    </div>
                    {/* <div className="col-md-3"> */}
                    {/* <MessagesWidget /> */}
                    {/* <RecentReviewsWidget /> */}
                    {/* </div> */}
                </div>
            </div>
            <div className="footer-dashboard" style={{ textAlign: "center", borderTop: "1px solid #e3ebfb", padding: "14px 10px", marginTop: "12px", background: "#fff" }}>
                <p>Copyright © 2026 Site Scouter</p>
            </div>
        </div>
    );
};

const DashboardTitleContent = ({ title, children, hidePageHeading = false }) => {
    return (
        <div className="main-content" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div className="main-content-inner" style={{ flex: 1 }}>
                <div className="button-show-hide show-mb"><span className="body-1">Show Dashboard</span></div>
                {!hidePageHeading && <h2>{title}</h2>}
                {children}
            </div>
            <div className="footer-dashboard" style={{ textAlign: "center", borderTop: "1px solid #e3ebfb", padding: "14px 10px", marginTop: "12px", background: "#fff" }}>
                <p>Copyright © 2026 Site Scouter</p>
            </div>
        </div>
    );
};

// ============================================
// APP COMPONENT (combining all)
// ============================================
const Dashboard = ({ pageTitle, children, hidePageHeading = false }) => {
    // Preload effect simulation (optional)
    useEffect(() => {
        const preload = document.querySelector('.preload');
        if (preload) setTimeout(() => preload.classList.add('hide'), 500);
    }, []);

    useEffect(() => {
        document.title = pageTitle ? `${pageTitle} | Dashboard` : 'Dashboard';
    }, [pageTitle]);

    return (
        <div id="wrapper">
            <div id="page" className="clearfix">
                <div className="layout-wrap">
                    <DashboardSidebar />
                    {pageTitle ? <DashboardTitleContent title={pageTitle} hidePageHeading={hidePageHeading}>{children}</DashboardTitleContent> : <MainDashboard />}
                    <div className="overlay-dashboard"></div>
                </div>
            </div>
            {/* Go to top button */}
            <div className="progress-wrap">
                <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style={{ transition: 'stroke-dashoffset 10ms linear 0s', strokeDasharray: '307.919, 307.919', strokeDashoffset: '286.138' }}></path>
                </svg>
            </div>
        </div>
    );
};

export default Dashboard;