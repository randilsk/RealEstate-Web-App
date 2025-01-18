import React from "react";
import { Button } from "../ui/button";

function LocationConfirmation() {
  return (
    <>
      <div className="flex items-center justify-center h-[85vh] ">
        <div className=" flex flex-col h-5/6 w-10/12 bg-[#d9d9d9]">
          <div className="px-7 pt-5 text-black text-3xl font-poppins">
            Location Confirmation
          </div>
          <div className="px-7 py-2 text-black text-[15px] font-poppins">
            Address entered in the input fields
          </div>
          <div className="px-7 ">
            {" "}
            <hr className="border-1 border-black  " />
          </div>
          <div className="flex flex-col h-5/6 mt-7 items-center ">
            <div className="w-11/12 h-5/6 bg-gray-500"></div>

            <div className="flex gap-4 py-5">
              <Button className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2 ">
                Yes, Correct Location
              </Button>
              <Button className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2 ">
                No, Change Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationConfirmation;
