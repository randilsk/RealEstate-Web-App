import React from "react";
import FileUploader from "../FileUploader";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Listing() {
  return (
    <>
      <div className="flex justify-center mt-6">
        <div className="h-full w-10/12 bg-[#d9d9d9] rounded-md py-6 px-10 ">
          <div className=" text-black text-2xl font-bold font-poppins pb-1">
            List Your Property for Sale by Owner
          </div>
          <div className="font-semibold  font-poppins pb-1">
            address entered should be loaded to here....
          </div>
          <div className="pb-2">list your details below</div>
          <hr className="border-1 border-black py-3" />
          <div className="py-3 text-black text-2xl font-bold font-poppins ">
            Set Your Price
          </div>
          <div className="pb-10">
            <input
              type="text"
              placeholder="Rs."
              className="px-2 outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10"
            />
          </div>
          <hr className="border-1 border-black py-3" />
          <div className="pb-10">
            <h2 className=" text-black text-2xl font-bold font-poppins pb-1 ">
              Photos
            </h2>
            <p className="pb-2">Drag and drop </p>
            <div className="py-3 border-2 border-gray-400 rounded-md h-56 flex justify-center items-center ">
              <FileUploader />
            </div>
          </div>
          <hr className="border-1 border-black pt-3" />
          <div>
            <h2 className=" text-black text-2xl font-bold font-poppins pt-3 ">
              Property Information
            </h2>
            <div className="py-1">
              <p className="py-2 font-semibold">Home Type</p>
              <div>
                <Select>
                  <SelectTrigger className="w-[280px] bg-transparent  border-gray-400 ">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#d9d9d9]">
                    <SelectGroup>
                      <SelectItem value="sf">Single Family</SelectItem>
                      <SelectItem value="mf">Multi Family</SelectItem>
                      <SelectItem value="apt">Apartment</SelectItem>
                      <SelectItem value="lnd">Land</SelectItem>
                      <SelectItem value="lnd">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between gap-6 pb-10">
                <div className="pt-4 flex-1">
                  <p className="py-2">Beds</p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2">Attached Bathrooms</p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2">Detached Bathrooms</p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2"> Floors </p>
                  <div>
                    <Select>
                      <SelectTrigger className="w-[280px] bg-transparent  border-gray-400 ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#d9d9d9]">
                        <SelectGroup>
                          <SelectItem value="sf">1</SelectItem>
                          <SelectItem value="mf">2</SelectItem>
                          <SelectItem value="apt">2</SelectItem>
                          <SelectItem value="lnd">4</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-6 pb-10">
                <div className="pt-4 flex-1">
                  <p className="py-2">House Area (sq ft)</p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2">Land Area (sq ft)</p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2">Parking Availability</p>
                  <div>
                    <Select>
                      <SelectTrigger className="w-[280px] bg-transparent  border-gray-400 ">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#d9d9d9]">
                        <SelectGroup>
                          <SelectItem value="sf">Available</SelectItem>
                          <SelectItem value="mf">Not Available</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4 flex-1">
                  <p className="py-2">Build year </p>
                  <input
                    type="number"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md  h-10 "
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6 pb-10">
                <div className="pt-4 flex-1">
                  <p className="py-2">Description</p>
                  <textarea
                    type="text"
                    placeholder=""
                    className="px-2 w-full outline-none bg-transparent border-2 border-gray-400 rounded-md h-32 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Listing;
