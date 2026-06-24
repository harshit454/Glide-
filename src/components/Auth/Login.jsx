import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Automatically detect the role based on the entered email
  const detectRole = (emailVal) => {
    const trimmed = emailVal.toLowerCase().trim();
    if (trimmed === "admin@glide.com") return "admin";
    if (trimmed === "driver@glide.com") return "driver";
    return "rider";
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    const role = detectRole(email);

    // Simulate network authentication call
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLogin) {
        onLogin({
          email: email.trim(),
          name: role === "admin" ? "Harshit (Admin)" : role === "driver" ? "Sarah Jenkins" : "Harshit",
          role: role,
        });
      }
    }, 1200);
  };

  const detectedRole = detectRole(email);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#E8E3FA] via-[#FCE8E6] to-[#FEF3C7] px-4 select-none relative overflow-hidden font-sans">
      {/* Background Soft Blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-200/50 rounded-full blur-3xl animate-pulse delay-700"></div>

      {/* Main Glass Card */}
      <div className="relative w-full max-w-md rounded-[2.5rem] bg-white/75 backdrop-blur-xl border border-white/40 shadow-2xl overflow-hidden p-8 animate-slide-up">
        
        {/* Logo / Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-2xl shadow-sm text-3xl mb-2">
            🚕
          </div>
          <h2 className="text-3xl font-extrabold text-[#2D3748] tracking-tight">Welcome to Glide</h2>
          <p className="text-xs text-[#718096] mt-0.5">Enter credentials. Roles are resolved automatically.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-[#FCE8E6] rounded-xl text-xs font-semibold text-[#E11D48] animate-fade-in flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-[#718096] tracking-wider uppercase ml-1">Email Address</label>
              
              {/* Dynamic Role Detected Indicator Badge */}
              {email.trim() && (
                <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold transition-all uppercase tracking-wider animate-fade-in ${
                  detectedRole === "admin" ? "bg-amber-100 text-amber-700" :
                  detectedRole === "driver" ? "bg-purple-100 text-purple-700" :
                  "bg-emerald-100 text-emerald-700"
                }`}>
                  Detected: {detectedRole}
                </span>
              )}
            </div>
            
            <input
              type="email"
              placeholder="e.g. admin@glide.com, driver@glide.com, or user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-white/80 border border-gray-200 px-4 py-2.5 text-[#2D3748] placeholder-[#A0AEC0] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#718096] tracking-wider uppercase ml-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              className="w-full rounded-xl bg-white/80 border border-gray-200 px-4 py-2.5 text-[#2D3748] placeholder-[#A0AEC0] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all text-sm"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-[#718096] px-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" className="accent-[#7C3AED] rounded" />
              <span>Remember me</span>
            </label>
            <span className="hover:text-[#7C3AED] cursor-pointer transition-colors duration-150">Forgot password?</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white py-3 font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] transition-all flex items-center justify-center text-sm disabled:opacity-80 cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in as {detectedRole.toUpperCase()}...
              </span>
            ) : (
              `Enter ${detectedRole === "rider" ? "Rider" : detectedRole === "driver" ? "Driver" : "Admin"} Workspace`
            )}
          </button>
        </form>

        {/* Helper Instructions panel inside card */}
        <div className="mt-6 pt-4 border-t border-[#EDF2F7] text-center">
          <p className="text-[10px] text-[#A0AEC0] leading-normal font-medium">
            💡 <span>Testing Accounts:</span><br />
            Admin Mode: <span className="text-[#7C3AED] font-semibold">admin@glide.com</span><br />
            Driver Mode: <span className="text-[#7C3AED] font-semibold">driver@glide.com</span><br />
            Rider Mode: <span className="text-[#7C3AED] font-semibold">any other email</span>
          </p>
        </div>
      </div>
    </div>
  );
}