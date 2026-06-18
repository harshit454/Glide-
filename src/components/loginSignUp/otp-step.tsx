import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

interface OtpStepProps {
  phoneNumber: string;
  onBack: () => void;
  onVerify: (otp: string) => void;
}

export function OtpStep({ phoneNumber, onBack, onVerify }: OtpStepProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length === 6) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setIsSuccess(true);
        setTimeout(() => onVerify(code), 1000);
      }, 1500);
    }
  };

  const resendOtp = () => {
    setTimer(30);
  };

  const isOtpComplete = otp.join('').length === 6;

  return (
    <div className="w-full flex flex-col space-y-8">
      <button 
        onClick={onBack}
        className="self-start flex items-center gap-2 text-slate-400 font-medium hover:text-blue-600 transition-colors mb-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to edit number
      </button>

      <div className="text-center lg:text-left space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Verify OTP</h1>
        <p className="text-slate-500 font-medium">
          Enter the 6-digit code sent to <span className="text-slate-900 font-bold">{phoneNumber}</span>
        </p>
      </div>

      <div className="flex justify-between gap-2 lg:gap-3">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={el => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            className="w-full h-16 text-center text-2xl font-bold border-2 border-slate-100 rounded-2xl bg-slate-50 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 focus:bg-white transition-all outline-none"
            maxLength={1}
          />
        ))}
      </div>

      <div className="space-y-6 pt-4">
        <button 
          onClick={handleVerify}
          disabled={!isOtpComplete || isVerifying || isSuccess}
          className={`w-full h-14 rounded-2xl text-lg font-semibold flex items-center justify-center transition-all shadow-lg ${
            isOtpComplete && !isVerifying && !isSuccess
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/25 cursor-pointer"
              : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {isVerifying ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : isSuccess ? (
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
          ) : (
            "Verify Account"
          )}
        </button>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-slate-400 text-sm font-medium">
              Didn't receive code? Resend in <span className="text-blue-600 font-bold">{timer}s</span>
            </p>
          ) : (
            <button 
              onClick={resendOtp}
              className="text-blue-600 font-bold hover:underline"
            >
              Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}