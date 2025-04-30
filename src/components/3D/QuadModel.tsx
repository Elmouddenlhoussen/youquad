
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Simple quad bike model
export function QuadModel(props: any) {
  const group = useRef<THREE.Group>(null!);
  
  // Since we don't have an actual GLTF model, we'll create a stylized quad bike with basic geometries
  useFrame((state) => {
    if (group.current) {
      // Gentle floating animation
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      
      // Subtle rotation when mouse moves
      const targetRotationY = (state.mouse.x * Math.PI) / 8;
      const targetRotationX = (state.mouse.y * Math.PI) / 16;
      
      group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group} {...props} dispose={null} position={[0, -0.5, 0]}>
      {/* Quad body */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.4, 2]} />
        <meshStandardMaterial 
          color="#DE6547" 
          roughness={0.7} 
          metalness={0.3}
        />
      </mesh>
      
      {/* Seat */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#444" roughness={1} />
      </mesh>
      
      {/* Handlebars */}
      <mesh position={[0, 0.7, -0.8]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#666" metalness={0.8} />
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
        </mesh>
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.4, 16]} />
          <meshStandardMaterial color="#666" metalness={0.8} />
        </mesh>
      </mesh>
      
      {/* Headlight */}
      <mesh position={[0, 0.6, -1.1]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFF" emissive="#FFFF80" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[0.7, 0.3, 0.7]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 0.3, 0.7]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh position={[0.7, 0.3, -0.7]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
      <mesh position={[-0.7, 0.3, -0.7]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#333" roughness={0.8} />
      </mesh>
    </group>
  );
}
