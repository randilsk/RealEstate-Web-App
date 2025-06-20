"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ThunkDispatch } from "@reduxjs/toolkit"; // For typing Redux dispatch
import { AnyAction } from "redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/Features/user/userSlice";
import OAuth from "../../components/signInComponents/OAuth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import signInImage from '../../../public/images/sign_in-images/signIn_Image.png';
import slide_image_2 from '../../../public/images/home/home1.jpg';
import slide_image_3 from '../../../public/images/home/home2.jpg';
import slide_image_4 from '../../../public/images/home/home3.jpg';
import slide_image_5 from '../../../public/images/home/home4.jpg';
import slide_image_6 from '../../../public/images/sign_in-images/sign1.png';
import { motion } from 'framer-motion';

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
      // Replace router.push with router.replace for a complete navigation
      router.replace("/");
      // Force a hard reload to ensure all state is updated
      window.location.href = "/api/";
    } catch (err) {
      dispatch(
        signInFailure(err instanceof Error ? err.message : "An error occurred")
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      {/* Left: Welcome Text & Sign In Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-indigo-700 mb-8 drop-shadow-lg"
        >
          Welcome to UrbanNest
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl text-gray-700 mb-10"
        >
          Please <span className="font-semibold text-indigo-600">Sign In</span> or <span className="font-semibold text-indigo-600">Sign Up</span> to continue.
        </motion.h2>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md mx-auto items-center justify-center"
        >
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full max-w-[400px]"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full max-w-[400px]"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full max-w-[400px]"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <div className="w-full max-w-[400px]">
            <OAuth />
          </div>
        </motion.form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-4"
        >
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-blue-600 hover:underline font-semibold">Sign Up</Link>
        </motion.p>
        {error && <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-red-500 mt-5 text-center"
        >{error}</motion.p>}
      </div>
      {/* Right: Animated Image Slider */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 h-full mt-10 md:mt-0">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
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
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className='swiper_container h-full'
        >
           <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_6} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={signInImage} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_2} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_3} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_4} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
          <SwiperSlide className="h-full flex items-center justify-center">
            <Image src={slide_image_5} alt='slide_image' width={1200} height={800} className="object-cover w-[1200px] h-[800px] rounded-3xl shadow-lg border border-gray-200" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
