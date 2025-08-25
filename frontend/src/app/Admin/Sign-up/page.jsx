"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  adminsignInStart,
  adminsignInSuccess,
  adminsignInFailure,
} from "../../../redux/Features/user/adminSlice";

export default function AdminSignUp() {
  const [formData, setFormData] = useState({
    name: "",
    companyId: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate email domain
    if (!formData.email.endsWith("@urbannest.com")) {
      setError("Only @urbannest.com email addresses are allowed");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          companyId: formData.companyId, // Added companyId
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to sign up");
        return;
      }

      // Automatically sign in after successful sign up
      dispatch(adminsignInStart());
      const signInRes = await fetch("http://localhost:3000/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const signInData = await signInRes.json();
      if (!signInRes.ok) {
        dispatch(
          adminsignInFailure(
            signInData.message ||
              "Sign up succeeded, but failed to sign in. Please try signing in manually."
          )
        );
        setError(
          signInData.message ||
            "Sign up succeeded, but failed to sign in. Please try signing in manually."
        );
        return;
      }
      dispatch(adminsignInSuccess(signInData.admin));

      router.replace("/Admin/");
    } catch (err) {
      console.error("Signup error:", err); // Added logging
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false); // Always reset loading state
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex items-center justify-center px-2 py-6 sm:px-4 sm:py-0 md:px-8"
      style={{
        backgroundImage: `url(/images/sign_in-images/signIn_Image.png)`,
      }}
    >
      <div className="w-full max-w-[400px] box-border rounded-2xl sm:rounded-[36px] p-4 py-6 sm:p-5 sm:py-5 mx-auto shadow-lg border bg-[#d9d9d9] border-t-4 flex flex-col justify-center">
        <h1 className="text-lg sm:text-2xl text-center font-semibold my-2 sm:my-4">
          Welcome to UrbanNest Admin
        </h1>
        <h2 className="text-base sm:text-lg font-semibold my-2 sm:my-3 text-center">
          Admin Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Company ID"
            className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            id="companyId"
            value={formData.companyId}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Company Email (@urbannest.com)"
            className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            id="email"
            value={formData.email}
            onChange={handleChange}
            pattern=".*@urbannest\.com$"
            title="Email must be from @urbannest.com domain"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            id="password"
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border p-2 sm:p-3 rounded-lg text-sm sm:text-base"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            minLength="6"
            required
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-2 sm:p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-sm sm:text-base"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-center text-xs sm:text-sm">
            {error}
          </p>
        )}
        <p className="text-center mt-3 text-xs sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/Admin/Sign-in"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
