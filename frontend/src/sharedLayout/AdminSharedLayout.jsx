import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSideBar from "../components/Admin/AdminSidebar";
import "../style/ProfileCommon.css";

export default function AdminSharedLayout() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || 'dashboard';
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    
    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Map path to section name for sidebar highlighting
    const getActiveSectionFromPath = (path) => {
        const pathToSection = {
            'dashboard': 'Dashboard',
            'programs': 'Programs',
            'reviews': 'Reviews',
            'media': 'Media',
            'tokens': 'User Tokens',
            'categories': 'Categories'
        };
        return pathToSection[path] || 'Dashboard';
    };
    
    const activeSection = getActiveSectionFromPath(currentPath);

    return (
        <div className="d-flex flex-column vh-100">
            <AdminHeader />
            
            <div className="container-fluid flex-grow-1">
                <div className="row">
                    {/* Fixed-width sidebar */}
                    <div className="col-md-3 col-lg-2 d-md-block d-none sidebar-container">
                        <AdminSideBar active={activeSection} />
                    </div>
                    
                    {/* Mobile sidebar - shown when toggled */}
                    {isMobile && (
                        <div 
                            className={`position-fixed start-0 top-0 h-100 w-100 ${mobileSidebarOpen ? 'd-block' : 'd-none'}`}
                            style={{ zIndex: 1040, backgroundColor: 'rgba(0,0,0,0.5)' }}
                            onClick={() => setMobileSidebarOpen(false)}
                        >
                            <div 
                                className="h-100 w-75 bg-white shadow position-absolute start-0" 
                                onClick={(e) => e.stopPropagation()}
                                style={{ maxWidth: '300px' }}
                            >
                                <div className="d-flex justify-content-end p-2">
                                    <button 
                                        className="btn btn-sm btn-close" 
                                        onClick={() => setMobileSidebarOpen(false)}
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <AdminSideBar 
                                    active={activeSection} 
                                    onItemClick={() => setMobileSidebarOpen(false)}
                                />
                            </div>
                        </div>
                    )}
                    
                    {/* Main content */}
                    <main className="col-12 col-md-9 col-lg-10 ms-auto px-4 py-3">
                        {/* Mobile sidebar toggle button - only visible on mobile */}
                        {isMobile && (
                            <button 
                                className="btn btn-outline-primary mb-3 d-md-none" 
                                onClick={() => setMobileSidebarOpen(true)}
                            >
                                <i className="fa-solid fa-bars me-2"></i>
                                Menu
                            </button>
                        )}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}