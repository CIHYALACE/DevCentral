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
        <aside className="sidebar p-0 bg-light shadow-sm" style={{ minHeight: "100vh", width: "250px" }}>
            <div className="user p-4 border-bottom bg-white">
                <div className="user-name fw-bold" style={{ fontSize: "24px",color:"#a259ff"  }}>Admin Panel</div>
            </div>
            <ul className="sidebar-menu list-unstyled m-0">
                {menuItems.map((item, i) => (
                    <li
                        key={i}
                        className={`border-bottom ${active === item.name ? "active" : ""}`}
                        style={{  //
                            backgroundColor: active === item.name ? "#d0b6f5" : "",
                            transition: "background-color 0.3s",
                        }}
                        onClick={handleClick}
                    >
                        <Link
                            to={item.path}
                            className={`d-flex align-items-center px-4 py-3 text-decoration-none ${
                                active === item.name ? "text-white" : "text-dark"
                            }`}
                            style={{ fontWeight: active === item.name ? "500" : "400" }}
                        >
                            <i className={`bi ${item.icon} me-3 fs-5`}></i>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
