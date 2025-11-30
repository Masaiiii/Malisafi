export type Language = 'en' | 'sw';

export type CategoryId = 
  | 'all' 
  | 'market' 
  | 'fundis' 
  | 'food' 
  | 'emergency'
  | 'transport';

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

export interface Service {
  id: string;
  provider_id: string;
  name: string;
  profession: 'Plumber' | 'Electrician' | 'Chef' | 'Mechanic' | 'Salon' | 'TukTuk';
  location: string;
  base_rate: string;
  rating_avg: number;
  rating_count: number;
  is_verified: boolean;
  languages: string[];
  image_url: string; // Profile pic
  portfolio_images: string[];
  whatsapp: string;
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
  category: string; // 'Furniture', 'Electronics', 'Vehicles'
  location: string;
  image_url: string; // Main image
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