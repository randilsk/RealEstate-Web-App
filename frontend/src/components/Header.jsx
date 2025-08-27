"use client"; // This directive makes it a Client Component

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavItem = ({ children, isBold, onClick = () => {} }) => (
  <div
    className="p-2.5 flex justify-center items-center gap-2.5 cursor-pointer hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm relative group"
    onClick={onClick}
  >
    <div
      className={`text-white text-base md:text-xl transition-all duration-300 ${
        isBold ? "font-bold" : "font-normal"
      } group-hover:text-white/90`}
    >
      {children}
    </div>
    {isBold && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full transition-all duration-300"></div>
    )}
  </div>
);

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = (
    <>
      <NavItem isBold={pathname === "/buy"}>
        <Link href={"/buy"}>Buy</Link>
      </NavItem>
      <NavItem isBold={pathname === "/rent"}>
        <Link href={"/rent"}> Rent</Link>
      </NavItem>
      <NavItem isBold={pathname === "/sell"}>
        <Link href={"/sell"}>List</Link>
      </NavItem>
      <NavItem isBold={pathname === "/"}>
        <Link href={"/"}>Home</Link>
      </NavItem>
      <NavItem isBold={pathname === "/help"}>
        <Link href={"/help"}>Help</Link>
      </NavItem>
      {currentUser ? (
        <Link href="/profile" className="flex items-center group">
          <div className="relative">
            <Image
              src={currentUser.avatar}
              alt="Profile"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ring-2 ring-white/20 group-hover:ring-white/40"
            />
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
          </div>
        </Link>
      ) : (
        <Link href="/sign_in">
          <div className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 hover:border-white/30">
            <div className="text-white text-base font-normal">
              Sign In
            </div>
          </div>
        </Link>
      )}
    </>
  );

  return (
    <div className="relative">
      <div
        className="h-navbar px-4 md:px-[30px] py-1 bg-[#3b50df]/95 backdrop-blur-md mt-5 rounded-[50px] flex justify-between items-center font-poppins mx-auto shadow-lg border border-white/10 transition-all duration-300 hover:shadow-xl"
        style={{ maxWidth: "calc(100% - 40px)" }}
      >
        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-start items-center gap-7">
          <NavItem isBold={pathname === "/buy"}>
            <Link href={"/buy"}>Buy</Link>
          </NavItem>
          <NavItem isBold={pathname === "/rent"}>
            <Link href={"/rent"}> Rent</Link>
          </NavItem>
          <NavItem isBold={pathname === "/sell"}>
            <Link href={"/sell"}>List</Link>
          </NavItem>
        </div>

        {/* Logo - Centered on all screens */}
        <div className="p-2.5 flex justify-center items-center">
          <Link href={"/"}>
            <div className="text-white text-xl md:text-[26px] font-bold cursor-pointer hover:scale-105 transition-all duration-300 hover:text-white/90 drop-shadow-sm">
              UrbanNest
            </div>
          </Link>
        </div>

        {/* Desktop Auth/Profile Section */}
        <div className="hidden md:flex justify-start items-center gap-7">
          <NavItem isBold={pathname === "/"}>
            <Link href={"/"}>Home</Link>
          </NavItem>
          <NavItem isBold={pathname === "/help"}>
            <Link href={"/help"}>Help</Link>
          </NavItem>
          {currentUser ? (
            <Link href="/profile" className="group">
              <div className="relative">
                <Image
                  src={currentUser.avatar}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ring-2 ring-white/20 group-hover:ring-white/40"
                />
                <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </div>
            </Link>
          ) : (
            <Link href="/sign_in">
              <div className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 hover:border-white/30">
                <div className="text-white text-base md:text-xl font-normal">
                  Sign In
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#3b50df]/95 backdrop-blur-md rounded-[20px] p-4 z-50 shadow-xl border border-white/20 animate-fadeIn"
          style={{ width: "calc(100% - 40px)", maxWidth: "calc(100% - 80px)" }}
        >
          <div className="flex flex-col gap-2">{navItems}</div>
        </div>
      )}
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Header;
