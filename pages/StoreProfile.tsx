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
    <div className="pb-safe min-h-screen bg-white">
      {/* Cover Image & Header */}
      <div className="relative h-40 bg-gray-200">
        {store?.cover_url && (
          <img src={store.cover_url} alt="Cover" className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <button 
          onClick={onBack}
          className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-md z-10"
        >
          ←
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 -mt-10 relative mb-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white mb-3">
             {store?.image_url ? (
               <img src={store.image_url} alt={store.name} className="w-full h-full object-cover" />
             ) : (
               <div className="w-full h-full bg-ocean flex items-center justify-center text-3xl">🏪</div>
             )}
          </div>
          
          <h1 className="text-2xl font-bold font-heading text-gray-900 flex items-center gap-1">
            {store?.name}
            {store?.is_verified && <span className="text-verified text-lg">✓</span>}
          </h1>
          <p className="text-gray-500 text-sm mb-1">{store?.category} • {store?.location}</p>
          <p className="text-gray-600 text-sm max-w-xs">{store?.description}</p>
          
          <div className="mt-4 flex gap-3 w-full max-w-xs">
            <Button variant="whatsapp" fullWidth onClick={handleWhatsApp} className="text-sm py-2">
              Chat Shop
            </Button>
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="bg-gray-50 min-h-[50vh] rounded-t-3xl px-4 py-6 shadow-inner">
        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          🛍️ {UI_TEXT.itemsCount[lang]} <span className="text-gray-400 font-normal">({items.length})</span>
        </h3>

        {loading ? (
           <div className="text-center py-8">{UI_TEXT.loading[lang]}</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              <div className="col-span-full text-center py-10 text-gray-400">
                <p>No items available yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreProfile;