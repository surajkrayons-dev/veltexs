import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const POSTS = [
  {
    id: 1, category: 'Perspective', date: 'Mar 2026',
    title: 'Why your brand needs motion before it needs a logo',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 2, category: 'Process', date: 'Feb 2026',
    title: 'The hidden cost of designing for aesthetics over performance',
    img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 3, category: 'Craft', date: 'Jan 2026',
    title: 'What scroll-driven storytelling taught us about attention',
    img: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=700&auto=format&fit=crop&q=80',
  },
  {
    id: 4, category: 'Industry', date: 'Dec 2025',
    title: 'Retail design in the age of omnichannel experience',
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=700&auto=format&fit=crop&q=80',
  },
];

export default function InsightsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.insights-page-heading', {
        y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.1,
      });
      gsap.from('.insight-card-item', {
        y: 40, opacity: 0, duration: 0.8,
        stagger: 0.12, ease: 'power3.out', delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-44 pb-32 px-[6vw] bg-[#f5f0e8] min-h-screen text-[#1a1a1a] sm:pt-32">
      <div className="max-w-[1200px] mb-32 sm:mb-20">
        <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#666] mb-10">(Insights)</p>
        <h1 className="insights-page-heading font-serif text-[clamp(2.5rem,5.5vw,7.5rem)] font-medium leading-[1.05] tracking-tighter text-[#1a1a1a]">
          Thinking from the
          <br /><em className="italic font-normal text-[#d44b1e]">studio.</em>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-x-12 gap-y-24 sm:grid-cols-1 sm:gap-y-16">
        {POSTS.map((post) => (
          <article
            key={post.id}
            className="insight-card-item group cursor-pointer flex flex-col gap-8"
            role="article"
            aria-label={post.title}
          >
            <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
              <img 
                src={post.img} 
                alt={post.title} 
                loading="lazy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-[#d44b1e] font-bold">{post.category}</span>
                <span className="font-sans text-[0.65rem] tracking-[0.1em] uppercase text-[#666]">{post.date}</span>
              </div>
              <h2 className="font-serif text-3xl font-medium leading-[1.2] text-[#1a1a1a] group-hover:text-[#d44b1e] transition-colors duration-300 sm:text-2xl">{post.title}</h2>
              <span className="font-sans text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#1a1a1a] border-b border-black/10 pb-1 self-start group-hover:border-[#d44b1e] transition-colors">Read more ↗</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

