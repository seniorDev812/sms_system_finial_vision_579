import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '../ui/sidebar';
import { LayoutDashboard, Users, Globe, Settings, Package, DollarSign, BarChart3, Shield, Router, MessageSquare, Filter } from 'lucide-react';
import { useNavigate, NavLink } from 'react-router-dom';

const clientMenuItems = [
  {
    title: "Dashboard",
    url: "/client/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Send Quick SMS",
    url: "/sms/quick",
    icon: Filter,
  },
  {
    title: "Send Bulk SMS",
    url: "/sms/bulk",
    icon: Router,
  },
  {
    title: "Send from File",
    url: "/sms/file",
    icon: Package,
  },
  {
    title: "Campaign Management",
    url: "/CampaignCreation",
    icon: DollarSign,
  },
  {
    title: "Group Management",
    url: "/GroupManagement",
    icon: Users,
  },
  {
    title: "Content Templates",
    url: "/ContentTemplates",
    icon: Globe,
  },
  {
    title: "Sender IDs",
    url: "/SenderIds",
    icon: MessageSquare,
  },
  {
    title: "Delivery Reports",
    url: "/DeliveryReports",
    icon: BarChart3,
  },
  {
    title: "Queued Messages",
    url: "/QueuedMessages",
    icon: Shield,
  },
  {
    title: "Account Settings",
    url: "/AccountSettings",
    icon: Settings,
  },
];

export function ClientSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-lg">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Client Portal
            </h2>
            <p className="text-sm text-gray-500">SMS Marketing</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {clientMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={({ isActive }) => isActive ? 'active' : ''}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.title}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
