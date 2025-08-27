"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from 'next/image';
import toast, { Toaster } from "react-hot-toast";
import slide_image_5 from "../../../public/images/profile_images/profile1.jpg";
import EditProfil from '../Profile/changeProfile.jsx';
import DeleteAccount from './DeleteAccount';

export default function MoreOptions({ onBack, onEditProfile, onUserListings }) {
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const handleEditProfile = () => {
    if (onEditProfile) {
      onEditProfile();
    }
  };

  const handleUpgradePlan = () => {
    router.push('/upgrade-plan');
  };

  const handleBackToProfile = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  if (showDeleteAccount) {
    return <DeleteAccount onBack={() => setShowDeleteAccount(false)} />;
  }

  const menuItems = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      ),
      bgColor: 'from-blue-500 to-indigo-600',
      onClick: handleEditProfile
    },
    {
      id: 'my-listings',
      title: 'My Listings',
      description: 'View and manage your properties',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      ),
      bgColor: 'from-green-500 to-emerald-600',
      onClick: onUserListings
    },
    {
      id: 'upgrade-plan',
      title: 'Upgrade Plan',
      description: 'Get premium features and benefits',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      ),
      bgColor: 'from-purple-500 to-pink-600',
      badge: 'Premium',
      onClick: handleUpgradePlan
    },
    {
      id: 'delete-account',
      title: 'Delete Account',
      description: 'Permanently remove your account',
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      ),
      bgColor: 'from-red-500 to-red-600',
      onClick: () => setShowDeleteAccount(true),
      isDangerous: true
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={slide_image_5} alt='background' fill className="object-cover" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={handleBackToProfile}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      </div>

      <Toaster position="top-center" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-2xl font-light mb-6">More Options</h1>
            
            {/* User Info */}
            <div className="flex flex-col items-center mb-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative mb-4"
              >
                <Image
                  src={currentUser?.avatar || "/default-avatar.png"}
                  alt="profile"
                  className="rounded-full h-16 w-16 object-cover border-2 border-white/30 shadow-xl"
                  width={64}
                  height={64}
                />
                {/* Online Status */}
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
              </motion.div>
              <h2 className="text-white text-lg font-semibold">{currentUser?.username}</h2>
              <p className="text-white/70 text-sm">{currentUser?.email}</p>
            </div>
          </motion.div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onClick={item.onClick}
                className={`
                  group cursor-pointer rounded-2xl p-4 transition-all duration-200
                  ${item.isDangerous 
                    ? 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/30' 
                    : 'bg-white/10 hover:bg-white/20 border border-white/20'
                  }
                  backdrop-blur-sm hover:scale-[1.02] hover:shadow-lg
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon */}
                    <div className={`
                      w-12 h-12 bg-gradient-to-br ${item.bgColor} rounded-xl 
                      flex items-center justify-center shadow-lg
                      group-hover:scale-110 transition-transform duration-200
                    `}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {item.icon}
                      </svg>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm ${
                        item.isDangerous ? 'text-red-200' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs ${
                        item.isDangerous ? 'text-red-300/70' : 'text-white/70'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full font-bold shadow-md">
                        {item.badge}
                      </span>
                    )}
                    <svg 
                      className={`w-5 h-5 ${
                        item.isDangerous ? 'text-red-300' : 'text-white/60'
                      } group-hover:translate-x-1 transition-transform duration-200`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-white/20"
          >
            <p className="text-center text-xs text-white/60">
              UrbanNest - Your trusted property partner
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}