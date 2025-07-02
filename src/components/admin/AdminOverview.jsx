import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, MessageSquare, DollarSign, Router } from "lucide-react";

export function AdminOverview() {
  const stats = [
    {
      title: "Total Clients",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      color: "blue"
    },
    {
      title: "SMS Sent Today",
      value: "847,291",
      change: "+23%",
      changeType: "positive",
      icon: MessageSquare,
      color: "green"
    },
    {
      title: "Funds Distributed",
      value: "$124,847",
      change: "+8%",
      changeType: "positive",
      icon: DollarSign,
      color: "yellow"
    },
    {
      title: "Active Routes",
      value: "47",
      change: "+2",
      changeType: "positive",
      icon: Router,
      color: "purple"
    }
  ];

  const getGradientColors = (color) => {
    const gradients = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      yellow: "from-yellow-500 to-orange-500",
      purple: "from-purple-500 to-purple-600"
    };
    return gradients[color] || gradients.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getGradientColors(stat.color)} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <span className="font-medium">{stat.change}</span>
              <span className="ml-1 text-gray-500">from last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
