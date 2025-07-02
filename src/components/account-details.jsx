import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AccountDetails() {
  const accountData = [
    { label: "Sub-account Name", value: "" },
    { label: "Account Type", value: "" },
    { label: "Currency", value: "" },
    { label: "Available Balance", value: "" },
    { label: "Frozen Amount", value: "" }
  ];

  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <CardTitle className="text-lg font-bold">Account Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {accountData.map((item, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
              <span className="text-sm text-gray-900 font-semibold">
                {item.value || "—"}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">Account Status: Active</p>
          <p className="text-xs text-blue-600 mt-1">All services operational</p>
        </div>
      </CardContent>
    </Card>
  );
} 