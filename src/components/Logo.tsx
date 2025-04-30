
import React, { useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { motion } from "framer-motion";

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTooltip?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showTooltip = false }) => {
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
      className="flex items-center gap-2 group cursor-pointer"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      initial={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <motion.div 
        className={`${logoSize} relative overflow-hidden rounded-lg shadow-md`}
        animate={{ rotate: isHovering ? [0, -5, 5, -5, 5, 0] : 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Background with enhanced gradient */}
          <defs>
            <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#DE6547' : '#eb8a72'} />
              <stop offset="50%" stopColor={theme === 'dark' ? '#C55236' : '#e17a5f'} />
              <stop offset="100%" stopColor={theme === 'dark' ? '#A93E2A' : '#DE6547'} />
            </linearGradient>
            
            {/* Sand dune effect */}
            <pattern id="sandPattern" patternUnits="userSpaceOnUse" width="100" height="100">
              <path d="M0 70 Q25 55 50 70 Q75 85 100 70 L100 100 L0 100 Z" 
                fill={theme === 'dark' ? '#B54E37' : '#e9a48d'} 
                opacity="0.6" />
            </pattern>
          </defs>
          
          {/* Desert background with sand pattern */}
          <rect width="100" height="100" fill="url(#desertGradient)" />
          <rect width="100" height="100" fill="url(#sandPattern)" />
          
          {/* Stylized "Q" for quad with animation */}
          <motion.path 
            d="M30 30 L30 70 L70 70 L70 30 Z M70 70 L85 85" 
            stroke={theme === 'dark' ? '#FFF' : '#FFF'} 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isHovering ? [1, 0.9, 1] : 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Animated wheel tracks */}
          <motion.path 
            d="M20 50 C30 30, 70 30, 80 50" 
            stroke={theme === 'dark' ? '#FFF' : '#FFF'} 
            strokeWidth="4" 
            fill="none"
            strokeDasharray="6,4" 
            opacity={isHovering ? "0.9" : "0.7"}
            animate={{ y: isHovering ? [0, 2, 0] : 0 }}
            transition={{ duration: 1, repeat: isHovering ? Infinity : 0, repeatType: "reverse" }}
          />
        </svg>
      </motion.div>
      <motion.span 
        className={`${textSize} font-bold ${theme === 'dark' ? 'text-white' : 'text-sand-800'} font-playfair`}
        animate={{ x: isHovering ? [0, 2, 0] : 0 }}
        transition={{ duration: 0.3 }}
      >
        YouQuad
      </motion.span>
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
