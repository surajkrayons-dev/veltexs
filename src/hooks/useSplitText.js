import { useEffect, useRef } from 'react';

/**
 * Splits element text into individual character spans
 * Returns ref to attach to element and charRefs for animation
 */
export function useSplitText() {
  const ref = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const originalText = el.textContent;
    const chars = originalText.split('');

    el.innerHTML = '';
    charsRef.current = [];

    chars.forEach((char) => {
      if (char === ' ') {
        el.appendChild(document.createTextNode('\u00A0'));
        return;
      }
      const outer = document.createElement('span');
      outer.className = 'split-char';
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'bottom';

      const inner = document.createElement('span');
      inner.className = 'split-char-inner';
      inner.textContent = char;
      inner.style.display = 'inline-block';
      inner.style.willChange = 'transform';

      outer.appendChild(inner);
      el.appendChild(outer);
      charsRef.current.push(inner);
    });

    return () => {
      el.textContent = originalText;
    };
  }, []);

  return { ref, charsRef };
}

/**
 * Splits element text into word spans
 */
export function useSplitWords() {
  const ref = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const originalHTML = el.innerHTML;
    const words = el.textContent.trim().split(/\s+/);

    el.innerHTML = '';
    wordsRef.current = [];

    words.forEach((word) => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'bottom';
      outer.style.marginRight = '0.3em';

      const inner = document.createElement('span');
      inner.textContent = word;
      inner.style.display = 'inline-block';
      inner.style.willChange = 'transform';

      outer.appendChild(inner);
      el.appendChild(outer);
      wordsRef.current.push(inner);
    });

    return () => {
      el.innerHTML = originalHTML;
    };
  }, []);

  return { ref, wordsRef };
}
