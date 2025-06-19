import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import AddRentingAddress from "@/components/RentPageListingComponents/AddRentingAddress";


function page() {
  return (
    <>
      <div className="bg-[url('/images/sell-image/sell-hero-section.png')] bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <AddRentingAddress/>
      </div>
    </>
  );
}

export default page;
