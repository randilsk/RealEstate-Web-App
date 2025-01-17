import React from "react";
import { Button } from "@/components/ui/button";

function SellPageHeroSection() {
  return (
    <>
      <div>
        <div className="items-center justify-center flex text-center font-bold text-[76px] text-white  font-inter h-[80vh] flex-col">
          Every home deserves the <br />
          perfect buyer
          <div className="flex justify-center items-center mb-10">
            <Button className="bg-transparent border-white text-white hover:bg-main-bg hover:text-black w-52 font-bold border-2">
              Post your advertisement
            </Button>
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default SellPageHeroSection;
