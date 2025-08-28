import React from "react";

export default function AboutMission() {
  return (
    <section className="bg-slate-50 py-16 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="group">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 relative">
              Our Mission
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-20 transition-all duration-500 ease-out"></div>
            </h2>
            <div className="prose prose-lg text-slate-600 space-y-4">
              <p className="transform group-hover:translate-x-2 transition-all duration-300 ease-out">
                At <strong>Urban Nest</strong>, we believe that finding your dream piece of land should be{" "}
                <em><strong>simple, enjoyable,</strong></em> and even exciting. Our mission is to connect 
                landowners and seekers through a powerful, interactive map-based platform designed 
                exclusively for Sri Lanka.
              </p>
              <p className="transform group-hover:translate-x-2 transition-all duration-300 ease-out delay-75">
                Whether you're exploring the serene countryside or prime city plots, we make the 
                journey effortless. With cutting-edge tools and intelligent features, you can 
                discover, list, and manage land properties with just a few clicks.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white transform group-hover:scale-105 transition-all duration-300 ease-out shadow-lg group-hover:shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 transform group-hover:translate-x-1 transition-all duration-300 ease-out">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium group-hover:text-blue-100 transition-colors duration-300">Map-based Discovery</span>
                  <div className="w-0 h-px bg-white bg-opacity-50 group-hover:w-4 transition-all duration-500 ease-out ml-auto"></div>
                </div>
                <div className="flex items-center space-x-3 transform group-hover:translate-x-1 transition-all duration-300 ease-out delay-75">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium group-hover:text-blue-100 transition-colors duration-300">Sri Lanka Focused</span>
                  <div className="w-0 h-px bg-white bg-opacity-50 group-hover:w-4 transition-all duration-500 ease-out ml-auto delay-75"></div>
                </div>
                <div className="flex items-center space-x-3 transform group-hover:translate-x-1 transition-all duration-300 ease-out delay-150">
                  <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center group-hover:bg-opacity-30 group-hover:scale-110 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="font-medium group-hover:text-blue-100 transition-colors duration-300">Seamless Experience</span>
                  <div className="w-0 h-px bg-white bg-opacity-50 group-hover:w-4 transition-all duration-500 ease-out ml-auto delay-150"></div>
                </div>
              </div>
              
              {/* Floating elements for extra visual appeal */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-white bg-opacity-20 rounded-full group-hover:scale-150 group-hover:bg-opacity-40 transition-all duration-500"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white bg-opacity-20 rounded-full group-hover:scale-125 group-hover:bg-opacity-30 transition-all duration-700"></div>
              <div className="absolute top-1/2 right-8 w-1 h-1 bg-white bg-opacity-20 rounded-full group-hover:scale-200 group-hover:bg-opacity-50 transition-all duration-400"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}