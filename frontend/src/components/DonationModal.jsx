import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Heart, CreditCard, Smartphone, University, Gift } from "lucide-react";
import { toast } from "../hooks/use-toast";

const DonationModal = ({ campaign, onClose, onComplete }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success
  const [processing, setProcessing] = useState(false);

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

  const getDonationTier = (amount) => {
    const numAmount = parseFloat(amount);
    if (numAmount >= 10000) return { tier: "Gold", color: "bg-yellow-500" };
    if (numAmount >= 5000) return { tier: "Silver", color: "bg-gray-400" };
    return { tier: "Bronze", color: "bg-orange-600" };
  };

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000];

  const handleAmountSelect = (amount) => {
    setDonationAmount(amount.toString());
  };

  const handleNext = () => {
    if (!donationAmount || parseFloat(donationAmount) < 100) {
      toast({
        title: "Invalid Amount",
        description: "Minimum donation amount is ₹100",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const tier = getDonationTier(donationAmount);
      onComplete({
        amount: parseFloat(donationAmount),
        campaignTitle: campaign.title,
        festival: campaign.category,
        tier: tier.tier,
        paymentMethod
      });
      
      toast({
        title: "Donation Successful! 🎉",
        description: `You've donated ${formatCurrency(parseFloat(donationAmount))} and earned a ${tier.tier} NFT badge!`
      });
      
      setStep(3);
      setProcessing(false);
      
      // Close modal after showing success
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 2000);
  };

  const paymentMethods = [
    { id: "upi", name: "UPI", icon: Smartphone, description: "PhonePe, Google Pay, Paytm" },
    { id: "card", name: "Card", icon: CreditCard, description: "Credit/Debit Card" },
    { id: "netbanking", name: "Net Banking", icon: University, description: "All major banks" }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {step === 1 && "Support This Campaign"}
            {step === 2 && "Complete Your Donation"}
            {step === 3 && "Thank You! 🎉"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Summary */}
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{campaign.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {campaign.organizer}</p>
                  <div className="flex items-center space-x-2">
                    <Badge>{campaign.category}</Badge>
                    <span className="text-sm text-gray-600">
                      {formatCurrency(campaign.raised)} raised of {formatCurrency(campaign.goal)}
                    </span>
                  </div>
                  <Progress 
                    value={getProgressPercentage(campaign.raised, campaign.goal)} 
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Amount Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Choose Donation Amount</h3>
                
                {/* Predefined Amounts */}
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {predefinedAmounts.map(amount => (
                    <Button
                      key={amount}
                      variant={donationAmount === amount.toString() ? "default" : "outline"}
                      onClick={() => handleAmountSelect(amount)}
                      className="h-12"
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter custom amount
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount in ₹"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="text-lg"
                    min="100"
                  />
                </div>

                {/* Tier Preview */}
                {donationAmount && parseFloat(donationAmount) >= 100 && (
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${getDonationTier(donationAmount).color} rounded-full flex items-center justify-center`}>
                        <Gift className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium">
                          You'll earn a <span className="text-purple-600">{getDonationTier(donationAmount).tier} NFT Badge</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Collectible digital certificate for your contribution
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleNext}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!donationAmount || parseFloat(donationAmount) < 100}
              >
                Continue to Payment
              </Button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Donation Amount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatCurrency(parseFloat(donationAmount))}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                
                <div className="space-y-3">
                  {paymentMethods.map(method => {
                    const IconComponent = method.icon;
                    return (
                      <div
                        key={method.id}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-6 w-6 text-gray-600" />
                          <div>
                            <p className="font-medium">{method.name}</p>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handlePayment}
                  disabled={processing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {processing ? "Processing..." : `Donate ${formatCurrency(parseFloat(donationAmount))}`}
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Heart className="h-10 w-10 text-green-600" fill="currentColor" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Donation Successful!</h3>
                <p className="text-gray-600">
                  Thank you for supporting {campaign.title}. Your contribution will make a real difference!
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Gift className="h-8 w-8 text-purple-600" />
                  <span className="text-xl font-bold text-purple-900">
                    {getDonationTier(donationAmount).tier} NFT Badge Unlocked!
                  </span>
                </div>
                <p className="text-purple-700">
                  Your unique {campaign.category} festival badge has been added to your collection
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;