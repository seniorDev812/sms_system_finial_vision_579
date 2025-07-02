import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Plus, Search, DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function FundsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const transactions = [
    {
      id: 1,
      clientName: "TechCorp Solutions",
      type: "credit",
      amount: "$500.00",
      description: "Account top-up",
      date: "2024-01-15",
      status: "completed",
      balance: "$2,450.00"
    },
    {
      id: 2,
      clientName: "Global Marketing Ltd",
      type: "debit",
      amount: "$45.60",
      description: "SMS campaign charges",
      date: "2024-01-15",
      status: "completed",
      balance: "$890.50"
    },
    {
      id: 3,
      clientName: "StartupBoost Inc",
      type: "credit",
      amount: "$100.00",
      description: "Manual funds addition",
      date: "2024-01-14",
      status: "pending",
      balance: "$45.20"
    },
    {
      id: 4,
      clientName: "Enterprise Corp",
      type: "debit",
      amount: "$234.80",
      description: "Bulk SMS delivery",
      date: "2024-01-14",
      status: "completed",
      balance: "$1,765.20"
    }
  ];

  const getTypeIcon = (type) => {
    return type === 'credit' ? ArrowUpRight : ArrowDownLeft;
  };

  const getTypeColor = (type) => {
    return type === 'credit' 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800"
    };
    return colors[status] || colors.pending;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Funds Management
            </h1>
            <p className="text-gray-600 mt-2">Monitor transactions and manage client funds</p>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Funds
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Total Funds", value: "$248,750", change: "+$12,340", icon: DollarSign, gradient: "from-yellow-500 to-orange-500" },
            { title: "Credits Today", value: "$5,680", change: "+$1,200", icon: TrendingUp, gradient: "from-green-500 to-teal-500" },
            { title: "Debits Today", value: "$3,240", change: "+$540", icon: TrendingUp, gradient: "from-red-500 to-pink-500" },
            { title: "Net Flow", value: "$2,440", change: "+$660", icon: TrendingUp, gradient: "from-blue-500 to-purple-500" }
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
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-yellow-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions by client name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
              <Button variant="outline" className="border-yellow-200 text-yellow-600 hover:bg-yellow-50">
                Filter by Type
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-yellow-100">
            <CardTitle className="text-gray-900">Fund Transactions</CardTitle>
            <CardDescription>All fund movements and account activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Amount</TableHead>
                  <TableHead className="font-semibold">Description</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => {
                  const TypeIcon = getTypeIcon(transaction.type);
                  return (
                    <TableRow key={transaction.id} className="hover:bg-yellow-50/50 transition-colors">
                      <TableCell className="font-medium">{transaction.clientName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded-full ${getTypeColor(transaction.type)}`}>
                            <TypeIcon className="h-3 w-3" />
                          </div>
                          <span className="capitalize">{transaction.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                      </TableCell>
                      <TableCell className="text-gray-600">{transaction.description}</TableCell>
                      <TableCell className="text-gray-500">{transaction.date}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">{transaction.balance}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Add Funds Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-yellow-50">
            <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Add Funds to Client</CardTitle>
              <CardDescription className="text-yellow-100">Credit funds to a client account</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientSelect">Select Client</Label>
                  <Input id="clientSelect" placeholder="Choose client account" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="$100.00" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Reason for fund addition..." />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                  Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
