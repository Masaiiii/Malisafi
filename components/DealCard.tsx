
import React from 'react';
import { Deal } from '../types';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="min-w-[280px] h-[170px] rounded-2xl relative overflow-hidden shadow-lg flex-shrink-0 group cursor-pointer animate-fade-in-up">
      {/* Background Image with Zoom */}
      <img src={deal.image_url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={deal.title} />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      
      {/* Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/50 transition-colors duration-300"></div>

      {/* Floating Badge */}
      <div className="absolute top-3 left-3 bg-gradient-to-r from-gold to-orange-500 text-white text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg animate-pulse-slow">
        ⚡ TODAY ONLY
      </div>
      
      {/* Content */}
      <div className="absolute bottom-3 left-3 right-3 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
        <h3 className="text-white font-bold text-lg leading-tight mb-1 truncate">{deal.title}</h3>
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs line-through">KSh {deal.original_price.toLocaleString()}</span>
            <span className="text-gold font-bold text-xl leading-none">KSh {deal.deal_price.toLocaleString()}</span>
          </div>
          <div className="text-[10px] font-bold text-white bg-red-500/80 px-2 py-1 rounded-lg">
            - {Math.round(((deal.original_price - deal.deal_price)/deal.original_price)*100)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;
