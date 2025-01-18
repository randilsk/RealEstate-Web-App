import React from "react";
import Image from "next/image";

function AboutSectionHome() {
  return (
    <>
      <div className="bg-main-bg relative flex flex-col h-screen px-10">
        <div className="pt-32 relative w-3/4 z-10">
          <h1>About Us</h1>
          <p>
            At Urban Nest, we believe that finding your perfect land should be
            simple and enjoyable. Our mission is to connect individual
            landowners and seekers through a user-friendly, map-based platform
            tailored specifically for Sri Lanka. We provide innovative tools and
            features that empower users to discover, list, and manage land
            properties with ease. Whether you&apos;re looking to buy land or
            list your property, our platform is designed to enhance your
            experience, offering reliable information and seamless navigation.
            Join us as we revolutionize the way land is bought and sold in our
            community.
          </p>
        </div>

        <div className="top-[4rem] right-10 absolute">
          <Image
            className="w-[325px] h-[568px] opacity-70"
            src="/images/home-image/about-srilanka.png"
            width={325}
            height={568}
            alt="Placeholder image"
          />
        </div>
      </div>
    </>
  );
}

export default AboutSectionHome;
