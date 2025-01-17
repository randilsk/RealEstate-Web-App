import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header_varient() {
  return (
    <>
      <div className="w-[1228px] h-[135px] px-[39px] py-2.5 bg-[#3b50df] rounded-[50px] flex items-center gap-2.5  font-poppins mx-auto top-5 relative">
        <div className="self-stretch h-[116px] flex-col justify-start items-center gap-0.5 flex">
          <div className="justify-center items-center gap-[230px] inline-flex">
            <div className="w-[232px] h-[50px] justify-center items-start gap-7 inline-flex">
              <div className="w-[57px] self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl font-bold">Buy</div>
              </div>
              <div className="w-[54px] self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl">Sell</div>
              </div>
              <div className="grow shrink basis-0 self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl">Rent</div>
              </div>
            </div>
            <div className="w-[169px] self-stretch p-2.5 justify-center items-center inline-flex">
              <div className="text-white text-[26px] font-bold">Urban Nest</div>
            </div>
            <div className="grow shrink basis-0 h-[50px] justify-center items-start gap-7 inline-flex">
              <div className="w-[81px] self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl ">
                  <Link href={"/"}>Home</Link>
                </div>
              </div>
              <div className="w-[65px] self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl">Help</div>
              </div>
              <div className="grow shrink basis-0 self-stretch p-2.5 justify-center items-center inline-flex">
                <div className="text-white text-xl">Sign In</div>
              </div>
            </div>
          </div>
          <div className="self-stretch items-center gap-2.5 inline-flex justify-between">
            <div className="px-[27.50px] py-2.5 opacity-90 bg-[#bcbbba] rounded-[50px] flex items-center gap-[15px]">
              <div className="flex items-center opacity-75 text-black text-lg w-full">
                <div className="flex-grow">
                  Enter a address, city, district, province
                </div>
                <div>
                  <Image
                    src="/icons/search-icon.svg"
                    alt="Search Icon"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              </div>
            </div>
            <div className="w-auto px-9 py-2.5 bg-[#abadbf] rounded-[50px] flex items-center gap-2.5">
              <div className="text-black text-xl flex items-center justify-between w-full">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center justify-between w-full">
                    <span>For Sale</span>
                    <Image
                      src="/icons/dropdown-icon.png"
                      alt="Search Icon"
                      width={15}
                      height={15}
                      className="w-4 h-4 ml-2"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-main-bg w-auto">
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

            <div className="w-auto px-9 py-2.5 bg-[#abadbf] rounded-[50px] flex items-center gap-2.5">
              <div className="text-black text-xl flex items-center">
                Price
                <Image
                  src="/icons/dropdown-icon.png"
                  alt="Search Icon"
                  width={15}
                  height={15}
                  className="w-4 h-4 ml-7"
                />
              </div>
            </div>
            <div className="w-auto px-9 py-2.5 bg-[#abadbf] rounded-[50px] flex items-center gap-2.5">
              <div className="text-black text-xl flex items-center justify-between w-full">
                Beds & Baths
                <Image
                  src="/icons/dropdown-icon.png"
                  alt="Search Icon"
                  width={15}
                  height={15}
                  className="w-4 h-4 ml-2"
                />
              </div>
            </div>
            <div className="w-auto px-9 py-2.5 bg-[#abadbf] rounded-[50px] flex items-center gap-2.5">
              <div className="text-black text-xl flex items-center">
                More
                <Image
                  src="/icons/dropdown-icon.png"
                  alt="Search Icon"
                  width={15}
                  height={15}
                  className="w-4 h-4 ml-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header_varient;
