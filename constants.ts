import { Translations, LocationTag, CategoryId, Listing, EmergencyContact, Store, Service, UtilityStatus, Stay, Deal, FundiPackage, Event, UserProfile } from './types';

export const LOCATIONS: LocationTag[] = [
  { id: 'cbd', name: 'Malindi Town' },
  { id: 'barani', name: 'Barani' },
  { id: 'shella', name: 'Shella' },
  { id: 'casuarina', name: 'Casuarina' },
  { id: 'watamu', name: 'Watamu' },
  { id: 'mambrui', name: 'Mambrui' },
  { id: 'marine', name: 'Marine Park' },
];

export const UI_TEXT: Translations = {
  welcome: { en: 'Karibu Malindi', sw: 'Karibu Malindi' },
  searchPlaceholder: { en: 'Tafuta fundi, nyumba, gig, deal...', sw: 'Tafuta fundi, nyumba, gig, deal...' },
  availableToday: { en: 'Available Today', sw: 'Inapatikana Leo' },
  hotNearby: { en: 'Hot Nearby', sw: 'Moto Eneo Hili' },
  flashDeals: { en: 'Flash Deals', sw: 'Deals za Haraka' },
  verified: { en: 'Verified', sw: 'Imethibitishwa' },
  bookNow: { en: 'Book Now', sw: 'Weka Sasa' },
  contact: { en: 'Contact', sw: 'Wasiliana' },
  perNight: { en: '/ night', sw: '/ usiku' },
  loading: { en: 'Loading...', sw: 'Inapakia...' },
  safetyTip: { en: 'Never pay before seeing the item.', sw: 'Usilipe kabla ya kuona bidhaa.' },
  description: { en: 'Description', sw: 'Maelezo' },
  verifiedSeller: { en: 'Verified Seller', sw: 'Muuzaji Aliyeidhinishwa' },
  itemsCount: { en: 'Items', sw: 'Bidhaa' },
  step1: { en: 'What are you posting?', sw: 'Unapost nini?' },
  step2: { en: 'Add Photos', sw: 'Weka Picha' },
  step3: { en: 'Details', sw: 'Maelezo' },
  step4: { en: 'Verification', sw: 'Uthibitishaji' },
  submit: { en: 'Post Now', sw: 'Post Sasa' },
};

export const MOCK_DEALS: Deal[] = [
  {
    id: 'd1',
    title: 'Sunset Dhow Cruise for 2',
    original_price: 6000,
    deal_price: 3500,
    image_url: 'https://picsum.photos/400/250?random=88',
    expires_in_hours: 4,
    store_name: 'Che Shale Dhows'
  },
  {
    id: 'd2',
    title: 'Massage Full Body',
    original_price: 2500,
    deal_price: 1500,
    image_url: 'https://picsum.photos/400/250?random=89',
    expires_in_hours: 2,
    store_name: 'Oasis Spa'
  },
  {
    id: 'd3',
    title: 'Fresh Kingfish (3kg)',
    original_price: 1800,
    deal_price: 1200,
    image_url: 'https://picsum.photos/400/250?random=90',
    expires_in_hours: 6,
    store_name: 'Mama Samaki Market'
  }
];

export const MOCK_EVENTS: Event[] = [
  { title: 'Pool Party BBQ', date: 'Sat, 12 Aug', description: 'Open to public. 1500 KES entry.', image_url: 'https://picsum.photos/200/200?random=12' },
  { title: 'Yoga by the Ocean', date: 'Sun, 13 Aug', description: 'Morning flow. Free.', image_url: 'https://picsum.photos/200/200?random=13' }
];

export const MOCK_STAYS: Stay[] = [
  {
    id: 'st1',
    title: 'Villa Jasmine - Oceanfront',
    type: 'Villa',
    location: 'Casuarina',
    price_per_night: 15000,
    rating: 4.9,
    image_url: 'https://picsum.photos/600/400?random=101',
    features: ['Pool', 'Chef Included', '5 Bedrooms'],
    whatsapp: '254700000000',
    is_verified: true,
    description: 'A stunning oceanfront villa perfect for families.',
    events: MOCK_EVENTS
  },
  {
    id: 'st2',
    title: 'Cozy Swahili Apartment',
    type: 'Apartment',
    location: 'Shella',
    price_per_night: 3500,
    rating: 4.7,
    image_url: 'https://picsum.photos/600/400?random=102',
    features: ['WiFi', 'AC', 'Walk to Beach'],
    whatsapp: '254700000000',
    is_verified: true,
    description: 'Traditional Swahili architecture with modern amenities.'
  },
  {
    id: 'st3',
    title: 'Watamu Treehouse',
    type: 'Guest House',
    location: 'Watamu',
    price_per_night: 8000,
    rating: 5.0,
    image_url: 'https://picsum.photos/600/400?random=103',
    features: ['Forest View', 'Yoga Deck'],
    whatsapp: '254700000000',
    is_verified: true,
    description: 'Immersive nature experience in the trees.'
  }
];

export const MOCK_PACKAGES: FundiPackage[] = [
  { title: 'Full Day Service', price: 2500, description: '8 hours of work' },
  { title: 'Quick Fix', price: 800, description: 'Under 1 hour repair' },
];

export const MOCK_SERVICES: Service[] = [
  {
    id: 's1',
    provider_id: 'u1',
    name: 'Juma the Plumber',
    profession: 'Plumber',
    location: 'Barani',
    base_rate: '800 KES / hr',
    rating_avg: 4.9,
    rating_count: 124,
    is_verified: true,
    languages: ['Swahili', 'English'],
    image_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    portfolio_images: ['https://picsum.photos/300/200?random=21', 'https://picsum.photos/300/200?random=22'],
    whatsapp: '254700000000',
    distance: '2.1 km',
    is_available_today: true,
    packages: MOCK_PACKAGES,
    bio: 'Expert plumber with 10 years experience in Malindi.'
  },
  {
    id: 's2',
    name: 'Mama Maria Cleaning',
    provider_id: 'u2',
    profession: 'Cleaner',
    location: 'Town',
    base_rate: '1500 KES / day',
    rating_avg: 4.8,
    rating_count: 85,
    is_verified: true,
    languages: ['Swahili'],
    image_url: 'https://randomuser.me/api/portraits/women/44.jpg',
    portfolio_images: ['https://picsum.photos/300/200?random=24'],
    whatsapp: '254711000000',
    distance: '0.8 km',
    is_available_today: true,
    packages: [{title: 'Deep Clean', price: 3000, description: 'Full house deep clean'}],
    bio: 'Reliable and thorough cleaning services for homes and offices.'
  },
  {
    id: 's3',
    name: 'Luigi Electric',
    provider_id: 'u3',
    profession: 'Electrician',
    location: 'Casuarina',
    base_rate: '1000 KES / visit',
    rating_avg: 5.0,
    rating_count: 42,
    is_verified: true,
    languages: ['English'],
    image_url: 'https://randomuser.me/api/portraits/men/85.jpg',
    portfolio_images: [],
    whatsapp: '254722000000',
    distance: '3.5 km',
    is_available_today: false,
    bio: 'Certified electrician specializing in villa maintenance.'
  }
];

export const MOCK_UTILITIES: UtilityStatus[] = [
  { id: '1', type: 'Power', status: 'On', last_updated: '10 mins ago', area_message: 'Stable in Town' },
  { id: '2', type: 'Water', status: 'Off', last_updated: '1 hr ago', area_message: 'Repair in Casuarina' },
];

export const MOCK_EMERGENCY: EmergencyContact[] = [
  { name: 'Malindi Police', phone: '999', category: 'Police' },
  { name: 'Tawfiq Hospital', phone: '+254700000000', category: 'Medical' },
  { name: 'Fire Station', phone: '0422120430', category: 'Fire' },
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
  }
];

export const MOCK_STORES: Store[] = [
  {
    id: 'store1',
    name: 'Sultan Electronics',
    description: 'The home of original smartphones.',
    location: 'Malindi Town',
    image_url: 'https://picsum.photos/100/100?random=50',
    whatsapp: '254700111222',
    is_verified: true,
    category: 'Electronics',
    opening_hours: 'Mon-Sat: 9:00 AM - 7:00 PM',
  }
];

export const MOCK_USER: UserProfile = {
  id: 'me',
  name: 'Felix Otieno',
  phone: '+254 712 345 678',
  bio: 'Just a guy loving the coast life. Looking for good deals.',
  role: 'Local',
  image_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
};