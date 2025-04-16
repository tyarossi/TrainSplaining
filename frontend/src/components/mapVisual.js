import React, { useEffect, useState } from "react";

const MBTALineMap = ({ routeId }) => {
  const [stopCoords, setStopCoords] = useState([]);

  useEffect(() => {
    const fetchStops = async () => {
      try {
        const res = await fetch(`https://api-v3.mbta.com/stops?filter[route]=${routeId}`);
        const data = await res.json();
        const coords = data.data
          .filter(stop => stop.attributes.latitude && stop.attributes.longitude)
          .map(stop => ({
            name: stop.attributes.name,
            lat: stop.attributes.latitude,
            lon: stop.attributes.longitude
          }));
        setStopCoords(coords);
      } catch (err) {
        console.error("Failed to fetch stops", err);
      }
    };

    fetchStops();
  }, [routeId]);

  if (stopCoords.length === 0) return <p>Loading map for {routeId}...</p>;

  // Get center of the map (just first stop for simplicity)
  const { lat, lon } = stopCoords[0];

  // Build Google Maps URL with markers
  const markerString = stopCoords
    .slice(0, 10) // Limit to 10 markers (embed URLs have limits)
    .map(stop => `${stop.lat},${stop.lon}`)
    .join("|");

    const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&z=13&output=embed`;

  return (
    <div>
      <h2>Map of {routeId} Line</h2>
      <iframe
        title="MBTA Line Map"
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      ></iframe>
    </div>
  );
};

export default MBTALineMap;
