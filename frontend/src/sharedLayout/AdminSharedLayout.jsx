import { useState } from 'react';
import AdminHeader from "../components/Admin/AdminHeader"
import AdminSideBar from "../components/Admin/AdminSideBar"

export default function AdminSharedLayout() {
    const [activeSection, setActiveSection] = useState("Dashboard");

    const renderContent = () => {
        switch (activeSection) {
            case "Tokens":
                return <div><h2>Tokens Management</h2></div>;
            case "Categorys":
                return <div><h2>Categories Management</h2></div>;
            case "Medias":
                return <div><h2>Media Management</h2></div>;
            case "Programs":
                return <div><h2>Programs Management</h2></div>;
            case "Reviews":
                return <div><h2>Reviews Management</h2></div>;
            default:
                return <div><h2>Dashboard Overview</h2></div>;
        }
    };

    return (
        <div className="min-vh-100">
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-auto col-md-3 col-lg-2 px-0 bg-light border-end min-vh-100 position-fixed">
                        <AdminSideBar active={activeSection} setActive={setActiveSection} />
                    </div>
                    
                    {/* Main Content */}
                    <div className="col-12 col-md-9 col-lg-10 ms-auto px-4">
                        <div className="pt-4 mt-5">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}