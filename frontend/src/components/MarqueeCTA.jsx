import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function MarqueeCTA() {
  const phrase = (
    <span className="flex items-center gap-10 pr-10">
      <span className="font-display italic" style={{ fontWeight: 700 }}>Parlons de votre projet</span>
      <ArrowDown size={48} strokeWidth={1.2} />
    </span>
  );
  const items = Array.from({ length: 6 });
  return (
    <section id="contact" className="py-24 md:py-32 overflow-hidden" style={{ backgroundColor: '#F5F3EF' }}>
      <div className="ticker-track" style={{ color: '#1A1A1A', fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 1.1 }}>
        {items.map((_, i) => (
          <React.Fragment key={i}>{phrase}</React.Fragment>
        ))}
      </div>
    </section>
  );
}
