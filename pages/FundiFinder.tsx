import React, { useState, useEffect } from 'react';
import { Service, Language } from '../types';
import { fetchServices } from '../services/dataService';
import ServiceCard from '../components/ServiceCard';

interface FundiFinderProps {
  lang: Language;
}

const PROFESSIONS = ['All', 'Plumber', 'Electrician', 'Chef', 'Salon', 'Mechanic'];

const FundiFinder: React.FC<FundiFinderProps> = ({ lang }) => {
  const [profession, setProfession] = useState('All');
  const [italianFilter, setItalianFilter] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchServices(profession);
      setServices(data);
      setLoading(false);
    };
    load();
  }, [profession]);

  const filteredServices = services.filter(s => {
    if (italianFilter && !s.languages.includes('Italian')) return false;
    return true;
  });

  return (
    <div className="pb-24 max-w-7xl mx-auto relative">
      {/* Filters */}
      <div className="sticky top-[68px] z-30 bg-slate-50/95 backdrop-blur py-3 px-4 border-b border-slate-200">
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3">
          {PROFESSIONS.map(p => (
            <button
              key={p}
              onClick={() => setProfession(p)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                profession === p ? 'bg-ocean text-white shadow-lg shadow-ocean/30 scale-105' : 'bg-white text-slate-500 border border-slate-200 hover:border-ocean hover:text-ocean'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium cursor-pointer hover:bg-slate-50 transition-colors">
            <input 
              type="checkbox" 
              checked={italianFilter}
              onChange={(e) => setItalianFilter(e.target.checked)}
              className="accent-ocean w-4 h-4 rounded"
            />
            🇮🇹 Italian Speaking
          </label>
        </div>
      </div>

      <div className="px-4 py-6">
        {loading ? (
          <div className="text-center py-20 text-slate-400">Loading Fundis...</div>
        ) : filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 text-sm">No fundis found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FundiFinder;