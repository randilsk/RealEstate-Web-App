import React from "react";
import Card from "./Card";

function CardSection({ listings }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-4 py-1.5 border-b">
        <h2 className="font-semibold text-xl md:text-xl">Recent Properties</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-6">
            {listings && listings.length > 0 ? (
              listings.map((listing) => <Card key={listing._id} listing={listing} />)
            ) : (
              <div className="text-center py-16 text-gray-600 font-medium">
                No listings available at the moment
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
