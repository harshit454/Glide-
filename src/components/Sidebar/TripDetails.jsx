export default function TripDetails({
  selectedTier,
  progressPercent,
  remainingEta,
  remainingDist,
  onCancelTrip,
}) {
  return (
    <div className="space-y-5 animate-slide-up">
      {/* Live Progress Card */}
      <div className="bg-gradient-to-tr from-[#F3EEFF] to-white border border-[#E8E3FA] rounded-3xl p-5 shadow-sm space-y-3.5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Enroute
          </span>
          <span className="text-xs text-[#718096] font-semibold">ETA: {remainingEta} mins</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[#718096] font-semibold">
            <span>Progress to destination</span>
            <span>{remainingDist} km left</span>
          </div>
          {/* Custom Progress bar */}
          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7C3AED] to-[#E11D48] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Assigned Driver Profile Card */}
      <div className="bg-white border border-[#EDF2F7] rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-gray-100 flex items-center justify-center text-3xl shadow-sm">
              {selectedTier.driver.avatar}
            </div>
            <div>
              <h4 className="font-bold text-[#2D3748] text-sm">{selectedTier.driver.name}</h4>
              <span className="text-xs text-[#D97706] font-semibold flex items-center gap-1">
                ⭐ {selectedTier.driver.rating} • Certified Driver
              </span>
            </div>
          </div>
          <div className="text-right">
            <span 
              onClick={() => alert(`Calling ${selectedTier.driver.name}...`)}
              className="text-xs font-bold text-[#7C3AED] bg-[#F3EEFF] px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-[#7C3AED] hover:text-white transition-all duration-200"
            >
              📞 Call
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#EDF2F7] flex items-center justify-between text-xs">
          <div>
            <span className="text-[#A0AEC0] font-medium block">Vehicle Model</span>
            <p className="font-bold text-[#2D3748]">{selectedTier.driver.car}</p>
          </div>
          <div>
            <span className="text-[#A0AEC0] font-medium block text-right">License Plate</span>
            <p className="font-bold text-[#2D3748] text-right">{selectedTier.driver.plate}</p>
          </div>
        </div>
      </div>

      {/* Help/Emergency Options */}
      <div className="flex gap-3">
        <button 
          onClick={onCancelTrip}
          className="flex-1 py-3.5 bg-[#FCE8E6] text-[#E11D48] rounded-2xl text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
        >
          Cancel Ride
        </button>
        <button 
          onClick={() => alert("Trip details shared successfully!")}
          className="flex-1 py-3.5 bg-[#EDF2F7] text-[#718096] rounded-2xl text-xs font-bold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Share Status
        </button>
      </div>
    </div>
  );
}
