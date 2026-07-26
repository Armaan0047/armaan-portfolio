"use client";
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

const Comet = ({ color, coreColor }) => {
  const meshRef = useRef();
  
  // Faster speed so they enter quickly
  const speed = useMemo(() => 0.15 + Math.random() * 0.15, []);
  
  // Start closer to the screen edges so they appear almost immediately the first time
  const startX = useMemo(() => -10 - Math.random() * 10, []);
  const startY = useMemo(() => 10 + Math.random() * 10, []);
  const startZ = useMemo(() => -5 - Math.random() * 10, []);
  
  // Vary the angle slightly so they don't all move in perfectly parallel lines
  const angle = useMemo(() => (-Math.PI / 4) + (Math.random() - 0.5) * 0.3, []);
  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x += dx;
      meshRef.current.position.y += dy;
      
      if (meshRef.current.position.x > 30 || meshRef.current.position.y < -30) {
        meshRef.current.position.x = -10 - Math.random() * 10;
        meshRef.current.position.y = 10 + Math.random() * 10;
      }
    }
  });

  return (
    <Trail
      width={1.5} // Wide diffuse tail
      length={25} // Long trailing tail
      color={new THREE.Color(color)}
      attenuation={(t) => Math.pow(t, 2.5)} // Smooth, realistic tapering
    >
      <mesh ref={meshRef} position={[startX, startY, startZ]}>
        {/* Bright Nucleus */}
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={coreColor} />
        {/* Glowing Coma (Halo) around the nucleus */}
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} />
        </mesh>
      </mesh>
    </Trail>
  );
};

export const CometsBackground = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Realistic comet colors: The coma of a real comet often glows a distinct pale greenish-cyan 
  // due to diatomic carbon and cyanogen gases, while the dust tail reflects white sunlight.
  const cometColor = isDark ? "#aaffdd" : "#448866"; // Pale greenish-cyan
  const coreColor = isDark ? "#ffffff" : "#222222"; // Brilliant white nucleus
  
  // Use fewer comets for a more realistic, majestic feel rather than a meteor shower
  const comets = Array.from({ length: 8 }); 

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 dark:opacity-80">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        {comets.map((_, i) => (
          <Comet key={i} color={cometColor} coreColor={coreColor} />
        ))}
      </Canvas>
    </div>
  );
};
