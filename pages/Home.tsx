import React, { useEffect, useState } from 'react';
import { UI_TEXT, CATEGORIES } from '../constants';
import { Service, UtilityStatus, Language, Store } from '../types';
import { fetchUtilityStatus, fetchServices, fetchStores } from '../services/dataService';
import UtilityWidget from '../components/UtilityWidget';
import StoreCard from '../components/StoreCard';

interface HomeProps {
  lang: Language;
  onViewChange: (view: string) => void;
  onStoreClick: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ lang, onViewChange, onStoreClick }) => {
  const [utilities, setUtilities] = useState<UtilityStatus[]>([]);
  const [trustedPros, setTrustedPros] = useState<Service[]>([]);
  const [popularStores, setPopularStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [utilData, prosData, storesData] = await Promise.all([
        fetchUtilityStatus(),
        fetchServices(),
        fetchStores()
      ]);
      setUtilities(utilData);
      setTrustedPros(prosData.filter(s => s.is_verified).slice(0, 5));
      setPopularStores(storesData);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <div className="bg-ocean pb-10 pt-6 px-4 rounded-b-[2.5rem] shadow-glow mb-8 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-deepBlue/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold font-heading mb-1">{UI_TEXT.welcome[lang]}</h2>
              <p className="text-blue-100 text-sm opacity-90">Find trusted services in Malindi.</p>
            </div>
          </div>

          {/* Search Bar Floating */}
          <div className="relative group max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder={UI_TEXT.searchPlaceholder[lang]}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-slate-800 shadow-xl shadow-ocean/20 border-0 focus:ring-4 focus:ring-ocean/20 outline-none transition-all placeholder:text-slate-400 font-medium text-sm"
            />
            <span className="absolute left-4 top-4 text-xl text-ocean">🔍</span>
          </div>
          
          <div className="mt-6 max-w-2xl mx-auto">
             <UtilityWidget utilities={utilities} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 space-y-10">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id}
              onClick={() => onViewChange(cat.id === 'fundis' ? 'fundis' : cat.id === 'emergency' ? 'emergency' : 'market')}
              className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-ocean/30 transition-all duration-300 flex flex-col items-center gap-3 text-center"
            >
              <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-ocean/10 transition-transform">
                {cat.icon}
              </div>
              <span className="font-bold text-slate-700 group-hover:text-ocean transition-colors">
                {lang === 'en' ? cat.label.en : cat.label.sw}
              </span>
            </button>
          ))}
        </div>

        {/* Featured / Verified Promo */}
        <div className="bg-gradient-to-r from-deepBlue to-ocean text-white p-6 rounded-2xl shadow-lg relative overflow-hidden flex items-center justify-between">
           <div className="relative z-10 max-w-lg">
             <div className="flex items-center gap-2 mb-2">
               <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Safety First</span>
             </div>
             <h3 className="text-xl font-bold mb-2">Verified Fundis Only</h3>
             <p className="text-blue-100 text-sm mb-4 max-w-xs">We check IDs and past work so you don't have to. Look for the Blue Tick.</p>
             <button onClick={() => onViewChange('fundis')} className="bg-white text-ocean px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors">
               Find a Pro
             </button>
           </div>
           <div className="text-[8rem] absolute -right-4 -bottom-8 opacity-20">🛡️</div>
        </div>

        {/* Trusted Pros */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="text-ocean">★</span> {lang === 'en' ? 'Trusted Pros' : 'Mafundi Bora'}
            </h3>
            <button onClick={() => onViewChange('fundis')} className="text-ocean text-sm font-semibold hover:underline">See All</button>
          </div>
          
          {/* Responsive scrolling or grid */}
          <div className="flex md:grid md:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {trustedPros.map(pro => (
              <div 
                key={pro.id}
                className="min-w-[160px] md:min-w-0 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="relative">
                  <img src={pro.image_url} className="w-16 h-16 rounded-full bg-slate-100 mb-3 object-cover border-2 border-white shadow-sm" />
                  <div className="absolute bottom-0 right-0 bg-verified text-white text-[10px] p-0.5 rounded-full border border-white">✓</div>
                </div>
                <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{pro.name}</h4>
                <p className="text-xs text-slate-500 mb-2">{pro.profession}</p>
                <div className="mt-auto bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-xs font-bold">
                  ★ {pro.rating_avg}
                </div>
              </div>
            ))}
          </div>
        </div>

         {/* Popular Shops */}
         <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
              <span className="text-ocean">🛍️</span> {UI_TEXT.shops[lang]}
            </h3>
          </div>
          
          <div className="flex md:grid md:grid-cols-6 gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
            {popularStores.length > 0 ? (
              popularStores.map(store => (
                <div key={store.id} className="min-w-[140px] md:min-w-0">
                   <StoreCard store={store} onClick={() => onStoreClick(store.id)} />
                </div>
              ))
            ) : (
               <div className="text-xs text-slate-400 pl-4">No shops found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;