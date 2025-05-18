"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Updated import

function SellPageHeroSection() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const router = useRouter();

  console.log("Current User from Redux:", currentUser); // Debugging

  const handlePostAdClick = () => {
    if (currentUser) {
      console.log("✅ User is signed in, redirecting to add_address");
      router.push("/sell/add_address");
    } else {
      console.log("❌ User not signed in, redirecting to SignIn");
      router.push("/sign_in");
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center text-center h-[80vh] px-4 sm:px-6 md:px-8">
        <div className="font-bold font-inter text-3xl sm:text-4xl md:text-5xl lg:text-[76px] text-white">
          Every home deserves the <br className="hidden sm:block" />
          perfect buyer
        </div>
        <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10">
          <Button
            className="bg-transparent border-white text-white hover:bg-main-bg hover:text-black w-full sm:w-52 font-bold border-2 text-sm sm:text-base"
            onClick={handlePostAdClick}
          >
            Post your advertisement
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SellPageHeroSection;
