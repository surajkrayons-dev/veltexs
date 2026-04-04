import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROJECTS = [
  {
    id: 1, category: 'Brand Identity',
    title: 'Horizon Studio',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 2, category: 'Digital Experience',
    title: 'Obsidian Platform',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 3, category: 'Spatial Design',
    title: 'Lume Flagship',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 4, category: 'Motion Campaign',
    title: 'Auris Launch',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 5, category: 'Brand Identity',
    title: 'Meridian Rebrand',
    img: 'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 6, category: 'Digital Experience',
    title: 'Solace Digital',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
  },
];

const FILTERS = ['All', 'Brand Identity', 'Digital Experience', 'Spatial Design', 'Motion Campaign'];

export default function ProjectsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState('All');
  const containerRef = useRef(null);
  const headRef = useRef(null);

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headRef.current, {
        y: 60, opacity: 0, duration: 1, ease: 'power4.out', delay: 0.1,
      });
      // Grid items stagger
      gsap.from('.project-card-item', {
        y: 50, opacity: 0, duration: 0.8,
        stagger: 0.1, ease: 'power3.out', delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="pt-40 pb-24 px-[6vw] bg-[#f5f0e8] min-h-screen sm:pt-32">
      {/* Header */}
      <div className="flex flex-col gap-12 mb-20 sm:gap-8">
        <div className="flex gap-3 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`px-6 py-2.5 rounded-full border border-black/10 text-[0.8rem] font-medium tracking-wide transition-all duration-300 hover:bg-[#d44b1e] hover:text-white hover:border-[#d44b1e] outline-none sm:px-4 sm:py-2 ${activeFilter === f ? 'bg-[#d44b1e] text-white border-[#d44b1e]' : 'bg-transparent text-[#1a1a1a]'}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="max-w-[1200px]">
          <h1 ref={headRef} className="font-serif text-[clamp(2.5rem,5.5vw,6.5rem)] font-medium leading-[1.1] tracking-tighter text-[#1a1a1a]">
            Our <em className="italic font-normal text-[#d44b1e]">projects</em>
          </h1>
          <p className="font-sans text-base leading-relaxed text-[#555] max-w-[550px] mt-8 font-light sm:mt-6">
            A selection of work across brand identity, digital experience,
            spatial design, and motion across Asia-Pacific.
          </p>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-10">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="project-card-item group cursor-pointer"
            onClick={() => navigate(`/projects/${proj.id}`)}
            role="article"
            aria-label={proj.title}
          >
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <img 
                src={proj.img} 
                alt={proj.title} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white font-sans text-sm font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View project ↗</span>
              </div>
            </div>
            <div className="mt-6">
              <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{proj.category}</span>
              <h2 className="font-serif text-2xl font-medium text-[#1a1a1a] mt-2 group-hover:text-[#d44b1e] transition-colors duration-300">{proj.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

