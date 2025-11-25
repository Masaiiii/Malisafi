import React from 'react';
import { Language } from '../types';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onPostClick: () => void;
  goHome: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onPostClick, goHome }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div onClick={goHome} className="cursor-pointer flex flex-col">
          <h1 className="text-2xl font-bold font-heading text-ocean tracking-tight">
            MALI<span className="text-sunset">SAFI</span>
          </h1>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest -mt-1">Malindi</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
            className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 hover:bg-gray-200"
          >
            {lang === 'en' ? 'SW' : 'EN'}
          </button>
          
          <button 
            onClick={onPostClick}
            className="hidden sm:block bg-ocean text-white px-4 py-2 rounded-full font-medium text-sm hover:bg-deepBlue transition-colors shadow-md shadow-ocean/20"
          >
            + {lang === 'en' ? 'Post' : 'Uza'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;