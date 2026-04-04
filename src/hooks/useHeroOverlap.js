import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useHeroOverlap({ heroRef, contentRef, overlayBgRef, bgRef, scrollRef }) {
  useEffect(() => {
    if (!heroRef?.current) return;
    
    // Create the scroll overlap effect similar to Studio X
    // Since hero is fixed, we use the body as trigger
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // Scale and fade content based on scroll progress
        if (contentRef?.current) {
          const scale = 1 - (progress * 0.3);
          const opacity = 1 - (progress * 0.8);
          gsap.set(contentRef.current, {
            scale: scale,
            opacity: opacity,
            transformOrigin: 'center center'
          });
        }

        // Fade overlay background
        if (overlayBgRef?.current) {
          const opacity = 1 - (progress * 0.5);
          gsap.set(overlayBgRef.current, {
            opacity: opacity
          });
        }

        // Parallax effect on background
        if (bgRef?.current) {
          const y = progress * 100;
          gsap.set(bgRef.current, {
            y: -y
          });
        }

        // Parallax on scroll element
        if (scrollRef?.current) {
          const y = progress * 50;
          gsap.set(scrollRef.current, {
            y: -y
          });
        }
      },
      onEnter: () => {
        // Hero overlap effect activated
      },
      onLeave: () => {
        // Hero overlap effect completed
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });
    };
  }, [heroRef, contentRef, overlayBgRef, bgRef, scrollRef]);
}
