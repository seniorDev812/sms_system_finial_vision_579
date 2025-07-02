import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Zap, Send, Upload, Target, Users, FileText } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Send Quick SMS",
      description: "Send to up to 100K numbers",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
      href: "/sms/quick"
    },
    {
      title: "Bulk SMS",
      description: "Send to multiple groups",
      icon: Send,
      color: "from-green-500 to-green-600",
      href: "/sms/bulk"
    },
    {
      title: "Upload File",
      description: "Send from .txt file",
      icon: Upload,
      color: "from-purple-500 to-purple-600",
      href: "/sms/file"
    },
    {
      title: "New Campaign",
      description: "Create scheduled campaign",
      icon: Target,
      color: "from-orange-500 to-red-500",
      href: "/CampaignCreation"
    },
    {
      title: "Manage Groups",
      description: "Edit contact groups",
      icon: Users,
      color: "from-teal-500 to-cyan-500",
      href: "/GroupManagement"
    },
    {
      title: "Templates",
      description: "SMS content templates",
      icon: FileText,
      color: "from-indigo-500 to-purple-500",
      href: "/ContentTemplates"
    }
  ];

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 justify-start hover:shadow-md transition-all duration-200 border-gray-200 hover:border-gray-300"
              asChild
            >
              <a href={action.href} className="flex items-center space-x-3 w-full">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center flex-shrink-0`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900">{action.title}</div>
                  <div className="text-xs text-gray-500">{action.description}</div>
                </div>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
