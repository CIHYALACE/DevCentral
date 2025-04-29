import React from 'react';
import Sidebar from '../components/Sidebar'
import ProfileHeader from '../components/ProfileHeader'
import InfoSection from '../components/InfoSection'
// import UserProfile from '../components/UserProfile'
import  '../style/UserProfile.css'
import PaymentOptions from '../components/PaymentOptions';
import '../style/PaymentOptions.css';
import Subscriptions from '../components/Subscriptions';
import '../style/Subscriptions.css';
import Devices from '../components/Devices';
import "../style/Devices.css";
import OrderHistory from '../components/OrderHistory';
import '../style/OrderHistory.css';

export default function ProfilePage() {
  return (
        <div> 
            <ProfileHeader/>
            {/* <UserProfile/> */}
            <InfoSection/>
            <Sidebar active="Your info" />
            <PaymentOptions/>
            <Subscriptions/>
            <Devices/>
            <OrderHistory/>
        </div>
  );
}