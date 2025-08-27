"use client";

import React from "react";
import Link from "next/link";

const Card: React.FC<{
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}> = ({ title, description, href, icon }) => {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef1ff] text-[#3b50df]">
          {icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
          <p className="mt-3 text-sm font-medium text-[#3b50df]">
            Learn more →
          </p>
        </div>
      </div>
    </Link>
  );
};

export default function HelpQuickStart() {
  return (
    <section id="quick-start" className="mx-auto max-w-6xl px-6 pt-4 pb-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Quick start</h2>
          <p className="mt-1 text-sm text-slate-600">
            Choose a role to get tailored guidance.
          </p>
        </div>
        <Link
          href="#faq"
          className="hidden text-sm font-medium text-[#3b50df] hover:text-[#3246c6] sm:block"
        >
          Jump to FAQs →
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card
          title="Buyers"
          description="Search, filter, view details, save homes, and contact sellers."
          href="/buy"
          icon={<span className="text-lg">🏠</span>}
        />
        <Card
          title="Renters"
          description="Browse rentals, schedule viewings, and apply to rent."
          href="/rent"
          icon={<span className="text-lg">🔑</span>}
        />
        <Card
          title="Sellers & Landlords"
          description="Create a listing, add photos, set price, and manage inquiries."
          href="/sell"
          icon={<span className="text-lg">📤</span>}
        />
      </div>
    </section>
  );
}
