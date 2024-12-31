import Image from "next/image";
import React from "react";

function HomeSearchbar() {
  return (
    <div className="h-[55px] w-[500px] px-[23px] py-1.5 bg-[#bcbbba] rounded-[50px] flex items-center gap-[15px] opacity-90 ml-[135px]">
      <div className="flex-grow text-black text-lg font-normal font-poppins opacity-75">
        Enter an address, city, district, province
      </div>
      <div className="w-[46px] h-[43px] flex justify-center items-center flex-shrink-0">
        <Image
          src="/icons/search-icon.svg"
          alt="Search Icon"
          className="w-6 h-6"
        />
      </div>
    </div>
  );
}

export default HomeSearchbar;
