import React from 'react';
import { Store } from '../types';

interface StoreCardProps {
  store: Store;
  onClick: () => void;
}

const StoreCard: React.FC<StoreCardProps> = ({ store, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="min-w-[140px] w-[140px] flex flex-col items-center gap-2 cursor-pointer group"
    >
      <div className="relative w-20 h-20 rounded-full border-2 border-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform">
        <img 
          src={store.image_url} 
          alt={store.name} 
          className="w-full h-full object-cover"
        />
        {store.is_verified && (
          <div className="absolute bottom-0 right-0 bg-verified text-white p-0.5 rounded-full border-2 border-white">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <h4 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{store.name}</h4>
        <span className="text-[10px] text-gray-500 block mt-0.5">{store.category}</span>
        <span className="text-[10px] text-ocean font-medium bg-ocean/10 px-1.5 py-0.5 rounded-full mt-1 inline-block">
          📍 {store.location}
        </span>
      </div>
    </div>
  );
};

export default StoreCard;