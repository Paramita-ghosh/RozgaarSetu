// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { auth } from '../../firebase';
// import { signOut } from 'firebase/auth';
// import { Menu, X, User, LogOut, Briefcase } from 'lucide-react';

// const Navbar = () => {
//   const { user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       navigate('/');
//     } catch (error) {
//       console.error("Logout Error:", error);
//     }
//   };

//   return (
//     <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
          
//           {/* Logo */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
//               <div className="bg-blue-600 p-1.5 rounded-lg">
//                 <Briefcase size={20} className="text-white" />
//               </div>
//               <span>RozgaarSetu</span>
//             </Link>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link to="/" className="text-slate-600 hover:text-blue-600 font-medium transition">Home</Link>
//             <Link to="/search" className="text-slate-600 hover:text-blue-600 font-medium transition">Find Work</Link>
            
//             {user ? (
//               <div className="flex items-center gap-4">
//                 <Link to="/dashboard" className="flex items-center gap-2 text-slate-700 font-semibold bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition">
//                   <User size={18} />
//                   <span>Profile</span>
//                 </Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="text-slate-500 hover:text-red-600 transition p-2"
//                   title="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             ) : (
//               <Link 
//                 to="/login" 
//                 className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform active:scale-95"
//               >
//                 Login / Sign Up
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {isOpen && (
//         <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
//           <div className="px-4 pt-2 pb-6 space-y-2">
//             <Link to="/" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Home</Link>
//             <Link to="/search" className="block px-3 py-4 text-slate-700 font-medium border-b border-slate-50">Find Work</Link>
//             {user ? (
//               <>
//                 <Link to="/dashboard" className="block px-3 py-4 text-blue-600 font-bold">My Dashboard</Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full text-left px-3 py-4 text-red-500 font-bold"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="block px-3 py-4 text-blue-600 font-bold">Login / Sign Up</Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { Menu, X, User, LogOut, Briefcase, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="fixed w-full z-[100] bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/5 selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Glossy Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-300">
                <Briefcase size={22} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                Rozgaar<span className="text-blue-500">Setu</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-slate-400 hover:text-white font-bold text-sm uppercase tracking-widest transition-colors">Home</Link>
            <Link to="/search" className="flex items-center gap-2 text-slate-400 hover:text-blue-400 font-bold text-sm uppercase tracking-widest transition-colors">
              <Zap size={16} className="text-blue-500 animate-pulse" />
              Find Work
            </Link>
            
            {user ? (
              <div className="flex items-center gap-6 pl-6 border-l border-white/10">
                <Link to="/dashboard" className="flex items-center gap-2 text-white font-black bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-xl">
                  <User size={18} className="text-blue-400" />
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-500 transition-colors p-2 hover:bg-red-500/10 rounded-xl"
                  title="Logout"
                >
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="relative overflow-hidden group bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 transition-all active:scale-95"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-slate-300 p-2 bg-white/5 rounded-xl border border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1e293b] border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-10 space-y-4">
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-4 text-slate-300 font-bold border-b border-white/5 uppercase text-xs tracking-widest">Home</Link>
              <Link to="/search" onClick={() => setIsOpen(false)} className="block py-4 text-slate-300 font-bold border-b border-white/5 uppercase text-xs tracking-widest">Find Work</Link>
              
              {user ? (
                <div className="pt-4 space-y-4">
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block py-4 text-blue-400 font-black uppercase text-sm tracking-widest">My Dashboard</Link>
                  <button 
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="w-full text-left py-4 text-red-500 font-black uppercase text-sm tracking-widest"
                  >
                    Terminate Session
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="block py-6 text-blue-500 font-black uppercase text-sm tracking-widest">Login / Sign Up</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;