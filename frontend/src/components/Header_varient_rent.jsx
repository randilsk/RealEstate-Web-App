"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, SlidersHorizontal, ChevronDown, MapPin, DollarSign, Home, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavItem = ({ label, bold, className = "" }) => (
  <div
    className={`text-white text-base md:text-lg font-poppins ${
      bold ? "font-bold" : ""
    } ${className}`}
  >
    {label}
  </div>
);

const FilterButton = ({ label, icon: Icon, selectedValue, showSelected = false }) => (
  <div className="flex items-center justify-between w-full h-9 px-4 bg-white/95 backdrop-blur-sm rounded-full font-poppins shadow-sm hover:shadow-md hover:bg-white hover:scale-[1.02] transition-all duration-200 border border-white/20">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4 text-gray-600" />}
      <span className="text-gray-700 text-sm md:text-base font-medium">
        {showSelected && selectedValue !== "All" ? selectedValue : label}
      </span>
    </div>
    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
  </div>
);

function Header_varient_rent() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedBedroom, setSelectedBedroom] = useState("All");
  const [selectedBathroom, setSelectedBathroom] = useState("All");

  // Sri Lankan districts
  const districts = [
    "All", "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
    "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
    "Mullaitivu", "Vavuniya", "Puttalam", "Kurunegala", "Anuradhapura",
    "Polonnaruwa", "Badulla", "Monaragala", "Ratnapura", "Kegalle", "Trincomalee",
    "Batticaloa", "Ampara"
  ];

  const priceRanges = [
    { value: "All", label: "All Prices" },
    { value: "0-50000", label: "Under Rs. 50K" },
    { value: "50000-100000", label: "Rs. 50K - 100K" },
    { value: "100000-200000", label: "Rs. 100K - 200K" },
    { value: "200000-500000", label: "Rs. 200K - 500K" },
    { value: "500000+", label: "Above Rs. 500K" }
  ];

  const bedroomOptions = ["All", "1", "2", "3", "4", "5+"];
  const bathroomOptions = ["All", "1", "2", "3", "4+"];

  const handleLocationSearch = async (e) => {
    const value = e.target.value;
    setSearchLocation(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            value
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          setSearchResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchIconClick = async () => {
    if (searchLocation.trim()) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchLocation
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const location = data.results[0];
          handleLocationSelect(location);
        }
      } catch (error) {
        console.error("Error searching location:", error);
      }
    }
  };

  const handleLocationSelect = (location) => {
    setSearchLocation(location.formatted_address);
    setSearchResults([]);
    window.dispatchEvent(
      new CustomEvent("locationSelected", {
        detail: {
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng,
          address: location.formatted_address,
        },
      })
    );
  };

// Handle district selection
const handleDistrictSelection = (district) => {
  setSelectedDistrict(district);

  if (district === "All") {
    // 1) Tell page.tsx to reset the list to *all* properties
    window.dispatchEvent(
      new CustomEvent("districtSelected", {
        detail: { districtName: "All" },
      })
    );
    // 2) Tell MapSection to remove the blue outline & recenter
    window.dispatchEvent(
      new CustomEvent("districtSelected", {
        detail: { districtName: "None" },
      })
    );
    return;
  }

  // Normal single-district selection
  window.dispatchEvent(
    new CustomEvent("districtSelected", {
      detail: { districtName: district },
    })
  );
};

  // Handle price selection
  const handlePriceSelection = (price) => {
    setSelectedPrice(price);
    window.dispatchEvent(
      new CustomEvent("priceSelected", {
        detail: { priceRange: price },
      })
    );
  };

  // Handle bedroom selection
  const handleBedroomSelection = (bedroom) => {
    setSelectedBedroom(bedroom);
    window.dispatchEvent(
      new CustomEvent("bedroomSelected", {
        detail: { bedroomCount: bedroom },
      })
    );
  };

  // Handle bathroom selection
  const handleBathroomSelection = (bathroom) => {
    setSelectedBathroom(bathroom);
    window.dispatchEvent(
      new CustomEvent("bathroomSelected", {
        detail: { bathroomCount: bathroom },
      })
    );
  };

  const MobileNavContent = () => (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-3">
        <NavItem>
          <Link href={"/buy"}>Buy</Link>
        </NavItem>
        <NavItem>
          <Link href={"/rent"}> Rent</Link>
        </NavItem>
        <NavItem>
          <Link href={"/sell"}>List</Link>
        </NavItem>
        <Link href={"/"}>
          <NavItem label="Home" />
        </Link>
            <Link href={"/help"}>
            <NavItem label="Help" />
            </Link>
        {currentUser ? (
          <Link href="/profile" className="flex items-center gap-2">
            <Image
              src={currentUser.avatar}
              alt="Profile"
              width={28}
              height={28}
              className="rounded-full"
            />
            <span className="text-white">Profile</span>
          </Link>
        ) : (
          <Link href="/sign_in">
            <NavItem>Sign In</NavItem>
          </Link>
        )}
      </div>
    </div>
  );

  const MobileFiltersContent = () => (
    <div className="flex flex-col gap-3 p-4">
      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="District" icon={MapPin} selectedValue={selectedDistrict} showSelected />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full max-h-60 overflow-y-auto shadow-xl border-0 rounded-xl">
            <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Select District</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            {districts.map((district) => (
              <DropdownMenuItem
                key={district}
                onClick={() => handleDistrictSelection(district)}
                className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedDistrict === district ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {district}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="Monthly Rent" icon={DollarSign} selectedValue={priceRanges.find(p => p.value === selectedPrice)?.label} showSelected />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full shadow-xl border-0 rounded-xl">
            <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Select Rent Range</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            {priceRanges.map((price) => (
              <DropdownMenuItem
                key={price.value}
                onClick={() => handlePriceSelection(price.value)}
                className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedPrice === price.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {price.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="Beds and Baths" icon={Home} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full shadow-xl border-0 rounded-xl">
            <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Number of Bedrooms</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            {bedroomOptions.map((bedroom) => (
              <DropdownMenuItem
                key={bedroom}
                onClick={() => handleBedroomSelection(bedroom)}
                className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedBedroom === bedroom ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {bedroom} {bedroom !== "All" ? (bedroom === "5+" ? "Bedrooms" : "Bedroom" + (bedroom !== "1" ? "s" : "")) : "Bedrooms"}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Number of Bathrooms</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            {bathroomOptions.map((bathroom) => (
              <DropdownMenuItem
                key={bathroom}
                onClick={() => handleBathroomSelection(bathroom)}
                className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedBathroom === bathroom ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                }`}
              >
                {bathroom} {bathroom !== "All" ? (bathroom === "4+" ? "Bathrooms" : "Bathroom" + (bathroom !== "1" ? "s" : "")) : "Bathrooms"}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="More" icon={MoreHorizontal} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full shadow-xl border-0 rounded-xl">
            <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100" />
            <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Profile</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Billing</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Team</DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-main-blue">
      <div className="max-w-[1920px] mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col gap-3 md:gap-4 font-poppins">
        {/* Top Nav */}
        <div className="flex justify-between items-center">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="p-2">
                <Menu className="w-6 h-6 text-white" />
              </SheetTrigger>
              <SheetContent side="left" className="bg-main-blue w-[280px] p-0">
                <MobileNavContent />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8">
            <Link href={"/buy"}>
              <NavItem label="Buy" />
            </Link>
            <Link href={"/rent"}>
              <NavItem label="Rent" />
            </Link>
            <Link href={"/sell"}>
              <NavItem label="List" />
            </Link>
          </div>

          {/* Logo */}
          <Link href={"/"} className="flex items-center gap-2">
            <div className="text-white text-xl md:text-2xl font-bold">
              Urban Nest
            </div>
          </Link>

          
         {/* Desktop Right Navigation */}
<div className="hidden md:flex gap-8 items-center">
  <Link href={"/"}>
    <NavItem label="Home" />
  </Link>
  <Link href={"/help"}>
    <NavItem label="Help" />
  </Link>
  {currentUser ? (
    <Link href="/profile">
      <Image
        src={currentUser.avatar}
        alt="Profile"
        width={36}
        height={36}
        className="rounded-full"
      />
    </Link>
  ) : (
    <Link href="/sign_in">
      <NavItem>Sign In</NavItem>
    </Link>
  )}
</div>


          {/* Mobile Profile */}
          <div className="md:hidden">
            {currentUser ? (
              <Link href="/profile">
                <Image
                  src={currentUser.avatar}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </Link>
            ) : (
              <Link href="/sign_in">
                <NavItem>Sign In</NavItem>
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Search bar */}
          <div className="flex items-center flex-1 h-10 px-5 bg-white/95 backdrop-blur-sm rounded-full relative shadow-sm hover:shadow-md transition-all duration-200 border border-white/20">
            <input
              type="text"
              value={searchLocation}
              onChange={handleLocationSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchIconClick();
                }
              }}
              placeholder="Enter an address, city, district, province"
              className="w-full bg-transparent border-none outline-none text-gray-700 text-base font-normal placeholder:text-gray-500"
            />
            <div
              className="absolute right-0 pr-4 cursor-pointer hover:scale-110 transition-transform duration-200"
              onClick={handleSearchIconClick}
            >
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={20}
                height={20}
                className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl z-50 border border-gray-100 overflow-hidden">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-blue-50 cursor-pointer text-gray-700 border-b border-gray-50 last:border-b-0 transition-colors"
                    onClick={() => handleLocationSelect(result)}
                  >
                    {result.formatted_address}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* District Filter */}
          <div className="w-36">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full group" asChild>
                <div className="cursor-pointer">
                  <FilterButton 
                    label="District" 
                    icon={MapPin} 
                    selectedValue={selectedDistrict} 
                    showSelected 
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-full max-h-60 overflow-y-auto shadow-xl border-0 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Select District</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                {districts.map((district) => (
                  <DropdownMenuItem
                    key={district}
                    onClick={() => handleDistrictSelection(district)}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedDistrict === district ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {district}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Price Filter */}
          <div className="w-36">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full group" asChild>
                <div className="cursor-pointer">
                  <FilterButton 
                    label="Rent" 
                    icon={DollarSign} 
                    selectedValue={priceRanges.find(p => p.value === selectedPrice)?.label} 
                    showSelected 
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto shadow-xl border-0 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Select Rent Range</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                {priceRanges.map((price) => (
                  <DropdownMenuItem
                    key={price.value}
                    onClick={() => handlePriceSelection(price.value)}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedPrice === price.value ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {price.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Beds and Baths Filter */}
          <div className="w-52">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full group" asChild>
                <div className="cursor-pointer">
                  <FilterButton label="Beds and Baths" icon={Home} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto shadow-xl border-0 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Number of Bedrooms</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                {bedroomOptions.map((bedroom) => (
                  <DropdownMenuItem
                    key={bedroom}
                    onClick={() => handleBedroomSelection(bedroom)}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedBedroom === bedroom ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {bedroom} {bedroom !== "All" ? (bedroom === "5+" ? "Bedrooms" : "Bedroom" + (bedroom !== "1" ? "s" : "")) : "Bedrooms"}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">Number of Bathrooms</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                {bathroomOptions.map((bathroom) => (
                  <DropdownMenuItem
                    key={bathroom}
                    onClick={() => handleBathroomSelection(bathroom)}
                    className={`px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${
                      selectedBathroom === bathroom ? 'bg-blue-100 text-blue-700 font-medium' : 'text-gray-700'
                    }`}
                  >
                    {bathroom} {bathroom !== "All" ? (bathroom === "4+" ? "Bathrooms" : "Bathroom" + (bathroom !== "1" ? "s" : "")) : "Bathrooms"}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* More Filter */}
          <div className="w-32">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full group" asChild>
                <div className="cursor-pointer">
                  <FilterButton label="More" icon={MoreHorizontal} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto shadow-xl border-0 rounded-xl animate-in slide-in-from-top-2 duration-200">
                <DropdownMenuLabel className="text-gray-600 font-semibold px-4 py-2">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-100" />
                <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Profile</DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Billing</DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Team</DropdownMenuItem>
                <DropdownMenuItem className="px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors text-gray-700">Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search and Filter */}
        <div className="md:hidden flex gap-2 items-center">
          {/* Search bar */}
          <div className="flex items-center flex-1 h-9 px-4 bg-white/95 backdrop-blur-sm rounded-full relative shadow-sm border border-white/20">
            <input
              type="text"
              value={searchLocation}
              onChange={handleLocationSearch}
              placeholder="Enter an address, city..."
              className="w-full bg-transparent border-none outline-none text-gray-700 text-sm font-normal placeholder:text-gray-500"
            />
            <div
              className="absolute right-0 pr-4 cursor-pointer"
              onClick={handleSearchIconClick}
            >
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={18}
                height={18}
                className="w-4.5 h-4.5 opacity-70"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleLocationSelect(result)}
                  >
                    {result.formatted_address}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Button */}
          <Sheet>
            <SheetTrigger className="flex-shrink-0">
              <div className="flex items-center justify-center gap-1.5 h-9 px-4 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-white/20 hover:shadow-md transition-all duration-200">
                <SlidersHorizontal className="w-4.5 h-4.5 text-gray-600" />
                <span className="text-gray-700 text-sm font-medium">Filters</span>
              </div>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="bg-main-blue h-[80vh] rounded-t-2xl"
            >
              <MobileFiltersContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Header_varient_rent;