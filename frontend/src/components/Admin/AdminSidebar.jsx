import { Link } from 'react-router-dom';

export default function AdminSideBar({ active, onItemClick }) {
    const menuItems = [
        { name: "Dashboard", path: "/admin/dashboard", icon: "bi-speedometer2" },
        { name: "Programs", path: "/admin/programs", icon: "bi-grid" },
        { name: "Reviews", path: "/admin/reviews", icon: "bi-star" },
        { name: "Media", path: "/admin/media", icon: "bi-images" },
        { name: "User Tokens", path: "/admin/tokens", icon: "bi-person-badge" },
        { name: "Categories", path: "/admin/categories", icon: "bi-folder" },
    ];

    const handleClick = () => {
        if (onItemClick) onItemClick();
    };

    return (
        <aside className="sidebar p-0">
            <div className="user p-3 border-bottom">
                <div className="user-name fw-bold">Admin Panel</div>
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
