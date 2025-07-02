import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { BarChart3, Calendar, CheckCircle, Clock } from "lucide-react";

export function CampaignStatus() {
  const campaigns = [
    {
      id: 1,
      name: "Black Friday Sale",
      status: "active",
      progress: 75,
      sent: 7500,
      total: 10000,
      deliveryRate: 98.5,
      scheduled: "2024-06-19 10:00",
      type: "promotional"
    },
    {
      id: 2,
      name: "Welcome Series",
      status: "scheduled",
      progress: 0,
      sent: 0,
      total: 5000,
      deliveryRate: 0,
      scheduled: "2024-06-20 09:00",
      type: "automated"
    },
    {
      id: 3,
      name: "Product Update",
      status: "completed",
      progress: 100,
      sent: 15000,
      total: 15000,
      deliveryRate: 97.8,
      scheduled: "2024-06-18 14:00",
      type: "notification"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      completed: "bg-gray-100 text-gray-800",
      paused: "bg-yellow-100 text-yellow-800"
    };
    return colors[status] || colors.active;
  };

  const getStatusIcon = (status) => {
    const icons = {
      active: BarChart3,
      scheduled: Calendar,
      completed: CheckCircle,
      paused: Clock
    };
    const Icon = icons[status] || BarChart3;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Campaign Status</CardTitle>
        <CardDescription>Monitor your active and scheduled campaigns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{campaign.name}</span>
                    <Badge variant="outline" className="text-xs">{campaign.type}</Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(campaign.status)}>
                  <span className="flex items-center space-x-1">
                    {getStatusIcon(campaign.status)}
                    <span>{campaign.status}</span>
                  </span>
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{campaign.sent.toLocaleString()} / {campaign.total.toLocaleString()} sent</span>
                  <span>{campaign.progress}%</span>
                </div>
                <Progress value={campaign.progress} className="h-2" />
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Delivery Rate: {campaign.deliveryRate}%</span>
                  <span>Scheduled: {campaign.scheduled}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
