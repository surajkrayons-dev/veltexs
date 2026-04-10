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
      // Register ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Filter buttons entrance animation
      gsap.from('.filter-button', {
        y: -20, opacity: 0, duration: 0.8,
        stagger: 0.1, ease: 'power3.out', delay: 0.1,
        onComplete: () => {
          // Ensure buttons are visible after animation
          gsap.set('.filter-button', { opacity: 1, y: 0 });
        }
      });
      
      // Heading reveal with scale effect
      gsap.from(headRef.current, {
        y: 80, opacity: 0, scale: 0.95, 
        duration: 1.2, ease: 'power4.out', delay: 0.4,
      });
      
      // Grid items entrance with stagger
      gsap.from('.project-card-item', {
        y: 60, opacity: 0, scale: 0.9, 
        duration: 0.8,
        stagger: 0.12, ease: 'back.out(1.2)', delay: 0.6,
      });
      
      // Scroll-triggered animations for project cards
      gsap.utils.toArray('.project-card-item').forEach((card, index) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
            scrub: 1,
          },
          y: -5,
          scale: 1.01,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      });
      
      // Parallax effect for project images
      gsap.utils.toArray('.project-card-item img').forEach((img) => {
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
          y: -15,
          scale: 1.05,
          ease: 'none',
        });
      });
      
      // Category text animation on scroll
      gsap.utils.toArray('.project-category').forEach((category) => {
        gsap.from(category, {
          scrollTrigger: {
            trigger: category,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          x: -15, opacity: 0, duration: 0.6, ease: 'power2.out',
        });
      });
      
      // Project title animation on scroll
      gsap.utils.toArray('.project-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 10, opacity: 0, duration: 0.7, ease: 'power3.out',
        });
      });
      
      // Enhanced hover animations for project cards
      gsap.utils.toArray('.project-card-item').forEach((card) => {
        const img = card.querySelector('img');
        const overlay = card.querySelector('.project-overlay');
        const title = card.querySelector('.project-title');
        
        // Hover animation
        card.addEventListener('mouseenter', () => {
          gsap.to(img, {
            scale: 1.1,
            duration: 0.6,
            ease: 'power3.out',
          });
          if(overlay) {
            gsap.to(overlay, {
              opacity: 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
          gsap.to(title, {
            y: -3,
            color: '#0066cc',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(card, {
            y: -5,
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
            duration: 0.4,
            ease: 'power3.out',
          });
        });
        
        // Leave animation
        card.addEventListener('mouseleave', () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          });
          if(overlay) {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
          gsap.to(title, {
            y: 0,
            color: '#0f172a',
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(card, {
            y: 0,
            boxShadow: '0 0px 0px rgba(0,0,0,0)',
            duration: 0.4,
            ease: 'power3.out',
          });
        });
      });
      
    }, containerRef);
    return () => ctx.revert();
  }, [activeFilter]);

  return (
    <div ref={containerRef} className="pt-24 pb-16 px-[6vw] bg-[#ffffff] min-h-screen sm:pt-20">
      {/* Header */}
      <div className="flex flex-col gap-8 mb-10 sm:gap-6">
        <div className="flex gap-3 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-button px-5 py-2 rounded-full border border-black/10 text-[0.75rem] font-medium tracking-wide transition-all duration-300 hover:bg-[#0066cc] hover:text-white hover:border-[#0066cc] outline-none sm:px-4 sm:py-1.5 ${activeFilter === f ? 'bg-[#0066cc] text-white border-[#0066cc]' : 'bg-transparent text-[#0f172a]'}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="max-w-[1200px]">
          <h1 ref={headRef} className="font-serif text-[clamp(2rem,4.5vw,5rem)] font-medium leading-[1.1] tracking-tighter text-[#0f172a]">
            Our <em className="italic font-normal text-[#0066cc]">projects</em>
          </h1>
          <p className="font-sans text-sm leading-relaxed text-[#555] max-w-[500px] mt-4 font-light sm:mt-3">
            A selection of work across brand identity, digital experience,
            spatial design, and motion across Asia-Pacific.
          </p>
        </div>
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            className="project-card-item group cursor-pointer"
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
              <div className="project-overlay absolute inset-0 bg-[#0b162c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              </div>
            </div>
            <div className="mt-4">
              <span className="project-category font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#666]">{proj.category}</span>
              <h2 className="project-title font-serif text-2xl font-medium text-[#0f172a] mt-2 group-hover:text-[#0066cc] transition-colors duration-300">{proj.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
