import React from 'react';
import { ChevronDown } from 'lucide-react';

const countries = [
  { label: "India", code: "IN", phone: "91" },
  { label: "United States", code: "US", phone: "1" },
  { label: "United Kingdom", code: "GB", phone: "44" },
  { label: "Canada", code: "CA", phone: "1" },
  { label: "Australia", code: "AU", phone: "61" },
  { label: "Germany", code: "DE", phone: "49" },
  { label: "France", code: "FR", phone: "33" },
  { label: "United Arab Emirates", code: "AE", phone: "971" },
  { label: "Singapore", code: "SG", phone: "65" },
];

interface CountrySelectorProps {
  value: string;
  onChange: (phoneCode: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="relative flex items-center h-full border-r border-slate-200 bg-transparent hover:bg-slate-100/50 transition-colors">
      <span className="pl-3 font-semibold text-lg text-slate-800 pointer-events-none">+{value}</span>
      <ChevronDown className="h-4 w-4 shrink-0 opacity-40 ml-1 mr-2 pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer font-semibold"
      >
        {countries.map((country) => (
          <option key={`${country.code}-${country.phone}`} value={country.phone}>
            {country.label} (+{country.phone})
          </option>
        ))}
      </select>
    </div>
  );
}