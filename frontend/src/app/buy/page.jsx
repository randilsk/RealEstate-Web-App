import React from "react";
import Bluebar from "@/components/Bluebar.jsx";
import Header_varient from "../../components/Header_varient.jsx";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSection from "../../components/BuyPageContent/MapSection.jsx";

function page() {
  return (
    <>
      <Bluebar />
      <Header_varient_1 />
      <br />
      <Header_varient />

      <MapSection />
    </>
  );
}

export default page;
