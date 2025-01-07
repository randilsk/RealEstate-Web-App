import React from "react";
import Image from "next/image";

function HomeBuySellRent() {
  return (
    <div className="bg-main-bg flex justify-between items-center my-20 mx-32">
      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white rounded-[38px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start items-center gap-2.5 inline-flex">
        <div className="w-[284.88px] flex-col justify-start items-center gap-[29px] inline-flex">
          <div className="self-stretch h-[373.90px] flex-col justify-start items-center gap-[7px] flex">
            <div className="h-[260.02px] flex-col justify-start items-center gap-[5px] flex">
              <div className="self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex">
                <Image
                  src="/images/buy-home.png"
                  width={180}
                  height={200}
                  alt="Buy Icon"
                />
              </div>
              <div className="self-stretch h-[33.79px] text-center text-black text-[21px] font-bold font-poppins leading-[29.40px]">
                Buy a property
              </div>
            </div>
            <div className="self-stretch h-[106.88px] text-center text-black text-sm font-light font-poppins leading-tight">
              Whether it's a dream home or the land to build it on, explore with
              immersive photos and exclusive listings you won’t find anywhere
              else. Start your journey to something extraordinary.
            </div>
          </div>
          <div className="w-[131.35px] h-[35.87px] p-2.5 bg-white rounded-[9px] border-2 border-[#3b50df] justify-center items-center gap-2.5 inline-flex">
            <div className="w-[110px] text-center text-[#3b50df] text-xs font-semibold font-poppins">
              Explore Properties
            </div>
          </div>
        </div>
      </div>

      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white rounded-[38px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start items-center gap-2.5 inline-flex">
        <div className="w-[284.88px] flex-col justify-start items-center gap-[29px] inline-flex">
          <div className="self-stretch h-[373.90px] flex-col justify-start items-center gap-[7px] flex">
            <div className="h-[260.02px] flex-col justify-start items-center gap-[5px] flex">
              <div className="self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex">
                <Image
                  src="/images/sell-home.png"
                  width={180}
                  height={200}
                  alt="Buy Icon"
                />
              </div>
              <div className="self-stretch h-[33.79px] text-center text-black text-[21px] font-bold font-poppins leading-[29.40px]">
                Buy a property
              </div>
            </div>
            <div className="self-stretch h-[106.88px] text-center text-black text-sm font-light font-poppins leading-tight">
              Whether it's a dream home or the land to build it on, explore with
              immersive photos and exclusive listings you won’t find anywhere
              else. Start your journey to something extraordinary.
            </div>
          </div>
          <div className="w-[131.35px] h-[35.87px] p-2.5 bg-white rounded-[9px] border-2 border-[#3b50df] justify-center items-center gap-2.5 inline-flex">
            <div className="w-[110px] text-center text-[#3b50df] text-xs font-semibold font-poppins">
              Explore Properties
            </div>
          </div>
        </div>
      </div>

      <div className="w-[377px] h-[485px] px-[43px] py-4 bg-white rounded-[38px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] justify-start items-center gap-2.5 inline-flex">
        <div className="w-[284.88px] flex-col justify-start items-center gap-[29px] inline-flex">
          <div className="self-stretch h-[373.90px] flex-col justify-start items-center gap-[7px] flex">
            <div className="h-[260.02px] flex-col justify-start items-center gap-[5px] flex">
              <div className="self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex">
                <Image
                  src="/images/rent-home.png"
                  width={180}
                  height={200}
                  alt="Buy Icon"
                />
              </div>
              <div className="self-stretch h-[33.79px] text-center text-black text-[21px] font-bold font-poppins leading-[29.40px]">
                Buy a property
              </div>
            </div>
            <div className="self-stretch h-[106.88px] text-center text-black text-sm font-light font-poppins leading-tight">
              Whether it's a dream home or the land to build it on, explore with
              immersive photos and exclusive listings you won’t find anywhere
              else. Start your journey to something extraordinary.
            </div>
          </div>
          <div className="w-[131.35px] h-[35.87px] p-2.5 bg-white rounded-[9px] border-2 border-[#3b50df] justify-center items-center gap-2.5 inline-flex">
            <div className="w-[110px] text-center text-[#3b50df] text-xs font-semibold font-poppins">
              Explore Properties
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBuySellRent;
