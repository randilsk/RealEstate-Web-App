import React from "react";
import HeaderTypeTwo from "./HeaderTypeTwo.jsx";
import Image from "next/image";

function HomeRecommendation() {
  return (
    <div className="bg-main-blue min-h-screen flex flex-col items-center pt-12">
      <HeaderTypeTwo />
      <div className="flex flex-col items-center mt-12">
        <div className="h-[556px] flex justify-start items-center gap-[78px]">
          <div className="pl-[38px] pt-[89px] flex justify-end items-center">
            <Image
              className="object-cover"
              src="/images/home-recommendation.png"
              alt="Home Page Image"
              width={500}
              height={400}
            />
          </div>
          <div className="w-[547px] flex flex-col justify-start items-start gap-[5px]">
            <div className="self-stretch h-80 flex flex-col justify-start items-start gap-px">
              <div className="self-stretch h-[203px] p-2.5 flex justify-end items-center gap-2.5">
                <div className="w-[527px]">
                  <span className="text-[#ffe000] text-[71px] font-extrabold font-['Inter'] leading-[77.39px]">
                    Explore
                  </span>
                  <span className="text-black text-[71px] font-extrabold font-['Inter'] leading-[77.39px]">
                    {" "}
                  </span>
                  <span className="text-white text-[71px] font-extrabold font-['Inter'] leading-[77.39px]">
                    Homes just{" "}
                  </span>
                  <span className="text-[#ffe000] text-[71px] font-extrabold font-['Inter'] leading-[77.39px]">
                    for you
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRecommendation;
