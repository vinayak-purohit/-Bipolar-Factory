import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Products = () => {
  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Products</h2>
          <p className="text-4xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-normal">Explore the Frontier of Innovation with Our Signature Products</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* OLY Store Sync */}
          <Link to="/products/oly-store-sync" className="block">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-6 rounded-2xl overflow-hidden group h-full"
            >
              <div className="h-64 mb-6 rounded-lg overflow-hidden bg-black/50 relative border border-white/5">
                <img src="/oly_store_sync.png" alt="OLY Store Sync Dashboard" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-bold mb-2">OLY Store Sync</h3>
              <p className="text-gray-400 mb-4">An absolute AI platform that unlocks the full potential of your existing retail CCTV cameras.</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Real-time Footfall Tracking</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Heatmaps & Demographic Analysis</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span> Automated Theft & Fire Alerts</li>
              </ul>
              <div className="flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore Product</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          </Link>

          {/* OLY Control Center */}
          <Link to="/products/oly-control-center" className="block">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-6 rounded-2xl overflow-hidden group h-full"
            >
              <div className="h-64 mb-6 rounded-lg overflow-hidden bg-black/50 relative border border-white/5">
                 <img src="/oly_control_center.png" alt="OLY Control Center" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              </div>
              <h3 className="text-2xl font-bold mb-2">OLY Control Center</h3>
              <p className="text-gray-400 mb-4">A centralized Video Management System (VMS) with a comprehensive data-driven dashboard.</p>
              <ul className="text-sm text-gray-500 space-y-2 mb-6">
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span> Live Camera Controls & Mapping</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span> Multi-site Integration</li>
                <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2"></span> Deployed by Government Entities</li>
              </ul>
              <div className="flex items-center gap-2 text-secondary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Explore Product</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          </Link>

          {/* Metawood */}
          <Link to="/products/metawood" className="block md:col-span-2">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-6 rounded-2xl overflow-hidden group flex flex-col md:flex-row gap-6"
            >
              <div className="h-64 md:w-1/2 rounded-lg overflow-hidden bg-black/50 border border-white/5">
                 <img src="/metawood_vr.png" alt="Metawood VR Environment" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-2">Metawood</h3>
                <p className="text-gray-400 mb-4">A gamified metaverse platform enabling VR events, virtual theaters, free-roam avatars, and live watch parties.</p>
                <ul className="text-sm text-gray-500 space-y-2 mb-6">
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span> Fully Immersive VR Theaters</li>
                  <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-accent mr-2"></span> Decentralized Streaming Economy</li>
                </ul>
                <div className="flex items-center gap-4">
                  <span className="text-sm px-6 py-2 border border-accent/50 rounded-full group-hover:bg-accent group-hover:text-white transition-colors">Experience Metawood</span>
                  <span className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Products;
