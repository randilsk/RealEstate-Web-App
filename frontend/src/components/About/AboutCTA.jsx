"use client";
import React from "react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Transform Your Real Estate Journey?
        </h2>
        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Join thousands of users who have already discovered the future of land buying 
          and selling in Sri Lanka. Start exploring today.
        </p>
                
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/buy"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors 
duration-300 hover:animate-bounce hover:scale-105 transform hover:shadow-lg"
          >
            Start Exploring Properties
          </Link>
          <Link
            href="/sell"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:animate-bounce hover:scale-105 transform hover:shadow-2xl"
          >
            List Your Property
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-2">100% Free</div>
            <div className="text-blue-100 text-sm">To Get Started</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">24/7 Support</div>
            <div className="text-blue-100 text-sm">Customer Care</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">Verified</div>
            <div className="text-blue-100 text-sm">Property Listings</div>
          </div>
        </div>
      </div>
    </section>
  );
}