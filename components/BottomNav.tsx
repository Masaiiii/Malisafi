
import React from 'react';
import { Language } from '../types';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, lang }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'fundis', icon: '🛠️', label: 'Fundi' },
    { id: 'stays', icon: '🛏️', label: 'Stays' },
    { id: 'market', icon: '🛍️', label: 'Market' },
    { id: 'more', icon: '▦', label: 'More' },
  ];

  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 transition-all duration-300">
      <div className="max-w-md mx-auto glass rounded-2xl shadow-glass border-white/20 dark:border-white/5 p-2 flex justify-between items-center bg-white/80 dark:bg-navy/80 backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = currentView === item.id || currentView.startsWith(item.id.slice(0, -1)); 
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 ${isActive ? 'bg-white dark:bg-white/10 shadow-sm transform -translate-y-2' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <span className={`text-2xl transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 grayscale'}`}>
                {item.icon}
              </span>
              {isActive && (
                <div className="absolute -bottom-3 w-1 h-1 bg-gold rounded-full shadow-golden"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
