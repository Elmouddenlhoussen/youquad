
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';

interface QuadSceneProps {
  className?: string;
}

const QuadScene: React.FC<QuadSceneProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] ${className} flex items-center justify-center`}>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-100'}`}>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('data:image/svg+xml;charset=utf-8,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23c87a56' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E')",
            backgroundSize: "60px 60px"
          }} />
        </div>
        
        <motion.div 
          className="relative z-10 w-3/4 h-3/4 flex items-center justify-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className={`p-8 border-4 ${theme === 'dark' ? 'border-terracotta-400' : 'border-terracotta-500'} rounded-lg text-center shadow-xl`}>
            <div className={`w-full h-48 mb-4 ${theme === 'dark' ? 'bg-terracotta-600' : 'bg-terracotta-500'} rounded-md flex items-center justify-center`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-28 w-28 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 17.5V10a1 1 0 011-1h2a1 1 0 011 1v7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 9h6M17 13h2" />
              </svg>
            </div>
            <p className={`text-xl font-bold ${theme === 'dark' ? 'text-terracotta-300' : 'text-terracotta-600'}`}>
              Morocco Adventure Quad
            </p>
            <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-sand-400' : 'text-sand-500'}`}>
              Experience the ultimate desert adventure
            </p>
          </div>
        </motion.div>
      </div>
      
      <motion.p 
        className={`absolute bottom-4 left-0 right-0 text-center text-sm ${theme === 'dark' ? 'text-sand-400' : 'text-sand-500'}`}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Explore our premium quad collection for an unforgettable Moroccan adventure
      </motion.p>
    </div>
  );
};

export default QuadScene;
