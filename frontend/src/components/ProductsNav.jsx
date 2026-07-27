import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download } from 'lucide-react';
import { JAVION_LOGO, CINEMATIC_DOCUMENTS } from '../mock';

function NavDivider({ className = '' }) {
  return <span className={`cin-nav-divider ${className}`.trim()} aria-hidden />;
}

/**
 * Shared glass-island header for cinematic brand pages.
 * Menu: Products · About · Quality · Resources · Contact
 */
export default function ProductsNav({ active = null, showProgress = false }) {
  const { pathname } = useLocation();
  const barRef = useRef(null);
  const catalogue = CINEMATIC_DOCUMENTS.find((d) => d.id === 'catalogue');
  const island = 'cin-glass-island cin-glass-island--solid';
  const onCinematic = pathname === '/cinematic';
  const qualityTo = onCinematic ? '#quality' : '/cinematic#quality';
  const resourcesTo = onCinematic ? '#resources' : '/cinematic#resources';

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

  const qualityLink = onCinematic ? (
    <a href={qualityTo} className="cin-nav-link font-body font-medium" data-cursor>
      Quality
    </a>
  ) : (
    <Link to={qualityTo} className="cin-nav-link font-body font-medium">
      Quality
    </Link>
  );

  const resourcesLink = onCinematic ? (
    <a href={resourcesTo} className="cin-nav-link font-body font-medium" data-cursor>
      Resources
    </a>
  ) : (
    <Link to={resourcesTo} className="cin-nav-link font-body font-medium">
      Resources
    </Link>
  );

  return (
    <>
      {showProgress && (
        <div className="cin-progress-track">
          <div ref={barRef} className="cin-progress-fill" style={{ transform: 'scaleX(0)' }} />
        </div>
      )}
      <header className="cin-nav-shell prod-nav-shell fixed top-0 left-0 right-0 z-[999] pointer-events-none">
        <div className="cin-nav-shell-inner flex items-start justify-between gap-2 sm:gap-3 md:gap-4 px-3 sm:px-4 md:px-6 pt-3 md:pt-4">
          <div className={`${island} cin-glass-island--logo pointer-events-auto`}>
            <Link to="/cinematic" className="cin-nav-logo-wrap" data-cursor aria-label="Javion Fasteners home">
              <img
                src={JAVION_LOGO}
                alt="Javion Fasteners"
                className="cin-nav-logo h-7 md:h-8 w-auto object-contain"
                draggable={false}
              />
            </Link>
          </div>

          <nav
            className={`${island} cin-glass-island--menu hidden md:flex items-center pointer-events-auto`}
            aria-label="Primary"
          >
            <Link
              to="/products"
              className={`cin-nav-link font-body font-medium ${active === 'products' ? 'is-active' : ''}`}
              data-cursor
            >
              Products
            </Link>
            <NavDivider />
            <Link
              to="/about"
              className={`cin-nav-link font-body font-medium ${active === 'about' ? 'is-active' : ''}`}
              data-cursor
            >
              About
            </Link>
            <NavDivider />
            {qualityLink}
            <NavDivider />
            {resourcesLink}
            <NavDivider />
            <Link
              to="/contact"
              className={`cin-nav-link font-body font-medium ${active === 'contact' ? 'is-active' : ''}`}
              data-cursor
            >
              Contact
            </Link>
          </nav>

          <div className={`${island} cin-glass-island--meta flex items-center pointer-events-auto`}>
            {catalogue && (
              <a
                href={catalogue.file}
                download
                className="cin-nav-link font-body font-medium inline-flex items-center gap-1.5"
                data-cursor
              >
                <Download size={13} strokeWidth={1.75} />
                <span className="hidden sm:inline">Catalogue</span>
              </a>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
