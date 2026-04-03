import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function VShape3D({ color = '#d44b1e', position = [0, 0, 0], rotationSpeed = 0.5 }) {
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Clear rotation - speed 0.5 means full rotation in ~12 seconds
      groupRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  // Create a simple V shape using 3D line (always visible)
  const points = [];
  points.push(new THREE.Vector3(-1.2, -0.8, 0));
  points.push(new THREE.Vector3(0, 1.2, 0));
  points.push(new THREE.Vector3(1.2, -0.8, 0));
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  
  // Also add a sphere at the bottom for glow
  return (
    <group ref={groupRef} position={position}>
      {/* V shape line */}
      <line>
        <bufferGeometry attach="geometry" {...lineGeometry} />
        <lineBasicMaterial attach="material" color={color} linewidth={3} />
      </line>
      {/* Glowing sphere */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
      </mesh>
      {/* Optional: small particle around */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}