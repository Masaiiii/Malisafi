import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Listing, Service, UtilityStatus, Store } from '../types';
import { MOCK_LISTINGS, MOCK_SERVICES, MOCK_UTILITIES, MOCK_STORES } from '../constants';

let localListings = [...MOCK_LISTINGS];

export const fetchUtilityStatus = async (): Promise<UtilityStatus[]> => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('utility_status').select('*');
    return data as UtilityStatus[] || MOCK_UTILITIES;
  }
  return MOCK_UTILITIES;
};

export const fetchServices = async (profession?: string): Promise<Service[]> => {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('services').select('*');
    if (profession && profession !== 'All') {
      query = query.eq('profession', profession);
    }
    const { data } = await query;
    return data as Service[] || MOCK_SERVICES;
  }
  // Local filter
  if (profession && profession !== 'All') {
    return MOCK_SERVICES.filter(s => s.profession === profession);
  }
  return MOCK_SERVICES;
};

export const fetchListings = async (category: string = 'all'): Promise<Listing[]> => {
  if (isSupabaseConfigured && supabase) {
    let query = supabase.from('listings').select('*').order('created_at', { ascending: false });
    // In real app, filter logic here
    const { data } = await query;
    return data as Listing[] || localListings;
  }
  return localListings;
};

export const createListing = async (listing: Partial<Listing>): Promise<Listing | null> => {
  const newListing: Listing = {
    id: Math.random().toString(36).substr(2, 9),
    title: listing.title || '',
    description: listing.description || '',
    price: listing.price || 0,
    category: listing.category || 'Market',
    location: listing.location || 'Town',
    image_url: listing.image_url || '',
    whatsapp: listing.whatsapp || '',
    is_verified: false,
    is_featured: false,
    views: 0,
    created_at: new Date().toISOString(),
    ...listing
  } as Listing;

  localListings = [newListing, ...localListings];
  return newListing;
};

export const getListingById = async (id: string): Promise<Listing | undefined> => {
   return localListings.find(l => l.id === id);
}

export const getStoreById = async (id: string): Promise<Store | undefined> => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('stores').select('*').eq('id', id).single();
    return data as Store || MOCK_STORES.find(s => s.id === id);
  }
  return MOCK_STORES.find(s => s.id === id);
}

export const fetchStores = async (): Promise<Store[]> => {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('stores').select('*');
    return data as Store[] || MOCK_STORES;
  }
  return MOCK_STORES;
};

export const fetchListingsByStore = async (id: string): Promise<Listing[]> => {
  if (isSupabaseConfigured && supabase) {
     const { data } = await supabase.from('listings').select('*').eq('store_id', id);
     return data as Listing[] || localListings.filter(l => l.store_id === id);
  }
  return localListings.filter(l => l.store_id === id);
};