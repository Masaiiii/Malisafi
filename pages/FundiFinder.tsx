
import React, { useState } from 'react';
import { Service, Language } from '../types';
import { MOCK_SERVICES, UI_TEXT } from '../constants';
import FundiCard from '../components/FundiCard';

interface FundiFinderProps {
  lang: Language;
  onServiceClick: (id: string) => void;
}

const CATEGORIES = ['All', 'Plumber', 'Cleaner', 'Chef', 'Salon', 'Mason', 'Gardener'];

const FundiFinder: React.FC<FundiFinderProps> = ({ lang, onServiceClick }) => {
  const [filter, setFilter] = useState('All');
  const [availableToday, setAvailableToday] = useState(false);

  const displayedServices = MOCK_SERVICES.filter(s => {
    if (filter !== 'All' && s.profession !== filter) return false;
    if (availableToday && !s.is_available_today) return false;
    return true;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Sticky Filter Header */}
      <div className="sticky top-[64px] z-40 bg-white/95 dark:bg-navy/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-4 transition-all duration-300">
        <div className="px-4 flex items-center justify-between mb-4">
          <label className="flex items-center gap-3 cursor-pointer bg-surface dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-teal-500 transition-colors shadow-sm">
            <span className="text-xs font-bold text-charcoal dark:text-white uppercase tracking-wide">{UI_TEXT.availableToday[lang]}</span>
            <div className={`w-10 h-6 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 duration-300 ${availableToday ? 'bg-teal-500' : ''}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${availableToday ? 'translate-x-4' : ''}`}></div>
            </div>
            <input type="checkbox" className="hidden" checked={availableToday} onChange={e => setAvailableToday(e.target.checked)} />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                filter === cat 
                  ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-teal-500/30 scale-105' 
                  : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/10 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Top 10 Section */}
      <div className="py-8 border-b border-gray-100 dark:border-white/5">
        <div className="px-4 flex items-center gap-2 mb-4">
           <span className="text-xl">🏆</span>
           <h3 className="font-bold text-lg text-charcoal dark:text-white">Top Verified Pros</h3>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 pb-2">
          {MOCK_SERVICES.filter(s => s.is_verified).map((service, idx) => (
             <div key={service.id} style={{ animationDelay: `${idx * 100}ms` }}>
               <FundiCard service={service} lang={lang} variant="circle" onClick={() => onServiceClick(service.id)} />
             </div>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="px-4 py-6">
        <h3 className="font-bold text-xl text-charcoal dark:text-white mb-6 font-heading">{filter === 'All' ? 'All Fundis' : `${filter}s`}</h3>
        <div className="space-y-4">
          {displayedServices.map((service, idx) => (
            <div key={service.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
              <FundiCard service={service} lang={lang} onClick={() => onServiceClick(service.id)} />
            </div>
          ))}
        </div>
        
        {displayedServices.length === 0 && (
          <div className="text-center py-24 opacity-60 flex flex-col items-center">
            <span className="text-4xl mb-2">🔍</span>
            <p className="font-medium">No fundis found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundiFinder;
