"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/Features/user/userSlice";
import OAuth from "../../components/signInComponents/OAuth";
//import Image from "next/image";

// Properly import the image
//import signInImage from "../../../../frontend/public/images/sign_in-images/signIn_Image.png";

// Define types for the form data and root state
interface FormData {
  email: string;
  password: string;
}

interface RootState {
  user: {
    loading: boolean;
    error: string | null;
  };
}

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Failed to sign in"));
        return;
      }

      dispatch(signInSuccess(data));
      // Redirect to the home page upon successful sign-in
      router.replace("/home");
    } catch (error) {
      console.error('Sign in error:', error);
      dispatch(
        signInFailure(error instanceof Error ? error.message : "An error occurred")
      );
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url(${signInImage.src})",
      }}
    >
      <div
        className="w-[425px] h-[530px] rounded-[48px] p-5 max-w-lg mx-auto shadow-lg border"
        style={{ backgroundColor: "#d9d9d9", borderTopWidth: "4px" }}
      >
        <h1 className="text-3xl text-center font-semibold my-5">
          Welcome to UrbanNest
        </h1>
        <h2 className="text-xl font-semibold my-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
        </form>
        <div className="flex justify-center gap-2 mt-5">
          <p>Don&apos;t have an account?</p>
          <Link href="/sign-up" className="text-blue-700">
            Sign Up
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
      </div>
    </div>
  );
}
