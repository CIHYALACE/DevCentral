import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/UserProfile.css";
import sideimg from "../assets/tiktok-profile-picture-template_742173-4482.avif";

const menuItems = [
  { name: "Your info", path: "/profile", icon: "fa-solid fa-user" },
  { name: "my programs", path: "/profile/my-programs", icon: "fa-solid fa-grip" },
  { name: "Add new programs", path: "/profile/add-program", icon: "fa-solid fa-circle-plus" },
  { name: "Payment options", path: "/profile/payment-options", icon: "fa-solid fa-credit-card" },
  { name: "Subscriptions", path: "/profile/subscriptions", icon: "fa-solid fa-bolt" },
  { name: "Devices", path: "/profile/devices", icon: "fa-solid fa-mobile-screen" },
  { name: "Order history", path: "/profile/order-history", icon: "fa-solid fa-clock-rotate-left" },
];

export default function Sidebar({ active, onItemClick }) {
  
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };
  


  return (
    <div className="bg-white h-100 border-end sidebar-wrapper">
      <div className="text-center p-4 border-bottom">
        <img 
          src={sideimg} 
          alt="Profile" 
          className="rounded-circle mb-3" 
          style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
        />
        <h5 className="mb-1 text-truncate">Rawan El-Saadany</h5>
        <p className="text-muted small mb-0 text-truncate">rawanemad500@gmail.com</p>
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
