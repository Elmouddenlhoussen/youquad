
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { QuadModel } from './QuadModel';
import { useTheme } from '@/hooks/useTheme';

interface QuadSceneProps {
  className?: string;
}

const QuadScene: React.FC<QuadSceneProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas camera={{ position: [4, 4, 4], fov: 50 }}>
        <color attach="background" args={[theme === 'dark' ? '#1c1917' : '#f8f8f8']} />
        
        <Suspense fallback={null}>
          <QuadModel scale={1.5} />
          
          {/* Basic lighting setup */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Ground plane */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -1.4, 0]} 
          >
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#f0f0f0" opacity={0.5} transparent />
          </mesh>
          
          {/* Simple controls */}
          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 6}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
      
      <p className="mt-2 text-center text-sm text-sand-500 dark:text-sand-400">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
};

export default QuadScene;
