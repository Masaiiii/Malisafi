
import React from 'react';
import { Service, Language } from '../types';

interface FundiCardProps {
  service: Service;
  lang: Language;
  variant?: 'list' | 'circle';
  onClick?: () => void;
}

const FundiCard: React.FC<FundiCardProps> = ({ service, lang, variant = 'list', onClick }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://wa.me/${service.whatsapp}`, '_blank');
  };

  if (variant === 'circle') {
    return (
      <div onClick={onClick} className="min-w-[110px] flex flex-col items-center gap-3 cursor-pointer group animate-fade-in-up">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          <img src={service.image_url} alt={service.name} className="relative w-full h-full rounded-full object-cover border-2 border-white dark:border-navy shadow-lg group-hover:scale-105 transition-transform duration-300" />
          {service.is_verified && (
            <div className="absolute bottom-0 right-0 bg-verified text-white p-1 rounded-full border-2 border-white dark:border-navy z-10">
              <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
          )}
        </div>
        <div className="text-center">
          <h4 className="font-bold text-charcoal dark:text-white text-xs truncate max-w-[100px] group-hover:text-teal-600 transition-colors">{service.name}</h4>
          <div className="flex items-center justify-center gap-1 bg-white dark:bg-white/5 px-2 py-0.5 rounded-full shadow-sm mt-1">
             <span className="text-gold text-[10px]">★</span>
             <span className="text-[10px] font-bold text-charcoal dark:text-gray-200">{service.rating_avg}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={onClick} className="bg-white dark:bg-navy rounded-2xl p-4 shadow-soft hover:shadow-ocean transition-all duration-300 mb-4 cursor-pointer group border border-gray-100 dark:border-white/5 animate-fade-in-up">
      <div className="flex gap-4 mb-4">
        <div className="relative">
          <img src={service.image_url} alt={service.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300" />
          {service.is_verified && (
            <div className="absolute -bottom-2 -right-2 bg-verified text-white p-1 rounded-full border-2 border-white dark:border-navy shadow-sm">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-charcoal dark:text-white truncate group-hover:text-teal-600 transition-colors">{service.name}</h3>
            <span className="text-xs text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-900/20 px-2 py-1 rounded-lg">{service.distance}</span>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-1">{service.profession}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 bg-gold/10 px-2 py-0.5 rounded-md">
                <span className="text-gold text-xs">★</span>
                <span className="font-bold text-xs text-charcoal dark:text-gray-200">{service.rating_avg}</span>
            </div>
            <span className="text-xs text-gray-300">•</span>
            <span className="text-xs text-gray-400">{service.languages.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-1">
        {service.portfolio_images.map((img, i) => (
          <img key={i} src={img} className="w-20 h-20 rounded-xl object-cover hover:opacity-90 transition-opacity bg-gray-100 flex-shrink-0" />
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-white/5 gap-3">
        <div className="font-bold text-charcoal dark:text-white text-sm">
          {service.base_rate}
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-50 dark:bg-white/5 text-charcoal dark:text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">Call</button>
          <button onClick={handleWhatsApp} className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all flex items-center gap-1.5 active:scale-95">
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundiCard;
