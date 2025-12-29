import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Twitter, Github, Linkedin, Mail, Zap, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] border-t border-white/5 pt-8 pb-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                <Briefcase size={20} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">
                Rozgaar<span className="text-blue-500">Setu</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              The first AI-powered hyperlocal bridge connecting verified local talent with immediate opportunities.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Github size={18} />} />
              <SocialIcon icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6">Network</h4>
            <ul className="space-y-4">
              <FooterLink to="/search" label="Radar Search" icon={<Zap size={14} />} />
              <FooterLink to="/dashboard" label="Worker Console" />
              <FooterLink to="/login" label="System Access" />
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-black uppercase text-[10px] tracking-[0.2em] mb-6">Governance</h4>
            <ul className="space-y-4">
              <FooterLink to="#" label="Privacy Protocol" />
              <FooterLink to="#" label="Service Terms" />
              <FooterLink to="#" label="Verification FAQ" />
            </ul>
          </div>

          {/* Contact Column */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
            <h4 className="text-blue-400 font-black uppercase text-[10px] tracking-[0.2em] mb-4 flex items-center gap-2">
               <ShieldCheck size={14} /> Global Support
            </h4>
            <p className="text-xs text-slate-400 mb-4 font-medium">Need technical assistance with your node or verification?</p>
            <a href="mailto:support@rozgaarsetu.com" className="flex items-center gap-2 text-white font-black text-sm hover:text-blue-400 transition-colors">
              <Mail size={16} className="text-blue-500" />
              support@rozgaarsetu.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
            © {currentYear} RozgaarSetu Protocol. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[10px] font-black text-emerald-500/80 uppercase">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              API Status: Optimal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label, icon }) => (
  <li>
    <Link to={to} className="text-slate-500 hover:text-blue-400 text-sm font-bold flex items-center gap-2 transition-all duration-300 group">
      {icon && <span className="group-hover:scale-110 transition-transform">{icon}</span>}
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-300">
    {icon}
  </a>
);

export default Footer;