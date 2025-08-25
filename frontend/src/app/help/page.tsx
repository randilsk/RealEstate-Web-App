import React from "react";
import HelpHero from "@/components/Help/HelpHero";
import HelpQuickStart from "@/components/Help/HelpQuickStart";
import HelpFAQ from "@/components/Help/HelpFAQ";
import HelpContact from "@/components/Help/HelpContact";
import Header from "@/components/Header";
import Bluebar from "@/components/Bluebar";

export const metadata = {
  title: "Help | Real Estate",
  description: "Find answers fast for buying, renting, and listing properties.",
};

export default function HelpPage() {
  return (
    <main className="space-y-8 pb-10">
      <Bluebar />
      <Header />
      <div className="mx-auto max-w-6xl px-6">
        <nav className="mt-2 mb-4 text-sm text-slate-500">
          <a href="/" className="hover:text-slate-700">
            Home
          </a>
          <span className="mx-2">/</span>
          <span className="text-slate-700">Help</span>
        </nav>
        <HelpHero />
      </div>
      <HelpQuickStart />
      <HelpFAQ />
      <HelpContact />
    </main>
  );
}
