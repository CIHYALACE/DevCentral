export default function AdminSideBar({ active, setActive }) {
    const menu = [
        "Dashboard",
        "Tokens",
        "Categorys",
        "Medias",
        "Programs",
        "Reviews",
    ];

    return (
        <aside className="sidebar">
            <div className="user">
                <div className="user-name">Rawan El-Saadany</div>
            </div>
            <ul className="sidebar-menu">
                {menu.map((item, i) => (
                    <li 
                        key={i} 
                        className={active === item ? "active" : ""} 
                        onClick={() => setActive(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </aside>
    );
}
