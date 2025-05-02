
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import QuadBike3D from './QuadBike3D';

interface QuadSceneProps {
  className?: string;
  color?: string;
  autoRotate?: boolean;
}

const QuadScene: React.FC<QuadSceneProps> = ({ 
  className = '', 
  color = '#DE6547', 
  autoRotate = true 
}) => {
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
          className="relative z-10 w-3/4 h-3/4"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <QuadBike3D color={color} autoRotate={autoRotate} />
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
