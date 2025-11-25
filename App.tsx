import React, { useState } from 'react';
import { Language, CategoryId } from './types';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import PostItem from './pages/PostItem';
import ListingDetail from './pages/ListingDetail';
import Emergency from './pages/Emergency';
import StoreProfile from './pages/StoreProfile';

function App() {
  // State
  const [lang, setLang] = useState<Language>('en');
  const [view, setView] = useState<string>('home'); // home, post, details, emergency, store
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  // Navigation Handlers
  const handlePostClick = () => setView('post');
  
  const handleListingClick = (id: string) => {
    setSelectedListingId(id);
    setView('details');
  };

  const handleStoreClick = (id: string) => {
    setSelectedStoreId(id);
    setView('store');
  }

  const handleNavClick = (newView: string) => {
    if (newView === 'search') {
      // For demo, just go home and scroll top
      setActiveCategory('all');
      setView('home');
      window.scrollTo(0,0);
    } else if (newView === 'deals') {
      setActiveCategory('deals');
      setView('home');
    } else {
      setView(newView);
    }
  };

  const renderContent = () => {
    if (view === 'post') {
      return <PostItem lang={lang} onClose={() => setView('home')} />;
    }
    if (view === 'details' && selectedListingId) {
      return (
        <ListingDetail 
          id={selectedListingId} 
          lang={lang} 
          onBack={() => setView('home')} 
        />
      );
    }
    if (view === 'store' && selectedStoreId) {
      return (
        <StoreProfile 
          storeId={selectedStoreId} 
          lang={lang} 
          onBack={() => setView('home')} 
          onListingClick={handleListingClick}
        />
      )
    }
    if (view === 'emergency') {
      return <Emergency lang={lang} />;
    }

    // Default: Home
    return (
      <Home 
        lang={lang} 
        onListingClick={handleListingClick} 
        onStoreClick={handleStoreClick}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    );
  };

  return (
    <div className="min-h-screen bg-bgLight text-gray-900 font-sans pb-safe">
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        onPostClick={handlePostClick}
        goHome={() => {
          setView('home');
          setActiveCategory('all');
        }}
      />
      
      <main className="max-w-4xl mx-auto">
        {renderContent()}
      </main>

      <BottomNav 
        currentView={view} 
        setView={handleNavClick} 
        lang={lang} 
      />
    </div>
  );
}

export default App;