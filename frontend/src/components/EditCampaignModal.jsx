import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { MapPin, Target, Calendar, Plus, X, Save, Pause, Play } from "lucide-react";
import { toast } from "../hooks/use-toast";

const EditCampaignModal = ({ campaign, onClose, onUpdate }) => {
  const [editedCampaign, setEditedCampaign] = useState({
    ...campaign
  });

  const [newUpdate, setNewUpdate] = useState({
    title: "",
    content: ""
  });

  const [updates, setUpdates] = useState([
    {
      id: 1,
      title: "Venue Confirmed!",
      content: "We've secured the beautiful City Hall for our celebration. The venue can accommodate 2000+ people.",
      date: new Date().toLocaleDateString(),
      author: "Campaign Organizer"
    }
  ]);

  const handleInputChange = (field, value) => {
    setEditedCampaign(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!editedCampaign.title || !editedCampaign.description) {
      toast({
        title: "Validation Error",
        description: "Title and description are required",
        variant: "destructive"
      });
      return;
    }

    onUpdate(editedCampaign);
    toast({
      title: "Campaign Updated! ✅",
      description: "Your changes have been saved successfully"
    });
  };

  const handleAddUpdate = () => {
    if (!newUpdate.title || !newUpdate.content) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content for the update",
        variant: "destructive"
      });
      return;
    }

    const update = {
      id: Date.now(),
      title: newUpdate.title,
      content: newUpdate.content,
      date: new Date().toLocaleDateString(),
      author: "Campaign Organizer"
    };

    setUpdates(prev => [update, ...prev]);
    setNewUpdate({ title: "", content: "" });
    
    toast({
      title: "Update Posted! 📢",
      description: "Your supporters will be notified about this update"
    });
  };

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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Campaign</DialogTitle>
          <div className="flex items-center space-x-2 mt-2">
            <Badge>{campaign.category}</Badge>
            <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
              {campaign.status}
            </Badge>
          </div>
        </DialogHeader>

        {/* Campaign Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(campaign.raised)}
            </div>
            <div className="text-sm text-gray-600">Raised ({getProgressPercentage(campaign.raised, campaign.goal).toFixed(1)}%)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{campaign.donors}</div>
            <div className="text-sm text-gray-600">Supporters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{campaign.daysLeft}</div>
            <div className="text-sm text-gray-600">Days Left</div>
          </div>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Campaign Details</TabsTrigger>
            <TabsTrigger value="updates">Updates ({updates.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Campaign Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Campaign Title
                  </Label>
                  <Input
                    id="title"
                    value={editedCampaign.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="goal" className="text-sm font-medium text-gray-700">
                    Funding Goal (₹)
                  </Label>
                  <Input
                    id="goal"
                    type="number"
                    value={editedCampaign.goal}
                    onChange={(e) => handleInputChange("goal", parseFloat(e.target.value))}
                    className="mt-1"
                  />
                  <div className="text-sm text-gray-600 mt-1">
                    Current: {formatCurrency(editedCampaign.goal)}
                  </div>
                </div>

                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                    Event Location
                  </Label>
                  <Input
                    id="location"
                    value={editedCampaign.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Campaign Description
                </Label>
                <Textarea
                  id="description"
                  value={editedCampaign.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1 min-h-48"
                />
              </div>
            </div>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-3">Campaign Preview</h4>
                <div className="flex space-x-4">
                  <img
                    src={editedCampaign.image}
                    alt="Campaign"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h5 className="font-semibold text-xl mb-1">{editedCampaign.title}</h5>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-600 flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        {formatCurrency(editedCampaign.goal)}
                      </span>
                      <span className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {editedCampaign.location}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {editedCampaign.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Updates Tab */}
          <TabsContent value="updates" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Post New Update</h4>
                <div className="space-y-4">
                  <Input
                    placeholder="Update title (e.g., Venue Confirmed, New Performers Added)"
                    value={newUpdate.title}
                    onChange={(e) => setNewUpdate(prev => ({ ...prev, title: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Share the latest news about your campaign..."
                    value={newUpdate.content}
                    onChange={(e) => setNewUpdate(prev => ({ ...prev, content: e.target.value }))}
                    className="min-h-24"
                  />
                  <Button 
                    onClick={handleAddUpdate}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post Update
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h4 className="font-medium">Campaign Updates</h4>
              {updates.map((update) => (
                <Card key={update.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-semibold text-lg">{update.title}</h5>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{update.date}</span>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{update.content}</p>
                    <div className="text-sm text-gray-500">by {update.author}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Campaign Status</h4>
                <div className="flex items-center space-x-4">
                  {campaign.status === 'active' ? (
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Pause className="h-4 w-4" />
                      <span>Pause Campaign</span>
                    </Button>
                  ) : (
                    <Button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4" />
                      <span>Resume Campaign</span>
                    </Button>
                  )}
                  <div className="text-sm text-gray-600">
                    {campaign.status === 'active' 
                      ? 'Campaign is currently accepting donations'
                      : 'Campaign is paused'
                    }
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">Get notified of new donations</div>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Daily Reports</div>
                      <div className="text-sm text-gray-600">Receive daily campaign summaries</div>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Milestone Alerts</div>
                      <div className="text-sm text-gray-600">Get alerts when reaching funding milestones</div>
                    </div>
                    <Button variant="outline" size="sm">Enabled</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4 text-red-600">Danger Zone</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Archive Campaign
                  </Button>
                  <div className="text-sm text-gray-600">
                    Archived campaigns are no longer visible to donors but data is preserved
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditCampaignModal;