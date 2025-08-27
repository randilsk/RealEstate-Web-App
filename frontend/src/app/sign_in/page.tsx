"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/Features/user/userSlice";
import OAuth from "../../components/signInComponents/OAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
import slide_image_2 from "../../../public/images/home/home1.jpg";
import slide_image_3 from "../../../public/images/home/home2.jpg";
import slide_image_4 from "../../../public/images/home/home3.jpg";
import slide_image_5 from "../../../public/images/home/home4.jpg";
import slide_image_6 from "../../../public/images/sign_in-images/sign1.png";
import { motion } from "framer-motion";

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
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

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
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message || "Failed to sign in"));
        return;
      }

      dispatch(signInSuccess(data));
      // Fixed: Redirect to home page, not API endpoint
      router.replace("/");
    } catch (err) {
      dispatch(
        signInFailure(err instanceof Error ? err.message : "An error occurred")
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-2 sm:px-4 relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur shadow border border-indigo-100 hover:bg-indigo-100 transition-all duration-200 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-indigo-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </Link>
      </div>

      {/* Left: Welcome Text & Sign In Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-indigo-700 mb-6 sm:mb-8 drop-shadow-lg"
        >
          Welcome to UrbanNest
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg xs:text-xl sm:text-2xl md:text-3xl text-gray-700 mb-6 sm:mb-10"
        >
          Please <span className="font-semibold text-indigo-600">Sign In</span>{" "}
          or <span className="font-semibold text-indigo-600">Sign Up</span> to
          continue.
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto items-center justify-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full text-base sm:text-lg max-w-full"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full text-base sm:text-lg max-w-full"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full text-base sm:text-lg"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div className="w-full">
            <OAuth />
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-4 text-sm sm:text-base"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </motion.p>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-red-500 mt-5 text-center text-sm sm:text-base"
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Right: Animated Image Slider */}
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center py-8 sm:py-10 h-full mt-6 md:mt-0 md:pr-8 lg:pr-16">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={500}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="swiper_container h-full max-w-[90vw] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[900px]"
        >
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_6} alt='slide_image' width={1200} height={800} className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image
              src={signInImage}
              alt="slide_image"
              width={1200}
              height={800}
              className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image
              src={slide_image_2}
              alt="slide_image"
              width={1200}
              height={800}
              className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image
              src={slide_image_3}
              alt="slide_image"
              width={1200}
              height={800}
              className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image
              src={slide_image_4}
              alt="slide_image"
              width={1200}
              height={800}
              className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200"
            />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_5} alt='slide_image' width={1200} height={800} className="object-cover w-full h-[220px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
} 


//for merging with main