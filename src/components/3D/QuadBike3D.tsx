
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { useTheme } from '@/hooks/useTheme';
import { motion } from 'framer-motion';
import { Rotate3d } from 'lucide-react';
import * as THREE from 'three';

interface QuadBike3DProps {
  color?: string;
  className?: string;
  autoRotate?: boolean;
}

// The actual 3D quad bike model
const QuadBikeModel: React.FC<{ color: string; autoRotate: boolean }> = ({ color, autoRotate }) => {
  const wheelRef1 = useRef<THREE.Mesh>(null);
  const wheelRef2 = useRef<THREE.Mesh>(null);
  const wheelRef3 = useRef<THREE.Mesh>(null);
  const wheelRef4 = useRef<THREE.Mesh>(null);
  const bikeRef = useRef<THREE.Group>(null);
  
  // Animation loop
  useFrame((state, delta) => {
    if (autoRotate && bikeRef.current) {
      bikeRef.current.rotation.y += 0.005;
    }
    
    // Animate wheels rotation
    if (wheelRef1.current && wheelRef2.current && wheelRef3.current && wheelRef4.current) {
      wheelRef1.current.rotation.x += 0.1;
      wheelRef2.current.rotation.x += 0.1;
      wheelRef3.current.rotation.x += 0.1;
      wheelRef4.current.rotation.x += 0.1;
    }
  });

  return (
    <group ref={bikeRef} position={[0, -1, 0]}>
      {/* Main body of the quad bike */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2, 0.5, 1]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
      </mesh>
      
      {/* Seat */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[1, 0.3, 0.7]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      {/* Front part (handlebars) */}
      <mesh position={[1, 0.7, 0]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Handlebars */}
      <mesh position={[1.25, 0.9, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#444" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Headlight */}
      <mesh position={[1.3, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFFF99" emissive="#FFFF99" emissiveIntensity={1} />
      </mesh>
      
      {/* Wheels */}
      <mesh ref={wheelRef1} position={[0.8, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      
      <mesh ref={wheelRef2} position={[0.8, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      
      <mesh ref={wheelRef3} position={[-0.8, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      
      <mesh ref={wheelRef4} position={[-0.8, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      
      {/* Wheel tires */}
      <mesh position={[0.8, 0, 0.6]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      <mesh position={[0.8, 0, -0.6]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      <mesh position={[-0.8, 0, 0.6]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      
      <mesh position={[-0.8, 0, -0.6]} castShadow>
        <torusGeometry args={[0.4, 0.1, 16, 32]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>

      {/* Suspension */}
      <mesh position={[0.8, 0.3, 0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[0.8, 0.3, -0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-0.8, 0.3, 0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>
      
      <mesh position={[-0.8, 0.3, -0.6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#555" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Engine */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.8, 0.4, 0.6]} />
        <meshStandardMaterial color="#333" metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
};

// The main component that includes the canvas and wrapper
const QuadBike3D: React.FC<QuadBike3DProps> = ({ 
  color = '#DE6547', 
  className = '',
  autoRotate = true
}) => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      className={`relative ${className} rounded-xl overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {!isLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center ${theme === 'dark' ? 'bg-sand-800' : 'bg-sand-100'}`}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Rotate3d className="h-8 w-8 text-terracotta-500" />
          </motion.div>
        </div>
      )}
      
      <div className="w-full h-full min-h-[300px]">
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={45} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          
          <QuadBikeModel color={color} autoRotate={autoRotate} />
          
          <ContactShadows 
            opacity={0.4} 
            scale={10} 
            blur={1} 
            far={10} 
            resolution={256} 
            color="#000000" 
          />
          
          <Environment preset="sunset" />
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default QuadBike3D;
