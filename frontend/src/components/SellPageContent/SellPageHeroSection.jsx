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
    <div>
      <div className="items-center justify-center flex text-center font-bold text-[76px] text-white font-inter h-[80vh] flex-col">
        Every home deserves the <br />
        perfect buyer
        <div className="flex justify-center items-center mb-10">
          <Button
            className="bg-transparent border-white text-white hover:bg-main-bg hover:text-black w-52 font-bold border-2"
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
