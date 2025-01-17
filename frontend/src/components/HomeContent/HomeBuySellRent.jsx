import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HomeBuySellRent() {
  return (
    <div className="bg-main-bg flex justify-between items-center my-40 mx-36 mb-24 h-screen">
      {/* Card 1: Buy a property */}
      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white border rounded-[38px] shadow-md flex flex-col items-center gap-2.5 hover:border-red-2 hover:border-2 hover:border-main-blue hover:bg-main-bg transition-colors duration-600">
        <Image
          src="/images/buy-home.png"
          width={180}
          height={200}
          alt="Buy a property"
          className="p-2.5"
        />
        <h3 className="text-center text-black text-[21px] font-bold font-poppins leading-[29.40px]">
          Buy a property
        </h3>
        <p className="text-center text-black text-sm font-light font-poppins leading-tight pt-4">
          Whether it's a dream home or the land to build it on, explore with
          immersive photos and exclusive listings you won’t find anywhere else.
          Start your journey to something extraordinary.
        </p>
        <div className="pt-5">
          {" "}
          <Button className="bg-white border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2">
            Explore Properties
          </Button>
        </div>
      </div>

      {/* Card 2: Sell a property */}
      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white rounded-[38px] shadow-md flex flex-col items-center gap-2.5 hover:border-red-2 hover:border-2 hover:border-main-blue hover:bg-main-bg transition-colors duration-600">
        <Image
          src="/images/sell-home.png"
          width={180}
          height={200}
          alt="Sell a property"
          className="p-2.5"
        />
        <h3 className="text-center text-black text-[21px] font-bold font-poppins leading-[29.40px] pt-10">
          Sell a property
        </h3>
        <p className="text-center text-black text-sm font-light font-poppins leading-tight pt-4">
          Whether it’s a home, land, or both, we’re here to guide you every step
          of the way toward a successful sale. Let us help you make it happen.
        </p>
        <div className="pt-9">
          <Button className="bg-white border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2">
            Sell Today
          </Button>
        </div>
      </div>

      {/* Card 3: Rent a property */}
      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white rounded-[38px] shadow-md flex flex-col items-center gap-2.5 hover:border-red-2 hover:border-2 hover:border-main-blue hover:bg-main-bg transition-colors duration-600">
        <Image
          src="/images/rent-home.png"
          width={180}
          height={200}
          alt="Rent a property"
          className="p-2.5"
        />
        <h3 className="text-center text-black text-[21px] font-bold font-poppins leading-[29.40px]">
          Rent a property
        </h3>
        <p className="text-center text-black text-sm font-light font-poppins leading-tight pt-4">
          From cozy apartments to spacious homes, find rentals that suit your
          lifestyle. Start your search here for the place you’ll love to call
          home.
        </p>
        <div className="pt-[38px]">
          <Button className="bg-white border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2">
            Find Rentals
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeBuySellRent;
