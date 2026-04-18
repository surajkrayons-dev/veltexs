import React, { useRef, useEffect } from 'react';
import { useHeroAnimation } from '../../hooks/useHeroAnimation';
import { useHeroParallax } from '../../hooks/useScrollAnimations';
import { useHeroOverlap } from '../../hooks/useHeroOverlap';
import heroBackground from '../../assets/heroBackground.png';
import veltexLogo from '../../assets/VeltexLogo.png';

export default function Hero({ navRef, isGlobal = false }) {
  const overlayRef = useRef(null);
  const logoRef = useRef(null);
  const bgRef = useRef(null);
  const eyebrowRef = useRef(null);
  const subRef = useRef(null);
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const charsRef = useRef([]);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const overlayBgRef = useRef(null);

  // Split title into chars
  useEffect(() => {
    if (isGlobal || !titleRef.current) return;
    const el = titleRef.current;
    const lines = [
      { text: 'Unmatched Reach', italic: false },
      { text: 'Infinite', italic: true },
      { text: 'Possibilities.', italic: false },
    ];
    el.innerHTML = '';
    lines.forEach((line) => {
      const lineWrap = document.createElement('div');
      lineWrap.className = 'overflow-hidden block';
      const lineInner = document.createElement(line.italic ? 'em' : 'span');
      lineInner.textContent = line.text;
      if (line.italic) {
        lineInner.className = 'inline-block will-change-transform italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] via-[#00aaff] to-[#8cc63f] drop-shadow-sm py-2';
      } else {
        lineInner.className = 'inline-block will-change-transform font-bold text-[#0f172a]/80 drop-shadow-[0_4px_4px_rgba(255,255,255,0.8)]';
      }
      lineWrap.appendChild(lineInner);
      el.appendChild(lineWrap);
      charsRef.current.push(lineInner);
    });
  }, [isGlobal]);

  // Hero entrance animation
  useHeroAnimation({
    overlayRef: isGlobal ? { current: null } : overlayRef,
    logoRef: isGlobal ? { current: null } : logoRef,
    titleCharsRef: isGlobal ? { current: [] } : charsRef,
    eyebrowRef: isGlobal ? { current: null } : eyebrowRef,
    subRef: isGlobal ? { current: null } : subRef,
    navRef,
    scrollRef: isGlobal ? { current: null } : scrollRef,
  });

  // Parallax on bg
  useHeroParallax(bgRef);

  // Overlap effect on scroll
  useHeroOverlap({ heroRef, contentRef, overlayBgRef, bgRef, scrollRef });

  return (
    <>
      {/* V Intro Overlay - Only on main Hero, not global bg */}
      {!isGlobal && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center pointer-events-none overflow-hidden"
          aria-hidden="true"
          id="v-intro-overlay"
          style={{ display: 'flex' }}
        >
          <img
            ref={logoRef}
            src={veltexLogo}
            alt="Veltex Logo"
            className="w-[min(50vw,600px)] h-auto object-contain drop-shadow-2xl relative z-10"
            style={{ opacity: 0 }}
          />
        </div>
      )}

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className={`fixed inset-0 w-full h-screen overflow-hidden bg-[#EBEEED] flex items-center justify-center z-[5] ${isGlobal ? 'pointer-events-none' : ''}`} 
        id="hero"
      >
        {/* Background image with parallax */}
        <div
          ref={bgRef}
          className="hero-bg absolute inset-0 bg-cover bg-no-repeat bg-center origin-center will-change-transform"
          style={{ backgroundImage: `url(${heroBackground})` }}
          aria-hidden="true"
        />

        {/* Extremely light gradient just for the absolute bottom edge so the scroll text is legible, rest of BG is 100% visible */}
        {!isGlobal && <div ref={overlayBgRef} className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent h-1/3 bottom-0 top-auto z-[1]" aria-hidden="true" />}

        {/* Content - Only show if not global */}
        {!isGlobal && (
          <div ref={contentRef} className="relative z-[2] text-center px-8 max-w-[1100px]">
            <p
              ref={eyebrowRef}
              className="font-sans text-[0.85rem] font-bold tracking-[0.25em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#8cc63f] mb-8  opacity-0 drop-shadow-[0_2px_2px_rgba(255,255,255,1)]"
              aria-label="Veltex — Digital Design Studio"
            >
              Veltex &nbsp;—&nbsp; Empowering Every Brand to Shine
            </p>

            <h1
              ref={titleRef}
              className="font-serif text-[clamp(3.5rem,8vw,9rem)] leading-[0.95] tracking-tighter"
              aria-label="Unmatched Reach, Infinite Possibilities"
            />

            <p
              ref={subRef}
              className="font-sans text-[clamp(1rem,1.5vw,1.35rem)] font-semibold text-[#0f172a] mt-10 tracking-wide leading-[1.6] max-w-[550px] mx-auto opacity-0 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]"
            >
              We create strategies that can make a difference
            </p>
          </div>
        )}

        {/* Scroll indicator - Only show if not global */}
        {!isGlobal && (
          <div
            ref={scrollRef}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-3 opacity-0"
            aria-hidden="true"
          >
            <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent to-[#0f172a]/60 animate-[scrollLine_2s_ease_infinite]" />
            <span className="font-sans text-[0.65rem] tracking-[0.25em] relative -left-[-2px] uppercase text-[#0f172a]/50 font-semibold">Scroll</span>
          </div>
        )}
      </section>
    </>
  );
}