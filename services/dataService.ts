import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Listing, CategoryId, Store } from '../types';
import { MOCK_LISTINGS, MOCK_STORES } from '../constants';

// A simple in-memory store for new posts if supabase isn't connected
let localListings = [...MOCK_LISTINGS];
let localStores = [...MOCK_STORES];

export const fetchListings = async (category: CategoryId = 'all'): Promise<Listing[]> => {
  if (isSupabaseConfigured && supabase) {
    let query = supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (category !== 'all') {
      if (category === 'deals') {
        // Assume deals are market items with low price or specific tag (simplified logic)
        query = query.eq('is_featured', true);
      } else {
        query = query.eq('category', category);
      }
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase error:', error);
      return localListings;
    }
    return data as Listing[];
  } else {
    // Mock Data Fallback
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network
    if (category === 'all') return localListings;
    if (category === 'deals') return localListings.filter(l => l.is_featured);
    return localListings.filter(l => l.category === category);
  }
};

export const fetchStores = async (): Promise<Store[]> => {
  if (isSupabaseConfigured && supabase) {
     const { data, error } = await supabase.from('stores').select('*');
     if (error) return localStores;
     return data as Store[];
  }
  return localStores;
};

export const getStoreById = async (id: string): Promise<Store | undefined> => {
   if (isSupabaseConfigured && supabase) {
     const { data } = await supabase.from('stores').select('*').eq('id', id).single();
     return data;
   }
   return localStores.find(s => s.id === id);
};

export const fetchListingsByStore = async (storeId: string): Promise<Listing[]> => {
   // In a real app with Supabase, we would query where store_id = storeId
   if (isSupabaseConfigured && supabase) {
      const { data } = await supabase.from('listings').select('*').eq('store_id', storeId);
      return data as Listing[] || [];
   }
   return localListings.filter(l => l.store_id === storeId);
};

export const createListing = async (listing: Omit<Listing, 'id' | 'views' | 'created_at' | 'is_verified' | 'is_featured'>): Promise<Listing | null> => {
  const newListing: Listing = {
    ...listing,
    id: Math.random().toString(36).substr(2, 9),
    views: 0,
    created_at: new Date().toISOString(),
    is_verified: false,
    is_featured: false,
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('listings')
      .insert([newListing])
      .select();
    
    if (error) {
      console.error('Error creating listing:', error);
      return null;
    }
    return data?.[0] || null;
  } else {
    localListings = [newListing, ...localListings];
    return newListing;
  }
};

export const getListingById = async (id: string): Promise<Listing | undefined> => {
   if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('listings').select('*').eq('id', id).single();
    return data;
   }
   return localListings.find(l => l.id === id);
}