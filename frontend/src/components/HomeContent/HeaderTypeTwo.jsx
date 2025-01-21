import React from "react";
import Image from "next/image";

function HeaderTypeTwo() {
  return (
    <div className="w-[912px] h-[55px] pl-[30px] py-1 bg-white rounded-full flex items-center">
      <div className="flex items-center gap-2.5">
        <div className="text-[#3b50df] text-[26px] font-bold font-poppins">
          Urban Nest
        </div>
      </div>
      <div className="w-[450px] h-[55px] px-[23px] py-1.5 bg-[#bcbbba] rounded-full flex items-center gap-[15px] opacity-90 ml-auto">
        <div className="text-left w-80">
          <input
            type="text"
            placeholder="Enter address, city, district, province"
            className="w-full p-2 bg-transparent border-none outline-none flex justify-start placeholder:text-gray-800"
          />
        </div>
        <div className="w-[46px] h-[43px] relative flex justify-end items-center">
          <Image
            src="/icons/search-icon.svg"
            alt="Search Icon"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderTypeTwo;
