import { useState, useEffect } from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function ProfileSharedLayout() {
    const location = useLocation();
    const currentPath = location.pathname.split('/').pop() || '';
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarVisible, setSidebarVisible] = useState(!isMobile);
    
    // Check if user is authenticated
    const isAuthenticated = !!localStorage.getItem('token');
    
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
            '': 'Your info',
            'my-programs': 'my programs',
            'add-program': 'Add new programs',
            'payment-options': 'Payment options',
            'subscriptions': 'Subscriptions',
            'devices': 'Devices',
            'order-history': 'Order history'
        };
        return pathToSection[path] || 'Your info';
    };
    
    const activeSection = getActiveSectionFromPath(currentPath);
    
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <div className="profile-layout min-vh-100 d-flex flex-column">
            <Header onToggleSidebar={toggleSidebar} />
            
            <div className="container-fluid flex-grow-1">
                <div className="row h-100">
                    {/* Sidebar */}
                    <div className={`sidebar-container ${isMobile ? 'mobile' : ''} ${sidebarVisible ? 'visible' : 'hidden'}`}>
                        <div className="bg-light border-end h-100 overflow-auto">
                            <Sidebar 
                                active={activeSection} 
                                onItemClick={() => isMobile && setSidebarVisible(false)}
                            />
                        </div>
                    </div>
                    
                    {/* Main content */}
                    <div className={`main-content ${isMobile ? 'col-12' : 'col-md-9 col-lg-10 offset-md-3 offset-lg-2'}`}>
                        <div className="p-4">
                            <Outlet />
                            <Footer />
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