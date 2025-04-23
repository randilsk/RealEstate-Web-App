import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard() {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <Link href="#">
        <div className="rounded-t-lg">
          <Image
            src="/images/home-image/home-page-image2.png"
            alt="Apple Watch"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </Link>
      <div className="px-5 pb-5">
        <Link href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            CArd componnent
          </h5>
        </Link>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1">
            {Array.from({ length: 4 }).map((_, idx) => (
              <svg
                key={idx}
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 22 20"
              ></svg>
            ))}
            <svg
              className="w-4 h-4 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 22 20"
            ></svg>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            button
          </button>
        </div>
      </div>
    </div>
  );
}
