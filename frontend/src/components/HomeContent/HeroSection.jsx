"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { titleVariants, wordVariants, fadeInUp, slideInFromRight } from "@/constants/animations";
import SearchBar from "@/components/ui/SearchBar";

function HeroSection() {
  const phrases = [
    { text: "Find Your", color: "text-gray-900" },
    { text: "Dream Home", color: "text-[#3b50df]" },
    { text: "Today.", color: "text-gray-900" },
  ];

  const searchHook = useLocationSearch();

  return (
    <div className="relative h-auto min-h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent" />
      </div>
      
      {/* Floating Elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-r from-[#3b50df]/8 to-purple-400/5 blur-3xl animate-pulse hidden md:block" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-l from-blue-400/6 to-[#3b50df]/4 blur-3xl animate-pulse hidden md:block" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-8 md:pt-12 lg:pt-16 pb-12 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
          
          {/* Left Content */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            className="space-y-8 text-center lg:text-left"
          >
            {/* Main Headline */}
            <motion.div
              variants={titleVariants}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              {phrases.map((phrase, index) => (
                <motion.h1
                  key={index}
                  variants={wordVariants}
                  className={`${phrase.color} text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-poppins leading-tight tracking-tight`}
                >
                  {phrase.text}
                </motion.h1>
              ))}
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
            >
              Discover the perfect property that matches your lifestyle. From cozy apartments to luxury homes, we help you find your ideal space.
            </motion.p>

            {/* Search Bar */}
            <div className="pt-4">
              <SearchBar {...searchHook} />
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 md:gap-8 pt-6 px-2 sm:px-0"
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#3b50df]">10K+</div>
                <div className="text-sm text-gray-600">Properties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#3b50df]">5K+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[#3b50df]">50+</div>
                <div className="text-sm text-gray-600">Cities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Image */}
          <motion.div
            variants={slideInFromRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="relative group mt-8 md:mt-0">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#3b50df]/20 to-purple-600/20 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#3b50df] to-purple-600 rounded-2xl opacity-10 rotate-12" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-tr from-blue-500 to-[#3b50df] rounded-full opacity-8 -rotate-12" />
              
              {/* Main Image Container */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-2 sm:p-3 md:p-4 shadow-2xl border border-white/50">
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    className="object-cover w-full h-auto transition-all duration-700 group-hover:scale-105"
                    src="/images/home-image/real-estate.jpeg"
                    alt="Modern Real Estate"
                    width={1200}
                    height={900}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/90 backdrop-blur-xl rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Verified Properties</div>
                    <div className="text-sm text-gray-600">100% Authentic</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-white/90 backdrop-blur-xl rounded-2xl p-2 sm:p-3 md:p-4 shadow-xl border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Quick Search</div>
                    <div className="text-sm text-gray-600">Find in Seconds</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
