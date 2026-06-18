import React, { useState } from 'react';
import { CountrySelector } from './country-selector';
import { User, Mail, Phone, Lock } from 'lucide-react';

interface RegisterStepProps {
  onRegisterSubmit: (formData: any) => void;
  onToggleType: () => void;
}

export function RegisterStep({ onRegisterSubmit, onToggleType }: RegisterStepProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('91'); // Default to India (+91)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    const fullNumber = `+${countryCode}${phoneNumber}`;
    onRegisterSubmit({
      fullName,
      username,
      email,
      phoneNumber: fullNumber,
      password
    });
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="text-center lg:text-left space-y-1">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h2>
        <p className="text-slate-500 font-medium text-sm">Join Glide today to drive, earn, and grow.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name Input */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden px-4 focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input 
            type="text" 
            placeholder="Full Name" 
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Username Input */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden px-4 focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <User className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input 
            type="text" 
            placeholder="Username" 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Email Input */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden px-4 focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <Mail className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input 
            type="email" 
            placeholder="name@email.com" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Mobile Number with Country Selector */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <div className="pl-4 pr-1 shrink-0">
            <Phone className="w-5 h-5 text-slate-400" />
          </div>
          <div className="flex-1 flex items-center h-full">
            <CountrySelector value={countryCode} onChange={setCountryCode} />
            <input
              type="tel"
              placeholder="Mobile Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-0 bg-transparent outline-none text-base font-semibold h-full px-4 placeholder:text-slate-300 placeholder:font-normal w-full"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden px-4 focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <Lock className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="flex items-center h-14 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden px-4 focus-within:border-blue-600/30 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
          <Lock className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-transparent outline-none font-semibold text-slate-800"
          />
        </div>

        {/* Submit Register Button */}
        <button 
          type="submit"
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer mt-2"
        >
          Sign Up
        </button>

        {/* Bottom Toggle Switch */}
        <div className="text-center pt-4 border-t border-slate-100">
          <p className="text-slate-600 text-sm font-medium">
            Joined already?
            <button type="button" onClick={onToggleType} className="ml-2 text-blue-600 font-bold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}