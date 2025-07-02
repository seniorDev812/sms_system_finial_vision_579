import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';

export function VendorRouting() {
  const vendors = [
    {
      id: 1,
      name: "TelecomPro SMPP",
      type: "SMPP",
      usage: 75,
      limit: 10000,
      current: 7500,
      status: "active",
      priority: 1
    },
    {
      id: 2,
      name: "GlobalSMS HTTP",
      type: "HTTP",
      usage: 45,
      limit: 5000,
      current: 2250,
      status: "active",
      priority: 2
    },
    {
      id: 3,
      name: "FastRoute SMPP",
      type: "SMPP",
      usage: 20,
      limit: 8000,
      current: 1600,
      status: "active",
      priority: 3
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800"
    };
    return colors[status] || colors.active;
  };

  const getUsageColor = (usage) => {
    if (usage >= 80) return "bg-red-500";
    if (usage >= 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Vendor Routing</CardTitle>
        <CardDescription>SMS routing performance and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">{vendor.name}</span>
                    <Badge variant="outline" className="text-xs">{vendor.type}</Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Priority {vendor.priority}</span>
                  <Badge className={getStatusColor(vendor.status)}>
                    {vendor.status}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{vendor.current.toLocaleString()} / {vendor.limit.toLocaleString()} SMS</span>
                  <span>{vendor.usage}%</span>
                </div>
                <Progress 
                  value={vendor.usage} 
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
