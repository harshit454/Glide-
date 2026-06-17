"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountrySelector } from './country-selector';
import { suggestPhoneNumberCorrection } from '@/ai/flows/phone-number-formatting-correction-flow';
import { Sparkles, Loader2, Phone, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhoneStepProps {
  onContinue: (phoneNumber: string) => void;
  initialType: 'login' | 'signup';
  onToggleType: () => void;
}

export function PhoneStep({ onContinue, initialType, onToggleType }: PhoneStepProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const [isAiCorrecting, setIsAiCorrecting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const fullNumber = `+${countryCode}${phoneNumber}`;
  const isValid = phoneNumber.length >= 7;

  const handleAiCorrection = async () => {
    if (phoneNumber.length < 5) return;
    setIsAiCorrecting(true);
    try {
      const result = await suggestPhoneNumberCorrection({ phoneNumber: fullNumber });
      if (result.correctedPhoneNumber !== fullNumber) {
        setAiSuggestion(result.correctedPhoneNumber);
      } else {
        setAiSuggestion(null);
      }
    } catch (err) {
      console.error("AI correction failed", err);
    } finally {
      setIsAiCorrecting(false);
    }
  };

  const applySuggestion = () => {
    if (!aiSuggestion) return;
    const local = aiSuggestion.replace(/^\+\d+/, '');
    setPhoneNumber(local);
    setAiSuggestion(null);
  };

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
          <div className="flex items-center h-16 w-full rounded-2xl border-2 border-slate-100 bg-slate-50 overflow-hidden shadow-sm focus-within:border-primary/30 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
            <div className="pl-4 pr-1 shrink-0">
               <Phone className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="flex-1 flex items-center h-full">
              <CountrySelector value={countryCode} onChange={setCountryCode} />
              <Input
                type="tel"
                placeholder="555-123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onBlur={handleAiCorrection}
                className="border-0 bg-transparent focus-visible:ring-0 text-lg font-semibold h-full px-4 placeholder:text-slate-300 placeholder:font-normal"
              />
            </div>
            
            <div className="pr-4">
              {isAiCorrecting ? (
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
              ) : (
                <div className="w-5 h-5" />
              )}
            </div>
          </div>

          {/* AI Suggestion Tooltip */}
          {aiSuggestion && (
            <div className="absolute -top-14 left-0 right-0 z-10 animate-in fade-in zoom-in duration-300 px-2">
              <div 
                onClick={applySuggestion}
                className="bg-primary text-white rounded-xl py-2 px-4 text-xs flex items-center justify-between cursor-pointer shadow-lg hover:bg-primary/95 transition-colors border border-white/20"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  <span>Standard format: <strong>{aiSuggestion}</strong></span>
                </div>
                <button type="button" className="ml-2 font-bold underline decoration-white/30 underline-offset-2">Apply</button>
              </div>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={!isValid}
          className={cn(
            "w-full h-14 rounded-2xl text-lg font-bold transition-all shadow-lg",
            isValid 
              ? "bg-primary text-white hover:bg-primary/90 shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          )}
        >
          Continue
        </Button>

        <div className="text-center space-y-6">
          <p className="text-slate-400 text-[13px] font-medium leading-relaxed">
            By continuing, you agree to our<br />
            <span className="text-primary font-bold hover:underline cursor-pointer">Terms & Conditions</span>
          </p>

          <div className="h-px bg-slate-100 w-full" />

          <p className="text-slate-600 text-sm font-medium">
            {initialType === 'login' ? "New here?" : "Joined already?"}
            <button 
              type="button" 
              onClick={onToggleType}
              className="ml-2 text-primary font-bold hover:underline"
            >
              {initialType === 'login' ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
