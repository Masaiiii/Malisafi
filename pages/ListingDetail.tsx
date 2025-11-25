import React, { useEffect, useState } from 'react';
import { Listing, Language } from '../types';
import { getListingById } from '../services/dataService';
import { UI_TEXT } from '../constants';
import Button from '../components/Button';

interface ListingDetailProps {
  id: string;
  lang: Language;
  onBack: () => void;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ id, lang, onBack }) => {
  const [item, setItem] = useState<Listing | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getListingById(id);
      setItem(data || null);
    };
    load();
  }, [id]);

  if (!item) return <div className="p-8 text-center">{UI_TEXT.loading[lang]}</div>;

  const handleWhatsApp = () => {
    const msg = `Hi, I saw your listing "${item.title}" on Mali Safi. Is it still available?`;
    window.open(`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto pb-safe">
      <div className="max-w-xl mx-auto min-h-screen flex flex-col">
        {/* Header Image */}
        <div className="relative aspect-[4/3] bg-gray-100">
          <button 
            onClick={onBack}
            className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur p-2 rounded-full shadow-lg"
          >
            ←
          </button>
          <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-xl font-bold font-heading text-gray-900">{item.title}</h1>
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                📍 {item.location} • <span className="text-xs">{new Date(item.created_at).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-ocean font-bold text-xl">KSh {item.price.toLocaleString()}</p>
            </div>
          </div>

          <div className="my-4 border-t border-b border-gray-100 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sunset/20 flex items-center justify-center text-sunset font-bold">
              {item.user_name ? item.user_name[0] : 'U'}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">{item.user_name || 'Mali Safi User'}</p>
              {item.is_verified && (
                <p className="text-verified text-xs flex items-center gap-1">
                  ✓ {UI_TEXT.verifiedSeller[lang]}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{UI_TEXT.description[lang]}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.description}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-deepBlue text-xs font-medium text-center">
              🛡️ {UI_TEXT.safetyTip[lang]}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100 flex gap-3 pb-safe">
           <button className="p-3 border border-gray-200 rounded-lg text-red-500 font-medium text-xs w-1/4 flex flex-col items-center justify-center">
             ⚠️ Report
           </button>
           <Button variant="whatsapp" fullWidth onClick={handleWhatsApp} className="flex-1">
             <span className="text-xl">💬</span> WhatsApp
           </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;