import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import { Plus, Search, Edit, Trash2, Globe, Activity } from "lucide-react";

export default function HTTPVendors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const vendors = [
    {
      id: 1,
      name: "GlobalSMS HTTP",
      endpoint: "https://api.globalsms.com/send",
      prefix: "+1",
      rate: "$0.042",
      limit: 5000,
      current: 3200,
      priority: 1,
      status: "active",
      method: "POST"
    },
    {
      id: 2,
      name: "FastAPI SMS",
      endpoint: "https://sms.fastapi.io/v1/send",
      prefix: "+44",
      rate: "$0.036",
      limit: 8000,
      current: 1800,
      priority: 2,
      status: "active",
      method: "POST"
    },
    {
      id: 3,
      name: "CloudSMS Gateway",
      endpoint: "https://gateway.cloudsms.net/api/send",
      prefix: "+49",
      rate: "$0.039",
      limit: 3000,
      current: 2850,
      priority: 3,
      status: "warning",
      method: "GET"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    return colors[status] || colors.active;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              HTTP Vendors
            </h1>
            <p className="text-gray-600 mt-2">Manage HTTP API vendor integrations</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add HTTP Vendor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "HTTP Vendors", value: "6", change: "+1", icon: Globe, gradient: "from-green-500 to-teal-500" },
            { title: "Active APIs", value: "5", change: "+1", icon: Activity, gradient: "from-teal-500 to-cyan-500" },
            { title: "API Calls", value: "12,580", change: "+1,240", icon: Globe, gradient: "from-cyan-500 to-blue-500" },
            { title: "Success Rate", value: "99.2%", change: "+0.3%", icon: Activity, gradient: "from-blue-500 to-green-500" }
          ].map((stat, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-green-50">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search HTTP vendors by name, endpoint, or prefix..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Vendors Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
            <CardTitle className="text-gray-900">HTTP API Vendors</CardTitle>
            <CardDescription>Monitor and manage HTTP API vendor integrations</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Vendor</TableHead>
                  <TableHead className="font-semibold">Endpoint</TableHead>
                  <TableHead className="font-semibold">Method</TableHead>
                  <TableHead className="font-semibold">Prefix</TableHead>
                  <TableHead className="font-semibold">Rate</TableHead>
                  <TableHead className="font-semibold">Usage</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => {
                  const usage = (vendor.current / vendor.limit) * 100;
                  return (
                    <TableRow key={vendor.id} className="hover:bg-green-50/50 transition-colors">
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{vendor.name}</p>
                          <p className="text-sm text-gray-500">Priority {vendor.priority}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-mono text-xs max-w-xs truncate">
                          {vendor.endpoint}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-${vendor.method === 'POST' ? 'blue' : 'green'}-200 text-${vendor.method === 'POST' ? 'blue' : 'green'}-600`}>
                          {vendor.method}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">{vendor.prefix}</TableCell>
                      <TableCell className="font-semibold text-green-600">{vendor.rate}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>{vendor.current.toLocaleString()}</span>
                            <span>{vendor.limit.toLocaleString()}</span>
                          </div>
                          <Progress value={usage} className="h-2" />
                          <p className="text-xs text-gray-500">{usage.toFixed(1)}% used</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-green-200 text-green-600">
                          {vendor.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Vendor Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Add HTTP Vendor</CardTitle>
              <CardDescription className="text-green-100">Configure a new HTTP API vendor</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vendorName">Vendor Name</Label>
                  <Input id="vendorName" placeholder="Enter vendor name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">API Endpoint</Label>
                  <Input id="endpoint" placeholder="https://api.example.com/send" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="method">HTTP Method</Label>
                  <Input id="method" placeholder="POST, GET, PUT..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prefix">Country Prefix</Label>
                  <Input id="prefix" placeholder="+1, +44, +49..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">Rate per SMS</Label>
                  <Input id="rate" placeholder="$0.042" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Daily Limit</Label>
                  <Input id="limit" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Input id="priority" placeholder="1, 2, 3..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" type="password" placeholder="API authentication key" />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                  Add Vendor
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
