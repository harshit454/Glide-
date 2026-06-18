export const getRoute = async (start, end) => {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
  );

  const data = await res.json();

  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]) => ({
      lat,
      lng,
    })
  );
};