import React from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { MessageSquare, Shield, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Admin Control",
      description: "Complete platform management with vendor routing, client management, and system settings"
    },
    {
      icon: Users,
      title: "Client Portal",
      description: "Easy-to-use interface for SMS campaigns, group management, and delivery reports"
    },
    {
      icon: MessageSquare,
      title: "Multi-Channel SMS",
      description: "Support for SMPP and HTTP vendors with intelligent routing and failover"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time delivery reports, campaign analytics, and performance monitoring"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SMS Platform
              </h1>
              <p className="text-sm text-gray-500">Enterprise Marketing System</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Enterprise-Grade
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              SMS Marketing Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Powerful SMS marketing solution with advanced routing, real-time analytics, 
            and comprehensive campaign management for businesses of all sizes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-lg"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-lg border-2"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for SMS Marketing
          </h3>
          <p className="text-lg text-gray-600">
            Comprehensive tools for administrators and clients
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="text-center bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold">
              Ready to Transform Your SMS Marketing?
            </CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              Join thousands of businesses already using our platform
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
