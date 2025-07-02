import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Plus, Search, Edit, Trash2, DollarSign, Activity } from "lucide-react";
import { useAdminHook } from "../../hooks/useAdminHook";

export default function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      email: "admin@techcorp.com",
      country: ["United States"],
      balance: 2450.0,
      status: "active",
      rate: 0.45,
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      name: "Global Marketing Ltd",
      email: "contact@globalmarketing.com",
      country: ["United Kingdom"],
      balance: 890.5,
      status: "active",
      rate: 0.038,
      lastActivity: "1 day ago",
    },
    {
      id: 3,
      name: "StartupBoost Inc",
      email: "hello@startupboost.com",
      country: ["Canada"],
      balance: 45.2,
      status: "suspended",
      rate: 50,
      lastActivity: "5 days ago",
    },
  ]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    password: "",
    country: [],
    rate: 0,
    balance: 0,
  });

  const {getAllUsers, createClient} = useAdminHook();

  const filteredClients = clients.filter(
    (client) =>
      (client.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.country[0] || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getAllClients = async () => {
    try {
      let res = await getAllUsers();
      setClients(res.data.users);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || colors.active;
  };

  const handleCreateClient = async () => {
    try {
      
      let res = await createClient(newClient);
      setClients([...clients, res.data.client]);

      toast.success("Client created successfully!");
      setShowAddForm(false);
      setNewClient({ name: "", email: "", country: "", rate: "", balance: "" });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error(
            "Endpoint not found (404). Please check your backend API route."
          );
        } else {
          toast.error(
            error.response.data.message || "Failed to create client."
          );
        }
      } else if (error.request) {
        toast.error(
          "Network error. Please check if your backend server is running."
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    getAllClients();
  },[])

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Client Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage clients, accounts, and permissions
            </p>
          </div>
          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Total Clients",
              value: clients.length,
              change: "+12",
              icon: Activity,
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Active Clients",
              value: clients.filter((c) => c.status === "active").length,
              // value: "active",
              change: "+8",
              icon: Activity,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "Total Balance",
              value: "$45,892",
              change: "+$2,340",
              icon: DollarSign,
              gradient: "from-yellow-500 to-orange-500",
            },
            {
              title: "Avg. Rate",
              value: "$0.041",
              change: "-$0.002",
              icon: DollarSign,
              gradient: "from-purple-500 to-pink-500",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-0 shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}
              ></div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient}`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search clients by name, email, or country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
              <Button
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Filter by Status
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
            <CardTitle className="text-gray-900">Client Accounts</CardTitle>
            <CardDescription>
              Manage client accounts and settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Client</TableHead>
                  <TableHead className="font-semibold">Country</TableHead>
                  <TableHead className="font-semibold">Balance</TableHead>
                  <TableHead className="font-semibold">Rate</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Last Activity</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="hover:bg-purple-50/50 transition-colors"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {client.name}
                        </p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{client.country[0]}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {client.balance}
                    </TableCell>
                    <TableCell>{client.rate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {client.lastActivity}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <DollarSign className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
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

        {/* Add Client Form */}
        {showAddForm && (
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Add New Client</CardTitle>
              <CardDescription className="text-purple-100">
                Create a new client account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clientName"> Name</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter company name"
                    value={newClient.name}
                    onChange={(e) =>
                      setNewClient({ ...newClient, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientEmail">Email Address</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="admin@company.com"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="Select country"
                    value={newClient.country}
                    onChange={(e) =>
                      setNewClient({ ...newClient, country: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="newClient222"
                    value={newClient.password}
                    onChange={(e) => {
                      setNewClient({ ...newClient, password: e.target.value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rate">SMS Rate</Label>
                  <Input
                    id="rate"
                    placeholder="$0.045"
                    value={newClient.rate}
                    onChange={(e) =>
                      setNewClient({ ...newClient, rate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="initialBalance">Initial Balance</Label>
                  <Input
                    id="initialBalance"
                    placeholder="$0.00"
                    value={newClient.balance}
                    onChange={(e) =>
                      setNewClient({ ...newClient, balance: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  onClick={handleCreateClient}
                >
                  Create Client
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
