
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showTooltip = false, 
  className = '',
  showText = true 
}) => {
  const { theme } = useTheme();
  const [isHovering, setIsHovering] = useState(false);
  
  const dimensions = {
    small: { logoSize: 'h-8 w-8', textSize: 'text-lg' },
    medium: { logoSize: 'h-10 w-10', textSize: 'text-xl' },
    large: { logoSize: 'h-12 w-12', textSize: 'text-2xl' },
  };
  
  const { logoSize, textSize } = dimensions[size];

  const logoContent = (
    <motion.div 
      className={`flex items-center gap-2 group cursor-pointer ${className}`}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      initial={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div 
        className={`${logoSize} relative overflow-hidden rounded-lg`}
        animate={{ rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Desert background with gradient */}
          <defs>
            <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#DE6547' : '#eb8a72'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#A93E2A' : '#DE6547'} />
            </linearGradient>
            
            {/* Sand dune pattern */}
            <pattern id="sandPattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M0 70 Q25 55 50 70 Q75 85 100 70 L100 100 L0 100 Z" 
                fill={theme === 'dark' ? '#B54E37' : '#e9a48d'} 
                opacity="0.6" />
            </pattern>
          </defs>
          
          {/* Background */}
          <rect width="100" height="100" fill="url(#desertGradient)" />
          <rect width="100" height="100" fill="url(#sandPattern)" />
          
          {/* Quad Bike Silhouette */}
          <g>
            {/* Quad body */}
            <motion.path 
              d="M25 55 L35 55 L40 45 L60 45 L65 55 L75 55 L75 65 L25 65 Z" 
              fill={theme === 'dark' ? '#222' : '#444'}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isHovering ? [1, 0.95, 1] : 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            
            {/* Wheels */}
            <motion.circle cx="30" cy="70" r="10" fill={theme === 'dark' ? '#333' : '#555'} stroke="white" strokeWidth="2"
              animate={{ y: isHovering ? [0, -1, 0, 1, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isHovering ? Infinity : 0, repeatType: "reverse" }}
            />
            <motion.circle cx="70" cy="70" r="10" fill={theme === 'dark' ? '#333' : '#555'} stroke="white" strokeWidth="2"
              animate={{ y: isHovering ? [0, 1, 0, -1, 0] : 0 }}
              transition={{ duration: 0.5, repeat: isHovering ? Infinity : 0, repeatType: "reverse", delay: 0.1 }}
            />
            
            {/* Handlebars */}
            <motion.path 
              d="M40 40 L50 35 L60 40" 
              stroke="white" 
              strokeWidth="2.5" 
              fill="none"
              strokeLinecap="round"
              animate={{ y: isHovering ? [0, -2, 0] : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Seat */}
            <motion.rect x="45" y="45" width="10" height="15" fill={theme === 'dark' ? '#444' : '#666'} rx="2"
              animate={{ y: isHovering ? [0, -1.5, 0] : 0 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Headlight */}
            <motion.circle 
              cx="50" 
              cy="35" 
              r="3" 
              fill="yellow" 
              animate={{ 
                opacity: isHovering ? [1, 0.7, 1] : 1,
                r: isHovering ? [3, 3.5, 3] : 3
              }}
              transition={{ duration: 0.5, repeat: isHovering ? Infinity : 0, repeatType: "reverse" }}
            />
            
            {/* Dust trail when hovering */}
            {isHovering && (
              <g>
                <motion.circle cx="20" cy="73" r="2" fill="white" opacity="0.7"
                  animate={{ x: [-5, -15], opacity: [0.7, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle cx="15" cy="70" r="1.5" fill="white" opacity="0.5"
                  animate={{ x: [-5, -10], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.circle cx="18" cy="75" r="1" fill="white" opacity="0.3"
                  animate={{ x: [-3, -8], opacity: [0.3, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity, delay: 0.5 }}
                />
              </g>
            )}
          </g>
        </svg>
      </motion.div>
      
      {showText && (
        <motion.span 
          className={`${textSize} font-bold ${theme === 'dark' ? 'text-white' : 'text-sand-800'} font-playfair`}
          animate={{ x: isHovering ? [0, 2, 0] : 0 }}
          transition={{ duration: 0.3 }}
        >
          YouQuad
        </motion.span>
      )}
    </motion.div>
  );

  if (showTooltip) {
    return (
      <HoverCard>
        <HoverCardTrigger asChild>
          {logoContent}
        </HoverCardTrigger>
        <HoverCardContent className={`p-4 ${theme === 'dark' ? 'bg-sand-800 border-sand-700 text-sand-100' : 'bg-white border-sand-200 text-sand-800'}`}>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold">YouQuad Desert Adventures</h4>
            <p className="text-sm">Premium quad bike experiences in Morocco</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return logoContent;
};

export default Logo;
