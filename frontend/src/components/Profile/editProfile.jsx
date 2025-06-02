"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure
} from "../../redux/Features/user/userSlice";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';

export default function MoreOptions({ onBack }) {
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEditProfile = () => {
    // Navigate to edit profile page or open edit modal
    router.push('/edit-profile');
    // Or you could implement inline editing here
  };

  const handleViewListings = () => {
    // Navigate to user's listings page
    router.push('/my-listings');
  };

  const handleUpgradePlan = () => {
    // Navigate to upgrade plan page
    router.push('/upgrade-plan');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        dispatch(deleteUserStart());

        // Make the delete request to the backend
        const response = await fetch(`/api/auth/delete/${currentUser._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete account');
        }

        // If successful, update Redux state and redirect
        dispatch(deleteUserSuccess());
        setDeleteSuccess(true);
        toast.success('Account deleted successfully');

        // Clear local storage
        localStorage.removeItem('persist:root');

        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
        setDeleteError("Failed to delete account. Please try again.");
        toast.error(error.message || "Failed to delete account");
        console.error("Delete account failed", error);
      }
    }
  };

  const handleBackToProfile = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${signInImage.src})`,
      }}
    >
      <Toaster position="top-center" />
      <div
        className="w-[450px] rounded-[48px] p-6 max-w-lg mx-auto shadow-lg border"
        style={{ backgroundColor: "#d9d9d9", borderTopWidth: "4px" }}
      >
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBackToProfile}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-center flex-1">
            More Options
          </h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        {/* User Info Section */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src={currentUser?.avatar || "/default-avatar.png"}
            alt="profile"
            className="rounded-full h-20 w-20 object-cover mb-3"
            width={80}
            height={80}
          />
          <h2 className="text-lg font-semibold">{currentUser?.username}</h2>
          <p className="text-gray-600 text-sm">{currentUser?.email}</p>
        </div>

        {/* Options Menu */}
        <div className="space-y-4">
          {/* Edit Profile */}
          <div
            onClick={handleEditProfile}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Edit Profile</h3>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* View Listings */}
          <div
            onClick={handleViewListings}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l5-2 5 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">My Listings</h3>
                <p className="text-sm text-gray-500">View and manage your properties</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Upgrade Plan */}
          <div
            onClick={handleUpgradePlan}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Upgrade Plan</h3>
                <p className="text-sm text-gray-500">Get premium features and benefits</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                Premium
              </span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Delete Account */}
          <div
            onClick={handleDeleteAccount}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-red-200 hover:border-red-300"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-red-900">Delete Account</h3>
                <p className="text-sm text-red-500">Permanently remove your account</p>
              </div>
            </div>
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Error and Success Messages */}
        {deleteError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-700 text-center text-sm">{deleteError}</p>
          </div>
        )}
        {deleteSuccess && (
          <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-700 text-center text-sm">Account deleted successfully!</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-gray-300">
          <p className="text-center text-xs text-gray-500">
            UrbanNest - Your trusted property partner
          </p>
        </div>
      </div>
    </div>
  );
}