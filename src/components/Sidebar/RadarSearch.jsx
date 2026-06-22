export default function RadarSearch({ selectedTier, onCancelTrip }) {
  return (
    <div className="h-64 flex flex-col items-center justify-center space-y-6 text-center animate-fade-in">
      <div className="relative flex items-center justify-center w-24 h-24 bg-purple-50 rounded-full border border-purple-100 radar-search">
        <span className="text-4xl animate-pulse">📡</span>
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-[#2D3748]">Contacting drivers nearby...</h3>
        <p className="text-xs text-[#718096] max-w-xs mx-auto">
          Requesting ride from {selectedTier.name}. Nearest driver is estimated {selectedTier.etaMin} mins away.
        </p>
      </div>
      <button
        onClick={onCancelTrip}
        className="px-5 py-2.5 bg-rose-50 text-[#E11D48] rounded-xl text-xs font-semibold hover:bg-[#FCE8E6] transition-colors cursor-pointer"
      >
        Cancel Request
      </button>
    </div>
  );
}
