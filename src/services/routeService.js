export const getRoute = async (start, end) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
  );

  const data = await res.json();

  if (!data.routes || !data.routes.length) {
    throw new Error("No route found");
  }

  const route = data.routes[0];
  const coordinates = route.geometry.coordinates.map(([lng, lat]) => ({
    lat,
    lng,
  }));

  return {
    coordinates,
    distance: route.distance, // in meters
    duration: route.duration, // in seconds
  };
};