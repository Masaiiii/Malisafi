import React, { useEffect, useState } from 'react';
import { CATEGORIES, UI_TEXT } from '../constants';
import { Listing, CategoryId, Language, Store } from '../types';
import { fetchListings, fetchStores } from '../services/dataService';
import ListingCard from '../components/ListingCard';
import StoreCard from '../components/StoreCard';

interface HomeProps {
  lang: Language;
  onListingClick: (id: string) => void;
  onStoreClick: (id: string) => void;
  activeCategory: CategoryId;
  setActiveCategory: (cat: CategoryId) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onListingClick, onStoreClick, activeCategory, setActiveCategory }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [listingsData, storesData] = await Promise.all([
        fetchListings(activeCategory),
        fetchStores()
      ]);
      setListings(listingsData);
      setStores(storesData);
      setLoading(false);
    };
    load();
  }, [activeCategory]);

  // Separate listings with expires_at (Quick Gigs)
  const quickGigs = listings.filter(l => l.expires_at && new Date(l.expires_at) > new Date());
  // Standard listings exclude quick gigs unless we are viewing 'gigs' or 'all' specifically wanting them
  const standardListings = listings.filter(l => !l.expires_at);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-ocean px-4 py-6 text-white mb-6 rounded-b-3xl shadow-xl shadow-ocean/20">
        <h2 className="text-2xl font-bold font-heading mb-1 tracking-tight">{UI_TEXT.welcome[lang]}</h2>
        <p className="text-white/90 text-sm mb-4 font-light">{UI_TEXT.subtitle[lang]}</p>
        
        {/* Search Bar - Visual Only for this demo */}
        <div className="relative">
          <input 
            type="text" 
            placeholder={UI_TEXT.searchPlaceholder[lang]}
            className="w-full pl-10 pr-4 py-3 rounded-full text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-sunset/30 shadow-lg placeholder:text-gray-400"
          />
          <span className="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Quick Gigs Section (24h) */}
      {(activeCategory === 'all' || activeCategory === 'gigs') && (
        <div className="px-4 mb-6 border-b border-gray-100 pb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-bold text-gray-800 flex items-center gap-1">
              {UI_TEXT.quickGigsHeader[lang]}
            </h3>
            {activeCategory !== 'gigs' && (
              <button 
                onClick={() => setActiveCategory('gigs')} 
                className="text-ocean text-xs font-semibold hover:underline"
              >
                {lang === 'en' ? 'See all' : 'Ona zote'}
              </button>
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
            {/* Post Quick Gig Button */}
            <div className="min-w-[140px] h-[160px] bg-gradient-to-br from-sunset to-red-500 rounded-xl flex flex-col items-center justify-center text-white shadow-lg p-3 text-center cursor-pointer shrink-0" onClick={() => { /* Trigger Post with quick gig param in real app */ }}>
              <span className="text-3xl mb-1">⚡</span>
              <span className="font-bold text-sm leading-tight">Post Quick Gig</span>
              <span className="text-[10px] opacity-80 mt-1">Expires in 24h</span>
            </div>

            {quickGigs.map(gig => (
              <div 
                key={gig.id}
                onClick={() => onListingClick(gig.id)}
                className="min-w-[200px] h-[160px] bg-white rounded-xl border-2 border-sunset/10 p-3 shadow-sm flex flex-col justify-between cursor-pointer shrink-0 hover:border-sunset transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">24h</span>
                    <span className="text-xs font-bold text-ocean">KSh {gig.price}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm mt-2 line-clamp-2">{gig.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gig.description}</p>
                </div>
                <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-2">
                  📍 {gig.location}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex flex-col items-center min-w-[70px] group transition-all`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1 transition-all ${activeCategory === 'all' ? 'bg-ocean text-white shadow-lg shadow-ocean/30 scale-110' : 'bg-white border border-gray-100 text-gray-400 group-hover:bg-gray-50'}`}>
              ♾️
            </div>
            <span className={`text-xs font-medium ${activeCategory === 'all' ? 'text-ocean' : 'text-gray-500'}`}>All</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex flex-col items-center min-w-[70px] group transition-all"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-1 transition-all ${activeCategory === cat.id ? 'bg-ocean text-white shadow-lg shadow-ocean/30 scale-110' : 'bg-white border border-gray-100 text-gray-400 group-hover:bg-gray-50'}`}>
                {cat.icon}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${activeCategory === cat.id ? 'text-ocean' : 'text-gray-500'}`}>
                {lang === 'en' ? cat.label.en : cat.label.sw}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Shops Section */}
      {(activeCategory === 'all' || activeCategory === 'market') && (
        <div className="px-4 mb-8">
           <div className="flex justify-between items-center mb-3">
             <h3 className="text-md font-bold text-gray-800">{UI_TEXT.shopsHeader[lang]}</h3>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4">
             {/* Open Shop CTA */}
             <div className="min-w-[140px] w-[140px] flex flex-col items-center justify-center gap-2 cursor-pointer group bg-ocean/5 rounded-xl border border-dashed border-ocean">
                <div className="w-12 h-12 rounded-full bg-ocean/10 flex items-center justify-center text-xl text-ocean mb-1">
                  🏪
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-ocean text-sm">{UI_TEXT.openShop[lang]}</h4>
                  <span className="text-[10px] text-gray-500">Free forever</span>
                </div>
             </div>

             {stores.map(store => (
               <StoreCard 
                 key={store.id} 
                 store={store} 
                 onClick={() => onStoreClick(store.id)} 
               />
             ))}
           </div>
        </div>
      )}

      {/* Main Listings Grid */}
      <div className="px-4 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            {activeCategory === 'all' ? UI_TEXT.recentListings[lang] : (lang === 'en' ? CATEGORIES.find(c => c.id === activeCategory)?.label.en : CATEGORIES.find(c => c.id === activeCategory)?.label.sw)}
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-pulse">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-[4/3] bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(activeCategory === 'gigs' ? quickGigs : standardListings).map(item => (
              <ListingCard 
                key={item.id} 
                listing={item} 
                lang={lang}
                onClick={() => onListingClick(item.id)}
              />
            ))}
          </div>
        )}
        
        {!loading && listings.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p>Hakuna bidhaa kwa sasa. (No items yet)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;