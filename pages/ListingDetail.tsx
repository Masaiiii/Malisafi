import React, { useEffect, useState } from 'react';
import { Listing, Language } from '../types';
import { getListingById } from '../services/dataService';
import { isInWishlist, toggleWishlist } from '../services/wishlistService';
import { UI_TEXT } from '../constants';
import Button from '../components/Button';

interface ListingDetailProps {
  id: string;
  lang: Language;
  onBack: () => void;
}

const ListingDetail: React.FC<ListingDetailProps> = ({ id, lang, onBack }) => {
  const [item, setItem] = useState<Listing | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getListingById(id);
      setItem(data || null);
      if (data) setIsLiked(isInWishlist(data.id));
    };
    load();
  }, [id]);

  if (!item) return <div className="p-8 text-center">{UI_TEXT.loading[lang]}</div>;

  const handleWhatsApp = () => {
    const msg = `Hi, I saw your listing "${item.title}" on Mali Safi. Is it still available?`;
    window.open(`https://wa.me/${item.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleLike = () => {
    toggleWishlist(item.id);
    setIsLiked(!isLiked);
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-navy z-40 overflow-y-auto pb-safe">
      <div className="max-w-5xl mx-auto min-h-screen flex flex-col md:flex-row md:items-start md:p-8 md:gap-8">
        
        {/* Mobile Header / Back Button */}
        <div className="md:hidden absolute top-4 left-4 z-10">
          <button 
            onClick={onBack}
            className="bg-white/80 backdrop-blur p-2 rounded-full shadow-lg text-charcoal"
          >
            ←
          </button>
        </div>

        {/* Desktop Back Button */}
        <button 
          onClick={onBack}
          className="hidden md:block absolute top-8 left-8 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white p-3 rounded-full transition-colors"
        >
          ←
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 md:rounded-3xl overflow-hidden shadow-none md:shadow-xl bg-slate-100 dark:bg-white/5 aspect-square md:aspect-auto md:h-[500px] relative">
           <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
           <div className="absolute top-4 right-4 flex gap-2">
             <button 
                onClick={handleLike}
                className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all active:scale-90 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
              >
                <span className={`text-xl leading-none ${isLiked ? 'animate-pop' : ''}`}>♥</span>
              </button>
           </div>
           <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm text-charcoal">
             {item.category}
           </div>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-0 flex-1 flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-slate-900 dark:text-white">{item.title}</h1>
                <p className="text-slate-500 dark:text-gray-400 text-sm flex items-center gap-1 mt-2">
                  📍 {item.location} • <span className="text-xs">{new Date(item.created_at).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            <div className="text-3xl font-bold text-teal-600 dark:text-teal-400 mb-6">KSh {item.price.toLocaleString()}</div>

            <div className="my-6 border-t border-b border-slate-100 dark:border-white/10 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xl border border-gold/20">
                {item.user_name ? item.user_name[0] : 'U'}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 dark:text-white text-lg">{item.user_name || 'Mali Safi User'}</p>
                {item.is_verified && (
                  <p className="text-verified text-sm flex items-center gap-1 font-medium">
                    ✓ {UI_TEXT.verifiedSeller[lang]}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{UI_TEXT.description[lang]}</h3>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl mb-6 border border-blue-100 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-300 text-sm font-medium flex gap-2">
                <span>🛡️</span> {UI_TEXT.safetyTip[lang]}
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky md:static bottom-0 bg-white dark:bg-navy md:bg-transparent p-4 md:p-0 border-t md:border-0 border-slate-100 dark:border-white/10 flex gap-4 pb-safe">
             <button className="px-6 py-3 border border-slate-200 dark:border-white/10 rounded-xl text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
               Report
             </button>
             <Button variant="whatsapp" fullWidth onClick={handleWhatsApp} className="text-lg">
               Chat on WhatsApp
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;