import Image from "next/image";
import React from "react";

function HomeImage() {
  return (
    <div className="mt-[75px]">
      <Image
        className="w-[833px] h-[571px]"
        src="/images/home-page-image.png"
        alt="img"
      />
    </div>
  );
}

export default HomeImage;
