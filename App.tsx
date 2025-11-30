
import React, { useState, useEffect } from 'react';
import { Language } from './types';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import FundiFinder from './pages/FundiFinder';
import Stays from './pages/Stays';
import Marketplace from './pages/Marketplace';
import More from './pages/More';
import FundiProfile from './pages/FundiProfile';
import StayProfile from './pages/StayProfile';
import StoreProfile from './pages/StoreProfile';
import UserProfilePage from './pages/UserProfile';
import ListingDetail from './pages/ListingDetail';
import Wishlist from './pages/Wishlist';

function App() {
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<string>('home');
  const [selectedId, setSelectedId] = useState<string>('');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const renderContent = () => {
    if (view === 'fundi_profile') return <FundiProfile id={selectedId} lang={lang} onBack={() => setView('fundis')} />;
    if (view === 'stay_profile') return <StayProfile id={selectedId} lang={lang} onBack={() => setView('stays')} />;
    if (view === 'store_profile') return <StoreProfile storeId={selectedStoreId} lang={lang} onBack={() => setView('market')} onListingClick={(id) => { setSelectedId(id); setView('listing_detail'); }} />;
    if (view === 'user_profile') return <UserProfilePage onBack={() => setView('home')} />;
    if (view === 'listing_detail') return <ListingDetail id={selectedId} lang={lang} onBack={() => setView('home')} />;
    if (view === 'wishlist') return <Wishlist lang={lang} onListingClick={(id) => { setSelectedId(id); setView('listing_detail'); }} />;

    switch (view) {
      case 'home': return <Home lang={lang} onViewChange={setView} />;
      case 'fundis': return <FundiFinder lang={lang} onServiceClick={(id) => { setSelectedId(id); setView('fundi_profile'); }} />;
      case 'stays': return <Stays onStayClick={(id) => { setSelectedId(id); setView('stay_profile'); }} />;
      case 'market': return <Marketplace onStoreClick={(id) => { setSelectedStoreId(id); setView('store_profile'); }} />;
      case 'more': return <More lang={lang} onNavigate={setView} />;
      default: return <Home lang={lang} onViewChange={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy text-charcoal dark:text-gray-100 font-sans selection:bg-teal-100 selection:text-teal-900 transition-colors duration-300">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        goHome={() => setView('home')} 
        showBack={view.includes('_profile') || view === 'listing_detail' || view === 'wishlist'}
        onBack={() => {
           // Basic history fallback
           if (view === 'listing_detail') setView('home');
           else if (view === 'store_profile') setView('market');
           else setView('home');
        }} 
        title={view.replace('_', ' ').charAt(0).toUpperCase() + view.slice(1).replace('_', ' ')}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onProfileClick={() => setView('user_profile')}
      />
      <main className="max-w-xl mx-auto min-h-screen bg-white dark:bg-navy shadow-2xl dark:shadow-none shadow-gray-100">
        {renderContent()}
      </main>
      <BottomNav currentView={view} setView={setView} lang={lang} />
    </div>
  );
}

export default App;
