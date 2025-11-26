import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Language, CategoryId, LocationTag } from '../types';
import { UI_TEXT, CATEGORIES, LOCATIONS } from '../constants';
import Button from '../components/Button';
import { createListing } from '../services/dataService';

interface PostItemProps {
  lang: Language;
  onClose: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ lang, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [isQuickGig, setIsQuickGig] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'market' as CategoryId,
    location: 'Malindi CBD',
    whatsapp: '',
  });

  // Handle Image Selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to generate description using Gemini
  const handleGenerateDescription = async () => {
    if (!formData.title || !process.env.API_KEY) {
      if (!process.env.API_KEY) alert("API Key missing for AI features.");
      return;
    }
    
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Write a short, catchy sales description for selling "${formData.title}" in Malindi, Kenya. Keep it under 30 words. Language: ${lang === 'sw' ? 'Swahili' : 'English'}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      const text = response.text;
      if (text) {
        setFormData(prev => ({ ...prev, description: text.trim() }));
      }
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const expiresAt = isQuickGig 
      ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() 
      : undefined;

    const category = isQuickGig ? 'gigs' : formData.category;

    // Use uploaded image or fallback to random one if none selected
    const finalImageUrl = imagePreview || `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;

    await createListing({
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      category: category,
      location: formData.location,
      whatsapp: formData.whatsapp,
      image_url: finalImageUrl,
      user_name: 'Local User',
      expires_at: expiresAt
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="p-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold font-heading text-ocean">{UI_TEXT.postButton[lang]}</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-red-500">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Quick Gig Toggle */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-100">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-sunset text-white"
                checked={isQuickGig}
                onChange={(e) => setIsQuickGig(e.target.checked)}
              />
              <div>
                <span className="font-bold text-gray-900 block">{UI_TEXT.quickGig[lang]} ⚡</span>
                <span className="text-xs text-gray-500">{UI_TEXT.quickGigHelp[lang]}</span>
              </div>
            </label>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.titleLabel[lang]}</label>
            <input 
              required
              type="text" 
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-ocean focus:border-transparent outline-none bg-gray-50 focus:bg-white transition-all"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Samsung A12, Plumbing Service..."
            />
          </div>

          {/* Category (Hide if Quick Gig is selected) */}
          {!isQuickGig && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.categoryLabel[lang]}</label>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.slice(0, 6).filter(c => c.id !== 'gigs').map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFormData({...formData, category: cat.id})}
                    className={`p-2 rounded-lg text-xs font-medium border transition-all ${formData.category === cat.id ? 'bg-ocean text-white border-ocean shadow-md shadow-ocean/20' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  >
                    {lang === 'en' ? cat.label.en : cat.label.sw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.location[lang]}</label>
            <select 
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-ocean"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            >
              {LOCATIONS.map(loc => (
                <option key={loc.id} value={loc.name}>{loc.name}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.priceLabel[lang]}</label>
            <input 
              required
              type="number" 
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-ocean"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>

          {/* Description & AI Button */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">{UI_TEXT.descLabel[lang]}</label>
              {process.env.API_KEY && (
                <button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={!formData.title || aiLoading}
                  className="text-xs text-ocean font-medium flex items-center gap-1 disabled:opacity-50 hover:bg-ocean/10 px-2 py-1 rounded"
                >
                  ✨ {aiLoading ? UI_TEXT.loading[lang] : UI_TEXT.aiHelp[lang]}
                </button>
              )}
            </div>
            <textarea 
              required
              rows={4}
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-ocean"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          {/* Photo Upload */}
          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.uploadImage[lang]}</label>
             <label className="block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer overflow-hidden relative">
               <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageSelect}
               />
               
               {imagePreview ? (
                 <div className="relative h-48 w-full">
                   <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-contain rounded"
                   />
                   <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity text-white font-medium">
                     Change Photo
                   </div>
                 </div>
               ) : (
                 <div className="py-4">
                   <span className="text-3xl block mb-2">📷</span>
                   <p className="text-xs">Tap to upload photo</p>
                 </div>
               )}
             </label>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{UI_TEXT.phoneLabel[lang]}</label>
            <input 
              required
              type="tel" 
              className="w-full border border-gray-200 rounded-lg p-3 bg-gray-50 focus:bg-white outline-none focus:ring-2 focus:ring-ocean"
              placeholder="07..."
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>

          <div className="pt-4 pb-12">
            <Button type="submit" fullWidth disabled={loading}>
              {loading ? UI_TEXT.loading[lang] : UI_TEXT.submit[lang]}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostItem;