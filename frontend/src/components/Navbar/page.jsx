import React from "react";
import { FaBell, FaUserCircle } from 'react-icons/fa';


function Navbar() {
    return (
        <div className="flex-1 bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <div className="w-1/3"></div>
                <div className="w-1/3 flex justify-center">
                    <input 
                        type="text" 
                        placeholder="Enter an address, city, district, province" 
                        className="p-2 border rounded-md w-full text-black" 
                    />
                </div>
                <div className="w-1/3 flex justify-end gap-4 text-xl">
                    <FaBell className="cursor-pointer hover:text-blue-200 transition-colors" />
                    <FaUserCircle className="cursor-pointer hover:text-blue-200 transition-colors" />
                </div>
            </div>
            ,/</div>
  );
}


export default Navbar;
