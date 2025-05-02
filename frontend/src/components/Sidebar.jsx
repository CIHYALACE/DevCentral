import React from "react";
import "../style/UserProfile.css";
import sideimg from "../assets/tiktok-profile-picture-template_742173-4482.avif";
const menu = [
  "my programs",
  "Add new programs",
  "Your info",
  "Subscriptions",
  "Devices",
  "Order history",
  "Payment options",
];

export default function Sidebar({ active , setActive }) {
  return (
    <aside className="sidebar">
      <div className="user">
        <img src={sideimg} alt="avatar" className="avatar" />
        <div className="user-name">Rawan El-Saadany</div>
        <div className="user-email">rawanemad500@gmail.com</div>
      </div>
      <ul className="sidebar-menu">
        {menu.map((item, i) => (
          <li key={i} className={active === item ? "active" : "" } onClick={() => setActive(item)}>
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
