import React from 'react';

const Testimonials = () => {
  return (
    <section className="py-24 px-4 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-center">What Our Clients Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 flex flex-col">
            <p className="text-gray-300 italic mb-6">"Bipolar Factory's development of the EPR portal has been a cornerstone in modernizing Zigma's waste management services. Their expertise in digital solutions has significantly elevated our operational efficiency."</p>
            <div className="mt-auto">
              <h4 className="font-bold">Boopathy Dharmaraj</h4>
              <p className="text-sm text-primary">CEO, Zigma Global</p>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col">
            <p className="text-gray-300 italic mb-6">"The automated vote counting system developed by Bipolar Factory for the Bihar Election project was a testament to their technological prowess and understanding of complex systems. Their solution ensured accuracy in a critical democratic process."</p>
            <div className="mt-auto">
              <h4 className="font-bold">Gajapathy Chakravarthy</h4>
              <p className="text-sm text-secondary">iNET Secure Labs</p>
            </div>
          </div>

          <div className="glass-panel p-8 flex flex-col">
            <p className="text-gray-300 italic mb-6">"The indoor GPS solution provided by Bipolar Factory has been a game-changer for weaving units. It has not only enhanced worker productivity but also brought a new level of precision to operations."</p>
            <div className="mt-auto">
              <h4 className="font-bold">Elavarasu Arumugham</h4>
              <p className="text-sm text-accent">WoTA Client</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
