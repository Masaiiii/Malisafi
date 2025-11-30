import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  goHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, goHome }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={goHome} className="cursor-pointer flex items-center gap-2 group">
          <div className="w-9 h-9 bg-gradient-to-br from-ocean to-deepBlue rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-ocean/30 group-hover:scale-105 transition-transform">
            M
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold font-heading text-slate-800 tracking-tight leading-none group-hover:text-ocean transition-colors">
              MALI<span className="text-ocean">SAFI</span>
            </h1>
            <span className="text-[9px] text-slate-400 uppercase tracking-[0.2em] font-medium">Malindi</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
            className="text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-600 transition-colors"
          >
            {lang === 'en' ? 'SW' : 'EN'}
          </button>
          
          <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white shadow-sm cursor-pointer hover:ring-ocean transition-all">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;