export default function SearchBox({
  source,
  destination,
  setSource,
  setDestination,
  onSearch,
}) {
  return (
    <div>
      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <button onClick={onSearch}>
        Search Route
      </button>
    </div>
  );
}