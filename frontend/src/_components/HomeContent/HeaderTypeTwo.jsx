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
        <div className="text-black text-lg font-normal font-poppins opacity-75">
          Enter an address, city, district, province
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
