import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Gift, Calendar, TrendingUp, Award } from "lucide-react";

const AccountTypeSelection = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleAccountTypeSelect = (accountType) => {
    updateUser({ accountType });
    
    if (accountType === "donor") {
      navigate("/donor-dashboard");
    } else {
      navigate("/organizer-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              festivefunds
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Choose your account type to get started with Festive Funds
            </p>
          </div>
        </div>
      </div>

      {/* Account Type Selection */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Donor Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-green-200">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
            
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                I want to Donate
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Support meaningful festival celebrations across India
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Browse festival campaigns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Receive unique NFT badges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Track donation impact</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Get festival notifications</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => handleAccountTypeSelect("donor")}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-300 group-hover:scale-105"
                >
                  Continue as Donor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Organizer Card */}
          <Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-orange-200">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"></div>
            
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-gray-900">
                I want to Organize
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Create and manage festival fundraising campaigns
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Create festival campaigns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Monitor donations in real-time</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Engage with supporters</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Share impact reports</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={() => handleAccountTypeSelect("organizer")}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-300 group-hover:scale-105"
                >
                  Continue as Organizer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-center mb-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">₹5+ Cr</div>
            <div className="text-gray-600">Raised weekly</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-center mb-3">
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">25,000+</div>
            <div className="text-gray-600">Active donors</div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex justify-center mb-3">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">1,250+</div>
            <div className="text-gray-600">Successful campaigns</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTypeSelection;