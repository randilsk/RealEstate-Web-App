"use client";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signInSuccess } from "../../redux/Features/user/userSlice";
import { app } from "../../lib/firebase";
import GoogleImage from "../../../public/images/sign_in-images/googleLogo.png";

export default function OAuth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");

  // Clear error message after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);

      // Cleanup timeout on component unmount or when error changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      // Add additional scopes if needed
      provider.addScope('email');
      provider.addScope('profile');

      const result = await signInWithPopup(auth, provider);
      console.log("Google sign-in result:", result);

      if (!result.user) {
        setError('No user data returned from Google');
        return;
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Backend API error: ${errorData.message || res.statusText}`);
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      router.push("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      
      // Set specific error messages based on error type
      if (error.code === 'auth/popup-blocked') {
        setError('Please enable popups for this website to sign in with Google');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed the popup, no need to show error
        return;
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleGoogleClick}
        type="button"
        className="flex items-center justify-center border p-3 rounded-lg mt-4 hover:bg-gray-100 transition-colors"
      >
        <Image
          src={GoogleImage}
          alt="Google logo"
          width={24}
          height={24}
          className="mr-2"
        />
        Continue with Google
      </button>
      
      {/* Error message display */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg transition-opacity">
          {error}
        </div>
      )}
    </div>
  );
}