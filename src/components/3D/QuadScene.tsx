
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface QuadSceneProps {
  className?: string;
}

const QuadScene: React.FC<QuadSceneProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] ${className} flex items-center justify-center`}>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-100'}`}></div>
        
        {/* Static quad bike image */}
        <div className="relative z-10 w-3/4 h-3/4 flex items-center justify-center">
          <div className="p-8 border-4 border-terracotta-500 rounded-lg text-center">
            <div className="w-full h-48 mb-4 bg-terracotta-500 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 17.5V10a1 1 0 011-1h2a1 1 0 011 1v7.5" />
              </svg>
            </div>
            <p className="text-lg font-bold text-terracotta-600 dark:text-terracotta-400">Quad Bike Model</p>
            <p className="mt-2 text-sm text-sand-500 dark:text-sand-400">
              Premium Quad Experience
            </p>
          </div>
        </div>
      </div>
      
      <p className="absolute bottom-2 left-0 right-0 text-center text-sm text-sand-500 dark:text-sand-400">
        Experience our premium quads
      </p>
    </div>
  );
};

export default QuadScene;
