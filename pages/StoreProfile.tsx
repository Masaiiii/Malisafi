import React, { useEffect, useState } from 'react';
import { Store, Listing, Language } from '../types';
import { getStoreById, fetchListingsByStore } from '../services/dataService';
import ListingCard from '../components/ListingCard';
import { UI_TEXT } from '../constants';
import Button from '../components/Button';

interface StoreProfileProps {
  storeId: string;
  lang: Language;
  onBack: () => void;
  onListingClick: (id: string) => void;
}

const StoreProfile: React.FC<StoreProfileProps> = ({ storeId, lang, onBack, onListingClick }) => {
  const [store, setStore] = useState<Store | null>(null);
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const storeData = await getStoreById(storeId);
      const itemsData = await fetchListingsByStore(storeId);
      setStore(storeData || null);
      setItems(itemsData);
      setLoading(false);
    };
    load();
  }, [storeId]);

  if (!store && !loading) return <div className="p-8 text-center">Store not found</div>;

  const handleWhatsApp = () => {
    if (!store) return;
    const msg = `Hi ${store.name}, I found your shop on Mali Safi and would like to inquire about your items.`;
    window.open(`https://wa.me/${store.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="pb-safe min-h-screen bg-white z-40 fixed inset-0 overflow-y-auto">
      {/* Cover Image & Header */}
      <div className="relative h-48 md:h-64 bg-slate-200">
        {store?.cover_url && (
          <img src={store.cover_url} alt="Cover" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md z-10 active:scale-95 transition-transform hover:bg-white"
        >
          ←
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Profile Info */}
        <div className="relative -mt-16 mb-8 flex flex-col md:flex-row md:items-end md:gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
             {store?.image_url ? (
               <img src={store.image_url} alt={store.name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full bg-ocean flex items-center justify-center text-4xl">🏪</div>
             )}
          </div>
          
          <div className="mt-4 md:mt-0 md:mb-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold font-heading text-slate-900 leading-tight">
                {store?.name}
              </h1>
              {store?.is_verified && <span className="text-verified text-2xl" title="Verified">✓</span>}
            </div>

            {/* Category Pill */}
            <span className="bg-ocean/10 text-ocean text-xs font-bold px-3 py-1 rounded-full border border-ocean/20 inline-block mb-4">
              {store?.category}
            </span>
          </div>

          <div className="flex gap-3 w-full md:w-auto md:mb-4 mt-4 md:mt-0">
            <Button variant="whatsapp" fullWidth className="md:w-auto px-8" onClick={handleWhatsApp}>
              Chat Store
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1 space-y-6">
                {/* Info Card */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">About</h3>
                    <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">📍</span>
                            <span>{store?.location}</span>
                        </div>
                        {store?.opening_hours && (
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🕒</span>
                            <span>{store.opening_hours}</span>
                        </div>
                        )}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-200">
                        {store?.description}
                    </p>
                </div>
            </div>

            <div className="md:col-span-2">
                {/* Inventory */}
                <div className="bg-white min-h-[50vh]">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-xl">
                    🛍️ {UI_TEXT.itemsCount[lang]} <span className="text-slate-400 font-normal">({items.length})</span>
                    </h3>

                    {loading ? (
                    <div className="text-center py-8">{UI_TEXT.loading[lang]}</div>
                    ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {items.length > 0 ? (
                        items.map(item => (
                            <ListingCard 
                            key={item.id} 
                            listing={item} 
                            lang={lang} 
                            onClick={() => onListingClick(item.id)}
                            />
                        ))
                        ) : (
                        <div className="col-span-full text-center py-10 flex flex-col items-center gap-2 text-slate-300">
                            <span className="text-5xl">📦</span>
                            <p>No items available yet.</p>
                        </div>
                        )}
                    </div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;