import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';
import Button from '../components/Button';
import { createListing } from '../services/dataService';

interface PostItemProps {
  lang: Language;
  onClose: () => void;
}

const CATEGORY_OPTIONS = ['Furniture', 'Electronics', 'Vehicles', 'Properties', 'Services'];

const PostItem: React.FC<PostItemProps> = ({ lang, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    price: '',
    location: '',
    whatsapp: '',
    image_url: '',
    id_image: '' // For verification
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>, field: 'image_url' | 'id_image') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await createListing({
      ...formData,
      price: Number(formData.price),
      is_verified: !!formData.id_image
    });
    setLoading(false);
    onClose();
  };

  // Steps Rendering
  const renderStep = () => {
    switch (step) {
      case 1: // Category
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{UI_TEXT.step1[lang]}</h3>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORY_OPTIONS.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setFormData({...formData, category: cat}); setStep(2); }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-ocean hover:bg-ocean/5 font-medium text-left transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Photos
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">{UI_TEXT.step2[lang]}</h3>
            <label className="block w-full aspect-video border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center bg-gray-50 cursor-pointer overflow-hidden relative">
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageSelect(e, 'image_url')} />
              {formData.image_url ? (
                <img src={formData.image_url} className="w-full h-full object-cover" />
              ) : (
                <>
                  <span className="text-4xl mb-2">📷</span>
                  <span className="text-sm text-gray-500 font-medium">Tap to upload main photo</span>
                </>
              )}
            </label>
            <p className="text-xs text-gray-400 mt-2 text-center">Max 5 photos (1 for MVP)</p>
            <div className="mt-6">
              <Button fullWidth onClick={() => setStep(3)} disabled={!formData.image_url}>Next</Button>
            </div>
          </div>
        );

      case 3: // Details
        return (
          <div className="space-y-4">
             <h3 className="text-xl font-bold mb-2">{UI_TEXT.step3[lang]}</h3>
             <input 
               placeholder="Title (e.g. Sofa)" 
               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-ocean"
               value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
             />
             <textarea 
               placeholder="Description" 
               rows={3}
               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-ocean"
               value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
             />
             <input 
               type="number"
               placeholder="Price (KES)" 
               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-ocean"
               value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
             />
             <input 
               placeholder="Location (e.g. Town)" 
               className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-ocean"
               value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
             />
             <div className="pt-2">
               <Button fullWidth onClick={() => setStep(4)} disabled={!formData.title || !formData.price}>Next</Button>
             </div>
          </div>
        );

      case 4: // Verify
        return (
          <div>
            <h3 className="text-xl font-bold mb-2">{UI_TEXT.step4[lang]}</h3>
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-ocean text-sm mb-1">Get the Blue Tick?</h4>
              <p className="text-xs text-gray-600 mb-3">Upload your National ID to get verified. Trusted sellers sell 2x faster.</p>
              
              <label className="block w-full py-3 border border-ocean border-dashed rounded-lg text-center text-ocean text-xs font-bold cursor-pointer hover:bg-white transition-colors">
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageSelect(e, 'id_image')} />
                {formData.id_image ? 'ID Uploaded ✓' : 'Upload ID (Hidden)'}
              </label>
            </div>

            <Button fullWidth onClick={handleSubmit} disabled={loading}>
              {loading ? 'Posting...' : UI_TEXT.submit[lang]}
            </Button>
            <button onClick={handleSubmit} className="w-full text-center text-xs text-gray-400 mt-4 font-medium hover:text-gray-600">
              Skip Verification & Post
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">New Listing</h2>
          <button onClick={onClose} className="text-2xl text-gray-400">&times;</button>
        </div>

        {/* Progress Bar */}
        <div className="flex gap-1 px-4 py-2">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-ocean' : 'bg-gray-200'}`}></div>
          ))}
        </div>

        <div className="p-6 flex-1">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default PostItem;