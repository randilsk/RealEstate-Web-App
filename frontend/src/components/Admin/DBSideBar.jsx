import Link from "next/link";
import React from "react";
import { FaTachometerAlt, FaBuilding, FaUsers, FaDollarSign, FaChartLine, FaCog, FaBell, FaUserCircle, FaSignOutAlt, FaExchangeAlt } from 'react-icons/fa';

function DBSideBar() {
  return (
    <div className="fixed h-screen">
      <div className="w-64 h-full bg-[#3B50DF] text-white flex flex-col sticky top-0">
       
        <div className="py-6 border-b border-blue-400 border-opacity-40">
          <div className="flex items-center justify-center">
            <div className="  rounded-lg px-4 py-2 ">
              <h2 className="text-white text-xl font-bold">Urban Nest</h2>
            </div>
          </div>
        </div>

        {/* Admin/User Info */}
        <div className="flex items-center p-4 border-b border-blue-400 border-opacity-40">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#3B50DF]">
            <FaUserCircle size={24} />
          </div>
          <div className="ml-3">
            <p className="font-medium">Admin User</p>
            <p className="text-xs text-blue-200">Administrator</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-xs uppercase text-blue-300 font-medium mb-2 ml-2">Main Menu</p>
          <ul className="space-y-1">
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin">
                <FaTachometerAlt /> Dashboard
              </Link>  
            </li>
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/properties">
                <FaBuilding /> Properties
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/users">
                <FaUsers /> Users
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/ApproveAdds">
                <FaUsers /> Approvals
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/transaction">
                <FaExchangeAlt /> Transactions
              </Link>
            </li>
          </ul>

          <p className="text-xs uppercase text-blue-300 font-medium mt-6 mb-2 ml-2">Reports & Settings</p>
          <ul className="space-y-1">
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/reports">
                <FaChartLine /> Reports
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/Admin/settings">
                <FaCog /> Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Logout Section */}
        <div className="p-4 border-t border-blue-400 border-opacity-40">
          <Link className="flex items-center gap-3 hover:bg-blue-700 p-3 rounded-md transition-colors" href="/logout">
            <FaSignOutAlt /> Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DBSideBar;