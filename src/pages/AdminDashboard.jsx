import { useState } from "react";

export default function AdminDashboard({
  user,
  onLogout,
  cabTiers,
  setCabTiers,
  activeTrip,
  analytics,
}) {
  // Local state to store edited rates before hitting save
  const [localTiers, setLocalTiers] = useState(cabTiers);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRateChange = (tierId, field, value) => {
    const parsedVal = parseFloat(value);
    setLocalTiers((prev) =>
      prev.map((tier) => {
        if (tier.id === tierId) {
          return {
            ...tier,
            [field]: isNaN(parsedVal) ? 0 : parsedVal,
          };
        }
        return tier;
      })
    );
    setSuccessMessage("");
  };

  const handleSaveRates = (e) => {
    e.preventDefault();
    setCabTiers(localTiers);
    setSuccessMessage("Rates updated successfully! Changes applied to Rider portals.");
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-[#F8F9FA] select-none font-sans">
      {/* Top Header Navigation */}
      <header className="px-8 py-5 border-b border-[#EDF2F7] flex items-center justify-between bg-white shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#E8E3FA] flex items-center justify-center text-2xl shadow-inner font-bold text-[#7C3AED]">
            👑
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#2D3748] tracking-tight leading-none">Glide Admin</h1>
            <span className="text-xs text-[#718096] font-medium">Control Center</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <h4 className="text-sm font-bold text-[#2D3748]">{user.name}</h4>
            <span className="text-xs text-[#059669] font-bold flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 bg-[#059669] rounded-full inline-block animate-ping"></span>
              Super Admin Mode
            </span>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-[#EDF2F7] text-[#718096] rounded-xl hover:bg-[#FCE8E6] hover:text-[#E11D48] transition-all text-xs font-bold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Workspace Area (Scrollable) */}
      <main className="flex-1 overflow-y-auto p-8 space-y-8 max-w-7xl mx-auto w-full">
        {/* Analytics Summary Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-tr from-[#F3EEFF] to-white border border-[#E8E3FA] p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-inner flex items-center justify-center text-3xl">
              💰
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Platform Earnings</span>
              <p className="text-2xl font-black text-[#2D3748]">${analytics.totalEarnings.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-[#E3F9F0] to-white border border-[#A7F3D0] p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-inner flex items-center justify-center text-3xl">
              🏁
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Completed Bookings</span>
              <p className="text-2xl font-black text-[#2D3748]">{analytics.completedBookings} Rides</p>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-[#FEEBE3] to-white border border-[#FFD3C4] p-6 rounded-[2rem] shadow-sm flex items-center gap-5">
            <div className="w-14 h-14 bg-white rounded-2xl shadow-inner flex items-center justify-center text-3xl">
              📊
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Bookings Count</span>
              <p className="text-2xl font-black text-[#2D3748]">{analytics.totalBookings} Requests</p>
            </div>
          </div>
        </section>

        {/* Configurations Forms Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Rate Manager Panel (Left column - span 7) */}
          <div className="bg-white rounded-[2.5rem] border border-[#EDF2F7] shadow-sm p-8 lg:col-span-7 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#2D3748] tracking-tight">System Rate Settings</h2>
              <p className="text-xs text-[#718096] mt-0.5">Customize default base fare and distance-based fees for cab tiers</p>
            </div>

            {successMessage && (
              <div className="p-4 bg-emerald-50 border border-[#A7F3D0] rounded-2xl text-xs font-semibold text-[#059669] animate-fade-in flex items-center gap-2">
                <span>✅</span>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSaveRates} className="space-y-6">
              <div className="divide-y divide-[#EDF2F7] space-y-4">
                {localTiers.map((tier) => (
                  <div key={tier.id} className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 first:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shadow-inner">
                        {tier.emoji}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#2D3748]">{tier.name}</h4>
                        <span className="text-[10px] text-[#A0AEC0] font-medium">{tier.desc}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-24">
                        <label className="text-[9px] font-bold text-[#A0AEC0] tracking-wider uppercase block mb-1">Base Price ($)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={tier.basePrice}
                          onChange={(e) => handleRateChange(tier.id, "basePrice", e.target.value)}
                          className="w-full bg-[#F8F9FA] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-xs text-[#2D3748] font-bold focus:border-[#7C3AED] outline-none"
                        />
                      </div>
                      <div className="w-24">
                        <label className="text-[9px] font-bold text-[#A0AEC0] tracking-wider uppercase block mb-1">Per Km ($)</label>
                        <input
                          type="number"
                          step="0.05"
                          min="0"
                          value={tier.perKm}
                          onChange={(e) => handleRateChange(tier.id, "perKm", e.target.value)}
                          className="w-full bg-[#F8F9FA] border border-[#EDF2F7] rounded-xl px-3 py-1.5 text-xs text-[#2D3748] font-bold focus:border-[#7C3AED] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Apply Updated Rates Configuration
              </button>
            </form>
          </div>

          {/* Active Booking Monitor (Right column - span 5) */}
          <div className="bg-white rounded-[2.5rem] border border-[#EDF2F7] shadow-sm p-8 lg:col-span-5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#2D3748] tracking-tight">Active Trip Monitor</h2>
              <p className="text-xs text-[#718096] mt-0.5">Real-time status of rides currently executing on the network</p>
            </div>

            {activeTrip ? (
              <div className="space-y-4 animate-slide-up bg-slate-50/50 p-5 rounded-3xl border border-[#EDF2F7]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeTrip.selectedTier.emoji}</span>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#2D3748]">{activeTrip.selectedTier.name}</h4>
                      <span className="text-[9px] text-[#A0AEC0] font-medium">Plate: {activeTrip.selectedTier.driver.plate}</span>
                    </div>
                  </div>
                  
                  {/* Trip status badge */}
                  <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                    activeTrip.status === "requested" ? "bg-amber-100 text-amber-700 animate-pulse" :
                    activeTrip.status === "accepted" ? "bg-purple-100 text-purple-700" :
                    activeTrip.status === "enroute" ? "bg-emerald-100 text-emerald-700 animate-pulse" :
                    "bg-[#EDF2F7] text-[#718096]"
                  }`}>
                    {activeTrip.status}
                  </span>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#EDF2F7] text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Pickup point</span>
                    <p className="text-[#2D3748] font-semibold truncate">{activeTrip.sourceName || "📍 Active Location Coordinates"}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Dropoff destination</span>
                    <p className="text-[#2D3748] font-semibold truncate">{activeTrip.destName || "🏁 Destination Location"}</p>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <div>
                      <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total distance</span>
                      <p className="text-[#2D3748] font-bold">{(activeTrip.distance / 1000).toFixed(1)} km</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block text-right">Fare calculation</span>
                      <p className="text-[#7C3AED] font-extrabold text-right">
                        ${(activeTrip.selectedTier.basePrice + (activeTrip.distance / 1000) * activeTrip.selectedTier.perKm).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center text-center space-y-3 bg-[#F8F9FA] rounded-3xl border border-[#EDF2F7] border-dashed">
                <span className="text-4xl">🛰️</span>
                <div>
                  <h4 className="text-xs font-bold text-[#2D3748]">System Idle & Ready</h4>
                  <p className="text-[10px] text-[#A0AEC0] max-w-xs mx-auto mt-0.5">
                    No active bookings are currently registered. Monitoring incoming requests...
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
