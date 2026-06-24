import { useState } from "react";
import InteractiveMap from "../Maps/InteractiveMap";

export default function DriverDashboard({
  user,
  onLogout,
  activeTrip,
  onAcceptTrip,
  onStartTrip,
  onCompleteTrip,
  onCancelTrip,
}) {
  const [isOnline, setIsOnline] = useState(true);

  // Derive coordinates and price info from activeTrip
  const distanceKm = activeTrip && activeTrip.distance ? activeTrip.distance / 1000 : 0;
  const fareAmount = activeTrip && activeTrip.selectedTier
    ? (activeTrip.selectedTier.basePrice + distanceKm * activeTrip.selectedTier.perKm).toFixed(2)
    : "0.00";
  const driverPayout = activeTrip ? (parseFloat(fareAmount) * 0.85).toFixed(2) : "0.00"; // 15% platform commission

  const carCoords = activeTrip && activeTrip.route && activeTrip.route.length > 0
    ? activeTrip.route[activeTrip.simulationIndex]
    : null;

  const progressPercent = activeTrip && activeTrip.route
    ? (activeTrip.simulationIndex / (activeTrip.route.length - 1)) * 100
    : 0;

  const remainingDist = activeTrip
    ? (distanceKm * (1 - progressPercent / 100)).toFixed(1)
    : "0.0";

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col md:flex-row bg-[#F8F9FA] font-sans">
      
      {/* Driver Workspace Controls Panel (Left Sidebar) */}
      <div className="w-full md:w-[420px] shrink-0 h-[48vh] md:h-full flex flex-col bg-white border-r border-[#EDF2F7] relative z-10 shadow-lg select-none">
        
        {/* Header driver metadata */}
        <div className="p-5 border-b border-[#EDF2F7] flex items-center justify-between bg-gradient-to-r from-white to-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-lg shadow-sm">
              👨🏽‍✈️
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#2D3748]">{user.name}</h4>
              <span className="text-[10px] bg-[#E8E3FA] text-[#7C3AED] px-2 py-0.5 rounded-full font-bold">
                Gold Tier Driver
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Online toggle button switch */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isOnline
                  ? "bg-[#E3F9F0] text-[#059669] border border-[#A7F3D0]"
                  : "bg-gray-100 text-gray-500 border border-gray-200"
              }`}
            >
              {isOnline ? "🟢 Online" : "🔴 Offline"}
            </button>

            <button
              onClick={onLogout}
              className="p-2 bg-[#EDF2F7] text-[#718096] rounded-xl hover:bg-[#FCE8E6] hover:text-[#E11D48] transition-all text-xs font-semibold cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Scrollable controller area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Offline Overlay State */}
          {!isOnline && (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3 animate-fade-in">
              <span className="text-4xl">💤</span>
              <div>
                <h3 className="text-sm font-bold text-[#2D3748]">You are offline</h3>
                <p className="text-xs text-[#718096] max-w-xs mx-auto mt-0.5">
                  Toggle online state in the header to register your vehicle and receive nearby ride requests.
                </p>
              </div>
            </div>
          )}

          {/* Online and idle state */}
          {isOnline && !activeTrip && (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-[#E3F9F0] border border-[#A7F3D0] rounded-full flex items-center justify-center text-2xl animate-pulse">
                📡
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#2D3748]">Waiting for requests...</h3>
                <p className="text-xs text-[#718096] max-w-xs mx-auto mt-0.5">
                  Your Suzuki Swift (DL 1RT 8832) is registered. Ride bookings will ring here instantly.
                </p>
              </div>
            </div>
          )}

          {/* Incoming Request Mode (Ringing alert) */}
          {isOnline && activeTrip && activeTrip.status === "requested" && (
            <div className="p-6 bg-gradient-to-tr from-[#F3EEFF] to-white border border-[#E8E3FA] rounded-3xl shadow-lg space-y-5 animate-ring">
              <div className="flex justify-between items-center">
                <span className="text-[10px] bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                  ⚡ New Booking Request
                </span>
                <span className="text-xs font-bold text-[#7C3AED]">${fareAmount}</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Rider Name</span>
                  <p className="font-bold text-[#2D3748]">Harshit</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Pickup</span>
                  <p className="font-semibold text-[#718096] truncate">{activeTrip.sourceName || "📍 Pickup Point Coordinates"}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Dropoff</span>
                  <p className="font-semibold text-[#718096] truncate">{activeTrip.destName || "🏁 Destination Location"}</p>
                </div>
                <div className="flex justify-between border-t border-[#EDF2F7] pt-2">
                  <div>
                    <span className="text-[9px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Distance</span>
                    <p className="font-bold text-[#2D3748]">{distanceKm.toFixed(1)} km</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#A0AEC0] uppercase tracking-wider block text-right">Est. Payout (85%)</span>
                    <p className="font-extrabold text-[#059669] text-right">${driverPayout}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onAcceptTrip}
                  className="flex-1 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-purple-500/10 transition-colors cursor-pointer"
                >
                  Accept Request
                </button>
                <button
                  onClick={onCancelTrip}
                  className="px-4 py-3 bg-rose-50 text-[#E11D48] rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Active booking state (Driver accepted the ride) */}
          {isOnline && activeTrip && activeTrip.status === "accepted" && (
            <div className="bg-white border border-[#EDF2F7] rounded-3xl p-5 shadow-sm space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#2D3748]">Match Secured</h3>
                <span className="text-xs text-[#718096] font-semibold">ETA to pickup: 2 mins</span>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#EDF2F7] text-xs space-y-2">
                <p className="text-[#718096]"><strong className="text-[#2D3748]">Passenger:</strong> Harshit</p>
                <p className="text-[#718096] truncate"><strong className="text-[#2D3748]">Pickup:</strong> {activeTrip.sourceName || "📍 Pickup Point Coordinates"}</p>
              </div>

              <button
                onClick={onStartTrip}
                className="w-full py-4 bg-gradient-to-r from-[#059669] to-[#10B981] text-white rounded-2xl font-bold shadow-md hover:shadow-emerald-500/10 active:scale-[0.99] transition-all text-xs uppercase tracking-wider cursor-pointer"
              >
                Start Driving (Enroute)
              </button>
            </div>
          )}

          {/* Trip execution enroute (Simulation running) */}
          {isOnline && activeTrip && activeTrip.status === "enroute" && (
            <div className="bg-white border border-[#EDF2F7] rounded-3xl p-5 shadow-sm space-y-4 animate-slide-up">
              <div className="flex justify-between items-center">
                <span className="text-[10px] bg-[#059669] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                  Driving Route
                </span>
                <span className="text-xs text-[#718096] font-semibold">{remainingDist} km left</span>
              </div>

              <div className="space-y-1">
                <div className="w-full h-2 bg-[#E3F9F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#059669] to-[#10B981] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-2xl border border-[#EDF2F7] text-xs">
                <span className="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Current Destination</span>
                <p className="font-bold text-[#2D3748] truncate mt-0.5">{activeTrip.destName || "🏁 Destination Location"}</p>
              </div>

              <span className="text-[11px] text-[#718096] italic block text-center animate-pulse">
                Synchronized tracking simulation active...
              </span>
            </div>
          )}

          {/* Trip completed page */}
          {isOnline && activeTrip && activeTrip.status === "completed" && (
            <div className="space-y-5 animate-slide-up text-center">
              <div className="w-16 h-16 bg-[#E3F9F0] border border-[#A7F3D0] rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
                🏁
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#2D3748]">Trip Concluded!</h3>
                <p className="text-xs text-[#718096]">Passenger dropped off successfully</p>
              </div>

              <div className="bg-[#F8F9FA] rounded-3xl border border-[#EDF2F7] p-5 text-left space-y-3.5">
                <h4 className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Earnings Statement</h4>
                
                <div className="space-y-2 text-xs text-[#718096]">
                  <div className="flex justify-between">
                    <span>Passenger Fare Charge</span>
                    <p className="font-semibold text-[#2D3748]">${fareAmount}</p>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Commission (15%)</span>
                    <p className="font-semibold text-[#E11D48]">-${(parseFloat(fareAmount) * 0.15).toFixed(2)}</p>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EDF2F7] font-bold text-sm text-[#2D3748]">
                    <span>Net Driver Payout</span>
                    <span className="text-[#059669]">${driverPayout}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onCompleteTrip(fareAmount)}
                className="w-full bg-[#7C3AED] text-white py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all text-sm cursor-pointer"
              >
                Acknowledge & Reset Panel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Driver Map Panel (Right side) */}
      <div className="flex-1 h-[52vh] md:h-full relative z-0">
        <InteractiveMap
          sourceCoords={activeTrip?.sourceCoords}
          destCoords={activeTrip?.destCoords}
          route={activeTrip?.route}
          carCoords={carCoords}
        />
      </div>

    </div>
  );
}
