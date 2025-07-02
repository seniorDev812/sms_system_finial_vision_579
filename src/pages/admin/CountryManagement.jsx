import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Badge } from '../../components/ui/badge';
import { Plus, Search, Edit, Trash2, Upload, Globe } from "lucide-react";
import { useToast } from '../../hooks/use-toast';

export default function CountryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const { toast } = useToast();
  
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: "United States",
      code: "US",
      mobileCode: "+1",
      status: "active"
    },
    {
      id: 2,
      name: "United Kingdom", 
      code: "GB",
      mobileCode: "+44",
      status: "active"
    },
    {
      id: 3,
      name: "Germany",
      code: "DE", 
      mobileCode: "+49",
      status: "active"
    },
    {
      id: 4,
      name: "India",
      code: "IN",
      mobileCode: "+91", 
      status: "active"
    },
    {
      id: 5,
      name: "Canada",
      code: "CA",
      mobileCode: "+1", 
      status: "active"
    }
  ]);

  const handleAddCountry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCountry = {
      id: Date.now(),
      name: formData.get('countryName'),
      code: formData.get('countryCode'),
      mobileCode: formData.get('mobileCode'),
      status: "active"
    };
    
    setCountries([...countries, newCountry]);
    setShowAddForm(false);
    toast({
      title: "Success",
      description: "Country added successfully",
    });
  };

  const handleEditCountry = (country) => {
    setEditingCountry(country);
    setShowAddForm(true);
  };

  const handleUpdateCountry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedCountry = {
      ...editingCountry,
      name: formData.get('countryName'),
      code: formData.get('countryCode'),
      mobileCode: formData.get('mobileCode'),
    };
    
    setCountries(countries.map(country => 
      country.id === editingCountry.id ? updatedCountry : country
    ));
    setShowAddForm(false);
    setEditingCountry(null);
    toast({
      title: "Success",
      description: "Country updated successfully",
    });
  };

  const handleDeleteCountry = (id) => {
    setCountries(countries.filter(country => country.id !== id));
    toast({
      title: "Success",
      description: "Country deleted successfully",
    });
  };

  const handleCSVImport = () => {
    toast({
      title: "CSV Import",
      description: "CSV import functionality would be implemented here",
    });
  };

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.mobileCode.includes(searchTerm)
  );

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Country Management
            </h1>
            <p className="text-gray-600 mt-2">Add, edit, and delete countries</p>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleCSVImport} className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </Button>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Country
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Total Countries", value: countries.length.toString(), change: "+3", icon: Globe, gradient: "from-emerald-500 to-cyan-500" },
            { title: "Active Countries", value: countries.filter(c => c.status === 'active').length.toString(), change: "+2", icon: Globe, gradient: "from-blue-500 to-indigo-500" },
            { title: "Unique Prefixes", value: new Set(countries.map(c => c.mobileCode)).size.toString(), change: "+1", icon: Globe, gradient: "from-purple-500 to-pink-500" }
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
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-emerald-50">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search countries by name, code, or mobile prefix..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Countries Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-emerald-100">
            <CardTitle className="text-gray-900">Countries</CardTitle>
            <CardDescription>Manage country information and mobile codes</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Country Name</TableHead>
                  <TableHead className="font-semibold">Country Code</TableHead>
                  <TableHead className="font-semibold">Mobile Code</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCountries.map((country) => (
                  <TableRow key={country.id} className="hover:bg-emerald-50/50 transition-colors">
                    <TableCell className="font-medium">{country.name}</TableCell>
                    <TableCell className="font-mono">{country.code}</TableCell>
                    <TableCell className="font-mono">{country.mobileCode}</TableCell>
                    <TableCell>
                      <Badge className={country.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {country.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCountry(country)} className="border-blue-200 text-blue-600 hover:bg-blue-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteCountry(country.id)} className="border-red-200 text-red-600 hover:bg-red-50">
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

        {/* Add/Edit Country Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-emerald-50">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="text-white">{editingCountry ? 'Edit Country' : 'Add New Country'}</CardTitle>
              <CardDescription className="text-emerald-100">Configure country information</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={editingCountry ? handleUpdateCountry : handleAddCountry}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="countryName">Country Name</Label>
                    <Input id="countryName" name="countryName" defaultValue={editingCountry?.name || ""} placeholder="Enter country name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countryCode">Country Code</Label>
                    <Input id="countryCode" name="countryCode" defaultValue={editingCountry?.code || ""} placeholder="US, GB, DE..." required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="mobileCode">Mobile Code</Label>
                    <Input id="mobileCode" name="mobileCode" defaultValue={editingCountry?.mobileCode || ""} placeholder="+1, +44, +49..." required />
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-8">
                  <Button type="button" variant="outline" onClick={() => {
                    setShowAddForm(false);
                    setEditingCountry(null);
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700">
                    {editingCountry ? 'Update Country' : 'Add Country'}
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
