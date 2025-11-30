import React, { useEffect, useState } from 'react';
import { Listing, Language } from '../types';
import { fetchListings } from '../services/dataService';
import { getWishlist } from '../services/wishlistService';
import ListingCard from '../components/ListingCard';

interface WishlistProps {
  lang: Language;
  onListingClick: (id: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ lang, onListingClick }) => {
  const [items, setItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
    window.addEventListener('wishlist-updated', loadWishlist);
    return () => window.removeEventListener('wishlist-updated', loadWishlist);
  }, []);

  const loadWishlist = async () => {
    setLoading(true);
    const savedIds = getWishlist();
    const allListings = await fetchListings();
    const savedItems = allListings.filter(l => savedIds.includes(l.id));
    setItems(savedItems);
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <h2 className="text-2xl font-bold font-heading text-charcoal dark:text-white mb-6">My Wishlist</h2>
      
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {items.map((listing, idx) => (
            <div key={listing.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
              <ListingCard 
                listing={listing} 
                onClick={() => onListingClick(listing.id)} 
                lang={lang} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 flex flex-col items-center opacity-60">
           <span className="text-6xl mb-4 text-gray-300 dark:text-gray-700">♥</span>
           <h3 className="font-bold text-lg text-charcoal dark:text-white mb-2">No saved items yet</h3>
           <p className="text-sm text-gray-500 max-w-xs">Tap the heart icon on any listing to save it here for later.</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;