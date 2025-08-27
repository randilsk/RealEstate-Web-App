import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PropertyCard = ({ 
  title, 
  description, 
  imageSrc, 
  imageAlt, 
  buttonText, 
  buttonLink 
}) => (
  <article 
    className="w-full max-w-[300px] sm:max-w-sm mx-auto bg-white/70 backdrop-blur-lg rounded-2xl border border-main-blue/20 shadow-[0_4px_12px_0_rgba(0,0,0,0.05),0_12px_40px_0_rgba(59,80,223,0.08)] flex flex-col items-center justify-between p-4 sm:p-7 md:p-9 transition-all duration-500 hover:shadow-[0_8px_24px_0_rgba(0,0,0,0.08),0_24px_64px_0_rgba(59,80,223,0.12)] hover:-translate-y-3 hover:border-main-blue/40 group relative overflow-hidden"
    role="article"
  >
    {/* Animated gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-main-blue/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
    
    {/* Subtle glow effect */}
    <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]" />
    
    <div className="flex flex-col items-center space-y-4 sm:space-y-7 z-10 relative">
      <div className="relative w-[120px] h-[140px] sm:w-[160px] sm:h-[180px] md:w-[180px] md:h-[200px] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_12px_32px_rgba(59,80,223,0.2)]">
        <Image
          src={imageSrc}
          fill
          alt={imageAlt}
          className="object-contain p-2 transition-all duration-500 group-hover:brightness-110"
          priority
        />
        {/* Image glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-main-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-lg" />
      </div>
      <h3 className="text-center text-black text-xl sm:text-2xl md:text-3xl font-extrabold font-poppins tracking-wide group-hover:text-main-blue transition-all duration-300 group-hover:scale-105 drop-shadow-sm">
        {title}
      </h3>
      <p className="text-center text-gray-700 text-sm sm:text-base font-light font-poppins leading-relaxed max-w-[240px] sm:max-w-[280px] group-hover:text-gray-600 transition-colors duration-300">
        {description}
      </p>
    </div>
    <div className="w-full flex justify-center pt-4 sm:pt-7 z-10 relative">
      <Button 
        className="bg-gradient-to-r from-main-blue/90 to-main-blue/70 hover:from-main-blue hover:to-blue-500 text-white font-bold border-none shadow-lg hover:shadow-xl w-[200px] sm:w-52 text-sm sm:text-base py-2 sm:py-2.5 h-10 sm:h-12 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_8px_24px_rgba(59,80,223,0.3)] active:scale-95 rounded-xl backdrop-blur-sm"
        aria-label={`${buttonText} - ${title}`}
      >
        <Link href={buttonLink} className="w-full h-full flex items-center justify-center">
          {buttonText}
        </Link>
      </Button>
    </div>
  </article>
);

function HomeBuySellRent() {
  const propertyCards = [
    {
      title: "Buy a property",
      description: "Whether it's a dream home or the land to build it on, explore with immersive photos and exclusive listings you won't find anywhere else. ",
      imageSrc: "/images/home-image/buy-home.png",
      imageAlt: "Buy a property illustration",
      buttonText: "Explore Properties",
      buttonLink: "/buy"
    },
    {
      title: "Sell a property",
      description: "Whether it's a home, land, or both, we're here to guide you every step of the way toward a successful sale. Let us help you make it happen.",
      imageSrc: "/images/home-image/sell-home.png",
      imageAlt: "Sell a property illustration",
      buttonText: "Sell Today",
      buttonLink: "/sell"
    },
    {
      title: "Rent a property",
      description: "From cozy apartments to spacious homes, find rentals that suit your lifestyle. Start your search here for the place you'll love to call home.",
      imageSrc: "/images/home-image/rent-home.png",
      imageAlt: "Rent a property illustration",
      buttonText: "Find Rentals",
      buttonLink: "/rent"
    }
  ];

  return (
    <section 
      className="bg-main-bg flex flex-col md:flex-row justify-center items-center gap-10 md:gap-8 lg:gap-12 py-14 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20"
      aria-label="Property services"
    >
      {propertyCards.map((card, index) => (
        <PropertyCard key={index} {...card} />
      ))}
    </section>
  );
}

export default HomeBuySellRent;
