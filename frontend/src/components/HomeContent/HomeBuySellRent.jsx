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
    className="w-full max-w-[300px] sm:max-w-sm mx-auto bg-white/60 backdrop-blur-md rounded-2xl border border-main-blue/30 shadow-[0_2px_8px_0_rgba(0,0,0,0.08),0_8px_32px_0_rgba(0,123,255,0.10)] flex flex-col items-center justify-between p-4 sm:p-7 md:p-9 transition-all duration-300 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.10),0_16px_48px_0_rgba(0,123,255,0.18)] hover:-translate-y-2 hover:border-main-blue/70 group relative overflow-hidden"
    role="article"
  >
    {/* Gradient border accent */}
    <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-main-blue/60 transition-all duration-300 z-0" />
    <div className="flex flex-col items-center space-y-4 sm:space-y-7 z-10 relative">
      <div className="relative w-[120px] h-[140px] sm:w-[160px] sm:h-[180px] md:w-[180px] md:h-[200px] transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_8px_24px_rgba(0,123,255,0.15)]">
        <Image
          src={imageSrc}
          fill
          alt={imageAlt}
          className="object-contain p-2"
          priority
        />
      </div>
      <h3 className="text-center text-black text-xl sm:text-2xl md:text-3xl font-extrabold font-poppins tracking-wide group-hover:text-main-blue transition-colors duration-300">
        {title}
      </h3>
      <p className="text-center text-gray-700 text-sm sm:text-base font-light font-poppins leading-relaxed max-w-[240px] sm:max-w-[280px]">
        {description}
      </p>
    </div>
    <div className="w-full flex justify-center pt-4 sm:pt-7 z-10 relative">
      <Button 
        className="bg-gradient-to-r from-main-blue/90 to-main-blue/60 text-white font-bold border-none shadow-md hover:from-main-blue hover:to-blue-400 w-[200px] sm:w-52 text-sm sm:text-base py-2 sm:py-2.5 h-10 sm:h-12 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
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
