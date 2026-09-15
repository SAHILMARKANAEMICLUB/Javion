import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Menu, X } from 'lucide-react';
import { JAVION_LOGO, CINEMATIC_DOCUMENTS } from '../mock';

function NavDivider({ className = '' }) {
  return <span className={`cin-nav-divider ${className}`.trim()} aria-hidden />;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', to: '/home' },
  { id: 'about', label: 'About Us', to: '/about' },
  { id: 'products', label: 'Products', to: '/products' },
  { id: 'industries', label: 'Industries We Cater', to: '/industries' },
  { id: 'contact', label: 'Connect Us', to: '/contact' },
];

/**
 * Shared glass-island header for cinematic brand pages.
 * Desktop: inline nav + catalogue. Mobile: menu button → full-screen nav.
 */
export default function ProductsNav({ active = null, showProgress = false }) {
  const { pathname } = useLocation();
  const barRef = useRef(null);
  const menuPanelRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const catalogue = CINEMATIC_DOCUMENTS.find((d) => d.id === 'catalogue');
  const island = 'cin-glass-island cin-glass-island--solid';

  const resolvedActive =
    active ||
    (pathname === '/home'
      ? 'home'
      : pathname.startsWith('/products')
        ? 'products'
        : pathname.startsWith('/about')
          ? 'about'
          : pathname.startsWith('/industries')
            ? 'industries'
            : pathname.startsWith('/contact')
              ? 'contact'
              : null);

  useEffect(() => {
    if (!showProgress) return undefined;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const sc = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${sc})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [showProgress]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    const t = requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector('a, button')?.focus();
    });

    return () => {
      cancelAnimationFrame(t);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      {showProgress && (
        <div className="cin-progress-track">
          <div ref={barRef} className="cin-progress-fill" style={{ transform: 'scaleX(0)' }} />
        </div>
      )}
      <header
        className={`cin-nav-shell prod-nav-shell fixed top-0 left-0 right-0 pointer-events-none ${
          menuOpen ? 'prod-nav-shell--menu-open' : ''
        }`}
      >
        <div className="cin-nav-shell-inner flex items-center justify-between gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 pt-3 md:pt-4 md:items-start">
          <div className={`${island} cin-glass-island--logo pointer-events-auto`}>
            <Link to="/home" className="cin-nav-logo-wrap" data-cursor aria-label="Javion Fasteners home">
              <img
                src={JAVION_LOGO}
                alt="Javion Fasteners"
                className="cin-nav-logo w-auto object-contain md:h-8"
                draggable={false}
              />
            </Link>
          </div>

          <nav
            className={`${island} cin-glass-island--menu cin-glass-island--menu-wide hidden md:flex items-center pointer-events-auto`}
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && <NavDivider />}
                <Link
                  to={item.to}
                  className={`cin-nav-link font-body font-medium ${
                    resolvedActive === item.id ? 'is-active' : ''
                  }`}
                  data-cursor
                >
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <div
            className={`${island} cin-glass-island--meta cin-glass-island--meta-tools flex items-center justify-center pointer-events-auto shrink-0`}
          >
            <button
              type="button"
              className="cin-nav-menu-toggle md:hidden"
              aria-expanded={menuOpen}
              aria-controls="prod-nav-mobile-panel"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={20} strokeWidth={2} aria-hidden className="cin-nav-menu-icon" />
              ) : (
                <Menu size={20} strokeWidth={2} aria-hidden className="cin-nav-menu-icon" />
              )}
            </button>
            {catalogue && (
              <a
                href={catalogue.file}
                download
                className="cin-nav-link font-body font-medium hidden md:inline-flex items-center gap-1.5"
                data-cursor
              >
                <Download size={13} strokeWidth={1.75} />
                <span>Catalogue</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <div
        id="prod-nav-mobile-panel"
        ref={menuPanelRef}
        className={`prod-nav-mobile-overlay ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        <div className="prod-nav-mobile-overlay__backdrop" aria-hidden onClick={() => setMenuOpen(false)} />
        <div className="prod-nav-mobile-overlay__panel">
          <nav className="prod-nav-mobile-nav" aria-label="Primary mobile">
            <ul className="prod-nav-mobile-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.to}
                    className={`prod-nav-mobile-link font-body ${
                      resolvedActive === item.id ? 'is-active' : ''
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {catalogue && (
            <div className="prod-nav-mobile-footer">
              <a
                href={catalogue.file}
                download
                className="prod-nav-mobile-catalogue cin-btn-primary font-body"
                onClick={() => setMenuOpen(false)}
              >
                <Download size={16} strokeWidth={1.75} aria-hidden />
                Download catalogue
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
