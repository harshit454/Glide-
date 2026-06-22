import { useState } from "react";
import InteractiveMap from "../components/Maps/InteractiveMap";
import RideBookingSidebar from "../components/RideBookingSidebar";
import { getRoute } from "../services/routeService";

export default function Dashboard({
  user,
  onLogout,
  cabTiers,
  activeTrip,
  onBookTrip,
  onCancelTrip,
}) {
  // Local UI routing state: 'search' | 'selection'
  // When activeTrip is set, we bypass this and use activeTrip.status ('booking' | 'enroute' | 'completed')
  const [localState, setLocalState] = useState("search");

  // Coordinate states
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [sourceName, setSourceName] = useState("");
  const [destName, setDestName] = useState("");
  const [route, setRoute] = useState(null);

  // Route statistics
  const [routeDistance, setRouteDistance] = useState(0); // in meters
  const [routeDuration, setRouteDuration] = useState(0); // in seconds

  // Handle route geocoding and OSRM calculation
  const handleSearchRoute = async (coords, type) => {
    if (type === "source") {
      setSourceCoords(coords);
      setRoute(null);
      setLocalState("search");
      return true;
    }
    
    if (type === "destination") {
      setDestCoords(coords);
      setRoute(null);
      setLocalState("search");
      return true;
    }

    if (type === "calculate") {
      if (!sourceCoords || !destCoords) return false;

      try {
        const routeData = await getRoute(sourceCoords, destCoords);
        if (routeData && routeData.coordinates.length > 0) {
          setRoute(routeData.coordinates);
          setRouteDistance(routeData.distance);
          setRouteDuration(routeData.duration);
          
          // Try to reverse geocode coordinate names for display
          try {
            const getLocName = async (c) => {
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${c.lat}&lon=${c.lng}`);
              const data = await res.json();
              return data.name || data.display_name.split(",")[0] || "Marker Position";
            };
            const sName = await getLocName(sourceCoords);
            const dName = await getLocName(destCoords);
            setSourceName(sName);
            setDestName(dName);
          } catch {
            setSourceName("Pickup Location");
            setDestName("Destination");
          }

          setLocalState("selection");
          return true;
        }
      } catch (err) {
        console.error("Routing calculation failed", err);
        return false;
      }
    }
    return false;
  };

  // Handle book callback from sidebar
  const handleBookSelectedCab = (selectedTier) => {
    onBookTrip({
      sourceCoords,
      destCoords,
      sourceName,
      destName,
      route,
      distance: routeDistance,
      duration: routeDuration,
      selectedTier,
    });
  };

  // Reset booking state back to search
  const handleCancelTrip = () => {
    onCancelTrip();
    setRoute(null);
    setLocalState("search");
  };

  // Determine active display state
  const activeTripState = activeTrip ? activeTrip.status : localState;

  // Track simulating car coords
  const carCoords = activeTrip && activeTrip.route && activeTrip.route.length > 0
    ? activeTrip.route[activeTrip.simulationIndex]
    : null;

  return (
    <div className="w-full h-full flex flex-col md:flex-row overflow-hidden bg-[#F8F9FA]">
      
      {/* Sidebar Controls Area */}
      <div className="w-full md:w-[420px] shrink-0 h-[48vh] md:h-full flex flex-col border-b md:border-b-0 border-[#EDF2F7] relative z-10 shadow-lg md:shadow-none">
        <RideBookingSidebar
          user={user}
          onLogout={onLogout}
          onSearchRoute={handleSearchRoute}
          routeDistance={activeTrip ? activeTrip.distance : routeDistance}
          routeDuration={activeTrip ? activeTrip.duration : routeDuration}
          tripState={activeTripState}
          setTripState={(state) => {
            // If the sidebar wants to set state to booking, we request matching
            if (state === "booking") {
              // Handled by handleBookSelectedCab directly
            }
          }}
          onCancelTrip={handleCancelTrip}
          simulationIndex={activeTrip ? activeTrip.simulationIndex : 0}
          routeCoordsCount={activeTrip && activeTrip.route ? activeTrip.route.length : (route ? route.length : 0)}
          cabTiers={cabTiers} // Send custom rates down to sidebar!
          onBookTrip={handleBookSelectedCab}
        />
      </div>

      {/* Full Map Container Viewport */}
      <div className="flex-1 h-[52vh] md:h-full relative z-0">
        <InteractiveMap
          sourceCoords={activeTrip ? activeTrip.sourceCoords : sourceCoords}
          destCoords={activeTrip ? activeTrip.destCoords : destCoords}
          route={activeTrip ? activeTrip.route : route}
          carCoords={carCoords}
        />
      </div>

    </div>
  );
}
