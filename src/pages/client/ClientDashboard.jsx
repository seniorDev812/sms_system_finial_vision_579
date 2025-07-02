import React from 'react';
import { ClientLayout } from '../../components/layouts/ClientLayout';
import { ClientOverview } from '../../components/client/ClientOverview';
import { QuickActions } from '../../components/client/QuickActions';
import { CampaignStatus } from '../../components/client/CampaignStatus';

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your SMS campaigns and account</p>
        </div>
        
        <ClientOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CampaignStatus />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
