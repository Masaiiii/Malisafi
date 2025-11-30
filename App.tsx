import React, { useState } from 'react';
import { Language } from './types';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import ListingDetail from './pages/ListingDetail';
import Emergency from './pages/Emergency';
import FundiFinder from './pages/FundiFinder';
import StoreProfile from './pages/StoreProfile';
import { fetchListings } from './services/dataService';
import ListingCard from './components/ListingCard';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [listings, setListings] = useState<any[]>([]);

  // Responsive Marketplace View
  const Marketplace = () => {
    React.useEffect(() => {
      fetchListings().then(setListings);
    }, []);
    return (
      <div className="px-4 py-6 pb-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading text-slate-800">
            {lang === 'en' ? 'Marketplace' : 'Soko'}
          </h2>
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-bold border border-red-100 flex items-center gap-2">
             <span>🛡️</span> Never send money in advance
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {listings.map(l => (
             <ListingCard key={l.id} listing={l} lang={lang} onClick={() => { setSelectedId(l.id); setView('details'); }} />
          ))}
        </div>
      </div>
    );
  };

  const handleStoreClick = (id: string) => {
    setSelectedStoreId(id);
    setView('store');
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home lang={lang} onViewChange={setView} onStoreClick={handleStoreClick} />;
      case 'fundis':
        return <FundiFinder lang={lang} />;
      case 'market':
        return <Marketplace />;
      case 'post':
        return <PostItem lang={lang} onClose={() => setView('home')} />;
      case 'emergency':
        return <Emergency lang={lang} />;
      case 'details':
        if (!selectedId) return null;
        return <ListingDetail id={selectedId} lang={lang} onBack={() => setView('market')} />;
      case 'store':
        if (!selectedStoreId) return null;
        return (
          <StoreProfile 
            storeId={selectedStoreId} 
            lang={lang} 
            onBack={() => setView('home')} 
            onListingClick={(id) => { setSelectedId(id); setView('details'); }}
          />
        );
      default:
        return <Home lang={lang} onViewChange={setView} onStoreClick={handleStoreClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-safe selection:bg-ocean/20">
      <Navbar lang={lang} setLang={setLang} goHome={() => setView('home')} />
      <main className="pt-2">
        {renderContent()}
      </main>
      <BottomNav currentView={view} setView={setView} lang={lang} />
    </div>
  );
}

export default App;