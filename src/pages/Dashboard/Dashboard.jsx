import { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar';

// ============================================
// MAIN DASHBOARD COMPONENT (includes inner parts)
// ============================================

// Listing Table Row Component
const ListingRow = ({ listing, onDelete, onMarkSold, onEdit }) => (
    <tr className="file-delete">
        <td>
            <div className="listing-box">
                <div className="images">
                    <img src={listing.image} alt="images" />
                </div>
                <div className="content">
                    <div className="title"><a href="property-details-v1.html" className="link">{listing.title}</a></div>
                    <div className="text-date">Posting date: {listing.postingDate}</div>
                    <div className="text-btn text-primary">{listing.price}</div>
                </div>
            </div>
        </td>
        <td>
            <div className="status-wrap">
                <a href="#" className={`btn-status ${listing.status.toLowerCase()}`}> {listing.status}</a>
            </div>
        </td>
        <td>
            <ul className="list-action">
                <li><a className="item" onClick={() => onEdit(listing.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2413 2.9915L12.366 1.86616C12.6005 1.63171 12.9184 1.5 13.25 1.5C13.5816 1.5 13.8995 1.63171 14.134 1.86616C14.3685 2.10062 14.5002 2.4186 14.5002 2.75016C14.5002 3.08173 14.3685 3.39971 14.134 3.63416L4.55467 13.2135C4.20222 13.5657 3.76758 13.8246 3.29 13.9668L1.5 14.5002L2.03333 12.7102C2.17552 12.2326 2.43442 11.7979 2.78667 11.4455L11.242 2.9915H11.2413ZM11.2413 2.9915L13 4.75016" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Edit
                </a></li>
                <li><a className="item" onClick={() => onMarkSold(listing.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.2427 12.2427C13.3679 11.1175 14.0001 9.59135 14.0001 8.00004C14.0001 6.40873 13.3679 4.8826 12.2427 3.75737C11.1175 2.63214 9.59135 2 8.00004 2C6.40873 2 4.8826 2.63214 3.75737 3.75737M12.2427 12.2427C11.1175 13.3679 9.59135 14.0001 8.00004 14.0001C6.40873 14.0001 4.8826 13.3679 3.75737 12.2427C2.63214 11.1175 2 9.59135 2 8.00004C2 6.40873 2.63214 4.8826 3.75737 3.75737M12.2427 12.2427L3.75737 3.75737" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Sold
                </a></li>
                <li><a className="remove-file item" onClick={() => onDelete(listing.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.82667 6.00035L9.596 12.0003M6.404 12.0003L6.17333 6.00035M12.8187 3.86035C13.0467 3.89501 13.2733 3.93168 13.5 3.97101M12.8187 3.86035L12.1067 13.1157C12.0776 13.4925 11.9074 13.8445 11.63 14.1012C11.3527 14.3579 10.9886 14.5005 10.6107 14.5003H5.38933C5.0114 14.5005 4.64735 14.3579 4.36999 14.1012C4.09262 13.8445 3.92239 13.4925 3.89333 13.1157L3.18133 3.86035M12.8187 3.86035C12.0492 3.74403 11.2758 3.65574 10.5 3.59568M3.18133 3.86035C2.95333 3.89435 2.72667 3.93101 2.5 3.97035M3.18133 3.86035C3.95076 3.74403 4.72416 3.65575 5.5 3.59568M10.5 3.59568V2.98501C10.5 2.19835 9.89333 1.54235 9.10667 1.51768C8.36908 1.49411 7.63092 1.49411 6.89333 1.51768C6.10667 1.54235 5.5 2.19901 5.5 2.98501V3.59568M10.5 3.59568C8.83581 3.46707 7.16419 3.46707 5.5 3.59568" stroke="#A3ABB0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Delete
                </a></li>
            </ul>
        </td>
    </tr>
);

// Counter Stats Component
const CounterStats = () => (
    <div className="flat-counter-v2 tf-counter">
        <div className="counter-box">
            <div className="box-icon"><span className="icon icon-listing"></span></div>
            <div className="content-box">
                <div className="title-count text-variant-1">Viewed listings</div>
                <div className="box-count d-flex align-items-end">
                    <h3 className="fw-8">3</h3>
                    <span className="text">/8 remaining</span>
                </div>
            </div>
        </div>
        <div className="counter-box">
            <div className="box-icon"><span className="icon icon-pending"></span></div>
            <div className="content-box">
                <div className="title-count text-variant-1">Reports</div>
                <div className="box-count d-flex align-items-end"><h3 className="fw-8">4</h3></div>
            </div>
        </div>
        {/* <div className="counter-box">
            <div className="box-icon"><span className="icon icon-favorite"></span></div>
            <div className="content-box">
                <div className="title-count text-variant-1">Favorites</div>
                <div className="d-flex align-items-end"><h3 className="fw-8">06</h3></div>
            </div>
        </div>
        <div className="counter-box">
            <div className="box-icon"><span className="icon icon-review"></span></div>
            <div className="content-box">
                <div className="title-count text-variant-1">Reviews</div>
                <div className="d-flex align-items-end"><h3 className="fw-8">1.483</h3></div>
            </div>
        </div> */}
    </div>
);

// New Listing Table Component
const NewListingTable = () => {
    const [listings, setListings] = useState([
        { id: 1, title: 'Gorgeous Apartment Building', postingDate: 'March 22, 2024', price: '$7,500', status: 'Approved', image: 'images/home/house-18.jpg' },
        { id: 2, title: 'Mountain Mist Retreat, Aspen', postingDate: 'March 22, 2024', price: '$7,500', status: 'Approved', image: 'images/home/house-33.jpg' },
        { id: 3, title: 'Lakeview Haven, Lake Tahoe', postingDate: 'March 22, 2024', price: '$7,500', status: 'Pending', image: 'images/home/house-15.jpg' },
        { id: 4, title: 'Coastal Serenity Cottage', postingDate: 'March 22, 2024', price: '$7,500', status: 'Sold', image: 'images/home/house-23.jpg' },
        { id: 5, title: 'Sunset Heights Estate', postingDate: 'March 22, 2024', price: '$7,500', status: 'Pending', image: 'images/home/house-32.jpg' },
    ]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('Select');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const handleDelete = (id) => setListings(listings.filter(l => l.id !== id));
    const handleMarkSold = (id) => setListings(listings.map(l => l.id === id ? { ...l, status: 'Sold' } : l));
    const handleEdit = (id) => alert(`Edit property with id ${id}`);

    const filtered = listings.filter(l =>
        l.title.toLowerCase().includes(search.toLowerCase()) &&
        (filterStatus === 'Select' || l.status === filterStatus)
    );

    return (
        <div className="widget-box-2 wd-listing">
            <h5 className="title">Viewed Listings</h5>
            <div className="wd-filter">
                <div className="ip-group icon-left">
                    <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
                    <span className="icon icon-search"></span>
                </div>
                <div className="ip-group icon">
                    <input type="date" id="datepicker1" className="ip-datepicker icon" placeholder="From Date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
                </div>
                <div className="ip-group icon">
                    <input type="date" id="datepicker2" className="ip-datepicker icon" placeholder="To Date" value={toDate} onChange={e => setToDate(e.target.value)} />
                </div>
                <div className="ip-group">
                    <select className="nice-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                        <option value="Select">Select</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Sold">Sold</option>
                    </select>
                </div>
            </div>
            <div className="d-flex gap-4"><span className="text-primary fw-7">{filtered.length}</span><span className="fw-6">Results found</span></div>
            <div className="wrap-table">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr><th>Listing</th><th>Status</th><th>Action</th></tr>
                        </thead>
                        <tbody>
                            {filtered.map(listing => (
                                <ListingRow key={listing.id} listing={listing} onDelete={handleDelete} onMarkSold={handleMarkSold} onEdit={handleEdit} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <ul className="wd-navigation">
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
        <div className="main-content">
            <div className="main-content-inner">
                <div className="button-show-hide show-mb"><span className="body-1">Show Dashboard</span></div>
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
            <div className="footer-dashboard">
                <p>Copyright © 2026 Site Scouter</p>
            </div>
        </div>
    );
};

const DashboardTitleContent = ({ title, children }) => {
    return (
        <div className="main-content">
            <div className="main-content-inner">
                <div className="button-show-hide show-mb"><span className="body-1">Show Dashboard</span></div>
                <h2>{title}</h2>
                {children}
            </div>
            <div className="footer-dashboard"><p>Copyright © 2026 Site Scouter</p></div>
        </div>
    );
};

// ============================================
// APP COMPONENT (combining all)
// ============================================
const Dashboard = ({ pageTitle, children }) => {
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
                    {pageTitle ? <DashboardTitleContent title={pageTitle}>{children}</DashboardTitleContent> : <MainDashboard />}
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