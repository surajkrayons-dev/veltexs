import React from 'react';

export default function Footer() {
  return (
    <footer 
      className="relative py-16 px-[6vw] flex flex-col gap-10 opacity-45 font-sans text-[0.7rem] uppercase tracking-[0.25em] z-10 footer pb-32 sm:pb-40" 
      role="contentinfo"
    >
      <span className="font-serif text-[clamp(2.5rem,5vw,6rem)] font-medium leading-none tracking-tighter block mb-4 opacity-100 normal-case text-[#d44b1e]">
        Veltex
      </span>
      <div className="flex flex-col gap-4">
        <span>© {new Date().getFullYear()} Veltex Studio. All rights reserved.</span>
        <span>Singapore&nbsp;·&nbsp;Hong Kong&nbsp;·&nbsp;Global</span>
      </div>
    </footer>
  );
}
