import React from 'react';
import { Language } from '../types';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, lang }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: { en: 'Home', sw: 'Nyumbani' } },
    { id: 'fundis', icon: '🛠️', label: { en: 'Fundis', sw: 'Mafundi' } },
    { id: 'post', icon: '➕', label: { en: 'Post', sw: 'Weka' }, highlight: true },
    { id: 'market', icon: '🛍️', label: { en: 'Market', sw: 'Soko' } },
    { id: 'emergency', icon: '🆘', label: { en: 'Help', sw: 'Dharura' } },
  ];

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-2 py-3 pb-safe flex justify-between items-center relative">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`flex flex-col items-center gap-1 w-1/5 transition-all duration-300 relative group ${
                  isActive ? 'text-ocean scale-105' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <div className={`text-2xl transition-all duration-300 ${
                  item.highlight 
                    ? 'bg-gradient-to-tr from-ocean to-deepBlue text-white p-3.5 rounded-2xl shadow-lg shadow-ocean/40 -mt-8 border-[4px] border-slate-50 hover:scale-110' 
                    : ''
                }`}>
                  {item.icon}
                </div>
                {!item.highlight && (
                  <span className={`text-[10px] font-semibold transition-colors ${isActive ? 'text-ocean' : 'text-slate-400'}`}>
                    {lang === 'en' ? item.label.en : item.label.sw}
                  </span>
                )}
                {isActive && !item.highlight && (
                  <div className="absolute -bottom-2 w-1 h-1 bg-ocean rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;