import React from 'react';
import { motion } from 'framer-motion';

const TechPartnership = () => {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-bold uppercase tracking-widest text-accent mb-4">Technology Partnership</h2>
          <p className="text-4xl md:text-5xl font-bold text-gray-100 max-w-2xl mx-auto mb-8">Elevate Your Tech Game</p>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            Gain access to our wellspring of technical expertise, where consultants offer strategies tailored to your unique business challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
           <motion.div whileHover={{ y: -5 }} className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-4 tracking-wide text-white">TECHNICAL CONSULTING</h3>
              <p className="text-gray-400">With our comprehensive transformation strategies, effectively redefine how you operate and deliver value to your customers.</p>
           </motion.div>

           <motion.div whileHover={{ y: -5 }} className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-4 tracking-wide text-white">DIGITAL TRANSFORMATION</h3>
              <p className="text-gray-400">Navigate the shifting landscape of enterprise tech smoothly using our end-to-end digital integration models.</p>
           </motion.div>

           <motion.div whileHover={{ y: -5 }} className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-4 tracking-wide text-white">RESEARCH</h3>
              <p className="text-gray-400">Stay ahead with our dedicated research services, diving deep into tech trends and emerging fields to give you the competitive edge.</p>
           </motion.div>

           <motion.div whileHover={{ y: -5 }} className="glass-panel p-8">
              <h3 className="text-xl font-bold mb-4 tracking-wide text-white">CUSTOM APPLICATION DEVELOPMENT</h3>
              <p className="text-gray-400">Bring your vision to life with custom applications that are meticulously crafted to fit your business needs and exceed expectations.</p>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechPartnership;
