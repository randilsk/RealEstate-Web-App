import React from "react";
import Header from "../../components/Header.jsx";
import Bluebar from "@/components/Bluebar.jsx";
import SellPageHeroSection from "@/components/SellPageContent/SellPageHeroSection.jsx";

function SellPage() {
  return (
    <>
      <div className="bg-[url('/images/sell-image/sell-hero-section.png')] bg-cover bg-center min-h-screen">
        <Bluebar />
        <Header />
        <SellPageHeroSection />
      </div>
    </>
  );
}

export default SellPage;
