import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

export default function PageWrapper({ children, bg = '#f5f0e8' }) {
  const wrapRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Set body background color safely
    gsap.to('body', { backgroundColor: bg, duration: 0.5, overwrite: 'auto' });
    
    // Animate page entry on route change
    let ctx = gsap.context(() => {
      gsap.fromTo(wrapRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }
      );
    });

    return () => ctx.revert();
  }, [location.pathname, bg]);

  return <main ref={wrapRef} className="relative min-h-screen" role="main">{children}</main>;
}
