import { Link, useLocation } from 'react-router-dom';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { IoLogOutOutline } from 'react-icons/io5';
import { Tooltip } from "antd";

const DashboardSidebar = () => {
    const { pathname } = useLocation();
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    const userEmail = userData?.email || "";
    const userRole = userData?.role || "Service Professional";
    const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "SP";
    const isActive = (route) => pathname === route;
    const isReportManagementActive = pathname.startsWith('/dashboard/report-management');
    const handleLogout = () => {
        localStorage.clear();
        message.success('Logged out successfully!');
        window.location.href = '/';
    };

    const showLogoutConfirm = () => {
        Modal.confirm({
            title: 'Are you sure you want to logout?',
            icon: <ExclamationCircleOutlined />,
            content: 'This will clear all your local data (localStorage). This action cannot be undone!',
            okText: 'Yes, Logout',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: handleLogout,
        });
    };
    const getItemStyle = (active) => ({
        marginBottom: "8px",
        borderRadius: "12px",
        overflow: "hidden",
        background: active ? "linear-gradient(135deg, rgba(21,99,223,0.22), rgba(15,79,190,0.22))" : "transparent",
        border: active ? "1px solid rgba(147,189,255,0.45)" : "1px solid transparent",
        boxShadow: active ? "0 8px 20px rgba(6,40,106,0.24)" : "none",
        transition: "all 0.25s ease"
    });

    const getLinkStyle = (active) => ({
        color: active ? "#ffffff" : "rgba(255,255,255,0.86)",
        fontWeight: 600,
        borderRadius: "12px",
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        minHeight: "48px",
        justifyContent: "space-between"
    });
    const getIconBadgeStyle = (accent, active) => ({
        width: "32px",
        height: "32px",
        minWidth: "32px",
        borderRadius: "10px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? "rgba(255,255,255,0.18)" : `${accent}1F`,
        border: `1px solid ${active ? "rgba(255,255,255,0.28)" : `${accent}66`}`,
        boxShadow: active ? "0 6px 12px rgba(5, 19, 46, 0.22)" : "none"
    });

    return (
        <div
            className="sidebar-menu-dashboard"
            style={{
                background: "linear-gradient(180deg, #0d47a8 0%, #0a3f95 45%, #073173 100%)",
            }}
        >
            <Link to="/" className="logo-box" style={{ paddingBottom: "18px", textAlign: "center", borderBottom: "1px solid rgba(201,223,255,0.18)" }}>
                <img src="/images/logo/logo-footer@2x.png" alt="" />
            </Link>
            <div
                style={{
                    marginTop: "14px",
                    marginLeft: "10px",
                    borderRadius: "999px",
                    border: "1px solid rgba(211,231,255,0.32)",
                    background: "rgba(255,255,255,0.10)",
                    color: "#e8f1ff",
                    fontSize: "12px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 12px",
                    fontWeight: 600
                }}
            >
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#61f2a2", boxShadow: "0 0 0 4px rgba(97,242,162,0.18)" }}></span>
                Workspace Active
            </div>
            <div
                className="user-box"
                style={{
                    borderRadius: "16px",
                    padding: "14px",
                    marginTop: "16px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(193,218,255,0.2)"
                }}
            >
                <p className="fw-6" style={{ color: "rgba(255,255,255,0.85)", marginBottom: "10px" }}>Profile</p>
                <div className="user" style={{ alignItems: "center" }}>
                    <div
                        className="icon-box"
                        style={{
                            background: "linear-gradient(145deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))",
                            border: "1px solid rgba(255,255,255,0.28)",
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            fontWeight: 800,
                            color: "#fff",
                            fontSize: "15px"
                        }}
                    >
                        {initials}
                    </div>
                    <div className="content">
                        <div className="caption-2 text" style={{ color: "rgba(255,255,255,0.78)" }}>{userRole}</div>
                        <div className="text-white fw-6" style={{ maxWidth: "145px" }}>
                            {userEmail && (
                                <Tooltip title={userData.email}>
                                    <span>
                                        {userData.email.split("@")[0] + "@..."}
                                    </span>
                                </Tooltip>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    marginTop: "12px",
                    marginBottom: "10px",
                    borderRadius: "14px",
                    background: "rgba(10, 29, 63, 0.38)",
                    border: "1px solid rgba(176,207,255,0.20)",
                    padding: "10px 12px",
                    color: "rgba(255,255,255,0.92)"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "12px", opacity: 0.8 }}>Plan</span>
                    <span style={{ fontSize: "11px", background: "rgba(97,242,162,0.20)", border: "1px solid rgba(97,242,162,0.5)", color: "#b7ffd7", borderRadius: "999px", padding: "2px 8px" }}>
                        Active
                    </span>
                </div>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>Professional Suite</div>
            </div>
            <div className="menu-box">
                <div className="title fw-6" style={{ color: "rgba(255,255,255,0.70)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "12px" }}>Workspace Menu</div>
                <ul className="box-menu-dashboard">
                    <li className={`nav-menu-item ${isActive('/dashboard') ? 'active' : ''}`} style={getItemStyle(isActive('/dashboard'))}>
                        <Link className="nav-menu-link" to="/dashboard" style={getLinkStyle(isActive('/dashboard'))}>
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={getIconBadgeStyle("#5AA1FF", isActive('/dashboard'))}>
                                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.75682 9.35156V15.64" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M11.0342 6.34375V15.6412" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.2412 12.6758V15.6412" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.2939 1.83398H6.70346C3.70902 1.83398 1.83203 3.95339 1.83203 6.95371V15.0476C1.83203 18.0479 3.70029 20.1673 6.70346 20.1673H15.2939C18.2971 20.1673 20.1654 18.0479 20.1654 15.0476V6.95371C20.1654 3.95339 18.2971 1.83398 15.2939 1.83398Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                Dashboard
                            </span>
                        </Link>
                    </li>

                    {/* <li className={`nav-menu-item ${isActive('/dashboard/property-management') ? 'active' : ''}`}>
                        <Link className="nav-menu-link" to="/dashboard/property-management">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.2">
                                    <path d="M10.533 2.55664H7.10561C4.28686 2.55664 2.51953 4.55222 2.51953 7.37739V14.9986C2.51953 17.8237 4.27861 19.8193 7.10561 19.8193H15.1943C18.0222 19.8193 19.7813 17.8237 19.7813 14.9986V11.3062" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.09012 10.0111L14.9404 3.16086C15.7938 2.30836 17.177 2.30836 18.0305 3.16086L19.146 4.27644C19.9995 5.12986 19.9995 6.51403 19.146 7.36653L12.2628 14.2498C11.8897 14.6229 11.3837 14.8328 10.8557 14.8328H7.42188L7.50804 11.3678C7.52087 10.8581 7.72896 10.3723 8.09012 10.0111Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M13.8984 4.21875L18.0839 8.40425" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            Property Management
                        </Link>
                    </li> */}
                    <li className={`nav-menu-item ${isReportManagementActive ? 'active' : ''}`} style={getItemStyle(isReportManagementActive)}>
                        <Link className="nav-menu-link" to="/dashboard/report-management" style={getLinkStyle(isReportManagementActive)}>
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={getIconBadgeStyle("#58D0F2", isReportManagementActive)}>
                                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.4076 8.11328L12.3346 11.4252C11.5651 12.0357 10.4824 12.0357 9.71285 11.4252L5.60547 8.11328" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.4985 19.25C18.2864 19.2577 20.1654 16.9671 20.1654 14.1518V7.85584C20.1654 5.04059 18.2864 2.75 15.4985 2.75H6.49891C3.711 2.75 1.83203 5.04059 1.83203 7.85584V14.1518C1.83203 16.9671 3.711 19.2577 6.49891 19.25H15.4985Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                Report Management
                            </span>
                        </Link>
                    </li>

                    <li className={`nav-menu-item ${isActive('/dashboard/subscription') ? 'active' : ''}`} style={getItemStyle(isActive('/dashboard/subscription'))}>
                        <Link className="nav-menu-link" to="/dashboard/subscription" style={getLinkStyle(isActive('/dashboard/subscription'))}>
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={getIconBadgeStyle("#7A86FF", isActive('/dashboard/subscription'))}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z" fill="#F1FAEE" />
                                    </svg>
                                </span>
                                Subscription
                            </span>
                        </Link>
                    </li>
                    <li className={`nav-menu-item ${isActive('/dashboard/profile-management') ? 'active' : ''}`} style={getItemStyle(isActive('/dashboard/profile-management'))}>
                        <Link className="nav-menu-link" to="/dashboard/profile-management" style={getLinkStyle(isActive('/dashboard/profile-management'))}>
                            <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <span style={getIconBadgeStyle("#A38BFF", isActive('/dashboard/profile-management'))}>
                                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.987 14.0684C7.44168 14.0684 4.41406 14.6044 4.41406 16.7511C4.41406 18.8979 7.42247 19.4531 10.987 19.4531C14.5323 19.4531 17.5591 18.9162 17.5591 16.7703C17.5591 14.6245 14.5515 14.0684 10.987 14.0684Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.9866 11.0056C13.3132 11.0056 15.1989 9.11897 15.1989 6.79238C15.1989 4.46579 13.3132 2.58008 10.9866 2.58008C8.66005 2.58008 6.77346 4.46579 6.77346 6.79238C6.7656 9.11111 8.6391 10.9977 10.957 11.0056H10.9866Z" stroke="#F1FAEE" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                Profile Management
                            </span>
                        </Link>
                    </li>
                    {/*  <li className={`nav-menu-item ${isActive('/dashboard/message') ? 'active' : ''}`}>
                        <Link className="nav-menu-link" to="/dashboard/message">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.2">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.4808 17.4814C14.6793 20.2831 10.531 20.8885 7.13625 19.3185C6.6351 19.1167 6.22423 18.9537 5.83362 18.9537C4.74565 18.9601 3.39143 20.015 2.68761 19.3121C1.98379 18.6082 3.03952 17.2529 3.03952 16.1583C3.03952 15.7677 2.88291 15.3641 2.68116 14.862C1.11046 11.4678 1.71663 7.31811 4.5181 4.51726C8.09433 0.939714 13.9045 0.939714 17.4808 4.51634C21.0635 8.09941 21.057 13.9047 17.4808 17.4814Z" stroke="#F1FAEE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14.6105 11.3802H14.6187" stroke="#F1FAEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10.9347 11.3802H10.9429" stroke="#F1FAEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.2589 11.3802H7.26715" stroke="#F1FAEE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            Message
                        </Link>
                    </li>
                   <li className={`nav-menu-item ${isActive('/dashboard/add-property') ? 'active' : ''}`}>
                        <Link className="nav-menu-link" to="/dashboard/add-property">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g opacity="0.2">
                                    <path d="M19.5 3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM19.5 19.5H4.5V4.5H19.5V19.5ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86032 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86032 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z" fill="#F1FAEE" />
                                </g>
                            </svg>
                            Add Property
                        </Link>
                    </li> */}
                    <li className="nav-menu-item" style={{ marginTop: "6px" }}>
                        <button
                            type="button"
                            className="nav-menu-link"
                            onClick={showLogoutConfirm}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.22)',
                                borderRadius: '12px',
                                textAlign: 'left',
                                color: '#fff',
                                padding: '12px 14px',
                                minHeight: '48px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                fontWeight: 600
                            }}
                        >
                            <span style={getIconBadgeStyle("#FF8C7B", false)}>
                                <IoLogOutOutline size={18} />
                            </span>
                            Logout
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    );
};

export default DashboardSidebar;
