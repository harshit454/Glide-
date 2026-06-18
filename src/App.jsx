// import { useEffect, useState } from "react";
// import './index.css';
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// const route = [
//   { lat: 28.6139, lng: 77.2090 }, 
//   { lat: 28.6155, lng: 77.2150 },
//   { lat: 28.6180, lng: 77.2200 },
//   { lat: 28.6205, lng: 77.2250 },
//   { lat: 28.6230, lng: 77.2300 },
//   { lat: 28.6260, lng: 77.2350 },
// ];

// export default function App() {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   });

//   const [carPosition, setCarPosition] = useState(route[0]);

// useEffect(() => {
//   let currentIndex = 0;

//   const timer = setInterval(() => {
//     currentIndex++;

//     if (currentIndex >= route.length) {
//       clearInterval(timer); 
//       return;
//     }

//     setCarPosition(route[currentIndex]);
//   }, 1000);

//   return () => clearInterval(timer);
// }, []);

//   if (!isLoaded) return <h1>Loading Map...</h1>;

//   return (
//     <>
//     <GoogleMap
//       mapContainerStyle={{
//         width: "50%",
//         height: "50vh",
//       }}
//       center={carPosition}
//       zoom={15}
//     >
//       <Polyline
//         path={route}
//         options={{
//           strokeColor: "#4285F4",
//           strokeWeight: 5,
//         }}
//       />

//       <Marker
//         position={carPosition}
//         icon={{
//           url: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
//         }}
//       />
//     </GoogleMap>
//      <div className="h-screen flex items-center justify-center">wfhbh</div>
//     </>

//   );
// }
import { useEffect, useState } from "react";
import MovingMap from "./components/MovingMap";
import SplashScreen from "./components/SplachScreen/SplashScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return <MovingMap />;
}

export default App;