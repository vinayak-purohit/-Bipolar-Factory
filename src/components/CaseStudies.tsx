import React from 'react';
import { motion } from 'framer-motion';

const CaseStudies = () => {
  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Spotlight on Success</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-6"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Automated Vote Counting */}
          <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Automated Vote Counting</h3>
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "The automated vote counting system developed by Bipolar Factory for the Bihar Election project was a testament to their technological prowess and understanding of complex systems. Their solution ensured accuracy and efficiency in a critical democratic process."
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">Gajapathy Chakravarthy</p>
              <p className="text-xs text-primary uppercase tracking-wider">iNET Secure Labs</p>
            </div>
          </motion.div>

          {/* EPR Portal */}
          <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">EPR Waste Management Portal</h3>
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                "Bipolar Factory's development of the EPR portal has been a cornerstone in modernizing Zigma's waste management services. Their expertise in digital solutions has significantly elevated our operational efficiency and environmental impact."
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">Boopathy Dharmaraj</p>
              <p className="text-xs text-secondary uppercase tracking-wider">Zigma</p>
            </div>
          </motion.div>

          {/* WoTA Indoor GPS */}
          <motion.div whileHover={{ y: -5 }} className="glass-panel p-8 flex flex-col justify-between lg:col-span-2">
            <div>
              <h3 className="text-2xl font-bold mb-4">Indoor GPS Solution</h3>
              <p className="text-gray-300 italic mb-6 leading-relaxed text-lg">
                "The indoor GPS solution provided by Bipolar Factory has been a game-changer for weaving units in Coimbatore. It has not only enhanced worker productivity but also brought a new level of precision to our operations."
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">Elavarasu Arumugham</p>
              <p className="text-xs text-accent uppercase tracking-wider">WoTA</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
export default CaseStudies;
