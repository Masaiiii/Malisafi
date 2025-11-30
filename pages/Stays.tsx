import React from 'react';
import { MOCK_STAYS } from '../constants';
import StayCard from '../components/StayCard';

interface StaysProps {
  onStayClick: (id: string) => void;
}

const Stays: React.FC<StaysProps> = ({ onStayClick }) => {
  return (
    <div className="min-h-screen bg-surface dark:bg-navy pb-24 transition-colors duration-300">
       <div className="bg-white dark:bg-navy px-4 py-6 border-b border-gray-100 dark:border-white/5 mb-4 sticky top-[64px] z-30">
         <h2 className="text-2xl font-bold font-heading text-charcoal dark:text-white">Luxury Stays</h2>
         <p className="text-sm text-gray-500 dark:text-gray-400">Handpicked villas & apartments in Kilifi.</p>
       </div>

       <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
         {MOCK_STAYS.map(stay => (
           <StayCard key={stay.id} stay={stay} onClick={() => onStayClick(stay.id)} />
         ))}
       </div>
    </div>
  );
};

export default Stays;