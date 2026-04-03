import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const STEPS = [
  {
    num: '01', title: 'Discover & Define',
    desc: 'We begin by immersing ourselves in your world — understanding your audience, your competition, and the opportunity ahead. Every assumption is challenged until we find the true brief beneath the brief.',
  },
  {
    num: '02', title: 'Strategy & Vision',
    desc: 'With clarity comes direction. We establish the strategic foundations that will guide every creative decision — from positioning and narrative to the visual language that sets you apart.',
  },
  {
    num: '03', title: 'Design & Motion',
    desc: "Here, ideas take form. We craft brands, platforms, and environments that don’t just look exceptional — they move, engage, and perform. Every detail is deliberate.",
  },
  {
    num: '04', title: 'Build & Refine',
    desc: 'Precision execution across every touchpoint. We build at the intersection of craft and technology, iterating until the experience is seamless and the quality is undeniable.',
  },
  {
    num: '05', title: 'Launch & Evolve',
    desc: "A launch is a beginning, not an end. We stay involved — measuring, learning, and evolving your experience so it continues to outperform as markets shift.",
  },
];

export default function ProcessPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from('.process-page-heading', {
        y: 70, opacity: 0, duration: 1.1, ease: 'power4.out', delay: 0.1,
      });
      gsap.from('.process-page-step', {
        y: 40, opacity: 0, duration: 0.8,
        stagger: 0.13, ease: 'power3.out', delay: 0.3,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-44 pb-32 px-[6vw] bg-[#f5f0e8] min-h-screen text-[#1a1a1a] sm:pt-32">
      <div className="max-w-[1200px] mb-32 sm:mb-20">
        <p className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-[#666] mb-10">(Our Process)</p>
        <h1 className="process-page-heading font-serif text-[clamp(2.5rem,5.5vw,7rem)] font-medium leading-[1.05] tracking-tighter text-[#1a1a1a]">
          How we turn ambition into
          <br /><em className="italic font-normal text-[#d44b1e]">lasting impact.</em>
        </h1>
      </div>

      <div className="flex flex-col gap-0" role="list">
        {STEPS.map((step) => (
          <div key={step.num} className="process-page-step grid grid-cols-[100px_1fr] gap-12 items-start py-20 border-t border-black/10 sm:grid-cols-1 sm:gap-6 sm:py-12 last:border-b last:border-black/10" role="listitem">
            <div className="font-serif text-[5rem] font-bold leading-none text-black/5 tracking-tighter sm:text-6xl" aria-hidden="true">{step.num}</div>
            <div className="process-page-step-content">
              <h2 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-tight mb-8 text-[#1a1a1a]">{step.title}</h2>
              <p className="font-sans text-xl leading-relaxed text-[#555] max-w-[700px] font-light sm:text-lg">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

