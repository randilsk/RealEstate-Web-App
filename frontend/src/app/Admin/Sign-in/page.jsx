"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  adminsignInStart,
  adminsignInSuccess,
  adminsignInFailure,
} from "../../../redux/Features/user/adminSlice";

export default function AdminSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.admin);
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
    try {
      dispatch(adminsignInStart());
      const res = await fetch("http://localhost:3000/api/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(adminsignInFailure(data.message || "Only @urbannest.com email addresses are allowed for admin access"));
        return;
      }

      dispatch(adminsignInSuccess(data.admin));
      router.replace("/Admin/");
    } catch (err) {
      dispatch(
        adminsignInFailure(err instanceof Error ? err.message : "An error occurred")
      );
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(/images/sign_in-images/signIn_Image.png)`,
      }}
    >
      <div
        className="w-[425px] h-[530px] rounded-[48px] p-5 max-w-lg mx-auto shadow-lg border"
        style={{ backgroundColor: "#d9d9d9", borderTopWidth: "4px" }}
      >
        <h1 className="text-3xl text-center font-semibold my-5">
          Welcome to UrbanNest Admin
        </h1>
        <h2 className="text-xl font-semibold my-4 text-center">Admin Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Admin Email"
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
        </form>
      
        <p className="text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/Admin/Sign-up" className="text-blue-600 hover:underline font-semibold">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
