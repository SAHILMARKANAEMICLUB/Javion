import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, height = '60vh' }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to="/realisations"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative block overflow-hidden"
      style={{ height, borderRadius: 6 }}
    >
      <img
        src={project.cover}
        alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transition: 'transform 0.7s ease',
          transform: hover ? 'scale(1.04)' : 'scale(1)',
        }}
        loading="lazy"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 55%)',
        }}
      />
      {/* Hover dim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: hover ? 'rgba(10,10,10,0.25)' : 'rgba(10,10,10,0)',
          transition: 'background-color 0.35s ease',
        }}
      />
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
        <div
          className="text-[11px] uppercase mb-2"
          style={{ letterSpacing: '0.14em', color: 'rgba(255,255,255,0.75)' }}
        >
          {project.category}
        </div>
        <div className="font-display" style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2 }}>
          {project.title}
        </div>
        <p className="mt-2 text-[14px]" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 480, lineHeight: 1.6 }}>
          {project.excerpt}
        </p>
        <div
          className="mt-5 inline-flex items-center gap-2 bg-white text-[#1A1A1A] px-4 py-2 text-[12px]"
          style={{
            letterSpacing: '0.08em',
            borderRadius: 2,
            opacity: hover ? 1 : 0,
            transform: hover ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.35s ease, transform 0.45s ease',
          }}
        >
          Voir la réalisation <ArrowRight size={14} strokeWidth={1.5} />
        </div>
      </div>
    </Link>
  );
}
