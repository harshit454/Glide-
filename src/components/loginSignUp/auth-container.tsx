"use client"

import React, { useState } from 'react';
import { GlideLogo } from './logo';
import { PhoneStep } from './phone-step';
import { OtpStep } from './otp-step';
import { cn } from '@/lib/utils';

export function AuthContainer() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  const handlePhoneSubmit = (number: string) => {
    setPhoneNumber(number);
    setStep('otp');
  };

  const handleBack = () => {
    setStep('phone');
  };

  const handleVerify = (otp: string) => {
    alert(`Successfully ${authType === 'login' ? 'logged in' : 'registered'}!`);
  };

  const toggleAuthType = () => {
    setAuthType(prev => prev === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-body">
      {/* Laptop Side Panel (Branding) */}
      <div className="hidden lg:flex flex-1 bg-slate-950 relative overflow-hidden items-start justify-center p-12 pt-[5%]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        
        <div className="relative z-10 text-white max-w-lg space-y-6">
          <GlideLogo className="!items-start !gap-4 mb-8" logoOnly />
          <h2 className="text-5xl font-bold leading-tight">Secure authentication for the modern web.</h2>
          <p className="text-xl text-slate-400 leading-relaxed font-light">
            Experience seamless logins with GlideAuth. Fast, secure, and built for your enterprise needs.
          </p>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-24">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 lg:border border-slate-100">
          {/* Mobile-only Logo */}
          <div className="mb-10 lg:hidden flex justify-center">
            <GlideLogo />
          </div>
          
          {/* Desktop-only Badge */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
               </div>
               <span className="text-sm font-bold text-primary tracking-widest uppercase">GlideAuth</span>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {step === 'phone' ? (
              <PhoneStep 
                onContinue={handlePhoneSubmit} 
                initialType={authType}
                onToggleType={toggleAuthType}
              />
            ) : (
              <OtpStep 
                phoneNumber={phoneNumber} 
                onBack={handleBack}
                onVerify={handleVerify}
              />
            )}
          </div>
        </div>
        
        <footer className="mt-12 text-slate-400 text-xs text-center space-y-2">
          <div className="flex justify-center gap-4 mb-2">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Support</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Glide Technologies. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
