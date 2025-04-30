
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { QuadModel } from './QuadModel';
import { useTheme } from '@/hooks/useTheme';

interface QuadSceneProps {
  className?: string;
}

const QuadScene: React.FC<QuadSceneProps> = ({ className }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-full h-[400px] ${className}`}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 4, 4], fov: 50 }}>
        <color attach="background" args={[theme === 'dark' ? '#1c1917' : '#f8f8f8']} />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, -Math.PI / 4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Suspense fallback={null}>
            <QuadModel scale={1.5} />
            <Environment preset="sunset" />
          </Suspense>
        </PresentationControls>
        
        <ContactShadows position={[0, -1.4, 0]} opacity={0.75} scale={10} blur={2.5} far={4} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      </Canvas>
    </div>
  );
};

export default QuadScene;
