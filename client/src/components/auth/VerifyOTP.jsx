// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const VerifyOTP = ({ phone }) => {
//     const [otp, setOtp] = useState("");
//     const navigate = useNavigate();

//     const handleVerify = async () => {
//         try {
//             const result = await window.confirmationResult.confirm(otp);
//             const idToken = await result.user.getIdToken();

//             // Sync with your Node.js Backend
//             const response = await axios.post('http://localhost:5000/api/auth/sync', {}, {
//                 headers: { Authorization: `Bearer ${idToken}` }
//             });

//             if (response.data.success) {
//                 // Save user info to local storage/context
//                 localStorage.setItem('token', idToken);
//                 localStorage.setItem('user', JSON.stringify(response.data.user));
//                 navigate('/dashboard'); // Redirect to search/dashboard
//             }
//         } catch (err) {
//             alert("Incorrect OTP or Session Expired");
//         }
//     };

//     return (
//         <div className="space-y-4 text-center">
//             <input 
//                 type="text" 
//                 maxLength={6}
//                 placeholder="000000"
//                 className="w-full text-center text-2xl tracking-[0.5em] p-4 bg-slate-50 border rounded-2xl outline-none"
//                 onChange={(e) => setOtp(e.target.value)}
//             />
//             <button 
//                 onClick={handleVerify}
//                 className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition"
//             >
//                 Verify & Login
//             </button>
//         </div>
//     );
// };

// export default VerifyOTP;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

const VerifyOTP = ({ phone, onBack }) => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("Please enter the 6-digit code.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // 1. Verify OTP with Firebase
            const result = await window.confirmationResult.confirm(otp);
            const idToken = await result.user.getIdToken();

            // 2. Sync with your Node.js Backend
            // Ensure your backend URL is correct (e.g., using environment variables)
            const response = await axios.post('http://localhost:5000/api/auth/sync', {}, {
                headers: { Authorization: `Bearer ${idToken}` }
            });

            if (response.data.success) {
                // 3. Save session data
                localStorage.setItem('token', idToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                // Success redirect
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Verification Error:", err);
            setError(err.code === 'auth/code-expired' 
                ? "OTP expired. Please try again." 
                : "Invalid OTP. Please check the code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Verification code sent to
                </p>
                <p className="text-white font-black mt-1">{phone}</p>
            </div>

            <div className="relative group">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">
                    Enter 6-Digit Code
                </label>
                <input 
                    type="text" 
                    maxLength={6}
                    placeholder="000000"
                    autoFocus
                    className="w-full mt-2 text-center text-3xl font-black tracking-[0.4em] py-5 bg-white border border-white/20 rounded-2xl text-black placeholder:text-slate-700 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all duration-300"
                    onChange={(e) => setOtp(e.target.value)}
                    disabled={loading}
                />

            </div>

            {error && (
                <motion.p initial={{ opacity: 0 }} className="text-rose-400 text-xs font-bold text-center uppercase tracking-wider">
                    {error}
                </motion.p>
            )}

            <div className="flex flex-col gap-3">
                <button 
                    onClick={handleVerify}
                    disabled={loading || otp.length < 6}
                    className="relative w-full py-5 overflow-hidden group bg-blue-600 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all duration-500 flex justify-center items-center gap-3 disabled:bg-slate-800 disabled:text-slate-600"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                            <><Loader2 className="animate-spin" size={20} /> VERIFYING...</>
                        ) : (
                            <>AUTHORIZE LOGIN <ShieldCheck size={18} /></>
                        )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                </button>

                <button 
                    onClick={onBack}
                    className="text-slate-500 hover:text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors py-2"
                >
                    <ArrowLeft size={14} /> Change Phone Number
                </button>
            </div>
        </motion.div>
    );
};

export default VerifyOTP;