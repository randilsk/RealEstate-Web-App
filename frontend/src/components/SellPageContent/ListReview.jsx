"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

function ListReview() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#d9d9d9] rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Main Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black"
              >
                We're reviewing your listing!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-black text-base sm:text-lg max-w-2xl mx-auto"
              >
                Hang tight — we're just making sure everything looks good.
              </motion.p>
            </div>

            {/* Illustration */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center py-4"
            >
              <svg
                className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 text-main-blue"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>

            {/* Review Time */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <p className="text-black text-sm sm:text-base font-medium">
                This process typically takes 24–48 hours.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto px-8 py-3 bg-main-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm"
              >
                Go to Dashboard
              </button>
              <a
                href="#"
                className="w-full sm:w-auto px-8 py-3 text-main-blue border-2 border-main-blue rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center shadow-sm"
              >
                Contact Support
              </a>
            </motion.div>

           
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ListReview;
