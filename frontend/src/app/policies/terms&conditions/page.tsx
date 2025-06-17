import React from "react";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";
import TermsConditions from "@/components/PolicyComponent/Terms&Conditions";

function page() {
  return (
    <>
      <div className="bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <TermsConditions />
     
      </div>
    </>
  );
}

export default page;
