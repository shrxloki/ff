import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Users, 
  Search, 
  Download, 
  Mail, 
  Heart, 
  Trophy,
  Calendar,
  MessageCircle,
  Filter
} from "lucide-react";

const DonorListModal = ({ campaign, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState("all");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock donor data
  const donors = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@example.com",
      amount: 10000,
      tier: "Gold",
      date: "2024-07-22",
      time: "2 hours ago",
      message: "Happy to support this beautiful initiative! May this Diwali bring joy to everyone! 🪔✨",
      isRecurring: false,
      location: "Mumbai, Maharashtra"
    },
    {
      id: 2,
      name: "Raj Patel",
      email: "raj@example.com", 
      amount: 5000,
      tier: "Silver",
      date: "2024-07-22",
      time: "5 hours ago",
      message: "Proud to be part of this community celebration",
      isRecurring: true,
      location: "Delhi, India"
    },
    {
      id: 3,
      name: "Anonymous Donor",
      email: "hidden",
      amount: 2500,
      tier: "Bronze",
      date: "2024-07-21",
      time: "1 day ago",
      message: "",
      isRecurring: false,
      location: "Bangalore, Karnataka"
    },
    {
      id: 4,
      name: "Kavya Singh",
      email: "kavya@example.com",
      amount: 3000,
      tier: "Bronze",
      date: "2024-07-21",
      time: "1 day ago",
      message: "Every festival should be celebrated with community spirit! 🎉",
      isRecurring: false,
      location: "Chennai, Tamil Nadu"
    },
    {
      id: 5,
      name: "Amit Kumar",
      email: "amit@example.com",
      amount: 7500,
      tier: "Silver",
      date: "2024-07-20",
      time: "2 days ago",
      message: "Great work organizing this event for the community",
      isRecurring: false,
      location: "Pune, Maharashtra"
    }
  ];

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTierIcon = (tier) => {
    if (tier === 'Gold') return <Trophy className="h-4 w-4 text-yellow-600" />;
    if (tier === 'Silver') return <Trophy className="h-4 w-4 text-gray-600" />;
    return <Trophy className="h-4 w-4 text-orange-600" />;
  };

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = filterTier === "all" || donor.tier.toLowerCase() === filterTier.toLowerCase();
    return matchesSearch && matchesTier;
  });

  const totalDonations = donors.reduce((sum, donor) => sum + donor.amount, 0);
  const avgDonation = totalDonations / donors.length;

  const tierStats = {
    Gold: donors.filter(d => d.tier === 'Gold').length,
    Silver: donors.filter(d => d.tier === 'Silver').length,
    Bronze: donors.filter(d => d.tier === 'Bronze').length
  };

  const handleSendThankYou = (donor) => {
    // Mock sending thank you email
    console.log(`Sending thank you to ${donor.name}`);
  };

  const handleExportDonors = () => {
    // Mock CSV export
    console.log('Exporting donor list...');
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <Users className="h-6 w-6" />
            <span>Campaign Donors</span>
          </DialogTitle>
          <p className="text-gray-600">{campaign.title}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{donors.length}</div>
                <div className="text-sm text-gray-600">Total Donors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(avgDonation)}
                </div>
                <div className="text-sm text-gray-600">Avg Donation</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {donors.filter(d => d.isRecurring).length}
                </div>
                <div className="text-sm text-gray-600">Recurring</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {tierStats.Gold}
                </div>
                <div className="text-sm text-gray-600">Gold Donors</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search donors by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex space-x-2">
              <div className="flex space-x-1">
                {["all", "gold", "silver", "bronze"].map((tier) => (
                  <Button
                    key={tier}
                    variant={filterTier === tier ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterTier(tier)}
                    className="capitalize"
                  >
                    {tier === "all" ? "All Tiers" : tier}
                  </Button>
                ))}
              </div>
              
              <Button variant="outline" size="sm" onClick={handleExportDonors}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Donors List */}
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">Donor List ({filteredDonors.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredDonors.map((donor) => (
                <Card key={donor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-semibold text-lg">{donor.name}</h3>
                            <Badge className={getTierColor(donor.tier)}>
                              <div className="flex items-center space-x-1">
                                {getTierIcon(donor.tier)}
                                <span>{donor.tier}</span>
                              </div>
                            </Badge>
                            {donor.isRecurring && (
                              <Badge variant="outline" className="text-blue-600 border-blue-600">
                                Recurring
                              </Badge>
                            )}
                          </div>
                          
                          <div className="text-gray-600 text-sm space-y-1">
                            <div className="flex items-center space-x-4">
                              <span>{donor.location}</span>
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {donor.time}
                              </span>
                            </div>
                            {donor.email !== "hidden" && (
                              <div>{donor.email}</div>
                            )}
                          </div>
                          
                          {donor.message && (
                            <div className="mt-3 bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-start space-x-2">
                                <MessageCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                <p className="text-gray-700 text-sm">{donor.message}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600 mb-2">
                          {formatCurrency(donor.amount)}
                        </div>
                        
                        <div className="flex space-x-2">
                          {donor.email !== "hidden" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendThankYou(donor)}
                            >
                              <Mail className="h-4 w-4 mr-1" />
                              Thank
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredDonors.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Donors Found</h3>
                  <p className="text-gray-600">
                    {searchQuery || filterTier !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "No donors have contributed to this campaign yet"
                    }
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-4">Donation Tiers</h4>
                    <div className="space-y-3">
                      {Object.entries(tierStats).map(([tier, count]) => (
                        <div key={tier} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getTierIcon(tier)}
                            <span className="font-medium">{tier} Tier</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(count / donors.length) * 100}%` }}
                              />
                            </div>
                            <span className="font-bold w-8 text-right">{count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold mb-4">Top Locations</h4>
                    <div className="space-y-3">
                      {["Mumbai", "Delhi", "Bangalore", "Chennai", "Pune"].map((city, index) => {
                        const cityDonors = donors.filter(d => d.location.includes(city)).length;
                        return (
                          <div key={city} className="flex items-center justify-between">
                            <span className="font-medium">{city}</span>
                            <span className="font-bold">{cityDonors} donors</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold mb-4">Donation Timeline</h4>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Donation timeline chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonorListModal;