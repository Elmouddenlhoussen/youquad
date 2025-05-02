
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Environment, PerspectiveCamera, Text, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { Scale3d } from 'lucide-react';

interface DesertSceneProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

// A simple desert plane
const DesertPlane: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#e6c589" 
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
};

// A desert dune
const DesertDune: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <mesh position={position} castShadow receiveShadow>
      <coneGeometry args={[4, 2, 32]} />
      <meshStandardMaterial color="#d8b577" roughness={1} />
    </mesh>
  );
};

// A simple cactus
const Cactus: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Main body */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.3, 2, 16]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.8} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 1, 16]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.8} />
      </mesh>
      
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#2d6a4f" roughness={0.8} />
      </mesh>
    </group>
  );
};

// A quad bike path in the sand
const SandPath: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.49, 0]} receiveShadow>
      <planeGeometry args={[1.5, 20]} />
      <meshStandardMaterial color="#d1b27a" roughness={0.9} />
    </mesh>
  );
};

// Main scene component
const DesertScene: React.FC<DesertSceneProps> = ({ 
  className = '',
  title = 'Desert Adventure',
  subtitle = 'Experience the thrill of the Moroccan desert'
}) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative ${className} overflow-hidden rounded-xl border ${theme === 'dark' ? 'border-sand-700' : 'border-sand-300'}`}>
      {isLoading ? (
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-100'} transition-opacity duration-500`}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Scale3d className="h-12 w-12 text-terracotta-500" />
          </motion.div>
          <p className={`mt-4 ${theme === 'dark' ? 'text-sand-300' : 'text-sand-700'}`}>Loading 3D Scene...</p>
        </div>
      ) : null}
      
      <div className="w-full h-full" style={{ minHeight: '400px' }}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={45} />
          <Sky sunPosition={[100, 10, 100]} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize={1024}
          />
          
          <Suspense fallback={null}>
            <DesertPlane />
            <SandPath />
            <DesertDune position={[-8, 0, -5]} />
            <DesertDune position={[10, 0, -8]} />
            <DesertDune position={[5, 0, -15]} />
            <DesertDune position={[-6, 0, -12]} />
            <Cactus position={[-3, 0, -3]} />
            <Cactus position={[4, 0, -6]} />
            
            {/* 3D Text */}
            <Text
              position={[0, 2, 0]}
              rotation={[0, 0, 0]}
              fontSize={1}
              color={theme === 'dark' ? '#ffffff' : '#5b4c2e'}
              anchorX="center"
              anchorY="middle"
            >
              {title}
            </Text>
            
            <Text
              position={[0, 1.2, 0]}
              rotation={[0, 0, 0]}
              fontSize={0.5}
              color={theme === 'dark' ? '#d1b27a' : '#8b7e5b'}
              anchorX="center"
              anchorY="middle"
            >
              {subtitle}
            </Text>
            
            <ContactShadows 
              opacity={0.6} 
              scale={10} 
              blur={1} 
              far={10} 
              resolution={256} 
            />
          </Suspense>
          
          <Environment preset="sunset" />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>
      
      <div className={`absolute bottom-4 left-0 right-0 text-center ${theme === 'dark' ? 'text-sand-300' : 'text-sand-700'} text-sm`}>
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default DesertScene;
