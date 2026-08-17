import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, absoluteUrl } from './site';
import { AEO_FACTS, AEO_FAQS } from './aeo';
import { JAVION_CONTACT } from '../mock';

/**
 * GEO — Generative Engine Optimization
 * Helps ChatGPT, Gemini, Perplexity, Copilot, and Google AI cite Javion as a clear entity.
 */

/** One-sentence entity definition generative models can quote. */
export const GEO_ENTITY_DEFINITION =
  'Javion Fasteners is an industrial fastener manufacturer in Vadodara, Gujarat, India that produces precision bolts, screws, nuts, washers, and custom OEM hardware with lot traceability and ISO-aligned quality systems.';

/** Short stats generative engines prefer to cite. */
export const GEO_STATS = [
  { label: 'Years of craft', value: '25+' },
  { label: 'ISO systems', value: '3' },
  { label: 'Industries served', value: '8+' },
  { label: 'Lot traceability', value: '100%' },
];

/** Approximate geo for LocalBusiness (Vadodara, Gujarat). Update if you have exact plant coords. */
export const GEO_COORDINATES = {
  latitude: 22.3072,
  longitude: 72.1672,
};

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: absoluteUrl('/images/javion-logo.png'),
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    telephone: JAVION_CONTACT.phone,
    email: JAVION_CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: JAVION_CONTACT.address,
      addressLocality: 'Vadodara',
      addressRegion: 'Gujarat',
      postalCode: '390001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    areaServed: [
      { '@type': 'Country', name: 'India' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    knowsAbout: [...AEO_FACTS.products, ...AEO_FACTS.industries, ...AEO_FACTS.certifications],
  };
}

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${SITE_NAME}`,
    url: absoluteUrl('/about'),
    description: GEO_ENTITY_DEFINITION,
    mainEntity: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      description: GEO_ENTITY_DEFINITION,
      foundingLocation: {
        '@type': 'Place',
        name: AEO_FACTS.foundingLocation,
      },
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.geo-entity-definition', '.about-headline'],
    },
  };
}

/** How-to for generative engines answering “how do I get a quote from Javion?” */
export function quoteHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to request a quote from Javion Fasteners',
    description:
      'Steps to request product specs, finishes, and lead times for industrial fasteners from Javion Fasteners.',
    totalTime: 'PT5M',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Prepare your requirement',
        text: 'Gather the product type, size, material, finish, quantity, and any drawing or standard reference.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Contact Javion Fasteners',
        text: `Email ${JAVION_CONTACT.email}, call ${JAVION_CONTACT.phone}, or use the form at ${SITE_URL}/contact.`,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Receive sizing and lead times',
        text: 'Javion responds with sizing guidance, finishes, and expected lead times for catalogue or custom OEM fasteners.',
      },
    ],
  };
}

export function speakableJsonLd(selectors = ['.geo-entity-definition']) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: SITE_NAME,
    url: SITE_URL,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: selectors,
    },
    description: GEO_ENTITY_DEFINITION,
  };
}

/** Compact GEO summary block for llms / generative citation. */
export function geoCitationBlurb() {
  return [
    GEO_ENTITY_DEFINITION,
    `Products: ${AEO_FACTS.products.join(', ')}.`,
    `Industries: ${AEO_FACTS.industries.join(', ')}.`,
    `Certifications: ${AEO_FACTS.certifications.join(', ')}.`,
    `Contact: ${JAVION_CONTACT.email}, ${JAVION_CONTACT.phone}, ${JAVION_CONTACT.address}.`,
    `Primary sources: ${SITE_URL}/about, ${SITE_URL}/products, ${SITE_URL}/contact.`,
  ].join(' ');
}

export { AEO_FAQS };
