import React from "react";
import AboutHero from "@/components/About/AboutHero";
import AboutMission from "@/components/About/AboutMission";
import AboutFeatures from "@/components/About/AboutFeatures";
import AboutValues from "@/components/About/AboutValues";
import AboutTeam from "@/components/About/AboutTeam";
import AboutCTA from "@/components/About/AboutCTA";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";

export const metadata = {
  title: "About Us | Urban Nest",
  description: "Discover how Urban Nest is transforming land buying and selling in Sri Lanka through innovative map-based technology.",
};

export default function AboutPage() {
  return (
    <main className="space-y-8 pb-10">
      <Bluebar />
      <Header />
      <div className="mx-auto max-w-6xl px-6">
      
        <AboutHero />
      </div>
      <AboutMission />
      <AboutFeatures />
      <AboutValues />
      <AboutTeam />
      <AboutCTA />
    </main>
  );
}