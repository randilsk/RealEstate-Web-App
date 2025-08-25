"use client";
import React, { useState, useEffect, useRef } from "react";
import HeaderTypeTwo from "./HeaderTypeTwo.jsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HomeRecommendation() {
  const [showHeader, setShowHeader] = useState(false);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section element
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        // Show header when hero section is scrolled past
        setShowHeader(heroBottom <= 0);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleIntersection = (entries, observer, setVisible) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      });
    };

    const imageObserver = new window.IntersectionObserver(
      (entries, observer) =>
        handleIntersection(entries, observer, setImageVisible),
      { threshold: 0.2 }
    );
    const textObserver = new window.IntersectionObserver(
      (entries, observer) =>
        handleIntersection(entries, observer, setTextVisible),
      { threshold: 0.2 }
    );

    if (imageRef.current) imageObserver.observe(imageRef.current);
    if (textRef.current) textObserver.observe(textRef.current);

    return () => {
      imageObserver.disconnect();
      textObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-main-blue min-h-screen flex flex-col items-center pt-12 pb-12 px-4 md:px-8 lg:px-12">
      {/* Header Section - Only show when scrolled past hero */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 w-full hidden md:flex justify-center transition-all duration-300 ease-in-out ${
          showHeader
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full max-w-screen-xl mt-4 px-2">
          <div className="rounded-[50px] border-2 border-[#3b50df] bg-white shadow-lg shadow-[#3b50df]/40 ring-2 ring-[#3b50df]/30">
            <HeaderTypeTwo />
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center mt-12 w-full max-w-screen-xl gap-y-12 md:gap-y-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16 w-full">
          {/* Image Section */}
          <div
            ref={imageRef}
            className={`w-full md:w-1/2 flex justify-center md:justify-start items-center order-last md:order-none transition-all duration-700 ease-out
              ${
                imageVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
          >
            <Image
              className="object-cover w-full h-auto rounded-lg shadow-xl"
              src="/images/home-image/home-recommendation.png"
              alt="Home Page Image"
              width={600}
              height={500}
              priority
            />
          </div>

          {/* Text Section */}
          <div
            ref={textRef}
            className={`w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left order-first md:order-none transition-all duration-700 ease-out
              ${
                textVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
          >
            <div className="self-stretch flex flex-col justify-center items-center md:items-start gap-4">
              <div className="self-stretch flex flex-col justify-center items-center md:items-start pt-0">
                <div className="w-full">
                  <span
                    className="text-[#ffe000] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    Explore
                  </span>
                  <span
                    className="text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.15)" }}
                  >
                    {" "}
                  </span>
                  <br className="block md:hidden" />
                  <span
                    className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    Homes just{" "}
                  </span>
                  <br className="block md:hidden" />
                  <span
                    className="text-[#ffe000] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-poppins leading-tight animate-fadeIn"
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    For you!
                  </span>
                </div>
              </div>

              <div className="w-full text-white text-base md:text-xl font-poppins leading-normal mt-4">
                Sign in to unlock personalized recommendations that resonate
                with you.
              </div>
              <div className="font-poppins mt-6">
                <Button className="bg-main-blue border-white hover:bg-white hover:text-main-blue w-full sm:w-52 font-bold border-2 text-lg py-3">
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
