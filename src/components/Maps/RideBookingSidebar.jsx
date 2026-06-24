import { useState } from "react";
import UserProfileHeader from "../Sidebar/UserProfileHeader";
import SearchForm from "../Sidebar/SearchForm";
import VehicleSelection from "../Sidebar/VehicleSelection";
import RadarSearch from "../Sidebar/RadarSearch";
import TripDetails from "../Sidebar/TripDetails";
import TripFeedback from "../Sidebar/TripFeedback";

const CAB_TIERS = [
  {
    id: "lite",
    name: "Glide Lite",
    emoji: "🚗",
    desc: "Affordable hatchbacks",
    basePrice: 3.5,
    perKm: 1.2,
    etaMin: 2,
    colorClass: "bg-[#E3F9F0] text-[#059669]",
    iconBg: "bg-[#E3F9F0]",
    driver: {
      name: "Rajesh Kumar",
      avatar: "👨🏽‍✈️",
      rating: "4.18",
      car: "Suzuki Swift",
      plate: "DL 1RT 8832",
    },
  },
  {
    id: "comfort",
    name: "Glide Comfort",
    emoji: "🚙",
    desc: "Comfortable sedans",
    basePrice: 5.0,
    perKm: 1.8,
    etaMin: 3,
    colorClass: "bg-[#E8E3FA] text-[#7C3AED]",
    iconBg: "bg-[#E8E3FA]",
    driver: {
      name: "Sarah Jenkins",
      avatar: "👩🏼‍✈️",
      rating: "4.9",
      car: "Hyundai Verna",
      plate: "MH 02 AB 4950",
    },
  },
  {
    id: "max",
    name: "Glide Max",
    emoji: "🚐",
    desc: "Spacious SUVs for groups",
    basePrice: 8.0,
    perKm: 2.6,
    etaMin: 5,
    colorClass: "bg-[#FEEBE3] text-[#EA580C]",
    iconBg: "bg-[#FEEBE3]",
    driver: {
      name: "Amit Sharma",
      avatar: "👨🏻‍✈️",
      rating: "4.7",
      car: "Toyota Innova",
      plate: "HR 26 CT 1024",
    },
  },
  {
    id: "luxe",
    name: "Glide Luxe",
    emoji: "✨",
    desc: "Premium luxury rides",
    basePrice: 12.0,
    perKm: 4.2,
    etaMin: 4,
    colorClass: "bg-[#FEF3C7] text-[#D97706]",
    iconBg: "bg-[#FEF3C7]",
    driver: {
      name: "Elena Vance",
      avatar: "👩🏽‍✈️",
      rating: "5.0",
      car: "Tesla Model S",
      plate: "KA 51 EX 7777",
    },
  },
];

export default function RideBookingSidebar({
  user,
  onLogout,
  onSearchRoute,
  routeDistance,
  routeDuration,
  tripState,
  onCancelTrip,
  simulationIndex,
  routeCoordsCount,
  cabTiers,
  onBookTrip,
}) {
  const [selectedTierId, setSelectedTierId] = useState("comfort");
  const [errorMessage, setErrorMessage] = useState("");

  const currentCabTiers = cabTiers || CAB_TIERS;
  const selectedTier = currentCabTiers.find((t) => t.id === selectedTierId) || currentCabTiers[1];

  const distanceKm = routeDistance ? parseFloat((routeDistance / 1000).toFixed(1)) : 0;
  const durationMin = routeDuration ? Math.round(routeDuration / 60) : 0;

  // Confirm booking, triggers central booking state
  const handleConfirmBooking = () => {
    if (onBookTrip) {
      onBookTrip(selectedTier);
    }
  };

  // Progress calculations for active simulation
  const progressPercent = routeCoordsCount > 0 ? (simulationIndex / (routeCoordsCount - 1)) * 100 : 0;
  const remainingEta = Math.max(1, Math.round(durationMin * (1 - progressPercent / 100)));
  const remainingDist = Math.max(0, (distanceKm * (1 - progressPercent / 100))).toFixed(1);

  return (
    <div className="w-full h-full bg-[#FFFFFF] border-r border-[#EDF2F7] flex flex-col shadow-lg z-10 select-none">
      {/* Header Profile Panel */}
      <UserProfileHeader user={user} onLogout={onLogout} />

      {/* Main Container rendering active sidebar step */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {tripState === "search" && (
          <SearchForm
            onSearchRoute={onSearchRoute}
            calculatingRoute={false} // Managed internally via loading state or passed from parent
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />
        )}

        {tripState === "selection" && (
          <VehicleSelection
            cabTiers={cabTiers || CAB_TIERS}
            distanceKm={distanceKm}
            durationMin={durationMin}
            onCancelTrip={onCancelTrip}
            selectedTier={selectedTier}
            setSelectedTier={(tier) => setSelectedTierId(tier.id)}
            onConfirmBooking={handleConfirmBooking}
          />
        )}

        {tripState === "booking" && (
          <RadarSearch
            selectedTier={selectedTier}
            onCancelTrip={onCancelTrip}
          />
        )}

        {tripState === "enroute" && (
          <TripDetails
            selectedTier={selectedTier}
            progressPercent={progressPercent}
            remainingEta={remainingEta}
            remainingDist={remainingDist}
            onCancelTrip={onCancelTrip}
          />
        )}

        {tripState === "completed" && (
          <TripFeedback
            selectedTier={selectedTier}
            distanceKm={distanceKm}
            onCancelTrip={onCancelTrip}
          />
        )}
      </div>
    </div>
  );
}
