"use client";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import DBMainContent from "../../components/Admin/DBMainContent";
import Link from "next/link";
import signInImage from "../../../public/images/sign_in-images/signIn_Image.png";
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
import AdminNavbar from "../Admin/AdminNavbar";

import slide_image_2 from "../../../public/images/home/home1.jpg";
import slide_image_3 from "../../../public/images/home/home2.jpg";
import slide_image_4 from "../../../public/images/home/home3.jpg";
import slide_image_5 from "../../../public/images/home/home4.jpg";

function Dashboard() {
  const { currentUser } = useSelector((state) => state.admin);

  if (!currentUser) {
    return (
      <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4 py-8 md:px-8 md:py-0">
        {/* Left: Welcome Text & Buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-8 md:py-10 order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-indigo-700 mb-6 md:mb-8 drop-shadow-lg"
          >
            Welcome to UrbanNest Admin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-2xl md:text-3xl text-gray-700 mb-6 md:mb-10"
          >
            Please{" "}
            <span className="font-semibold text-indigo-600">Sign In</span> or{" "}
            <span className="font-semibold text-indigo-600">Sign Up</span> to
            access the admin dashboard.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-3 md:gap-4 items-center w-full max-w-xs mx-auto"
          >
            <Link
              href="/Admin/Sign-in"
              className="w-full px-6 py-3 md:px-8 md:py-4 bg-indigo-600 text-white rounded-lg text-lg md:text-xl font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow text-center"
            >
              Sign In
            </Link>
            <Link
              href="/Admin/Sign-up"
              className="w-full px-6 py-3 md:px-8 md:py-4 border-2 border-indigo-600 text-indigo-700 rounded-lg text-lg md:text-xl font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow text-center"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
        {/* Right: Animated Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-10 order-1 md:order-2"
        >
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
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="swiper_container h-[220px] sm:h-[320px] md:h-[400px] lg:h-[500px] w-full max-w-[95vw] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[900px]"
          >
            <SwiperSlide className="h-full flex items-center justify-center">
              <Image
                src={signInImage}
                alt="slide_image"
                width={1200}
                height={800}
                className="object-cover w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-gray-200"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full flex items-center justify-center">
              <Image
                src={slide_image_2}
                alt="slide_image"
                width={1200}
                height={800}
                className="object-cover w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-gray-200"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full flex items-center justify-center">
              <Image
                src={slide_image_3}
                alt="slide_image"
                width={1200}
                height={800}
                className="object-cover w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-gray-200"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full flex items-center justify-center">
              <Image
                src={slide_image_4}
                alt="slide_image"
                width={1200}
                height={800}
                className="object-cover w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-gray-200"
              />
            </SwiperSlide>
            <SwiperSlide className="h-full flex items-center justify-center">
              <Image
                src={slide_image_5}
                alt="slide_image"
                width={1200}
                height={800}
                className="object-cover w-full h-full rounded-2xl md:rounded-3xl shadow-lg border border-gray-200"
              />
            </SwiperSlide>
          </Swiper>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col pb-10">
        <AdminNavbar />
        <div className="flex-1 ml-10 mr-10 pt-10 ">
          <DBMainContent />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
