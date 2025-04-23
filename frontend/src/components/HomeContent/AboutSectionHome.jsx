import React from "react";
import Image from "next/image";
import Link from "next/link";

function AboutSectionHome() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Help", href: "/help" },
    { label: "About Us", href: "/about" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookies", href: "/cookies" },
    { label: "Mobile App", href: "/mobile-app" },
    { label: "Advertise", href: "/advertise" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <div className="bg-main-bg relative flex flex-col h-screen  px-16">
        <div className="pt-24 relative w-3/4 z-10 ">
          <h1 className="font-bold text-3xl pb-5 font-poppins">About Us</h1>
          <div className="text-base">
            <p>
              At <strong>Urban Nest</strong>, we believe that finding your dream
              piece of land should be <em>simple, enjoyable,</em> and even
              exciting. Our mission is to connect landowners and seekers through
              a powerful, interactive map-based platform designed exclusively
              for Sri Lanka. Whether you're exploring the serene countryside or
              prime city plots, we make the journey effortless. With
              cutting-edge tools and intelligent features, you can discover,
              list, and manage land properties with just a few clicks.
            </p>
            <br />
            <p>
              Whether you're a buyer hunting for your ideal location or a seller
              ready to showcase your property, <strong>Urban Nest</strong> is
              your trusted partner. Our platform delivers{" "}
              <em>
                reliable listings, intuitive navigation, and a seamless user
                experience
              </em>{" "}
              that saves time and adds value. Step into the future of real
              estate — join us in transforming how land is bought and sold in
              Sri Lanka.
            </p>
          </div>

          <div className="py-10">
            <hr className="border-main-blue opacity-50" />
          </div>
          <div className="  flex flex-col items-center ">
            <div className="w-full flex  justify-between items-center">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-black text-base font-normal font-poppins leading-snug hover:underline hover:text-blue-600 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-5 pt-5 text-center justify-center text-black font-poppins opacity-80">
              The terms Urban Nest and the associated logos are trademarks owned
              by Urban Nest. They identify real estate professionals who are
              members of our platform. All listings are provided by registered
              users and reflect the quality of services offered by our
              community. Used under license.
            </div>
            <div className="flex gap-5 pt-5 items-center">
              <Link href="/mobile-app">
                <Image
                  className="w-[120px] h-[35px] opacity-70"
                  src="/images/home-image/googleplay.png"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>
              <Link href="/mobile-app">
                <Image
                  className="w-[120px] h-[35px] opacity-70"
                  src="/images/home-image/appstore.png"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>
            </div>
            <div className="flex gap-5 pt-5 items-center">
              <div className="justify-start text-black text-xl font-semibold font-poppins">
                Urban Nest
              </div>
              <p>Follow us on: </p>
              <Link href="https://www.facebook.com/UrbanNestLK" target="_blank">
                <Image
                  className="w-[30px] h-[30px] opacity-70"
                  src="/images/home-image/facebook-icon.svg"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>
              <Link
                href="https://www.instagram.com/UrbanNestLK"
                target="_blank"
              >
                <Image
                  className="w-[30px] h-[30px] opacity-70"
                  src="/images/home-image/insta-icon.png"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>
              <Link href={"https://twitter.com/UrbanNestLK"} target="_blank">
                <Image
                  className="w-[30px] h-[30px] opacity-70"
                  src="/images/home-image/x-icon.svg"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>

              <Link
                href="https://www.linkedin.com/company/urban-nest-lk"
                target="_blank"
              >
                <Image
                  className="w-[30px] h-[30px] opacity-70"
                  src="/images/home-image/linkedin-icon.svg"
                  width={325}
                  height={568}
                  alt="Placeholder image"
                />
              </Link>
            </div>
          </div>
          <p className="text-sm text-center text-black font-poppins opacity-50 pt-5 ">
            © 2025 Urban Nest. All rights reserve
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
