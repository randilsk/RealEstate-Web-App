import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import PrivacyPolicy from "@/components/PolicyComponent/PrivacyPolicy";

function page() {
  return (
    <>
      <div className="bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <PrivacyPolicy />
      </div>
    </>
  );
}

export default page;
