"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import signInImage from "../../../public/images/profile_images/profile1.jpg";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const DeleteAccount = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  const handleEmailVerification = async () => {
    try {
      const token = localStorage.getItem("token");
      if (email !== currentUser.email) {
        toast.error("Email does not match your account email");
        return;
      }
      setIsEmailVerified(true);
      toast.success("Email verified successfully");
    } catch (error) {
      toast.error(error.message || "Email verification failed");
    }
  };

  const handleDeleteAccount = async () => {
    if (!isEmailVerified) {
      toast.error("Please verify your email first");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:3000/api/auth/delete/${currentUser._id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete account");
      }

      localStorage.removeItem("persist:root");
      document.cookie =
        "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      toast.success("Account deleted successfully");
      router.push("/sign_in");
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error(error.message || "Failed to delete account");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image src={signInImage} alt="background" fill className="object-cover" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none"
        >
          ←
        </button>
      </div>

      <Toaster position="top-center" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full">
          <h1 className="text-white text-2xl font-light mb-6 text-center">
            Delete Account
          </h1>

          {/* Profile Info */}
          <div className="flex flex-col items-center mb-8">
            <Image
              src={currentUser?.avatar || "/default-avatar.png"}
              alt="profile"
              className="rounded-full object-cover mb-3 shadow-lg border-4 border-white/30"
              width={90}
              height={90}
            />
            <h2 className="text-lg font-semibold text-white">
              {currentUser?.username}
            </h2>
            <p className="text-white/60 text-sm">{currentUser?.email}</p>
          </div>

          {/* Warning + Actions */}
          <div className="bg-white/5 p-6 rounded-2xl shadow-inner border border-white/10 space-y-4">
            <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2">
              ⚠ Warning
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Please enter your email to confirm account deletion.
              This will{" "}
              <span className="font-semibold text-red-400">permanently</span>{" "}
              delete your account and all data.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
            />

            <button
              onClick={handleEmailVerification}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg p-3 uppercase font-semibold hover:scale-[1.02] hover:shadow-lg transition-all"
            >
              Verify Email
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={!isEmailVerified}
              className={`w-full ${
                isEmailVerified
                  ? "bg-gradient-to-r from-red-500 to-red-700 hover:scale-[1.02] hover:shadow-lg"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white rounded-lg p-3 uppercase font-semibold transition-all`}
            >
              Delete Account
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-center text-xs text-white/60">
              UrbanNest - Your trusted property partner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
