
import React, { useState, useEffect } from 'react';
import { Listing, Language } from '../types';
import { toggleWishlist, isInWishlist } from '../services/wishlistService';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
  lang: Language;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(isInWishlist(listing.id));
    
    const handleUpdate = () => setIsLiked(isInWishlist(listing.id));
    window.addEventListener('wishlist-updated', handleUpdate);
    return () => window.removeEventListener('wishlist-updated', handleUpdate);
  }, [listing.id]);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(listing.id);
    setIsLiked(!isLiked);
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-navy rounded-2xl overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 group cursor-pointer animate-fade-in-up transform hover:-translate-y-1 relative"
    >
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        <img 
          src={listing.image_url} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <button 
            onClick={handleLike}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-all active:scale-90 ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
          >
            <span className={`text-lg leading-none ${isLiked ? 'animate-pop' : ''}`}>♥</span>
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-white/90 dark:bg-navy/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-charcoal dark:text-white shadow-sm">
          {listing.category}
        </div>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
           <h3 className="text-charcoal dark:text-white font-bold text-sm line-clamp-1 leading-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{listing.title}</h3>
        </div>
        <div className="text-gold font-bold text-base mb-1">KSh {listing.price.toLocaleString()}</div>
        <div className="flex items-center gap-1 text-[10px] text-gray-400">
          <span>📍 {listing.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
