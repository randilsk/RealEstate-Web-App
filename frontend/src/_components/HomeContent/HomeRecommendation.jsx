import React from "react";
import HeaderTypeTwo from "./HeaderTypeTwo.jsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HomeRecommendation() {
  return (
    <div className="bg-main-blue min-h-screen flex flex-col justify-center items-center pt-12">
      {/* Header Section */}
      <div className="w-full flex justify-center">
        <HeaderTypeTwo />
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center mt-12">
        <div className="h-[556px] flex justify-between items-center gap-[78px] w-full px-12">
          {/* Image Section */}
          <div className="w-1/2 flex justify-start items-center">
            <Image
              className="object-cover"
              src="/images/home-recommendation.png"
              alt="Home Page Image"
              width={500}
              height={400}
            />
          </div>

          {/* Text Section */}
          <div className="w-1/2 flex flex-col justify-start items-start">
            <div className="self-stretch h-80 flex flex-col justify-start items-start gap-px">
              <div className="self-stretch h-[203px] p-2.5 flex justify-end items-center gap-2.5 pt-0">
                <div className="w-full">
                  <span className="text-[#ffe000] text-[71px] font-bold font-] leading-[77.39px]">
                    Explore
                  </span>
                  <span className="text-black text-[71px] font-bold font-poppins leading-[77.39px]">
                    {" "}
                  </span>
                  <br />
                  <span className="text-white text-[71px] font-bold font-poppins leading-[77.39px]">
                    Homes just{" "}
                  </span>
                  <br />
                  <span className="text-[#ffe000] text-[71px] font-bold font-poppins leading-[77.39px]">
                    For you!
                  </span>
                </div>
              </div>

              <div className="w-[490px] text-white text-2xl font-poppins leading-[28.80px] pl-4 mt-7">
                Sign in to unlock personalized recommendations that resonate
                with you.
              </div>
              <div className="font-poppins pl-4 mt-7">
                <Button className="bg-main-blue border-white  hover:bg-white hover:text-main-blue w-52 font-bold border-2">
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeRecommendation;
