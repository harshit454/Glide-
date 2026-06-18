import { useEffect, useState } from "react";
import { AuthContainer } from "./components/loginSignUp/auth-container";
import './index.css';
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";

const route = [
  { lat: 28.6139, lng: 77.2090 }, 
  { lat: 28.6155, lng: 77.2150 },
  { lat: 28.6180, lng: 77.2200 },
  { lat: 28.6205, lng: 77.2250 },
  { lat: 28.6230, lng: 77.2300 },
  { lat: 28.6260, lng: 77.2350 },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [carPosition, setCarPosition] = useState(route[0]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    // Only run the map car animation if the user has successfully logged in
    if (!isAuthenticated) return;

    let currentIndex = 0;
    const timer = setInterval(() => {
      currentIndex++;

      if (currentIndex >= route.length) {
        clearInterval(timer); 
        return;
      }

      setCarPosition(route[currentIndex]);
    }, 1000);

    return () => clearInterval(timer);
  }, [isAuthenticated]);

  // Step 1: If user is not authenticated, show the Login / Signup screen
  if (!isAuthenticated) {
    return <AuthContainer onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  // Step 2: Once authenticated, load the tracking map dashboard
  if (!isLoaded) return <h1 className="p-8 text-xl font-bold">Loading Map...</h1>;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Glide Live Tracking Dashboard</h1>
        
        <div className="w-full rounded-2xl overflow-hidden border border-slate-200">
          <GoogleMap
            mapContainerStyle={{
              width: "100%",
              height: "60vh",
            }}
            center={carPosition}
            zoom={15}
          >
            <Polyline
              path={route}
              options={{
                strokeColor: "#2563eb",
                strokeWeight: 5,
              }}
            />

            <Marker
              position={carPosition}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}