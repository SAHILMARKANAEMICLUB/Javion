import React, { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, FileText, ArrowUpRight } from 'lucide-react';
import { CINEMATIC_DOCUMENTS } from '../../mock';
import { headlineBlurIn } from '../../utils/cinematicAnimations';

gsap.registerPlugin(ScrollTrigger);

/** Alternate rows: 60/40, then 30/40/30, repeat. */
function buildOddEvenRows(docs) {
  const rows = [];
  let i = 0;
  let rowIndex = 0;

  while (i < docs.length) {
    const isWidePair = rowIndex % 2 === 0;
    const take = isWidePair ? 2 : 3;
    const slice = docs.slice(i, i + take);
    if (!slice.length) break;

    rows.push({
      id: `row-${rowIndex}`,
      pattern: slice.length >= 3 ? 'triple' : 'wide',
      items: slice.map((doc, idx) => ({
        doc,
        featured: Boolean(doc.featured && rowIndex === 0 && idx === 0),
      })),
    });

    i += take;
    rowIndex += 1;
  }

  return rows;
}

function DocCard({ doc, featured = false }) {
  return (
    <a
      href={doc.file}
      download
      className={`docs-card ${featured ? 'docs-card--featured' : ''} docs-reveal`}
    >
      <div className="docs-card-face">
        <div className="docs-card-top">
          <span className="docs-card-tag">{doc.tag || 'PDF'}</span>
          <span className="docs-card-icon" aria-hidden>
            <FileText size={featured ? 22 : 18} strokeWidth={1.5} />
          </span>
        </div>
        <h3 className="docs-card-title font-display">{doc.name}</h3>
        <p className="docs-card-desc font-body">{doc.description}</p>
        <span className="docs-card-cta font-body">
          Download PDF
          {featured ? <ArrowUpRight size={14} strokeWidth={1.75} /> : <Download size={13} strokeWidth={1.75} />}
        </span>
      </div>
    </a>
  );
}

export default function DocumentsResources({ reduced }) {
  const sectionRef = useRef(null);
  const rows = useMemo(() => buildOddEvenRows(CINEMATIC_DOCUMENTS), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      headlineBlurIn('.docs-headline', {
        reduced,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 28,
        blur: 14,
      });

      gsap.from('.docs-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      id="resources"
      className="docs-resources relative w-full overflow-hidden py-16 md:py-24 cin-section-soft-light cin-section-blend-top cin-section-blend-bottom"
    >
      <div className="docs-resources-bg pointer-events-none absolute inset-0 cin-grid-bg opacity-30" />

      <div className="relative z-[1] px-8 md:px-16 mb-10 md:mb-14">
        <div className="cin-eyebrow docs-reveal">Resources</div>
        <h2
          className="docs-headline font-display mt-4 cin-heading max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}
        >
          Catalogue &amp; <span className="cin-gradient-text">documents</span> for every stage.
        </h2>
        <p className="docs-reveal mt-4 font-body text-[15px] max-w-2xl" style={{ color: 'var(--cin-text-muted)' }}>
          Download our product catalogue, company profile, and ISO certificates — ready for procurement and audits.
        </p>
      </div>

      <div className="relative z-[1] px-8 md:px-16">
        <div className="docs-mosaic">
          {rows.map((row) => (
            <div
              key={row.id}
              className={`docs-mosaic-row docs-mosaic-row--${row.pattern}${
                row.items.length === 1 ? ' docs-mosaic-row--single' : ''
              }`}
            >
              {row.items.map(({ doc, featured }) => (
                <div key={doc.id} className="docs-mosaic-cell">
                  <DocCard doc={doc} featured={featured} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
