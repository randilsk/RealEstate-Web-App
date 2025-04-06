import React from "react";
import Card from "./Card"; // Corrected import path

function CardSection() {
  return (
    <div className="w-1/2 h-screen mt-10 px-5">
      <h2>Real states and homes for sale</h2>
      <div className=" flex">
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default CardSection;
