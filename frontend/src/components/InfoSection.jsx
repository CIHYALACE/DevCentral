import React from "react";
import profileimg from "../assets/tiktok-profile-picture-template_742173-4482.avif"

export default function InfoSection() {
  return (
    <section className="info-section">
      <div className="warning">
        ⚠ Never lose access to your Microsoft account.
        <button>Add a phone number</button>
      </div>

      <div className="photo-card">
        <img src={profileimg} alt="profile" className="big-avatar" />
        <div className="photo-info">
          <p>Personalize your account with a photo...</p>
          <button>Change photo</button>
        </div>
      </div>

      <div className="field">
        <strong>Full name</strong>
        <p>Rawan El-Saadany</p>
        <button className="edit-btn">Edit name</button>
      </div>

      <div className="info-block">
        <div className="info-row"><strong>Date of birth</strong><span>4/1/2002</span></div>
        <div className="info-row"><strong>Country or region</strong><span>Egypt</span></div>
        <div className="info-row"><strong>Language</strong><span>English (United States)</span></div>
        <div className="info-row"><strong>Regional formats</strong><span>—</span></div>
      </div>

      <div className="field">
        <strong>Email address</strong>
        <p>rawanemad500@gmail.com</p>
        <button className="edit-btn">Edit account info</button>
      </div>
    </section>
  );
}
