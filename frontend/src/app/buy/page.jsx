import React from "react";
import Bluebar from "@/components/Bluebar.jsx";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSection from "../../components/BuyPageContent/MapSection.jsx";
import CardSection from "../../components/BuyPageContent/CardSection.jsx";

function page() {
  return (
    <>
      <div className="h-screen w-screen ">
        <Bluebar />
        <Header_varient_1 />
        <div className="flex h-screen">
          <MapSection />
          <CardSection />
        </div>
      </div>
    </>
  );
}

export default page;
