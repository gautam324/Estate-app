import React, { useState, useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconsShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconsShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const GeocoderMarker = ({ address }) => {
  const map = useMap();
  const [position, setPosition] = useState([60, 19]); // Fallback position
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (address) {
      setLoading(true);
      setError(null); // Reset any previous errors

      const apiKey = process.env.VITE_APP_OPENCAGE_API_KEY; // API key for OpenCage
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`;

      axios
        .get(url)
        .then((response) => {
          const results = response.data.results;
          if (results && results.length > 0) {
            const { lat, lng } = results[0].geometry;
            setPosition([lat, lng]);
            map.flyTo([lat, lng], 13); // Adjust the zoom level here
          } else {
            setError('No results found for the address');
            console.warn('No results found for the address:', address);
          }
        })
        .catch((err) => {
          setError('Geocoding error: ' + err.message);
          console.error('Geocoding error:', err);
        })
        .finally(() => {
          setLoading(false); // Stop loading once done
        });
    }
  }, [address, map]);

  return (
    <>
      {loading && <div className="loading-indicator">Loading...</div>} {/* Optional loading indicator */}
      {error && <div className="error-message">{error}</div>} {/* Display error if any */}
      <Marker position={position} icon={DefaultIcon}>
        <Popup>{address}</Popup> {/* Optionally, you can display the full address in the popup */}
      </Marker>
    </>
  );
};

export default GeocoderMarker;
