
// import React, { useEffect, useState } from 'react';
// import { fetchWorkerProfile } from '../api/worker.api';
// import WorkerForm from '../components/workers/WorkerForm';
// import WorkerProfile from '../components/workers/WorkerProfile';
// import { useAuth } from '../context/AuthContext';

// const WorkerDashboard = () => {
//   const { user } = useAuth();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to refresh profile after form submission
//   const loadProfile = async () => {
//   if (!user?.uid) {
//     setLoading(false);
//     return;
//   }

//   try {
//     const res = await fetchWorkerProfile(user.uid);
//     setProfile(res.data);
//   } catch (err) {
//     setProfile(null);
//     console.log("No profile found yet.");
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(() => {
//   loadProfile();
// }, [user]);


//   if (loading) return <div className="p-20 text-center">Loading Console...</div>;

//   return (
//     <div className="min-h-screen bg-slate-50 py-12 px-6">
//       <div className="max-w-4xl mx-auto">
//         {profile ? (
//           // If profile exists, show their stats and verification status
//           <div className="space-y-8">
//             <h1 className="text-3xl font-black">Worker Dashboard</h1>
//             <WorkerProfile profile={profile} />
//           </div>
//         ) : (
//           // If no profile, show the Registration Form with AI Vision
//           <WorkerForm onUpdate={loadProfile} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkerDashboard;

import React, { useEffect, useState } from 'react';
import { fetchWorkerProfile } from '../api/worker.api';
import WorkerForm from '../components/workers/WorkerForm';
import WorkerProfile from '../components/workers/WorkerProfile';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Activity, LayoutDashboard, ShieldCheck } from 'lucide-react';

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetchWorkerProfile(user.uid);
      setProfile(res.data);
    } catch (err) {
      setProfile(null);
      console.log("No profile found yet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
          <Loader2 className="animate-spin text-blue-500 relative z-10" size={48} />
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-[0.3em] text-xs">Initializing Console...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-6 relative overflow-hidden">
      {/* Glossy Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {profile ? (
            <motion.div 
              key="active-dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10"
            >
              {/* Header Panel */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/5 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)] text-white">
                    <LayoutDashboard size={28} />
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Worker Console</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                      <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">System Active</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-white/5">
                  <div className="px-4 py-2 text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Availability</p>
                    <p className="text-sm font-black text-white">On Radar</p>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="px-4 py-2 text-center">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Status</p>
                    <div className="flex items-center gap-1 text-blue-400">
                      <ShieldCheck size={14} />
                      <p className="text-sm font-black">{profile.isVerified ? 'Verified' : 'Pending'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="bg-slate-900/30 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden">
                <WorkerProfile profile={profile} />
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="registration-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                  <Activity size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">New Node Required</span>
                </div>
                <h2 className="text-4xl font-black text-white mb-4">Initialize Profile</h2>
                <p className="text-slate-500 max-w-md mx-auto">Complete the AI verification to start appearing on the local hiring radar.</p>
              </div>
              
              <div className="w-full">
                <WorkerForm onUpdate={loadProfile} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '50px 50px' }} 
      />
    </div>
  );
};

export default WorkerDashboard;