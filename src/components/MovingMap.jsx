import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MovingMap() {
  const route = [
    [28.6138, 77.3658],
    [28.6148, 77.3690],
    [28.6160, 77.3725],
    [28.6180, 77.3760],

    [28.6289, 77.3649],


    [28.6400, 77.3200],

    [28.6120, 77.2800],


    [28.6280, 77.2410],
    [28.6420, 77.2330],

    [28.6675, 77.2281],
    [   29.3816, 76.9628,],
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => {
        if (prev >= route.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <MapContainer
      center={route[0]}
      zoom={15}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Polyline positions={route} />

      <Marker position={route[index]} />
    </MapContainer>
  );
}