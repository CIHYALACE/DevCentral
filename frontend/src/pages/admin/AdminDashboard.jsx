import React from 'react';
import DashboardOverview from '../../components/Admin/OverView';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2 className="mb-4">Dashboard</h2>
      <DashboardOverview />
    </div>
  );
}
