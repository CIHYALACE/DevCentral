import React from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import '../style/UserProfile.css'; // reuse existing styling
import '../style/Subscriptions.css';


export default function Subscriptions() {
  return (
    <div>
      <div className="user-profile">
        <div className="info-section">
          <h2 className="section-title">Subscriptions</h2>
          <p>You are not currently subscribed to any services.</p>
        </div>
      </div>
    </div>
  );
}
