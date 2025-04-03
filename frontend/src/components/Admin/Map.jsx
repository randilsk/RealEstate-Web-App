"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ listings }) {
  return (
    <MapContainer center={[-33.8688, 151.2093]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {listings.map((listing) => (
        <Marker key={listing.id} position={[listing.latitude, listing.longitude]}>
          <Popup>{listing.title} - {listing.location}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
