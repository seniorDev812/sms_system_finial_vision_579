import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Search, Edit, Trash2, Filter, Shield } from "lucide-react";

export default function SMSFiltering() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterType, setFilterType] = useState('to-based');
  
  const filters = [
    {
      id: 1,
      name: "US Number Filter",
      type: "to-based",
      condition: "Prefix: +1",
      action: "Allow",
      status: "active",
      matches: 15240
    },
    {
      id: 2,
      name: "Spam Word Block",
      type: "content-based",
      condition: "Contains: 'lottery', 'winner'",
      action: "Block",
      status: "active",
      matches: 247
    },
    {
      id: 3,
      name: "Short Code Filter",
      type: "to-based",
      condition: "Length: < 6 digits",
      action: "Block",
      status: "active",
      matches: 89
    },
    {
      id: 4,
      name: "URL Replacement",
      type: "content-based",
      condition: "Contains: URL",
      action: "Replace",
      status: "active",
      matches: 456
    }
  ];

  const getActionColor = (action) => {
    const colors = {
      Allow: "bg-green-100 text-green-800",
      Block: "bg-red-100 text-red-800",
      Replace: "bg-blue-100 text-blue-800",
      Transform: "bg-purple-100 text-purple-800"
    };
    return colors[action] || colors.Allow;
  };

  const getTypeColor = (type) => {
    return type === 'to-based' 
      ? "bg-orange-100 text-orange-800" 
      : "bg-cyan-100 text-cyan-800";
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              SMS Filtering
            </h1>
            <p className="text-gray-600 mt-2">Create and manage SMS filtering rules</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Filter Rule
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Rules", value: "24", change: "+3", icon: Filter, gradient: "from-red-500 to-pink-500" },
            { title: "Active Filters", value: "18", change: "+2", icon: Shield, gradient: "from-pink-500 to-purple-500" },
            { title: "Blocked Today", value: "1,247", change: "+89", icon: Filter, gradient: "from-purple-500 to-blue-500" },
            { title: "Success Rate", value: "98.7%", change: "+0.5%", icon: Shield, gradient: "from-blue-500 to-red-500" }
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

        {/* Filter Tabs */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-red-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex space-x-2">
                <Button 
                  variant={filterType === 'to-based' ? 'default' : 'outline'}
                  onClick={() => setFilterType('to-based')}
                  className={filterType === 'to-based' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'border-orange-200 text-orange-600 hover:bg-orange-50'}
                >
                  TO-Based Filters
                </Button>
                <Button 
                  variant={filterType === 'content-based' ? 'default' : 'outline'}
                  onClick={() => setFilterType('content-based')}
                  className={filterType === 'content-based' ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'border-cyan-200 text-cyan-600 hover:bg-cyan-50'}
                >
                  Content-Based Filters
                </Button>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search filter rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100">
            <CardTitle className="text-gray-900">Filter Rules</CardTitle>
            <CardDescription>Manage SMS filtering and content rules</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Rule Name</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Condition</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold">Matches</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filters
                  .filter(filter => filter.type === filterType)
                  .map((filter) => (
                  <TableRow key={filter.id} className="hover:bg-red-50/50 transition-colors">
                    <TableCell className="font-medium">{filter.name}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(filter.type)}>
                        {filter.type.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{filter.condition}</TableCell>
                    <TableCell>
                      <Badge className={getActionColor(filter.action)}>
                        {filter.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-800">{filter.matches.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">
                        {filter.status}
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
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Filter Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-red-50">
            <CardHeader className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Create Filter Rule</CardTitle>
              <CardDescription className="text-red-100">Define a new SMS filtering rule</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ruleName">Rule Name</Label>
                    <Input id="ruleName" placeholder="Enter rule name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruleType">Filter Type</Label>
                    <select id="ruleType" className="w-full p-2 border border-gray-200 rounded-md">
                      <option value="to-based">TO-Based Filter</option>
                      <option value="content-based">Content-Based Filter</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label>Filter Conditions</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="condition">Condition</Label>
                      <Input id="condition" placeholder="Prefix, Contains, Length..." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value">Value</Label>
                      <Input id="value" placeholder="Condition value" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="action">Action</Label>
                  <select id="action" className="w-full p-2 border border-gray-200 rounded-md">
                    <option value="allow">Allow</option>
                    <option value="block">Block</option>
                    <option value="replace">Replace</option>
                    <option value="transform">Transform</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700">
                  Create Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
