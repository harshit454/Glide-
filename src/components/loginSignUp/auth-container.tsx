import React, { useState } from 'react';
import { GlideLogo } from './logo';
import { PhoneStep } from './phone-step';
import { OtpStep } from './otp-step';
import { RegisterStep } from './register-step';
import { Mail, User, Lock } from 'lucide-react';

interface AuthContainerProps {
  onAuthSuccess?: () => void;
}

type LoginMethod = 'phone' | 'email' | 'username';

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [value ,setvalue]= useState('');
  // Login Configuration States
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('phone');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handlePhoneSubmit = (number: string) => {
    setPhoneNumber(number);
    setStep('otp');
  };
 
  const handleBack = () => {
    setStep('phone');
  };

  const handleVerify = (otp: string) => {
    alert(`Successfully verified account!`);
    if (onAuthSuccess) onAuthSuccess();
  };

  const handlePasswordLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = loginMethod === 'email' ? email : username;
    alert(`Logging in with ${loginMethod}: ${identifier}`);
    if (onAuthSuccess) onAuthSuccess();
  };

  const handleRegistrationSubmit = (formData: any) => {
    alert(`Registration Successful for username: ${formData.username}! Directing to verification...`);
    setPhoneNumber(formData.phoneNumber);
    setStep('otp'); // Go to OTP verification step to authenticate the new user
  };

  const toggleAuthType = () => {
    setAuthType(prev => prev === 'login' ? 'signup' : 'login');
  };
   console.log("zxcvbnm",value);

  return (

    <div className="min-h-screen w-full bg-slate-50 flex font-body">
      {/* Side Branding Panel */}
      <div className="hidden lg:flex flex-1 bg-slate-950 relative overflow-hidden items-start justify-center p-12 pt-[5%]">
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

      {/* Main Form Box Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-24">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 lg:border border-slate-100">
          
          <div className="mb-6 lg:hidden flex justify-center">
            <GlideLogo />
          </div>

          {/* Conditional Rendering: Login vs Registration */}
          {authType === 'login' ? (
            <div className="w-full flex flex-col space-y-6">
              <div className="text-center lg:text-left space-y-1">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back!</h2>
                <p className="text-slate-500 font-medium text-sm">Choose your preferred login method</p>
              </div>

              {/* Login Tabs Menu Choice */}
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold text-slate-600">
                <button 
                  type="button"
                  disabled={phoneNumber.length !== 10}
                  onChange={(e) => setvalue(e.target.value)}
                  
                  onClick={() => setLoginMethod('phone')}
                  className={`py-2 rounded-lg transition-all ${loginMethod === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'}`}
                >
                  Phone
                </button>
                <button 
                  type="button"
                  onClick={() => setLoginMethod('email')}
                  className={`py-2 rounded-lg transition-all ${loginMethod === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'}`}
                >
                  Email
                </button>
                <button 
                  type="button"
                  onClick={() => setLoginMethod('username')}
                  className={`py-2 rounded-lg transition-all ${loginMethod === 'username' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'}`}
                >
                  Username
                </button>
              </div>

              {/* Login Form Segments */}
              {loginMethod === 'phone' ? (
                step === 'phone' ? (
                  <PhoneStep onContinue={handlePhoneSubmit} initialType="login" onToggleType={toggleAuthType} />
                ) : (
                  <OtpStep phoneNumber={phoneNumber} onBack={handleBack} onVerify={handleVerify} />
                )
              ) : (
                <form onSubmit={handlePasswordLoginSubmit} className="space-y-4">
                  {loginMethod === 'email' ? (
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
                  ) : (
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
                  )}

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

                  <button 
                    type="submit"
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    Log In
                  </button>

                  <div className="text-center pt-4 border-t border-slate-100">
                    <p className="text-slate-600 text-sm font-medium">
                      New here?
                      <button type="button" onClick={toggleAuthType} className="ml-2 text-blue-600 font-bold hover:underline">
                        Sign up
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          ) : (
            /* Registration Form Block */
            step === 'phone' ? (
              <RegisterStep 
                onRegisterSubmit={handleRegistrationSubmit} 
                onToggleType={toggleAuthType} 
              />
            ) : (
              <OtpStep phoneNumber={phoneNumber} onBack={handleBack} onVerify={handleVerify} />
            )
          )}

        </div>
      </div>
    </div>
  );
}