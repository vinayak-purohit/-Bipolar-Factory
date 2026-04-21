import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-24 px-4 bg-[#050505] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">About Us</h2>
          <p className="text-4xl md:text-5xl font-bold text-white max-w-4xl mx-auto leading-normal">
            Pioneering the Future of AI Integration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed font-medium">
              We are a collective of forward-thinking minds driven by a singular purpose: to harness the power of technology for the betterment of society.
            </p>
            <p className="text-gray-400 leading-relaxed">
              At Bipolar Factory, we bridge the gap between complex artificial intelligence algorithms and practical, real-world utility. By retrofitting existing infrastructure with cutting-edge vision models and centralized VMS capabilities, we transform passive legacy systems into highly actionable data networks.
            </p>
            <div className="pt-4 flex gap-8">
              <div>
                <span className="block text-3xl font-bold text-primary mb-1">5M+</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Events Processed</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-secondary mb-1">99%</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">System Accuracy</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-accent mb-1">24/7</span>
                <span className="text-sm text-gray-500 uppercase tracking-wider">Active Threat Monitoring</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] rounded-2xl glass-panel overflow-hidden border border-white/10 flex items-center justify-center bg-black/40"
          >
            {/* Abstract visual replacing an image */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,254,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            ></div>
            
            <div className="relative z-10 w-32 h-32 border border-primary/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
               <div className="w-24 h-24 border border-secondary/40 rounded-full flex items-center justify-center animate-[spin_8s_linear_infinite_reverse]">
                   <div className="w-16 h-16 bg-gradient-to-tr from-primary/20 to-accent/20 border border-white/20 rounded-full backdrop-blur-sm"></div>
               </div>
            </div>
            
            <div className="absolute bottom-6 right-6">
               <span className="bg-black/80 border border-white/10 px-3 py-1 rounded text-xs font-mono text-gray-400">HQ_NODE_SYS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
