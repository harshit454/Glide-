import { useState, useEffect } from "react";
import Login from "./Auth/Login";
import Dashboard from "../pages/Dashboard"; // Rider Dashboard
import AdminDashboard from "../pages/AdminDashboard";
import DriverDashboard from "../pages/DriverDashboard";

const INITIAL_CAB_TIERS = [
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
      rating: "4.8",
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

const Main = () => {
  const [user, setUser] = useState(null);
  
  // Shared States
  const [cabTiers, setCabTiers] = useState(INITIAL_CAB_TIERS);
  
  // activeTrip structure:
  // { status: 'requested'|'accepted'|'enroute'|'completed', sourceCoords, destCoords, route, distance, duration, selectedTier, simulationIndex, sourceName, destName }
  const [activeTrip, setActiveTrip] = useState(null);

  // Statistics for Admin Analytics Dashboard
  const [analytics, setAnalytics] = useState({
    totalBookings: 0,
    completedBookings: 0,
    totalEarnings: 0,
  });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Shared booking trigger (Called by Rider)
  const handleBookTrip = (tripData) => {
    setActiveTrip({
      ...tripData,
      status: "requested",
      simulationIndex: 0,
    });
    setAnalytics((prev) => ({
      ...prev,
      totalBookings: prev.totalBookings + 1,
    }));
  };

  // Shared booking acceptance (Called by Driver)
  const handleAcceptTrip = () => {
    setActiveTrip((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: "accepted",
      };
    });
  };

  // Shared booking trip start (Called by Driver or auto-matching)
  const handleStartTrip = () => {
    setActiveTrip((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: "enroute",
        simulationIndex: 0,
      };
    });
  };

  // Shared booking trip completion (Called by Driver or auto-simulation)
  const handleCompleteTrip = (farePaid) => {
    setActiveTrip((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        status: "completed",
      };
    });
    setAnalytics((prev) => ({
      ...prev,
      completedBookings: prev.completedBookings + 1,
      totalEarnings: prev.totalEarnings + parseFloat(farePaid),
    }));
  };

  // Shared booking cancellation
  const handleCancelTrip = () => {
    setActiveTrip(null);
  };

  // 1. AUTO-MATCH & SIMULATION TIMERS:
  // If Rider books but no Driver is logged in to accept, simulate driver workflow automatically
  useEffect(() => {
    let timer;
    if (activeTrip && activeTrip.status === "requested" && user?.role === "rider") {
      // Auto-accept after 3.5s for rider mockup experience
      timer = setTimeout(() => {
        setActiveTrip((prev) => {
          if (prev && prev.status === "requested") {
            return { ...prev, status: "accepted" };
          }
          return prev;
        });
      }, 3500);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrip?.status, user?.role]);

  // If driver is matched (accepted), auto-start trip enroute after 2.5s for rider mockup
  useEffect(() => {
    let timer;
    if (activeTrip && activeTrip.status === "accepted" && user?.role === "rider") {
      timer = setTimeout(() => {
        handleStartTrip();
      }, 2500);
    }
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrip?.status, user?.role]);

  // 2. SYNCHRONIZED TRIP ENROUTE STEP TIMER:
  // Drives the car coordinate index step by step at root level so both Driver and Rider portals sync maps.
  useEffect(() => {
    let interval;
    if (activeTrip && activeTrip.status === "enroute") {
      interval = setInterval(() => {
        setActiveTrip((prev) => {
          if (!prev || prev.status !== "enroute") {
            clearInterval(interval);
            return prev;
          }
          
          const nextIndex = prev.simulationIndex + 1;
          if (nextIndex >= prev.route.length) {
            clearInterval(interval);
            
            // Calculate final price paid
            const distKm = prev.distance ? prev.distance / 1000 : 0;
            const farePaid = (prev.selectedTier.basePrice + distKm * prev.selectedTier.perKm).toFixed(2);
            
            // Update stats
            setAnalytics((s) => ({
              ...s,
              completedBookings: s.completedBookings + 1,
              totalEarnings: s.totalEarnings + parseFloat(farePaid),
            }));

            return {
              ...prev,
              status: "completed",
              simulationIndex: prev.route.length - 1,
            };
          }

          return {
            ...prev,
            simulationIndex: nextIndex,
          };
        });
      }, 450); // updates coordinate position every 450ms
    }
    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrip?.status]);

  return (
    <div className="w-full h-full">
      {user ? (
        <>
          {user.role === "admin" && (
            <AdminDashboard
              user={user}
              onLogout={handleLogout}
              cabTiers={cabTiers}
              setCabTiers={setCabTiers}
              activeTrip={activeTrip}
              analytics={analytics}
            />
          )}

          {user.role === "driver" && (
            <DriverDashboard
              user={user}
              onLogout={handleLogout}
              activeTrip={activeTrip}
              onAcceptTrip={handleAcceptTrip}
              onStartTrip={handleStartTrip}
              onCompleteTrip={handleCompleteTrip}
              onCancelTrip={handleCancelTrip}
            />
          )}

          {user.role === "rider" && (
            <Dashboard
              user={user}
              onLogout={handleLogout}
              cabTiers={cabTiers}
              activeTrip={activeTrip}
              onBookTrip={handleBookTrip}
              onCancelTrip={handleCancelTrip}
            />
          )}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Main;
