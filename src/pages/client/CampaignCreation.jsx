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
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Target,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  Send,
  Play,
  Pause,
  BarChart3,
  X,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useClientHook } from "../../hooks/useClientHook";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";

export default function CampaignCreation() {
  const [campaigns, setCampaigns] = useState([
    {
      id: "1",
      name: "Black Friday Sale",
      groups: ["2", "3"],
      message:
        "Black Friday Sale! Get 50% off everything. Use code BF50. Limited time only!",
      status: "completed",
      senderId: "PROMO",
      created: "2024-01-15",
      sent: 11700,
      delivered: 11580,
      failed: 120,
    },
    {
      id: "2",
      name: "Product Launch",
      groups: ["1"],
      message:
        "Exciting news! Our new product is now available. Be the first to try it!",
      status: "running",
      senderId: "COMPANY",
      created: "2024-01-18",
      sent: 856,
      delivered: 840,
      failed: 16,
    },
  ]);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [campaignName, setCampaignName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Campaign");
  const [selectedSenderId, setSelectedSenderId] = useState({});
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [creating, setCreating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editingCampaignId, setEditingCampaignId] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    getCampaigns,
    createCampaign,
    getGroups,
    deleteCampaign,
    updateCampaign,
    pauseCampaign,
    resumeCampaign,
  } = useClientHook();

  const senderIds = [
    { id: "COMPANY", status: "approved" },
    { id: "PROMO", status: "approved" },
    { id: "ALERT", status: "approved" },
  ];

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return total + (group?.count || 0);
  }, 0);

  const characterCount = message.length;
  const smsCount = Math.ceil(characterCount / 160) || 1;

  const getStatusColor = (status) => {
    switch (status) {
      case "DRAFT":
        return "bg-red-500";
      case "SCHEDULED":
        return "bg-blue-500";
      case "SENDING":
        return "bg-green-500";
      case "COMPLETED":
        return "bg-purple-500";
      case "paused":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SENDING":
        return <Play className="h-4 w-4" />;
      case "paused":
        return <Pause className="h-4 w-4" />;
      case "COMPLETED":
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const getGroupNames = (groupIds) => {
    return groupIds
      .map((id) => {
        const group = groups.find((g) => g.id === id);
        return group ? group.name : id;
      })
      .join(", ");
  };

  const getAllCampaigns = async () => {
    try {
      let res = await getCampaigns();
      setCampaigns(res.data.campaigns);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleGroupToggle = (groupId) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleCreateCampaign = async () => {
    try {
      setCreating(true);

      const newCampaign = {
        name: campaignName,
        groups: selectedGroups,
        message,
        messageType,
        status: scheduleType === "now" ? "SENDING" : "SCHEDULED",
        senderId: { id: selectedSenderId.id, name: selectedSenderId.name },
        scheduledDate:
          scheduleType === "later"
            ? `${scheduleDate} ${scheduleTime}`
            : undefined,
        sent: 0,
        delivered: 0,
        failed: 0,
      };

      await createCampaign(newCampaign);
      getAllCampaigns();

      setCampaignName("");
      setMessage("");
      setSelectedGroups([]);
      setSelectedSenderId("");
      setScheduleType("now");
      setScheduleDate("");
      setScheduleTime("");
      setCreating(false);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const handleEditClick = (campaign) => {
    setIsEditing(true);
    setEditingCampaignId(campaign.id);

    setCampaignName(campaign.name);
    setMessage(campaign.message);
    setSelectedGroups(campaign.groups);
    setSelectedSenderId(campaign.senderId);

    if (campaign.status === "SCHEDULED" && campaign.scheduledDate) {
      setScheduleType("later");
      const [date, time] = campaign.scheduledDate.split(" ");
      setScheduleDate(date || "");
      setScheduleTime(time || "");
    } else {
      setScheduleType("now");
      setScheduleDate("");
      setScheduleTime("");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateCampaign = async () => {
    if (!editingCampaignId) return;

    const updatedCampaignData = {
      name: campaignName,
      groups: selectedGroups,
      message,
      status: scheduleType === "now" ? "running" : "scheduled",
      senderId: selectedSenderId,
      scheduledDate:
        scheduleType === "later"
          ? `${scheduleDate} ${scheduleTime}`
          : undefined,
    };

    try {
      await updateCampaign(editingCampaignId, updatedCampaignData);
      getAllCampaigns();

      resetForm();
    } catch (error) {
      console.error("Failed to update campaign:", error);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingCampaignId(null);
    setCampaignName("");
    setMessage("");
    setSelectedGroups([]);
    setSelectedSenderId("");
    setScheduleType("now");
    setScheduleDate("");
    setScheduleTime("");
  };

  const handleDeleteCampaign = async () => {
    if (!deleteConfirmId) return;

    try {
      await deleteCampaign(deleteConfirmId);
      getAllCampaigns();
      setDeleteConfirmId(null);
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      setDeleteConfirmId(null);
    }
  };

  const updateCampaignStatusInUI = (campaignId, newStatus) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === campaignId ? { ...c, status: newStatus } : c))
    );
  };

  const handlePauseCampaign = async (campaignId) => {
    try {
      await pauseCampaign(campaignId);
      updateCampaignStatusInUI(campaignId, "paused");
    } catch (error) {
      console.error("Failed to pause campaign:", error);
    }
  };

  const handleResumeCampaign = async (campaignId) => {
    try {
      await resumeCampaign(campaignId);
      updateCampaignStatusInUI(campaignId, "running");
    } catch (error) {
      console.error("Failed to resume campaign:", error);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoadingGroups(true);
      try {
        const res = await getGroups();
        setGroups(res.data.groups || res.data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
      } finally {
        setLoadingGroups(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <ClientLayout>
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Campaign</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <div className="mb-2 font-semibold">Campaign Name:</div>
                <div className="mb-2">{campaignName}</div>
                <div className="mb-2 font-semibold">Groups:</div>
                <div className="mb-2">{getGroupNames(selectedGroups)}</div>
                <div className="mb-2 font-semibold">Sender ID:</div>
                <div className="mb-2">{selectedSenderId}</div>
                <div className="mb-2 font-semibold">Message:</div>
                <div className="p-3 bg-gray-100 rounded">{message}</div>
                <div className="mt-2 text-xs text-gray-500">
                  {characterCount}/160 characters ({smsCount} SMS)
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={() => setDeleteConfirmId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this campaign?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. All data associated with this
              campaign will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCampaign}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-violet-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Campaign Management</h1>
                <p className="text-rose-100 text-lg">
                  Create and manage your SMS campaigns
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{campaigns.length}</div>
                <div className="text-rose-100">Total Campaigns</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {campaigns.filter((c) => c.status === "DRAFT").length}
                </div>
                <div className="text-rose-100">Active</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {campaigns.reduce((sum, c) => sum + c.sent, 0)}
                </div>
                <div className="text-rose-100">Messages Sent</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {Math.round(
                    (campaigns.reduce(
                      (sum, c) => sum + c.delivered / (c.sent || 1),
                      0
                    ) /
                      campaigns.length) *
                      100
                  )}
                  %
                </div>
                <div className="text-rose-100">Avg. Delivery</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-rose-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                <CardTitle className="text-2xl">Your Campaigns</CardTitle>
                <CardDescription className="text-rose-100">
                  Track and manage your SMS campaigns
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="bg-gradient-to-r from-white to-rose-50 rounded-2xl p-6 border-2 border-rose-100 hover:border-rose-300 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-rose-900">
                              {campaign.name}
                            </h3>
                            <Badge
                              className={`${getStatusColor(
                                campaign.status
                              )} text-white flex items-center space-x-1`}
                            >
                              {getStatusIcon(campaign.status)}
                              <span className="capitalize">
                                {campaign.status}
                              </span>
                            </Badge>
                          </div>
                          <div className="bg-white rounded-xl p-4 border border-rose-200 mb-4">
                            <p className="text-gray-700 leading-relaxed">
                              {campaign.message}
                            </p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Groups</div>
                              <div className="font-semibold text-rose-900">
                                {campaign.groups.length}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Sent</div>
                              <div className="font-semibold text-blue-600">
                                {campaign.sent && campaign.sent}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Delivered</div>
                              <div className="font-semibold text-green-600">
                                {campaign.delivered && campaign.delivered}
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Failed</div>
                              <div className="font-semibold text-red-600">
                                {campaign.failed && campaign.failed}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          {(campaign.status === "SCHEDULED" ||
                            campaign.status === "DRAFT") && (
                            <>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleEditClick(campaign)}
                                title="Edit"
                              >
                                <Edit className="h-4 w-4 text-blue-500" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => setDeleteConfirmId(campaign.id)}
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </>
                          )}

                          {(campaign.status === "running" ||
                            campaign.status === "SCHEDULED") && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handlePauseCampaign(campaign.id)}
                              title="Pause"
                            >
                              <Pause className="h-4 w-4 text-yellow-600" />
                            </Button>
                          )}

                          {campaign.status === "paused" && (
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => handleResumeCampaign(campaign.id)}
                              title="Resume"
                            >
                              <Play className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                        </div>
                      </div>
                      {campaign.status === "DRAFT" && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-green-800">
                              <div className="font-semibold">
                                Campaign in Progress
                              </div>
                              <div className="text-sm">
                                Delivery Rate:{" "}
                                {Math.round(
                                  (campaign.delivered / campaign.sent) * 100
                                )}
                                %
                              </div>
                            </div>
                            {/* <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-yellow-300 hover:bg-yellow-50"
                              >
                                <Pause className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-300 hover:bg-green-50"
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </div> */}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardTitle className="text-xl flex items-center space-x-3">
                  <Target className="h-6 w-6" />
                  <span>Create Campaign</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Set up a new SMS campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Campaign Name
                  </label>
                  <Input
                    placeholder="Enter campaign name..."
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Select Groups
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {loadingGroups ? (
                      <p>Loading...</p>
                    ) : (
                      groups.map((group) => (
                        <div
                          key={group.id}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedGroups.includes(group.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => handleGroupToggle(group.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox
                              checked={selectedGroups.includes(group.id)}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-blue-900">
                                  {group.name}
                                </span>
                                <Badge className="bg-blue-500 text-white text-xs">
                                  {group.count}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {selectedGroups.length > 0 && (
                    <div className="text-sm text-blue-600 mt-2">
                      Total recipients: {totalRecipients}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="Enter your campaign message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[100px] rounded-xl border-2 border-blue-200 focus:border-blue-500"
                  />
                  <div className="text-xs text-gray-500">
                    {characterCount}/160 characters ({smsCount} SMS)
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Sender ID
                  </label>
                  <div className="space-y-2">
                    {senderIds.map((sender) => (
                      <div
                        key={sender.id}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedSenderId === sender.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedSenderId(sender.id)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{sender.id}</span>
                          <Badge className="bg-green-500 text-white">
                            {sender.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-gray-700">
                    Schedule
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        scheduleType === "now"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setScheduleType("now")}
                    >
                      <div className="text-center">
                        <Send className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">Send Now</div>
                      </div>
                    </div>
                    <div
                      className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        scheduleType === "later"
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                      onClick={() => setScheduleType("later")}
                    >
                      <div className="text-center">
                        <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <div className="font-semibold">Schedule</div>
                      </div>
                    </div>
                  </div>

                  {scheduleType === "later" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-700">
                          Time
                        </label>
                        <Input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="rounded-xl border-2 border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={
                    isEditing ? handleUpdateCampaign : handleCreateCampaign
                  }
                  disabled={
                    !campaignName ||
                    selectedGroups.length === 0 ||
                    !message ||
                    !selectedSenderId ||
                    creating
                  }
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-xl py-3 text-lg font-semibold"
                >
                  {creating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>{isEditing ? "Saving..." : "Creating..."}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>
                        {isEditing ? "Save Changes" : "Create & Launch"}
                      </span>
                    </div>
                  )}
                </Button>

                {isEditing && (
                  <Button
                    variant="ghost"
                    onClick={resetForm}
                    className="w-full mt-2"
                  >
                    Cancel Edit
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
