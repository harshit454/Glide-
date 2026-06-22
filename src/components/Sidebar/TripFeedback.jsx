import { useState } from "react";

export default function TripFeedback({ selectedTier, distanceKm, onCancelTrip }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const calculatePrice = (tier) => {
    const total = tier.basePrice + distanceKm * tier.perKm;
    return total.toFixed(2);
  };

  const handleDone = () => {
    alert(`Thank you for rating ${rating} stars!`);
    onCancelTrip(); // Reset
  };

  return (
    <div className="space-y-5 animate-slide-up text-center">
      <div className="w-16 h-16 bg-[#E3F9F0] border border-[#A7F3D0] rounded-full flex items-center justify-center text-3xl mx-auto shadow-sm">
        🏁
      </div>
      
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-[#2D3748]">You have arrived!</h3>
        <p className="text-xs text-[#718096]">Thanks for traveling with Glide</p>
      </div>

      {/* Receipt Summary Card */}
      <div className="bg-[#F8F9FA] rounded-3xl border border-[#EDF2F7] p-5 text-left space-y-3.5">
        <h4 className="text-xs font-bold text-[#A0AEC0] uppercase tracking-wider">Ride Invoice Receipt</h4>
        
        <div className="space-y-2 text-xs text-[#718096]">
          <div className="flex justify-between">
            <span>Fare Charge ({distanceKm} km)</span>
            <p className="font-semibold text-[#2D3748]">${calculatePrice(selectedTier)}</p>
          </div>
          <div className="flex justify-between">
            <span>Taxes & Tolls</span>
            <p className="font-semibold text-[#2D3748]">$0.00</p>
          </div>
          <div className="flex justify-between pt-2 border-t border-[#EDF2F7] font-bold text-sm text-[#2D3748]">
            <span>Total Amount Paid</span>
            <span>${calculatePrice(selectedTier)}</span>
          </div>
        </div>
        <span className="text-[10px] bg-[#E3F9F0] text-[#059669] px-2.5 py-0.5 rounded-full font-bold inline-block">
          Paid via VISA •••• 4890
        </span>
      </div>

      {/* Rating Card */}
      <div className="bg-white border border-[#EDF2F7] rounded-3xl p-5 shadow-sm space-y-4">
        <h4 className="text-sm font-bold text-[#2D3748]">Rate {selectedTier.driver.name}</h4>
        
        {/* Star Grid */}
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl transition-transform duration-150 active:scale-95 outline-none cursor-pointer"
            >
              <span 
                style={{
                  color: star <= (hoverRating || rating) ? "#D97706" : "#EDF2F7",
                  textShadow: star <= (hoverRating || rating) ? "0 0 4px rgba(217, 119, 6, 0.15)" : "none"
                }}
              >
                ★
              </span>
            </button>
          ))}
        </div>

        {/* Review input */}
        <textarea
          placeholder="Leave an optional note for driver..."
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          rows={2}
          className="w-full text-xs bg-[#F8F9FA] border border-[#EDF2F7] rounded-2xl p-3 text-[#2D3748] outline-none focus:border-[#7C3AED] resize-none"
        />
      </div>

      <button
        onClick={handleDone}
        className="w-full bg-[#7C3AED] text-white py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-purple-500/10 active:scale-[0.99] transition-all text-sm cursor-pointer"
      >
        Done & Return Home
      </button>
    </div>
  );
}
