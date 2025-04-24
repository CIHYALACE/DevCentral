import React from "react";
import Sidebar from '../components/Sidebar'
import ProfileHeader from '../components/ProfileHeader'
import InfoSection from '../components/InfoSection'
import UserProfile from '../components/UserProfile'
import  '../style/UserProfile.css'

export default function UserProfilePage() {
  return (
    <div className="user-profile-page">
      <Sidebar active="Your info" />
      <main className="profile-main">
        <ProfileHeader />
        <InfoSection />
      </main>
    </div>
  );
}
