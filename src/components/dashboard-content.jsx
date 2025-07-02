
import React from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { DeviceStatus } from "@/components/device-status";
import { SmsMetrics } from "@/components/sms-metrics";
import { AccountDetails } from "@/components/account-details";
import { TestArrivalRate } from "@/components/test-arrival-rate";

export function DashboardContent() {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <DeviceStatus />
      <SmsMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountDetails />
        <TestArrivalRate />
      </div>
    </div>
  );
}
