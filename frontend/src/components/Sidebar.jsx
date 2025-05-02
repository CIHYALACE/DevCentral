import React from "react";
import { Link } from "react-router-dom";
import "../style/UserProfile.css";
import sideimg from "../assets/tiktok-profile-picture-template_742173-4482.avif";

const menuItems = [
  { name: "Your info", path: "/profile", icon: "bi-person" },
  { name: "my programs", path: "/profile/my-programs", icon: "bi-grid" },
  { name: "Add new programs", path: "/profile/add-program", icon: "bi-plus-circle" },
  { name: "Payment options", path: "/profile/payment-options", icon: "bi-credit-card" },
  { name: "Subscriptions", path: "/profile/subscriptions", icon: "bi-lightning" },
  { name: "Devices", path: "/profile/devices", icon: "bi-phone" },
  { name: "Order history", path: "/profile/order-history", icon: "bi-clock-history" },
];

export default function Sidebar({ active, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) onItemClick();
  };

  return (
    <aside className="sidebar p-0">
      <div className="user p-3 border-bottom text-center">
        <img src={sideimg} alt="avatar" className="avatar mb-2" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
        <div className="user-name fw-bold">Rawan El-Saadany</div>
        <div className="user-email text-muted small">rawanemad500@gmail.com</div>
      </div>
      <ul className="sidebar-menu list-unstyled p-0 m-0">
        {menuItems.map((item, i) => (
          <li 
            key={i} 
            className={`border-bottom ${active === item.name ? "active bg-primary" : ""}`}
            onClick={handleClick}
          >
            <Link 
              to={item.path} 
              className={`d-flex align-items-center p-3 text-decoration-none ${active === item.name ? "text-white" : "text-dark"}`}
            >
              <i className={`bi ${item.icon} me-2`}></i>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
