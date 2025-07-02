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
import { Badge } from "../../components/ui/badge";
import {
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useClientHook } from "../../hooks/useClientHook";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { updateSenderIdRequest, deleteSenderIdRequest } from "../../service/clientProvider";

export default function SenderIds() {
  const [senderIds, setSenderIds] = useState([]);
  const [newRequest, setNewRequest] = useState({ senderId: "", purpose: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ senderId: "", purpose: "" });
  const [deletingId, setDeletingId] = useState(null);

  const { getSenderIds, createSenderIdRequest } = useClientHook();

  const getStatusIcon = (status) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "REJECTED":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "PENDING":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "REJECTED":
        return "bg-gradient-to-r from-red-500 to-pink-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchSenderIds = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getSenderIds();
      setSenderIds(res.data.senderIds);
    } catch (err) {
      setError("Failed to load sender IDs.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRequest = async () => {
    setSubmitting(true);
    setError("");
    setSuccess("");
    const senderId = newRequest.senderId.trim().toUpperCase();
    if (!/^[A-Z0-9]{1,11}$/.test(senderId)) {
      setError("Sender ID must be alphanumeric and up to 11 characters.");
      setSubmitting(false);
      return;
    }
    if (!newRequest.purpose.trim()) {
      setError("Purpose is required.");
      setSubmitting(false);
      return;
    }
    try {
      let newSenderId = {
        name: senderId,
        purpose: newRequest.purpose.trim(),
      };
      await createSenderIdRequest(newSenderId);
      setSuccess("Sender ID request submitted!");
      setNewRequest({ senderId: "", purpose: "" });
      fetchSenderIds();
    } catch (err) {
      setError("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (sender) => {
    setEditingId(sender.id);
    setEditValues({ senderId: sender.senderId, purpose: sender.purpose });
  };
  
  const handleEditSave = async () => {
    try {
      await updateSenderIdRequest(editingId, editValues); // You need to implement this in your service
      setEditingId(null);
      fetchSenderIds();
    } catch (err) {
      setError("Failed to update sender ID.");
    }
  };
  
  const handleDeleteClick = (id) => {
    setDeletingId(id);
  };
  
  const handleDeleteConfirm = async () => {
    try {
      await deleteSenderIdRequest(deletingId); // You need to implement this in your service
      setDeletingId(null);
      fetchSenderIds();
    } catch (err) {
      setError("Failed to delete sender ID.");
    }
  };

  useEffect(() => {
    fetchSenderIds();
  }, []);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <MessageSquare className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Sender ID Management</h1>
                <p className="text-purple-100 text-lg">
                  Request and manage your SMS sender identities
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{senderIds.length}</div>
                <div className="text-purple-100">Total Requests</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {senderIds.filter((s) => s.status === "APPROVED").length}
                </div>
                <div className="text-purple-100">Approved</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {senderIds.filter((s) => s.status === "PENDING").length}
                </div>
                <div className="text-purple-100">Pending</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {senderIds.filter((s) => s.status === "REJECTED").length}
                </div>
                <div className="text-purple-100">Rejected</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-2xl">Your Sender IDs</CardTitle>
                <CardDescription className="text-indigo-100">
                  Track the status of your sender ID requests
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="p-8 text-center text-gray-500">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="p-8 text-center text-red-500">{error}</div>
                ) : (
                  <>
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gradient-to-r from-indigo-50 to-purple-50">
                          <TableHead className="font-semibold text-indigo-900">
                            Sender ID
                          </TableHead>
                          <TableHead className="font-semibold text-indigo-900">
                            Purpose
                          </TableHead>
                          <TableHead className="font-semibold text-indigo-900">
                            Status
                          </TableHead>
                          <TableHead className="font-semibold text-indigo-900">
                            Submitted
                          </TableHead>
                          <TableHead className="font-semibold text-indigo-900">
                            Approved
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {senderIds.map((sender) => (
                          <TableRow
                            key={sender.id}
                            className="hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                          >
                            <TableCell className="font-bold text-indigo-900 text-lg">
                              {sender.name}
                            </TableCell>
                            <TableCell className="text-gray-600 max-w-xs">
                              <div className="truncate" title={sender.purpose}>
                                {sender.purpose}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={`${getStatusColor(
                                  sender.status
                                )} text-white  text-center px-2 py-1`}
                              >
                                {getStatusIcon(sender.status)}
                                <span className="capitalize">
                                  {sender.status}
                                </span>
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {new Date(sender.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-gray-600">
                              {new Date(sender.approved_at).toLocaleDateString() || "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {senderIds.some((s) => s.status === "REJECTED") && (
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-red-600">
                          Rejection Reasons
                        </h3>
                        {senderIds
                          .filter((s) => s.status === "REJECTED")
                          .map((sender) => (
                            <div
                              key={sender.id}
                              className="bg-red-50 border border-red-200 rounded-xl p-4"
                            >
                              <div className="font-semibold text-red-800">
                                {sender.name}
                              </div>
                              <div className="text-red-600 text-sm">
                                {sender.rejection_reason}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                )}
                {success && <div className="p-4 text-green-600">{success}</div>}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Plus className="h-6 w-6" />
                  <span>Request New Sender ID</span>
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Submit a new sender ID for approval
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Sender ID
                  </label>
                  <Input
                    placeholder="Enter sender ID (e.g., COMPANY)"
                    value={newRequest.senderId}
                    onChange={(e) => {
                      // Only allow alphanumeric, max 11 chars, uppercase
                      const value = e.target.value
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .toUpperCase()
                        .slice(0, 11);
                      setNewRequest({ ...newRequest, senderId: value });
                    }}
                    className="rounded-xl border-2 border-pink-200 focus:border-pink-500 uppercase"
                    maxLength={11}
                  />
                  <p className="text-xs text-gray-500">
                    Maximum 11 characters, alphanumeric only
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Purpose / Use Case
                  </label>
                  <Textarea
                    placeholder="Describe how you plan to use this sender ID..."
                    value={newRequest.purpose}
                    onChange={(e) =>
                      setNewRequest({ ...newRequest, purpose: e.target.value })
                    }
                    className="min-h-[120px] rounded-xl border-2 border-pink-200 focus:border-pink-500"
                  />
                  <p className="text-xs text-gray-500">
                    Provide detailed information about your intended use
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <div className="font-semibold mb-2">
                        Approval Guidelines:
                      </div>
                      <ul className="space-y-1 text-xs">
                        <li>
                          • Generic terms like "SMS", "ALERT" may be rejected
                        </li>
                        <li>
                          • Use your company/brand name for better approval
                          chances
                        </li>
                        <li>• Approval typically takes 1-3 business days</li>
                        <li>• Provide clear, specific use case description</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitRequest}
                  disabled={
                    !newRequest.senderId || !newRequest.purpose || submitting
                  }
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl py-3 text-lg font-semibold"
                >
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {deletingId && (
        <Dialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Sender ID</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this sender ID? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeletingId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientLayout>
  );
}
