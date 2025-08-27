"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function HelpHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0b1220] text-white">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Image
          src="/images/home-image/home-page-image2.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          We’re here to help
        </p>
        <h1 className="text-3xl font-extrabold sm:text-4xl md:text-5xl">
          How can we help you today?
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
          Find answers fast for buying, renting, and listing properties. Explore
          quick start guides, FAQs, and ways to contact support.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="#quick-start"
            className="inline-flex items-center gap-2 rounded-full bg-[#3b50df] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3246c6] transition"
          >
            Get started
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition"
          >
            Contact support
          </Link>
        </div>
      </div>
    </section>
  );
}
