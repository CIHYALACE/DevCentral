import React from 'react';
import Sidebar from '../components/Sidebar'
import ProfileHeader from '../components/ProfileHeader'
import InfoSection from '../components/InfoSection'
import UserProfile from '../components/UserProfile'
import  '../style/UserProfile.css'

export default function ProfilePage() {
  return (
        <div> 
            <ProfileHeader/>
            <UserProfile/>
            <InfoSection/>
            <Sidebar active="Your info" />
        </div>
  );
}