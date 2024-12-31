import React from "react";

function TitleText() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block text-left text-[76px] font-extrabold leading-[91.20px] font-poppins";

  return (
    <div className="ml-[135px] mt-[170px]">
      <div className="inline-block text-left">
        {phrases.map((phrase, index) => (
          <span key={index} className={`${commonStyles} ${phrase.color}`}>
            {phrase.text}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TitleText;
