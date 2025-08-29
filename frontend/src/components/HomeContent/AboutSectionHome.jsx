import React from "react";
import Image from "next/image";
import Link from "next/link";

function AboutSectionHome() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Help", href: "/help" },
    { label: "About Us", href: "/AboutUs" },
    { label: "Cookies", href: "/cookies" },
    { label: "Mobile App", href: "/mobile-app" },
    { label: "Advertise", href: "/advertise" },
    { label: "Privacy Policy", href: "/policies/privacy_policy" },
    { label: "Return Policy", href: "/policies/return_policy" },
    { label: "Terms & Conditions", href: "/policies/terms&conditions" },
    { label: "Contact Us", href: "/contact" }
  ];

  return (
    <div className="bg-main-bg relative min-h-screen flex flex-col px-4 sm:px-6 md:px-12 lg:px-16">
      {/* Background Image for Mobile */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="/images/home-image/about-srilanka.png"
          alt="Sri Lanka Map"
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      {/* Desktop Image */}
      <div className="hidden md:block absolute top-[4rem] right-10 z-0">
        <Image
          className="w-[325px] h-[568px] opacity-70"
          src="/images/home-image/about-srilanka.png"
          width={325}
          height={568}
          alt="Sri Lanka Map"
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10 pt-12 md:pt-24 w-full md:w-3/4">
        <h1 className="font-bold text-2xl sm:text-3xl pb-4 md:pb-5 font-poppins transition-all duration-300 hover:text-main-blue hover:scale-105 drop-shadow-sm">About Us</h1>
        <div className="text-sm sm:text-base leading-relaxed">
          <p className="transition-all duration-300 hover:text-gray-700 p-4 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-sm">
            At <strong className="text-main-blue font-semibold">Urban Nest</strong>, we believe that finding your dream
            piece of land should be <em className="text-main-blue font-medium">simple, enjoyable,</em> and even
            exciting. Our mission is to connect landowners and seekers through
            a powerful, interactive map-based platform designed exclusively
            for Sri Lanka. Whether you&apos;re exploring the serene countryside or
            prime city plots, we make the journey effortless. With
            cutting-edge tools and intelligent features, you can discover,
            list, and manage land properties with just a few clicks.
          </p>
          <br />
          <p className="transition-all duration-300 hover:text-gray-700 p-4 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm hover:shadow-sm">
            Whether you&apos;re a buyer hunting for your ideal location or a seller
            ready to showcase your property, <strong className="text-main-blue font-semibold">Urban Nest</strong> is
            your trusted partner. Our platform delivers{" "}
            <em className="text-main-blue font-medium">
              reliable listings, intuitive navigation, and a seamless user
              experience
            </em>{" "}
            that saves time and adds value. Step into the future of real
            estate — join us in transforming how land is bought and sold in
            Sri Lanka.
          </p>
        </div>

        <div className="py-6 md:py-10">
          <hr className="border-main-blue opacity-50 transition-all duration-300 hover:opacity-80 hover:shadow-sm" />
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center">
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:justify-between items-center gap-4 md:gap-0">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-black text-sm sm:text-base font-normal font-poppins leading-snug hover:underline hover:text-main-blue transition-all duration-300 hover:scale-105 hover:font-medium p-2 rounded-lg hover:bg-white/20 hover:backdrop-blur-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Trademark Text */}
          <div className="px-2 sm:px-5 pt-5 text-center text-black text-sm sm:text-base font-poppins opacity-80 transition-all duration-300 hover:opacity-100 p-4 rounded-lg hover:bg-white/20 hover:backdrop-blur-sm">
            The terms <span className="font-semibold text-main-blue">Urban Nest</span> and the associated logos are trademarks owned
            by Urban Nest. They identify real estate professionals who are
            members of our platform. All listings are provided by registered
            users and reflect the quality of services offered by our
            community. Used under license.
          </div>

          {/* App Store Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-5 items-center">
            <Link href="/mobile-app" className="group">
              <Image
                className="w-[100px] sm:w-[120px] h-[30px] sm:h-[35px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-lg"
                src="/images/home-image/googleplay.png"
                width={325}
                height={568}
                alt="Google Play Store"
              />
            </Link>
            <Link href="/mobile-app" className="group">
              <Image
                className="w-[100px] sm:w-[120px] h-[30px] sm:h-[35px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-lg"
                src="/images/home-image/appstore.png"
                width={325}
                height={568}
                alt="App Store"
              />
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-5 items-center">
            <div className="text-black text-lg sm:text-xl font-semibold font-poppins transition-all duration-300 hover:text-main-blue hover:scale-105 cursor-default">
              Urban Nest
            </div>
            <p className="text-sm sm:text-base transition-all duration-300 hover:text-main-blue">Follow us on: </p>
            <div className="flex gap-3 sm:gap-5">
              <Link href="https://www.facebook.com/UrbanNestLK" target="_blank" className="group">
                <Image
                  className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-lg p-1 rounded-lg group-hover:bg-white/20 group-hover:backdrop-blur-sm"
                  src="/images/home-image/facebook-icon.svg"
                  width={30}
                  height={30}
                  alt="Facebook"
                />
              </Link>
              <Link href="https://www.instagram.com/UrbanNestLK" target="_blank" className="group">
                <Image
                  className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-lg p-1 rounded-lg group-hover:bg-white/20 group-hover:backdrop-blur-sm"
                  src="/images/home-image/insta-icon.png"
                  width={30}
                  height={30}
                  alt="Instagram"
                />
              </Link>
              <Link href="https://twitter.com/UrbanNestLK" target="_blank" className="group">
                <Image
                  className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-lg p-1 rounded-lg group-hover:bg-white/20 group-hover:backdrop-blur-sm"
                  src="/images/home-image/x-icon.svg"
                  width={30}
                  height={30}
                  alt="Twitter"
                />
              </Link>
              <Link href="https://www.linkedin.com/company/urban-nest-lk" target="_blank" className="group">
                <Image
                  className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] opacity-70 transition-all duration-300 group-hover:opacity-100 group-hover:scale-125 group-hover:drop-shadow-lg p-1 rounded-lg group-hover:bg-white/20 group-hover:backdrop-blur-sm"
                  src="/images/home-image/linkedin-icon.svg"
                  width={30}
                  height={30}
                  alt="LinkedIn"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-center text-black font-poppins opacity-50 pt-5 pb-8 transition-all duration-300 hover:opacity-80 hover:scale-105">
          © 2025 <span className="font-semibold">Urban Nest</span>. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default AboutSectionHome;
