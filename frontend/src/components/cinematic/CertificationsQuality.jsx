import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, PackageCheck, Search, Cog } from 'lucide-react';
import {
  ISO_CERTIFICATIONS,
  QC_PROCESS,
  TESTING_STANDARDS,
  CERT_ISSUER_LOGOS,
} from '../../mock';
import { headlineBlurIn } from '../../utils/cinematicAnimations';

gsap.registerPlugin(ScrollTrigger);

const QC_ICONS = {
  incoming: PackageCheck,
  process: Cog,
  final: Search,
};

function CertSeal({ code, size = 'md' }) {
  return (
    <div className={`cert-logo-seal cert-logo-seal--${size}`} aria-hidden>
      <span className="cert-logo-seal-iso">ISO</span>
      <span className="cert-logo-seal-code">{code}</span>
    </div>
  );
}

function CertMarqueeItem({ cert }) {
  const code = cert.name.replace('ISO ', '').split(':')[0];
  return (
    <div className="cert-marquee-item shrink-0 flex items-center gap-4 px-8 md:px-12">
      <CertSeal code={code} size="lg" />
      <div>
        <div className="font-display text-lg md:text-2xl cin-heading whitespace-nowrap">{cert.name}</div>
        <div className="text-[11px] font-body uppercase tracking-[0.18em] mt-1" style={{ color: 'var(--cin-text-muted)' }}>
          {cert.title}
        </div>
      </div>
      <span className="cert-marquee-dot" aria-hidden />
    </div>
  );
}

export default function CertificationsQuality({ reduced }) {
  const sectionRef = useRef(null);
  const certMarquee = [...ISO_CERTIFICATIONS, ...ISO_CERTIFICATIONS];
  const issuerMarquee = [...CERT_ISSUER_LOGOS, ...CERT_ISSUER_LOGOS];
  const stdMarquee = [...TESTING_STANDARDS, ...TESTING_STANDARDS];

  useEffect(() => {
    const ctx = gsap.context(() => {
      headlineBlurIn('.cert-headline', {
        reduced,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 28,
        blur: 14,
      });

      gsap.from('.cert-reveal', {
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
      id="quality"
      className="cert-quality relative w-full overflow-hidden py-16 md:py-24 cin-section-soft-light cin-section-blend-top cin-section-blend-bottom"
    >
      <div className="cert-quality-bg pointer-events-none absolute inset-0 cin-grid-bg opacity-30" />

      <div className="relative z-[1] px-8 md:px-16 mb-10 md:mb-14">
        <div className="cin-eyebrow cert-reveal">Certifications &amp; Quality</div>
        <h2
          className="cert-headline font-display mt-4 cin-heading max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}
        >
          Certified systems. <span className="cin-gradient-text">Verified</span> at every stage.
        </h2>
        <p className="cert-reveal mt-4 font-body text-[15px] max-w-2xl" style={{ color: 'var(--cin-text-muted)' }}>
          ISO-accredited quality, environmental, and safety management — traceable from raw material to dispatch.
        </p>
      </div>

      <div className="cert-reveal cert-marquee-band w-full overflow-hidden border-y border-[var(--cin-border-light)]">
        <div className={`cert-marquee-track flex py-6 md:py-8 ${reduced ? '' : 'cert-marquee-animate'}`}>
          {certMarquee.map((cert, i) => (
            <CertMarqueeItem key={`${cert.id}-${i}`} cert={cert} />
          ))}
        </div>
      </div>

      <div className="cert-reveal cert-marquee-band cert-marquee-band--muted w-full overflow-hidden border-b border-[var(--cin-border-light)]">
        <div className={`cert-marquee-track flex py-4 md:py-5 ${reduced ? '' : 'cert-marquee-animate-reverse'}`}>
          {issuerMarquee.map((issuer, i) => (
            <span key={`${issuer.id}-${i}`} className="cert-issuer-item shrink-0 px-10 md:px-14 font-display text-xl md:text-2xl tracking-[0.06em] cin-heading">
              {issuer.name}
              <span className="mx-10 md:mx-14 opacity-25" aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="cert-reveal cert-iso-strip grid grid-cols-1 md:grid-cols-3 w-full border-b border-[var(--cin-border-light)]">
        {ISO_CERTIFICATIONS.map((cert, idx) => {
          const code = cert.name.replace('ISO ', '').split(':')[0];
          return (
            <article
              key={cert.id}
              className={`cert-iso-col px-8 md:px-12 py-10 md:py-12 ${idx < ISO_CERTIFICATIONS.length - 1 ? 'md:border-r border-[var(--cin-border-light)]' : ''}`}
            >
              <CertSeal code={code} />
              <h3 className="font-display text-xl md:text-2xl cin-heading mt-6">{cert.name}</h3>
              <p className="text-[12px] font-body uppercase tracking-[0.2em] mt-2" style={{ color: 'var(--cin-text-muted)' }}>
                {cert.title}
              </p>
              <dl className="mt-6 space-y-3 text-[12px] font-body">
                <div className="flex justify-between gap-6 border-b border-[var(--cin-border-light)] pb-2">
                  <dt style={{ color: 'var(--cin-text-light)' }}>Issuing body</dt>
                  <dd className="font-medium">{cert.issuer}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt style={{ color: 'var(--cin-text-light)' }}>Valid until</dt>
                  <dd className="font-medium">{cert.validUntil}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>

      <div className="cert-reveal cert-qc-strip grid grid-cols-1 md:grid-cols-3 w-full border-b border-[var(--cin-border-light)]">
        {QC_PROCESS.map((step, idx) => {
          const Icon = QC_ICONS[step.icon] || FileCheck;
          return (
            <div
              key={step.step}
              className={`cert-qc-col px-8 md:px-12 py-10 md:py-12 ${idx < QC_PROCESS.length - 1 ? 'md:border-r border-[var(--cin-border-light)]' : ''}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon size={20} strokeWidth={1.5} style={{ color: 'var(--cin-cyan-dark)' }} />
                <span className="text-[10px] font-body uppercase tracking-[0.22em] cin-gradient-text">{step.step}</span>
              </div>
              <h4 className="font-display text-lg md:text-xl cin-heading">{step.title}</h4>
              <p className="mt-3 text-[13px] font-body leading-relaxed" style={{ color: 'var(--cin-text-muted)' }}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      <div className="cert-reveal cert-marquee-band w-full overflow-hidden border-b border-[var(--cin-border-light)]">
        <div className={`cert-marquee-track flex py-4 ${reduced ? '' : 'cert-marquee-animate'}`}>
          {stdMarquee.map((std, i) => (
            <span key={`${std.code}-${i}`} className="cert-std-item shrink-0 px-8 md:px-10 font-body text-[11px] uppercase tracking-[0.2em] whitespace-nowrap">
              <span className="cin-gradient-text font-semibold mr-3">{std.label}</span>
              <span style={{ color: 'var(--cin-text-muted)' }}>{std.desc}</span>
              <span className="mx-8 md:mx-10 opacity-25" aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
