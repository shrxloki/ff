import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, MapPin, Target, Upload, Camera } from "lucide-react";
import { toast } from "../hooks/use-toast";

const CreateCampaignModal = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    title: "",
    description: "",
    category: "",
    goal: "",
    location: "",
    endDate: "",
    image: ""
  });

  const festivals = [
    "Diwali", "Holi", "Eid", "Durga Puja", "Ganesh Chaturthi", 
    "Navratri", "Karva Chauth", "Dussehra", "Janmashtami", "Onam"
  ];

  const festivalImages = {
    "Diwali": "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    "Holi": "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    "Eid": "https://images.unsplash.com/photo-1720593446840-b2a993a2c005?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    "Durga Puja": "https://images.unsplash.com/photo-1590906424086-3dbc808fd54b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
    "Ganesh Chaturthi": "https://images.pexels.com/photos/33547334/pexels-photo-33547334.jpeg",
    "Navratri": "https://images.unsplash.com/photo-1718563301211-65e9702765e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxjZWxlYnJhdGlvbiUyMGNvbW11bml0eXxlbnwwfHx8fDE3NTYwMzIzNTR8MA&ixlib=rb-4.1.0&q=85"
  };

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category) => {
    setCampaignData(prev => ({ 
      ...prev, 
      category,
      image: festivalImages[category] || ""
    }));
  };

  const validateStep1 = () => {
    if (!campaignData.title || !campaignData.category) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in the campaign title and select a festival",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!campaignData.description || campaignData.description.length < 50) {
      toast({
        title: "Description Required",
        description: "Please provide a detailed description (at least 50 characters)",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    const goal = parseFloat(campaignData.goal);
    if (!campaignData.goal || goal < 10000 || goal > 10000000) {
      toast({
        title: "Invalid Goal",
        description: "Please set a goal between ₹10,000 and ₹1,00,00,000",
        variant: "destructive"
      });
      return false;
    }
    
    if (!campaignData.location || !campaignData.endDate) {
      toast({
        title: "Missing Details",
        description: "Please provide location and end date",
        variant: "destructive"
      });
      return false;
    }
    
    const endDate = new Date(campaignData.endDate);
    const today = new Date();
    if (endDate <= today) {
      toast({
        title: "Invalid Date",
        description: "End date must be in the future",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    let isValid = false;
    if (step === 1) isValid = validateStep1();
    else if (step === 2) isValid = validateStep2();
    
    if (isValid) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      // Calculate days left
      const endDate = new Date(campaignData.endDate);
      const today = new Date();
      const daysLeft = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      
      onCreate({
        ...campaignData,
        goal: parseFloat(campaignData.goal),
        daysLeft
      });
      
      toast({
        title: "Campaign Created! 🎉",
        description: "Your festival campaign is now live and ready to receive donations"
      });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create Festival Campaign
          </DialogTitle>
          <div className="flex items-center justify-center space-x-2 mt-4">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNum}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Basic Campaign Information</h3>
                <p className="text-gray-600">Let's start with the essentials</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Campaign Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Community Diwali Celebration 2024"
                    value={campaignData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Festival Category *
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {festivals.map((festival) => (
                      <button
                        key={festival}
                        type="button"
                        onClick={() => handleCategorySelect(festival)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          campaignData.category === festival
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium">{festival}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {campaignData.category && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={festivalImages[campaignData.category]}
                        alt={campaignData.category}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium">Selected Festival: {campaignData.category}</p>
                        <p className="text-sm text-gray-600">
                          Template image has been automatically selected
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Tell Your Story</h3>
                <p className="text-gray-600">Describe what makes your campaign special</p>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Campaign Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your festival campaign, what you're organizing, who will benefit, and why people should support you..."
                  value={campaignData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1 min-h-32"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {campaignData.description.length} characters (minimum 50 required)
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Writing Tips</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Explain the festival's significance and traditions</li>
                  <li>• Describe how the funds will be used</li>
                  <li>• Share the expected impact on your community</li>
                  <li>• Include any special activities or performances planned</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Goals and Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Campaign Details</h3>
                <p className="text-gray-600">Set your funding goal and campaign timeline</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal" className="text-sm font-medium text-gray-700">
                    Funding Goal (₹) *
                  </Label>
                  <Input
                    id="goal"
                    type="number"
                    placeholder="50000"
                    value={campaignData.goal}
                    onChange={(e) => handleInputChange("goal", e.target.value)}
                    className="mt-1"
                    min="10000"
                    max="10000000"
                  />
                  {campaignData.goal && (
                    <div className="text-sm text-green-600 mt-1">
                      Goal: {formatCurrency(parseFloat(campaignData.goal) || 0)}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                    Campaign End Date *
                  </Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Event Location *
                </Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, Maharashtra"
                    value={campaignData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Preview Card */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Campaign Preview</h4>
                  <div className="flex space-x-4">
                    <img
                      src={campaignData.image}
                      alt="Campaign preview"
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-semibold text-lg">{campaignData.title || "Your Campaign Title"}</h5>
                      <p className="text-gray-600 text-sm">{campaignData.category}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-600 flex items-center">
                          <Target className="h-3 w-3 mr-1" />
                          {campaignData.goal ? formatCurrency(parseFloat(campaignData.goal)) : "Goal"}
                        </span>
                        <span className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {campaignData.location || "Location"}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={step === 1 ? onClose : () => setStep(step - 1)}
            >
              {step === 1 ? "Cancel" : "Back"}
            </Button>
            
            {step < 3 ? (
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                Create Campaign
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;