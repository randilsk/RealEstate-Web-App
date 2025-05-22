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
      <div className="flex-1 flex relative">
        {/* Map Section - Fixed */}
        <div className="w-full md:w-1/2 h-full relative">
          <MapSection />
          {/* Toggle Button - Only visible on mobile */}
          <button
            onClick={() => setIsCardSectionOpen(!isCardSectionOpen)}
            className="md:hidden absolute top-14 right-2 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg"
            aria-label={isCardSectionOpen ? "Close property list" : "Open property list"}
          >
            {isCardSectionOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Card Section - Scrollable */}
        <div className={`absolute top-0 right-0 w-full md:w-1/2 h-full bg-white transform transition-transform duration-300 ease-in-out ${
          isCardSectionOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}>
          <CardSection />
        </div>
      </div>
    </div>
  );
}

export default page;
