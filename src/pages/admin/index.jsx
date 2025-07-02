import React from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { AdminOverview } from '../../components/admin/AdminOverview';
import { RecentActivity } from '../../components/admin/RecentActivity';
import { VendorRouting } from '../../components/admin/VendorRouting';

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Monitor and manage your SMS platform</p>
        </div>
        
        <AdminOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity />
          <VendorRouting />
        </div>
      </div>
    </AdminLayout>
  );
}
