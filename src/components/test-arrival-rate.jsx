import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { Progress } from "components/ui/progress";

export function TestArrivalRate() {
  return (
    <Card className="bg-white shadow-lg border-0 rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-bold">Test Arrival Rate of Device</CardTitle>
          <Select defaultValue="410">
            <SelectTrigger className="w-24 bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="410">410</SelectItem>
              <SelectItem value="411">411</SelectItem>
              <SelectItem value="412">412</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">100%</span>
              <span className="text-2xl font-bold text-purple-600">A</span>
            </div>
            <Progress value={100} className="h-4 bg-gray-200" />
            <div className="h-4 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full"></div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">80%</span>
              <span className="text-2xl font-bold text-blue-600">A</span>
            </div>
            <Progress value={80} className="h-4 bg-gray-200" />
            <div className="h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{width: '80%'}}></div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-purple-800">Average Rate</span>
              <span className="text-lg font-bold text-purple-600">90%</span>
            </div>
            <p className="text-xs text-purple-600 mt-1">Device performance metrics</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
