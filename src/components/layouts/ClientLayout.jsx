import React from 'react';
import { SidebarProvider } from '../ui/sidebar';
import { ClientSidebar } from '../client/ClientSidebar';
import { DashboardHeader } from '../dashboard-header';

export function ClientLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-green-50">
        <ClientSidebar />
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
