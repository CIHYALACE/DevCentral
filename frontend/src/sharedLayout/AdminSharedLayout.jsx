import { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import AdminHeader from "../components/Admin/AdminHeader";
import AdminSideBar from "../components/Admin/AdminSideBar";

export default function AdminSharedLayout() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || 'dashboard';
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarVisible, setSidebarVisible] = useState(!isMobile);
    
    // Handle window resize for responsive layout
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) setSidebarVisible(true);
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
    
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <div className="admin-layout min-vh-100 d-flex flex-column">
            <AdminHeader onToggleSidebar={toggleSidebar} />
            
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    {/* Sidebar */}
                    <div className={`sidebar-container ${isMobile ? 'mobile' : ''} ${sidebarVisible ? 'visible' : 'hidden'}`}>
                        <div className="bg-light border-end h-100 overflow-auto">
                            <AdminSideBar 
                                active={activeSection} 
                                onItemClick={() => isMobile && setSidebarVisible(false)}
                            />
                        </div>
                    </div>
                    
                    {/* Main content */}
                    <div className={`main-content ${isMobile ? 'col-12' : 'col-md-9 col-lg-10 offset-md-3 offset-lg-2'}`}>
                        <div className="p-4">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Add custom CSS for responsive sidebar */}
            <style>{`
                .sidebar-container {
                    position: fixed;
                    top: 56px; /* Header height */
                    bottom: 0;
                    left: 0;
                    width: 25%; /* col-md-3 */
                    z-index: 1000;
                    transition: all 0.3s ease;
                }
                
                .sidebar-container.mobile {
                    width: 75%;
                    transform: translateX(-100%);
                }
                
                .sidebar-container.mobile.visible {
                    transform: translateX(0);
                }
                
                .sidebar-container.hidden:not(.mobile) {
                    width: 0;
                }
                
                @media (min-width: 992px) {
                    .sidebar-container {
                        width: 16.666667%; /* col-lg-2 */
                    }
                }
                
                .main-content {
                    transition: all 0.3s ease;
                }
            `}</style>
        </div>
    );
}