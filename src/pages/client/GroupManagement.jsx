import React, { useState, useEffect } from "react";
import { ClientLayout } from "../../components/layouts/ClientLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Badge } from "../../components/ui/badge";
import {
  Upload,
  Users,
  Search,
  Trash2,
  Plus,
  FileText,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import Papa from "papaparse";

import { useClientHook } from "../../hooks/useClientHook";

export default function GroupManagement() {
  const [groups, setGroups] = useState([
    {
      id: "1",
      name: "VIP Customers",
      description: "Premium customer list",
      count: 1250,
      created: "2024-01-15",
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    numbers: "",
    file: "",
  });
  const [csvFile, setCsvFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const { getGroups, deleteOneGroup, createGroup } = useClientHook();

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const _groups = [
    {
      id: "1",
      name: "VIP Customers",
      count: 1250,
      description: "Premium customer list",
    },
    {
      id: "2",
      name: "Newsletter Subscribers",
      count: 8500,
      description: "Monthly newsletter recipients",
    },
    {
      id: "3",
      name: "Promotional Campaign",
      count: 3200,
      description: "Black Friday campaign targets",
    },
    {
      id: "4",
      name: "Event Attendees",
      count: 450,
      description: "Conference attendees 2024",
    },
    {
      id: "5",
      name: "Mobile App Users",
      count: 12800,
      description: "Active mobile application users",
    },
  ];

  const getAllGroup = async () => {
    setLoading(true);
    setError("");
    try {
      let res = await getGroups();
      setGroups(res.data.groups);
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    const phoneNumbersArray = newGroup.numbers
      .split("\n")
      .map((num) => num.trim())
      .filter((num) => num);

    const createNewGroup = {
      name: newGroup.name,
      description: newGroup.description,
      status: "active",
      phoneNumbers: phoneNumbersArray,
    };

    setNewGroup({ name: "", description: "", numbers: "" });

    try {
      let res = await createGroup(createNewGroup, { isCSV: false });
      getAllGroup();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleDeleteGroup = async (id) => {
    try {
      await deleteOneGroup(id);
      getAllGroup();
    } catch (error) {
      setError("Failed to delete group.");
    }
    setDeleteId(null);
  };

  const confirmDeleteGroup = async () => {
    setGroups(groups.filter((group) => group.id !== deleteId));
    try {
    } catch (error) {
      setError("Failed to delete group.");
    }
    setDeleteId(null);
  };

  const handleCSVGroupUpload = async () => {
    if (!csvFile) {
      setError("Please select a CSV file.");
      return;
    }
    if (!newGroup.name.trim()) {
      setError("Please enter a group name.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("name", newGroup.name);
    formData.append("description", newGroup.description);
    formData.append("status", "active");
    formData.append("file", csvFile);

    try {
      console.log("formData-->", formData);
      await createGroup(formData, { isCSV: true });
      setCsvFile(null);
      setNewGroup({ name: "", description: "", numbers: "" });
      getAllGroup();
    } catch (error) {
      setError("Failed to create group from CSV.");
    }
  };

  const handleDownloadGroup = (group) => {
    // If there are no phone numbers, do nothing
    console.log("passed", group);
    if (!group.phoneNumbers || group.phoneNumbers.length === 0) {
      setError("No phone numbers to download for this group.");
      return;
    }
    console.log("passed---1--:");

    // Create CSV content (one number per line)
    const csvContent = group.phoneNumbers.join("\n");
    console.log("csvContent-->", csvContent);

    // Create a blob and a download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    console.log("url-->", url);

    // Create a temporary link and click it
    const a = document.createElement("a");
    a.href = url;
    a.download = `${group.name.replace(/\s+/g, "_")}_numbers.csv`;
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    getAllGroup();
  }, []);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Users className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Group Management</h1>
                <p className="text-purple-100 text-lg">
                  Organize and manage your contact groups
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{groups.length}</div>
                <div className="text-purple-100">Total Groups</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {groups
                    .reduce(
                      (sum, g) =>
                        sum + (g.phoneNumbers ? g.phoneNumbers.length : 0),
                      0
                    )
                    .toLocaleString()}
                </div>
                <div className="text-purple-100">Total Contacts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {groups.filter((g) => g.status === "active").length}
                </div>
                <div className="text-purple-100">Active Groups</div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-pink-100 p-1 rounded-2xl">
            <TabsTrigger
              value="manage"
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Manage Groups
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Create New Group
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manage" className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Your Groups</CardTitle>
                    <CardDescription className="text-purple-100">
                      Manage your contact groups
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                    <Input
                      placeholder="Search groups..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 rounded-xl"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                      <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  {error && (
                    <div className="p-4 text-center text-red-500">{error}</div>
                  )}
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50">
                        <TableHead className="font-semibold text-purple-900">
                          Group Name
                        </TableHead>
                        <TableHead className="font-semibold text-purple-900">
                          Description
                        </TableHead>
                        <TableHead className="font-semibold text-purple-900">
                          Contacts
                        </TableHead>
                        <TableHead className="font-semibold text-purple-900">
                          Created
                        </TableHead>
                        <TableHead className="font-semibold text-purple-900">
                          Status
                        </TableHead>
                        <TableHead className="font-semibold text-purple-900">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGroups.map((group) => (
                        <TableRow
                          key={group.id}
                          className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                        >
                          <TableCell className="font-semibold text-purple-900">
                            {group.name}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {group.description}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            >
                              {(group.phoneNumbers
                                ? group.phoneNumbers.length
                                : 0
                              ).toLocaleString()}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {group.created}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                group.status === "active"
                                  ? "bg-green-500"
                                  : "bg-gray-500"
                              }
                            >
                              {group.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-purple-300 hover:bg-purple-50"
                                title="View"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-blue-300 hover:bg-blue-50"
                                title="Download"
                                onClick={() => handleDownloadGroup(group)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteGroup(group.id)}
                                className="border-red-300 hover:bg-red-50 text-red-600"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Group</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this group? This action
                    cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setDeleteId(null)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDeleteGroup}>
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <Plus className="h-6 w-6" />
                    <span>Manual Entry</span>
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Create a group by pasting numbers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Group Name
                    </label>
                    <Input
                      placeholder="Enter group name..."
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <Input
                      placeholder="Enter description..."
                      value={newGroup.description}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          description: e.target.value,
                        })
                      }
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Phone Numbers (one per line)
                    </label>
                    <Textarea
                      placeholder="Enter phone numbers, one per line..."
                      value={newGroup.numbers}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, numbers: e.target.value })
                      }
                      className="min-h-[200px] rounded-xl border-2 border-blue-200 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    onClick={handleCreateGroup}
                    disabled={!newGroup.name || !newGroup.numbers}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl py-3 text-lg font-semibold"
                  >
                    Create Group
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <CardTitle className="text-2xl flex items-center space-x-3">
                    <Upload className="h-6 w-6" />
                    <span>CSV Upload</span>
                  </CardTitle>
                  <CardDescription className="text-green-100">
                    Upload numbers from a CSV file
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Group Name
                    </label>
                    <Input
                      placeholder="Enter group name..."
                      value={newGroup.name}
                      onChange={(e) =>
                        setNewGroup({ ...newGroup, name: e.target.value })
                      }
                      className="rounded-xl border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      Description
                    </label>
                    <Input
                      placeholder="Enter description..."
                      value={newGroup.description}
                      onChange={(e) =>
                        setNewGroup({
                          ...newGroup,
                          description: e.target.value,
                        })
                      }
                      className="rounded-xl border-2 border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">
                      Upload CSV File
                    </label>
                    <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
                      <Upload className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">
                        Drop your CSV file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports files up to 500,000 numbers
                      </p>
                      <Input
                        type="file"
                        accept=".csv"
                        onChange={(e) =>
                          setCsvFile(e.target.files?.[0] || null)
                        }
                        className="mt-4"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCSVGroupUpload}
                    disabled={!csvFile || !newGroup.name}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl py-3 text-lg font-semibold"
                  >
                    Upload & Create Group
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
}
