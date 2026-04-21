import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Products from '../components/Products';
import AboutUs from '../components/AboutUs';
import TechPartnership from '../components/TechPartnership';
import CaseStudies from '../components/CaseStudies';
import Contact from '../components/Contact';

const HomePage = () => {
  const location = useLocation();

  // Handle scroll-to-section when navigating from another page
  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      // Small delay to let the page render first
      setTimeout(() => {
        const el = document.getElementById(state.scrollTo!);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clear the state so it doesn't scroll again on re-render
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <div id="about-us">
        <AboutUs />
      </div>
      <div className="border-t border-white/5"></div>
      <div id="products">
        <Products />
      </div>
      <div className="border-t border-white/5"></div>
      <div id="partnership">
        <TechPartnership />
      </div>
      <div className="border-t border-white/5"></div>
      <div id="case-studies">
        <CaseStudies />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default HomePage;
