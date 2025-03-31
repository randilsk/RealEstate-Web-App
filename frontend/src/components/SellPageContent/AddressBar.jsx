"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddressBar() {
  const router = useRouter();

  // State for address and city inputs
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState(""); // Add state for district

  const handleContinue = () => {
    // Check if address, city, and district are filled
    if (!address || !city || !district) {
      alert("Please enter address, city, and district.");
      return;
    }

    // Navigate to the LocationConfirmation page with the address, city, and district as query parameters
    router.push(
      `/sell/location_confirmation?address=${encodeURIComponent(
        address
      )}&city=${encodeURIComponent(city)}&district=${encodeURIComponent(
        district
      )}`
    );
  };

  return (
    <>
      <div className="flex  flex-col items-center justify-center mt-5">
        <div className=" w-4/6  bg-[#d9d9d9] rounded-[14px] ">
          <div className="flex flex-col w-full h-full md:flex-row gap-0 items-center px-5 py-3">
            {/* Address form  left column*/}
            <div className=" items-center w-2/5 px-10 py-10">
              <div className="text-main-blue text-[1.3rem] font-poppins">
                Sell Your Property Directly - No Agent Needed!
              </div>
              <hr className="border-main-blue border-2 " />
              <div className="flex flex-col justify-between mt-4 gap-3 mb-5">
                <div className="flex justify-between flex-1">
                  <input
                    type="text"
                    className="bg-white h-10 w-full text-left px-4  outline-none rounded-[7px]"
                    placeholder="Enter a street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="flex justify-between flex-1">
                  <input
                    type="text"
                    className="bg-white w-full h-10 text-left px-4 outline-none rounded-[7px]"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="flex justify-between flex-1">
                  <Select onValueChange={(value) => setDistrict(value)}>
                    {" "}
                    {/* Update district state */}
                    <SelectTrigger className="">
                      <SelectValue placeholder="District" />
                    </SelectTrigger>
                    <SelectContent side="bottom" position="popper">
                      <SelectItem value="ampara">Ampara</SelectItem>
                      <SelectItem value="anuradhapura">Anuradhapura</SelectItem>
                      <SelectItem value="badulla">Badulla</SelectItem>
                      <SelectItem value="batticaloa">Batticaloa</SelectItem>
                      <SelectItem value="colombo">Colombo</SelectItem>
                      <SelectItem value="galle">Galle</SelectItem>
                      <SelectItem value="gampaha">Gampaha</SelectItem>
                      <SelectItem value="hambantota">Hambantota</SelectItem>
                      <SelectItem value="jaffna">Jaffna</SelectItem>
                      <SelectItem value="kalutara">Kalutara</SelectItem>
                      <SelectItem value="kandy">Kandy</SelectItem>
                      <SelectItem value="kegalle">Kegalle</SelectItem>
                      <SelectItem value="kilinochchi">Kilinochchi</SelectItem>
                      <SelectItem value="kurunegala">Kurunegala</SelectItem>
                      <SelectItem value="mannar">Mannar</SelectItem>
                      <SelectItem value="matale">Matale</SelectItem>
                      <SelectItem value="matara">Matara</SelectItem>
                      <SelectItem value="moneragala">Moneragala</SelectItem>
                      <SelectItem value="mullaitivu">Mullaitivu</SelectItem>
                      <SelectItem value="nuwara-eliya">Nuwara Eliya</SelectItem>
                      <SelectItem value="polonnaruwa">Polonnaruwa</SelectItem>
                      <SelectItem value="puttalam">Puttalam</SelectItem>
                      <SelectItem value="ratnapura">Ratnapura</SelectItem>
                      <SelectItem value="trincomalee">Trincomalee</SelectItem>
                      <SelectItem value="vavuniya">Vavuniya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between flex-1">
                  <input
                    type="text"
                    className="bg-white w-full h-10 text-left px-4 outline-none rounded-[7px]"
                    placeholder="Postal Code"
                  />
                </div>
                <div className="flex justify-between flex-1">
                  <Button
                    className="bg-main-blue border-main-blue text-white hover:bg-white hover:text-main-blue font-bold border-2 flex-1"
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </div>
              </div>
              <div>
                Enter your property address to get started! Our smart listing
                tool will help you add details along with map integration,
                upload photos, and connect with potential buyers—all in just a
                few easy steps.
              </div>
            </div>
            {/* Image right column*/}
            <div className="flex-1 w-full h-full relative flex items-center justify-center  py-10">
              <Image
                src="/images/sell-image/add-address.jpg"
                alt="Placeholder image"
                width={475} // Set the desired height
                height={475} // Set the desired height
                className="rounded-2xl object-cover m-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressBar;
