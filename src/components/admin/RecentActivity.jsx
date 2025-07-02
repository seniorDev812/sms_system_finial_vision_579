import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "Campaign",
      description: "Holiday Sale SMS campaign completed",
      status: "completed",
      time: "2 hours ago",
      client: "RetailCorp"
    },
    {
      id: 2,
      type: "Client",
      description: "New client account created",
      status: "active",
      time: "4 hours ago",
      client: "TechStart"
    },
    {
      id: 3,
      type: "Route",
      description: "SMPP vendor route updated",
      status: "updated",
      time: "6 hours ago",
      client: "System"
    },
    {
      id: 4,
      type: "Alert",
      description: "High delivery rate detected",
      status: "warning",
      time: "8 hours ago",
      client: "AutoAlert"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      updated: "bg-yellow-100 text-yellow-800",
      warning: "bg-orange-100 text-orange-800"
    };
    return colors[status] || colors.active;
  };

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
        <CardDescription>Latest platform activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-900 font-medium">{activity.description}</p>
                <p className="text-xs text-gray-500">{activity.client} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
