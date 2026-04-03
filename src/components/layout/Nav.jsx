import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { Canvas, useFrame } from '@react-three/fiber';

const PRIMARY_LINKS = [
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
];

const SECONDARY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

// Rotating 3D torus knot – uses delta, no Clock deprecation
const ThreeDEffect = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.rotation.z = time * 0.1;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <torusKnotGeometry args={[1.2, 0.35, 180, 24]} />
      <meshStandardMaterial color="#d44b1e" emissive="#ff5500" emissiveIntensity={0.8} wireframe />
    </mesh>
  );
};

export default function Nav({ navRef }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuCardRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const ctaLabel = isHome ? 'Contact' : 'Projects';
  const ctaHref = isHome ? '/contact' : '/projects';

  useEffect(() => {
    if (!isHome && navRef.current) {
      gsap.to(navRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
    }
  }, [isHome, navRef]);

  useEffect(() => {
    if (!menuCardRef.current) return;
    let ctx = gsap.context(() => {
      if (menuOpen) {
        const tl = gsap.timeline();
        tl.fromTo(
          menuCardRef.current,
          { opacity: 0, y: 40, scale: 0.95, rotationX: -25, rotationY: 15, transformPerspective: 1000 },
          { opacity: 1, y: 0, scale: 1, rotationX: 0, rotationY: 0, duration: 0.85, ease: 'elastic.out(1,0.85)' }
        );
        tl.fromTo(
          '.nav-stagger-item',
          { y: 25, opacity: 0, rotationX: -10 },
          { y: 0, opacity: 1, rotationX: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
          '-=0.6'
        );
      } else {
        gsap.to(menuCardRef.current, { opacity: 0, y: 30, scale: 0.96, rotationX: 10, duration: 0.4, ease: 'power3.inOut' });
      }
    }, menuCardRef);
    return () => ctx.revert();
  }, [menuOpen]);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuOpen && !e.target.closest('#main-nav-container')) setMenuOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const go = (href) => {
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* 3D Background – stable Canvas, no warnings */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, powerPreference: 'high-performance' }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <ThreeDEffect />
        </Canvas>
      </div>

      {/* Navigation Container */}
      <div
        ref={navRef}
        id="main-nav-container"
        className="fixed bottom-6 left-0 right-0 z-[9999] flex flex-col items-center gap-4 px-4 sm:bottom-10"
        style={{
          opacity: isHome ? 0 : 1,
          transform: isHome ? 'translateY(80px)' : 'translateY(0)',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Menu Card Overlay */}
        {menuOpen && (
          <div
            ref={menuCardRef}
            className="w-full max-w-[500px] bg-white/95 backdrop-blur-[32px] border border-white/20 rounded-[32px] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.4)] flex flex-col gap-8 origin-bottom"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex flex-col">
              {PRIMARY_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="nav-stagger-item group flex justify-between items-center py-4 border-b border-black/5 text-left transition-all duration-300 hover:translate-x-3 hover:rotate-y-5 hover:pl-4 last:border-0 outline-none"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <span className="font-serif text-[clamp(0.75rem,2vw,1.5rem)] font-medium text-[#1a1a1a] transition-colors group-hover:text-[#d44b1e]">
                    {link.label}
                  </span>
                  <span className="text-[1.5rem] text-[#d44b1e] opacity-0 -translate-x-6 transition-all group-hover:opacity-100 group-hover:translate-x-0">↗</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 nav-stagger-item">
              {SECONDARY_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="font-sans text-[0.85rem] font-semibold text-[#666] tracking-widest uppercase hover:text-[#1a1a1a] transition-all duration-300 hover:scale-105 outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Nav Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 w-full pointer-events-none">
          {/* 3D Logo Button */}
          <button
            onClick={() => go('/')}
            className="pointer-events-auto flex items-center justify-center w-[46px] h-[46px] group outline-none flex-shrink-0"
            style={{ transformStyle: 'preserve-3d' }}
            aria-label="Veltex Logo"
          >
            <div className="relative flex items-center justify-center w-full h-full bg-[rgba(59,57,55,0.65)] rounded-full transition-all duration-700 ease-in-out group-hover:rotate-y-180 group-hover:scale-110 shadow-[0_4px_30px_rgba(0,0,0,0.15)] border border-white/5">
              <svg viewBox="0 0 32 32" className="w-[30px] h-auto text-[#f4eff0] drop-shadow-md" style={{ backfaceVisibility: 'hidden' }}>
                <path d="M6 8L16 26L26 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
          </button>

          {/* Main Navigation Pill */}
          <div
            className="pointer-events-auto flex items-center justify-between bg-[rgba(59,57,55,0.65)] backdrop-blur-xl border border-white/10 rounded-full h-[46px] sm:h-[50px] shadow-[0_4px_30px_rgba(0,0,0,0.15)] px-2 pl-6 sm:px-3 sm:pl-8 transition-all duration-300 hover:rotate-x-6 hover:-translate-y-2"
            style={{ transformStyle: 'preserve-3d', perspective: '500px' }}
          >
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-[10px] h-full outline-none group">
              <div className="flex flex-col gap-[4px] w-[18px]">
                <span className={`block h-[1px] bg-white transition-all duration-400 ease-out ${menuOpen ? 'translate-y-[2.5px] rotate-45 w-[18px]' : 'w-[18px]'}`} />
                <span className={`block h-[1px] bg-white transition-all duration-400 ease-out ${menuOpen ? '-translate-y-[2.5px] -rotate-45 w-[18px]' : 'w-[18px]'}`} />
              </div>
              <span className="text-white text-[14px] font-sans font-medium tracking-[0.01em] pb-[1px]">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <div className="w-[80px] sm:w-[150px] transition-all duration-300" />
            <button
              onClick={() => go(ctaHref)}
              className="h-[36px] sm:h-[40px] px-[26px] sm:px-[30px] bg-[#ff4200] text-white rounded-full font-sans text-[13.5px] sm:text-[14px] font-semibold tracking-[0.02em] hover:bg-[#ff5a22] transition-all duration-300 hover:scale-105 pb-[1px]"
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}