import React from "react";
import { Button } from "./ui/button";

const FeaturesSection = () => {
  return (
    <div className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
          Fundraising on FestiveFunds is easy,
          <br />
          powerful, and trusted.
        </h2>
        
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Get the help you need to make your festival celebrations memorable and impactful. 
          Whether it's organizing community events, supporting traditional arts, or helping families celebrate together.
        </p>

        <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
          Start Your Festival Fund
        </Button>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🪔</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Festival Templates
            </h3>
            <p className="text-gray-600">
              Pre-designed templates for different Indian festivals with culturally appropriate themes and content suggestions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🎊</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              NFT Rewards
            </h3>
            <p className="text-gray-600">
              Donors receive unique festival-themed NFT badges and certificates as appreciation for their contributions.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Indian Payments
            </h3>
            <p className="text-gray-600">
              Accept donations through UPI, net banking, cards, and other popular Indian payment methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;