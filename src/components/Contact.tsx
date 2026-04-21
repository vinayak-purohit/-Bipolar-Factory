import React from 'react';
import { Mail, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <footer className="py-24 px-4 bg-background relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 relative z-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Every Client Is a Valuable Long-Term Partner</h2>
          <p className="text-gray-400 mb-12 max-w-md">Reach out to explore how we can align our custom tech solutions to your unique requirements.</p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="text-primary mr-4 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Coimbatore HQ</h4>
                <p className="text-gray-400 text-sm">Bipolar Factory Private Limited<br/>2/118, First Floor, Nehru Nagar,<br/>Koundampalayam Road, Edayarpalayam,<br/>Tamil Nadu 641025</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Mail className="text-primary mr-4" />
              <a href="#" className="text-gray-400 hover:text-white transition-colors">hello@bipolarfactory.com</a>
            </div>
          </div>

          <div className="mt-12 flex gap-4">
             <a href="https://twitter.com/bipolarfactory" className="text-sm font-semibold border border-white/20 rounded-full px-4 py-2 hover:bg-primary hover:text-black transition-colors">X (Twitter)</a>
             <a href="https://linkedin.com/company/bipolarfactory/" className="text-sm font-semibold border border-white/20 rounded-full px-4 py-2 hover:bg-primary hover:text-black transition-colors">LinkedIn</a>
             <a href="https://facebook.com/bipolarfactory" className="text-sm font-semibold border border-white/20 rounded-full px-4 py-2 hover:bg-primary hover:text-black transition-colors">Facebook</a>
          </div>
        </div>

        <div className="glass-panel p-8 relative">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
              <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity">Send Message</button>
          </form>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 text-center text-sm text-gray-500">
        &copy; 2026 Bipolar Factory. All Rights Reserved. <br/> Ethical AI • Made in India
      </div>
    </footer>
  );
};
export default Contact;
