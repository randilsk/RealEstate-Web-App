"use client";
import React, { useState } from "react";
import FileUploader from "../FileUploader";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Listing() {
  const searchParams = useSearchParams();

  // Pre-fill address, city, district, lat, and lng from searchParams
  const address = searchParams.get("address") || "";
  const city = searchParams.get("city") || "";
  const district = searchParams.get("district") || "";
  const lat = searchParams.get("lat") || "";
  const lng = searchParams.get("lng") || "";

  // State to store form data
  const [formData, setFormData] = useState({
    address,
    city,
    district,
    lat,
    lng,
    price: "",
    images: [],
    homeType: "",
    bedrooms: 0,
    attachedBathrooms: 0,
    detachedBathrooms: 0,
    floors: "",
    houseArea: 0,
    landArea: 0,
    parking: "",
    buildYear: "",
    description: "",
    phone: "",
    email: "user@example.com", // Replace with the logged-in user's email
    user: "64f8c0e2b5d6c9a5e8f12345", // Replace with the logged-in user's ID
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/listing",
        formData
      );
      console.log("Listing added successfully:", response.data);
      alert("Listing added successfully!");
    } catch (error) {
      console.error("Error adding listing:", error.message); // Log the error message
      if (error.response) {
        console.error("Response data:", error.response.data); // Log response data
        console.error("Response status:", error.response.status); // Log status code
      } else if (error.request) {
        console.error("No response received:", error.request); // Log the request
      } else {
        console.error("Error setting up request:", error.message); // Log setup errors
      }
      alert("Failed to add listing. Please try again.");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center mt-6">
        <div className="h-full w-10/12 bg-[#d9d9d9] rounded-md py-6 px-10 ">
          <div className="text-black text-2xl font-bold font-poppins pb-1">
            List Your Property for Sale by Owner
          </div>
          {/* Address */}
          <div className="font-regular font-poppins pb-1">
            Address:{" "}
            {address && city && district
              ? `${address}, ${city}, ${district}`
              : "Address not provided."}
          </div>
          {/* Coordinates */}
          <div className="font-regular font-poppins pb-1">
            {lat && lng
              ? `Latitude: ${lat}, Longitude: ${lng}`
              : "Coordinates not provided."}
          </div>
          <div className="pb-2 font-semibold">List your details below</div>
          <hr className="border-1 border-black py-3" />
          {/* Price */}
          <div className="py-3 text-black text-2xl font-bold font-poppins">
            Set Your Price
          </div>
          <div className="pb-10">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Rs."
              className="px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
            />
          </div>
          <hr className="border-1 border-black py-3" />
          <div className="pb-10">
            <h2 className=" text-black text-2xl font-bold font-poppins pb-1 ">
              Photos
            </h2>
            <p className="pb-2">Drag and drop clear images of your property </p>
            <div className="py-3 border-2 border-gray-400 rounded-md h-56 flex justify-center items-center ">
              <FileUploader />
            </div>
          </div>
          <hr className="border-1 border-black pt-3" />
          {/* Home Type */}
          <div className="pb-10">
            <h2 className="text-black text-2xl font-bold font-poppins pb-1">
              Property Information
            </h2>
            <p className="py-2 font-semibold">Home Type</p>
            <Select
              onValueChange={(value) => handleSelectChange("homeType", value)}
            >
              <SelectTrigger className="w-[280px] bg-transparent border-gray-400">
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent className="bg-[#d9d9d9]">
                <SelectGroup>
                  <SelectItem value="Single Family">Single Family</SelectItem>
                  <SelectItem value="Multi Family">Multi Family</SelectItem>
                  <SelectItem value="Apartment">Apartment</SelectItem>
                  <SelectItem value="Land">Land</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Bedrooms, Bathrooms, Floors */}
          <div className="flex justify-between gap-6 pb-10">
            <div className="pt-4 flex-1">
              <p className="py-2">Bedrooms</p>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2">Attached Bathrooms</p>
              <input
                type="number"
                name="attachedBathrooms"
                value={formData.attachedBathrooms}
                onChange={handleChange}
                min="0"
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2">Detached Bathrooms</p>
              <input
                type="number"
                name="detachedBathrooms"
                value={formData.detachedBathrooms}
                onChange={handleChange}
                min="0"
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2"> Floors </p>
              <div>
                <Select
                  onValueChange={(value) => handleSelectChange("floors", value)}
                >
                  <SelectTrigger className="w-[280px] bg-transparent  border-gray-400 ">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#d9d9d9]">
                    <SelectGroup>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-6 pb-10">
            <div className="pt-4 flex-1">
              <p className="py-2">House Area (sq ft)</p>
              <input
                type="number"
                name="houseArea"
                value={formData.houseArea}
                onChange={handleChange}
                placeholder=""
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                min="0"
              />
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2">Land Area (sq ft)</p>
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                placeholder=""
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                min="0"
              />
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2">Parking Availability</p>
              <div>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("parking", value)
                  }
                >
                  <SelectTrigger className="w-[280px] bg-transparent  border-gray-400 ">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#d9d9d9]">
                    <SelectGroup>
                      <SelectItem value="sf">Available</SelectItem>
                      <SelectItem value="mf">Not Available</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-4 flex-1">
              <p className="py-2">Build year </p>
              <input
                type="number"
                name="buildYear"
                value={formData.buildYear}
                onChange={handleChange}
                placeholder=""
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                min="0"
              />
            </div>
          </div>
          {/* Description */}
          <div className="flex justify-between gap-6 pb-10">
            <div className="pt-4 flex-1">
              <p className="py-2">Description</p>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md h-32"
              />
            </div>
          </div>
          <hr className="border-1 border-black py-3" />
          {/* Phone */}

          <div className="pb-8">
            {" "}
            <div className="pb-4 text-black text-2xl font-bold font-poppins ">
              Contact Information
            </div>
            <p>
              Potential buyers will contact you through the email address you
              use to register on <br /> UrbanNest. You must also add your phone
              number to the listing here.
            </p>
            <p className="py-3 font-semibold">Phone number</p>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+94 xxxxxxxxx"
              className="px-2 w-96 outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
            />
          </div>

          {/* Terms and Conditions */}
          <hr className="border-1 border-black py-3" />
          <div className="pb-7">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-transparent border-black text-black hover:bg-main-blue hover:text-white w-52 font-bold border-2 hover:border-main-blue"
          >
            Post for Sell
          </Button>
        </div>
      </div>
    </form>
  );
}

export default Listing;
