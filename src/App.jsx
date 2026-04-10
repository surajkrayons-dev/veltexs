import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useLenis } from './hooks/useLenis';

import Nav         from './components/layout/Nav';
import Footer      from './components/layout/Footer';
import PageWrapper from './components/layout/PageWrapper';

import HomePage     from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage    from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage  from './pages/ProcessPage';
import ContactPage  from './pages/ContactPage';
import InsightsPage from './pages/InsightsPage';

export default function App() {
  const navRef = useRef(null);
  
  // Initialize smooth scrolling globally
  useLenis(); 

  return (
    <BrowserRouter>
      <Nav navRef={navRef} />
      
      <Routes>
        <Route path="/"         element={<HomePage navRef={navRef} />} />
        <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
        <Route path="/about"    element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/process"  element={<PageWrapper><ProcessPage /></PageWrapper>} />
        <Route path="/contact"  element={<PageWrapper bg="#ffffff"><ContactPage /></PageWrapper>} />
        <Route path="/insights" element={<PageWrapper><InsightsPage /></PageWrapper>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
