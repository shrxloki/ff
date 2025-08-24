import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../contexts/AuthContext";
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar,
  Edit,
  Eye,
  Share,
  Bell,
  Target,
  DollarSign,
  BarChart3,
  MessageSquare,
  Download,
  Archive,
  Clock
} from "lucide-react";
import CreateCampaignModal from "../components/CreateCampaignModal";
import EditCampaignModal from "../components/EditCampaignModal";
import CampaignAnalyticsModal from "../components/CampaignAnalyticsModal";
import DonorListModal from "../components/DonorListModal";

const OrganizerDashboard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // Mock organizer campaigns
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      title: "Community Diwali Celebration 2024",
      description: "Grand community Diwali celebration with traditional performances and food",
      category: "Diwali",
      raised: 450000,
      goal: 600000,
      donors: 234,
      daysLeft: 12,
      status: "active",
      image: "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      createdAt: "2024-07-15",
      location: "Mumbai, Maharashtra"
    },
    {
      id: 2,
      title: "Holi Festival for Children",
      description: "Safe and fun Holi celebration for underprivileged children",
      category: "Holi",
      raised: 125000,
      goal: 200000,
      donors: 87,
      daysLeft: 45,
      status: "active",
      image: "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      createdAt: "2024-07-10",
      location: "Delhi, India"
    }
  ]);

  const [pastCampaigns] = useState([
    {
      id: 3,
      title: "Ganesh Chaturthi 2023",
      description: "Last year's successful Ganesh festival celebration",
      category: "Ganesh Chaturthi",
      raised: 750000,
      goal: 500000,
      donors: 423,
      status: "completed",
      image: "https://images.pexels.com/photos/33547334/pexels-photo-33547334.jpeg",
      completedAt: "2023-09-15",
      location: "Mumbai, Maharashtra",
      impactReport: "Successfully organized for 3000+ families with cultural programs and community feast"
    }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      case 'paused':
        return <Badge className="bg-yellow-100 text-yellow-800">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now(),
      ...campaignData,
      raised: 0,
      donors: 0,
      status: "active",
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setShowCreateModal(false);
  };

  const handleEditCampaign = (updatedCampaign) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    );
    setShowEditModal(false);
  };

  const handleViewAnalytics = (campaign) => {
    setSelectedCampaign(campaign);
    setShowAnalyticsModal(true);
  };

  const handleViewDonors = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonorModal(true);
  };

  const handleShareCampaign = (campaign) => {
    const shareText = `Support "${campaign.title}" - Help us celebrate ${campaign.category}! 🎉 Goal: ${formatCurrency(campaign.goal)} #FestiveFunds #${campaign.category}`;
    
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText + ` ${window.location.href}`);
    }
  };

  // Calculate totals
  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0) + 
                     pastCampaigns.reduce((sum, c) => sum + c.raised, 0);
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0) + 
                     pastCampaigns.reduce((sum, c) => sum + c.donors, 0);
  const totalCampaigns = campaigns.length + pastCampaigns.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your festival campaigns, {user?.name}! 🎪</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Campaign</span>
              </Button>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Raised</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalRaised)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Supporters</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDonors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{campaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round((pastCampaigns.length / Math.max(totalCampaigns, 1)) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Active Campaigns ({campaigns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Archive className="h-4 w-4" />
              <span>Past Campaigns ({pastCampaigns.length})</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Active Campaigns Tab */}
          <TabsContent value="active">
            {campaigns.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Active Campaigns
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Create your first festival fundraising campaign and start making a difference in your community.
                  </p>
                  <Button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Campaign
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <Badge className="bg-green-600">{campaign.category}</Badge>
                        {getStatusBadge(campaign.status)}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {campaign.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {campaign.description}
                      </p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Raised: {formatCurrency(campaign.raised)}</span>
                          <span>Goal: {formatCurrency(campaign.goal)}</span>
                        </div>
                        <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} />
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{campaign.donors} donors</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewAnalytics(campaign)}
                        >
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDonors(campaign)}
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Donors
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleShareCampaign(campaign)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Past Campaigns Tab */}
          <TabsContent value="past">
            <div className="space-y-6">
              {pastCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {campaign.title}
                            </h3>
                            <div className="flex items-center space-x-4 mb-3">
                              <Badge className="bg-blue-600">{campaign.category}</Badge>
                              {getStatusBadge(campaign.status)}
                              <span className="text-sm text-gray-600">
                                Completed on {campaign.completedAt}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              {formatCurrency(campaign.raised)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {Math.round((campaign.raised / campaign.goal) * 100)}% of goal
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-4">
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{campaign.donors}</div>
                            <div className="text-sm text-gray-600">Total Donors</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">
                              {formatCurrency(campaign.goal)}
                            </div>
                            <div className="text-sm text-gray-600">Initial Goal</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900">
                              +{formatCurrency(Math.max(0, campaign.raised - campaign.goal))}
                            </div>
                            <div className="text-sm text-gray-600">Exceeded Goal</div>
                          </div>
                        </div>

                        {campaign.impactReport && (
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-medium text-green-900 mb-2">Impact Report</h4>
                            <p className="text-green-800 text-sm">{campaign.impactReport}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Average Donation Amount</span>
                      <span className="text-xl font-bold text-green-600">₹2,450</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Conversion Rate</span>
                      <span className="text-xl font-bold text-blue-600">12.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <span className="font-medium">Campaign Views</span>
                      <span className="text-xl font-bold text-purple-600">15,430</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Festivals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Ganesh Chaturthi</span>
                      <span className="text-lg font-bold">₹7.5L</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Diwali</span>
                      <span className="text-lg font-bold">₹4.5L</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                      <span className="font-medium">Holi</span>
                      <span className="text-lg font-bold">₹1.25L</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Fundraising Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-gray-500">
                    <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p>Detailed analytics charts would be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateCampaignModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCampaign}
        />
      )}

      {showEditModal && selectedCampaign && (
        <EditCampaignModal
          campaign={selectedCampaign}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleEditCampaign}
        />
      )}

      {showAnalyticsModal && selectedCampaign && (
        <CampaignAnalyticsModal
          campaign={selectedCampaign}
          onClose={() => setShowAnalyticsModal(false)}
        />
      )}

      {showDonorModal && selectedCampaign && (
        <DonorListModal
          campaign={selectedCampaign}
          onClose={() => setShowDonorModal(false)}
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;