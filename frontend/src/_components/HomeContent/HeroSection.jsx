import React from "react";
import Image from "next/image";

function HeroSection() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block text-left text-[76px] font-extrabold leading-[91.20px] font-poppins";

  return (
    <div className="container mx-auto py-10 flex">
      {/* Left Section */}
      <div className="flex flex-col gap-5 w-1/2">
        {/* Title Text */}
        <div className="ml-[135px] mt-[80px]">
          <div className="inline-block text-left">
            {phrases.map((phrase, index) => (
              <span key={index} className={`${commonStyles} ${phrase.color}`}>
                {phrase.text}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="h-[55px] w-[500px] px-[23px] py-1.5 bg-[#bcbbba] rounded-[50px] flex items-center gap-[15px] opacity-90 ml-[135px]">
          <div className="flex-grow text-black text-lg font-normal font-poppins opacity-75">
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
      <div className="w-1/2 flex justify-end">
        <div className="mt-[1px]">
          <Image
            className="w-[833px] h-[571px]"
            src="/images/home-page-image.png"
            alt="Home Page Image"
            width={833}
            height={571}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
