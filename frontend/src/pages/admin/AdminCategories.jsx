import React from 'react';
import CategoriesManagement from '../../components/Admin/Categories';

export default function AdminCategories() {
  return (
    <div className="admin-categories">
      <h2 className="mb-4">Categories Management</h2>
      <CategoriesManagement />
    </div>
  );
}
