import React from "react";
import Card from "./Card"; // Corrected import path



function CardSection() {
  return (
    <div className="w-1/2 h-screen mt-5 px-5">
      <h2 className="font-semibold py-2 text-3xl pl-5">Recent Properties</h2>
      <div className=" flex">
        <Card />
      </div>
    </div>
  );
}

export default CardSection;
