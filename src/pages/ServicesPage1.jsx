import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CORE_SERVICES = [
  {
    num: '01',
    title: 'IMC Strategy & Planning',
    desc: 'Audience insights, messaging, and channel roadmap. We build the foundation of your entire growth ecosystem to ensure alignment before execution begins.',
    tags: ['Audience Insights', 'Messaging Architecture', 'Channel Roadmap'],
  },
  {
    num: '02',
    title: 'Creative & Messaging Alignment',
    desc: 'Strong brand voice and consistent storytelling. We ensure your narrative captures attention, builds trust, and translates seamlessly across every medium.',
    tags: ['Brand Voice', 'Storytelling', 'Copywriting'],
  },
  {
    num: '03',
    title: 'Full-Channel Integration',
    desc: 'Social, search, influencer, print, and more. We dominate everywhere your audience consumes media, synchronising touchpoints for maximum impact.',
    tags: ['Social Media', 'SEO & SEM', 'Programmatic', 'Print & OOH'],
  },
  {
    num: '04',
    title: 'Campaign Execution & PR',
    desc: 'Flawless production, strategic media buying, and launch management. Paired with Earned Media to amplify your brand stories organically.',
    tags: ['Production', 'Media Buying', 'PR Outreach', 'Events'],
  },
  {
    num: '05',
    title: 'Performance Optimisation',
    desc: 'Data-driven improvements across active campaigns. We track against shared goals and continuously refine spend, creative, and messaging to squeeze ROI.',
    tags: ['Data Analytics', 'A/B Testing', 'ROI Tracking'],
  },
];

const THE_PROBLEM = [
  {
    num: '01',
    title: 'Common Challenges',
    desc: 'Most brands suffer from disconnected messaging across platforms, spending money without long-term impact. Creative might look good, but if it doesn’t convert and there are multiple agencies with no coordination, the result is weak brand recall and zero clear performance measurement.',
    tags: ['Disconnected Ads', 'Wasted Spend', 'No Coordination'],
  },
  {
    num: '02',
    title: 'What Changes With Us',
    desc: 'We bring a unified strategy with one voice across all channels. Consistency builds trust and stronger brand recall. You get better ROI through aligned spending, purposeful creativity designed with intent, and a strict focus on real measurable business outcomes.',
    tags: ['Unified Strategy', 'Better ROI', 'Purposeful Creativity'],
  }
];

const THE_SYSTEM = [
  {
    num: '01',
    title: 'Key Outcomes',
    desc: 'Expect strong brand recall, higher ROI without necessarily increasing your ad spend, and a consistent, powerful brand voice. Your marketing matrix will adapt faster to market changes, backed by revenue-focused reporting.',
    tags: ['Brand Recognition', 'Higher ROI', 'Adaptability'],
  },
  {
    num: '02',
    title: 'The Experience',
    desc: 'Clarity from Day One. Our strategies are simple to understand and implement. Expect insightful creative backed by logic, flawless and coordinated delivery, and honest, transparent reporting.',
    tags: ['Clarity', 'Flawless Execution', 'Honest Reporting'],
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Top Hero Heading
      gsap.fromTo('.services-hero-heading',
        { y: 120, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', delay: 0.1 }
      );

      // 2. Headings that appear on scroll down
      gsap.utils.toArray('.services-scroll-heading').forEach((heading) => {
        gsap.fromTo(heading,
          { y: 120, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out', scrollTrigger: { trigger: heading, start: 'top 85%' } }
        );
      });

      // 3. Stagger the items block by block when scrolled into view
      gsap.utils.toArray('.services-list-container').forEach((container) => {
        const items = container.querySelectorAll('.services-page-item');
        const numbers = container.querySelectorAll('.service-huge-number');

        // Graceful massive slide-up for row
        gsap.fromTo(items,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: container, start: 'top 75%' }
          }
        );

        // Powerful spring impact for the giant numbers
        gsap.fromTo(numbers,
          { x: -50, scale: 0.5, opacity: 0 },
          {
            x: 0, scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'elastic.out(1, 0.7)',
            scrollTrigger: { trigger: container, start: 'top 75%' }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0b162c] min-h-screen font-sans selection:bg-[#00aaff] selection:text-white">

      {/* SECTION 1: WHAT WE DO (Hero & Dark Theme) */}
      <div className="pt-28 pb-16 px-[6vw] text-white sm:pt-20">
        <div className="max-w-[1200px] mb-12 sm:mb-10">
          <p className="font-sans text-[1rem] font-bold tracking-[0.3em] uppercase text-[#00aaff] mb-6">(What We Do)</p>
          <h1 className="services-hero-heading font-serif text-[clamp(2.5rem,5.5vw,6rem)] font-medium leading-[1.05] tracking-tighter text-white shrink-0">
            We deliver end-to-end
            <br /><em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#8cc63f]">integrated solutions.</em>
          </h1>
          <p className="services-hero-heading mt-6 text-xl font-light text-white/50 max-w-[600px] leading-snug">
            Not isolated services. Our core capability is making every channel work together seamlessly.
          </p>
        </div>

        <div className="services-list-container flex flex-col gap-0" role="list">
          {CORE_SERVICES.map((s) => (
            <div key={s.num} className="services-page-item grid  gap-12 items-start py-10 border-t border-white/10 grid-cols-1 sm:gap-6 sm:py-8 last:border-b last:border-white/10" role="listitem">
              <div className="service-huge-number font-serif text-[5rem] font-bold leading-none tracking-tighter sm:text-6xl text-opacity-10 opacity-10" aria-hidden="true">{s.num}</div>
              <div className="services-page-item-content">
                <h2 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-tight mb-8 text-white">{s.title}</h2>
                <p className="font-sans text-xl leading-relaxed text-white/60 max-w-[700px] mb-12 font-light sm:text-lg sm:mb-8">{s.desc}</p>
                <div className="flex gap-4 flex-wrap sm:gap-3">
                  {s.tags.map(t => (
                    <span key={t} className="px-5 py-2 rounded-full border border-white/10 text-[0.75rem] font-medium tracking-wide text-white/50 bg-white/5 hover:bg-white/10 hover:text-[#00aaff] transition-colors cursor-default whitespace-nowrap">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE PROBLEM (Light Theme) */}
      <div className="py-20 px-[6vw] bg-[#ffffff] text-[#0f172a] border-y border-black/5">
        <div className="max-w-[1200px] mb-16 sm:mb-10">
          <p className="font-sans text-[1rem] tracking-[0.3em] uppercase text-[#ff4444] mb-6 font-bold">(What We Solve)</p>
          <h2 className="services-scroll-heading font-serif text-[clamp(2.5rem,4.5vw,5rem)] font-medium leading-[1.05] tracking-tighter text-[#0f172a] shrink-0">
            Most brands don’t fail
            <br />due to lack of ideas —
            <br /><em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#ff4444] to-[#ffaa00]">they fail due to lack of alignment.</em>
          </h2>
        </div>

        <div className="services-list-container flex flex-col gap-0" role="list">
          {THE_PROBLEM.map((s) => (
            <div key={s.num} className="services-page-item grid gap-12 items-start py-10 border-t border-black/10 grid-cols-1 sm:gap-6 sm:py-8 last:border-b last:border-black/10" role="listitem">
              <div className="service-huge-number font-serif text-[5rem] font-bold leading-none tracking-tighter sm:text-6xl text-black/30" aria-hidden="true">{s.num}</div>
              <div className="services-page-item-content">
                <h3 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-tight mb-8 text-[#0f172a]">{s.title}</h3>
                <p className="font-sans text-xl leading-relaxed text-[#555] max-w-[700px] mb-8 font-light sm:text-lg sm:mb-6">{s.desc}</p>
                <div className="flex gap-4 flex-wrap sm:gap-3">
                  {s.tags.map(t => (
                    <span key={t} className="px-5 py-2 rounded-full border border-black/10 text-[0.75rem] font-medium tracking-wide text-[#666] bg-black/5 hover:bg-black/10 transition-colors cursor-default whitespace-nowrap">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: WHAT YOU GET (Brand Blue Theme) */}
      <div className="py-20 px-[6vw] bg-[#0066cc] text-white">
        <div className="max-w-[1200px] mb-16 sm:mb-10">
          <p className="font-sans text-[1rem] tracking-[0.3em] uppercase text-[#8cc63f] mb-6 font-bold">(What You Get)</p>
          <h2 className="services-scroll-heading font-serif text-[clamp(2.5rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-tighter text-white shrink-0">
            We don’t just deliver campaigns.
            <br />We build a <em className="italic font-normal text-[#8cc63f]">growth system</em>.
          </h2>
        </div>

        <div className="services-list-container flex flex-col gap-0" role="list">
          {THE_SYSTEM.map((s) => (
            <div key={s.num} className="services-page-item grid gap-12 items-start py-10 border-t border-white/20 grid-cols-1 sm:gap-6 sm:py-8 last:border-b last:border-white/20" role="listitem">
              <div className="service-huge-number font-serif text-[5rem] font-bold leading-none tracking-tighter sm:text-6xl text-white/20" aria-hidden="true">{s.num}</div>
              <div className="services-page-item-content">
                <h3 className="font-serif text-[clamp(1.8rem,3vw,3.5rem)] font-medium leading-tight mb-8 text-white">{s.title}</h3>
                <p className="font-sans text-xl leading-relaxed text-white/80 max-w-[700px] mb-8 font-light sm:text-lg sm:mb-6">{s.desc}</p>
                <div className="flex gap-4 flex-wrap sm:gap-3">
                  {s.tags.map(t => (
                    <span key={t} className="px-5 py-2 rounded-full border border-white/20 text-[0.75rem] font-medium tracking-wide text-white/90 bg-white/10 hover:bg-white/20 hover:text-white transition-colors cursor-default whitespace-nowrap">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
