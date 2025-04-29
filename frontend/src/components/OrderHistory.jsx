import React from 'react';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';
import '../style/UserProfile.css';
import '../style/OrderHistory.css';

export default function OrderHistory() {
  const orders = []; // Placeholder for order list

  return (
    <div>
      <ProfileHeader />
      <div className="user-profile">
        <Sidebar active="Order History" />
        <div className="info-section">
          <h2 className="section-title">Order History</h2>
          <p className="section-description">
            View your recent orders, invoices, and download receipts.
          </p>

          {orders.length === 0 ? (
            <div className="empty-state">
              <p>You haven’t placed any orders yet.</p>
              <button className="manage-button">Start Shopping</button>
            </div>
          ) : (
            <div className="order-table">
              {orders.map((order, index) => (
                <div key={index} className="order-card">
                  <p><strong>Order #{order.id}</strong></p>
                  <p>Date: {order.date}</p>
                  <p>Status: {order.status}</p>
                  <button className="view-button">View Receipt</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
