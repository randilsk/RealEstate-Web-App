"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({ latitude = 0, longitude = 0 }) {
  // If latitude or longitude is undefined, use default values (0, 0)
  if (latitude === undefined || longitude === undefined) {
    return <div>Loading...</div>; // Fallback UI if coordinates are not yet available
  }

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]}>
        <Popup>A marker</Popup>
      </Marker>
    </MapContainer>
  );
}
