import React from 'react';
import { Service, Language } from '../types';
import Button from './Button';

interface ServiceCardProps {
  service: Service;
  lang: Language;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, lang }) => {
  const handleQuote = () => {
    const msg = `Hi ${service.name}, I saw your profile on Mali Safi and would like a quote.`;
    window.open(`https://wa.me/${service.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 border border-gray-100 mb-4">
      <div className="flex gap-4">
        <div className="relative">
          <img 
            src={service.image_url} 
            alt={service.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
          />
          {service.is_verified && (
            <div className="absolute bottom-0 right-0 bg-verified text-white text-[10px] p-0.5 rounded-full border-2 border-white">
              ✓
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
             <div>
               <h3 className="font-bold text-gray-900 text-lg leading-tight">{service.name}</h3>
               <p className="text-ocean font-medium text-sm">{service.profession}</p>
             </div>
             <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
               <span className="text-yellow-500 text-xs">★</span>
               <span className="font-bold text-xs text-gray-800">{service.rating_avg}</span>
               <span className="text-[10px] text-gray-400">({service.rating_count})</span>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {service.languages.map(l => (
              <span key={l} className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {service.portfolio_images.map((img, i) => (
          <img key={i} src={img} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <p className="text-xs text-gray-500 font-medium">{service.base_rate}</p>
        <button 
          onClick={handleQuote}
          className="bg-sunset text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-sunset/20 active:scale-95 transition-transform"
        >
          {lang === 'en' ? 'Get Quote' : 'Pata Bei'}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;