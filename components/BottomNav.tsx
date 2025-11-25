import React from 'react';
import { CategoryId, Language } from '../types';

interface BottomNavProps {
  currentView: string;
  setView: (view: string) => void;
  lang: Language;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView, lang }) => {
  const navItems = [
    { id: 'home', icon: '🏠', label: { en: 'Home', sw: 'Nyumbani' } },
    { id: 'search', icon: '🔍', label: { en: 'Search', sw: 'Tafuta' } },
    { id: 'post', icon: '➕', label: { en: 'Sell', sw: 'Uza' }, highlight: true },
    { id: 'deals', icon: '🔥', label: { en: 'Deals', sw: 'Dili' } },
    { id: 'emergency', icon: '🚑', label: { en: 'Help', sw: 'Dharura' } },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 pb-safe z-50 sm:hidden">
      <div className="flex justify-between items-end">
        {navItems.map((item) => {
          const isActive = currentView === item.id || (item.id === 'home' && currentView === 'listings');
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center gap-1 w-1/5 transition-all ${
                isActive ? 'text-ocean' : 'text-gray-400'
              }`}
            >
              <div className={`text-xl ${item.highlight ? 'bg-ocean text-white p-3 rounded-full -mt-6 shadow-lg shadow-ocean/40 border-4 border-white' : ''}`}>
                {item.icon}
              </div>
              {!item.highlight && (
                <span className="text-[10px] font-medium">
                  {lang === 'en' ? item.label.en : item.label.sw}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;