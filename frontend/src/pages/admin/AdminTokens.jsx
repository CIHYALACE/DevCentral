import React from 'react';
import TokensManagement from '../../components/Admin/Tokens';

export default function AdminTokens() {
  return (
    <div className="admin-tokens">
      <h2 className="mb-4">User Tokens Management</h2>
      <TokensManagement />
    </div>
  );
}
