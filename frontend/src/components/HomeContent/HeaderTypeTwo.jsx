import React from "react";
import Image from "next/image";

function HeaderTypeTwo() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-y-4 md:gap-y-0 px-3 py-4 md:px-0 md:py-0">
      <div className="flex items-center justify-center md:justify-start w-full md:w-auto mb-2 md:mb-0">
        <div className="text-[#3b50df] text-3xl md:text-[28px] font-bold font-poppins drop-shadow-sm px-5">
          Urban Nest
        </div>
      </div>
      <div className="w-full md:w-[500px] h-[50px] md:h-[55px] px-4 md:px-[23px] py-2 md:py-1.5 bg-[#e5e7eb] md:bg-[#bcbbba] rounded-full flex items-center gap-3 md:gap-[15px] shadow-md md:shadow-none">
        <div className="flex-1 min-w-0">
          <input
            type="text"
            placeholder="Enter address, city, district, province"
            className="w-full p-2 md:p-2.5 bg-transparent border-none outline-none flex justify-start placeholder:text-gray-800 text-base md:text-base"
          />
        </div>
        <div className="w-[40px] h-[40px] md:w-[46px] md:h-[43px] relative flex justify-end items-center">
          <Image
            src="/icons/search-icon.svg"
            alt="Search Icon"
            width={24}
            height={24}
            className="w-5 h-5 md:w-6 md:h-6"
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderTypeTwo;
