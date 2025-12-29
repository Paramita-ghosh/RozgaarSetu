import React from 'react';
import { ShieldCheck, ShieldAlert, Award, IndianRupee } from 'lucide-react';

const WorkerProfile = ({ profile }) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
      <div className="flex justify-between items-start mb-6">
        <div className="bg-blue-100 p-4 rounded-2xl">
          <Award className="text-blue-600" size={32} />
        </div>
        {profile.isVerified ? (
          <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
            <ShieldCheck size={14}/> VERIFIED
          </div>
        ) : (
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
            <ShieldAlert size={14}/> PENDING
          </div>
        )}
      </div>

      <h3 className="text-2xl font-black text-slate-800 mb-1">{profile.userId.name || "Worker"}</h3>
      <p className="text-slate-500 text-sm mb-4">{profile.bio}</p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
              {skill}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">Rate</p>
            <p className="text-xl font-black text-slate-800 flex items-center">
              <IndianRupee size={16}/>{profile.pricePerHour}<span className="text-sm font-normal text-slate-400">/hr</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 font-bold uppercase">Trust Score</p>
            <p className="text-xl font-black text-blue-600">{profile.rating}/5.0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;