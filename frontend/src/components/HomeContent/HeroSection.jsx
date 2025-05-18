import React from "react";
import Image from "next/image";

function HeroSection() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block font-extrabold font-poppins leading-tight";

  return (
    <div className="hero-section pt-6 md:pt-12 flex flex-col md:flex-row relative pl-4 pr-5 md:(pl-8 pr-5) lg:pl-12 pr-5">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-4 md:gap-5 w-full md:w-1/2">
        {/* Title Text */}
        <div className="mt-6 md:mt-10 lg:mt-[80px]">
          <div className="inline-block text-center md:text-left w-full md:w-auto">
            {phrases.map((phrase, index) => (
              <span
                key={index}
                className={`${commonStyles} ${phrase.color} text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px]`}
              >
                {phrase.text}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-3/4 lg:w-2/4 h-[45px] md:h-[55px] px-3 md:px-[23px] py-1 md:py-1.5 bg-[#bcbbba] rounded-[50px] flex items-center gap-3 md:gap-[15px] opacity-90 mx-auto md:mx-0">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              placeholder="Enter address, city, district, province"
              className="w-full p-1.5 md:p-2 bg-transparent border-none outline-none flex justify-start placeholder:text-gray-800 text-sm md:text-base"
            />
          </div>
          <div className="w-[36px] h-[36px] md:w-[46px] md:h-[43px] flex justify-center items-center flex-shrink-0">
            <Image
              src="/icons/search-icon.svg"
              alt="Search Icon"
              width={24}
              height={24}
              className="w-4 h-4 md:w-6 md:h-6"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex mt-8 md:mt-0 relative">
        <div className="w-full h-full relative">
          <Image
            className="object-contain md:object-cover w-full h-auto"
            src="/images/home-image/home-page-image2.png"
            alt="Home Page Image"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
