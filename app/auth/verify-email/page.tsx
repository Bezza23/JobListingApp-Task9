// app/auth/verify-email/page.tsx
"use client";

import { useState, useEffect, useRef, Suspense, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function VerifyEmailComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  // This ref is correctly typed
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus the first input on component mount
    inputRefs.current[0]?.focus();

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (isNaN(Number(value))) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Move focus to the next input if a value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Bonus: Add support for backspace to move focus backward
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const otpCode = otp.join('');

    if (otpCode.length !== 4 || !email) {
      setError("Please enter the 4-digit code.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://akil-backend.onrender.com/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, OTP: otpCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
      }

      router.push('/auth/login');

    // --- FIX 1: The 'any' error ---
    // Catch as 'unknown' for better type safety
    } catch (err: unknown) { 
      // Check if it's an Error instance before accessing .message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = () => {
    // TODO: Call your resend OTP API endpoint here
    setCountdown(30);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">Verify Email</h1>
        <p className="text-gray-600">
          We`ve sent a verification code to the email address you provided. 
          To complete the verification process, please enter the code here.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2 sm:space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                // --- FIX 2: The 'ref' error ---
                // Use a function block `{}` to ensure the function returns void.
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)} // Added for better UX
                className="w-14 h-14 sm:w-16 sm:h-16 text-3xl text-center border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
              />
            ))}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || otp.join('').length < 4}
            className="w-full py-3 font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
        </form>
        
        <p className="text-sm text-gray-600">
          Didn`t receive the code?{' '}
          <button 
             onClick={handleResendCode} 
             disabled={countdown > 0} 
             className="font-medium text-indigo-600 hover:underline disabled:text-gray-400 disabled:no-underline"
          >
            Resend code
          </button> 
          {countdown > 0 && ` in 0:${countdown.toString().padStart(2, '0')}`}
        </p>
      </div>
    </div>
  );
}

// Wrap the component in Suspense, which is required for useSearchParams
export default function VerifyEmailPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyEmailComponent />
        </Suspense>
    )
}