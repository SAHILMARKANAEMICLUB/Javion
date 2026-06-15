import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { CONTACT } from '../mock';
import MarqueeCTA from './MarqueeCTA';

export default function ContactBlock() {
  return (
    <>
      <MarqueeCTA />
      <section className="px-6 md:px-[8vw] pb-24" style={{ backgroundColor: '#F5F3EF' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#1A1A1A' }}>
              <Phone size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Téléphone</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#1A1A1A' }}>
                {CONTACT.phone}
              </div>
            </div>
          </a>
          <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#1A1A1A' }}>
              <Mail size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Email</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#1A1A1A' }}>
                {CONTACT.email}
              </div>
            </div>
          </a>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="flex items-start gap-4 group">
            <span className="shrink-0 mt-1" style={{ color: '#1A1A1A' }}>
              <MapPin size={18} strokeWidth={1.5} />
            </span>
            <div>
              <div className="eyebrow">Atelier</div>
              <div className="text-[16px] mt-2 group-hover:opacity-60 transition-opacity" style={{ color: '#1A1A1A' }}>
                {CONTACT.address}
              </div>
            </div>
          </a>
        </div>

        {/* Certification labels */}
        <div className="max-w-5xl mx-auto mt-16 flex flex-wrap items-center justify-center gap-10">
          <div className="flex items-center gap-3 px-5 py-3" style={{ border: '1px solid #1A1A1A', borderRadius: 2 }}>
            <span className="font-display italic" style={{ fontWeight: 700, color: '#1A1A1A' }}>EPV</span>
            <span className="text-[12px]" style={{ color: '#3D3D3D' }}>Entreprise du Patrimoine Vivant</span>
          </div>
          <div className="flex items-center gap-3 px-5 py-3" style={{ border: '1px solid #1A1A1A', borderRadius: 2 }}>
            <span className="font-display italic" style={{ fontWeight: 700, color: '#1A1A1A' }}>Maître</span>
            <span className="text-[12px]" style={{ color: '#3D3D3D' }}>Artisan certifié</span>
          </div>
        </div>
      </section>
    </>
  );
}
