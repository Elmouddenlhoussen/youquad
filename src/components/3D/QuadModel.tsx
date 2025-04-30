
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

const QuadModel = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="p-6 border-2 border-terracotta-500 rounded-lg text-center">
        <div className="w-full h-40 mb-4 bg-terracotta-500/20 rounded-md flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-24 w-24 text-terracotta-500" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={1.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M16 17.5V10a1 1 0 011-1h2a1 1 0 011 1v7.5" 
            />
          </svg>
        </div>
        <p className={`text-lg font-bold ${theme === 'dark' ? 'text-terracotta-400' : 'text-terracotta-600'}`}>
          Quad Bike 3D Model
        </p>
        <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-sand-400' : 'text-sand-500'}`}>
          Interactive 3D model representation
        </p>
      </div>
    </div>
  );
};

export default QuadModel;
