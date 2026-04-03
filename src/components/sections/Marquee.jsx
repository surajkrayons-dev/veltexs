import React from 'react';

const ITEMS = [
  'Brand Identity',
  'Motion Design',
  'Digital Experience',
  'Spatial Design',
  'Campaign Strategy',
  'UI · UX Systems',
  'Creative Direction',
  'Visual Storytelling',
];

export default function Marquee({ speed = 40, invert = false }) {
  // Duplicate for seamless loop
  const doubled = [...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className={`relative z-[2] flex overflow-hidden py-6 select-none border-t border-b ${
        invert ? 'bg-[#0a0a0a] border-white/5' : 'bg-[#f5f0e8] border-black/5'
      }`}
      aria-hidden="true"
    >
      <div
        className="flex shrink-0 items-center gap-0 w-max min-w-full animate-marqueeScroll will-change-transform"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: invert ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-8 font-sans text-[0.75rem] font-medium tracking-[0.2em] uppercase px-10 whitespace-nowrap ${
              invert ? 'text-white/35' : 'text-[#1a1a1a]/35'
            }`}
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] inline-block shrink-0" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
