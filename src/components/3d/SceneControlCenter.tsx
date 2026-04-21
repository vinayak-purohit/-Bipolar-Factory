import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   BUILD CONTROL CENTER SCENE DATA
───────────────────────────────────────────── */
function buildCityData() {
  const PILLAR_COUNT = 15;
  const pillars = [];
  
  for (let i = 0; i < PILLAR_COUNT; i++) {
    pillars.push({
      x: (Math.random() - 0.5) * 12,
      z: (Math.random() - 0.5) * 12,
      h: 0.5 + Math.random() * 3,
      delay: Math.random() * Math.PI * 2, // for pulse animation
    });
  }
  return { pillars };
}

const SceneControlCenter = () => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const data = useMemo(buildCityData, []);
  
  // Keep track of materials that need to pulsate
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  useEffect(() => {
    const g = groupRef.current;
    
    // 1. Terrain Grid
    const wireGeo = new THREE.PlaneGeometry(20, 20, 20, 20);
    // Perturb vertices slightly to look like terrain
    const posAttribute = wireGeo.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
      const x = posAttribute.getX(i);
      const y = posAttribute.getY(i);
      const dist = Math.sqrt(x*x + y*y);
      const z = Math.sin(dist * 0.5) * 0.5;
      posAttribute.setZ(i, z);
    }
    wireGeo.computeVertexNormals();

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x4facfe,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending
    });
    const terrain = new THREE.Mesh(wireGeo, wireMat);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.y = -2;
    g.add(terrain);

    // 2. Data Pillars
    data.pillars.forEach((p) => {
      // The pillar
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        emissive: 0x9b51e0,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.8
      });
      materialsRef.current.push(mat);

      const boxGeo = new THREE.BoxGeometry(0.15, p.h, 0.15);
      const box = new THREE.Mesh(boxGeo, mat);
      
      // Calculate terrain height at this x, z roughly
      const dist = Math.sqrt(p.x*p.x + p.z*p.z);
      const ty = -2 + Math.sin(dist * 0.5) * 0.5;
      
      box.position.set(p.x, ty + p.h / 2, p.z);
      g.add(box);

      // A glowing node at the top
      const nodeGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(p.x, ty + p.h + 0.1, p.z);
      g.add(node);
      
      // Data arc to center (0,0,0 is center floating node)
      const arcGeo = new THREE.BufferGeometry();
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(p.x, ty + p.h, p.z),
        new THREE.Vector3(p.x * 0.5, 3, p.z * 0.5),
        new THREE.Vector3(0, 1, 0)
      );
      const arcPts = curve.getPoints(20);
      arcGeo.setFromPoints(arcPts);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x4facfe, 
        transparent: true, 
        opacity: 0.2, 
        blending: THREE.AdditiveBlending
      });
      const arc = new THREE.Line(arcGeo, arcMat);
      g.add(arc);
    });

    // 3. Central Core Node
    const coreGeo = new THREE.OctahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x00f2fe,
      emissiveIntensity: 2,
      wireframe: true
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.position.set(0, 1, 0);
    // Add it as a specific recognizable child we can rotate
    core.name = "core";
    g.add(core);

    scene.add(g);
    return () => { 
      materialsRef.current = [];
      scene.remove(g); 
    };
  }, [scene, data]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    // Slow rotation
    g.rotation.y -= delta * 0.05;
    
    // Mouse tilt
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.2, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.2, 0.05);

    // Core spin
    const core = g.getObjectByName("core");
    if (core) {
      core.rotation.y += delta * 0.5;
      core.rotation.z += delta * 0.3;
    }

    // Pulsate pillars
    const time = state.clock.elapsedTime;
    materialsRef.current.forEach((mat, i) => {
      const p = data.pillars[i];
      mat.emissiveIntensity = 0.5 + Math.sin(time * 2 + p.delay) * 0.5;
    });
  });

  return null;
};

export default SceneControlCenter;
