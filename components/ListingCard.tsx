import React from 'react';
import { Listing, Language } from '../types';
import { UI_TEXT } from '../constants';

interface ListingCardProps {
  listing: Listing;
  onClick: () => void;
  lang: Language;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onClick, lang }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
    >
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img 
          src={listing.image_url} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {listing.is_featured && (
          <span className="absolute top-2 left-2 bg-sunset text-gray-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {UI_TEXT.featured[lang]}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
          <p className="text-white text-xs font-medium flex items-center gap-1">
            📍 {listing.location}
          </p>
        </div>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-gray-900 line-clamp-1">{listing.title}</h3>
        </div>
        
        <p className="text-ocean font-bold font-heading">
          KSh {listing.price.toLocaleString()}
        </p>

        {listing.is_verified && (
          <div className="mt-2 flex items-center gap-1 text-[10px] text-verified font-medium bg-verified/10 w-fit px-2 py-0.5 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;