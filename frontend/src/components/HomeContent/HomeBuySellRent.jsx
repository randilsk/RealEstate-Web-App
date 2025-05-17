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
    className="w-full max-w-[280px] sm:max-w-sm mx-auto bg-white rounded-xl sm:rounded-2xl md:rounded-[38px] shadow-lg flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 hover:border-2 hover:border-main-blue hover:bg-main-bg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    role="article"
  >
    <div className="flex flex-col items-center space-y-3 sm:space-y-6">
      <div className="relative w-[120px] h-[140px] sm:w-[160px] sm:h-[180px] md:w-[180px] md:h-[200px] transition-transform duration-300 hover:scale-105">
        <Image
          src={imageSrc}
          fill
          alt={imageAlt}
          className="object-contain p-2"
          priority
        />
      </div>
      <h3 className="text-center text-black text-lg sm:text-xl md:text-2xl font-bold font-poppins">
        {title}
      </h3>
      <p className="text-center text-gray-600 text-xs sm:text-sm font-light font-poppins leading-relaxed max-w-[240px] sm:max-w-[280px]">
        {description}
      </p>
    </div>
    <div className="w-full flex justify-center pt-3 sm:pt-6">
      <Button 
        className="bg-white border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-[200px] sm:w-52 font-bold border-2 transition-all duration-300 hover:shadow-md text-xs sm:text-base py-1.5 sm:py-2 h-8 sm:h-10"
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
      className="bg-main-bg flex flex-col md:flex-row justify-center items-center gap-8 md:gap-6 lg:gap-8 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12"
      aria-label="Property services"
    >
      {propertyCards.map((card, index) => (
        <PropertyCard key={index} {...card} />
      ))}
    </section>
  );
}

export default HomeBuySellRent;
