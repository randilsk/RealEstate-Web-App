"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OAuth from "../../components/signInComponents/OAuth";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import signInImage from '../../../public/images/sign_in-images/signIn_Image.png';
import slide_image_2 from '../../../public/images/home/home1.jpg';
import slide_image_3 from '../../../public/images/home/home2.jpg';
import slide_image_4 from '../../../public/images/home/home3.jpg';
import slide_image_5 from '../../../public/images/home/home4.jpg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent page from reloading after submit
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      {/* Left: Welcome Text & Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center py-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-indigo-700 mb-8 drop-shadow-lg"
        >
          Welcome To UrbanNestEstate
        </motion.h1>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-md mx-auto items-center justify-center"
        >
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg w-full max-w-[400px]"
            id="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            className="border p-3 rounded-lg w-full max-w-[400px]"
            id="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="password"
            className="border p-3 rounded-lg w-full max-w-[400px]"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full max-w-[400px]"
          >
            {loading ? "loading..." : "Sign Up"}
          </button>
          <div className="w-full max-w-[400px]">
            <OAuth />
          </div>
        </motion.form>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 mt-5 justify-center"
        >
          <p>Have an account?</p>
          <Link href="/sign_in">
            <span className="text-blue-700">Sign in</span>
          </Link>
        </motion.div>
        {error && <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-red-500 mt-5"
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
