import React from "react";

export default function AboutValues() {
  const values = [
    {
      title: "Simplicity First",
      description: "We believe complex processes should be made simple. Every feature is designed with user-friendliness in mind.",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Sri Lankan Focus",
      description: "Built specifically for Sri Lanka's unique landscape and property market, understanding local needs and regulations.",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Trust & Transparency",
      description: "We foster trust through verified listings, clear communication, and transparent processes for all users.",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Innovation Driven",
      description: "Continuously evolving with cutting-edge technology to provide the most advanced real estate platform.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-slate-600">
            The principles that guide everything we do at Urban Nest
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 h-full shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${value.color} flex items-center justify-center flex-shrink-0`}>
                    <div className="w-6 h-6 bg-white rounded-sm"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}