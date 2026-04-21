import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

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
    heroGradient: 'from-primary/20 via-secondary/10 to-transparent',
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
    heroGradient: 'from-secondary/20 via-primary/10 to-transparent',
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
    heroGradient: 'from-accent/20 via-primary/10 to-transparent',
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
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Gradient backdrop */}
        <div className={`absolute inset-0 bg-gradient-to-br ${product.heroGradient}`}></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02),transparent_70%)]"></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to
              Home
            </Link>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">{product.name}</h1>
            <p className={`text-xl ${product.accentColor} font-medium mb-6`}>{product.tagline}</p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              {product.description}
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors">
                Request a Demo
              </button>
              <button className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass-panel p-2 rounded-2xl overflow-hidden border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            {/* Floating accent glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
            Capabilities
          </h2>
          <p className="text-3xl md:text-4xl font-bold">What {product.name} Delivers</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-6 group hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary font-bold text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-gray-200 font-medium pt-2">{feature}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass-panel p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              See how {product.name} can integrate into your existing infrastructure and deliver
              measurable results from day one.
            </p>
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
};

export default ProductPage;
