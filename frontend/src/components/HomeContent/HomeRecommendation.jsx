"use client";
import React, { useState, useEffect, useRef } from "react";
import HeaderTypeTwo from "./HeaderTypeTwo.jsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function HomeRecommendation() {
  const [showHeader, setShowHeader] = useState(false);
  
  // Get current user from Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = !!currentUser; // Convert to boolean - logged in if currentUser exists
  
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const [imageVisible, setImageVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  
  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  
  // Animation state for logged-in section - initialize based on login status
  const [heroAnimated, setHeroAnimated] = useState(false);
  const [carouselAnimated, setCarouselAnimated] = useState(false);
  const heroSectionRef = useRef(null);
  const carouselSectionRef = useRef(null);
  
  // Mock recommended homes data
  const recommendedHomes = [
    {
      id: 1,
      title: "Modern Villa in Colombo",
      image: "/images/home-image/home-page-image2.png",
      description: "Luxury 4BR villa with pool",
      price: "Rs. 25M",
      location: "Colombo 07",
      beds: 4,
      baths: 3,
      sqft: "3,200"
    },
    {
      id: 2,
      title: "Cozy Apartment in Kandy",
      image: "/images/home-image/home-page-image2.png",
      description: "Perfect 2BR apartment with city view",
      price: "Rs. 8.5M",
      location: "Kandy",
      beds: 2,
      baths: 2,
      sqft: "1,200"
    },
    {
      id: 3,
      title: "Beach House in Galle",
      image: "/images/home-image/home-page-image2.png",
      description: "Stunning oceanfront property",
      price: "Rs. 18M",
      location: "Galle",
      beds: 3,
      baths: 2,
      sqft: "2,500"
    },
    {
      id: 4,
      title: "Garden Home in Negombo",
      image: "/images/home-image/home-page-image2.png",
      description: "Spacious family home with garden",
      price: "Rs. 12M",
      location: "Negombo",
      beds: 3,
      baths: 2,
      sqft: "2,000"
    },
    {
      id: 5,
      title: "Penthouse in Colombo",
      image: "/images/home-image/home-page-image2.png",
      description: "Luxury penthouse with panoramic views",
      price: "Rs. 35M",
      location: "Colombo 03",
      beds: 5,
      baths: 4,
      sqft: "4,000"
    }
  ];

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(recommendedHomes.length / getVisibleCards()));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(recommendedHomes.length / getVisibleCards())) % Math.ceil(recommendedHomes.length / getVisibleCards()));
  };

  const getVisibleCards = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2;  // md screens
      return 1; // sm screens
    }
    return 3;
  };

  // Touch/swipe handlers for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Trigger animations when user logs in
  useEffect(() => {
    if (isLoggedIn) {
      // Trigger animations immediately when logged in
      setTimeout(() => setHeroAnimated(true), 100);
      setTimeout(() => setCarouselAnimated(true), 500);
    } else {
      // Reset animations when logged out
      setHeroAnimated(false);
      setCarouselAnimated(false);
    }
  }, [isLoggedIn]); // Re-run when login status changes

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

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
    if (typeof window === 'undefined') return;

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

    // Only create logged-in section observers if not logged in (to use intersection-based animation)
    // When logged in, animations are triggered immediately via the auth useEffect
    let heroObserver, carouselObserver;
    if (!isLoggedIn) {
      heroObserver = new window.IntersectionObserver(
        (entries, observer) =>
          handleIntersection(entries, observer, setHeroAnimated),
        { threshold: 0.3 }
      );
      carouselObserver = new window.IntersectionObserver(
        (entries, observer) =>
          handleIntersection(entries, observer, setCarouselAnimated),
        { threshold: 0.2 }
      );
    }

    // Observe elements that exist
    if (imageRef.current) imageObserver.observe(imageRef.current);
    if (textRef.current) textObserver.observe(textRef.current);
    
    // Only observe logged-in section elements if they exist and we're using intersection-based animation
    if (!isLoggedIn) {
      if (heroSectionRef.current && heroObserver) heroObserver.observe(heroSectionRef.current);
      if (carouselSectionRef.current && carouselObserver) carouselObserver.observe(carouselSectionRef.current);
    }

    return () => {
      imageObserver.disconnect();
      textObserver.disconnect();
      if (heroObserver) heroObserver.disconnect();
      if (carouselObserver) carouselObserver.disconnect();
    };
  }, [isLoggedIn]); // Re-run when login status changes

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
        {!isLoggedIn ? (
          // Not logged in - Show existing "Explore Homes just For You" section
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
        ) : (
          // Logged in - Show hero section with recommendations
          <div className="w-full flex flex-col justify-center items-center min-h-[500px] text-center">
            <div 
              ref={heroSectionRef}
              className={`flex flex-col justify-center items-center gap-6 max-w-4xl px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${
                heroAnimated 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Main Hero Title */}
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-poppins leading-tight">
                  <span
                    className={`text-[#ffe000] inline-block transition-all duration-700 delay-200 ${
                      heroAnimated ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                    }`}
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    Your
                  </span>
                  <span className="text-white"> </span>
                  <br className="block sm:hidden" />
                  <span
                    className={`text-white inline-block transition-all duration-700 delay-400 ${
                      heroAnimated ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                    }`}
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    Recommended
                  </span>
                  <br className="block md:hidden" />
                  <span className="text-white"> </span>
                  <span
                    className={`text-[#ffe000] inline-block transition-all duration-700 delay-600 ${
                      heroAnimated ? "opacity-100 translate-y-0 scale-100 animate-pulse" : "opacity-0 translate-y-4 scale-95"
                    }`}
                    style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.25)" }}
                  >
                    Homes
                  </span>
                </h1>
              </div>

              {/* Eye-catching Slogan */}
              <div className={`flex flex-col gap-4 mt-6 transition-all duration-800 delay-800 ${
                heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                <p
                  className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-poppins font-medium leading-relaxed"
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}
                >
                  Curated just for you, based on your preferences
                </p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-3">
                  {[
                    { icon: "✨", text: "Personalized", delay: "delay-1000" },
                    { icon: "🏡", text: "Dream Homes", delay: "delay-1100" },
                    { icon: "🎯", text: "Perfect Match", delay: "delay-1200" }
                  ].map((badge, index) => (
                    <span 
                      key={index}
                      className={`bg-white/10 backdrop-blur-sm text-[#ffe000] px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border border-white/20 shadow-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 ${badge.delay} ${
                        heroAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                    >
                      {badge.icon} {badge.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendations Carousel */}
              <div 
                ref={carouselSectionRef}
                className={`mt-16 w-full max-w-7xl transition-all duration-1000 delay-1400 ease-out ${
                  carouselAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              >
                <div className="relative">
                  {/* Carousel Container */}
                  <div 
                    className="overflow-hidden rounded-2xl bg-gradient-to-r from-white/5 to-transparent backdrop-blur-sm border border-white/10 p-4 sm:p-6 lg:p-8"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div 
                      ref={carouselRef}
                      className="flex transition-transform duration-500 ease-in-out gap-4 sm:gap-6"
                      style={{
                        transform: `translateX(-${currentSlide * (100 / Math.ceil(recommendedHomes.length / getVisibleCards()))}%)`
                      }}
                    >
                      {recommendedHomes.map((home, index) => (
                        <div
                          key={home.id}
                          className={`flex-none w-full md:w-1/2 lg:w-1/3 px-1 sm:px-2 transition-all duration-700 ${
                            carouselAnimated 
                              ? "opacity-100 translate-y-0 scale-100" 
                              : "opacity-0 translate-y-8 scale-95"
                          }`}
                          style={{ 
                            transitionDelay: carouselAnimated ? `${1600 + index * 100}ms` : '0ms'
                          }}
                        >
                          {/* Home Card */}
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 group cursor-pointer">
                            {/* Image */}
                            <div className="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
                              <Image
                                src={home.image}
                                alt={home.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute top-3 right-3">
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-all duration-300">
                                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                  </svg>
                                </div>
                              </div>
                              <div className="absolute bottom-3 left-3">
                                <span className="bg-gradient-to-r from-[#ffe000] to-yellow-400 text-main-blue px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                  {home.price}
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                              <h3 className="text-white font-bold text-lg sm:text-xl mb-2 font-poppins group-hover:text-[#ffe000] transition-colors duration-300">
                                {home.title}
                              </h3>
                              <p className="text-white/80 text-sm sm:text-base mb-4 leading-relaxed">
                                {home.description}
                              </p>
                              
                              {/* Property Details */}
                              <div className="flex items-center justify-between text-white/70 text-xs sm:text-sm mb-4 bg-white/5 rounded-lg p-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-[#ffe000]">🛏️</span>
                                  <span>{home.beds} beds</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[#ffe000]">🚿</span>
                                  <span>{home.baths} baths</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[#ffe000]">📏</span>
                                  <span>{home.sqft} sqft</span>
                                </div>
                              </div>
                              
                              {/* Location & Action */}
                              <div className="flex items-center justify-between">
                                <span className="text-[#ffe000] text-sm font-semibold flex items-center gap-1">
                                  📍 {home.location}
                                </span>
                                <Button className="bg-main-blue hover:bg-white hover:text-main-blue text-white text-xs sm:text-sm py-2 px-4 rounded-full border-2 border-white/20 hover:border-main-blue transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={prevSlide}
                    className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-main-blue/80 hover:bg-white backdrop-blur-sm border-2 border-white/30 hover:border-main-blue rounded-full p-2 sm:p-3 transition-all duration-300 group z-10 shadow-xl hover:shadow-2xl ${
                      currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                    }`}
                    disabled={currentSlide === 0}
                  >
                    <ChevronLeftIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-main-blue transition-colors duration-300" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-main-blue/80 hover:bg-white backdrop-blur-sm border-2 border-white/30 hover:border-main-blue rounded-full p-2 sm:p-3 transition-all duration-300 group z-10 shadow-xl hover:shadow-2xl ${
                      currentSlide === Math.ceil(recommendedHomes.length / getVisibleCards()) - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                    }`}
                    disabled={currentSlide === Math.ceil(recommendedHomes.length / getVisibleCards()) - 1}
                  >
                    <ChevronRightIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-main-blue transition-colors duration-300" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="flex justify-center mt-8 gap-2 sm:gap-3">
                    {Array.from({ length: Math.ceil(recommendedHomes.length / getVisibleCards()) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 shadow-lg ${
                          currentSlide === index 
                            ? 'bg-[#ffe000] scale-110 shadow-[#ffe000]/50' 
                            : 'bg-white/30 hover:bg-white/50 hover:scale-105'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* View All Button */}
                <div className={`text-center mt-12 transition-all duration-1000 delay-2000 ${
                  carouselAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}>
                  <Button className="bg-main-blue hover:bg-white hover:text-main-blue text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-10 rounded-full border-2 border-white/20 hover:border-main-blue shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                    <span className="flex items-center gap-2">
                      View All Recommendations
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeRecommendation;
