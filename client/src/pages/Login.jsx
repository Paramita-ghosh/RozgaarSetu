import React, { useState } from 'react';
import LoginOTP from '../components/auth/LoginOTP';
import VerifyOTP from '../components/auth/VerifyOTP';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
            <p className="text-slate-500 mt-2">Enter your phone number to continue</p>
          </div>

          <AnimatePresence mode='wait'>
            {!isOtpSent ? (
              <LoginOTP 
                key="login" 
                setPhone={setPhone} 
                onSuccess={() => setIsOtpSent(true)} 
              />
            ) : (
              <VerifyOTP 
                key="verify" 
                phone={phone} 
                onBack={() => setIsOtpSent(false)} 
              />
            )}
          </AnimatePresence>
        </div>
        
        <div className="bg-slate-900 p-4 text-center">
          <p className="text-slate-400 text-sm">
            By continuing, you agree to RozgaarSetu's Terms of Service.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;