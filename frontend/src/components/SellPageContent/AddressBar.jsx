"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  // Handle the "Continue" button click
  const handleContinue = () => {
    // Check if address and city are filled
    if (!address || !city) {
      alert("Please enter both address and city.");
      return;
    }

    // Combine the address and city
    //const fullAddress = `${address}, ${city}`;

    // Navigate to the LocationConfirmation page with the address as a query parameter
    router.push(
      `/sell/location_confirmation?address=${encodeURIComponent(
        address
      )}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="h-48 w-5/6 px-[31px] pt-0.5 bg-[#d9d9d9] rounded-[14px] mx-auto">
          <div className="text-main-blue text-3xl font-poppins mt-10 mb-4">
            List Your Property for Sale by Owner
          </div>
          <hr className="border-main-blue border-2 " />
          <div className="flex justify-between mt-4 gap-3">
            <div className="flex justify-between flex-1">
              <input
                type="text"
                className="bg-white h-10 w-full text-left px-4  outline-none rounded-[7px]"
                placeholder="Enter a street address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex justify-between ">
              <input
                type="text"
                className="bg-white h-10 text-left w-[200px] px-4 outline-none rounded-[7px]"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex justify-between ">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="District" className="" />
                </SelectTrigger>
                <SelectContent>
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
            <div className="flex justify-between ">
              <input
                type="text"
                className="bg-white h-10 text-left px-4 w-[200px] outline-none rounded-[7px]"
                placeholder="Postal Code"
              />
            </div>
            <div className="flex justify-between ">
              <Button
                className="bg-main-blue border-main-blue text-white hover:bg-white hover:text-main-blue font-bold border-2"
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddressBar;
