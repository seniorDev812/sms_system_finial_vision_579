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
import {
  Zap,
  Send,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useClientHook } from "../../hooks/useClientHook";
import { toast } from "sonner";

export default function SendQuickSMS() {
  const [phoneNumbers, setPhoneNumbers] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Quick SMS");
  const [selectedSenderId, setSelectedSenderId] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const [senderIds, setSenderIds] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [loading, setLoading] = useState({
    senderIds: false,
    templates: false,
  });
  const [sending, setSending] = useState(false);

  const { sendQuickSms, getSenderIds, getTemplates } = useClientHook();

  const phoneList = phoneNumbers
    .split("\n")
    .map((num) => num.trim())
    .filter((num) => num.length > 0);
  const characterCount = message.length;
  const smsCount = Math.ceil(characterCount / 160) || 1;
  const totalCost = (0.05 * smsCount * phoneList.length).toFixed(2);

  const getAllSenderIds = async () => {
    setLoading({ senderIds: true, templates: true });
    try {
      const res = await getSenderIds();
      setSenderIds(res.data.senderIds);
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
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

  const handleUseTemplate = (templateId) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendSMS = async () => {
    if (phoneList.length === 0 || !message.trim() || !selectedSenderId) {
      toast.error(
        "Please fill in all required fields: Recipients, Message, and Sender ID."
      );
      return;
    }

    setSending(true);
    try {
      const payload = {
        phoneNumbers: phoneList,
        message,
        messageType,
        senderId: selectedSenderId.name,
      };
      await sendQuickSms(payload);
      toast.success(`SMS sent to ${phoneList.length} recipients successfully!`);
      setPhoneNumbers("");
      setMessage("");
      setSelectedSenderId("");
      setSelectedTemplate("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send SMS. Please try again."
      );
      console.error("Send SMS error:", error);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    getAllSenderIds();
    getAllTemplates();
  }, []);

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 p-8 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Zap className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">Send Quick SMS</h1>
                <p className="text-orange-100 text-lg">
                  Send instant SMS to multiple recipients
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{phoneList.length}</div>
                <div className="text-orange-100">Recipients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{smsCount}</div>
                <div className="text-orange-100">SMS Parts</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold">{characterCount}</div>
                <div className="text-orange-100">Characters</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <Users className="h-6 w-6" />
                  <span>Recipients</span>
                </CardTitle>
                <CardDescription className="text-orange-100">
                  Enter phone numbers (one per line)
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Enter phone numbers, one per line&#10;+1234567890&#10;+0987654321&#10;..."
                    value={phoneNumbers}
                    onChange={(e) => setPhoneNumbers(e.target.value)}
                    className="min-h-[300px] rounded-xl border-2 border-orange-200 focus:border-orange-500 font-mono text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {phoneList.length > 0 && (
                        <span className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>{phoneList.length} valid numbers detected</span>
                        </span>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    >
                      Max: 100,000 numbers
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-pink-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <CardTitle className="text-2xl flex items-center space-x-3">
                  <MessageSquare className="h-6 w-6" />
                  <span>Message Content</span>
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Compose your SMS message
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="min-h-[150px] rounded-xl border-2 border-pink-200 focus:border-pink-500"
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
          </div>

          <div className="space-y-6">
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <CardTitle className="text-xl">Sender ID</CardTitle>
                <CardDescription className="text-blue-100">
                  Choose your sender identity
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {loading.senderIds ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  senderIds
                    .filter((s) => s.status === "APPROVED")
                    .map((sender) => (
                      <div
                        key={sender.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedSenderId === sender.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                        onClick={() => setSelectedSenderId(sender)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg">
                            {sender.name}
                          </span>
                          <Badge className="bg-green-500">
                            {sender.status}
                          </Badge>
                        </div>
                      </div>
                    ))
                )}
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
                {loading.templates ? (
                  <p className="text-center text-gray-500">Loading...</p>
                ) : (
                  templates.map((template) => (
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
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-purple-50 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
                <CardTitle className="text-xl">Send SMS</CardTitle>
                <CardDescription className="text-purple-100">
                  Review and send your message
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <div className="font-semibold mb-1">Cost Estimate:</div>
                      <div>Recipients: {phoneList.length}</div>
                      <div>SMS Parts: {smsCount * phoneList.length}</div>
                      <div className="font-semibold">
                        Total Cost: ${totalCost}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSendSMS}
                  disabled={
                    !phoneNumbers || !message || !selectedSenderId || sending
                  }
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 rounded-xl py-4 text-lg font-semibold"
                >
                  {sending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Send SMS</span>
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
