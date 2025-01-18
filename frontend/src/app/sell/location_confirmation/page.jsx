import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import LocationConfirmation from "@/components/SellPageContent/LocationConfirmation";

function page() {
  return (
    <>
      <div className="bg-[url('/images/sell-image/sell-hero-section.png')] bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <LocationConfirmation />
      </div>
    </>
  );
}

export default page;
