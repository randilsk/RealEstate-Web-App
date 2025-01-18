import Link from "next/link";
import React from "react";

const NavItem = ({ children, isBold }) => (
  <div className="p-2.5 flex justify-center items-center gap-2.5">
    <div
      className={`text-white text-xl ${isBold ? "font-bold" : "font-normal"}`}
    >
      {children}
    </div>
  </div>
);

function Header() {
  return (
    <div
      className="h-navbar px-[30px] py-1 bg-[#3b50df] mt-5 rounded-[50px] flex justify-between items-center font-poppins mx-auto"
      style={{ maxWidth: "calc(100% - 200px)" }}
    >
      <div className="flex justify-start items-center gap-7}">
        <NavItem className="hover:cursor-pointer">
          <Link href={"/buy"}>Buy</Link>
        </NavItem>
        <NavItem>
          <Link href={"/sell"}>Sell</Link>{" "}
        </NavItem>
        <NavItem>Rent</NavItem>
      </div>
      <div className="p-2.5 flex justify-center items-center gap-2.5">
        <div className="text-white text-[26px] font-bold">UrbanNest</div>
      </div>
      <div className="flex justify-start items-center gap-7">
        <NavItem isBold={true}>Home</NavItem>
        <NavItem>Help</NavItem>
        <NavItem>Sign In</NavItem>
      </div>
    </div>
  );
}

export default Header;
