export type Language = 'en' | 'sw';

export type CategoryId = 
  | 'all' 
  | 'market' 
  | 'fundis' 
  | 'food' 
  | 'stays'
  | 'jobs'
  | 'lost'
  | 'emergency';

export interface LocationTag {
  id: string;
  name: string;
}

export interface UtilityStatus {
  id: string;
  type: 'Power' | 'Water';
  status: 'On' | 'Off';
  last_updated: string;
  area_message?: string;
}

export interface FundiPackage {
  title: string;
  price: number;
  description: string;
}

export interface Service {
  id: string;
  provider_id: string;
  name: string;
  profession: 'Plumber' | 'Electrician' | 'Chef' | 'Mechanic' | 'Salon' | 'TukTuk' | 'Cleaner' | 'Gardener' | 'Mason';
  location: string;
  base_rate: string;
  rating_avg: number;
  rating_count: number;
  is_verified: boolean;
  languages: string[];
  image_url: string; // Profile pic
  portfolio_images: string[];
  whatsapp: string;
  distance?: string;
  is_available_today?: boolean;
  packages?: FundiPackage[];
  bio?: string;
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
  opening_hours?: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string; 
  location: string;
  image_url: string;
  additional_images?: string[];
  whatsapp: string;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
  expires_at?: string; 
  user_name?: string;
  store_id?: string;
  views: number;
  seller_id?: string;
}

export interface Event {
  title: string;
  date: string;
  description: string;
  image_url?: string;
}

export interface Stay {
  id: string;
  title: string;
  type: 'Villa' | 'Apartment' | 'Guest House';
  location: string;
  price_per_night: number;
  rating: number;
  image_url: string;
  features: string[];
  whatsapp: string;
  is_verified: boolean;
  description?: string;
  events?: Event[];
  host_id?: string;
}

export interface Deal {
  id: string;
  title: string;
  original_price: number;
  deal_price: number;
  image_url: string;
  expires_in_hours: number;
  store_name: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  category: 'Police' | 'Medical' | 'Fire' | 'Utility';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  bio: string;
  role: 'Local' | 'Fundi' | 'Villa Owner' | 'Shop Owner';
  image_url: string;
}

export interface Translations {
  [key: string]: {
    en: string;
    sw: string;
  }
}