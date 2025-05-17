'use client'
import React, { useState, useEffect } from "react";
import HeaderTypeTwo from "./HeaderTypeTwo.jsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HomeRecommendation() {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section element
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show header when hero section is scrolled past
        setShowHeader(heroBottom <= 0);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-main-blue min-h-screen flex flex-col justify-center items-center pt-12">
      {/* Header Section - Only show when scrolled past hero */}
      <div 
        className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-300 ease-in-out ${
          showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="w-full max-w-[calc(100%-40px)] md:max-w-[calc(100%-605px)] mt-4">
          <div className="rounded-[50px] border-2 border-[#3b50df] bg-white shadow-lg shadow-[#3b50df]/40 ring-2 ring-[#3b50df]/30">
            <HeaderTypeTwo />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center mt-12">
        <div className="h-[556px] flex flex-col md:flex-row justify-between items-center gap-[78px] w-full px-4 md:px-12">
          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
            <Image
              className="object-cover"
              src="/images/home-image/home-recommendation.png"
              alt="Home Page Image"
              width={500}
              height={400}
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-1/2 flex flex-col justify-start items-start">
            <div className="self-stretch h-80 flex flex-col justify-start items-start gap-px">
              <div className="self-stretch h-[203px] p-2.5 flex justify-end items-center gap-2.5 pt-0">
                <div className="w-full">
                  <span className="text-[#ffe000] text-5xl md:text-[71px] font-bold font-poppins leading-tight md:leading-[77.39px]">
                    Explore
                  </span>
                  <span className="text-black text-5xl md:text-[71px] font-bold font-poppins leading-tight md:leading-[77.39px]">
                    {" "}
                  </span>
                  <br />
                  <span className="text-white text-5xl md:text-[71px] font-bold font-poppins leading-tight md:leading-[77.39px]">
                    Homes just{" "}
                  </span>
                  <br />
                  <span className="text-[#ffe000] text-5xl md:text-[71px] font-bold font-poppins leading-tight md:leading-[77.39px]">
                    For you!
                  </span>
                </div>
              </div>

              <div className="w-full md:w-[490px] text-white text-xl md:text-2xl font-poppins leading-[28.80px] pl-4 mt-7">
                Sign in to unlock personalized recommendations that resonate
                with you.
              </div>
              <div className="font-poppins pl-4 mt-7">
                <Button className="bg-main-blue border-white hover:bg-white hover:text-main-blue w-52 font-bold border-2">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRecommendation;
