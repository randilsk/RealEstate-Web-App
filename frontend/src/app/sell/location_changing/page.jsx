import React from "react";
import Bluebar from "@/components/Bluebar";
import Header from "@/components/Header";
import LocationChange from "@/components/SellPageContent/LocationChange";

function page() {
  return (
    <>
      <div className="bg-[url('/images/sell-image/sell-hero-section.png')] bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <LocationChange />
      </div>
    </>
  );
}

export default page;
