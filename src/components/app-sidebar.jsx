
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  Home, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Phone, 
  Calendar,
  Clock,
  PhoneOutgoing
} from "lucide-react";

const menuItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
    active: true,
  },
  {
    title: "Today's Anomaly Detection",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "SMS Today's Statement",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "SMS Historical Report",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Voice Report",
    url: "#",
    icon: Phone,
  },
  {
    title: "Device Information",
    url: "#",
    icon: Settings,
  },
  {
    title: "Port Information",
    url: "#",
    icon: PhoneOutgoing,
  },
  {
    title: "Alarm Record",
    url: "#",
    icon: Clock,
  },
  {
    title: "SMS Test",
    url: "#",
    icon: MessageSquare,
  },
  {
    title: "SMS Test Results",
    url: "#",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-200 bg-white shadow-lg">
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SMS Platform
            </h2>
            <p className="text-sm text-gray-500">Marketing System</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={`w-full mb-1 transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-l-4 hover:border-blue-500 ${
                      item.active ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-500 text-blue-700' : ''
                    }`}
                  >
                    <a href={item.url} className="flex items-center space-x-3 px-3 py-2 rounded-lg">
                      <item.icon className={`h-5 w-5 ${item.active ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${item.active ? 'text-blue-700' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                    </a>
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
