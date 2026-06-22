import { useState, useEffect, useRef } from "react";

export default function SearchForm({ onSearchRoute, calculatingRoute, errorMessage, setErrorMessage }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [loadingSource, setLoadingSource] = useState(false);
  const [loadingDest, setLoadingDest] = useState(false);

  const sourceDebounceRef = useRef(null);
  const destDebounceRef = useRef(null);

  const handleSearchAutocomplete = async (val, setSuggestions, setLoading) => {
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&limit=5`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerSourceSearch = (val) => {
    setSource(val);
    if (setErrorMessage) setErrorMessage("");
    if (sourceDebounceRef.current) clearTimeout(sourceDebounceRef.current);
    if (!val) {
      setSourceSuggestions([]);
      return;
    }
    setLoadingSource(true);
    sourceDebounceRef.current = setTimeout(() => {
      handleSearchAutocomplete(val, setSourceSuggestions, setLoadingSource);
    }, 500);
  };

  const triggerDestSearch = (val) => {
    setDestination(val);
    if (setErrorMessage) setErrorMessage("");
    if (destDebounceRef.current) clearTimeout(destDebounceRef.current);
    if (!val) {
      setDestSuggestions([]);
      return;
    }
    setLoadingDest(true);
    destDebounceRef.current = setTimeout(() => {
      handleSearchAutocomplete(val, setDestSuggestions, setLoadingDest);
    }, 500);
  };

  const selectSourcePlace = (place) => {
    setSource(place.display_name);
    setSourceSuggestions([]);
    onSearchRoute({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) }, "source");
  };

  const selectDestPlace = (place) => {
    setDestination(place.display_name);
    setDestSuggestions([]);
    onSearchRoute({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) }, "destination");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!source || !destination) {
      if (setErrorMessage) setErrorMessage("Please select both source and destination addresses.");
      return;
    }
    onSearchRoute(null, "calculate");
  };

  useEffect(() => {
    return () => {
      if (sourceDebounceRef.current) clearTimeout(sourceDebounceRef.current);
      if (destDebounceRef.current) clearTimeout(destDebounceRef.current);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-[#2D3748] tracking-tight">Where are you going?</h2>
        <p className="text-xs text-[#718096]">Enter your pickup location and final destination</p>
      </div>

      {errorMessage && (
        <div className="p-3.5 bg-[#FCE8E6] border border-rose-200 rounded-2xl text-xs font-semibold text-[#E11D48] animate-fade-in">
          {errorMessage}
        </div>
      )}

      <div className="relative space-y-3 bg-[#F8F9FA] p-4 rounded-3xl border border-[#EDF2F7]">
        {/* Connected Line Decorative */}
        <div className="absolute left-7 top-[42px] bottom-[42px] w-0.5 border-l border-dashed border-[#A0AEC0]"></div>

        {/* Source Input */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#10B981]"></div>
          <input
            type="text"
            placeholder="Enter Pickup Location"
            value={source}
            onChange={(e) => triggerSourceSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-8 pr-8 py-3 text-sm text-[#2D3748] placeholder-[#A0AEC0] outline-none focus:border-[#7C3AED] transition-all duration-200"
          />
          {loadingSource && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin"></div>
          )}
          
          {sourceSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#EDF2F7] rounded-2xl shadow-xl z-30 max-h-48 overflow-y-auto divide-y divide-[#EDF2F7] animate-fade-in">
              {sourceSuggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => selectSourcePlace(place)}
                  className="px-4 py-2.5 hover:bg-[#F8F9FA] text-xs text-[#718096] cursor-pointer transition-colors line-clamp-2"
                >
                  📍 {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination Input */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#EF4444]"></div>
          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => triggerDestSearch(e.target.value)}
            className="w-full bg-white border border-gray-100 rounded-2xl pl-8 pr-8 py-3 text-sm text-[#2D3748] placeholder-[#A0AEC0] outline-none focus:border-[#7C3AED] transition-all duration-200"
          />
          {loadingDest && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-[#7C3AED]/30 border-t-[#7C3AED] rounded-full animate-spin"></div>
          )}

          {destSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#EDF2F7] rounded-2xl shadow-xl z-30 max-h-48 overflow-y-auto divide-y divide-[#EDF2F7] animate-fade-in">
              {destSuggestions.map((place) => (
                <li
                  key={place.place_id}
                  onClick={() => selectDestPlace(place)}
                  className="px-4 py-2.5 hover:bg-[#F8F9FA] text-xs text-[#718096] cursor-pointer transition-colors line-clamp-2"
                >
                  📍 {place.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={calculatingRoute}
        className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-75 cursor-pointer"
      >
        {calculatingRoute ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Plotting route...
          </>
        ) : (
          "Search Routes"
        )}
      </button>
    </form>
  );
}
