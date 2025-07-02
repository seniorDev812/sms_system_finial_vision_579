import React, { useEffect, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  CalendarIcon,
  Search,
  Download,
  Eye,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import dayjs from "dayjs";
import { useClientHook } from "../../hooks/useClientHook";

export default function DeliveryReports() {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [smsType, setSmsType] = useState("All Types");
  const [status, setStatus] = useState("All Status");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { getReports } = useClientHook();

  // const reports = [
  //   {
  //     id: 1,
  //     dateTime: "2024-01-15 14:30:25",
  //     recipient: "+1234567890",
  //     messageType: "Quick SMS",
  //     senderId: "MYBIZ",
  //     vendorRoute: "GlobalSMS HTTP",
  //     content:
  //       "Hello! Your order #12345 has been confirmed and will be delivered tomorrow.",
  //     status: "delivered",
  //     deliveryRate: "100%",
  //     country: "United States",
  //     finalNumber: "+1234567890",
  //     dlrTimestamp: "2024-01-15 14:30:45",
  //   },
  //   {
  //     id: 2,
  //     dateTime: "2024-01-15 13:45:12",
  //     recipient: "Marketing Group (245 contacts)",
  //     messageType: "Bulk SMS",
  //     senderId: "PROMO",
  //     vendorRoute: "FastRoute SMPP",
  //     content:
  //       "🎉 Flash Sale! Get 50% off all items. Use code FLASH50. Valid until midnight!",
  //     status: "failed",
  //     deliveryRate: "0%",
  //     country: "United Kingdom",
  //     finalNumber: "+44123456789",
  //     dlrTimestamp: null,
  //   },
  //   {
  //     id: 3,
  //     dateTime: "2024-01-15 12:20:08",
  //     recipient: "+91987654321",
  //     messageType: "Campaign",
  //     senderId: "ALERTS",
  //     vendorRoute: "CloudSMS API",
  //     content:
  //       "Your payment of $299.99 has been successfully processed. Transaction ID: TXN789012",
  //     status: "pending",
  //     deliveryRate: "75%",
  //     country: "India",
  //     finalNumber: "+91987654321",
  //     dlrTimestamp: null,
  //   },
  // ];

  const getStatusColor = (status) => {
    const colors = {
      delivered: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      queued: "bg-blue-100 text-blue-800",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "failed":
        return XCircle;
      case "pending":
        return Clock;
      default:
        return Clock;
    }
  };

  const totalSent = reports.length;
  const totalDelivered = reports.filter((r) => r.status === "delivered").length;
  const totalFailed = reports.filter((r) => r.status === "failed").length;
  const deliveryRate = totalSent
    ? Math.round((totalDelivered / totalSent) * 100)
    : 0;

  const filteredReports = reports.filter((report) => {
    const typeMatch = smsType === "All Types" || report.type === smsType;
    const statusMatch =
      status === "All Status" ||
      report.status.toLowerCase() === status.toLowerCase();
    let dateMatch = true;
    if (dateFrom) {
      dateMatch = dayjs(report.dateTime).isAfter(
        dayjs(dateFrom).subtract(1, "day")
      );
    }
    if (dateTo && dateMatch) {
      dateMatch = dayjs(report.dateTime).isBefore(dayjs(dateTo).add(1, "day"));
    }
    const searchLower = searchTerm.toLowerCase();
    const searchMatch =
      (report.content || "").toLowerCase().includes(searchLower) ||
      (report.recipient || "").toLowerCase().includes(searchLower) ||
      (report.messageType || "").toLowerCase().includes(searchLower);
    return typeMatch && statusMatch && dateMatch && searchMatch;
  });

  const exportCSV = () => {
    const headers = [
      "Date/Time",
      "Recipient",
      "Type",
      "Sender ID",
      "Message",
      "Status",
      "Rate",
    ];
    const rows = reports.map((r) => [
      r.dateTime,
      r.recipient,
      r.messageType,
      r.senderId,
      r.content,
      r.status,
      r.deliveryRate,
    ]);
    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "delivery_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDeliveryReports = async () => {
    try {
      const params = {};
      if (smsType && smsType !== "All Types") params.type = smsType;
      if (status && status !== "All Status") params.status = status;
      if (dateFrom) params.from = dayjs(dateFrom).format("YYYY-MM-DD");
      if (dateTo) params.to = dayjs(dateTo).format("YYYY-MM-DD");
      if (searchTerm) params.search = searchTerm;
      params.page = page;
      params.pageSize = pageSize;

      let res = await getReports(params);
      console.log("res.data->", res.data);
      setReports(res.data.reports);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  useEffect(() => {
    getDeliveryReports();
  }, [smsType, status, dateFrom, dateTo, searchTerm, page, pageSize]);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Delivery Reports
            </h1>
            <p className="text-gray-600 mt-2">
              Track SMS delivery status and performance
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={exportCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Filter Bar */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-white to-blue-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Date Range</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="From date"
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    placeholder="To date"
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>SMS Type</Label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-md"
                  value={smsType}
                  onChange={(e) => setSmsType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>Quick SMS</option>
                  <option>Bulk SMS</option>
                  <option>File SMS</option>
                  <option>Campaign</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  className="w-full p-2 border border-gray-200 rounded-md"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>All Status</option>
                  <option>delivered</option>
                  <option>failed</option>
                  <option>pending</option>
                  <option>queued</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Phone, campaign..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Total SMS Sent",
              value: totalSent.toLocaleString(),
              icon: BarChart3,
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Total Delivered",
              value: totalDelivered.toLocaleString(),
              icon: CheckCircle,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "Total Failed",
              value: totalFailed.toLocaleString(),
              icon: XCircle,
              gradient: "from-red-500 to-pink-500",
            },
            {
              title: "Delivery Rate",
              value: `${deliveryRate}%`,
              icon: BarChart3,
              gradient: "from-purple-500 to-indigo-500",
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

        {/* Reports Table */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-100">
            <CardTitle className="text-gray-900">
              SMS Delivery Reports
            </CardTitle>
            <CardDescription>
              Detailed delivery status for all SMS messages
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Date/Time</TableHead>
                  <TableHead className="font-semibold">Recipient</TableHead>
                  <TableHead className="font-semibold">Type</TableHead>
                  <TableHead className="font-semibold">Sender ID</TableHead>
                  {/* <TableHead className="font-semibold">Vendor</TableHead> */}
                  <TableHead className="font-semibold">Message</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Rate</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const StatusIcon = getStatusIcon(report.status);
                  return (
                    <TableRow
                      key={report.id}
                      className="hover:bg-blue-50/50 transition-colors"
                    >
                      <TableCell className="font-mono text-sm">
                        {new Date(report.date_time).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        {report.recipient}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-blue-600"
                        >
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono">
                        {report.sender_id}
                      </TableCell>
                      {/* <TableCell className="text-sm">{report.vendorRoute}</TableCell> */}
                      <TableCell className="max-w-xs truncate">
                        {report.message}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {report.delivery_rate}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>SMS Delivery Details</DialogTitle>
                              <DialogDescription>
                                Complete delivery information for this message
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Sent Time
                                  </Label>
                                  <p className="font-mono">{report.dateTime}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Sender ID
                                  </Label>
                                  <p className="font-mono">{report.senderId}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Phone Number
                                  </Label>
                                  <p className="font-mono">
                                    {report.finalNumber}
                                  </p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Country
                                  </Label>
                                  <p>{report.country}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Vendor Used
                                  </Label>
                                  <p>{report.vendorRoute}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    DLR Status
                                  </Label>
                                  <Badge
                                    className={getStatusColor(report.status)}
                                  >
                                    {report.status}
                                  </Badge>
                                </div>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-gray-600">
                                  Full Message
                                </Label>
                                <p className="p-3 bg-gray-50 rounded-md">
                                  {report.content}
                                </p>
                              </div>
                              {report.dlrTimestamp && (
                                <div>
                                  <Label className="text-sm font-medium text-gray-600">
                                    Delivery Time
                                  </Label>
                                  <p className="font-mono">
                                    {report.dlrTimestamp}
                                  </p>
                                </div>
                              )}
                              {report.status === "failed" && (
                                <div className="flex justify-end">
                                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                                    Retry Message
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </ClientLayout>
  );
}
