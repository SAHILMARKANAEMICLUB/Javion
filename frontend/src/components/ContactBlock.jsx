import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT, LOGOS } from '../mock';
import MarqueeCTA from './MarqueeCTA';

export default function ContactBlock() {
  return (
    <>
      <MarqueeCTA />
      <section className="px-6 md:px-[8vw] pb-24" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#F5F3EF' }}>
              <Phone size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Téléphone</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#F5F3EF' }}>
                {CONTACT.phone}
              </div>
            </div>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#F5F3EF' }}>
              <Mail size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Email</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#F5F3EF' }}>
                {CONTACT.email}
              </div>
            </div>
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#F5F3EF' }}>
              <MapPin size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Atelier</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#F5F3EF' }}>
                {CONTACT.address}
              </div>
            </div>
          </a>
        </div>

        {/* Certification labels */}
        <div className="max-w-5xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-12">
          <img
            src={LOGOS.epv}
            alt="Entreprise du Patrimoine Vivant"
            style={{ height: 70, filter: 'brightness(0) invert(1) opacity(0.85)' }}
          />
          <img
            src={LOGOS.maitre}
            alt="Maître Artisan"
            style={{ height: 70, filter: 'brightness(0) invert(1) opacity(0.85)' }}
          />
        </div>
      </section>
    </>
  );
}
