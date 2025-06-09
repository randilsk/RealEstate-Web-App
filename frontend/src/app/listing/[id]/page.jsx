"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAllListings } from "@/lib/api";
import ListingDetail from "@/components/BuyPageContent/ListingDetail";

export default function ListingDetailsPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchAllListings();
      setAllListings(data);
      const found = data.find((item) => item._id === id);
      setListing(found);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#3b50df] flex justify-center items-start px-1 md:px-0">
      <ListingDetail
        listing={listing}
        allListings={allListings}
        loading={loading}
        showAllPhotos={showAllPhotos}
        setShowAllPhotos={setShowAllPhotos}
      />
    </div>
  );
} 