export default function UserProfileHeader({ user, onLogout }) {
  return (
    <div className="p-5 border-b border-[#EDF2F7] flex items-center justify-between bg-gradient-to-r from-white to-[#F8F9FA]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#E8E3FA] flex items-center justify-center text-lg shadow-sm border border-white font-bold text-[#7C3AED]">
          {user?.name?.[0] || "H"}
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#2D3748]">Hi, {user?.name || "Rider"}</h4>
          <span className="text-xs text-[#7C3AED] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#059669] rounded-full inline-block animate-pulse"></span>
            Glide Wallet Active
          </span>
        </div>
      </div>
      <button 
        onClick={onLogout}
        className="p-2 bg-[#EDF2F7] text-[#718096] rounded-xl hover:bg-[#FCE8E6] hover:text-[#E11D48] transition-all duration-200 text-xs font-semibold cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
}
