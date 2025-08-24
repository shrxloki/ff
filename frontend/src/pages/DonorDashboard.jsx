import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { useAuth } from "../contexts/AuthContext";
import { 
  Heart, 
  Bell, 
  Gift, 
  Share, 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  Users,
  TrendingUp,
  Award,
  Download,
  Eye,
  Star
} from "lucide-react";
import { mockCampaigns, mockFestivals } from "../data/mockData";
import DonationModal from "../components/DonationModal";
import NFTModal from "../components/NFTModal";
import CampaignDetailModal from "../components/CampaignDetailModal";

const DonorDashboard = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showNFTModal, setShowNFTModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donations, setDonations] = useState([
    {
      id: 1,
      campaignTitle: "Community Diwali Celebration 2024",
      amount: 5000,
      date: "2024-07-20",
      nftReceived: "diwali-2024-bronze",
      status: "completed"
    },
    {
      id: 2,
      campaignTitle: "Holi Colors for Underprivileged Children",
      amount: 2500,
      date: "2024-07-18",
      nftReceived: "holi-2024-bronze",
      status: "completed"
    }
  ]);
  const [nftCollection, setNftCollection] = useState([
    {
      id: "diwali-2024-bronze",
      festival: "Diwali",
      tier: "Bronze",
      year: 2024,
      image: "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      donationAmount: 5000
    },
    {
      id: "holi-2024-bronze",
      festival: "Holi",
      tier: "Bronze",
      year: 2024,
      image: "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      donationAmount: 2500
    }
  ]);
  const [favoritesCampaigns, setFavoritesCampaigns] = useState([1, 3]);

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

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesFilter = selectedFilter === "all" || campaign.category.toLowerCase() === selectedFilter.toLowerCase();
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         campaign.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDonate = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonationModal(true);
  };

  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  const handleFavorite = (campaignId) => {
    setFavoritesCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleShare = (campaign) => {
    const shareText = `Help support "${campaign.title}" organized by ${campaign.organizer}. Join me in making this festival celebration possible! 🎉 #FestiveFunds #${campaign.category}`;
    
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText + ` ${window.location.href}`);
      // Could show toast here
    }
  };

  const completeDonation = (donationData) => {
    // Add to donations list
    const newDonation = {
      id: donations.length + 1,
      campaignTitle: donationData.campaignTitle,
      amount: donationData.amount,
      date: new Date().toISOString().split('T')[0],
      nftReceived: `${donationData.festival.toLowerCase()}-2024-${donationData.tier.toLowerCase()}`,
      status: "completed"
    };
    
    setDonations(prev => [newDonation, ...prev]);
    
    // Add NFT to collection
    const newNFT = {
      id: newDonation.nftReceived,
      festival: donationData.festival,
      tier: donationData.tier,
      year: 2024,
      image: selectedCampaign?.image || "",
      donationAmount: donationData.amount
    };
    
    setNftCollection(prev => [newNFT, ...prev]);
    
    setShowDonationModal(false);
    setShowNFTModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user?.name}! 🎉</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowNFTModal(true)}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Gift className="h-4 w-4" />
                <span>My NFTs ({nftCollection.length})</span>
              </Button>
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">3</span>
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
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Donated</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(donations.reduce((sum, d) => sum + d.amount, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Campaigns Supported</p>
                  <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">NFT Badges</p>
                  <p className="text-2xl font-bold text-gray-900">{nftCollection.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{favoritesCampaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Browse Campaigns</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Donation History</span>
            </TabsTrigger>
            <TabsTrigger value="nfts" className="flex items-center space-x-2">
              <Gift className="h-4 w-4" />
              <span>NFT Collection</span>
            </TabsTrigger>
          </TabsList>

          {/* Browse Campaigns Tab */}
          <TabsContent value="browse">
            {/* Filters and Search */}
            <div className="bg-white rounded-lg p-6 mb-6 border">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                  >
                    All Festivals
                  </Button>
                  {mockFestivals.map(festival => (
                    <Button
                      key={festival.id}
                      variant={selectedFilter === festival.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFilter(festival.name)}
                    >
                      {festival.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-600">{campaign.category}</Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleFavorite(campaign.id)}
                        className={`p-2 rounded-full ${
                          favoritesCampaigns.includes(campaign.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-600'
                        } hover:scale-110 transition-transform`}
                      >
                        <Heart className="h-4 w-4" fill={favoritesCampaigns.includes(campaign.id) ? "currentColor" : "none"} />
                      </button>
                      <button
                        onClick={() => handleShare(campaign)}
                        className="bg-white/90 p-2 rounded-full text-gray-600 hover:scale-110 transition-transform"
                      >
                        <Share className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {campaign.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-1">
                      by <span className="font-medium">{campaign.organizer}</span>
                    </p>
                    
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: {formatCurrency(campaign.raised)}</span>
                        <span>Goal: {formatCurrency(campaign.goal)}</span>
                      </div>
                      <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} />
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{campaign.donors} donors</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{campaign.daysLeft} days left</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => handleViewCampaign(campaign)}
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        onClick={() => handleDonate(campaign)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        Donate Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Donation History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Your Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{donation.campaignTitle}</h4>
                        <p className="text-sm text-gray-600">Donated on {donation.date}</p>
                        {donation.nftReceived && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Gift className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-purple-600 font-medium">NFT Badge Received</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(donation.amount)}
                        </div>
                        <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                          {donation.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Collection Tab */}
          <TabsContent value="nfts">
            <Card>
              <CardHeader>
                <CardTitle>Your NFT Badge Collection</CardTitle>
                <p className="text-gray-600">Collect unique badges for every festival you support!</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {nftCollection.map((nft) => (
                    <div key={nft.id} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 overflow-hidden">
                        <img
                          src={nft.image}
                          alt={`${nft.festival} ${nft.tier} Badge`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-1">{nft.festival} {nft.year}</h3>
                      <Badge variant="secondary" className="mb-2">{nft.tier} Tier</Badge>
                      <p className="text-sm text-gray-600">
                        For donating {formatCurrency(nft.donationAmount)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-3 w-full"
                        onClick={() => {/* Could trigger download or share */}}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {showDonationModal && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setShowDonationModal(false)}
          onComplete={completeDonation}
        />
      )}

      {showNFTModal && (
        <NFTModal
          nfts={nftCollection}
          onClose={() => setShowNFTModal(false)}
        />
      )}

      {showCampaignModal && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          onClose={() => setShowCampaignModal(false)}
          onDonate={() => {
            setShowCampaignModal(false);
            setShowDonationModal(true);
          }}
        />
      )}
    </div>
  );
};

export default DonorDashboard;