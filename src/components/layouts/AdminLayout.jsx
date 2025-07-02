import React from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { AdminSidebar } from '../admin/AdminSidebar';
import { DashboardHeader } from '../dashboard-header';

export function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AdminSidebar />
        <main className="flex-1">
          <div className="p-6 space-y-6">
            <DashboardHeader />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
