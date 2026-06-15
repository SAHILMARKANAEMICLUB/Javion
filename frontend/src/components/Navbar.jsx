import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../mock';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isLight = onHome && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-colors duration-500`}
        style={{
          backgroundColor: isLight ? 'transparent' : '#FFFFFF',
        }}
      >
        <div className="flex items-center justify-between px-5 md:px-10 py-5">
          <Link to="/" className="flex items-center gap-2">
            <span
              className="text-2xl tracking-tight"
              style={{ color: isLight ? '#FFFFFF' : '#1A1A1A' }}
            >
              <span className="font-display italic" style={{ fontWeight: 700 }}>Metal</span>
              <span className="font-body" style={{ fontWeight: 300, marginLeft: 2 }}>360</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((l) => {
              const active = location.pathname === l.href;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-[14px] tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
                  style={{
                    color: isLight ? '#FFFFFF' : '#1A1A1A',
                    fontWeight: 400,
                  }}
                >
                  {l.label}{active ? ' •' : ''}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <a
              href="#contact"
              className="text-[14px] tracking-[0.02em] transition-opacity duration-300 hover:opacity-60"
              style={{ color: isLight ? '#FFFFFF' : '#1A1A1A', fontWeight: 400 }}
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-1"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ color: isLight ? '#FFFFFF' : '#1A1A1A' }}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[1100]" style={{ backgroundColor: '#F5F3EF' }}>
          <div className="flex items-center justify-between px-5 py-5">
            <span className="text-2xl" style={{ color: '#1A1A1A' }}>
              <span className="font-display italic" style={{ fontWeight: 700 }}>Metal</span>
              <span className="font-body" style={{ fontWeight: 300, marginLeft: 2 }}>360</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" style={{ color: '#1A1A1A' }}>
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 mt-24">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-[32px]"
                style={{ color: '#1A1A1A', fontWeight: 400 }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="font-display text-[32px] italic"
              style={{ color: '#1A1A1A', fontWeight: 700 }}
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
