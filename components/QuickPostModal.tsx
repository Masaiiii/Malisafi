import React from 'react';

interface QuickPostModalProps {
  onClose: () => void;
  onSelect: (type: string) => void;
}

const QuickPostModal: React.FC<QuickPostModalProps> = ({ onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-navy w-full max-w-sm rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl transform transition-transform animate-in slide-in-from-bottom duration-300" onClick={e => e.stopPropagation()}>
        <div className="w-12 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6 sm:hidden"></div>
        
        <h3 className="text-xl font-bold font-heading text-charcoal dark:text-white mb-6 text-center">Quick Post</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button onClick={() => onSelect('service')} className="bg-teal-50 dark:bg-teal-900/20 hover:bg-teal-100 dark:hover:bg-teal-900/40 p-6 rounded-2xl flex flex-col items-center gap-3 border border-teal-100 dark:border-teal-800 transition-colors group">
            <span className="text-4xl group-hover:scale-110 transition-transform">🛠️</span>
            <span className="font-bold text-teal-800 dark:text-teal-300">Request Service</span>
          </button>
          
          <button onClick={() => onSelect('gig')} className="bg-gold/10 hover:bg-gold/20 p-6 rounded-2xl flex flex-col items-center gap-3 border border-gold/20 transition-colors group">
            <span className="text-4xl group-hover:scale-110 transition-transform">💼</span>
            <span className="font-bold text-gold">Offer Gig</span>
          </button>

          <button onClick={() => onSelect('item')} className="bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 p-6 rounded-2xl flex flex-col items-center gap-3 border border-blue-100 dark:border-blue-800 transition-colors group">
            <span className="text-4xl group-hover:scale-110 transition-transform">🛍️</span>
            <span className="font-bold text-blue-800 dark:text-blue-300">Sell Item</span>
          </button>

           <button onClick={() => onSelect('lost')} className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-2xl flex flex-col items-center gap-3 border border-gray-100 dark:border-gray-700 transition-colors group">
            <span className="text-4xl group-hover:scale-110 transition-transform">📢</span>
            <span className="font-bold text-gray-700 dark:text-gray-300">Lost & Found</span>
          </button>
        </div>

        <button onClick={onClose} className="w-full py-3 text-gray-400 font-medium hover:text-gray-600 dark:hover:text-gray-200">Cancel</button>
      </div>
    </div>
  );
};

export default QuickPostModal;