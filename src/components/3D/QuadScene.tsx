
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
      <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
        <color attach="background" args={[theme === 'dark' ? '#1c1917' : '#f8f8f8']} />
        
        {/* Replaced PresentationControls with simple rotation and OrbitControls */}
        <Suspense fallback={null}>
          <QuadModel scale={1.5} />
          {/* Removed Environment which was causing compatibility issues */}
          
          {/* Simple environment lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          
          {/* Ground plane with shadow */}
          <mesh 
            rotation={[-Math.PI / 2, 0, 0]} 
            position={[0, -1.4, 0]} 
            receiveShadow
          >
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
          
          {/* Add OrbitControls for interaction */}
          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 6}
            enableZoom={true}
            enableRotate={true}
            minDistance={3}
            maxDistance={8}
          />
        </Suspense>
      </Canvas>
      
      {/* Instructions for users */}
      <p className="mt-2 text-center text-sm text-sand-500 dark:text-sand-400">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
};

export default QuadScene;
