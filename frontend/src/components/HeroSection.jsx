import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  const festivalCategories = [
    {
      name: "Diwali",
      image: "https://images.unsplash.com/photo-1592843997881-cab3860b1067?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      position: "top-20 left-20"
    },
    {
      name: "Holi",
      image: "https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      position: "top-20 right-20"
    },
    {
      name: "Eid",
      image: "https://images.unsplash.com/photo-1720593446840-b2a993a2c005?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      position: "bottom-32 left-16"
    },
    {
      name: "Durga Puja",
      image: "https://images.unsplash.com/photo-1590906424086-3dbc808fd54b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHw0fHxpbmRpYW4lMjBmZXN0aXZhbHN8ZW58MHx8fHwxNzU2MDMyMzQ4fDA&ixlib=rb-4.1.0&q=85",
      position: "bottom-32 right-16"
    },
    {
      name: "Ganesh Chaturthi",
      image: "https://images.pexels.com/photos/33547334/pexels-photo-33547334.jpeg",
      position: "top-1/2 left-4 -translate-y-1/2"
    },
    {
      name: "Navratri",
      image: "https://images.unsplash.com/photo-1718563301211-65e9702765e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwzfHxjZWxlYnJhdGlvbiUyMGNvbW11bml0eXxlbnwwfHx8fDE3NTYwMzIzNTR8MA&ixlib=rb-4.1.0&q=85",
      position: "top-1/2 right-4 -translate-y-1/2"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-green-50 to-white overflow-hidden">
      {/* Floating Festival Categories */}
      {festivalCategories.map((category, index) => (
        <div
          key={category.name}
          className={`absolute ${category.position} group cursor-pointer transition-transform duration-300 hover:scale-110 z-10`}
        >
          <div className="relative">
            <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-green-500 overflow-hidden shadow-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md border">
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Central Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-sm font-medium text-gray-600 mb-4">
            #1 festival crowdfunding platform
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Successful
            <br />
            <span className="text-green-600">festival fundraisers</span>
            <br />
            start here
          </h1>

          <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
            Start a Festival Fund
          </Button>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 bg-pink-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HeroSection;