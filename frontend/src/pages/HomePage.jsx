import React from "react";
import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import FeaturesSection from "../components/FeaturesSection";
import TrendingCampaigns from "../components/TrendingCampaigns";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TrendingCampaigns />
    </div>
  );
};

export default HomePage;