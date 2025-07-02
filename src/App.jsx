import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Main pages
import Home from "./pages/index.jsx";
import NotFound from "./pages/404.jsx";

// Admin pages
import AdminDashboard from "./pages/admin/index.jsx";
import ClientManagement from "./pages/admin/ClientManagement.jsx";
import CountryManagement from "./pages/admin/CountryManagement.jsx";
import FundsManagement from "./pages/admin/FundsManagement.jsx";
import HTTPVendors from "./pages/admin/HTTPVendors.jsx";
import Packages from "./pages/admin/Packages.jsx";
import SMPPVendors from "./pages/admin/SMPPVendors.jsx";
import SMSFiltering from "./pages/admin/SMSFiltering.jsx";
import SystemSettings from "./pages/admin/SystemSettings.jsx";
import TrafficRates from "./pages/admin/TrafficRates.jsx";

// Client pages
import ClientLogin from "./pages/login/login.jsx";
import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import AccountSettings from "./pages/client/AccountSettings.jsx";
import CampaignCreation from "./pages/client/CampaignCreation.jsx";
import ContentTemplates from "./pages/client/ContentTemplates.jsx";
import DeliveryReports from "./pages/client/DeliveryReports.jsx";
import GroupManagement from "./pages/client/GroupManagement.jsx";
import QueuedMessages from "./pages/client/QueuedMessages.jsx";
import SendBulkSMS from "./pages/client/SendBulkSMS.jsx";
import SenderIds from "./pages/client/SenderIds.jsx";
import SendFileSMS from "./pages/client/SendFileSMS.jsx";
import SendQuickSMS from "./pages/client/SendQuickSMS.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<ClientLogin />} />
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/ClientManagement"
            element={<ClientManagement />}
          />
          <Route
            path="/admin/CountryManagement"
            element={<CountryManagement />}
          />
          <Route path="/admin/FundsManagement" element={<FundsManagement />} />
          <Route path="/admin/HTTPVendors" element={<HTTPVendors />} />
          <Route path="/admin/Packages" element={<Packages />} />
          <Route path="/admin/SMPPVendors" element={<SMPPVendors />} />
          <Route path="/admin/SMSFiltering" element={<SMSFiltering />} />
          <Route path="/admin/SystemSettings" element={<SystemSettings />} />
          <Route path="/admin/TrafficRates" element={<TrafficRates />} />

          {/* Client routes */}
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/AccountSettings" element={<AccountSettings />} />
          <Route path="/CampaignCreation" element={<CampaignCreation />} />
          <Route path="/ContentTemplates" element={<ContentTemplates />} />
          <Route path="/DeliveryReports" element={<DeliveryReports />} />
          <Route path="/GroupManagement" element={<GroupManagement />} />
          <Route path="/QueuedMessages" element={<QueuedMessages />} />
          <Route path="/SenderIds" element={<SenderIds />} />
          <Route path="/sms/bulk" element={<SendBulkSMS />} />
          <Route path="/sms/file" element={<SendFileSMS />} />
          <Route path="/sms/quick" element={<SendQuickSMS />} />

          {/* 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
  );
}

export default App;
