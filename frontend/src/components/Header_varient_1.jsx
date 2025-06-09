"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, SlidersHorizontal } from "lucide-react";
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

const FilterButton = ({ label }) => (
  <div className="flex items-center justify-between w-full h-9 px-4 bg-white/90 rounded-full font-poppins">
    <span className="text-black text-sm md:text-base font-normal">{label}</span>
    <div>
      <Image
        src="/icons/dropdown-icon.png"
        alt="Search Icon"
        width={14}
        height={14}
        className="w-3.5 h-3.5 ml-2"
      />
    </div>
  </div>
);

function Header_varient_1() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
    // Dispatch action to update map location
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

  const MobileNavContent = () => (
    <div className="flex flex-col gap-4 py-4">
      <div className="flex flex-col gap-3">
        <NavItem label="Buy" className="font-bold" />
        <Link href={"/sell"}>
          <NavItem label="Sell" />
        </Link>
        <NavItem label="Rent" />
        <Link href={"/"}>
          <NavItem label="Home" />
        </Link>
        <NavItem label="Help" />
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
            <FilterButton label="For Sale" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="Price" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full">
            <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="Beds and Baths" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full">
            <DropdownMenuLabel>Number of Bedrooms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuLabel>Number of bathrooms</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Team</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between w-full">
            <FilterButton label="More" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white w-full">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
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
            <NavItem label="Buy" className="font-bold" />
            <Link href={"/sell"}>
              <NavItem label="Sell" />
            </Link>
            <NavItem label="Rent" />
          </div>

          {/* Logo */}
          <div className="text-white text-xl md:text-2xl font-bold">Urban Nest</div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href={"/"}>
              <NavItem label="Home" />
            </Link>
            <NavItem label="Help" />
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
          <div className="flex items-center flex-1 h-10 px-5 bg-white/90 rounded-full relative">
            <input
              type="text"
              value={searchLocation}
              onChange={handleLocationSearch}
              placeholder="Enter an address, city, district, province"
              className="w-full bg-transparent border-none outline-none text-black text-base font-normal"
            />
            <div className="absolute right-0 pr-4 cursor-pointer" onClick={handleSearchIconClick}>
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleLocationSelect(result)}
                  >
                    {result.formatted_address}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="w-36">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <FilterButton label="For Sale" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-36">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <FilterButton label="Price" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto">
                <DropdownMenuLabel>Select Price Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-52">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <FilterButton label="Beds and Baths" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto">
                <DropdownMenuLabel>Number of Bedrooms</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuLabel>Number of bathrooms</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Team</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="w-32">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center justify-between w-full">
                <FilterButton label="More" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white w-auto">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Search and Filter */}
        <div className="md:hidden flex gap-2 items-center">
          {/* Search bar */}
          <div className="flex items-center flex-1 h-9 px-4 bg-white/90 rounded-full relative">
            <input
              type="text"
              value={searchLocation}
              onChange={handleLocationSearch}
              placeholder="Enter an address, city..."
              className="w-full bg-transparent border-none outline-none text-black text-sm font-normal"
            />
            <div className="absolute right-0 pr-4 cursor-pointer" onClick={handleSearchIconClick}>
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={18}
                height={18}
                className="w-4.5 h-4.5"
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
              <div className="flex items-center justify-center gap-1.5 h-9 px-4 bg-white/90 rounded-full">
                <SlidersHorizontal className="w-4.5 h-4.5 text-black" />
                <span className="text-black text-sm font-medium">Filters</span>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-main-blue h-[80vh] rounded-t-2xl">
              <MobileFiltersContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default Header_varient_1;
