import React from 'react';
import { ShieldCheck, IndianRupee, Briefcase, Zap } from 'lucide-react';
import DistanceBadge from '../maps/DistanceBadge';
import { getDistance } from '../../utils/calculateDistance'; // Ensure this is imported

const WorkerCard = ({ worker, userCoords }) => {
  // Logic remains identical: calculate distance based on userCoords and worker coordinates
  const distance = userCoords?.lat && worker?.location?.coordinates
    ? getDistance(
        userCoords.lat,
        userCoords.lng,
        worker.location.coordinates[1],
        worker.location.coordinates[0]
      )
    : "0.0";

  return (
    <div className="relative group overflow-hidden bg-slate-800/40 backdrop-blur-md border border-white/10 p-5 rounded-[2rem] transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.15)]">
      
      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <DistanceBadge distance={distance} />
        
        {worker.isVerified && (
          <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-tighter">AI Verified</span>
          </div>
        )}
      </div>

      <div className="mb-4 relative z-10">
        <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors duration-300">
          {worker.userId?.name || "Verified Pro"}
        </h3>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
          Local Service Partner
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6 relative z-10">
        {worker.skills.map((skill, i) => (
          <span 
            key={i} 
            className="text-[9px] bg-white/5 border border-white/5 text-slate-300 px-2.5 py-1 rounded-lg font-bold uppercase tracking-tight"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-500 uppercase">Rate</span>
          <div className="flex items-center text-white font-black text-xl">
            <IndianRupee size={16} className="text-blue-500" />
            <span>{worker.pricePerHour}</span>
            <span className="text-[10px] font-normal text-slate-500 ml-1">/hr</span>
          </div>
        </div>

        <button className="relative overflow-hidden group/btn bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2">
          <Zap size={14} className="fill-current" />
          Hire Now
          
          {/* Internal button shine effect */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]" />
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;