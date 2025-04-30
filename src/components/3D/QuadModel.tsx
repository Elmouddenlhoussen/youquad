
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import type * as THREE from 'three';

// Simplified quad bike model
export function QuadModel(props: any) {
  const group = useRef<THREE.Group>(null!);
  
  // Simple animation
  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      
      // Subtle rotation
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, -0.5, 0]}>
      {/* Quad body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.4, 2]} />
        <meshStandardMaterial 
          color="#DE6547" 
          roughness={0.7} 
          metalness={0.3}
        />
      </mesh>
      
      {/* Seat */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#444" roughness={1} />
      </mesh>
      
      {/* Handlebars */}
      <mesh position={[0, 0.7, -0.8]}>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#666" metalness={0.8} />
        <mesh position={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
            <meshStandardMaterial color="#666" metalness={0.8} />
          </mesh>
        </mesh>
        <mesh position={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
          <mesh rotation={[0, 0, -Math.PI / 2]} position={[-0.2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
            <meshStandardMaterial color="#666" metalness={0.8} />
          </mesh>
        </mesh>
      </mesh>
      
      {/* Headlight */}
      <mesh position={[0, 0.6, -1.1]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFF" emissive="#FFFF80" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Wheels */}
      <group position={[0.7, 0.3, 0.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.7, 0.3, 0.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
      </group>
      <group position={[0.7, 0.3, -0.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
      </group>
      <group position={[-0.7, 0.3, -0.7]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
      </group>
    </group>
  );
}
