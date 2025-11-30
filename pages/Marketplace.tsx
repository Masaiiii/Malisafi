
import React, { useState } from 'react';
import { MOCK_STORES } from '../constants';
import StoreCard from '../components/StoreCard';

interface MarketplaceProps {
  onStoreClick: (id: string) => void;
}

const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Fashion', 'Cars', 'Food'];

const Marketplace: React.FC<MarketplaceProps> = ({ onStoreClick }) => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="min-h-screen pb-32">
      <div className="sticky top-[64px] z-40 bg-white/95 dark:bg-navy/95 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 py-4 transition-all duration-300">
         <div className="flex gap-3 overflow-x-auto no-scrollbar px-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                filter === cat 
                  ? 'bg-charcoal dark:bg-white text-white dark:text-charcoal shadow-lg transform scale-105' 
                  : 'bg-surface dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-8">
        <h3 className="font-bold text-2xl text-charcoal dark:text-white mb-6 font-heading">Shops & Stores</h3>
        <div className="grid grid-cols-1 gap-5">
          {MOCK_STORES.map((store, idx) => (
            <div key={store.id} style={{ animationDelay: `${idx * 100}ms` }}>
              <StoreCard store={store} onClick={() => onStoreClick(store.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
