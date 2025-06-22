import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import RentListing from "@/components/RentPageListingComponents/RentListing";

function page() {
  return (
    <>
      <div className="bg-[url('/images/rent-listing-image/rent-bg-2.jpg')] bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <RentListing />
      </div>
    </>
  );
}

export default page;
