import { useState } from 'react';
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSideBar from "../components/Admin/AdminSideBar";
import DashboardOverview from "../components/Admin/OverView";
import ProgramsManagement from '../components/Admin/Programs';
import ReviewsManagement from '../components/Admin/Reviews';
import TokensManagement from '../components/Admin/Tokens';
import MediaManagement from '../components/Admin/Media';
import CategoriesManagement from '../components/Admin/Categories';


export default function AdminSharedLayout() {
    const [activeSection, setActiveSection] = useState("Dashboard");

    const renderContent = () => {
        switch (activeSection) {
            case "Programs":
                return <ProgramsManagement />;
            case "Reviews":
                return <ReviewsManagement />;
            case "Media":
                return <MediaManagement />;
            case "User Tokens":
                return <TokensManagement />;
            case "categories":
                return <CategoriesManagement />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <div className="min-vh-100">
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto col-md-3 col-lg-2 px-0 bg-light border-end min-vh-100 position-fixed">
                        <AdminSideBar active={activeSection} setActive={setActiveSection} />
                    </div>
                    
                    <div className="col-12 col-md-9 col-lg-10 ms-auto px-4">
                        <div className="pt-4 mt-5">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}