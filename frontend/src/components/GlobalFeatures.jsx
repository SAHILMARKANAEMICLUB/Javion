import React, { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { JAVION_CONTACT } from '../mock';

export default function GlobalFeatures({ variant = 'default' }) {
  const [showTop, setShowTop] = useState(false);
  const rootClass = variant === 'cinematic' ? 'global-features global-features--cinematic' : 'global-features';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${JAVION_CONTACT.whatsapp}?text=${encodeURIComponent('Hello Javion — I would like a quote on fasteners.')}`;

  return (
    <div className={`${rootClass} fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[990] flex flex-col items-end gap-3 pointer-events-none`}>
      <div className="flex flex-col items-end gap-2.5 pointer-events-auto">
        {showTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="global-features-fab"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} strokeWidth={1.75} />
          </button>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="global-features-fab global-features-fab--whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={18} strokeWidth={1.75} />
        </a>
      </div>
    </div>
  );
}
