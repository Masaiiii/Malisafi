
import React, { useState, useEffect } from 'react';
import { UI_TEXT, MOCK_DEALS } from '../constants';
import { Language, Listing } from '../types';
import DealCard from '../components/DealCard';
import ListingCard from '../components/ListingCard';
import QuickPostModal from '../components/QuickPostModal';
import PostItem from './PostItem';
import { fetchListings } from '../services/dataService';
import ListingDetail from './ListingDetail';

interface HomeProps {
  lang: Language;
  onViewChange: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onViewChange }) => {
  const isOnline = navigator.onLine;
  const [showQuickPost, setShowQuickPost] = useState(false);
  const [showPostItem, setShowPostItem] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    const data = await fetchListings();
    setListings(data);
  };

  const handlePostSuccess = () => {
    setShowPostItem(false);
    loadListings();
  };

  if (selectedListingId) {
    return <ListingDetail id={selectedListingId} lang={lang} onBack={() => setSelectedListingId(null)} />;
  }

  return (
    <div className="min-h-screen pb-32 relative overflow-hidden">
      {/* Floating Action Button with Glow */}
      <button 
        onClick={() => setShowQuickPost(true)}
        className="fixed bottom-28 right-6 z-40 bg-gradient-to-br from-gold to-orange-500 text-white w-16 h-16 rounded-full shadow-golden flex items-center justify-center text-3xl font-bold transition-all transform hover:scale-110 active:scale-95 animate-pop"
      >
        <span className="mb-1">+</span>
      </button>

      {/* Hero Section with Colorful Background */}
      <div className="relative px-4 pt-6 pb-8">
        {/* Animated Greeting */}
        <h2 className="text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 dark:from-white dark:to-gray-300 mb-8 animate-fade-in-up">
          {UI_TEXT.welcome[lang]} <span className="animate-pulse">👋</span>
        </h2>

        {/* Super Search Bar - Floating Glass */}
        <div className="relative group animate-fade-in-up delay-100">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-gold rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative shadow-xl rounded-2xl">
            <input 
              type="text" 
              placeholder={UI_TEXT.searchPlaceholder[lang]}
              className="w-full pl-14 pr-4 py-5 rounded-2xl bg-white/90 dark:bg-navy/90 backdrop-blur-xl text-charcoal dark:text-white border-0 focus:ring-2 focus:ring-teal-400 outline-none transition-all placeholder:text-gray-400 font-medium text-lg"
            />
            <span className="absolute left-5 top-5 text-2xl animate-float">🔍</span>
          </div>
        </div>
      </div>

      {/* Quick Categories - Animated Pills - Fixed Scrolling Padding */}
      <div className="mb-10 animate-fade-in-up delay-200">
         <div className="flex gap-3 overflow-x-auto no-scrollbar py-2 px-4">
            {[
              { id: 'fundis', label: 'Fundi', icon: '🛠️', bg: 'from-blue-400 to-blue-600' },
              { id: 'stays', label: 'Villas', icon: '🌴', bg: 'from-teal-400 to-teal-600' },
              { id: 'market', label: 'Market', icon: '🛍️', bg: 'from-purple-400 to-purple-600' },
              { id: 'jobs', label: 'Jobs', icon: '💼', bg: 'from-orange-400 to-orange-600' },
              { id: 'lost', label: 'Lost', icon: '🔎', bg: 'from-red-400 to-red-600' },
            ].map((cat, idx) => (
              <button 
                key={cat.id} 
                onClick={() => onViewChange(cat.id === 'jobs' || cat.id === 'lost' ? 'more' : cat.id)}
                className="group relative flex items-center gap-2 px-5 py-3 rounded-2xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 bg-white dark:bg-white/5 border border-white/20 overflow-hidden shrink-0"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <span className="text-xl group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                <span className="text-sm font-bold text-charcoal dark:text-white relative z-10">{cat.label}</span>
              </button>
            ))}
         </div>
      </div>

      {/* Flash Deals - Horizontal Scroll - Fixed Padding */}
      <div className="mb-10 animate-fade-in-up delay-300">
        <div className="flex items-center gap-2 mb-4 px-4">
          <div className="bg-gold/10 p-1.5 rounded-lg">
             <span className="text-gold animate-pulse text-xl">⚡</span>
          </div>
          <h3 className="font-bold text-xl text-charcoal dark:text-white tracking-tight">{UI_TEXT.flashDeals[lang]}</h3>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar px-4 pb-8">
          {MOCK_DEALS.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* Hot Nearby - Grid */}
      <div className="px-4 animate-fade-in-up delay-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-charcoal dark:text-white tracking-tight">{UI_TEXT.hotNearby[lang]}</h3>
          <button onClick={() => onViewChange('market')} className="text-teal-600 dark:text-teal-400 text-sm font-bold bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full hover:bg-teal-100 transition-colors">See All →</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {listings.slice(0, 4).map((listing, idx) => (
            <div key={listing.id} style={{ animationDelay: `${idx * 100}ms` }} className="animate-fade-in-up">
              <ListingCard listing={listing} onClick={() => setSelectedListingId(listing.id)} lang={lang} />
            </div>
          ))}
        </div>
      </div>

      {/* Offline Banner */}
      {!isOnline && (
        <div className="fixed bottom-24 left-4 right-4 bg-charcoal/90 backdrop-blur text-white text-xs font-bold py-3 px-4 rounded-xl text-center shadow-2xl z-50 animate-slide-up">
          ⚠️ No connection. Showing cached data.
        </div>
      )}

      {/* Modals */}
      {showQuickPost && (
        <QuickPostModal 
          onClose={() => setShowQuickPost(false)} 
          onSelect={(type) => { 
            setShowQuickPost(false); 
            setShowPostItem(true);
          }} 
        />
      )}

      {showPostItem && (
        <PostItem lang={lang} onClose={handlePostSuccess} />
      )}
    </div>
  );
};

export default Home;
