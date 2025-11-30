
import React, { useEffect, useState } from 'react';
import { UserProfile, Listing } from '../types';
import { fetchUserProfile, fetchUserListings } from '../services/dataService';
import Button from '../components/Button';
import ListingCard from '../components/ListingCard';
import PostItem from './PostItem';

const UserProfilePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    fetchUserProfile().then(u => {
      setUser(u);
      setFormData(u);
    });
    fetchUserListings('me').then(data => {
      setMyListings(data);
    });
  }, []);

  const handleEditListing = (listing: Listing) => {
    setSelectedListing(listing);
  };

  const handleCloseEdit = () => {
    setSelectedListing(null);
    fetchUserListings('me').then(data => {
      setMyListings(data);
    });
  };

  if (!user || !formData) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-navy z-50 overflow-y-auto pb-safe animate-fade-in-up">
      {/* Glass Header */}
      <div className="flex justify-between items-center p-4 sticky top-0 bg-white/80 dark:bg-navy/80 backdrop-blur-lg z-20 border-b border-gray-100 dark:border-white/5">
        <button onClick={onBack} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-charcoal dark:text-white hover:bg-gray-200 transition-colors">←</button>
        <h2 className="font-bold text-lg text-charcoal dark:text-white">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-teal-600 dark:text-teal-400 font-bold text-sm bg-teal-50 dark:bg-teal-900/30 px-3 py-1.5 rounded-lg"
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="p-6 flex flex-col items-center">
        {/* Avatar with Glow */}
        <div className="w-36 h-36 rounded-full overflow-hidden mb-6 p-1 bg-gradient-to-br from-teal-400 to-gold shadow-2xl relative group">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-navy bg-white dark:bg-navy">
             <img src={formData.image_url} className="w-full h-full object-cover" />
          </div>
          {isEditing && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold cursor-pointer rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity">Change</div>}
        </div>

        {isEditing ? (
          <div className="w-full space-y-5 animate-fade-in-up">
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Full Name</label>
               <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-teal-400 transition-all" />
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Role</label>
               <select 
                 value={formData.role} 
                 onChange={e => setFormData({...formData, role: e.target.value as any})}
                 className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-teal-400 transition-all appearance-none"
               >
                 <option>Local</option>
                 <option>Fundi</option>
                 <option>Villa Owner</option>
                 <option>Shop Owner</option>
               </select>
             </div>
             <div className="space-y-1">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wide ml-1">Bio</label>
               <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3} className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl dark:text-white outline-none focus:ring-2 focus:ring-teal-400 transition-all resize-none" />
             </div>
             <div className="pt-4">
                <Button fullWidth onClick={() => { setUser(formData); setIsEditing(false); }}>Save Changes</Button>
             </div>
          </div>
        ) : (
          <div className="text-center w-full animate-fade-in-up">
            <h1 className="text-3xl font-bold font-heading text-charcoal dark:text-white mb-2">{user.name}</h1>
            <span className="inline-block bg-gradient-to-r from-gold to-orange-400 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-8 shadow-golden">{user.role}</span>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-sm mx-auto font-medium opacity-90">
              "{user.bio}"
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <div className="bg-white dark:bg-white/5 p-5 rounded-2xl text-center shadow-soft border border-gray-100 dark:border-white/5 transform hover:-translate-y-1 transition-transform">
                 <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mb-1">{myListings.length}</div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Listings</div>
               </div>
               <div className="bg-white dark:bg-white/5 p-5 rounded-2xl text-center shadow-soft border border-gray-100 dark:border-white/5 transform hover:-translate-y-1 transition-transform">
                 <div className="text-3xl font-extrabold text-gold mb-1">5.0</div>
                 <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seller Rating</div>
               </div>
            </div>

            {/* My Listings Section */}
            <div className="w-full text-left">
              <h3 className="font-bold text-xl text-charcoal dark:text-white mb-6 font-heading border-l-4 border-teal-500 pl-3">My Listings</h3>
              {myListings.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {myListings.map((listing, idx) => (
                    <div key={listing.id} className="relative group" style={{ animationDelay: `${idx * 100}ms` }}>
                      <ListingCard 
                        listing={listing} 
                        lang='en' 
                        onClick={() => handleEditListing(listing)} 
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleEditListing(listing); }}
                        className="absolute top-2 right-2 bg-white/90 dark:bg-navy/90 backdrop-blur text-teal-600 p-2 rounded-xl shadow-lg text-xs font-bold hover:bg-teal-50 transition-colors"
                      >
                        ✎ Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center gap-4">
                  <span className="text-4xl opacity-50">📭</span>
                  <p className="text-gray-400 text-sm font-bold">You haven't posted anything yet.</p>
                  <button className="text-teal-500 font-bold text-sm hover:underline">Create your first post</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {selectedListing && (
        <PostItem 
          lang='en' 
          onClose={handleCloseEdit} 
          initialData={selectedListing} 
        />
      )}
    </div>
  );
};

export default UserProfilePage;
