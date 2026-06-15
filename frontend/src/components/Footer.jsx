import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER_PAGES, CONTACT } from '../mock';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', color: '#FFFFFF' }}>
      <div className="px-6 md:px-[8vw] pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="font-display text-3xl" style={{ fontWeight: 700 }}>
              Metal<em>360</em>
            </div>
            <p className="mt-6 text-[12px]" style={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
              Copyright © {new Date().getFullYear()} Metal360.<br />
              Tous droits réservés.
            </p>
          </div>

          {/* Pages */}
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>Pages</div>
            <ul className="mt-5 space-y-3">
              {FOOTER_PAGES.map((p) => (
                <li key={p.label}>
                  <Link
                    to={p.href}
                    className="text-[13px] transition-colors duration-200 hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>Contact</div>
            <ul className="mt-5 space-y-3 text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <li className="flex items-center gap-3">
                <Phone size={14} strokeWidth={1.5} />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} strokeWidth={1.5} />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} strokeWidth={1.5} className="mt-1" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>Suivez-nous</div>
            <div className="flex items-center gap-5 mt-5">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="transition-opacity hover:opacity-60" style={{ color: '#FFFFFF' }}>
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-16 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Mentions légales · Politique de confidentialité
          </p>
          <p className="text-[11px] mt-3 md:mt-0" style={{ color: 'rgba(255,255,255,0.3)' }}>
            EPV · Maître Artisan
          </p>
        </div>
      </div>
    </footer>
  );
}
