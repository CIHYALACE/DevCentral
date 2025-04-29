import React from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import "../style/UserProfile.css"; // Assuming this holds shared styles
import "../style/PaymentOptions.css"; // Optional: new CSS for payment section

export default function PaymentOptions() {
  return (
    <div>
      <div className="user-profile">
        <div className="payment-options-container">
          <h2>Payment Options</h2>
          <p className="section-description">
            Securely manage your saved payment methods, billing details, and
            transaction history.
          </p>

          <div className="payment-methods">
            <div className="payment-card">
              No payment methods available.
              <br />
              <button className="add-payment-btn">
                + Add New Payment Method
              </button>
            </div>
          </div>

          <div className="billing-history">
            <h3>Billing History</h3>
            <p>You have no transactions yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
