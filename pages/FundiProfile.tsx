import React, { useEffect, useState } from 'react';
import { Service, Language } from '../types';
import { fetchServiceById } from '../services/dataService';
import Button from '../components/Button';

interface FundiProfileProps {
  id: string;
  lang: Language;
  onBack: () => void;
}

const FundiProfile: React.FC<FundiProfileProps> = ({ id, lang, onBack }) => {
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServiceById(id).then(s => setService(s || null));
  }, [id]);

  if (!service) return <div className="p-10 text-center dark:text-white">Loading...</div>;

  return (
    <div className="fixed inset-0 bg-white dark:bg-navy z-50 overflow-y-auto pb-safe">
      {/* Cover/Header */}
      <div className="relative">
        <div className="h-40 bg-teal-600 dark:bg-teal-900"></div>
        <button onClick={onBack} className="absolute top-4 left-4 bg-white/20 backdrop-blur p-2 rounded-full text-white">←</button>
        
        <div className="absolute -bottom-16 left-4 right-4 flex items-end justify-between">
           <div className="w-32 h-32 rounded-full border-4 border-white dark:border-navy overflow-hidden bg-gray-200">
             <img src={service.image_url} className="w-full h-full object-cover" />
           </div>
           <div className="mb-4 flex flex-col items-end">
             {service.is_verified && (
               <div className="bg-verified text-white px-3 py-1 rounded-full text-xs font-bold mb-2 flex items-center gap-1">
                 ✓ Verified
               </div>
             )}
             <div className="flex bg-white dark:bg-white/10 px-3 py-1 rounded-full border border-gray-100 dark:border-white/5 shadow-sm items-center gap-1">
                <span className="text-gold">★</span>
                <span className="font-bold text-charcoal dark:text-white">{service.rating_avg}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">({service.rating_count} reviews)</span>
             </div>
           </div>
        </div>
      </div>

      <div className="mt-20 px-4">
        <h1 className="text-3xl font-bold font-heading text-charcoal dark:text-white">{service.name}</h1>
        <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">{service.profession} • {service.location}</p>
        
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{service.bio || "No bio available."}</p>

        {/* Packages */}
        <h3 className="font-bold text-xl mb-4 text-charcoal dark:text-white">Fixed Packages</h3>
        <div className="space-y-3 mb-8">
           {service.packages?.map((pkg, i) => (
             <div key={i} className="border border-gray-200 dark:border-white/10 rounded-xl p-4 flex justify-between items-center bg-surface dark:bg-white/5">
                <div>
                   <h4 className="font-bold text-charcoal dark:text-white">{pkg.title}</h4>
                   <p className="text-xs text-gray-500 dark:text-gray-400">{pkg.description}</p>
                </div>
                <div className="text-gold font-bold">KSh {pkg.price}</div>
             </div>
           )) || <p className="text-gray-400 text-sm">No packages listed.</p>}
        </div>

        {/* Portfolio */}
        <h3 className="font-bold text-xl mb-4 text-charcoal dark:text-white">Past Work</h3>
        <div className="grid grid-cols-3 gap-2 mb-8">
           {service.portfolio_images.map((img, i) => (
             <img key={i} src={img} className="w-full aspect-square object-cover rounded-lg bg-gray-100 dark:bg-white/10" />
           ))}
        </div>

        {/* Calendar Placeholder */}
        <h3 className="font-bold text-xl mb-4 text-charcoal dark:text-white">Availability</h3>
        <div className="bg-surface dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10 text-center mb-24">
           <div className="grid grid-cols-7 gap-2 text-xs font-bold text-gray-400 mb-2">
             <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
           </div>
           <div className="grid grid-cols-7 gap-2">
             {[...Array(14)].map((_, i) => (
               <div key={i} className={`aspect-square rounded-full flex items-center justify-center text-xs font-bold ${i % 3 === 0 ? 'bg-gray-100 dark:bg-white/10 text-gray-300' : 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400'}`}>
                 {i + 1}
               </div>
             ))}
           </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-navy border-t border-gray-100 dark:border-white/10 p-4 pb-safe flex gap-4">
        <Button variant="whatsapp" fullWidth className="text-lg" onClick={() => window.open(`https://wa.me/${service.whatsapp}`, '_blank')}>
          WhatsApp
        </Button>
        <button className="bg-gray-100 dark:bg-white/10 text-charcoal dark:text-white px-6 rounded-lg font-bold">Call</button>
      </div>
    </div>
  );
};

export default FundiProfile;