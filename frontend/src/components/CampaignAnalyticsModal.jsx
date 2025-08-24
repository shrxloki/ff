import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Share, 
  Calendar,
  MapPin,
  Target,
  BarChart3,
  PieChart,
  Download,
  RefreshCw
} from "lucide-react";

const CampaignAnalyticsModal = ({ campaign, onClose }) => {
  const [timeframe, setTimeframe] = useState("week");

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

  // Mock analytics data
  const analyticsData = {
    views: 15430,
    conversionRate: 12.5,
    avgDonation: 2450,
    shareCount: 234,
    peakDonationDay: "Saturday",
    topReferrer: "WhatsApp",
    donationTrend: [
      { day: "Mon", amount: 15000 },
      { day: "Tue", amount: 23000 },
      { day: "Wed", amount: 18000 },
      { day: "Thu", amount: 31000 },
      { day: "Fri", amount: 28000 },
      { day: "Sat", amount: 45000 },
      { day: "Sun", amount: 35000 }
    ],
    donorSegments: [
      { segment: "First-time Donors", count: 156, percentage: 66.7 },
      { segment: "Repeat Donors", count: 78, percentage: 33.3 }
    ],
    geographicData: [
      { location: "Mumbai", donors: 89, amount: 245000 },
      { location: "Delhi", donors: 67, amount: 189000 },
      { location: "Bangalore", donors: 45, amount: 123000 },
      { location: "Other Cities", donors: 33, amount: 87000 }
    ],
    hourlyPattern: [
      { hour: "6-9 AM", donations: 12 },
      { hour: "9-12 PM", donations: 28 },
      { hour: "12-3 PM", donations: 45 },
      { hour: "3-6 PM", donations: 67 },
      { hour: "6-9 PM", donations: 89 },
      { hour: "9-12 AM", donations: 34 }
    ]
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span>Campaign Analytics</span>
          </DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge>{campaign.category}</Badge>
            <span className="text-gray-600">{campaign.title}</span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(campaign.raised)}
                </div>
                <div className="text-sm text-gray-600">Total Raised</div>
                <div className="text-xs text-green-600 mt-1">
                  {getProgressPercentage(campaign.raised, campaign.goal).toFixed(1)}% of goal
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{campaign.donors}</div>
                <div className="text-sm text-gray-600">Total Donors</div>
                <div className="text-xs text-blue-600 mt-1">
                  Avg: {formatCurrency(analyticsData.avgDonation)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {analyticsData.views.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Page Views</div>
                <div className="text-xs text-purple-600 mt-1">
                  {analyticsData.conversionRate}% conversion
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Share className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{analyticsData.shareCount}</div>
                <div className="text-sm text-gray-600">Shares</div>
                <div className="text-xs text-orange-600 mt-1">
                  Via {analyticsData.topReferrer}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Time Period:</span>
              <div className="flex space-x-1">
                {["day", "week", "month", "all"].map((period) => (
                  <Button
                    key={period}
                    variant={timeframe === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className="capitalize"
                  >
                    {period === "all" ? "All Time" : `Last ${period}`}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Detailed Analytics Tabs */}
          <Tabs defaultValue="donations" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>

            {/* Donations Tab */}
            <TabsContent value="donations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Donation Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.donationTrend.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.day}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${(item.amount / 45000) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold text-green-600">
                              {formatCurrency(item.amount)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Donation Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-green-800 mb-1">
                          Peak Donation Day
                        </div>
                        <div className="text-2xl font-bold text-green-900">
                          {analyticsData.peakDonationDay}
                        </div>
                        <div className="text-xs text-green-700">
                          Most donations received on weekends
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 mb-1">
                          Average Donation
                        </div>
                        <div className="text-2xl font-bold text-blue-900">
                          {formatCurrency(analyticsData.avgDonation)}
                        </div>
                        <div className="text-xs text-blue-700">
                          Higher than platform average
                        </div>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm font-medium text-purple-800 mb-1">
                          Conversion Rate
                        </div>
                        <div className="text-2xl font-bold text-purple-900">
                          {analyticsData.conversionRate}%
                        </div>
                        <div className="text-xs text-purple-700">
                          Views to donations ratio
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Audience Tab */}
            <TabsContent value="audience" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donor Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.donorSegments.map((segment, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{segment.segment}</span>
                            <span>{segment.count} donors ({segment.percentage}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${segment.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Donation Timing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analyticsData.hourlyPattern.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.hour}</span>
                          <div className="flex items-center space-x-3">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-orange-600 h-2 rounded-full"
                                style={{ width: `${(item.donations / 89) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-bold">{item.donations}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Geography Tab */}
            <TabsContent value="geography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.geographicData.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <span className="font-medium">{location.location}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{formatCurrency(location.amount)}</div>
                          <div className="text-sm text-gray-600">{location.donors} donors</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Engagement Tab */}
            <TabsContent value="engagement" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {analyticsData.views.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-sm">Total Views</div>
                    <div className="text-xs text-green-600 mt-1">+15% from last week</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {analyticsData.shareCount}
                    </div>
                    <div className="text-gray-600 text-sm">Social Shares</div>
                    <div className="text-xs text-green-600 mt-1">+8% from last week</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {analyticsData.conversionRate}%
                    </div>
                    <div className="text-gray-600 text-sm">Conversion Rate</div>
                    <div className="text-xs text-green-600 mt-1">+2.3% from last week</div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { source: "WhatsApp", percentage: 45, visits: 6943 },
                      { source: "Facebook", percentage: 28, visits: 4320 },
                      { source: "Direct", percentage: 15, visits: 2314 },
                      { source: "Instagram", percentage: 12, visits: 1853 }
                    ].map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{source.source}</span>
                        <div className="flex items-center space-x-3">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${source.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold w-16 text-right">
                            {source.visits.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
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

export default CampaignAnalyticsModal;