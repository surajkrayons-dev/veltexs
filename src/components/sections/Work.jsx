import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useWorkAnimation } from '../../hooks/useScrollAnimations';

const PROJECTS = [
  {
    id: 1,
    title: 'Horizon',
    subtitle: 'Brand Identity',
    desc: 'A complete brand overhaul for a global architecture firm expanding into Southeast Asia. Identity, motion, and digital presence.',
    thumb: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Obsidian',
    subtitle: 'Digital Experience',
    desc: 'An immersive web platform for a luxury real-estate developer — merging high-res visuals with scroll-driven narratives.',
    thumb: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d70b?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1493663284031-b7e3aaa4d70b?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Lume',
    subtitle: 'Spatial Design',
    desc: 'Flagship retail environment for a contemporary lifestyle brand. Experiential design bridging physical and digital worlds.',
    thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Auris',
    subtitle: 'Motion & Campaign',
    desc: 'A cinematic campaign for a premium audio brand — blending tactile product craft with abstract motion design.',
    thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&auto=format&fit=crop&q=80',
    bg: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&auto=format&fit=crop&q=80',
  },
];

export default function Work() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);
  const titleRef  = useRef(null);
  const descRef   = useRef(null);
  const labelRef  = useRef(null);

  useWorkAnimation({ sectionRef });

  const handleSwitch = (index) => {
    if (index === active) return;

    // Animate out
    const tl = gsap.timeline();
    if (titleRef.current) tl.to(titleRef.current, { y: -30, opacity: 0, duration: 0.3, ease: 'power3.in' });
    if (descRef.current)  tl.to(descRef.current,  { y: -20, opacity: 0, duration: 0.25, ease: 'power3.in' }, 0);
    if (labelRef.current) tl.to(labelRef.current,  { opacity: 0, duration: 0.2 }, 0);

    tl.call(() => {
      setActive(index);
    });

    // Animate in
    tl.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power4.out' });
    tl.fromTo(descRef.current,  { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4');
    tl.fromTo(labelRef.current, { opacity: 0 },         { opacity: 1, duration: 0.4 }, '-=0.4');
  };

  const proj = PROJECTS[active];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] min-h-screen py-20 overflow-hidden flex items-center justify-center sm:h-screen sm:py-0"
      id="work"
      aria-label="Selected work"
    >
      {/* Background slides */}
      {PROJECTS.map((p, i) => (
        <div
          key={p.id}
          className={`absolute inset-0 transition-opacity duration-800 cubic-bezier(0.16,1,0.3,1) will-change-opacity ${i === active ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        >
          <img
            src={p.bg}
            alt={p.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/85 via-[#0a0a0a]/40 to-[#0a0a0a]/20 z-[1]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-[2] grid grid-cols-1 items-center gap-12 px-8 w-full max-w-[1400px] lg:grid-cols-[auto_1fr] lg:gap-24 lg:px-[6vw]">

        {/* Circular thumbnail switcher */}
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:w-full" role="tablist" aria-label="Select project">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handleSwitch(i)}
              className={`work__thumb w-[72px] h-[72px] rounded-full overflow-hidden cursor-pointer border-2 transition-all duration-300 shadow-[0_0_0_0_rgba(212,75,30,0)] relative group ${i === active ? 'border-[#d44b1e] scale-[1.18] shadow-[0_0_0_6px_rgba(212,75,30,0.2)]' : 'border-transparent hover:shadow-[0_0_0_4px_rgba(212,75,30,0.25)]'}`}
              role="tab"
              aria-selected={i === active}
              aria-label={`View project: ${p.title}`}
              id={`work-thumb-${i}`}
            >
              <img src={p.thumb} alt={p.title} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-[#0a0a0a]/40 rounded-full transition-all duration-300 ${i === active ? 'bg-transparent' : 'group-hover:bg-transparent'}`} />
            </button>
          ))}
        </div>

        {/* Project info */}
        <div className="text-white sm:text-center">
          <p ref={labelRef} className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-white/50 mb-6">
            Selected Work &nbsp;/&nbsp; {String(active + 1).padStart(2, '0')} — {String(PROJECTS.length).padStart(2, '0')}
          </p>

          <h2 ref={titleRef} className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-medium leading-[1.05] tracking-tighter mb-8 max-w-[800px] sm:mx-auto">
            {proj.title}
            <br />
            <em className="italic font-normal">{proj.subtitle}</em>
          </h2>

          <p ref={descRef} className="text-base font-light leading-[1.7] max-w-[480px] text-white/70 mb-10 sm:mx-auto">
            {proj.desc}
          </p>

          <button 
            className="inline-flex items-center gap-3 font-sans text-[0.85rem] font-medium tracking-wide text-white bg-[#d44b1e] border-none px-8 py-[0.85rem] rounded-full cursor-pointer transition-all duration-300 hover:bg-[#e85c2a] hover:-translate-y-[2px] outline-none"
            aria-label={`View ${proj.title} case study`}
          >
            View Case Study
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

