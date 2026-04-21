import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   BUILD NETWORK
───────────────────────────────────────────── */
function buildNetwork() {
  const N   = 24;
  const MAX = 2.2;

  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < N; i++) {
    const phi   = Math.acos(1 - (2 * (i + 0.5)) / N);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const r     = 2.0 + (Math.random() - 0.5) * 0.8;
    nodes.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.6,
      r * Math.cos(phi) * 0.75
    ));
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < MAX) edges.push([i, j]);
    }
  }

  const edgeVerts = new Float32Array(edges.length * 6);
  edges.forEach(([a, b], k) => {
    edgeVerts[k * 6]     = nodes[a].x; edgeVerts[k * 6 + 1] = nodes[a].y; edgeVerts[k * 6 + 2] = nodes[a].z;
    edgeVerts[k * 6 + 3] = nodes[b].x; edgeVerts[k * 6 + 4] = nodes[b].y; edgeVerts[k * 6 + 5] = nodes[b].z;
  });

  const P = 20;
  const particles = Array.from({ length: P }, () => ({
    edge:     Math.floor(Math.random() * edges.length),
    progress: Math.random(),
    speed:    0.10 + Math.random() * 0.20,
  }));
  const pPos = new Float32Array(P * 3);

  return { nodes, edges, edgeVerts, particles, pPos };
}

/* ─────────────────────────────────────────────
   SCENE — fully imperative, added via useEffect
───────────────────────────────────────────── */
const NeuralScene = () => {
  const { scene } = useThree();
  const groupRef  = useRef<THREE.Group>(new THREE.Group());

  // Build everything once
  const net = useMemo(buildNetwork, []);

  useEffect(() => {
    const g = groupRef.current;

    /* ── Edges ── */
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(net.edgeVerts, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x7b2ff7, transparent: true, opacity: 0.30,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    g.add(new THREE.LineSegments(edgeGeo, edgeMat));

    /* ── Nodes ── */
    net.nodes.forEach((pos, i) => {
      const hub  = i < 6;
      const r    = hub ? 0.10 : 0.055;
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(r, 12, 12),
        new THREE.MeshStandardMaterial({
          color:            hub ? 0x00f2fe : 0x4facfe,
          emissive:         hub ? 0x00f2fe : 0x9b51e0,
          emissiveIntensity: hub ? 2.5 : 1.2,
        })
      );
      core.position.copy(pos);
      g.add(core);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(hub ? 0.24 : 0.13, 8, 8),
        new THREE.MeshBasicMaterial({
          color: hub ? 0x00f2fe : 0x9b51e0,
          transparent: true, opacity: hub ? 0.10 : 0.05,
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
      );
      halo.position.copy(pos);
      g.add(halo);
    });

    /* ── Traveling particles ── */
    const pGeo = new THREE.BufferGeometry();
    const pAttr = new THREE.BufferAttribute(net.pPos, 3);
    pAttr.setUsage(THREE.DynamicDrawUsage);
    pGeo.setAttribute('position', pAttr);
    const pMat = new THREE.PointsMaterial({
      size: 0.18, color: 0x00f2fe,
      transparent: true, opacity: 0.95,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    g.add(points);

    scene.add(g);
    return () => { scene.remove(g); };
  }, [scene, net]);

  // Per-frame: rotate + update particles
  useFrame(({ pointer }, delta) => {
    const g = groupRef.current;
    g.rotation.y += delta * 0.07;
    g.rotation.x  = THREE.MathUtils.lerp(g.rotation.x, -pointer.y * 0.18, 0.05);

    net.particles.forEach((p, i) => {
      p.progress = (p.progress + p.speed * delta) % 1;
      const [a, b] = net.edges[p.edge];
      const t = p.progress;
      net.pPos[i * 3]     = net.nodes[a].x + (net.nodes[b].x - net.nodes[a].x) * t;
      net.pPos[i * 3 + 1] = net.nodes[a].y + (net.nodes[b].y - net.nodes[a].y) * t;
      net.pPos[i * 3 + 2] = net.nodes[a].z + (net.nodes[b].z - net.nodes[a].z) * t;
    });

    // Mark particle positions dirty
    const points = g.children[g.children.length - 1] as THREE.Points;
    if (points && points.geometry) {
      (points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return null; // everything added imperatively
};

/* ─────────────────────────────────────────────
   BACKGROUND DUST
───────────────────────────────────────────── */
const Dust = () => {
  const { scene } = useThree();
  const dustRef   = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const count = 130;
    const arr   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.016, color: 0x4facfe,
      transparent: true, opacity: 0.13,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const pts = new THREE.Points(geo, mat);
    dustRef.current = pts;
    scene.add(pts);
    return () => { scene.remove(pts); };
  }, [scene]);

  useFrame(({ clock }) => {
    if (dustRef.current) dustRef.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return null;
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = () => (
  <div id="hero" className="relative w-full h-screen bg-background overflow-hidden flex items-center justify-center">

    {/* Ambient glows */}
    <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[220px] top-1/3 left-1/3 z-0 pointer-events-none" />
    <div className="absolute w-[350px] h-[350px] bg-primary/5 rounded-full blur-[160px] bottom-1/3 right-1/3 z-0 pointer-events-none" />

    {/* Scanline */}
    <motion.div
      className="absolute left-0 right-0 h-px z-10 pointer-events-none"
      style={{ background: 'linear-gradient(90deg,transparent,rgba(0,242,254,0.18),rgba(0,242,254,0.08),transparent)' }}
      initial={{ top: '10%' }}
      animate={{ top: ['10%', '90%', '10%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    />

    {/* 3D Canvas */}
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.06} />
        <pointLight position={[0,  3, 5]} intensity={1.2} color="#00f2fe" distance={20} />
        <pointLight position={[0, -3, 5]} intensity={0.8} color="#9b51e0" distance={18} />
        <NeuralScene />
        <Dust />
      </Canvas>
    </div>

    {/* HUD corners */}
    <div className="absolute inset-8 md:inset-14 z-10 pointer-events-none">
      <div className="absolute top-0 left-0  w-8 h-8 border-t border-l border-primary/20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/20" />
      <div className="absolute bottom-0 left-0  w-8 h-8 border-b border-l border-primary/20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/20" />
    </div>

    {/* Status tag */}
    <motion.div
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="absolute top-24 left-6 md:left-12 z-20 pointer-events-none font-mono text-[10px] text-primary/50 space-y-1"
    >
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
        <span className="text-green-400">LIVE</span>
        <span className="text-white/20">|</span>
        <span>AI NEURAL NET</span>
      </div>
      <div className="text-white/15">━━━━━━━━━━━━━</div>
      <div>24 NODES · ACTIVE</div>
    </motion.div>

    {/* Hero text */}
    <div className="z-20 text-center max-w-4xl px-4 pointer-events-none">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-5">
        <span className="text-xs uppercase tracking-[0.3em] text-primary/70 font-medium font-mono">
          AI-Powered Vision · Intelligent Surveillance
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold tracking-tight leading-snug mb-8"
      >
        We are a collective of forward-thinking minds driven by a singular purpose: to{' '}
        <span className="bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          harness the power of technology
        </span>{' '}
        for the betterment of society.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex gap-4 justify-center pointer-events-auto mt-10"
      >
        <button 
          onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
        >
          Know More About Us
        </button>
      </motion.div>
    </div>

    {/* Scroll */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center z-20">
      <span className="text-xs tracking-widest text-gray-400 uppercase mb-2 font-mono">Scroll</span>
      <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
    </div>

    {/* Vignette */}
    <div className="absolute inset-0 z-[5] pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, transparent 28%, rgba(10,10,10,0.75) 100%)' }} />
  </div>
);

export default Hero;
