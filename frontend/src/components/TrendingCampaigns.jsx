import React from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Calendar, Users, Heart, Share } from "lucide-react";

const TrendingCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      title: "Community Diwali Celebration 2024",
      organizer: "Mumbai Heritage Society",
      description: "Help us organize a grand community Diwali celebration with traditional performances, food, and fireworks for 5000+ families.",
      image: "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      raised: 450000,
      goal: 600000,
      donors: 234,
      daysLeft: 12,
      category: "Diwali"
    },
    {
      id: 2,
      title: "Holi Colors for Underprivileged Children",
      organizer: "Delhi Youth Foundation",
      description: "Bringing joy to 1000+ underprivileged children with safe, organic colors and traditional Holi treats.",
      image: "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      raised: 125000,
      goal: 200000,
      donors: 87,
      daysLeft: 45,
      category: "Holi"
    },
    {
      id: 3,
      title: "Eid Feast for Homeless Families",
      organizer: "Bangalore Care Foundation",
      description: "Organizing a special Eid feast and gift distribution for 500 homeless families in Bangalore.",
      image: "https://images.unsplash.com/photo-1720593446840-b2a993a2c005?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      raised: 89000,
      goal: 150000,
      donors: 156,
      daysLeft: 8,
      category: "Eid"
    }
  ];

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

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trending Festival Campaigns
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of donors supporting meaningful festival celebrations across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {campaign.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Share className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {campaign.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-1">
                  by <span className="font-medium">{campaign.organizer}</span>
                </p>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {campaign.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Raised: {formatCurrency(campaign.raised)}</span>
                    <span>Goal: {formatCurrency(campaign.goal)}</span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(campaign.raised, campaign.goal)} 
                    className="h-2"
                  />
                </div>

                {/* Stats */}
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

                {/* Action Button */}
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Donate Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 rounded-full">
            View All Campaigns
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrendingCampaigns;