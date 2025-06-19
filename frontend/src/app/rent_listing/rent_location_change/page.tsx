"use client";
import React from "react";
import Bluebar from "@/components/Bluebar";
import Header from "@/components/Header";
import RentLocationChange from "@/components/RentPageListingComponents/RentLocationChange";

const Page: React.FC = () => {
  return (
    <div className="bg-[url('/images/rent-listing-image/rent-bg-2.jpg')] bg-cover bg-center min-h-screen">
      <Bluebar />
      <Header />
      <RentLocationChange />
    </div>
  );
};

export default Page;
