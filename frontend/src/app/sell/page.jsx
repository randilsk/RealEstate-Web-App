import React from "react";
import Header from "../../components/Header.jsx";
import Bluebar from "@/components/Bluebar.jsx";

function SellPage() {
  return (
    <>
      <div>
        <Bluebar />
        <Header />
        <div className="w-[1123px] h-[292px] px-[397px] pt-[235px] pb-11 flex-col justify-start items-start gap-2.5 inline-flex">
          <div className="w-[1123px] h-[292px] text-center">
            <span className="text-white text-[76px] font-extrabold font-['Inter'] leading-[91.20px]">
              Every home
            </span>
            <span className="text-[#3b50df] text-[76px] font-extrabold font-['Inter'] leading-[91.20px]">
              {" "}
            </span>
            <span className="text-white text-[76px] font-extrabold font-['Inter'] leading-[91.20px]">
              deserves the perfect buyer
            </span>
          </div>
          <div className="w-[290px] p-2.5 rounded-xl border-2 border-white justify-center items-center gap-2.5 inline-flex">
            <div className="text-white text-xl font-semibold font-['Inter']">
              Post your advertisement
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SellPage;
