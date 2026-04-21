import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Products', id: 'products' },
  { label: 'Partnership', id: 'partnership' },
  { label: 'Case Studies', id: 'case-studies' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (id: string) => {
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/', { state: { scrollTo: id } });
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            {/* Dual orb mini icon */}
            <div className="absolute w-4 h-4 rounded-full bg-primary/80 top-0 left-0 group-hover:scale-110 transition-transform"></div>
            <div className="absolute w-4 h-4 rounded-full bg-accent/80 bottom-0 right-0 group-hover:scale-110 transition-transform"></div>
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
            Bipolar Factory
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className="text-sm text-gray-300 hover:text-white transition-colors tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`}></span>
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-px bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="text-left text-gray-300 hover:text-white transition-colors py-2 text-lg"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
