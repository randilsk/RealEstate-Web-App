import React from "react";

function MapSection() {
  return (
    <>
      <aside className="w-7/12 h-screen bg-gray-100 mt-10">
        {/* Replace this with your real map implementation */}
        <iframe
          src="https://maps.google.com/maps?q=atlanta&t=&z=10&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full"
        ></iframe>
      </aside>
    </>
  );
}

export default MapSection;
