import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.about-page-line', {
        y: '100%', opacity: 0, duration: 1,
        stagger: 0.12, ease: 'power4.out', delay: 0.15,
      });
      gsap.from('.about-page-scatter-img', {
        y: 30, opacity: 0, scale: 0.95, duration: 0.9,
        stagger: 0.15, ease: 'power3.out', delay: 0.3,
      });
      gsap.from('.about-page-body-p', {
        y: 25, opacity: 0, duration: 0.8,
        stagger: 0.1, ease: 'power3.out', delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-44 pb-32 px-[6vw] bg-[#f5f0e8] min-h-screen text-[#1a1a1a] sm:pt-32">
      {/* Hero text */}
      <div className="max-w-[1200px] mb-32 sm:mb-20">
        <div className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#666] mb-10">(About)</div>
        <h1 className="font-serif text-[clamp(2.5rem,5.5vw,6.5rem)] font-medium leading-[1.1] tracking-tighter text-[#1a1a1a]">
          {['Veltex is a digital', 'design studio based in', 'Singapore & Hong Kong.'].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <span className="about-page-line inline-block will-change-transform">{line}</span>
            </div>
          ))}
        </h1>
      </div>

      {/* Scattered image collage — like Studio X About */}
      <div className="grid grid-cols-4 gap-4 mb-32 items-start sm:grid-cols-2 sm:gap-4 sm:mb-20">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=80"
          alt="Veltex project 1"
          className="about-page-scatter-img col-start-1 row-start-1 w-full rounded-sm"
        />
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&auto=format&fit=crop&q=80"
          alt="Veltex project 2"
          className="about-page-scatter-img col-start-2 row-start-1 row-span-2 mt-12 w-full rounded-sm sm:mt-6"
        />
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=450&auto=format&fit=crop&q=80"
          alt="Veltex project 3"
          className="about-page-scatter-img col-start-3 row-start-1 w-full rounded-sm sm:col-start-1 sm:row-start-2"
        />
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&auto=format&fit=crop&q=80"
          alt="Veltex project 4"
          className="about-page-scatter-img col-start-4 row-start-1 mt-8 w-full rounded-sm sm:col-start-2 sm:row-start-2 sm:mt-4"
        />
      </div>

      {/* Body content */}
      <div className="max-w-[1000px]">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-[1.2] mb-20 text-[#1a1a1a] sm:mb-12">
          Veltex is a digital design studio specialising in commercially
          intelligent experiences that enhance business performance.
        </h2>
        <div className="grid grid-cols-2 gap-16 mb-24 sm:grid-cols-1 sm:gap-10 sm:mb-16">
          <p className="about-page-body-p font-sans text-lg leading-relaxed text-[#555] font-light sm:text-base">
            We design and build environments where experience and performance
            are inseparable. Every decision is shaped by how a brand will be
            used, perceived, and ultimately how it performs commercially.
          </p>
          <p className="about-page-body-p font-sans text-lg leading-relaxed text-[#555] font-light sm:text-base">
            Our work spans brand identities, digital platforms, and physical
            environments across the Asia-Pacific region. In each case, we
            operate as a senior-led extension of our clients' teams — aligning
            brand strategy, creative vision, and delivery realities from the
            outset.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 pt-12 border-t border-black/10 sm:grid-cols-2 sm:gap-10">
          {[
            { num: '12+', label: 'Years of mastery' },
            { num: '340', label: 'Projects delivered' },
            { num: '18',  label: 'Markets reached' },
            { num: '60+', label: 'Brand clients' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-serif text-5xl font-bold text-[#1a1a1a] mb-2 tracking-tighter">{s.num}</div>
              <div className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

