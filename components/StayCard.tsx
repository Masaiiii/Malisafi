
import React from 'react';
import { Stay } from '../types';

interface StayCardProps {
  stay: Stay;
  onClick?: () => void;
}

const StayCard: React.FC<StayCardProps> = ({ stay, onClick }) => {
  return (
    <div onClick={onClick} className="relative h-72 rounded-3xl overflow-hidden shadow-golden hover:shadow-2xl transition-all duration-500 group cursor-pointer mb-6 animate-fade-in-up transform hover:-translate-y-1">
      <img src={stay.image_url} alt={stay.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
      
      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg flex items-center gap-1">
        <span className="text-gold">★</span> {stay.rating}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-between items-end">
          <div className="flex-1 mr-4">
             <h3 className="font-bold text-2xl text-white leading-tight mb-2 group-hover:text-gold transition-colors">{stay.title}</h3>
             <p className="text-gray-300 text-sm flex items-center gap-1">
               <span className="opacity-70">📍</span> {stay.location} • {stay.type}
             </p>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-md rounded-xl p-2 border border-white/10">
             <span className="block text-gold font-bold text-xl">KSh {stay.price_per_night.toLocaleString()}</span>
             <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider">/ night</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {stay.features.slice(0, 3).map((f, i) => (
             <span key={i} className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-sm">{f.trim()}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StayCard;
