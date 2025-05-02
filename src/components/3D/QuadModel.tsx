
import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import QuadBike3D from './QuadBike3D';

interface QuadModelProps {
  color?: string;
  autoRotate?: boolean;
}

const QuadModel: React.FC<QuadModelProps> = ({ 
  color = '#DE6547', 
  autoRotate = true 
}) => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <QuadBike3D color={color} autoRotate={autoRotate} />
    </div>
  );
};

export default QuadModel;
