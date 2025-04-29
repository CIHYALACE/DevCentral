import React from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import '../style/UserProfile.css';
import '../style/Devices.css';

export default function Devices() {
  return (
    <div>
      <div className="user-profile">
        <div className="info-section">
          <h2 className="section-title">Your Devices</h2>
          <p className="section-description">Manage devices where your account is logged in.</p>
          <div className="device-list">
            <p>No devices currently linked.</p>
            <button className="manage-button">Link New Device</button>
          </div>
        </div>
      </div>
    </div>
  );
}
