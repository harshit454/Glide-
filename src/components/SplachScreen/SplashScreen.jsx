import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#E8E3FA] via-[#FCE8E6] to-[#E3F9F0] overflow-hidden select-none">
      {/* Outer Glow Ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 bg-white/40 rounded-full blur-xl animate-pulse"></div>
        
        {/* Animated Taxi Icon Container */}
        <div className="relative w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-5xl transform hover:scale-105 transition-transform duration-300 animate-bounce">
          🚕
        </div>
      </div>

      {/* Brand Title */}
      <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-[#2D3748] flex items-center gap-1">
        Glide
        <span className="w-2.5 h-2.5 bg-[#7C3AED] rounded-full inline-block animate-ping"></span>
      </h1>
      
      {/* Subtitle */}
      <p className="mt-2 text-sm font-medium text-[#718096] tracking-wide uppercase">
        Your Journey, Perfected
      </p>

      {/* Progress Bar Container */}
      <div className="mt-10 w-48 h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#E11D48] transition-all duration-100 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Status Text */}
      <span className="mt-3 text-xs text-[#A0AEC0] font-medium animate-pulse">
        {progress < 40 ? "Initializing map modules..." : progress < 80 ? "Locating nearest rides..." : "Ready to Glide"}
      </span>
    </div>
  );
}