import React from "react";
import Image from "next/image";

function MapSection() {
  return (
    <>
      <div className="pt-10">
        <div>
          <Image
            className="w-[850px] h-[513px]"
            src="/images/buy-image/map-image.png"
            width={720}
            height={650}
            alt="Placeholder image"
          />
        </div>
      </div>
    </>
  );
}

export default MapSection;
