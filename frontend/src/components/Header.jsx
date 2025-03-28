"use client";  // This directive makes it a Client Component

import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { User } from "lucide-react";

const NavItem = ({ children, isBold, onClick = () => {} }) => (
  <div 
    className="p-2.5 flex justify-center items-center gap-2.5 cursor-pointer"
    onClick={onClick}
  >
    <div
      className={`text-white text-xl ${isBold ? "font-bold" : "font-normal"}`}
    >
      {children}
    </div>
  </div>
);

function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div
      className="h-navbar px-[30px] py-1 bg-[#3b50df] mt-5 rounded-[50px] flex justify-between items-center font-poppins mx-auto"
      style={{ maxWidth: "calc(100% - 200px)" }}
    >
      <div className="flex justify-start items-center gap-7">
        <NavItem>
          <Link href={"/buy"}>Buy</Link>
        </NavItem>
        <NavItem>
          <Link href={"/sell"}>Sell</Link>
        </NavItem>
        <NavItem>Rent</NavItem>
      </div>
      <div className="p-2.5 flex justify-center items-center gap-2.5">
        <div className="text-white text-[26px] font-bold">UrbanNest</div>
      </div>
      <div className="flex justify-start items-center gap-7">
        <NavItem isBold={true}>
          <Link href={"/"}>Home</Link>
        </NavItem>
        <NavItem>Help</NavItem>
        {currentUser ? (
          <Link href="/profile">
            <NavItem>
              <User className="text-white w-6 h-6" />
            </NavItem>
          </Link>
        ) : (
          <Link href="/sign_in">
            <NavItem>Sign In</NavItem>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;