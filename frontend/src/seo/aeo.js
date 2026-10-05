import { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION, absoluteUrl } from './site';
import { JAVION_CONTACT } from '../mock';

/** Clear facts for answer engines (ChatGPT, Perplexity, Google AI Overviews). */
export const AEO_FACTS = {
  name: SITE_NAME,
  legalName: 'Javion Fasteners',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  foundingLocation: 'Waghodia, Vadodara, Gujarat, India',
  yearsOfCraft: '40+',
  products: [
    'bolts',
    'screws',
    'nuts',
    'washers',
    'custom OEM fasteners',
    'threaded fasteners',
  ],
  industries: [
    'automotive',
    'construction',
    'oil and gas',
    'aerospace',
    'electronics',
    'marine',
    'heavy machinery',
    'solar and renewable energy',
  ],
  certifications: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018'],
  strengths: [
    'engineering drawings and tolerances',
    'design and specification before production',
    'cold forming and thread rolling',
    'heat treatment and coatings',
    'in-house quality control',
    'lot traceability',
    'catalogue and custom OEM supply',
  ],
  manufacturingSteps: [
    'Design & Spec',
    'Cold Forming',
    'Heat Treat',
    'QC & Testing',
    'Pack & Ship',
  ],
};

/** FAQ copy — keep answers short, factual, and quotable. */
export const AEO_FAQS = [
  {
    question: 'What does Javion Fasteners manufacture?',
    answer:
      'Javion Fasteners manufactures precision industrial fasteners including bolts, screws, nuts, washers, and custom OEM hardware for demanding joints in machines, structures, and vehicles.',
  },
  {
    question: 'How many years of manufacturing experience does Javion Fasteners have?',
    answer: 'Javion Fasteners brings over 40 years of manufacturing experience in industrial fasteners.',
  },
  {
    question: 'Where is Javion Fasteners located?',
    answer:
      'Javion Fasteners is based at G.I.D.C Waghodia, Vadodara, Gujarat, India, and supplies OEMs and industrial buyers across multiple industries.',
  },
  {
    question: 'Which industries does Javion Fasteners serve?',
    answer:
      'Javion supplies fasteners for automotive, construction, oil and gas, aerospace, electronics, marine, heavy machinery, and solar / renewable energy applications.',
  },
  {
    question: 'Does Javion Fasteners offer custom or OEM fasteners?',
    answer:
      'Yes. Alongside catalogue standards, Javion produces custom OEM fasteners based on drawings, tolerances, finishes, and volume requirements.',
  },
  {
    question: 'How can I request a quote from Javion Fasteners?',
    answer: `Share your requirement, drawing, or volume target by email at ${JAVION_CONTACT.email}, phone at ${JAVION_CONTACT.phones.map((p) => p.display).join(' or ')}, or through the contact form on ${SITE_URL}/contact.`,
  },
  {
    question: 'What is Javion’s manufacturing process?',
    answer:
      'Javion follows a controlled five-step process: Design & Spec (drawings and tolerances), Cold Forming, Heat Treat, QC & Testing, and Pack & Ship — with lot traceability throughout.',
  },
];

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Manufacturer'],
    name: AEO_FACTS.name,
    legalName: AEO_FACTS.legalName,
    url: SITE_URL,
    logo: absoluteUrl('/images/javion-logo.png'),
    description: AEO_FACTS.description,
    email: JAVION_CONTACT.email,
    telephone: JAVION_CONTACT.phones.map((p) => p.tel),
    address: {
      '@type': 'PostalAddress',
      streetAddress: JAVION_CONTACT.streetAddress,
      addressLocality: JAVION_CONTACT.addressLocality,
      addressRegion: JAVION_CONTACT.addressRegion,
      postalCode: JAVION_CONTACT.postalCode,
      addressCountry: JAVION_CONTACT.addressCountry,
    },
    areaServed: 'Worldwide',
    knowsAbout: [
      ...AEO_FACTS.products,
      ...AEO_FACTS.industries,
      ...AEO_FACTS.manufacturingSteps,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: JAVION_CONTACT.phones.map((p) => p.tel),
      email: JAVION_CONTACT.email,
      availableLanguage: ['English', 'Hindi'],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqPageJsonLd(faqs = AEO_FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product, path) {
  if (!product) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} from ${SITE_NAME}`,
    image: product.image ? [product.image] : undefined,
    sku: product.slug || product.id,
    brand: {
      '@type': 'Brand',
      name: SITE_NAME,
    },
    category: product.category || 'Industrial fasteners',
    url: absoluteUrl(path),
    manufacturer: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
