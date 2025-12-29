// import React, { useState } from 'react';
// import { registerWorker } from '../../api/worker.api';
// import { useAuth } from '../../context/AuthContext';
// import { auth } from '../../firebase'; 
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, CheckCircle, AlertCircle, Loader2, MapPin, LocateFixed } from 'lucide-react';

// const WorkerForm = ({ onUpdate }) => {
//   const { user } = useAuth();
//   const [formData, setFormData] = useState({ skills: "", bio: "", price: "" });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [coordsAcquired, setCoordsAcquired] = useState(false);
//   const [message, setMessage] = useState({ type: '', text: '' });

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: '', text: '' });

//     if (!navigator.geolocation) {
//       setMessage({ type: 'error', text: "Geolocation is not supported by your browser." });
//       setLoading(false);
//       return;
//     }

//     // Explicitly requesting location during submission to ensure freshness
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { longitude, latitude } = position.coords;
//         setCoordsAcquired(true);

//         try {
//           const currentUser = auth.currentUser;
//           if (!currentUser) throw new Error("Authentication session not found.");
          
//           // Force a fresh token to prevent the 401 'id-token-expired' error
//           const token = await currentUser.getIdToken(true);

//           const data = new FormData();
//           data.append("userId", user.uid);
//           data.append("skills", JSON.stringify(formData.skills.split(",").map(s => s.trim())));
//           data.append("pricePerHour", formData.price);
//           data.append("bio", formData.bio);
//           data.append("idCard", file);
          
//           // GeoJSON Point data for MongoDB 2dsphere index
//           data.append("lng", longitude);
//           data.append("lat", latitude);

//           const res = await registerWorker(data, token);
          
//           if (res.data.verified) {
//             setMessage({ type: 'success', text: "AI Verified! Your profile and live location are active." });
//           } else {
//             setMessage({ type: 'warning', text: "Profile created. ID failed AI check and needs manual review." });
//           }
//           if (onUpdate) setTimeout(() => onUpdate(), 2000); // Delayed update for UX
//         } catch (err) {
//           console.error("Registration Error:", err);
//           setMessage({ 
//             type: 'error', 
//             text: err.response?.status === 401 ? "Session expired. Please log in again." : "Registration failed. Ensure ID image is clear." 
//           });
//         } finally {
//           setLoading(false);
//         }
//       },
//       (geoError) => {
//         setMessage({ type: 'error', text: "Location permission is mandatory for hyperlocal work." });
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 15000 }
//     );
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-50"
//     >
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center gap-4">
//           <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
//              <MapPin size={24} />
//           </div>
//           <div>
//             <h2 className="text-2xl font-black text-slate-800">Worker Registration</h2>
//             <p className="text-sm text-slate-400 font-medium">Verify your skills & location</p>
//           </div>
//         </div>
        
//         {/* Real-time location acquisition indicator */}
//         <AnimatePresence>
//           {coordsAcquired && (
//             <motion.div 
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-bold border border-green-100"
//             >
//               <LocateFixed size={14} /> GPS LOCKED
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
      
//       {message.text && (
//         <motion.div 
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           className={`p-4 mb-6 rounded-2xl flex items-center gap-3 ${
//             message.type === 'success' ? 'bg-green-50 text-green-700' : 
//             message.type === 'warning' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
//           }`}
//         >
//           {message.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
//           <p className="font-bold text-sm">{message.text}</p>
//         </motion.div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Professional Skills</label>
//             <input 
//               type="text" required placeholder="e.g. Plumber, Electrician"
//               className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               onChange={(e) => setFormData({...formData, skills: e.target.value})}
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Hourly Rate (₹)</label>
//             <input 
//               type="number" required placeholder="500"
//               className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//               onChange={(e) => setFormData({...formData, price: e.target.value})}
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Professional Bio</label>
//           <textarea 
//             required placeholder="Tell customers about your experience..."
//             className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl h-32 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
//             onChange={(e) => setFormData({...formData, bio: e.target.value})}
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">ID Verification (Govt. Issued)</label>
//           <div className="relative group overflow-hidden rounded-[2rem]">
//             <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-[2rem] p-10 bg-slate-50 group-hover:bg-slate-100 group-hover:border-blue-300 transition-all">
//               <Upload className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={32} />
//               <p className="text-sm font-bold text-slate-700">{file ? file.name : "Drop ID Image or Click to Browse"}</p>
//               <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
//               <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
//             </div>
//           </div>
//         </div>

//         <button 
//           disabled={loading}
//           className="w-full py-5 bg-slate-900 text-white font-black rounded-[2rem] hover:bg-blue-600 transition-all flex justify-center items-center gap-3 shadow-xl shadow-slate-200 disabled:bg-slate-400"
//         >
//           {loading ? (
//             <>
//               <Loader2 className="animate-spin" size={20}/> 
//               <span>AI SCANNING ID...</span>
//             </>
//           ) : (
//             <>
//               <span>ACTIVATE PROFILE</span>
//               <MapPin size={18} />
//             </>
//           )}
//         </button>
        
//         <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tighter">
//           By activating, you agree to share your real-time location for hyperlocal hiring.
//         </p>
//       </form>
//     </motion.div>
//   );
// };

// export default WorkerForm;

import React, { useState } from 'react';
import { registerWorker } from '../../api/worker.api';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle, AlertCircle, Loader2, MapPin, LocateFixed, Zap, Shield } from 'lucide-react';

const WorkerForm = ({ onUpdate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ skills: "", bio: "", price: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coordsAcquired, setCoordsAcquired] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!navigator.geolocation) {
      setMessage({ type: 'error', text: "Geolocation is not supported by your browser." });
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { longitude, latitude } = position.coords;
        setCoordsAcquired(true);

        try {
          const currentUser = auth.currentUser;
          if (!currentUser) throw new Error("Authentication session not found.");
          const token = await currentUser.getIdToken(true);

          const data = new FormData();
          data.append("userId", user.uid);
          data.append("skills", JSON.stringify(formData.skills.split(",").map(s => s.trim())));
          data.append("pricePerHour", formData.price);
          data.append("bio", formData.bio);
          data.append("idCard", file);
          data.append("lng", longitude);
          data.append("lat", latitude);

          const res = await registerWorker(data, token);
          
          if (res.data.verified) {
            setMessage({ type: 'success', text: "AI Verified! Your profile and live location are active." });
          } else {
            setMessage({ type: 'warning', text: "Profile created. ID failed AI check and needs manual review." });
          }
          if (onUpdate) setTimeout(() => onUpdate(), 2000); 
        } catch (err) {
          console.error("Registration Error:", err);
          setMessage({ 
            type: 'error', 
            text: err.response?.status === 401 ? "Session expired. Please log in again." : "Registration failed. Ensure ID image is clear." 
          });
        } finally {
          setLoading(false);
        }
      },
      (geoError) => {
        setMessage({ type: 'error', text: "Location permission is mandatory for hyperlocal work." });
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 max-w-2xl mx-auto"
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-blue-600 rounded-2xl text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] animate-pulse">
             <Shield size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Node Activation</h2>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Verified Professional Entry</p>
          </div>
        </div>
        
        <AnimatePresence>
          {coordsAcquired && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl text-[10px] font-black border border-emerald-500/20 tracking-widest uppercase"
            >
              <LocateFixed size={14} className="animate-spin-slow" /> GPS LOCKED
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Message Feedback */}
      <AnimatePresence>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 mb-8 rounded-2xl flex items-center gap-3 border backdrop-blur-md ${
              message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 
              message.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 
              'bg-rose-500/10 border-rose-500/20 text-rose-400'
            }`}
          >
            {message.type === 'success' ? <CheckCircle size={20}/> : <AlertCircle size={20}/>}
            <p className="font-bold text-sm tracking-tight">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Skill Spectrum</label>
            <input 
              type="text" required placeholder="Plumber, Tech, etc."
              className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all duration-300"
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Rate / Hour (₹)</label>
            <input 
              type="number" required placeholder="500"
              className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all duration-300"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Professional Summary</label>
          <textarea 
            required placeholder="Detail your operational experience..."
            className="w-full p-4 bg-white/5 border border-white/5 rounded-2xl text-white placeholder:text-slate-600 h-32 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none"
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2">ID Asset Upload</label>
          <div className="relative group overflow-hidden rounded-[2rem]">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[2rem] p-10 bg-white/5 group-hover:bg-white/10 group-hover:border-blue-500/30 transition-all duration-500">
              <Upload className="text-blue-500 mb-4 group-hover:scale-110 transition-transform duration-500" size={36} />
              <p className="text-sm font-bold text-slate-300">{file ? file.name : "Secure ID Ingestion"}</p>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">JPG, PNG Analysis Active</p>
              <input type="file" required className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>
        </div>

        <button 
          disabled={loading}
          className="relative w-full py-5 overflow-hidden group bg-blue-600 text-white font-black rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all duration-500 flex justify-center items-center gap-3 disabled:bg-slate-800 disabled:text-slate-600"
        >
          <span className="relative z-10 flex items-center gap-3 tracking-[0.1em]">
            {loading ? (
              <><Loader2 className="animate-spin" size={20}/> <span>SYNCHRONIZING...</span></>
            ) : (
              <><span>ACTIVATE NODE</span> <Zap size={18} className="fill-current" /></>
            )}
          </span>
          {/* Button Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
        
        <p className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-[0.3em] opacity-60">
          Geospatial ping will be broadcasted upon activation
        </p>
      </form>
    </motion.div>
  );
};

export default WorkerForm;