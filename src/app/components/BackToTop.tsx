'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="#hero"
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 z-50 w-11 h-11 rounded-full gradient-bg text-white flex items-center justify-center shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      ↑
    </a>
  );
}
