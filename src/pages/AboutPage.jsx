import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      // Hero animations
      gsap.fromTo('.about-label',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
      );

      gsap.utils.toArray('.about-page-line').forEach((line, index) => {
        gsap.fromTo(line,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.4 + (index * 0.15) }
        );
      });

      // Scatter images
      gsap.utils.toArray('.about-page-scatter-img').forEach((img, index) => {
        gsap.fromTo(img,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 85%' }
          }
        );

        // Parallax
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -30 - (index * 10),
          ease: 'none',
        });
      });

      // Sections reveal
      gsap.utils.toArray('.reveal-section').forEach((section) => {
        gsap.fromTo(section,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%' }
          }
        );
      });

      // Stats counting animation
      gsap.utils.toArray('.about-stat-number').forEach((stat) => {
        const finalValue = stat.innerText;
        const isPlus = finalValue.includes('+');
        const numValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));

        gsap.fromTo(stat,
          { innerHTML: 0 },
          {
            scrollTrigger: {
              trigger: stat,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            innerHTML: numValue,
            duration: 1.8,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function () {
              stat.innerText = Math.floor(this.targets()[0].innerHTML) + (isPlus ? '+' : '');
            },
            onComplete: function () {
              stat.innerText = finalValue;
            }
          });
      });

      // Value cards stagger
      gsap.fromTo('.value-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 75%' }
        }
      );

      // Expertise pills
      gsap.fromTo('.expertise-pill',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.expertise-container', start: 'top 80%' }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const values = [
    { title: 'Fearless Creativity', desc: 'Ideas that capture attention and stay memorable' },
    { title: 'Strategic Backbone', desc: 'Every decision backed by data and insight' },
    { title: 'True Integration', desc: 'Unified messaging across all platforms' },
    { title: 'Radical Ownership', desc: 'We treat your brand like our own' }
  ];

  const philosophy = [
    'Marketing works best when everything works together',
    'The brief is a starting point, not a limitation',
    'Bold ideas outperform safe, predictable campaigns'
  ];

  const definesUs = [
    'Strategy-first approach with creativity embedded in execution',
    'Focus on real outcomes, not just aesthetics',
    'Integrated thinking across every marketing touchpoint'
  ];

  const expertise = [
    'Brand Strategy', 'Integrated Campaigns', 'Digital & Social Media',
    'Paid Media & Performance Marketing', 'PR & Influencer Marketing',
    'Content & Activations', 'Outdoor, Print & Events'
  ];

  return (
    <div ref={containerRef} className="pt-28 pb-16 px-[6vw] bg-[#ffffff] min-h-screen text-[#0f172a] sm:pt-20">
      {/* Hero Section */}
      <div className="max-w-[1200px] mb-12 sm:mb-10">
        <div className="about-label font-sans text-[1rem] tracking-[0.3em] uppercase text-[#0066cc] mb-6 font-bold">(About Us)</div>
        <h1 className="font-serif text-[clamp(2rem,4vw,4.5rem)] font-medium leading-[1.1] tracking-[-0.01em] text-[#0f172a] max-w-[1100px]">
          <div className="overflow-hidden pb-1">
            <span className="about-page-line inline-block will-change-transform">Veltex is a full-service integrated marketing</span>
          </div>
          <div className="overflow-hidden pb-2">
            <span className="about-page-line inline-block will-change-transform">agency that blends strategic thinking with</span>
          </div>
          <div className="overflow-hidden">
            <span className="about-page-line inline-block will-change-transform">
              <em className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] drop-shadow-sm pr-2">bold creativity.</em>
            </span>
          </div>
        </h1>
        <p className="about-page-line mt-10 font-sans text-[clamp(1.1rem,1.5vw,1.4rem)] font-light leading-relaxed text-[#555] max-w-[800px]">
          We don't just create campaigns — we solve real business problems, shift perceptions, and drive revenue growth.
        </p>
      </div>

      {/* Scattered Image Collage */}
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 md:gap-x-4 md:gap-y-12 mb-20 items-start sm:mb-16">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
          alt="Creative meeting"
          className="about-page-scatter-img col-start-1 row-start-1 w-full rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1600607684527-6fb886090705?w=600&auto=format&fit=crop&q=80"
          alt="Design workspace"
          className="about-page-scatter-img col-start-2 row-start-1 row-span-2 mt-16 w-full rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.12)] object-cover md:mt-0"
        />
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80"
          alt="Strategy planning"
          className="about-page-scatter-img col-start-3 row-start-1 w-full rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] object-cover md:col-start-1 md:row-start-2"
        />
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80"
          alt="Marketing analytics"
          className="about-page-scatter-img col-start-4 row-start-1 mt-10 w-full rounded-xl shadow-[0_12px_25px_rgba(0,0,0,0.11)] object-cover md:col-start-2 md:row-start-2 md:mt-6"
        />
      </div>

      {/* What Defines Us & Core Philosophy */}
      <div className="grid  gap-20 mb-20 grid-cols-1 sm:gap-12">
        {/* Defines Us */}
        <div className="reveal-section bg-[#f8f9fa] p-12 rounded-3xl border border-black/5 hover:border-[#0066cc]/20 transition-colors duration-500">
          <h2 className="font-serif text-4xl mb-6 text-[#0f172a]">What Defines Us</h2>
          <ul className="space-y-6">
            {definesUs.map((item, i) => (
              <li key={i} className="flex items-start gap-4 font-sans text-lg text-[#555] font-light">
                <span className="w-2 h-2 rounded-full bg-[#00aaff] mt-2.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Philosophy */}
        <div className="reveal-section bg-[#0f172a] text-white p-12 rounded-3xl relative overflow-hidden flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066cc]/20 to-[#8cc63f]/20" />
          <div className="relative z-10">
            <h2 className="font-serif text-4xl mb-8">Our Core Philosophy</h2>
            <ul className="space-y-6">
              {philosophy.map((item, i) => (
                <li key={i} className="flex items-start gap-4 font-sans text-lg font-light text-white/90">
                  <svg className="w-5 h-5 text-[#8cc63f] mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Our Values - 4 Column Grid */}
      <div className="reveal-section ">
        <h2 className="font-serif text-[clamp(2.5rem,4vw,4rem)] mb-12 text-center">
          Our <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#8cc63f]">Values</em>
        </h2>
        <div className="values-grid grid  gap-6 grid-cols-1 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={i} className="value-card p-8 rounded-2xl bg-white border border-[#eaeaea] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,102,204,0.1)] transition-all duration-500 hover:-translate-y-2 group">
              <div className="text-[2.5rem] font-serif text-[#0066cc]/50 mb-4 group-hover:text-[#8cc63f]/50 transition-colors font-bold">0{i + 1}</div>
              <h3 className="font-sans text-xl font-bold text-[#0f172a] mb-4">{v.title}</h3>
              <p className="font-sans text-[#666] leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="reveal-section border-t border-b border-black/10 py-16">
        <div className="grid  gap-8 grid-cols-2 sm:gap-10 text-center">
          {[
            { num: '12+', label: 'Years of mastery' },
            { num: '340', label: 'Projects delivered' },
            { num: '18', label: 'Markets reached' },
            { num: '60+', label: 'Brand clients' },
          ].map((s) => (
            <div key={s.label} className="about-stat-item">
              <div className="about-stat-number font-serif text-[clamp(3rem,4vw,4rem)] font-bold text-[#0f172a] mb-2 tracking-tighter">{s.num}</div>
              <div className="font-sans text-[1rem] tracking-[0.2em] uppercase text-[#0066cc] font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Expertise */}
      <div className="reveal-section expertise-container py-16 border-t border-b border-[#eaeaea] text-center">
        <h2 className="font-sans text-[1rem] tracking-[0.3em] uppercase text-[#666] mb-12 font-bold">(Our Expertise)</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-[900px] mx-auto">
          {expertise.map((skill, i) => (
            <div
              key={i}
              className="expertise-pill px-6 py-3 rounded-full border border-[#ccc] text-[#0f172a] font-medium text-sm font-sans hover:border-transparent bg-gradient-to-r from-[#0066cc] to-[#00aaff] text-white transition-all duration-300 cursor-default shadow-sm hover:scale-125"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
