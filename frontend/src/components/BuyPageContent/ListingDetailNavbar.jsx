import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineHeart } from "react-icons/hi";
import { FiShare2, FiMoreHorizontal, FiMenu, FiX } from "react-icons/fi";
import { MdOutlineHideSource } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";

export default function ListingDetailNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full rounded-full bg-[#3b50df] flex flex-col items-center md:flex-row md:items-center md:justify-between px-3 md:px-6 py-3 mb-4 gap-3 md:gap-2 shadow-md relative">
      {/* Top row: Back, Title, Hamburger/Menu */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/buy" className="flex items-center text-white font-medium text-base hover:underline">
          <IoChevronBackOutline className="text-xl mr-1" />
          <span className="hidden xs:inline">Back</span>
        </Link>
        <div className="flex-1 flex justify-center md:justify-center">
          <span className="text-white font-bold text-lg md:text-xl lg:text-2xl">Urban Nest</span>
        </div>
        {/* Hamburger menu for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl focus:outline-none ml-2">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
      {/* Actions: visible on md+ or in mobile menu */}
      <div className={`md:flex items-center justify-center gap-2 sm:gap-4 flex-wrap w-full md:w-auto ${menuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-[#3b50df] rounded-b-2xl z-50 py-3' : 'hidden' } md:static md:bg-transparent md:rounded-none md:py-0`}>
        <button className="flex items-center justify-center text-white font-medium text-base gap-1 hover:opacity-80 py-2 md:py-0">
          <HiOutlineHeart className="text-2xl" />
          <span className="hidden sm:inline">Save</span>
        </button>
        <button className="flex items-center justify-center text-white font-medium text-base gap-1 hover:opacity-80 py-2 md:py-0">
          <FiShare2 className="text-2xl" />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button className="flex items-center justify-center text-white font-medium text-base gap-1 hover:opacity-80 py-2 md:py-0">
          <MdOutlineHideSource className="text-2xl" />
          <span className="hidden sm:inline">Hide</span>
        </button>
        <button className="flex items-center justify-center text-white font-medium text-base gap-1 hover:opacity-80 py-2 md:py-0">
          <FiMoreHorizontal className="text-2xl" />
          <span className="hidden sm:inline">More</span>
        </button>
      </div>
    </div>
  );
} 