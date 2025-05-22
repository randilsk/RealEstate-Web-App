"use client";
import React, { useState, useEffect } from "react"; // Added useEffect import
import FileUploader from "../FileUploader";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";

function Listing() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentUser = useSelector((state) => state.user.currentUser);

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
    email: currentUser?.email || "",  // Initialize with user email if available
    username: currentUser?.username  
  });

  // Update user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        email: currentUser.email || "",
        user: currentUser._id || "",
      }));
    }
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle images from FileUploader
  const handleImagesChange = (files) => {
    setFormData(prev => ({
      ...prev,
      images: files
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verify user is logged in before submitting
    if (!currentUser || !currentUser._id) {
      alert("Please login before submitting a listing");
      return;
    }
    
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'images') {
          // Append each image file
          formData.images.forEach((file, index) => {
            formDataToSend.append('images', file);
          });
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add user ID as a single value
      formDataToSend.set('user', currentUser._id);
      
      const response = await axios.post(
        "http://localhost:3000/api/listing",
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log("Listing added successfully:", response.data);
      alert("Listing added successfully!");
      router.push("/sell/list_review");
    } catch (error) {
      console.error("Error adding listing:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up request:", error.message);
      }
      alert("Failed to add listing. Please try again.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="min-h-screen">
      <div className="flex justify-center px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full max-w-7xl bg-[#d9d9d9] rounded-md py-4 sm:py-6 px-4 sm:px-10">
          <div className="text-black text-xl sm:text-2xl font-bold font-poppins pb-1">
            List Your Property for Sale by Owner
          </div>
          
          {/* Address and Coordinates */}
          <div className="space-y-2 text-sm sm:text-base">
            <div className="font-regular font-poppins">
              Address:{" "}
              {address && city && district
                ? `${address}, ${city}, ${district}`
                : "Address not provided."}
            </div>
            <div className="font-regular font-poppins">
                {lat && lng ? (
                    <>
                      Latitude: {lat}
                      <br />
                      Longitude: {lng}
                    </>
               ) : (
                    "Coordinates not provided."
               )}
            </div>
          </div>
          
          <div className="pb-2 font-semibold text-sm sm:text-base">List your details below</div>
          <hr className="border-1 border-black py-3" />

          {/* Price Section */}
          <div className="py-3 text-black text-xl sm:text-2xl font-bold font-poppins">
            Set Your Price
          </div>
          <div className="pb-6 sm:pb-10">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Rs."
              className="w-full sm:max-w-md px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
            />
          </div>
          <hr className="border-1 border-black py-3" />

          {/* Photos Section */}
          <div className="pb-6 sm:pb-10">
            <h2 className="text-black text-xl sm:text-2xl font-bold font-poppins pb-1">
              Photos
            </h2>
<<<<<<< HEAD
            <p className="pb-2">Drag and drop clear images of your property </p>
            <div className="py-3 border-2 border-gray-400 rounded-md h-56 flex justify-center items-center ">
              <FileUploader onImagesChange={handleImagesChange} />
=======
            <p className="pb-2 text-sm sm:text-base">Drag and drop clear images of your property</p>
            <div className="py-3 border-2 border-gray-400 rounded-md h-48 sm:h-56 flex justify-center items-center">
              <FileUploader />
>>>>>>> 513cf98a2be20fe0d243ba7ce5b8b25b58117f1f
            </div>
          </div>
          <hr className="border-1 border-black pt-3" />

          {/* Property Information */}
          <div className="pb-6 sm:pb-10">
            <h2 className="text-black text-xl sm:text-2xl font-bold font-poppins pb-1">
              Property Information
            </h2>
            <p className="py-2 font-semibold text-sm sm:text-base">Home Type</p>
            <Select
              onValueChange={(value) => handleSelectChange("homeType", value)}
            >
              <SelectTrigger className="w-full sm:max-w-[280px] bg-transparent border-gray-400">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-6 sm:pb-10">
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Bedrooms</p>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Attached Bathrooms</p>
              <input
                type="number"
                name="attachedBathrooms"
                value={formData.attachedBathrooms}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Detached Bathrooms</p>
              <input
                type="number"
                name="detachedBathrooms"
                value={formData.detachedBathrooms}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Floors</p>
              <Select
                onValueChange={(value) => handleSelectChange("floors", value)}
              >
                <SelectTrigger className="w-full bg-transparent border-gray-400">
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

          {/* House Area, Land Area, Parking, Build Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-6 sm:pb-10">
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">House Area (sq ft)</p>
              <input
                type="number"
                name="houseArea"
                value={formData.houseArea}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Land Area (sq ft)</p>
              <input
                type="number"
                name="landArea"
                value={formData.landArea}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Parking Availability</p>
              <Select
                onValueChange={(value) => handleSelectChange("parking", value)}
              >
                <SelectTrigger className="w-full bg-transparent border-gray-400">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent className="bg-[#d9d9d9]">
                  <SelectGroup>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Not Available">Not Available</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="pt-4">
              <p className="py-2 text-sm sm:text-base">Build year</p>
              <input
                type="number"
                name="buildYear"
                value={formData.buildYear}
                onChange={handleChange}
                min="0"
                className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="pb-6 sm:pb-10">
            <p className="py-2 text-sm sm:text-base">Description</p>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-32"
            />
          </div>

          <hr className="border-1 border-black py-3" />

          {/* Contact Information */}
          <div className="pb-6 sm:pb-8">
            <div className="pb-4 text-black text-xl sm:text-2xl font-bold font-poppins">
              Contact Information
            </div>
            <p className="text-sm sm:text-base">
              Potential buyers will contact you through the email address you
              use to register on UrbanNest. You must also add your phone
              number to the listing here.
            </p>
            <p className="py-3 font-semibold text-sm sm:text-base">Phone number</p>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+94 xxxxxxxxx"
              className="w-full sm:max-w-md px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10"
            />
          </div>

          {/* Email Address */}
          <div className="pb-6 sm:pb-8">
            <p className="py-3 font-semibold text-sm sm:text-base">Email address (from your account)</p>
            <input
              type="email"
              value={currentUser?.email || "Please log in"}
              readOnly
              className="w-full sm:max-w-md px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md h-10 opacity-75"
            />
          </div>

          {/* Terms and Conditions */}
          <hr className="border-1 border-black py-3" />
          <div className="pb-6 sm:pb-7">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm sm:text-base">Accept terms and conditions</Label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-start space-y-2">
            <Button
              type="submit"
              className="w-full sm:w-auto bg-transparent border-black text-black hover:bg-main-blue hover:text-white font-bold border-2 hover:border-main-blue text-sm sm:text-base py-2"
              disabled={!currentUser}
            >
              Post for Sale
            </Button>
            
            {!currentUser && (
              <p className="text-sm text-red-500">You must be logged in to submit a listing</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Listing;