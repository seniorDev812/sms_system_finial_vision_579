import React from 'react';
import { SidebarTrigger } from './ui/sidebar';
import { Button } from './ui/button';
import { Bell, User } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome To</h1>
          <p className="text-gray-600">SMS Marketing Platform</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
        </Button>
        <Button variant="outline" size="icon">
          <User className="h-5 w-5" />
        </Button>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Admin User</p>
          <p className="text-xs text-gray-500">Refresh Time: 08:55:48</p>
        </div>
      </div>
    </div>
  );
}
