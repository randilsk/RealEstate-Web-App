import React from "react";
import Card from "./Card";

function CardSection() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b">
        <h2 className="font-semibold text-2xl md:text-3xl">Recent Properties</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Card />
        </div>
      </div>
    </div>
  );
}

export default CardSection;
