import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import ReturnPolicy from "@/components/PolicyComponent/ReturnPolicy";

function page() {
  return (
    <>
      <div className="bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <ReturnPolicy />
      </div>
    </>
  );
}

export default page;
