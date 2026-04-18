import React, { useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { useLenis } from './hooks/useLenis';

import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import SocialSidebar from './components/layout/SocialSidebar';
import PageWrapper from './components/layout/PageWrapper';
import Hero from './components/sections/Hero';

import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProcessPage from './pages/ProcessPage';
import ContactPage from './pages/ContactPage';
import InsightsPage from './pages/InsightsPage';

function AppInner() {
  const navRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Initialize smooth scrolling globally
  useLenis();

  return (
    <>
      <Nav navRef={navRef} />
      <SocialSidebar />
      <Hero isGlobal={!isHome} navRef={navRef} />

      <Routes>
        <Route path="/" element={<HomePage navRef={navRef} />} />
        {/* this is not using for now */}
        {/* <Route path="/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} /> */}
        <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
        <Route path="/process" element={<PageWrapper><ProcessPage /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
        <Route path="/insights" element={<PageWrapper><InsightsPage /></PageWrapper>} />
      </Routes>

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
