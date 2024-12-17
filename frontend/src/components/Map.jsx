import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import GeocoderMarker from './GeocoderMarker';  // Make sure this component handles the address properly

const Map = ({ address, city, country }) => {
  // Log the props to check if they are correct
  console.log({ address, city, country });

  // Handle case when address, city, or country are missing
  const fullAddress = `${country} ${city} ${address}`.trim();

  // If the address is not valid, you might want to set a fallback address
  if (!fullAddress) {
    return <div>Invalid address information</div>;
  }

  return (
    <MapContainer
      center={[53.35, 18.8]} // You can dynamically change this center based on the location
      zoom={10}  // Adjust zoom level to a more suitable value for most addresses
      scrollWheelZoom={false}
      className="h-[24rem] w-full mt-5 z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeocoderMarker 
        address={fullAddress} // Pass the full address as a prop to the marker
      />
    </MapContainer>
  );
};

export default Map;
