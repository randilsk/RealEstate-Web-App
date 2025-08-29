import React from "react";

export default function AboutHero() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
        About <span className="text-blue-600">Urban Nest</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Transforming how land is bought and sold in Sri Lanka through innovative 
        map-based technology and seamless user experience.
      </p>
      <div className="mt-8 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
      </div>
    </div>
  );
}