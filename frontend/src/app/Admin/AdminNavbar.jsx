"use client";  // This directive makes it a Client Component

import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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

function AdminNavbar() {
  const currentAdminUser = useSelector((state) => state.admin.currentAdminUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = (
    <>
      <NavItem onClick={closeMenu}>
        <Link href={'/Admin/'}>Dashboard</Link>
      </NavItem>
      <NavItem onClick={closeMenu}>
        <Link href={'/Admin/properties'}>Properties</Link>
      </NavItem>
      <NavItem onClick={closeMenu}>
        <Link href={'/Admin/users'}>Users</Link>
      </NavItem>
      <NavItem onClick={closeMenu}>
        <Link href={'/Admin/ApproveAdds'}>Approvals</Link>
      </NavItem>
      
      
      
      
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
            <Link href={'/Admin/'}>Dashboard</Link>
          </NavItem>
          <NavItem>
            <Link href={'/Admin/properties'}>Properties</Link>
          </NavItem>
          <NavItem>
            <Link href={'/Admin/users'}>Users</Link>
          </NavItem>
        </div>

        {/* Logo - Centered on all screens */}
        <div className="p-2.5 flex justify-center items-center">
          <Link href={'/'}>
            <div className="text-white text-xl md:text-[26px] font-bold cursor-pointer ">UrbanNest Admin</div>
          </Link>
        </div>

        {/* Desktop Auth/Profile Section */}
        <div className="hidden md:flex justify-start items-center gap-7">
          <NavItem onClick={closeMenu}>
        <Link href={'/Admin/ApproveAdds'}>Approvals</Link>
      </NavItem>
            <NavItem>
            <Link href={'/Admin/reports'}>Reports</Link>
          </NavItem>
         
          
           
          
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

export default AdminNavbar;