import React from 'react';
import { MOCK_EMERGENCY } from '../constants';
import { Language } from '../types';

const Emergency: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="px-4 py-6 pb-24">
      <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
        {lang === 'en' ? 'Emergency Contacts' : 'Namba za Dharura'}
      </h2>
      
      <div className="space-y-4">
        {MOCK_EMERGENCY.map((contact, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">{contact.category}</p>
              <h3 className="font-medium text-lg">{contact.name}</h3>
            </div>
            <a 
              href={`tel:${contact.phone}`} 
              className="bg-red-50 text-red-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl hover:bg-red-100"
            >
              📞
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg text-center text-sm text-gray-500">
        <p>Mali Safi is not responsible for these services.</p>
        <p>Dial 999 for national emergency.</p>
      </div>
    </div>
  );
};

export default Emergency;