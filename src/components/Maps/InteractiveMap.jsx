import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper component to handle dynamic panning and zoom of the Leaflet Map container
function MapController({ sourceCoords, destCoords, carCoords }) {
  const map = useMap();

  useEffect(() => {
    if (carCoords) {
      // Smoothly pan camera to track driver car
      map.setView([carCoords.lat, carCoords.lng], map.getZoom() < 14 ? 15 : map.getZoom(), {
        animate: true,
        duration: 0.8,
      });
    } else if (sourceCoords && destCoords) {
      // Fit map bounds to show both pickup and destination pins
      const bounds = L.latLngBounds(
        [sourceCoords.lat, sourceCoords.lng],
        [destCoords.lat, destCoords.lng]
      );
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 16,
        animate: true,
        duration: 1.0,
      });
    } else if (sourceCoords) {
      // Focus on source location
      map.setView([sourceCoords.lat, sourceCoords.lng], 14, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [sourceCoords, destCoords, carCoords, map]);

  return null;
}

// Custom DivIcons for styling that match the soft pastel theme
const createMarkerIcon = (colorHex, pulseColorHex) => {
  return L.divIcon({
    className: "custom-soft-marker",
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <div class="absolute w-8 h-8 rounded-full animate-ping opacity-25" style="background-color: ${pulseColorHex};"></div>
        <div class="relative w-6 h-6 rounded-full shadow-md border-2 border-white flex items-center justify-center" style="background-color: ${colorHex};">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const sourceIcon = createMarkerIcon("#10B981", "#34D399"); // Green Theme
const destIcon = createMarkerIcon("#EF4444", "#F87171"); // Red Theme

// Animated Car Icon using DivIcon with Taxi Emoji
const carIcon = L.divIcon({
  className: "custom-car-marker",
  html: `
    <div class="w-10 h-10 bg-white rounded-full shadow-lg border border-[#E8E3FA] flex items-center justify-center text-xl cursor-pointer hover:scale-110 transition-transform duration-200" style="box-shadow: 0 4px 12px rgba(124,58,237,0.15)">
      🚕
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function InteractiveMap({ sourceCoords, destCoords, route, carCoords }) {
  // Default Map center: New Delhi/Noida area
  const defaultCenter = [28.6139, 77.209];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        zoomControl={false} // Disable default top-left control to place it elsewhere or keep screen clean
        style={{ height: "100%", width: "100%" }}
        className="w-full h-full"
      >
        {/* CartoDB Voyager Light tile layer matches soft theme */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Draw driving route polyline */}
        {route && route.length > 0 && (
          <Polyline
            positions={route.map((coord) => [coord.lat, coord.lng])}
            pathOptions={{
              color: "#7C3AED", // Lavender purple driving line
              weight: 5,
              opacity: 0.75,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        )}

        {/* Source pin */}
        {sourceCoords && (
          <Marker position={[sourceCoords.lat, sourceCoords.lng]} icon={sourceIcon} />
        )}

        {/* Destination pin */}
        {destCoords && (
          <Marker position={[destCoords.lat, destCoords.lng]} icon={destIcon} />
        )}

        {/* Animating car marker */}
        {carCoords && (
          <Marker position={[carCoords.lat, carCoords.lng]} icon={carIcon} />
        )}

        {/* Dynamic map panning controller */}
        <MapController
          sourceCoords={sourceCoords}
          destCoords={destCoords}
          carCoords={carCoords}
        />
      </MapContainer>
    </div>
  );
}
