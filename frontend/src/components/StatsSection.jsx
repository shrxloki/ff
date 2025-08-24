import React from "react";
import { Zap, Globe, Users } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Main Stat */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              More than ₹5 crore is raised
              <br />
              every week on FestiveFunds.*
            </h2>
            <p className="text-gray-600 text-lg">
              *Based on fundraising activity from October 2023 to September 2024.
            </p>
          </div>

          {/* Right Side - Getting Started */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get started in just a few minutes — with helpful new tools, it's easier than ever to pick the perfect title, write a compelling story, and set your funding goal.
            </h3>
          </div>
        </div>

        {/* Bottom Stats Row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No fee to start
            </h4>
            <p className="text-gray-600">
              FestiveFunds has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Festival focused
            </h4>
            <p className="text-gray-600">
              Specialized platform for Indian festivals with culturally relevant features and payment methods.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Over 10,000 festivals funded daily
            </h4>
            <p className="text-gray-600">
              From small community gatherings to large festival celebrations across India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;