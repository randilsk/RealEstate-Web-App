"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavItem = ({ label, bold, className = "" }) => (
  <div
    className={`text-white text-xl font-poppins ${
      bold ? "font-bold" : ""
    } ${className}`}
  >
    {label}
  </div>
);

const FilterButton = ({ label }) => (
  <div className="flex items-center justify-between w-full h-14 px-4 bg-[#d9d9d9] rounded-[50px] font-poppins">
    <span className="text-black text-xl font-normal">{label}</span>
    <div>
      <Image
        src="/icons/dropdown-icon.png"
        alt="Search Icon"
        width={15}
        height={15}
        className="w-4 h-4 ml-7"
      />
    </div>
  </div>
);

function Header_varient_1() {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="flex justify-center items-center w-full h-36 bg-white">
      <div className="w-[1228px] h-36 px-10 py-2.5 bg-main-blue rounded-[50px] flex flex-col justify-center gap-2.5 font-poppins mt-10">
        {/* Top Nav */}
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <NavItem label="Buy" className="font-bold" />
            <Link href={"/sell"}>
              <NavItem label="Sell" />
            </Link>
            <NavItem label="Rent" />
          </div>
          <div className="text-white text-2xl font-bold">Urban Nest</div>
          <div className="flex gap-6 items-center">
            <Link href={"/"}>
              <NavItem label="Home" />
            </Link>
            <NavItem label="Help" />
            {currentUser ? (
              <Link href="/profile">
                <img
                  src={currentUser.avatar}
                  alt="/profile"
                  className="w-10 h-10 rounded-full"
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
        <div className="flex gap-2.5 items-center">
          {/* Search bar */}
          <div className="flex items-center w-[453px] h-14 px-6 bg-[#d9d9d9] opacity-90 rounded-[50px] relative">
            <span className="text-black text-lg font-normal opacity-75">
              Enter an address, city, district, province
            </span>
            <div className="absolute right-0 pr-5">
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="w-40">
            <FilterButton label="For Sale" />
          </div>
          <div className="w-40">
            <FilterButton label="Price" />
          </div>
          <div className="w-56">
            <FilterButton label="Beds and Baths" />
          </div>
          <div className="w-32">
            <FilterButton label="More" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header_varient_1;
