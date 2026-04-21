import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   BUILD STORE SYNC SCENE DATA
───────────────────────────────────────────── */
function buildStoreData() {
  const PARTICLE_COUNT = 30;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 8,
    tx: (Math.random() - 0.5) * 8,
    tz: (Math.random() - 0.5) * 8,
    speed: 0.02 + Math.random() * 0.03,
  }));
  
  const pPos = new Float32Array(PARTICLE_COUNT * 3);
  return { particles, pPos };
}

const SceneStoreSync = () => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const data = useMemo(buildStoreData, []);

  useEffect(() => {
    const g = groupRef.current;
    
    // 1. Grid Floor
    const grid = new THREE.GridHelper(10, 20, 0x00f2fe, 0x444444);
    grid.position.y = -1;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.3;
    g.add(grid);

    // 2. Camera / Scanning Cone
    const coneGeo = new THREE.ConeGeometry(3, 6, 16, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.position.set(0, 2, 0);
    g.add(cone);

    const cameraLensGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const cameraLensMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 2
    });
    const cameraLens = new THREE.Mesh(cameraLensGeo, cameraLensMat);
    cameraLens.position.set(0, 5, 0);
    g.add(cameraLens);

    // 3. Shoppers (Heatmap Particles)
    const pGeo = new THREE.BufferGeometry();
    const pAttr = new THREE.BufferAttribute(data.pPos, 3);
    pAttr.setUsage(THREE.DynamicDrawUsage);
    pGeo.setAttribute('position', pAttr);
    
    // Create a circular texture for particles directly
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 60, 60, 1)');
    gradient.addColorStop(0.4, 'rgba(255, 120, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const tex = new THREE.CanvasTexture(canvas);

    const pMat = new THREE.PointsMaterial({
      size: 0.8,
      map: tex,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const points = new THREE.Points(pGeo, pMat);
    g.add(points);

    scene.add(g);
    return () => { scene.remove(g); };
  }, [scene, data]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    
    // Slowly rotate the whole scene
    g.rotation.y += delta * 0.1;
    
    // Tilt based on mouse
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.2 + state.pointer.y * 0.1, 0.05);

    // Animate shoppers (heatmaps)
    data.particles.forEach((p, i) => {
      // Move towards target
      p.x += (p.tx - p.x) * p.speed;
      p.z += (p.tz - p.z) * p.speed;
      
      // Assign new target if close
      if (Math.abs(p.x - p.tx) < 0.1 && Math.abs(p.z - p.tz) < 0.1) {
        p.tx = (Math.random() - 0.5) * 8;
        p.tz = (Math.random() - 0.5) * 8;
      }
      
      data.pPos[i * 3]     = p.x;
      data.pPos[i * 3 + 1] = -0.9; // Just above floor
      data.pPos[i * 3 + 2] = p.z;
    });

    const points = g.children[g.children.length - 1] as THREE.Points;
    if (points && points.geometry) {
      (points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return null;
};

export default SceneStoreSync;
