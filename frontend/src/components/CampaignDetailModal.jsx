import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Heart, 
  Share, 
  MapPin, 
  Calendar, 
  Users, 
  Target,
  TrendingUp,
  MessageCircle,
  Clock,
  User
} from "lucide-react";

const CampaignDetailModal = ({ campaign, onClose, onDonate }) => {
  const [isFavorited, setIsFavorited] = useState(false);

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

  const handleShare = () => {
    const shareText = `Help support "${campaign.title}" organized by ${campaign.organizer}. Join me in making this festival celebration possible! 🎉 #FestiveFunds #${campaign.category}`;
    
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

  const recentDonations = [
    { name: "Priya Sharma", amount: 2500, time: "2 hours ago", message: "Happy to support this beautiful initiative! 🪔" },
    { name: "Raj Patel", amount: 5000, time: "5 hours ago", message: "May this Diwali bring joy to everyone!" },
    { name: "Anonymous", amount: 1000, time: "1 day ago", message: "" },
    { name: "Kavya Singh", amount: 3000, time: "1 day ago", message: "Proud to be part of this celebration" },
    { name: "Amit Kumar", amount: 1500, time: "2 days ago", message: "Every festival should be celebrated with community spirit" }
  ];

  const updates = [
    {
      id: 1,
      title: "Venue Confirmed! 🎉",
      content: "We've secured the beautiful City Hall for our celebration. The venue can accommodate 2000+ people and has all the facilities we need for a grand celebration.",
      date: "2 days ago",
      author: campaign.organizer
    },
    {
      id: 2,
      title: "Artist Line-up Announced",
      content: "Excited to share that we have confirmed performances by local dance groups and musicians. The cultural program will showcase the rich traditions of our festivals.",
      date: "5 days ago",
      author: campaign.organizer
    }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-left mb-2">
                {campaign.title}
              </DialogTitle>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {campaign.organizer}
                </span>
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {campaign.location}
                </span>
                <Badge>{campaign.category}</Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart 
                  className="h-4 w-4" 
                  fill={isFavorited ? "currentColor" : "none"}
                />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Hero Image */}
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{campaign.donors} supporters</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{campaign.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatCurrency(campaign.raised)}
                </span>
                <span className="text-gray-600">
                  of {formatCurrency(campaign.goal)} goal
                </span>
              </div>
              <Progress value={getProgressPercentage(campaign.raised, campaign.goal)} className="h-3" />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{getProgressPercentage(campaign.raised, campaign.goal).toFixed(1)}% funded</span>
                <span>{campaign.donors} donors</span>
              </div>
            </div>
            
            <Button 
              onClick={onDonate}
              className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
            >
              Donate Now
            </Button>
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="updates">Updates ({updates.length})</TabsTrigger>
              <TabsTrigger value="donors">Donors ({recentDonations.length})</TabsTrigger>
            </TabsList>

            {/* Story Tab */}
            <TabsContent value="story" className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">About This Campaign</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {campaign.description}
                </p>
                
                <div className="prose prose-gray max-w-none">
                  <p>
                    Our festival celebration is more than just an event – it's a community coming together 
                    to preserve and share our rich cultural heritage. Every year, we organize this celebration 
                    to ensure that our traditions are passed down to the next generation while creating 
                    memorable experiences for families and children.
                  </p>
                  
                  <p>
                    This year, we're planning something extra special. With your support, we can:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Arrange traditional cultural performances and folk dances</li>
                    <li>Set up food stalls featuring authentic festive delicacies</li>
                    <li>Organize workshops for children to learn traditional crafts</li>
                    <li>Create beautiful decorations and lighting installations</li>
                    <li>Ensure safety and security for all attendees</li>
                  </ul>
                  
                  <p>
                    Your contribution, no matter how small, helps us create magic for thousands of families. 
                    Join us in making this festival unforgettable!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="font-bold text-blue-900 mb-3">How Funds Will Be Used</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Venue & Setup</span>
                    <span className="font-medium text-blue-900">40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Cultural Programs</span>
                    <span className="font-medium text-blue-900">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Food & Refreshments</span>
                    <span className="font-medium text-blue-900">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Safety & Security</span>
                    <span className="font-medium text-blue-900">10%</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="space-y-6">
              <h3 className="text-xl font-bold">Campaign Updates</h3>
              
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-4 border-green-500 pl-6 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{update.title}</h4>
                      <span className="text-sm text-gray-500">{update.date}</span>
                    </div>
                    <p className="text-gray-700 mb-2">{update.content}</p>
                    <div className="text-sm text-gray-500">
                      by {update.author}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Donors Tab */}
            <TabsContent value="donors" className="space-y-6">
              <h3 className="text-xl font-bold">Recent Supporters</h3>
              
              <div className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{donation.name}</span>
                          <span className="text-sm text-gray-500">{donation.time}</span>
                        </div>
                        {donation.message && (
                          <div className="bg-white p-3 rounded-lg mt-2 max-w-md">
                            <p className="text-gray-700 text-sm">{donation.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {formatCurrency(donation.amount)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  Be among the supporters of this beautiful initiative!
                </p>
                <Button 
                  onClick={onDonate}
                  className="mt-4 bg-green-600 hover:bg-green-700"
                >
                  Make a Donation
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailModal;