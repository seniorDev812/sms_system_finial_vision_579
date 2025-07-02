import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { MessageSquare, Send, CheckCircle, XCircle, CreditCard, TrendingUp } from "lucide-react";

export function SmsMetrics() {
  const metrics = [
    {
      title: "Consumption",
      value: "8.4575€",
      icon: CreditCard,
      bgColor: "bg-gradient-to-br from-pink-500 to-rose-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Number Of Sent",
      value: "3589",
      icon: Send,
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Number Of Successes",
      value: "3410",
      icon: CheckCircle,
      bgColor: "bg-gradient-to-br from-emerald-500 to-green-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Number Of Failures",
      value: "179",
      icon: XCircle,
      bgColor: "bg-gradient-to-br from-red-500 to-pink-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Number Of Billing",
      value: "3429",
      icon: MessageSquare,
      bgColor: "bg-gradient-to-br from-cyan-500 to-blue-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    },
    {
      title: "Success Rate",
      value: "95.01%",
      icon: TrendingUp,
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-400",
      textColor: "text-white",
      iconBg: "bg-white/20"
    }
  ];

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <CardTitle className="text-xl font-bold">Today's SMS Data Overview</CardTitle>
        <p className="text-blue-100">Real-time analytics and performance metrics</p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className={`${metric.bgColor} rounded-xl p-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.iconBg}`}>
                  <metric.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className={metric.textColor}>
                <p className="text-sm opacity-90 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
