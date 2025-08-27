"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAllRentListings } from "@/lib/api"; // You'll need to create this function
import RentDetail from "@/components/RentPageComponent/RentDetails";

export default function RentDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAllRentListings();
      setAllListings(data);
      const found = data.find((item) => item._id === id);
      setListing(found);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#e3e9fd] flex justify-center items-start px-1 md:px-0">
      <RentDetail
        listing={listing}
        allListings={allListings}
        loading={loading}
        showAllPhotos={showAllPhotos}
        setShowAllPhotos={setShowAllPhotos}
      />
    </div>
  );
}