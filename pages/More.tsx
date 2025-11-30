
import React from 'react';
import { Language } from '../types';
import { MOCK_EMERGENCY } from '../constants';

interface MoreProps {
  lang: Language;
  onNavigate: (view: string) => void;
}

const More: React.FC<MoreProps> = ({ lang, onNavigate }) => {
  const menuItems = [
    { id: 'wishlist', icon: '♥', label: 'My Wishlist', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-500' },
    { id: 'lost', icon: '🔎', label: 'Lost & Found', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
    { id: 'jobs', icon: '💼', label: 'Small Jobs', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { id: 'events', icon: '🌴', label: 'Beach Events', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
    { id: 'scammer', icon: '⚠️', label: 'Scammer Wall', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-navy pb-24 px-4 pt-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold font-heading text-charcoal dark:text-white mb-6">More</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {menuItems.map((item, i) => (
          <button 
            key={i} 
            onClick={() => onNavigate(item.id === 'wishlist' ? 'wishlist' : item.id)}
            className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-soft flex flex-col items-center gap-3 border border-gray-100 dark:border-white/5 active:scale-95 transition-transform"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${item.color}`}>
              {item.icon}
            </div>
            <span className="font-bold text-charcoal dark:text-white text-sm">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-white/5 rounded-2xl p-5 shadow-soft border border-gray-100 dark:border-white/5 mb-6">
        <h3 className="font-bold text-charcoal dark:text-white mb-4 flex items-center gap-2">
          <span className="text-red-500">🆘</span> Emergency
        </h3>
        <div className="space-y-3">
          {MOCK_EMERGENCY.map((em, i) => (
            <div key={i} className="flex justify-between items-center border-b border-gray-50 dark:border-white/5 last:border-0 pb-2 last:pb-0">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{em.name}</span>
              <a href={`tel:${em.phone}`} className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-xs font-bold">Call {em.phone}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default More;
