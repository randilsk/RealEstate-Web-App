import React from "react";
import Image from "next/image";

function HeroSection() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block text-left font-extrabold font-poppins leading-tight";

  return (
    <div className="pt-12 flex  relative">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-5 w-full md:w-1/2">
        {/* Title Text */}
        <div className="ml-4 md:ml-[135px] mt-10 md:mt-[80px]">
          <div className="inline-block text-left">
            {phrases.map((phrase, index) => (
              <span
                key={index}
                className={`${commonStyles} ${phrase.color} text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[76px]`}
              >
                {phrase.text}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="h-[55px] w-full md:w-[500px] px-4 md:px-[23px] py-1.5 bg-[#bcbbba] rounded-[50px] flex items-center gap-4 md:gap-[15px] opacity-90 ml-4 md:ml-[135px]">
          <div className="flex-grow text-black text-base md:text-lg font-normal font-poppins opacity-75">
            Enter an address, city, district, province
          </div>
          <div className="w-[46px] h-[43px] flex justify-center items-center flex-shrink-0">
            <Image
              src="/icons/search-icon.svg"
              alt="Search Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex  mt-5 md:mt-0 relative">
        <div className="w-full bg-main-bg relative">
          <Image
            className="object-cover"
            src="/images/home-page-image2.png"
            alt="Home Page Image"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
