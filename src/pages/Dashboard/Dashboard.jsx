import { useState, useEffect } from 'react';
import NavMenu from '../../components/NavMenu';
import { Link } from 'react-router-dom';
import { Modal, message } from 'antd';
import { IoLogOutOutline } from "react-icons/io5";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DashboardSidebar from '../../components/DashboardSidebar';
// ============================================
// HEADER COMPONENT
// ============================================
const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const showLogoutConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            icon: <ExclamationCircleOutlined />,
            content: 'This will clear all your local data (localStorage). This action cannot be undone!',
            okText: 'Yes, Logout',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: handleLogout,
            onCancel: () => {
                console.log('Logout cancelled');
            },
        });
    };

    const handleLogout = () => {
        localStorage.clear();

        message.success('Logged out successfully!');

        window.location.href = '/';
    };
    return (
        <header className="main-header fixed-header header-dashboard">
            <div className="header-lower">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="inner-header">
                            <div className="inner-header-left">
                                <div className="logo-box d-flex">
                                    <div className="logo">
                                        <Link to="/">
                                            <img src="images/logo/logo@2x.png" alt="logo" width="174" height="44" />
                                        </Link>
                                    </div>
                                    <div className="button-show-hide">
                                        {/* <span className="icon icon-categories"></span> */}
                                    </div>
                                </div>
                                <div className="nav-outer flex align-center">
                                    <nav className="main-menu show navbar-expand-md">
                                        {/* <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                                            <NavMenu />
                                        </div> */}
                                    </nav>
                                </div>
                            </div>
                            <div className="flat-bt-top">
                                <a
                                    className="tf-btn primary"
                                    onClick={showLogoutConfirm}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <IoLogOutOutline size={20} />
                                    Logout
                                </a>
                            </div>
                            <div className="mobile-nav-toggler mobile-button" onClick={() => setMobileMenuOpen(true)}><span></span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu open">
                    <div className="close-btn" onClick={() => setMobileMenuOpen(false)}><span className="icon flaticon-cancel-1"></span></div>
                    <div className="menu-backdrop"></div>
                    <nav className="menu-box">
                        <div className="nav-logo"><a href="/"><img src="images/logo/logo@2x.png" alt="nav-logo" width="174" height="44" /></a></div>
                        <div className="bottom-canvas">
                            <div className="menu-outer"></div>
                            <div className="button-mobi-sell">
                                <a className="tf-btn primary" href="add-property.html">Submit Property</a>
                            </div>
                            <div className="mobi-icon-box">
                                <div className="box d-flex align-items-center">
                                    <span className="icon icon-phone2"></span>
                                    <div>1-333-345-6868</div>
                                </div>
                                <div className="box d-flex align-items-center">
                                    <span className="icon icon-mail"></span>
                                    <div>themesflat@gmail.com</div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

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
                <div className="title-count text-variant-1">Your listing</div>
                <div className="box-count d-flex align-items-end">
                    <h3 className="fw-8">32</h3>
                    <span className="text">/50 remaining</span>
                </div>
            </div>
        </div>
        <div className="counter-box">
            <div className="box-icon"><span className="icon icon-pending"></span></div>
            <div className="content-box">
                <div className="title-count text-variant-1">Pending</div>
                <div className="box-count d-flex align-items-end"><h3 className="fw-8">02</h3></div>
            </div>
        </div>
        <div className="counter-box">
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
        </div>
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
            <h5 className="title">New Listing</h5>
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

// Messages Widget
const MessagesWidget = () => {
    const messages = [
        { name: 'Themesflat', avatar: 'images/avatar/avt-png9.png', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque vulputate tincidunt. Maecenas lorem sapien' },
        { name: 'ThemeMu', avatar: 'images/avatar/avt-png10.png', time: '3 day ago', text: 'Nullam lacinia lorem id sapien suscipit, vitae pellentesque metus maximus. Duis eu mollis dolor. Proin faucibus eu lectus a eleifend' },
        { name: 'Cameron Williamson', avatar: 'images/avatar/avt-png11.png', time: '3 day ago', text: 'In consequat lacus augue, a vestibulum est aliquam non' },
        { name: 'Esther Howard', avatar: 'images/avatar/avt-png12.png', time: '3 day ago', text: 'Cras congue in justo vel dapibus. Praesent euismod, lectus et aliquam pretium' },
    ];
    return (
        <div className="widget-box-2 mess-box mb-20">
            <h5 className="title">Messages</h5>
            <ul className="list-mess">
                {messages.map((msg, idx) => (
                    <li key={idx} className="mess-item">
                        <div className="user-box">
                            <div className="avatar"><img src={msg.avatar} alt="avt" /></div>
                            <div className="content"><div className="name fw-6">{msg.name}</div><span className="caption-2 text-variant-3">{msg.time}</span></div>
                        </div>
                        <p>{msg.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Recent Reviews Widget
const RecentReviewsWidget = () => {
    const reviews = [
        { name: 'Bessie Cooper', avatar: 'images/avatar/avt-png13.png', time: '3 day ago', text: 'Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.', rating: 5 },
        { name: 'Annette Black', avatar: 'images/avatar/avt-png14.png', time: '3 day ago', text: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae. Aenean finibus tristique lectus, ac lobortis mauris venenatis ac.', rating: 5 },
        { name: 'Ralph Edwards', avatar: 'images/avatar/avt-png15.png', time: '3 day ago', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra semper convallis. Integer vestibulum tempus tincidunt.', rating: 5 },
        { name: 'Jerome Bell', avatar: 'images/avatar/avt-png16.png', time: '3 day ago', text: 'Fusce sit amet purus eget quam eleifend hendrerit nec a erat. Sed turpis neque, iaculis blandit viverra ut, dapibus eget nisi.', rating: 5 },
        { name: 'Albert Flores', avatar: 'images/avatar/avt-png17.png', time: '3 day ago', text: 'Donec bibendum nibh quis nisl luctus, at aliquet ipsum bibendum. Fusce at dui tincidunt nulla semper venenatis at et magna. Mauris turpis lorem, ultricies vel justo sed.', rating: 5 },
    ];
    return (
        <div className="widget-box-2 mess-box">
            <h5 className="title">Recent Reviews</h5>
            <ul className="list-mess">
                {reviews.map((rev, idx) => (
                    <li key={idx} className="mess-item">
                        <div className="user-box">
                            <div className="avatar"><img src={rev.avatar} alt="avt" /></div>
                            <div className="content"><div className="name fw-6">{rev.name}</div><span className="caption-2 text-variant-3">{rev.time}</span></div>
                        </div>
                        <p>{rev.text}</p>
                        <ul className="list-star">
                            {[...Array(rev.rating)].map((_, i) => <li key={i} className="icon icon-star"></li>)}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Chart Section with date filter
const ChartSection = () => {
    const [activeFilter, setActiveFilter] = useState('Day');
    return (
        <div className="widget-box-2 wd-chart">
            <h5 className="title">Page Inside</h5>
            <div className="wd-filter-date">
                <div className="left">
                    {['Day', 'Week', 'Month', 'Year'].map(filter => (
                        <div key={filter} className={`dates ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>{filter}</div>
                    ))}
                </div>
                <div className="right">
                    <div className="ip-group icon"><input type="date" id="datepicker3" className="ip-datepicker icon" placeholder="From Date" /></div>
                    <div className="ip-group icon"><input type="date" id="datepicker4" className="ip-datepicker icon" placeholder="To Date" /></div>
                </div>
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
                    <div className="col-xl-9">
                        <NewListingTable />
                        <ChartSection />
                    </div>
                    <div className="col-xl-3">
                        <MessagesWidget />
                        <RecentReviewsWidget />
                    </div>
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
            <div className="footer-dashboard"><p>Copyright © 2024 Home Lengo</p></div>
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
                    <Header />
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