export type Language = 'en' | 'sw';

export type CategoryId = 
  | 'all' 
  | 'market' 
  | 'stays' 
  | 'services' 
  | 'food' 
  | 'lostfound' 
  | 'jobs' 
  | 'deals' 
  | 'rides' 
  | 'emergency'
  | 'gigs'; // Added gigs for quick tasks

export interface LocationTag {
  id: string;
  name: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  location: string;
  image_url: string;
  cover_url?: string;
  whatsapp: string;
  is_verified: boolean;
  owner_id?: string;
  category: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: CategoryId;
  location: string;
  image_url: string;
  whatsapp: string;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  expires_at?: string; // New field for 24h posts
  user_name?: string;
  store_id?: string; // Link to a store
  views: number;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  category: 'Police' | 'Medical' | 'Fire' | 'Utility';
}

export interface Translations {
  [key: string]: {
    en: string;
    sw: string;
  }
}