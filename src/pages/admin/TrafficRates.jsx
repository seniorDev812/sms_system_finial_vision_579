import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Plus, Search, Edit, Trash2, Upload, BarChart3, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from '../../hooks/use-toast';

export default function TrafficRates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const { toast } = useToast();
  
  const [trafficRates, setTrafficRates] = useState([
    {
      id: 1,
      country: "United States",
      prefix: "+1",
      rate: "$0.045",
      dailyLimit: "50,000",
      currentUsage: "32,450",
      priority: 1,
      vendor: "GlobalSMS SMPP",
      status: "active"
    },
    {
      id: 2,
      country: "United Kingdom",
      prefix: "+44", 
      rate: "$0.038",
      dailyLimit: "25,000",
      currentUsage: "18,200",
      priority: 2,
      vendor: "FastRoute HTTP",
      status: "active"
    },
    {
      id: 3,
      country: "Germany",
      prefix: "+49",
      rate: "$0.042",
      dailyLimit: "30,000",
      currentUsage: "22,100",
      priority: 1,
      vendor: "GlobalSMS SMPP",
      status: "active"
    },
    {
      id: 4,
      country: "India",
      prefix: "+91",
      rate: "$0.022",
      dailyLimit: "100,000",
      currentUsage: "87,500",
      priority: 3,
      vendor: "FastRoute HTTP",
      status: "restricted"
    }
  ]);

  const handleAddRate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRate = {
      id: Date.now(),
      country: formData.get('country'),
      prefix: formData.get('prefix'),
      rate: formData.get('rate'),
      dailyLimit: formData.get('dailyLimit'),
      currentUsage: "0",
      priority: parseInt(formData.get('priority')),
      vendor: formData.get('vendor'),
      status: "active"
    };
    
    setTrafficRates([...trafficRates, newRate]);
    setShowAddForm(false);
    toast({
      title: "Success",
      description: "Traffic rate added successfully",
    });
  };

  const handleEditRate = (rate) => {
    setEditingRate(rate);
    setShowAddForm(true);
  };

  const handleUpdateRate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedRate = {
      ...editingRate,
      country: formData.get('country'),
      prefix: formData.get('prefix'),
      rate: formData.get('rate'),
      dailyLimit: formData.get('dailyLimit'),
      priority: parseInt(formData.get('priority')),
      vendor: formData.get('vendor'),
    };
    
    setTrafficRates(trafficRates.map(rate => 
      rate.id === editingRate.id ? updatedRate : rate
    ));
    setShowAddForm(false);
    setEditingRate(null);
    toast({
      title: "Success",
      description: "Traffic rate updated successfully",
    });
  };

  const handleDeleteRate = (id) => {
    setTrafficRates(trafficRates.filter(rate => rate.id !== id));
    toast({
      title: "Success",
      description: "Traffic rate deleted successfully",
    });
  };

  const handleCSVUpload = () => {
    toast({
      title: "CSV Upload",
      description: "CSV upload functionality would be implemented here",
    });
  };

  const filteredRates = trafficRates.filter(rate =>
    rate.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.prefix.includes(searchTerm) ||
    rate.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Traffic & Rates Management
            </h1>
            <p className="text-gray-600 mt-2">Manage country-wise SMS rates and traffic rules</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleCSVUpload} className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Upload className="h-4 w-4 mr-2" />
              Upload CSV
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Rate
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Routes", value: "147", change: "+5", icon: BarChart3, gradient: "from-purple-500 to-blue-500" },
            { title: "Avg. Rate", value: "$0.035", change: "-$0.003", icon: DollarSign, gradient: "from-blue-500 to-cyan-500" },
            { title: "Daily Volume", value: "205K", change: "+12%", icon: TrendingUp, gradient: "from-cyan-500 to-teal-500" },
            { title: "Active Vendors", value: "12", change: "+1", icon: BarChart3, gradient: "from-teal-500 to-green-500" }
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
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-purple-50">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by country, prefix, or vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Traffic & Rates Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-purple-100">
            <CardTitle className="text-gray-900">Traffic & Rates</CardTitle>
            <CardDescription>Manage country-wise SMS rates and traffic rules</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Prefix</TableHead>
                  <TableHead className="font-semibold">Rate</TableHead>
                  <TableHead className="font-semibold">Daily Limit</TableHead>
                  <TableHead className="font-semibold">Usage</TableHead>
                  <TableHead className="font-semibold">Priority</TableHead>
                  <TableHead className="font-semibold">Vendor</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id} className="hover:bg-purple-50/50 transition-colors">
                    <TableCell className="font-medium">{rate.country}</TableCell>
                    <TableCell className="font-mono">{rate.prefix}</TableCell>
                    <TableCell className="font-semibold text-green-600">{rate.rate}</TableCell>
                    <TableCell>{rate.dailyLimit}</TableCell>
                    <TableCell>{rate.currentUsage}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-blue-200 text-blue-600">
                        {rate.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{rate.vendor}</TableCell>
                    <TableCell>
                      <Badge className={rate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditRate(rate)} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteRate(rate.id)} className="border-red-200 text-red-600 hover:bg-red-50">
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

        {/* Add/Edit Rate Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-white">{editingRate ? 'Edit Rate' : 'Add New Rate'}</CardTitle>
              <CardDescription className="text-purple-100">Configure traffic rate and rules</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={editingRate ? handleUpdateRate : handleAddRate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" defaultValue={editingRate?.country || ""} placeholder="Enter country name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prefix">Prefix</Label>
                    <Input id="prefix" name="prefix" defaultValue={editingRate?.prefix || ""} placeholder="+1, +44, +49..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Rate</Label>
                    <Input id="rate" name="rate" defaultValue={editingRate?.rate || ""} placeholder="$0.045" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dailyLimit">Daily Limit</Label>
                    <Input id="dailyLimit" name="dailyLimit" defaultValue={editingRate?.dailyLimit || ""} placeholder="50,000" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Input id="priority" name="priority" type="number" defaultValue={editingRate?.priority || 1} placeholder="1" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendor">Vendor</Label>
                    <Input id="vendor" name="vendor" defaultValue={editingRate?.vendor || ""} placeholder="GlobalSMS SMPP" required />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => {
                    setShowAddForm(false);
                    setEditingRate(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    {editingRate ? 'Update Rate' : 'Add Rate'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
