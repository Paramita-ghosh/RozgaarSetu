import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { motion } from 'framer-motion';
import { Phone, Loader2 } from 'lucide-react';

const LoginOTP = ({ setPhone, onSuccess }) => {
  const [phoneNumber, setLocalPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const recaptchaVerifierRef = useRef(null);

  useEffect(() => {
    // Only initialize once
    if (!recaptchaVerifierRef.current) {
      try {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("reCAPTCHA verified");
          },
          'expired-callback': () => {
            setError("reCAPTCHA expired. Please try again.");
          }
        });

      } catch (err) {
        console.error("reCAPTCHA Init Error:", err);
        setError("Failed to initialize reCAPTCHA. Check your site key.");
      }
    }

    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
        recaptchaVerifierRef.current = null;
      }
    };
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;

    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    try {
      const appVerifier = recaptchaVerifierRef.current;
      if (!appVerifier) throw new Error("reCAPTCHA verifier not ready");

      const confirmation = await signInWithPhoneNumber(auth, finalNumber, appVerifier);
      window.confirmationResult = confirmation;
      setPhone(finalNumber);
      onSuccess();
    } catch (err) {
      console.error("SMS Error:", err);

      if (err.code === 'auth/invalid-app-credential') {
        setError("App verification failed. Make sure App Check & reCAPTCHA are enabled and domains are whitelisted.");
      } else if (err.code === 'auth/invalid-phone-number') {
        setError("Invalid phone number. Please use format +91XXXXXXXXXX.");
      } else {
        setError("Failed to send SMS. Try again.");
      }

      // Reset reCAPTCHA for retry
      if (window.grecaptcha && recaptchaVerifierRef.current) {
        window.grecaptcha.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div id="recaptcha-container"></div>

      <div className="relative">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
        <div className="relative mt-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
            <Phone size={18} />
          </span>
          <input 
            type="tel" 
            placeholder="+91 9876543210"
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            onChange={(e) => setLocalPhone(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm font-medium ml-1">{error}</p>}

      <button 
        onClick={handleSendOTP}
        disabled={loading}
        className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:bg-slate-400"
      >
        {loading ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : "Send OTP"}
      </button>
    </motion.div>
  );
};

export default LoginOTP;
