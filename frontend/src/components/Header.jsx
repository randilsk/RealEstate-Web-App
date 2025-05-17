"use client";  // This directive makes it a Client Component

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { User, Menu, X } from "lucide-react";

const NavItem = ({ children, isBold, onClick = () => {} }) => (
  <div 
    className="p-2.5 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-[#4b5eef] rounded-lg transition-colors"
    onClick={onClick}
  >
    <div
      className={`text-white text-base md:text-xl ${isBold ? "font-bold" : "font-normal"}`}
    >
      {children}
    </div>
  </div>
);

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = (
    <>
      <NavItem>
        <Link href={"/buy"}>Buy</Link>
      </NavItem>
      <NavItem>
        <Link href={"/sell"}>Sell</Link>
      </NavItem>
      <NavItem>Rent</NavItem>
      <NavItem isBold={true}>
        <Link href={"/"}>Home</Link>
      </NavItem>
      <NavItem>Help</NavItem>
      {currentUser ? (
        <Link href="/profile" className="flex items-center">
          <img 
            src={currentUser.avatar} 
            alt="/profile" 
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
        </Link>
      ) : (
        <Link href="/sign_in">
          <NavItem>Sign In</NavItem>
        </Link>
      )}
    </>
  );

  return (
    <div className="relative">
      <div
        className="h-navbar px-4 md:px-[30px] py-1 bg-[#3b50df] mt-5 rounded-[50px] flex justify-between items-center font-poppins mx-auto"
        style={{ maxWidth: "calc(100% - 40px)" }}
      >
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-start items-center gap-7">
          <NavItem>
            <Link href={"/buy"}>Buy</Link>
          </NavItem>
          <NavItem>
            <Link href={"/sell"}>Sell</Link>
          </NavItem>
          <NavItem>Rent</NavItem>
        </div>

        {/* Logo - Centered on all screens */}
        <div className="p-2.5 flex justify-center items-center">
          <div className="text-white text-xl md:text-[26px] font-bold">UrbanNest</div>
        </div>

        {/* Desktop Auth/Profile Section */}
        <div className="hidden md:flex justify-start items-center gap-7">
          <NavItem isBold={true}>
            <Link href={"/"}>Home</Link>
          </NavItem>
          <NavItem>Help</NavItem>
          {currentUser ? (
            <Link href="/profile">
              <img 
                src={currentUser.avatar} 
                alt="/profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </Link>
          ) : (
            <Link href="/sign_in">
              <NavItem>Sign In</NavItem>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#3b50df]/90 backdrop-blur-md rounded-[20px] p-4 z-50 shadow-lg border border-white/10"
          style={{ width: "calc(100% - 40px)", maxWidth: "calc(100% - 80px)" }}>
          <div className="flex flex-col gap-2">
            {navItems}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;