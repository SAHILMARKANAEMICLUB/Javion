import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { JAVION_CONTACT } from '../mock';
import { headlineBlurIn } from '../utils/cinematicAnimations';
import useReducedMotion from '../hooks/useReducedMotion';
import ProductsNav from '../components/ProductsNav';
import Seo from '../components/Seo';
import { PAGE_SEO } from '../seo/site';
import { AEO_FAQS, faqPageJsonLd } from '../seo/aeo';
import { quoteHowToJsonLd } from '../seo/geo';
import './Cinematic.css';
import './Products.css';
import './Contact.css';

const SUBJECTS = [
  'Product enquiry',
  'Request a quote',
  'Custom / OEM drawing',
  'Catalogue & certificates',
  'Other',
];

export default function Contact() {
  const rootRef = useRef(null);
  const reduced = useReducedMotion();
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: SUBJECTS[1],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/${JAVION_CONTACT.whatsapp}?text=${encodeURIComponent(
    'Hello Javion — I would like to get in touch regarding fasteners.'
  )}`;

  useEffect(() => {
    document.body.style.background = '#f4f6f8';
    return () => {
      document.body.style.background = '';
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      headlineBlurIn('.contact-headline', {
        reduced,
        y: 28,
        blur: 14,
      });
      gsap.from('.contact-reveal', {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div ref={rootRef} className="cinematic-page products-page contact-page">
      <Seo {...PAGE_SEO.contact} jsonLd={[faqPageJsonLd(), quoteHowToJsonLd()]} />
      <div className="prod-bg pointer-events-none" aria-hidden>
        <div className="prod-bg-base" />
        <div className="prod-bg-patch prod-bg-patch--cyan" />
        <div className="prod-bg-patch prod-bg-patch--navy" />
        <div className="prod-bg-grid cin-grid-bg" />
      </div>

      <ProductsNav active="contact" />

      <section className="relative z-[1] px-8 md:px-16 pt-28 md:pt-32 pb-10 md:pb-14">
        <div className="cin-eyebrow contact-reveal">Contact us</div>
        <h1
          className="contact-headline font-display mt-4 cin-heading max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
          }}
        >
          Let&apos;s talk <span className="cin-gradient-text">fasteners</span>, specs &amp; supply.
        </h1>
        <p
          className="contact-reveal mt-4 font-body text-[15px] max-w-2xl"
          style={{ color: 'var(--cin-text-muted)' }}
        >
          Share your requirement, drawing, or volume target — our team will respond with sizing,
          finishes, and lead times.
        </p>
      </section>

      <section className="relative z-[1] border-y border-[var(--cin-border-light)]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: Phone,
              label: 'Call',
              value: JAVION_CONTACT.phone,
              href: `tel:${JAVION_CONTACT.phone.replace(/\s/g, '')}`,
            },
            {
              icon: Mail,
              label: 'Email',
              value: JAVION_CONTACT.email,
              href: `mailto:${JAVION_CONTACT.email}`,
            },
            {
              icon: MapPin,
              label: 'Visit',
              value: JAVION_CONTACT.address,
              href: null,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            const inner = (
              <>
                <div className="contact-info-icon" aria-hidden>
                  <Icon size={18} strokeWidth={1.6} />
                </div>
                <div className="cin-eyebrow mb-2">{item.label}</div>
                <p className="font-body text-[14px] leading-relaxed" style={{ color: 'var(--cin-navy)' }}>
                  {item.value}
                </p>
              </>
            );
            return (
              <div
                key={item.label}
                className={`contact-reveal contact-info-cell px-8 md:px-10 py-8 md:py-10 ${
                  idx < 2 ? 'md:border-r border-[var(--cin-border-light)]' : ''
                } ${idx < 2 ? 'border-b md:border-b-0 border-[var(--cin-border-light)]' : ''}`}
              >
                {item.href ? (
                  <a href={item.href} className="contact-info-link">
                    {inner}
                  </a>
                ) : (
                  <div>{inner}</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 py-12 md:py-16">
        <div className="contact-layout">
          <div className="contact-reveal">
            <div className="cin-eyebrow">Send a message</div>
            <h2
              className="font-display mt-4 cin-heading"
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
              }}
            >
              Tell us what you <span className="cin-gradient-text">need</span>.
            </h2>
            <p className="mt-3 font-body text-[14px] max-w-md" style={{ color: 'var(--cin-text-muted)' }}>
              Prefer WhatsApp for a quick reply? Reach us directly and share photos or drawings.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-whatsapp mt-6 inline-flex items-center gap-2 font-body"
            >
              <MessageCircle size={16} strokeWidth={1.75} />
              Chat on WhatsApp
            </a>
          </div>

          <div className="contact-reveal">
            {submitted ? (
              <div className="contact-success docs-card-face">
                <div className="cin-eyebrow">Received</div>
                <h3 className="font-display mt-3 cin-heading text-2xl">
                  Thanks — we&apos;ll be in <span className="cin-gradient-text">touch</span>.
                </h3>
                <p className="mt-3 font-body text-[14px]" style={{ color: 'var(--cin-text-muted)' }}>
                  Your message is noted. For urgent requirements, call or WhatsApp us using the details above.
                </p>
                <button
                  type="button"
                  className="cin-btn-ghost mt-6 inline-flex items-center gap-2 px-6 py-3 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      email: '',
                      company: '',
                      phone: '',
                      subject: SUBJECTS[1],
                      message: '',
                    });
                  }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={onSubmit} noValidate>
                <div className="contact-form-grid">
                  <label className="contact-field">
                    <span>Name *</span>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </label>
                  <label className="contact-field">
                    <span>Email *</span>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={onChange}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                  <label className="contact-field">
                    <span>Company</span>
                    <input
                      name="company"
                      type="text"
                      value={form.company}
                      onChange={onChange}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </label>
                  <label className="contact-field">
                    <span>Phone</span>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="+91 …"
                      autoComplete="tel"
                    />
                  </label>
                </div>

                <label className="contact-field">
                  <span>Subject</span>
                  <select name="subject" value={form.subject} onChange={onChange}>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="contact-field">
                  <span>Message *</span>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    placeholder="Product type, sizes, grades, quantity, finish, or attach context…"
                  />
                </label>

                <button
                  type="submit"
                  className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
                >
                  Send message <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-12 md:pb-16" aria-labelledby="contact-faq-heading">
        <div className="cin-eyebrow contact-reveal">FAQ</div>
        <h2
          id="contact-faq-heading"
          className="font-display mt-4 cin-heading max-w-3xl contact-reveal"
          style={{
            fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          Quick answers for <span className="cin-gradient-text">buyers</span>
        </h2>
        <div className="contact-faq mt-8 md:mt-10">
          {AEO_FAQS.map((item) => (
            <div key={item.question} className="contact-faq-item contact-reveal">
              <h3 className="font-display text-[16px] md:text-[17px]" style={{ color: 'var(--cin-navy)', fontWeight: 500 }}>
                {item.question}
              </h3>
              <p className="mt-2 font-body text-[14px] leading-relaxed" style={{ color: 'var(--cin-text-muted)' }}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-[1] px-8 md:px-16 pb-16 md:pb-24">
        <div className="prod-finale border border-[var(--cin-border-light)] rounded-[20px] px-8 md:px-12 py-10 md:py-12">
          <div className="cin-eyebrow">Explore</div>
          <h2
            className="font-display mt-4 cin-heading max-w-3xl"
            style={{
              fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)',
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
            }}
          >
            Browse the <span className="cin-gradient-text">range</span> while you wait.
          </h2>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/products"
              className="cin-btn-primary inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase"
            >
              Products <ArrowRight size={14} />
            </Link>
            <Link
              to="/home#resources"
              className="cin-btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[11px] tracking-[0.12em] font-semibold uppercase rounded-full"
            >
              Documents
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-[1] pb-10 text-center">
        <p className="text-[10px] font-body uppercase tracking-[0.28em]" style={{ color: 'var(--cin-text-light)' }}>
          Javion Fasteners · Precision Manufacturing · ISO-Grade
        </p>
      </footer>
    </div>
  );
}
