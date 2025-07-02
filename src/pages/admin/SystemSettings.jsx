import React, { useState } from 'react';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Settings, Key, Database, Mail, Shield, Globe } from "lucide-react";

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('api');
  
  const tabs = [
    { id: 'api', label: 'API Settings', icon: Key },
    { id: 'database', label: 'Database', icon: Database },
    { id: 'email', label: 'Email Config', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'general', label: 'General', icon: Globe }
  ];

  const apiSettings = [
    { name: "API Rate Limit", value: "1000 req/min", status: "active" },
    { name: "API Key Rotation", value: "30 days", status: "active" },
    { name: "Webhook Timeout", value: "30 seconds", status: "active" },
    { name: "API Version", value: "v2.1", status: "current" }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-slate-600 to-blue-600 bg-clip-text text-transparent">
              System Settings
            </h1>
            <p className="text-gray-600 mt-2">Configure system-wide settings and integrations</p>
          </div>
          <Button className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700">
            <Settings className="h-4 w-4 mr-2" />
            Save All Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "System Uptime", value: "99.9%", change: "+0.1%", icon: Shield, gradient: "from-green-500 to-emerald-500" },
            { title: "API Calls/Day", value: "847K", change: "+12%", icon: Key, gradient: "from-blue-500 to-cyan-500" },
            { title: "Storage Used", value: "67%", change: "+3%", icon: Database, gradient: "from-yellow-500 to-orange-500" },
            { title: "Active Sessions", value: "234", change: "+45", icon: Globe, gradient: "from-purple-500 to-pink-500" }
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

        {/* Settings Navigation */}
        <Card className="shadow-xl border-0">
          <CardContent className="p-0">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        {activeTab === 'api' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
                <CardTitle className="text-white flex items-center">
                  <Key className="h-5 w-5 mr-2" />
                  API Configuration
                </CardTitle>
                <CardDescription className="text-blue-100">Manage API settings and credentials</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Master API Key</Label>
                  <Input id="apiKey" type="password" value="sk-****************************" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://your-app.com/webhook" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (req/min)</Label>
                  <Input id="rateLimit" value="1000" />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  Update API Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle>API Status</CardTitle>
                <CardDescription>Current API configuration status</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {apiSettings.map((setting, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-gray-900">{setting.name}</p>
                        <p className="text-sm text-gray-500">{setting.value}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {setting.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'database' && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Configuration
              </CardTitle>
              <CardDescription className="text-green-100">Database connection and backup settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dbHost">Database Host</Label>
                  <Input id="dbHost" value="localhost" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbPort">Port</Label>
                  <Input id="dbPort" value="5432" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbName">Database Name</Label>
                  <Input id="dbName" value="sms_platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupInterval">Backup Interval</Label>
                  <Input id="backupInterval" value="24 hours" />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                Update Database Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'email' && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Configuration
              </CardTitle>
              <CardDescription className="text-purple-100">SMTP and email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" placeholder="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input id="smtpUser" placeholder="your-email@gmail.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">SMTP Password</Label>
                  <Input id="smtpPass" type="password" placeholder="Your app password" />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Update Email Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-red-50">
            <CardHeader className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription className="text-red-100">Security policies and authentication</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (hours)</Label>
                  <Input id="sessionTimeout" value="24" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input id="maxLoginAttempts" value="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordLength">Min Password Length</Label>
                  <Input id="passwordLength" value="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twoFactor">Two-Factor Auth</Label>
                  <select className="w-full p-2 border border-gray-200 rounded-md">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                Update Security Settings
              </Button>
            </CardContent>
          </Card>
        )}

        {activeTab === 'general' && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-indigo-50">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                General Settings
              </CardTitle>
              <CardDescription className="text-indigo-100">Platform-wide general configuration</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" value="SMS Marketing Platform" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Input id="timezone" value="UTC" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Input id="currency" value="USD" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Default Language</Label>
                  <Input id="language" value="English" />
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                Update General Settings
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
