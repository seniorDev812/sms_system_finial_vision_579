
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function DeviceStatus() {
  const deviceData = [
    { label: "All Devices", value: 11, color: "bg-blue-500", total: 15 },
    { label: "Valid Devices", value: 5, color: "bg-green-500", total: 11 },
    { label: "Invalid Devices", value: 6, color: "bg-red-500", total: 11 }
  ];

  const portData = [
    { label: "Total Ports", value: 212, color: "bg-blue-500", total: 250 },
    { label: "Valid Ports", value: 0, color: "bg-green-500", total: 212 },
    { label: "Invalid Ports", value: 212, color: "bg-red-500", total: 212 }
  ];

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardTitle className="text-xl font-bold">Device Status</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Device Overview</h3>
            {deviceData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-lg font-bold text-gray-900">{item.value}</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={(item.value / item.total) * 100} 
                    className="h-3 bg-gray-200"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Port Overview</h3>
            {portData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  <span className="text-lg font-bold text-gray-900">{item.value}</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={(item.value / item.total) * 100} 
                    className="h-3 bg-gray-200"
                  />
                  <div 
                    className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${item.color}`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
