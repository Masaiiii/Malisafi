import React, { useEffect, useState } from 'react';
import { Stay, Language } from '../types';
import { fetchStayById } from '../services/dataService';
import Button from '../components/Button';

interface StayProfileProps {
  id: string;
  lang: Language;
  onBack: () => void;
}

const StayProfile: React.FC<StayProfileProps> = ({ id, lang, onBack }) => {
  const [stay, setStay] = useState<Stay | null>(null);

  useEffect(() => {
    fetchStayById(id).then(s => setStay(s || null));
  }, [id]);

  if (!stay) return <div className="p-10 text-center dark:text-white">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-white dark:bg-navy z-50 overflow-y-auto pb-safe">
      <div className="relative h-[40vh]">
        <img src={stay.image_url} className="w-full h-full object-cover" />
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/20 backdrop-blur p-2 rounded-full text-white">←</button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
           <h1 className="text-3xl font-bold font-heading text-white leading-tight mb-2">{stay.title}</h1>
           <p className="text-white/80">📍 {stay.location}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-white/10 pb-6">
           <div>
             <span className="text-3xl font-bold text-gold">KSh {stay.price_per_night.toLocaleString()}</span>
             <span className="text-gray-400 text-sm"> / night</span>
           </div>
           <div className="flex items-center gap-1 bg-surface dark:bg-white/10 px-3 py-1 rounded-full">
             <span className="text-gold">★</span>
             <span className="font-bold dark:text-white">{stay.rating}</span>
           </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{stay.description || "No description provided."}</p>

        <h3 className="font-bold text-xl mb-4 text-charcoal dark:text-white">Amenities</h3>
        <div className="flex flex-wrap gap-2 mb-8">
           {stay.features.map((f, i) => (
             <span key={i} className="bg-surface dark:bg-white/5 border border-gray-200 dark:border-white/10 px-3 py-2 rounded-lg text-sm text-charcoal dark:text-gray-300">{f}</span>
           ))}
        </div>

        {/* Events Section */}
        <h3 className="font-bold text-xl mb-4 text-charcoal dark:text-white">Events & Functions</h3>
        <div className="space-y-4 mb-24">
           {stay.events?.map((evt, i) => (
             <div key={i} className="flex gap-4 bg-surface dark:bg-white/5 p-3 rounded-xl border border-gray-100 dark:border-white/10">
                <img src={evt.image_url} className="w-16 h-16 rounded-lg object-cover" />
                <div>
                   <h4 className="font-bold text-charcoal dark:text-white text-sm">{evt.title}</h4>
                   <p className="text-gold text-xs font-bold mb-1">{evt.date}</p>
                   <p className="text-gray-500 dark:text-gray-400 text-xs">{evt.description}</p>
                </div>
             </div>
           )) || <p className="text-gray-400">No upcoming events.</p>}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-navy border-t border-gray-100 dark:border-white/10 p-4 pb-safe">
        <Button variant="primary" fullWidth className="text-lg">Book Now</Button>
      </div>
    </div>
  );
};

export default StayProfile;