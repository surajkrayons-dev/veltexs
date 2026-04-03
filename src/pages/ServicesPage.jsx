import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const SERVICES = [
  {
    num: '01',
    title: 'Brand Identity',
    desc: 'Complete brand systems — strategy, visual identity, motion language, and brand guidelines for organisations that want to lead, not follow.',
    tags: ['Strategy', 'Visual Identity', 'Motion Language', 'Brand Guidelines'],
  },
  {
    num: '02',
    title: 'Digital Experience',
    desc: 'Websites, web applications, and digital platforms built at the intersection of design precision and technical craft. Performance-first, always.',
    tags: ['Web Design', 'Web Development', 'UX Systems', 'Performance'],
  },
  {
    num: '03',
    title: 'Spatial & Environmental',
    desc: 'Physical environments that align with and amplify a brand\'s commercial objectives — from flagship retail to corporate headquarters.',
    tags: ['Interior Design', 'Environmental Design', 'Retail', 'Workplace'],
  },
  {
    num: '04',
    title: 'Motion & Campaign',
    desc: 'Cinematic campaigns and dynamic motion design that captivate audiences across every format — digital, broadcast, and beyond.',
    tags: ['Film', 'Motion Design', 'Campaign Strategy', 'Social Content'],
  },
  {
    num: '05',
    title: 'Creative Direction',
    desc: 'Senior creative leadership embedded into your team or production — from concept through to delivery across all touchpoints.',
    tags: ['Art Direction', 'Creative Strategy', 'Production', 'Consulting'],
  },
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.services-page-heading', {
        y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.1,
      });
      gsap.from('.services-page-item', {
        y: 40, opacity: 0, duration: 0.8,
        stagger: 0.12, ease: 'power3.out', delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-44 pb-32 px-[6vw] bg-[#0a0a0a] min-h-screen text-white sm:pt-32">
      <div className="max-w-[1200px] mb-32 sm:mb-20">
        <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-white/40 mb-10">(Services)</p>
        <h1 className="services-page-heading font-serif text-[clamp(2.5rem,5.5vw,7rem)] font-medium leading-[1.05] tracking-tighter text-white shrink-0">
          What we
          <br /><em className="italic font-normal text-[#d44b1e]">do best.</em>
        </h1>
      </div>

      <div className="flex flex-col gap-0" role="list">
        {SERVICES.map((s) => (
          <div key={s.num} className="services-page-item grid grid-cols-[100px_1fr] gap-12 items-start py-20 border-t border-white/10 sm:grid-cols-1 sm:gap-6 sm:py-12 last:border-b last:border-white/10" role="listitem">
            <div className="font-serif text-[5rem] font-bold leading-none text-white/10 tracking-tighter sm:text-6xl" aria-hidden="true">{s.num}</div>
            <div className="services-page-item-content">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-tight mb-8 text-white">{s.title}</h2>
              <p className="font-sans text-xl leading-relaxed text-white/60 max-w-[700px] mb-12 font-light sm:text-lg sm:mb-8">{s.desc}</p>
              <div className="flex gap-4 flex-wrap sm:gap-3">
                {s.tags.map(t => (
                  <span key={t} className="px-5 py-2 rounded-full border border-white/10 text-[0.75rem] font-medium tracking-wide text-white/50 bg-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-default whitespace-nowrap">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

