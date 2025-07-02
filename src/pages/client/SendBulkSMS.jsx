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
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Send,
  Users,
  MessageSquare,
  Calendar,
  Clock,
  Target,
} from "lucide-react";
import { toast } from "sonner";
import { useClientHook } from "../../hooks/useClientHook";

export default function SendBulkSMS() {
  const [groups, setGroups] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Bulk SMS");
  const [selectedSenderId, setSelectedSenderId] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [scheduleType, setScheduleType] = useState("now");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [sending, setSending] = useState(false);

  const { sendBulkSms, getGroups, getSenderIds, getTemplates } =
    useClientHook();

  // const groups = [
  //   {
  //     id: "1",
  //     name: "VIP Customers",
  //     count: 1250,
  //     description: "Premium customer list",
  //   },
  //   {
  //     id: "2",
  //     name: "Newsletter Subscribers",
  //     count: 8500,
  //     description: "Monthly newsletter recipients",
  //   },
  //   {
  //     id: "3",
  //     name: "Promotional Campaign",
  //     count: 3200,
  //     description: "Black Friday campaign targets",
  //   },
  //   {
  //     id: "4",
  //     name: "Event Attendees",
  //     count: 450,
  //     description: "Conference attendees 2024",
  //   },
  //   {
  //     id: "5",
  //     name: "Mobile App Users",
  //     count: 12800,
  //     description: "Active mobile application users",
  //   },
  // ];

  // const senderIds = [
  //   { id: "COMPANY", status: "APPROVED" },
  //   { id: "PROMO", status: "pending" },
  //   { id: "ALERT", status: "APPROVED" },
  // ];

  // const templates = [
  //   {
  //     id: "1",
  //     name: "Welcome Message",
  //     content: "Welcome {{name}}! Thank you for joining {{company}}.",
  //   },
  //   {
  //     id: "2",
  //     name: "Promotional Offer",
  //     content: "Hi {{name}}! Get {{discount}}% off on your next purchase.",
  //   },
  //   {
  //     id: "3",
  //     name: "Event Reminder",
  //     content: "Hello {{name}}, reminder for the event on {{date}}.",
  //   },
  // ];

  const totalRecipients = selectedGroups.reduce((total, groupId) => {
    const group = groups.find((g) => g.id === groupId);
    return total + (group && group.count ? group.count : 0);
  }, 0);

  const characterCount = message.length;
  const smsCount = Math.ceil(characterCount / 160) || 1;

  const getAllGroup = async () => {
    try {
      let res = await getGroups();
      setGroups(res.data.groups);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getAllSenderIds = async () => {
    try {
      const res = await getSenderIds();
      setSenderIds(res.data.senderIds);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getAllTemplates = async () => {
    try {
      let res = await getTemplates();
      setTemplates(res.data.templates);
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

  const handleUseTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendBulkSMS = async () => {
    if (selectedGroups.length === 0) {
      toast.error("Please select at least one group.");
      return;
    }
    if (!message.trim()) {
      toast.error("Message content cannot be empty.");
      return;
    }
    if (!selectedSenderId) {
      toast.error("Please select a sender ID.");
      return;
    }
    if (scheduleType === "later" && (!scheduleDate || !scheduleTime)) {
      toast.error("Please select a date and time for scheduled delivery.");
      return;
    }

    setSending(true);

    try {
      const payload = {
        groups: selectedGroups,
        message,
        senderId: selectedSenderId.name,
        scheduleType,
        scheduleDate: scheduleType === "later" ? scheduleDate : null,
        scheduleTime: scheduleType === "later" ? scheduleTime : null,
        messageType,
      };

      let res = await sendBulkSms(payload);

      if (res.message !== "success") return res.message;
      toast.success("Bulk SMS sent successfully!");

      setSelectedGroups([]);
      setMessage("");
      setSelectedSenderId("");
      setSelectedTemplate("");
      setScheduleType("now");
      setScheduleDate("");
      setScheduleTime("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send bulk SMS. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    getAllGroup();
    getAllSenderIds();
    getAllTemplates();
  }, []);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Target className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Send Bulk SMS</h1>
                <p className="text-emerald-100 text-lg">
                  Send SMS to multiple groups at once
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {selectedGroups.length}
                </div>
                <div className="text-emerald-100">Selected Groups</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  {totalRecipients.toLocaleString()}
                </div>
                <div className="text-emerald-100">Total Recipients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{smsCount}</div>
                <div className="text-emerald-100">SMS Parts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">
                  ${(0.05 * smsCount * totalRecipients).toFixed(2)}
                </div>
                <div className="text-emerald-100">Est. Cost</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-emerald-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Users className="h-6 w-6" />
                  <span>Select Groups</span>
                </CardTitle>
                <CardDescription className="text-emerald-100">
                  Choose which groups to send SMS to
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedGroups.includes(group.id)
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-200 hover:border-emerald-300"
                      }`}
                      onClick={() => handleGroupToggle(group.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={selectedGroups.includes(group.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-emerald-900">
                              {group.name}
                            </h3>
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                              {group.count}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {group.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6" />
                  <span>Message Content</span>
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Compose your bulk SMS message
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] rounded-xl border-2 border-blue-200 focus:border-blue-500"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span>{characterCount}/160 characters</span>
                      {characterCount > 160 && (
                        <span className="ml-2 text-orange-600">
                          ({smsCount} SMS parts)
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {characterCount > 0 && characterCount <= 160 && (
                        <Badge className="bg-green-500">1 SMS</Badge>
                      )}
                      {characterCount > 160 && (
                        <Badge className="bg-orange-500">{smsCount} SMS</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Delivery</span>
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Choose when to send your messages
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        scheduleType === "now"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => setScheduleType("now")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Send className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-purple-900">
                            Send Now
                          </div>
                          <div className="text-sm text-gray-600">
                            Immediate delivery
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        scheduleType === "later"
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                      onClick={() => setScheduleType("later")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-purple-900">
                            Schedule
                          </div>
                          <div className="text-sm text-gray-600">
                            Send later
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {scheduleType === "later" && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Date
                        </label>
                        <Input
                          type="date"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          className="rounded-xl border-2 border-purple-200 focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">
                          Time
                        </label>
                        <Input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="rounded-xl border-2 border-purple-200 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-xl">Sender ID</CardTitle>
                <CardDescription className="text-orange-100">
                  Choose your sender identity
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {senderIds.map((sender) => (
                  <div
                    key={sender.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedSenderId === sender.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-orange-300"
                    } ${
                      sender.status !== "APPROVED"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() =>
                      sender.status === "APPROVED" &&
                      setSelectedSenderId(sender)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">{sender.name}</span>
                      <Badge
                        className={
                          sender.status === "APPROVED"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        }
                      >
                        {sender.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-green-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="text-xl">Quick Templates</CardTitle>
                <CardDescription className="text-green-100">
                  Use predefined templates
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    <div className="font-semibold text-green-800 mb-2">
                      {template.name}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {template.content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-indigo-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <CardTitle className="text-xl">Send Bulk SMS</CardTitle>
                <CardDescription className="text-indigo-100">
                  Review and send your campaign
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                  <div className="text-sm text-amber-800">
                    <div className="font-semibold mb-2">Campaign Summary:</div>
                    <div>Groups: {selectedGroups.length}</div>
                    <div>Recipients: {totalRecipients}</div>
                    <div>SMS Parts: {smsCount * totalRecipients}</div>
                    <div className="font-semibold">
                      Total Cost: $
                      {(0.05 * smsCount * totalRecipients).toFixed(2)}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSendBulkSMS}
                  disabled={
                    selectedGroups.length === 0 ||
                    !message ||
                    !selectedSenderId ||
                    sending
                  }
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl py-4 text-lg font-semibold"
                >
                  {sending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>
                        {scheduleType === "now" ? "Send Now" : "Schedule SMS"}
                      </span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
