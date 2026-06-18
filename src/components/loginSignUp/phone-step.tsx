import React, { useState } from 'react';
import { CountrySelector } from './country-selector';
import { Phone } from 'lucide-react';

interface PhoneStepProps {
  onContinue: (phoneNumber: string) => void;
  initialType: 'login' | 'signup';
  onToggleType: () => void;
}

export function PhoneStep({ onContinue, initialType, onToggleType }: PhoneStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('91'); // Default to India (+91)

  const fullNumber = `+${countryCode}${phoneNumber}`;
  // Number must be exactly 10 digits long to pass validation
  const isValid = phoneNumber.length === 10;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onContinue(fullNumber);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-8">
      <div className="text-center lg:text-left space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          {initialType === 'login' ? 'Welcome Back!' : 'Create Account'}
        </h2>
        <p className="text-slate-500 font-medium text-base">
          Enter your mobile number to continue
        </p>
      </div>
    
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <div className="flex items-center h-16 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden shadow-sm focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
            <div className="pl-4 pr-1 shrink-0">
              
               <Phone className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="flex-1 flex items-center h-full">
              <CountrySelector value={countryCode} onChange={setCountryCode} />

             <input
  type="tel"
  placeholder="Enter numbers only"
  value={phoneNumber}
  onChange={(e) => {
    // 1. Remove everything except numbers instantly
    const cleanNumbersOnly = e.target.value.replace(/[^0-9]/g, '');
    
    // 2. Save it to your state variable
    setPhoneNumber(cleanNumbersOnly);
  }}
  className="w-full bg-transparent outline-none font-semibold text-slate-800"
/>
            </div>

          </div>
        </div>
                          {phoneNumber}

        <button 
          type="submit" 
          disabled={!isValid}
          className={`w-full h-14 rounded-2xl text-lg font-bold transition-all shadow-lg ${
            isValid 
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="text-center space-y-6">
          <p className="text-slate-400 text-[13px] font-medium leading-relaxed">
            By continuing, you agree to our<br />
            <span className="text-blue-600 font-bold hover:underline cursor-pointer">Terms & Conditions</span>
          </p>

          <div className="h-px bg-slate-100 w-full" />

          <p className="text-slate-600 text-sm font-medium">
            {initialType === 'login' ? "New here?" : "Joined already?"}
            <button 
              type="button" 
              onClick={onToggleType}
              className="ml-2 text-blue-600 font-bold hover:underline"
            >
              {initialType === 'login' ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}