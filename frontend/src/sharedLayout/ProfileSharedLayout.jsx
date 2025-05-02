import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import InfoSection from '../components/InfoSection';
import PaymentOptions from '../components/PaymentOptions';
import Subscriptions from '../components/Subscriptions';
import Devices from '../components/Devices';
import OrderHistory from '../components/OrderHistory';
import MyPrograms from '../pages/MyPrograms';
import AddProgram from '../pages/AddProgram';

export default function ProfileSharedLayout() {
    const [activeSection, setActiveSection] = useState("InfoSection");

    const renderContent = () => {
        switch (activeSection) {
            case "Payment options":
                return <PaymentOptions />;
            case "Subscriptions":
                return <Subscriptions />;
            case "Devices":
                return <Devices />;
            case "Order history":
                return <OrderHistory />;
            case "my programs":
                return <MyPrograms />;    
            case "Add new programs":
                return <AddProgram />;    
            default:
                return <InfoSection />;
        }
    };

    return (
        <div className="min-vh-100">
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto col-md-3 col-lg-2 px-0 bg-light border-end min-vh-100 position-fixed">
                        <Sidebar active={activeSection} setActive={setActiveSection} />
                    </div>
                    
                    <div className="col-12 col-md-9 col-lg-10 ms-auto px-4">
                        <div className="pt-4">
                            {renderContent()}
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}