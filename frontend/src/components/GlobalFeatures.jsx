import React, { useEffect, useState } from 'react';
import { ArrowUp, Mail, MessageCircle, X } from 'lucide-react';
import { JAVION_CONTACT, NEWSLETTER } from '../mock';

function NewsletterForm({ compact = false, onSuccess }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    onSuccess?.();
    setEmail('');
  };

  if (done) {
    return (
      <p className="global-features-success text-[13px] font-body" style={{ color: 'var(--cin-cyan-dark, #0095D9)' }}>
        {NEWSLETTER.success}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className={`global-features-form flex ${compact ? 'flex-col gap-2' : 'flex-col sm:flex-row gap-2'}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={NEWSLETTER.placeholder}
        className="global-features-input flex-1 min-w-0 px-4 py-2.5 rounded-full text-[13px] font-body outline-none"
        aria-label="Email for newsletter"
      />
      <button type="submit" className="global-features-submit shrink-0 px-5 py-2.5 rounded-full text-[11px] font-body uppercase tracking-[0.14em] font-semibold">
        {NEWSLETTER.button}
      </button>
    </form>
  );
}

export default function GlobalFeatures({ variant = 'default' }) {
  const [showTop, setShowTop] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const rootClass = variant === 'cinematic' ? 'global-features global-features--cinematic' : 'global-features';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!newsletterOpen) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setNewsletterOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [newsletterOpen]);

  const whatsappUrl = `https://wa.me/${JAVION_CONTACT.whatsapp}?text=${encodeURIComponent('Hello Javion — I would like a quote on fasteners.')}`;

  return (
    <>
      <div className={`${rootClass} fixed bottom-5 right-4 md:bottom-6 md:right-6 z-[990] flex flex-col items-end gap-3 pointer-events-none`}>
        {newsletterOpen && (
          <div className="global-features-panel pointer-events-auto w-[min(100vw-2rem,340px)] p-5 rounded-2xl shadow-xl">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-[10px] font-body uppercase tracking-[0.22em] global-features-panel-eyebrow">Newsletter</div>
                <h3 className="font-display text-lg mt-1">{NEWSLETTER.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setNewsletterOpen(false)}
                className="global-features-fab global-features-fab--sm"
                aria-label="Close newsletter"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-[12px] font-body mb-4 leading-relaxed global-features-panel-desc">
              {NEWSLETTER.description}
            </p>
            <NewsletterForm compact onSuccess={() => setTimeout(() => setNewsletterOpen(false), 2200)} />
          </div>
        )}

        <div className="flex flex-col items-end gap-2.5 pointer-events-auto">
          {showTop && (
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="global-features-fab"
              aria-label="Scroll to top"
              data-cursor
            >
              <ArrowUp size={18} strokeWidth={1.75} />
            </button>
          )}
          <button
            type="button"
            onClick={() => setNewsletterOpen((o) => !o)}
            className={`global-features-fab ${newsletterOpen ? 'global-features-fab--active' : ''}`}
            aria-label={newsletterOpen ? 'Close newsletter' : 'Open newsletter'}
            aria-expanded={newsletterOpen}
            data-cursor
          >
            <Mail size={18} strokeWidth={1.75} />
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="global-features-fab global-features-fab--whatsapp"
            aria-label="Chat on WhatsApp"
            data-cursor
          >
            <MessageCircle size={18} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </>
  );
}
