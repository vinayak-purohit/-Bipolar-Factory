import React, { Suspense, lazy, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import Contact from '../components/Contact';

// Lazy load 3D scenes so they don't block initial page render
const SceneStoreSync = lazy(() => import('../components/3d/SceneStoreSync'));
const SceneControlCenter = lazy(() => import('../components/3d/SceneControlCenter'));
const SceneMetawood = lazy(() => import('../components/3d/SceneMetawood'));

interface ProductData {
  name: string;
  tagline: string;
  description: string;
  heroGradient: string;
  accentColor: string;
  features: string[];
  image: string;
}

const productMap: Record<string, ProductData> = {
  'oly-store-sync': {
    name: 'OLY Store Sync',
    tagline: 'See Everything. Know Everything.',
    description:
      'An absolute AI platform that unlocks the full potential of your existing retail CCTV cameras. OLY Store Sync transforms passive surveillance into an active intelligence layer — delivering real-time footfall analytics, demographic breakdowns, heatmaps, and automated threat detection without any new hardware.',
    heroGradient: 'from-primary/20 via-transparent',
    accentColor: 'text-primary',
    features: [
      'Real-time Footfall Tracking & Analytics',
      'Heatmaps & Demographic Analysis',
      'Automated Theft & Fire Alerts',
      'Zone-based Occupancy Monitoring',
      'Staff vs Customer Differentiation',
      'Multi-store Dashboard & Reporting',
    ],
    image: '/oly_store_sync.png',
  },
  'oly-control-center': {
    name: 'OLY Control Center',
    tagline: 'Command. Monitor. Deploy.',
    description:
      'A centralized Video Management System (VMS) with a comprehensive data-driven dashboard. OLY Control Center provides live camera controls, multi-site integration, and real-time mapping — trusted and deployed by government entities across India for mission-critical surveillance operations.',
    heroGradient: 'from-secondary/20 via-transparent',
    accentColor: 'text-secondary',
    features: [
      'Live Camera Controls & PTZ Mapping',
      'Multi-site Integration & Management',
      'Government-grade Security Protocols',
      'Real-time Event Correlation Engine',
      'Custom Alert Rules & Escalation',
      'Deployed by Government Entities',
    ],
    image: '/oly_control_center.png',
  },
  metawood: {
    name: 'Metawood',
    tagline: 'Step Into the Future of Entertainment.',
    description:
      'A gamified metaverse platform enabling VR events, virtual theaters, free-roam avatars, and live watch parties. Metawood creates a decentralized streaming economy where creators and audiences meet in fully immersive virtual worlds.',
    heroGradient: 'from-accent/20 via-transparent',
    accentColor: 'text-accent',
    features: [
      'Fully Immersive VR Theaters',
      'Free-roam Avatar Customization',
      'Live Watch Parties & Social Events',
      'Decentralized Streaming Economy',
      'Creator Monetization Tools',
      'Cross-platform VR/Desktop Access',
    ],
    image: '/metawood_vr.png',
  },
};

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? productMap[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      
      {/* ─────────────────────────────────────────────────────────────
          1. DETAILS / OVERVIEW SECTION 
      ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className={`absolute inset-0 bg-gradient-to-b ${product.heroGradient} opacity-30 pointer-events-none`}></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md mb-8"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </Link>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{product.name}</h2>
            <p className={`text-xl ${product.accentColor} font-medium mb-8`}>{product.tagline}</p>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3.5 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                Request a Demo
              </button>
              <button className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
                Technical Specs
              </button>
            </div>
          </motion.div>

          {/* Right Image/Snapshot Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-panel p-2 rounded-2xl overflow-hidden border border-white/10 relative z-10 shadow-2xl">
              <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-white/70 border border-white/10 uppercase">
                System Capture
              </div>
              <img
                 src={product.image}
                 alt={product.name}
                 className="w-full h-auto aspect-video object-cover rounded-xl border border-white/5"
              />
            </div>
            {/* Ambient glows behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          </motion.div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. CAPABILITIES GRID & 3D VISUALIZATION
      ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className={`text-sm font-bold uppercase tracking-widest ${product.accentColor} mb-4`}>
            Core Capabilities
          </h2>
          <p className="text-3xl md:text-4xl font-bold">Built for Impact</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Box: Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {product.features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`glass-panel p-5 group hover:border-white/20 transition-colors cursor-default min-h-[140px]`}
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <span className={`${product.accentColor} font-bold text-xs`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-gray-300 font-medium text-sm leading-snug">{feature}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Box: 3D Visualization */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 relative shadow-2xl"
          >
            <Canvas camera={{ position: [0, 4, 10], fov: 45 }} dpr={[1, 2]}>
              <Suspense fallback={null}>
                {slug === 'oly-store-sync' && <SceneStoreSync />}
                {slug === 'oly-control-center' && <SceneControlCenter />}
                {slug === 'metawood' && <SceneMetawood />}
              </Suspense>
            </Canvas>
            <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2">
               <span className="relative flex h-2 w-2">
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${product.accentColor === 'text-primary' ? 'bg-primary' : product.accentColor === 'text-secondary' ? 'bg-secondary' : 'bg-accent'} opacity-75`}></span>
                 <span className={`relative inline-flex rounded-full h-2 w-2 ${product.accentColor === 'text-primary' ? 'bg-primary' : product.accentColor === 'text-secondary' ? 'bg-secondary' : 'bg-accent'}`}></span>
               </span>
               <span className={`text-xs ${product.accentColor} font-mono uppercase tracking-widest bg-black/60 px-3 py-1 rounded-md border border-white/10`}>Interactive Simulation</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. FOOTER / CONTACT
      ───────────────────────────────────────────────────────────── */}
      <div className="mt-20">
        <Contact />
      </div>
    </div>
  );
};

export default ProductPage;
