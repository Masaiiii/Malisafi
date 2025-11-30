
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
      className="bg-white/80 dark:bg-navy/80 backdrop-blur-lg p-4 rounded-2xl flex items-center gap-4 border border-white/20 dark:border-white/5 shadow-soft hover:shadow-lg cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
    >
      <div className="relative w-18 h-18 rounded-full p-0.5 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-white/10 dark:to-white/5">
        <img 
          src={store.image_url} 
          alt={store.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        {store.is_verified && (
          <div className="absolute bottom-0 right-0 bg-verified text-white p-1 rounded-full border-2 border-white dark:border-navy shadow-sm">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-charcoal dark:text-white text-lg truncate group-hover:text-teal-600 transition-colors">{store.name}</h4>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-[10px] font-bold text-white bg-gradient-to-r from-teal-400 to-teal-500 px-2 py-0.5 rounded-full">
            {store.category}
          </span>
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
            📍 {store.location}
          </span>
        </div>
      </div>
      
      <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </div>
    </div>
  );
};

export default StoreCard;
