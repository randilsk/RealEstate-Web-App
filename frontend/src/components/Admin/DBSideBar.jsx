import Link from "next/link";

import React from "react";
import { FaTachometerAlt, FaBuilding, FaUsers, FaDollarSign, FaChartLine, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';

function DBSideBar() {


  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <div className="w-60 h-full bg-[#3B50DF] text-white p-2">
        <h2 className="text-center text-2xl font-bold mb-6">Urban Nest</h2>
        <ul className="space-y-1">
            <li >
                <Link className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md" href={"/Admin"}><FaTachometerAlt /> Dashboard</Link>  
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                <FaBuilding /> Properties
            </li>
            <li >
            <Link className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md" href={"/Admin/ApproveAdds"}><FaUsers /> approvals</Link>
                
            </li>
            <li >
            <Link className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md" href={"/Admin/transaction"}><FaUsers /> Transaction</Link>
                
            </li>
            <li >
            <Link className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md" href={"/Admin/reports"}><FaUsers /> Reports</Link>
                
            </li>
            <li >
            <Link className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md" href={"/Admin/settings"}><FaUsers /> Settings</Link>
                
            </li>
        </ul>
    </div>
    </div>
  );

}
export default DBSideBar;