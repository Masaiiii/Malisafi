import { Translations, LocationTag, CategoryId, Listing, EmergencyContact, Store, Service, UtilityStatus } from './types';

export const LOCATIONS: LocationTag[] = [
  { id: 'cbd', name: 'Malindi Town' },
  { id: 'barani', name: 'Barani' },
  { id: 'shella', name: 'Shella' },
  { id: 'casuarina', name: 'Casuarina' },
  { id: 'watamu', name: 'Watamu' },
  { id: 'mambrui', name: 'Mambrui' },
  { id: 'marine', name: 'Marine Park' },
];

export const CATEGORIES: { id: CategoryId; label: { en: string; sw: string }; icon: string }[] = [
  { id: 'fundis', label: { en: 'Find Fundi', sw: 'Tafuta Fundi' }, icon: '🛠️' },
  { id: 'market', label: { en: 'Marketplace', sw: 'Soko' }, icon: '🛍️' },
  { id: 'food', label: { en: 'Food', sw: 'Chakula' }, icon: '🍔' },
  { id: 'emergency', label: { en: 'Emergency', sw: 'Dharura' }, icon: '🚑' },
];

export const UI_TEXT: Translations = {
  welcome: { en: 'Tropical Trust', sw: 'Uaminifu wa Pwani' },
  searchPlaceholder: { en: 'What do you need? (e.g. Plumber)', sw: 'Unatafuta nini? (mf. Fundi)' },
  postButton: { en: 'Sell / Post', sw: 'Uza / Weka' },
  recentListings: { en: 'Fresh in Market', sw: 'Sokoni Leo' },
  featured: { en: 'Featured', sw: 'Imependekezwa' },
  verifiedSeller: { en: 'Verified Pro', sw: 'Amethibitishwa' },
  reportScam: { en: 'Report Scammer', sw: 'Ripoti Tapeli' },
  safetyTip: { en: '⚠️ Never send M-Pesa before seeing the item.', sw: '⚠️ Usitume pesa kabla ya kuona bidhaa.' },
  uploadImage: { en: 'Upload Photos (Max 5)', sw: 'Weka Picha (Max 5)' },
  step1: { en: 'Category', sw: 'Kitengo' },
  step2: { en: 'Photos', sw: 'Picha' },
  step3: { en: 'Details', sw: 'Maelezo' },
  step4: { en: 'Verify', sw: 'Thibitisha' },
  submit: { en: 'Post Listing', sw: 'Weka Tangazo' },
  requestQuote: { en: 'WhatsApp Quote', sw: 'Pata Bei (WhatsApp)' },
  utilityWidget: { en: 'Utility Status', sw: 'Hali ya Umeme/Maji' },
  itemsCount: { en: 'Items in Stock', sw: 'Bidhaa Dukani' },
  loading: { en: 'Loading...', sw: 'Inapakia...' },
  description: { en: 'Description', sw: 'Maelezo' },
  shops: { en: 'Popular Shops', sw: 'Maduka Maarufu' },
};

export const MOCK_UTILITIES: UtilityStatus[] = [
  { id: '1', type: 'Power', status: 'On', last_updated: '10 mins ago', area_message: 'Stable in Town' },
  { id: '2', type: 'Water', status: 'Off', last_updated: '1 hr ago', area_message: 'Maintenance in Casuarina' },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    provider_id: 'u1',
    name: 'Juma the Plumber',
    profession: 'Plumber',
    location: 'Barani',
    base_rate: '500 KES / Visit',
    rating_avg: 4.8,
    rating_count: 24,
    is_verified: true,
    languages: ['Swahili', 'English'],
    image_url: 'https://picsum.photos/100/100?random=20',
    portfolio_images: ['https://picsum.photos/300/200?random=21', 'https://picsum.photos/300/200?random=22'],
    whatsapp: '254700000000'
  },
  {
    id: 's2',
    name: 'Mama Safi Cleaning',
    provider_id: 'u2',
    profession: 'Salon',
    location: 'Town',
    base_rate: '1500 KES / Full',
    rating_avg: 4.9,
    rating_count: 102,
    is_verified: true,
    languages: ['Swahili', 'Italian'],
    image_url: 'https://picsum.photos/100/100?random=23',
    portfolio_images: ['https://picsum.photos/300/200?random=24'],
    whatsapp: '254711000000'
  },
  {
    id: 's3',
    name: 'Luigi Electric',
    provider_id: 'u3',
    profession: 'Electrician',
    location: 'Casuarina',
    base_rate: '1000 KES / Visit',
    rating_avg: 5.0,
    rating_count: 15,
    is_verified: true,
    languages: ['Italian', 'English'],
    image_url: 'https://picsum.photos/100/100?random=25',
    portfolio_images: [],
    whatsapp: '254722000000'
  }
];

export const MOCK_STORES: Store[] = [
  {
    id: 'store1',
    name: 'Sultan Electronics',
    description: 'The home of original smartphones, laptops, and accessories in Malindi. We offer 1-year warranty on all new devices. Located next to Galaxy Building.',
    location: 'Malindi Town',
    image_url: 'https://picsum.photos/100/100?random=50',
    cover_url: 'https://picsum.photos/800/400?random=51',
    whatsapp: '254700111222',
    is_verified: true,
    category: 'Electronics',
    opening_hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
  },
  {
    id: 'store2',
    name: 'Mama Zuri Boutique',
    description: 'Trendy coastal wear, deras, khangas, and sandals. We import high-quality fashion for ladies and kids. Visit us for the latest Swahili fashion.',
    location: 'Barani',
    image_url: 'https://picsum.photos/100/100?random=52',
    cover_url: 'https://picsum.photos/800/400?random=53',
    whatsapp: '254700333444',
    is_verified: true,
    category: 'Fashion',
    opening_hours: 'Everyday: 10:00 AM - 8:00 PM',
  }
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Teak Lamu Bed (6x6)',
    description: 'Original Lamu bed, heavy wood. Moving sale.',
    price: 45000,
    category: 'Furniture',
    location: 'Shella',
    image_url: 'https://picsum.photos/400/300?random=1',
    whatsapp: '254712345678',
    is_featured: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    views: 120,
    user_name: 'Amina',
  },
  {
    id: '2',
    title: 'TukTuk for Sale - TVS',
    description: 'Engine iko safi. Buy and drive. Logbook ready.',
    price: 250000,
    category: 'Vehicles',
    location: 'Malindi Town',
    image_url: 'https://picsum.photos/400/300?random=2',
    whatsapp: '254700000000',
    is_featured: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    views: 340,
    user_name: 'Rashid',
  },
  {
    id: '3',
    title: 'Samsung A14',
    description: 'Brand new, sealed box. 64GB storage. 1 year warranty.',
    price: 18000,
    category: 'Electronics',
    location: 'Town',
    image_url: 'https://picsum.photos/400/300?random=3',
    whatsapp: '254700111222',
    is_featured: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    views: 80,
    user_name: 'Sultan Electronics',
    store_id: 'store1',
  },
  {
    id: '4',
    title: 'Cotton Dera - Max',
    description: 'Free size, heavy cotton. Different colors available.',
    price: 1200,
    category: 'Fashion',
    location: 'Barani',
    image_url: 'https://picsum.photos/400/300?random=4',
    whatsapp: '254700333444',
    is_featured: true,
    is_verified: true,
    created_at: new Date().toISOString(),
    views: 55,
    user_name: 'Mama Zuri',
    store_id: 'store2',
  },
  {
    id: '5',
    title: 'HP Laptop Core i5',
    description: 'Refurbished, good condition. Comes with charger.',
    price: 28000,
    category: 'Electronics',
    location: 'Town',
    image_url: 'https://picsum.photos/400/300?random=5',
    whatsapp: '254700111222',
    is_featured: false,
    is_verified: true,
    created_at: new Date().toISOString(),
    views: 20,
    user_name: 'Sultan Electronics',
    store_id: 'store1',
  }
];

export const MOCK_EMERGENCY: EmergencyContact[] = [
  { name: 'Malindi Police', phone: '999', category: 'Police' },
  { name: 'Tawfiq Hospital', phone: '+254700000000', category: 'Medical' },
  { name: 'Fire Station', phone: '0422120430', category: 'Fire' },
  { name: 'KPLC Emergency', phone: '97771', category: 'Utility' },
];
