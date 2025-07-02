import React, { useState } from "react";
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
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  User,
  Lock,
  Key,
  Bell,
  CreditCard,
  Eye,
  EyeOff,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { useClientHook } from "../../hooks/useClientHook";

export default function AccountSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    companyName: "TechCorp Solutions",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailAlerts: true,
    lowBalanceNotify: true,
    campaignNotify: false,
  });
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const { updateProfile, updatePassword } = useClientHook();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const apiKey = "sk_live_4f4e9c8b2a1d3e5f6g7h8i9j0k1l2m3n";
  const maskedApiKey = "sk_live_****************************3n";

  const handleUpdateProfile = async () => {
    setLoadingProfile(true);
    try {
      await updateProfile({
        full_name: formData.fullName,
        email: formData.email,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setLoadingPassword(true);
    try {
      let updateData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
      await updatePassword(updateData);
      toast.success("Password updated successfully!");
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <ClientLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your profile, security, and preferences
          </p>
        </div>

        {/* Account Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              title: "Credits Remaining",
              value: "2,450",
              icon: CreditCard,
              gradient: "from-green-500 to-emerald-500",
            },
            {
              title: "SMS This Month",
              value: "18,247",
              icon: User,
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Account Type",
              value: "Business",
              icon: User,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              title: "Member Since",
              value: "Jan 2023",
              icon: User,
              gradient: "from-orange-500 to-red-500",
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

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            {/* <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger> */}
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-green-100">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal and company information
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                    />
                  </div> */}
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                    onClick={handleUpdateProfile}
                    disabled={loadingProfile}
                  >
                    {loadingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100">
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>
                  Update your account password for security
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.currentPassword}
                        onChange={(e) =>
                          handleInputChange("currentPassword", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                    onClick={handleUpdatePassword}
                    disabled={loadingPassword}
                  >
                    {loadingPassword ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>API Credentials</span>
                </CardTitle>
                <CardDescription>
                  Manage your API keys for HTTP SMS requests
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        API Key
                      </Label>
                      <div className="flex items-center space-x-2 mt-2">
                        <Input
                          value={showApiKey ? apiKey : maskedApiKey}
                          readOnly
                          className="flex-1 font-mono"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="border-purple-200 text-purple-600 hover:bg-purple-50"
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">
                        API Usage Information
                      </h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Use this key for HTTP SMS API requests</li>
                        <li>
                          • Include in request headers as: Authorization: Bearer
                          YOUR_API_KEY
                        </li>
                        <li>
                          • Keep your API key secure and never share it publicly
                        </li>
                        <li>
                          • API endpoint: https://api.smsplatform.com/v1/send
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">
                      Usage Statistics
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">API Calls Today</p>
                        <p className="text-2xl font-bold text-gray-900">
                          1,247
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">This Month</p>
                        <p className="text-2xl font-bold text-gray-900">
                          28,459
                        </p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Rate Limit</p>
                        <p className="text-2xl font-bold text-gray-900">
                          1000/hr
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>
                  Configure how you want to receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Email alerts for delivery failures
                      </Label>
                      <p className="text-sm text-gray-600">
                        Get notified when SMS delivery fails
                      </p>
                    </div>
                    <Switch
                      checked={formData.emailAlerts}
                      onCheckedChange={(checked) =>
                        handleInputChange("emailAlerts", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Low balance notifications
                      </Label>
                      <p className="text-sm text-gray-600">
                        Alert when account balance is low
                      </p>
                    </div>
                    <Switch
                      checked={formData.lowBalanceNotify}
                      onCheckedChange={(checked) =>
                        handleInputChange("lowBalanceNotify", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">
                        Campaign completion notifications
                      </Label>
                      <p className="text-sm text-gray-600">
                        Get notified when campaigns finish
                      </p>
                    </div>
                    <Switch
                      checked={formData.campaignNotify}
                      onCheckedChange={(checked) =>
                        handleInputChange("campaignNotify", checked)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Billing Info Section */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Billing Information</span>
                </CardTitle>
                <CardDescription>
                  Account balance and usage summary
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Current Balance
                      </Label>
                      <p className="text-3xl font-bold text-green-600">
                        $2,450.75
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        SMS Credits Remaining
                      </Label>
                      <p className="text-2xl font-bold text-blue-600">54,570</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        This Month Usage
                      </Label>
                      <p className="text-2xl font-bold text-orange-600">
                        18,247 SMS
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-600">
                        Estimated Monthly Cost
                      </Label>
                      <p className="text-2xl font-bold text-purple-600">
                        $821.15
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <p className="text-sm text-gray-600">
                    Need more credits or have billing questions?
                  </p>
                  <Button
                    variant="outline"
                    className="border-green-200 text-green-600 hover:bg-green-50"
                  >
                    Contact Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ClientLayout>
  );
}
