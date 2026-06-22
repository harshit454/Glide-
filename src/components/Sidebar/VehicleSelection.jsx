export default function VehicleSelection({
  cabTiers,
  distanceKm,
  durationMin,
  onCancelTrip,
  selectedTier,
  setSelectedTier,
  onConfirmBooking,
}) {
  const calculatePrice = (tier) => {
    const total = tier.basePrice + distanceKm * tier.perKm;
    return total.toFixed(2);
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Trip stats summary banner */}
      <div className="flex justify-between items-center bg-[#F8F9FA] p-4 rounded-2xl border border-[#EDF2F7]">
        <div>
          <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">Distance</span>
          <p className="text-lg font-bold text-[#2D3748]">{distanceKm} km</p>
        </div>
        <div className="w-px h-8 bg-[#EDF2F7]"></div>
        <div>
          <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-widest">Duration</span>
          <p className="text-lg font-bold text-[#2D3748]">{durationMin} mins</p>
        </div>
        <div className="w-px h-8 bg-[#EDF2F7]"></div>
        <button 
          onClick={onCancelTrip}
          className="text-xs text-[#7C3AED] hover:underline font-bold cursor-pointer"
        >
          Change
        </button>
      </div>

      <h3 className="text-sm font-bold text-[#718096] tracking-wider uppercase pl-1">Available Ride Categories</h3>

      {/* Cab Grid Cards */}
      <div className="space-y-3">
        {cabTiers.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`flex items-center justify-between p-4 rounded-3xl border cursor-pointer transition-all duration-200 select-none ${
                isSelected
                  ? "bg-[#F3EEFF]/80 border-[#7C3AED] shadow-md shadow-purple-500/5"
                  : "bg-white border-[#EDF2F7] hover:border-[#7C3AED]/30 hover:bg-[#F8F9FA]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${tier.iconBg} flex items-center justify-center text-2xl shadow-inner`}>
                  {tier.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-[#2D3748] text-sm flex items-center gap-1.5">
                    {tier.name}
                    {isSelected && (
                      <span className="text-[10px] bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full font-bold">
                        Selected
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-[#718096] leading-snug">{tier.desc}</p>
                  <span className="text-[10px] text-[#A0AEC0] font-semibold">📍 ETA: {tier.etaMin} mins away</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-[#2D3748] font-bold text-sm">${calculatePrice(tier)}</p>
                <span className="text-[10px] text-[#A0AEC0] font-medium">Flat rate</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Selection Banner */}
      <div className="bg-[#F8F9FA] border border-[#EDF2F7] rounded-3xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">💳</span>
          <div>
            <h4 className="text-xs font-bold text-[#2D3748]">Personal VISA •••• 4890</h4>
            <span className="text-[10px] text-[#059669] font-bold">Personal Card</span>
          </div>
        </div>
        <span className="text-xs font-bold text-[#7C3AED] hover:underline cursor-pointer">Change</span>
      </div>

      <button
        onClick={onConfirmBooking}
        className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
      >
        Request {selectedTier.name} • ${calculatePrice(selectedTier)}
      </button>
    </div>
  );
}
