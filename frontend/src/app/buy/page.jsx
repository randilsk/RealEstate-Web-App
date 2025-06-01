"use client";
import React, { useState } from "react";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSection from "../../components/BuyPageContent/MapSection.jsx";
import CardSection from "../../components/BuyPageContent/CardSection.jsx";

function page() {
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Fixed Navigation */}
      <div className="flex-none">
        <Header_varient_1 />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Map Section - Fixed */}
        <div 
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen 
              ? 'translate-x-[-100%] md:translate-x-0 md:w-1/2' 
              : 'translate-x-0 md:w-1/2'
          }`}
        >
          <MapSection />
        </div>
        
        {/* Card Section - Scrollable */}
        <div 
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen 
              ? 'translate-x-0 md:translate-x-[100%] md:w-1/2' 
              : 'translate-x-[100%] md:translate-x-[100%] md:w-1/2'
          }`}
        >
          <CardSection />
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsCardSectionOpen(!isCardSectionOpen)}
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-main-blue text-white px-8 py-4 rounded-full shadow-lg z-50 hover:bg-[#4b5eef] transition-all duration-300 font-medium text-base flex items-center gap-2 backdrop-blur-sm bg-opacity-90 border border-white/20"
        >
          {isCardSectionOpen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Show Map
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Show Listings
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default page;
