import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   BUILD METAWOOD SCENE DATA
───────────────────────────────────────────── */
function buildMetawoodData() {
  const SHAPE_COUNT = 20;
  const shapes = [];
  
  for (let i = 0; i < SHAPE_COUNT; i++) {
    // Generate random positions in a ring around the center
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 5;
    shapes.push({
      x: Math.cos(angle) * radius,
      y: (Math.random() - 0.5) * 6,
      z: Math.sin(angle) * radius,
      rx: Math.random() * Math.PI,
      ry: Math.random() * Math.PI,
      rz: Math.random() * Math.PI,
      type: Math.floor(Math.random() * 3), // 0: box, 1: tetra, 2: octa
      speed: 0.1 + Math.random() * 0.4,
    });
  }
  return { shapes };
}

const SceneMetawood = () => {
  const { scene } = useThree();
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const data = useMemo(buildMetawoodData, []);
  const meshesRef = useRef<THREE.Mesh[]>([]);

  useEffect(() => {
    const g = groupRef.current;

    // 1. Central Platform
    const platformGeo = new THREE.CylinderGeometry(2, 2, 0.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xeb5757,
      emissiveIntensity: 0.2,
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -2;
    g.add(platform);

    // Glowing Rings around platform
    for (let i = 1; i <= 3; i++) {
      const ringGeo = new THREE.TorusGeometry(2 + i * 0.5, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xeb5757 : 0xf2994a,
        transparent: true,
        opacity: 0.5 / i,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -2;
      // Animate them differently using name later
      ring.name = `ring_${i}`;
      g.add(ring);
    }

    // 2. Floating VR Geometries
    const geoBox = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const geoTetra = new THREE.TetrahedronGeometry(0.5);
    const geoOcta = new THREE.OctahedronGeometry(0.5);

    data.shapes.forEach((s) => {
      let geo = geoBox;
      if (s.type === 1) geo = geoTetra;
      if (s.type === 2) geo = geoOcta;

      // Colorful glassy materials
      const isAccent1 = Math.random() > 0.5;
      const mat = new THREE.MeshPhysicalMaterial({
        color: isAccent1 ? 0xeb5757 : 0xf2994a,
        transmission: 0.9,
        opacity: 1,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        thickness: 0.5,
        emissive: isAccent1 ? 0xeb5757 : 0xf2994a,
        emissiveIntensity: 0.2
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(s.x, s.y, s.z);
      mesh.rotation.set(s.rx, s.ry, s.rz);
      g.add(mesh);
      meshesRef.current.push(mesh);
    });

    // 3. Central Hologram / VR Headset representation (Abstract)
    const vrGeo = new THREE.TorusKnotGeometry(0.6, 0.15, 100, 16);
    const vrMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xf2994a,
      emissiveIntensity: 1.5,
      wireframe: true
    });
    const vr = new THREE.Mesh(vrGeo, vrMat);
    vr.position.y = 0;
    vr.name = "vr_center";
    g.add(vr);

    scene.add(g);
    return () => { 
      meshesRef.current = [];
      scene.remove(g); 
    };
  }, [scene, data]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const time = state.clock.elapsedTime;

    // Slowly rotate entire group
    g.rotation.y += delta * 0.1;

    // Mouse perspective tilt
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.2, 0.05);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, -state.pointer.x * 0.2, 0.05);

    // Animate central VR node
    const vr = g.getObjectByName("vr_center");
    if (vr) {
      vr.rotation.x += delta * 0.5;
      vr.rotation.y += delta * 0.8;
      vr.position.y = Math.sin(time * 2) * 0.2;
    }

    // Animate rings
    for (let i = 1; i <= 3; i++) {
      const ring = g.getObjectByName(`ring_${i}`);
      if (ring) {
        // Subtle tilt oscillation
        ring.rotation.x = Math.PI / 2 + Math.sin(time * i) * 0.05;
        ring.rotation.y = Math.cos(time * i) * 0.05;
      }
    }

    // Animate floating shapes (bobbing and rotating)
    meshesRef.current.forEach((mesh, i) => {
      const s = data.shapes[i];
      mesh.rotation.x += delta * s.speed;
      mesh.rotation.y += delta * s.speed;
      mesh.position.y = s.y + Math.sin(time * 2 + i) * 0.5;
    });
  });

  return null;
};

export default SceneMetawood;
