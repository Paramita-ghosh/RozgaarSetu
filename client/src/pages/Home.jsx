// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Hammer, MapPin, ShieldCheck, ArrowRight, Star } from 'lucide-react';
// import Navbar from '../components/common/Navbar';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-white">
      
      
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-20 overflow-hidden">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-wrap items-center">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="w-full lg:w-1/2"
//             >
//               {/* Trust Badge */}
//               <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6 font-bold text-sm">
//                 <Star size={16} fill="currentColor" />
//                 <span>AI-Powered Verification for Trusted Labor</span>
//               </div>

//               <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6">
//                 Direct access to <span className="text-blue-600">Verified</span> local talent.
//               </h1>
//               <p className="text-xl text-slate-500 mb-10 max-w-lg leading-relaxed">
//                 Connect instantly with verified plumbers, electricians, and technicians in your immediate neighborhood using hyperlocal AI.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button 
//                   onClick={() => navigate('/search')}
//                   className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition flex items-center justify-center gap-2"
//                 >
//                   Find a Worker
//                   <ArrowRight size={20} />
//                 </button>
//                 <button 
//                   onClick={() => navigate('/dashboard')}
//                   className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition"
//                 >
//                   Register as Worker
//                 </button>
//               </div>

//               {/* Stats/Proof */}
//               <div className="mt-12 flex items-center gap-8 border-t border-slate-100 pt-8">
//                 <div>
//                   <p className="text-2xl font-black text-slate-900">5km</p>
//                   <p className="text-sm text-slate-400 font-bold uppercase">Search Radius</p>
//                 </div>
//                 <div className="w-px h-10 bg-slate-100" />
//                 <div>
//                   <p className="text-2xl font-black text-slate-900">100%</p>
//                   <p className="text-sm text-slate-400 font-bold uppercase">AI Verified</p>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="w-full lg:w-1/2 mt-16 lg:mt-0 relative"
//             >
//               {/* Floating Map Decorator */}
//               <div className="absolute -top-10 -left-10 bg-white p-4 rounded-3xl shadow-2xl z-10 hidden md:block border border-slate-50">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
//                     <MapPin className="text-green-600" />
//                   </div>
//                   <div>
//                     <p className="text-xs font-black text-slate-400 uppercase">Worker Nearby</p>
//                     <p className="text-sm font-bold text-slate-800">0.8 km from you</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
//                 <img 
//                   src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
//                   alt="Technician working" 
//                   className="object-cover w-full h-[500px]" 
//                 />
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="bg-slate-50 py-24">
//         <div className="container mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl font-black text-slate-900 mb-4">Why use RozgaarSetu?</h2>
//             <p className="text-slate-500 font-medium">Removing the friction from local labor hiring.</p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <FeatureCard 
//               icon={<ShieldCheck className="w-12 h-12 text-blue-600" />}
//               title="Verified Pros"
//               desc="Every worker is verified using Google Cloud Vision OCR to ensure real government IDs match real people."
//             />
//             <FeatureCard 
//               icon={<MapPin className="w-12 h-12 text-blue-600" />}
//               title="Hyperlocal Search"
//               desc="We don't just find workers; we find the ones within walking distance of your current coordinates."
//             />
//             <FeatureCard 
//               icon={<Hammer className="w-12 h-12 text-blue-600" />}
//               title="Direct Booking"
//               desc="Forget negotiation hassles. View transparent pricing and book instantly with our real-time system."
//             />
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// const FeatureCard = ({ icon, title, desc }) => (
//   <motion.div 
//     whileHover={{ y: -10 }}
//     className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
//   >
//     <div className="mb-6">{icon}</div>
//     <h3 className="text-2xl font-black text-slate-900 mb-4">{title}</h3>
//     <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
//   </motion.div>
// );

// export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hammer, MapPin, ShieldCheck, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#0E1324] to-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative pt-36 pb-24">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/20 blur-[120px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-y-20">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-full lg:w-1/2"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 text-blue-400 px-5 py-2 rounded-full mb-8 font-bold text-sm shadow-lg"
              >
                <Star size={16} fill="currentColor" />
                AI-Powered Verification for Trusted Labor
              </motion.div>

              <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-8">
                Direct access to{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Verified
                </span>{' '}
                local talent.
              </h1>

              <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-xl leading-relaxed">
                Instantly connect with AI-verified plumbers, electricians, and technicians around you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/search')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  Find a Worker
                  <ArrowRight size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate('/dashboard')}
                  className="bg-white/10 backdrop-blur-xl border border-white/10 text-white px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition"
                >
                  Register as Worker
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-16 flex items-center gap-10 border-t border-white/10 pt-10">
                <Stat label="Search Radius" value="5 km" />
                <div className="w-px h-10 bg-white/10" />
                <Stat label="AI Verified" value="100%" />
              </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              {/* floating card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-10 -left-10 hidden md:block z-20"
              >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
                      <MapPin className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-black text-slate-400">
                        Worker Nearby
                      </p>
                      <p className="text-sm font-bold">0.8 km from you</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="relative rounded-[2.8rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
                <img
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                  alt="Technician working"
                  className="object-cover w-full h-[520px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-gradient-to-b from-black to-[#0B0F1A]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Why RozgaarSetu?</h2>
            <p className="text-slate-400 text-lg">
              Removing friction from local labor hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard
              icon={<ShieldCheck />}
              title="Verified Professionals"
              desc="Every worker is AI-verified using secure government ID validation."
            />
            <FeatureCard
              icon={<MapPin />}
              title="Hyperlocal Matching"
              desc="Find skilled workers within walking distance of your location."
            />
            <FeatureCard
              icon={<Hammer />}
              title="Instant Booking"
              desc="Transparent pricing and real-time worker availability."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ value, label }) => (
  <div>
    <p className="text-3xl font-black">{value}</p>
    <p className="text-xs text-slate-400 uppercase font-bold">{label}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <motion.div
    whileHover={{ y: -12 }}
    transition={{ type: 'spring', stiffness: 200 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl"
  >
    <div className="mb-6 text-blue-400">{icon}</div>
    <h3 className="text-2xl font-black mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;
