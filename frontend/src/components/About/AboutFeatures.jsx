import React from "react";

export default function AboutFeatures() {
  const features = [
    {
      title: "Interactive Map Platform",
      description: "Explore properties with our advanced map-based interface, making location discovery intuitive and visual.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Smart Property Search",
      description: "Find exactly what you're looking for with intelligent filters and location-based recommendations.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Easy Property Listing",
      description: "List your properties effortlessly with our streamlined process and comprehensive management tools.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      title: "Trusted Network",
      description: "Connect with verified landowners and serious buyers through our secure and reliable platform.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Why Choose Urban Nest?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're a buyer hunting for your ideal location or a seller ready to 
            showcase your property, <strong>Urban Nest</strong> is your trusted partner.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
  <div className="bg-blue-200/40 rounded-2xl p-8 backdrop-blur-sm shadow-sm">
    <p className="text-lg text-slate-700 leading-relaxed">
      Our platform delivers <strong>reliable listings, intuitive navigation, and a seamless user experience</strong> that 
      saves time and adds value. Step into the future of real estate — join us in transforming 
      how land is bought and sold in Sri Lanka.
    </p>
  </div>
</div>

      </div>
    </section>
  );
}