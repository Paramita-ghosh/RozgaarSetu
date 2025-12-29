import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOTP = ({ phone }) => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            const result = await window.confirmationResult.confirm(otp);
            const idToken = await result.user.getIdToken();

            // Sync with your Node.js Backend
            const response = await axios.post('http://localhost:5000/api/auth/sync', {}, {
                headers: { Authorization: `Bearer ${idToken}` }
            });

            if (response.data.success) {
                // Save user info to local storage/context
                localStorage.setItem('token', idToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard'); // Redirect to search/dashboard
            }
        } catch (err) {
            alert("Incorrect OTP or Session Expired");
        }
    };

    return (
        <div className="space-y-4 text-center">
            <input 
                type="text" 
                maxLength={6}
                placeholder="000000"
                className="w-full text-center text-2xl tracking-[0.5em] p-4 bg-slate-50 border rounded-2xl outline-none"
                onChange={(e) => setOtp(e.target.value)}
            />
            <button 
                onClick={handleVerify}
                className="w-full py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition"
            >
                Verify & Login
            </button>
        </div>
    );
};

export default VerifyOTP;