import React from "react";
import Card from "./Card";

function CardSection({ listings, isFiltered, onClearFilter }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-4 py-1.5 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl md:text-xl">
            Recent Properties
          </h2>
          <div className="flex items-center gap-2">
            {isFiltered && (
              <>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  Filtered Results
                </span>
                <button
                  onClick={onClearFilter}
                  className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full hover:bg-red-100 transition-colors"
                >
                  Clear Filter
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-6">
            {listings && listings.length > 0 ? (
              listings.map((listing) => (
                <Card key={listing._id} listing={listing} />
              ))
            ) : (
              <div className="text-center py-16 text-gray-600 font-medium">
                {isFiltered ? (
                  <div className="flex flex-col items-center gap-2">
                    <p>No listings found for the selected district.</p>
                    <button
                      onClick={onClearFilter}
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Show all listings
                    </button>
                  </div>
                ) : (
                  "No listings available at the moment"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSection;
