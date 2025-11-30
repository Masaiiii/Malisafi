import React from 'react';
import { UtilityStatus } from '../types';

interface UtilityWidgetProps {
  utilities: UtilityStatus[];
}

const UtilityWidget: React.FC<UtilityWidgetProps> = ({ utilities }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {utilities.map((util) => (
        <div key={util.id} className="flex-1 min-w-[140px] bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-slate-100 flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            util.status === 'On' ? 'bg-verified animate-pulse' : 'bg-red-500'
          }`}></div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                {util.type === 'Power' ? 'KPLC' : 'MAWASCO'}
              </span>
              <span className={`text-[10px] font-bold ${util.status === 'On' ? 'text-slate-700' : 'text-red-500'}`}>
                {util.status === 'On' ? 'Active' : 'Outage'}
              </span>
            </div>
            {util.status === 'Off' && (
              <p className="text-[9px] text-red-500 leading-tight line-clamp-1">{util.area_message}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UtilityWidget;