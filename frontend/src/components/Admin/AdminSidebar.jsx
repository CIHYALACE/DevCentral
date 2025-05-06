import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminSideBar({ active, onItemClick }) {
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "fa-solid fa-gauge-high" },
        { name: "Programs", path: "/admin/programs", icon: "fa-solid fa-grip" },
        { name: "Reviews", path: "/admin/reviews", icon: "fa-solid fa-star" },
        { name: "Media", path: "/admin/media", icon: "fa-solid fa-images" },
        { name: "User Tokens", path: "/admin/tokens", icon: "fa-solid fa-user-tag" },
        { name: "Categories", path: "/admin/categories", icon: "fa-solid fa-folder" },
        { name: "Requests", path: "/admin/requests", icon: "fa-solid fa-user-plus" },
    ];


    const handleClick = () => {
        if (onItemClick) onItemClick();
    };

    return (
        <div className="bg-white h-100 border-end sidebar-wrapper">
            <div className="text-center p-4 border-bottom bg-primary text-white">
                <h4 className="mb-0 text-truncate">Admin Panel</h4>
                <p className="small mb-0 mt-1 opacity-75 text-truncate">Manage Your Content</p>
            </div>
            
            <nav className="mt-2">
                <ul className="nav flex-column">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item" onClick={handleClick}>
                            <Link 
                                to={item.path}
                                className={`nav-link py-2 px-3 d-flex align-items-center ${active === item.name ? 'active text-primary fw-bold' : 'text-dark'}`}
                            >
                                <div className="d-flex align-items-center sidebar-link-content">
                                    <i className={`${item.icon} flex-shrink-0 me-2`}></i>
                                    <span className="text-truncate">{item.name}</span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
