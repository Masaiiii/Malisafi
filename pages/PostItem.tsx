
import React, { useState, useEffect } from 'react';
import { Language, Listing } from '../types';
import { UI_TEXT } from '../constants';
import Button from '../components/Button';
import { createListing, updateListing } from '../services/dataService';

interface PostItemProps {
  lang: Language;
  onClose: () => void;
  initialData?: Listing; 
}

const CATEGORY_OPTIONS = ['Furniture', 'Electronics', 'Vehicles', 'Properties', 'Services'];

const PostItem: React.FC<PostItemProps> = ({ lang, onClose, initialData }) => {
  const [step, setStep] = useState(initialData ? 3 : 1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    location: '',
    whatsapp: '',
    image_url: '',
    id_image: '' 
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category,
        title: initialData.title,
        description: initialData.description,
        price: initialData.price.toString(),
        location: initialData.location,
        whatsapp: initialData.whatsapp,
        image_url: initialData.image_url,
        id_image: ''
      });
    }
  }, [initialData]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, field: 'image_url' | 'id_image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData(prev => ({ ...prev, [field]: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      price: Number(formData.price),
    };
    
    if (initialData) {
      await updateListing({ ...initialData, ...payload });
    } else {
      await createListing({ ...payload, is_verified: !!formData.id_image });
    }
    
    setLoading(false);
    onClose();
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const idInputRef = React.useRef<HTMLInputElement>(null);

  const renderStep = () => {
    switch (step) {
      case 1: 
        return (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 font-heading text-charcoal dark:text-white">{UI_TEXT.step1[lang]}</h3>
            <div className="grid grid-cols-2 gap-4">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setFormData({...formData, category: cat}); setStep(2); }}
                  className="p-5 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-teal-500 hover:shadow-ocean font-bold text-left transition-all text-charcoal dark:text-white transform hover:-translate-y-1"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );

      case 2: 
        return (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-6 font-heading text-charcoal dark:text-white">{UI_TEXT.step2[lang]}</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="group w-full aspect-video border-2 border-dashed border-gray-300 dark:border-white/20 rounded-3xl flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 cursor-pointer overflow-hidden relative transition-all hover:bg-gray-100 dark:hover:bg-white/10 hover:border-teal-400"
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/*" 
                onClick={(e) => (e.target as HTMLInputElement).value = ''} 
                onChange={(e) => handleImageSelect(e, 'image_url')} 
              />
              {formData.image_url ? (
                <img src={formData.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="flex flex-col items-center text-gray-400 group-hover:text-teal-500 transition-colors">
                  <span className="text-5xl mb-3 animate-float">📸</span>
                  <span className="font-bold">Tap to upload photo</span>
                </div>
              )}
            </div>
            <div className="mt-8">
              <Button fullWidth onClick={() => setStep(3)} disabled={!formData.image_url}>Next Step →</Button>
            </div>
          </div>
        );

      case 3: 
        return (
          <div className="space-y-5 animate-fade-in-up">
             <h3 className="text-2xl font-bold mb-2 font-heading text-charcoal dark:text-white">{UI_TEXT.step3[lang]}</h3>
             <input 
               placeholder="Title (e.g. Sofa)" 
               className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-navy focus:border-teal-500 rounded-xl outline-none text-charcoal dark:text-white font-medium transition-all shadow-sm"
               value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
             />
             <textarea 
               placeholder="Description" 
               rows={3}
               className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-navy focus:border-teal-500 rounded-xl outline-none text-charcoal dark:text-white font-medium transition-all shadow-sm resize-none"
               value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
             />
             <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number"
                  placeholder="Price (KES)" 
                  className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-navy focus:border-teal-500 rounded-xl outline-none text-charcoal dark:text-white font-medium transition-all shadow-sm"
                  value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                />
                <input 
                  placeholder="Location" 
                  className="w-full p-4 bg-gray-50 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-navy focus:border-teal-500 rounded-xl outline-none text-charcoal dark:text-white font-medium transition-all shadow-sm"
                  value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                />
             </div>
             <div className="pt-4">
               {initialData ? (
                 <Button fullWidth onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
               ) : (
                 <Button fullWidth onClick={() => setStep(4)} disabled={!formData.title || !formData.price}>Final Step →</Button>
               )}
             </div>
          </div>
        );

      case 4: 
        return (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold mb-4 font-heading text-charcoal dark:text-white">{UI_TEXT.step4[lang]}</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-3xl mb-8 border border-blue-100 dark:border-white/5">
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-blue-500 text-white p-1 rounded-full text-xs">🛡️</span>
                 <h4 className="font-bold text-blue-900 dark:text-blue-300">Verification Boost</h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-4 opacity-80">Upload your ID to get the Blue Tick. Verified sellers get 2x more views.</p>
              
              <div 
                onClick={() => idInputRef.current?.click()}
                className="w-full py-4 border-2 border-blue-300 dark:border-blue-700 border-dashed rounded-xl text-center text-blue-600 dark:text-blue-300 font-bold cursor-pointer hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
              >
                <input 
                  ref={idInputRef}
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onClick={(e) => (e.target as HTMLInputElement).value = ''}
                  onChange={(e) => handleImageSelect(e, 'id_image')} 
                />
                {formData.id_image ? 'ID Uploaded ✓' : 'Tap to Upload ID'}
              </div>
            </div>

            <Button fullWidth onClick={handleSubmit} disabled={loading}>
              {loading ? 'Posting...' : '🚀 Post Now'}
            </Button>
            <button onClick={handleSubmit} className="w-full text-center text-sm text-gray-400 mt-6 font-medium hover:text-charcoal dark:hover:text-white transition-colors">
              Skip for now
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="bg-white dark:bg-navy w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-gradient-to-b from-gray-50 to-white dark:from-white/5 dark:to-transparent border-b border-gray-100 dark:border-white/5">
          <h2 className="font-bold text-xl text-charcoal dark:text-white font-heading">{initialData ? 'Edit Listing' : 'Create New Post'}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors">&times;</button>
        </div>

        {/* Progress Bar */}
        {!initialData && (
          <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5">
             <div 
               className="h-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all duration-500 ease-out"
               style={{ width: `${(step / 4) * 100}%` }}
             ></div>
          </div>
        )}

        <div className="p-8 overflow-y-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
