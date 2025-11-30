
import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  goHome: () => void;
  showBack?: boolean;
  title?: string;
  onBack?: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, goHome, showBack, title, onBack, darkMode, toggleDarkMode, onProfileClick }) => {
  const nextLang = lang === 'en' ? 'sw' : 'en';

  return (
    <nav className="sticky top-0 z-50 glass transition-all duration-300">
      <div className="max-w-xl mx-auto flex justify-between items-center h-16 px-4">
        
        {showBack ? (
          <div className="flex items-center gap-3 animate-fade-in-up">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full text-charcoal dark:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h1 className="text-xl font-bold font-heading text-charcoal dark:text-white tracking-tight">{title}</h1>
          </div>
        ) : (
          <div onClick={goHome} className="cursor-pointer flex items-center gap-2 group">
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 tracking-tighter leading-none flex items-center gap-1">
                MALI<span className="text-gold">SAFI</span>
                <span className="text-gold text-2xl animate-spin-slow">☀</span>
              </h1>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button onClick={toggleDarkMode} className="w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center justify-center text-xl">
            {darkMode ? '🌙' : '☀️'}
          </button>

          <button 
            onClick={() => setLang(nextLang)}
            className="text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 hover:bg-teal-100 border border-teal-100 dark:border-teal-800 w-9 h-9 rounded-xl flex items-center justify-center transition-all uppercase shadow-sm"
          >
            {lang}
          </button>
          
          <div onClick={onProfileClick} className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-br from-teal-400 to-gold cursor-pointer hover:scale-105 transition-transform shadow-md">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full rounded-full bg-white dark:bg-navy border-2 border-white dark:border-navy" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
