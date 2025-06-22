"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import toast, { Toaster } from "react-hot-toast";
import Image from 'next/image';

const DeleteAccount = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const handleEmailVerification = async () => {
    try {
      if (email !== currentUser.email) {
        toast.error('Email does not match your account email');
        return;
      }
      setIsEmailVerified(true);
      toast.success('Email verified successfully');
    } catch (error) {
      toast.error(error.message || 'Email verification failed');
    }
  };

  const handleDeleteAccount = async () => {
    if (!isEmailVerified) {
      toast.error('Please verify your email first');
      return;
    }

    try {
      const res = await fetch(`/api/auth/delete/${currentUser._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete account');
      }

      // Clear local storage and cookies
      localStorage.removeItem('persist:root');
      document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      
      toast.success('Account deleted successfully');
      router.push('/sign_in');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error(error.message || 'Failed to delete account');
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
            onClick={onBack}
            className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
          >
            ←
          </button>
          <h1 className="text-2xl font-semibold text-center flex-1">
            Delete Account
          </h1>
          <div className="w-8"></div>
        </div>

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

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-red-600 mb-4">Warning: This action cannot be undone</h3>
            <p className="text-gray-600 mb-4">
              Please enter your email address to confirm account deletion. This will permanently delete your account and all associated data.
            </p>
            
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg"
              />
              
              <button
                onClick={handleEmailVerification}
                className="w-full bg-yellow-600 text-white rounded-lg p-3 uppercase hover:opacity-95"
              >
                Verify Email
              </button>

              <button
                onClick={handleDeleteAccount}
                disabled={!isEmailVerified}
                className={`w-full ${
                  isEmailVerified
                    ? 'bg-red-600 hover:opacity-95'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white rounded-lg p-3 uppercase`}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-300">
          <p className="text-center text-xs text-gray-500">
            UrbanNest - Your trusted property partner
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount; 