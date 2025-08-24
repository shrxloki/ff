import React from "react";
import { Search, ChevronDown, Bell, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDashboard = () => {
    if (user?.accountType === "donor") {
      navigate("/donor-dashboard");
    } else if (user?.accountType === "organizer") {
      navigate("/organizer-dashboard");
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Search Icon */}
          <div className="flex items-center">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              <span>Donate</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
              <span>Fundraise</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="relative">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Festival Funds</span>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded ml-2 font-medium">NEW</span>
            </div>
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div 
              className="text-2xl font-bold text-green-600 cursor-pointer hover:text-green-700 transition-colors"
              onClick={handleLogoClick}
            >
              festivefunds
            </div>
          </div>

          {/* Right Side Menu */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 cursor-pointer" onClick={handleDashboard}>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.accountType}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-600 border-gray-300 hover:bg-gray-50"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">
                  <span>About</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <span 
                  className="text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  onClick={handleSignIn}
                >
                  Sign in
                </span>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-medium transition-colors"
                  onClick={handleSignIn}
                >
                  Start a Festival Fund
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;