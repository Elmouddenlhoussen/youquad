
import React from 'react';
import { useTheme } from '@/hooks/useTheme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const { theme } = useTheme();
  
  const dimensions = {
    small: { logoSize: 'h-8 w-8', textSize: 'text-lg' },
    medium: { logoSize: 'h-10 w-10', textSize: 'text-xl' },
    large: { logoSize: 'h-12 w-12', textSize: 'text-2xl' },
  };
  
  const { logoSize, textSize } = dimensions[size];
  
  return (
    <div className="flex items-center gap-2">
      <div className={`${logoSize} relative overflow-hidden rounded-lg`}>
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          {/* Desert background */}
          <linearGradient id="desertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme === 'dark' ? '#DE6547' : '#eb8a72'} />
            <stop offset="100%" stopColor={theme === 'dark' ? '#A93E2A' : '#DE6547'} />
          </linearGradient>
          
          <rect width="100" height="100" fill="url(#desertGradient)" />
          
          {/* Stylized "Q" for quad */}
          <path 
            d="M30 30 L30 70 L70 70 L70 30 Z M70 70 L85 85" 
            stroke={theme === 'dark' ? '#FFF' : '#FFF'} 
            strokeWidth="8" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          
          {/* Stylized wheel tracks */}
          <path 
            d="M20 50 C30 30, 70 30, 80 50" 
            stroke={theme === 'dark' ? '#FFF' : '#FFF'} 
            strokeWidth="4" 
            fill="none"
            strokeDasharray="6,4" 
            opacity="0.7"
          />
        </svg>
      </div>
      <span className={`${textSize} font-bold ${theme === 'dark' ? 'text-white' : 'text-sand-800'}`}>
        YouQuad
      </span>
    </div>
  );
};

export default Logo;
