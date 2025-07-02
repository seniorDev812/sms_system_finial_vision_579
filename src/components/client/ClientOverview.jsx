import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DollarSign, MessageSquare, BarChart3, CheckCircle } from "lucide-react";

export function ClientOverview() {
  const stats = [
    {
      title: "Account Balance",
      value: "$2,847.50",
      change: "Available",
      icon: DollarSign,
      color: "green"
    },
    {
      title: "SMS Sent Today",
      value: "12,847",
      change: "+156 since yesterday",
      icon: MessageSquare,
      color: "blue"
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "3 scheduled",
      icon: BarChart3,
      color: "purple"
    },
    {
      title: "Delivery Rate",
      value: "98.7%",
      change: "Last 7 days",
      icon: CheckCircle,
      color: "emerald"
    }
  ];

  const getGradientColors = (color) => {
    const gradients = {
      green: "from-green-500 to-green-600",
      blue: "from-blue-500 to-blue-600",
      purple: "from-purple-500 to-purple-600",
      emerald: "from-emerald-500 to-emerald-600"
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
            <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
