import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <div className="bg-background min-h-screen text-gray-100 selection:bg-primary/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:slug" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
