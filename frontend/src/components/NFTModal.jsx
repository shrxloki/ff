import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Share, Trophy, Gift, Sparkles } from "lucide-react";

const NFTModal = ({ nfts, onClose }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-purple-400 to-purple-600';
    }
  };

  const handleDownload = (nft) => {
    // Simulate NFT download
    const link = document.createElement('a');
    link.href = nft.image;
    link.download = `${nft.festival}-${nft.year}-${nft.tier}-Badge.jpg`;
    link.click();
  };

  const handleShare = (nft) => {
    const shareText = `I just earned a ${nft.tier} NFT badge for supporting ${nft.festival} ${nft.year} on FestiveFunds! 🎉 #FestiveFunds #${nft.festival} #NFT`;
    
    if (navigator.share) {
      navigator.share({
        title: `${nft.festival} ${nft.tier} Badge`,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center space-x-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span>My NFT Badge Collection</span>
            <Sparkles className="h-6 w-6 text-purple-600" />
          </DialogTitle>
          <p className="text-gray-600 text-center">
            Your digital certificates of festival support
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Collection Stats */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-900">{nfts.length}</div>
                <div className="text-purple-600 text-sm">Total Badges</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {nfts.filter(n => n.tier === 'Gold').length}
                </div>
                <div className="text-purple-600 text-sm">Gold Tier</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">
                  {formatCurrency(nfts.reduce((sum, nft) => sum + nft.donationAmount, 0))}
                </div>
                <div className="text-purple-600 text-sm">Total Contributed</div>
              </div>
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nfts.map((nft, index) => (
              <div
                key={nft.id}
                className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${getTierColor(nft.tier)} p-1 hover:scale-105 transition-transform cursor-pointer`}
                onClick={() => setSelectedNFT(nft)}
              >
                <div className="bg-white rounded-lg p-6 text-center space-y-4">
                  {/* Badge Image */}
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-100 ring-4 ring-white shadow-lg">
                      <img
                        src={nft.image}
                        alt={`${nft.festival} ${nft.tier} Badge`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Tier Badge */}
                    <div className="absolute -top-2 -right-2">
                      {nft.tier === 'Gold' && <Trophy className="h-6 w-6 text-yellow-500" />}
                      {nft.tier === 'Silver' && <Trophy className="h-6 w-6 text-gray-400" />}
                      {nft.tier === 'Bronze' && <Trophy className="h-6 w-6 text-orange-500" />}
                    </div>
                  </div>

                  {/* Badge Info */}
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {nft.festival} {nft.year}
                    </h3>
                    <Badge 
                      className={`mb-2 ${
                        nft.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                        nft.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                        'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {nft.tier} Tier
                    </Badge>
                    <p className="text-sm text-gray-600">
                      Earned by donating {formatCurrency(nft.donationAmount)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(nft);
                      }}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(nft);
                      }}
                    >
                      <Share className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {nfts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No NFT Badges Yet
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Start donating to festival campaigns to earn your first NFT badge! 
                Each donation unlocks a unique collectible certificate.
              </p>
            </div>
          )}

          {/* How NFTs Work */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              How NFT Badges Work
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-800">Bronze Tier</div>
                <div className="text-blue-600">₹500 - ₹4,999 donations</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Silver Tier</div>
                <div className="text-blue-600">₹5,000 - ₹9,999 donations</div>
              </div>
              <div>
                <div className="font-medium text-blue-800">Gold Tier</div>
                <div className="text-blue-600">₹10,000+ donations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected NFT Detail View */}
        {selectedNFT && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="text-center space-y-4">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-100 ring-4 ring-purple-200">
                  <img
                    src={selectedNFT.image}
                    alt={`${selectedNFT.festival} ${selectedNFT.tier} Badge`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {selectedNFT.festival} {selectedNFT.year}
                  </h3>
                  <Badge className={`mb-2 ${getTierColor(selectedNFT.tier)} text-white`}>
                    {selectedNFT.tier} Tier Badge
                  </Badge>
                  <p className="text-gray-600">
                    Earned by donating {formatCurrency(selectedNFT.donationAmount)}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Badge ID: {selectedNFT.id}
                  </p>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleDownload(selectedNFT)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleShare(selectedNFT)}
                  >
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  onClick={() => setSelectedNFT(null)}
                  className="w-full"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NFTModal;