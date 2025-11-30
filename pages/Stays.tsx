import React, { useState } from 'react';
import { MOCK_STAYS } from '../constants';
import StayCard from '../components/StayCard';

interface StaysProps {
  onStayClick: (id: string) => void;
}

const CATEGORIES = ['All', 'Villas', 'Airbnbs', 'Restaurants'];

const Stays: React.FC<StaysProps> = ({ onStayClick }) => {
  const [filter, setFilter] = useState('All');

  const filteredStays = MOCK_STAYS.filter(stay => {
    if (filter === 'All') return true;
    if (filter === 'Villas') return stay.type === 'Villa';
    if (filter === 'Restaurants') return stay.type === 'Restaurant';
    if (filter === 'Airbnbs') return stay.type === 'Apartment' || stay.type === 'Guest House';
    return true;
  });

  return (
    <div className="min-h-screen bg-surface dark:bg-navy pb-24 transition-colors duration-300">
       <div className="bg-white dark:bg-navy px-4 py-6 border-b border-gray-100 dark:border-white/5 mb-4 sticky top-[64px] z-30">
         <h2 className="text-2xl font-bold font-heading text-charcoal dark:text-white mb-4">Luxury Stays & Dining</h2>
         
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
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

       <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
         {filteredStays.length > 0 ? (
           filteredStays.map(stay => (
             <StayCard key={stay.id} stay={stay} onClick={() => onStayClick(stay.id)} />
           ))
         ) : (
           <div className="col-span-full text-center py-20 opacity-60">
             <span className="text-4xl">🏝️</span>
             <p className="mt-4 text-gray-500 dark:text-gray-400">No places found in this category.</p>
           </div>
         )}
       </div>
    </div>
  );
};

export default Stays;