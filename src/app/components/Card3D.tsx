'use client';
import { useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card3D({ children, className = '' }: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const tiltX = ((y - cy) / cy) * -7;
    const tiltY = ((x - cx) / cx) * 7;

    card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;

    if (glare) {
      const gx = (x / rect.width) * 100;
      const gy = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
      glare.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (card) card.style.transform = '';
    if (glare) glare.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`card-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div ref={glareRef} className="card-3d-glare" aria-hidden />
    </div>
  );
}
